import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const FEISHU_WEBHOOK_URL = (Deno.env.get('FEISHU_BOT_WEBHOOK_URL') ?? '').trim();

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

type FeishuResponse = {
  code?: number;
  StatusCode?: number;
  msg?: string;
  StatusMessage?: string;
};

const respond = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });

const clean = (value: unknown, max = 500): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const isFeishuWebhook = (url: string): boolean =>
  url.startsWith('https://open.feishu.cn/open-apis/bot/') ||
  url.startsWith('https://open.larksuite.com/open-apis/bot/');

const formatTime = (date: Date): string =>
  new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

type Application = {
  name: string;
  email: string;
  phone: string;
  company: string;
  teamSize: string;
  preferredTime: string;
  scenario: string;
  submittedAt: string;
};

const field = (label: string, value: string, short = true) => ({
  is_short: short,
  text: {
    tag: 'lark_md',
    content: `**${label}**\n${value || '—'}`,
  },
});

const buildCard = (app: Application) => ({
  msg_type: 'interactive',
  card: {
    config: { wide_screen_mode: true, enable_forward: false },
    header: {
      template: 'orange',
      title: { tag: 'plain_text', content: '新的体验申请 · Agenote' },
    },
    elements: [
      {
        tag: 'div',
        fields: [
          field('姓名', app.name),
          field('邮箱', app.email),
          field('公司 / 团队', app.company),
          field('团队规模 / 联系时段', [app.teamSize, app.preferredTime].filter(Boolean).join(' · ')),
          field('手机 / 微信', app.phone),
          field('提交时间', app.submittedAt),
        ],
      },
      { tag: 'hr' },
      {
        tag: 'div',
        text: {
          tag: 'lark_md',
          content: `**会议场景**\n${app.scenario || '—'}`,
        },
      },
      {
        tag: 'note',
        elements: [
          {
            tag: 'plain_text',
            content: '来自官网体验申请表 · 记录已写入 Backend 数据库',
          },
        ],
      },
    ],
  },
});

const sendToFeishu = async (app: Application): Promise<{ ok: boolean; detail: string }> => {
  try {
    const res = await fetch(FEISHU_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildCard(app)),
      signal: AbortSignal.timeout(8000),
    });

    const text = await res.text();
    let parsed: FeishuResponse | null = null;
    try {
      parsed = JSON.parse(text) as FeishuResponse;
    } catch {
      parsed = null;
    }

    const code = typeof parsed?.code === 'number' ? parsed.code : parsed?.StatusCode;
    const message = parsed?.msg ?? parsed?.StatusMessage ?? '';

    if (!res.ok) {
      return { ok: false, detail: `feishu_http_${res.status}` };
    }
    if (code !== 0 && code !== undefined) {
      return { ok: false, detail: `feishu_code_${code}_${String(message).slice(0, 80)}` };
    }
    if (!parsed) {
      return { ok: false, detail: 'feishu_invalid_response' };
    }
    return { ok: true, detail: 'sent' };
  } catch (error) {
    const reason = error instanceof Error ? error.name : 'unknown';
    return { ok: false, detail: `feishu_request_failed_${reason}` };
  }
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return respond({ ok: false, error: 'method_not_allowed' }, 405);
  }

  if (!FEISHU_WEBHOOK_URL) {
    console.error('[notify-feishu] FEISHU_BOT_WEBHOOK_URL 未配置');
    return respond({ ok: false, error: 'webhook_not_configured' }, 500);
  }

  if (!isFeishuWebhook(FEISHU_WEBHOOK_URL)) {
    console.error('[notify-feishu] Webhook 地址不是飞书机器人地址，已拒绝');
    return respond({ ok: false, error: 'invalid_webhook' }, 500);
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return respond({ ok: false, error: 'invalid_json' }, 400);
  }

  const app: Application = {
    name: clean(payload.name, 80),
    email: clean(payload.email, 160),
    phone: clean(payload.phone, 80),
    company: clean(payload.company, 120),
    teamSize: clean(payload.team_size ?? payload.teamSize, 60),
    preferredTime: clean(payload.preferred_time ?? payload.preferredTime, 60),
    scenario: clean(payload.scenario, 500),
    submittedAt: formatTime(new Date()),
  };

  if (!app.name || !app.email) {
    return respond({ ok: false, error: 'missing_required_fields' }, 400);
  }

  const result = await sendToFeishu(app);

  if (!result.ok) {
    // 申请记录已经写入数据库，这里只记录失败原因，不影响前端展示
    console.error('[notify-feishu] 通知发送失败:', result.detail, '申请邮箱:', app.email);
    return respond({ ok: false, error: 'notify_failed', detail: result.detail }, 502);
  }

  return respond({ ok: true });
});