import { useState, type FormEvent } from 'react';

const SUBMIT_ADDR = 'https://readdy.ai/api/form/dbint6h8lgee45nuv99g';

type FormResponse = {
  code?: string;
  message?: string;
  meta?: { message?: string; detail?: string };
};

const INTERESTS = ['AI Voice 录音卡', 'Agenote App', '团队使用方案', '媒体与合作'];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const honey = String(data.get('company_alt') ?? '').trim();
    if (honey) {
      setStatus('success');
      form.reset();
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const payload = new URLSearchParams();
    data.forEach((value, key) => {
      if (key === 'company_alt') return;
      payload.append(key, String(value));
    });

    try {
      const response = await fetch(SUBMIT_ADDR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });

      const responseText = await response.text();
      let parsed: FormResponse | null = null;
      try {
        parsed = JSON.parse(responseText) as FormResponse;
      } catch {
        parsed = null;
      }

      const message =
        parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText || '';
      const isSpam = typeof message === 'string' && message.toLowerCase().includes('spam');
      const ok = response.ok && parsed?.code === 'OK' && !isSpam;

      if (!ok) {
        setStatus('error');
        setErrorMsg(
          typeof message === 'string' && message && message.length < 200
            ? message
            : '提交没有成功，请稍后再试一次。',
        );
        return;
      }

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMsg('网络连接不太稳定，信息还没发出去，请稍后再试。');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-foreground-950/12 bg-background-50 p-7 md:p-9">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100">
          <i className="ri-check-line flex h-5 w-5 items-center justify-center text-primary-700" />
        </span>
        <h2 className="mt-5 text-[22px] leading-[1.4]">收到了，我们会尽快联系你。</h2>
        <p className="mt-2 max-w-[400px] text-[13px] leading-[1.95] text-foreground-600">
          一般在一个工作日内回复。如果你留下了具体的使用场景，我们会带着更合适的问题来找你。
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 cursor-pointer rounded-md border border-foreground-950/15 px-4 py-2.5 text-[12.5px] text-foreground-800 transition-colors hover:bg-background-100"
        >
          再填一次
        </button>
      </div>
    );
  }

  return (
    <form
      id="agenote-contact-form"
      data-readdy-form
      onSubmit={handleSubmit}
      className="rounded-lg border border-foreground-950/12 bg-background-50 p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor="name" className="mb-1.5 block text-[12px] text-foreground-700">
            怎么称呼你
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="姓名"
            className="box-border h-11 w-full rounded-md border border-foreground-950/15 bg-background-50 px-3 text-[13px] text-foreground-900 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none"
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="email" className="mb-1.5 block text-[12px] text-foreground-700">
            邮箱
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@company.com"
            className="box-border h-11 w-full rounded-md border border-foreground-950/15 bg-background-50 px-3 text-[13px] text-foreground-900 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none"
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="company" className="mb-1.5 block text-[12px] text-foreground-700">
            公司或团队
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="选填"
            className="box-border h-11 w-full rounded-md border border-foreground-950/15 bg-background-50 px-3 text-[13px] text-foreground-900 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none"
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="interest" className="mb-1.5 block text-[12px] text-foreground-700">
            想了解什么
          </label>
          <select
            id="interest"
            name="interest"
            defaultValue={INTERESTS[0]}
            className="box-border h-11 w-full cursor-pointer rounded-md border border-foreground-950/15 bg-background-50 px-3 text-[13px] text-foreground-900 focus:border-primary-400 focus:outline-none"
          >
            {INTERESTS.map((it) => (
              <option key={it} value={it}>
                {it}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0 sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-[12px] text-foreground-700">
            说说你的会议场景
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={500}
            placeholder="比如：每周有 6 场跨部门会，纪要经常拖到第二天。"
            className="box-border w-full resize-none rounded-md border border-foreground-950/15 bg-background-50 px-3 py-2.5 text-[13px] leading-[1.8] text-foreground-900 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none"
          />
          <p className="mt-1.5 text-[11px] text-foreground-400">最多 500 字，写得具体一点，回复会更有用。</p>
        </div>
      </div>

      {/* 保留字段，请勿填写 */}
      <input
        type="text"
        name="company_alt"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        readOnly
        className="field-away"
      />

      {status === 'error' && (
        <p className="mt-4 rounded-md border border-accent-300 bg-accent-50 px-3 py-2 text-[12px] leading-[1.7] text-accent-900">
          {errorMsg}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-5 py-3 text-[13.5px] text-background-50 transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {status === 'submitting' ? '正在发送…' : '发送'}
          <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center" />
        </button>
        <p className="text-[11px] leading-[1.8] text-foreground-400">
          信息仅用于这次沟通，不会用于其他用途。
        </p>
      </div>
    </form>
  );
}