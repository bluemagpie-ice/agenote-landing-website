import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const TEAM_SIZES = ['1–10 人', '11–50 人', '51–200 人', '200 人以上'];
const TIME_SLOTS = ['工作日 10:00–12:00', '工作日 14:00–18:00', '工作日 19:00 之后', '周末'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const FIELD_BASE =
  'box-border h-11 w-full rounded-md border border-foreground-950/15 bg-background-50 px-3 text-[13px] text-foreground-900 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none';

type ApplicationPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  team_size: string;
  preferred_time: string;
  scenario: string;
};

/**
 * 申请记录写入成功后才调用；通知走独立的后端函数，Webhook 地址不经过浏览器。
 * 发送失败只记录日志，不影响已经保存的申请数据，也不影响用户看到的成功提示。
 */
const notifyFeishu = (application: ApplicationPayload) => {
  supabase.functions
    .invoke('notify-feishu-trial-application', { body: application })
    .then(({ error }) => {
      if (error) {
        console.warn('飞书通知未送达，申请记录已保存：', error.message);
      }
    })
    .catch(() => {
      console.warn('飞书通知未送达，申请记录已保存');
    });
};

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // 保留字段：正常用户不会填写
    if (String(data.get('contact_alt') ?? '').trim()) {
      setStatus('success');
      form.reset();
      return;
    }

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();

    if (!name) {
      setStatus('error');
      setErrorMsg('还差一个称呼，填上我们好知道怎么叫你。');
      return;
    }

    if (!email.includes('@')) {
      setStatus('error');
      setErrorMsg('邮箱看起来不太对，检查一下再提交。');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const application: ApplicationPayload = {
        name,
        email,
        phone: String(data.get('phone') ?? '').trim(),
        company: String(data.get('company') ?? '').trim(),
        team_size: String(data.get('team_size') ?? ''),
        preferred_time: String(data.get('preferred_time') ?? ''),
        scenario: String(data.get('scenario') ?? '').trim().slice(0, 500),
      };

      const { error } = await supabase.from('trial_applications').insert({
        ...application,
        phone: application.phone || null,
        company: application.company || null,
        team_size: application.team_size || null,
        preferred_time: application.preferred_time || null,
        scenario: application.scenario || null,
        source: 'website',
      });

      if (error) {
        throw new Error(error.message);
      }

      // 先存库，再通知；通知失败不会影响这条记录
      notifyFeishu(application);

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMsg('申请没有发出去，可能是网络不太稳。稍后再试一次，或者直接写信给 hello@agenote.com。');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-foreground-950/12 bg-background-50 p-7 md:p-9">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100">
          <i className="ri-check-line flex h-5 w-5 items-center justify-center text-primary-700" />
        </span>
        <h2 className="mt-5 text-[22px] leading-[1.4]">申请收到了。</h2>
        <p className="mt-2 max-w-[420px] text-[13px] leading-[1.95] text-foreground-600">
          我们会在一个工作日内，按你选的时段联系你。带着你写的那个会议场景，我们会给出更具体的方案，
          而不是一份通用介绍。
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="cursor-pointer whitespace-nowrap rounded-md border border-foreground-950/15 px-4 py-2.5 text-[12.5px] text-foreground-800 transition-colors hover:bg-background-100"
          >
            再提交一份
          </button>
          <Link
            to="/features"
            className="group flex cursor-pointer items-center gap-2 whitespace-nowrap text-[12.5px] text-primary-700"
          >
            先看看六项功能
            <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      id="agenote-apply-form"
      onSubmit={handleSubmit}
      className="flex h-full flex-col rounded-lg border border-foreground-950/12 bg-background-50 p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor="apply-name" className="mb-1.5 block text-[12px] text-foreground-700">
            怎么称呼你
          </label>
          <input
            id="apply-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="姓名"
            className={FIELD_BASE}
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="apply-email" className="mb-1.5 block text-[12px] text-foreground-700">
            邮箱
          </label>
          <input
            id="apply-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@company.com"
            className={FIELD_BASE}
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="apply-phone" className="mb-1.5 block text-[12px] text-foreground-700">
            手机或微信
          </label>
          <input
            id="apply-phone"
            name="phone"
            type="text"
            autoComplete="tel"
            placeholder="选填，方便约时间"
            className={FIELD_BASE}
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="apply-company" className="mb-1.5 block text-[12px] text-foreground-700">
            公司或团队
          </label>
          <input
            id="apply-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="选填"
            className={FIELD_BASE}
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="apply-team-size" className="mb-1.5 block text-[12px] text-foreground-700">
            团队规模
          </label>
          <select
            id="apply-team-size"
            name="team_size"
            defaultValue={TEAM_SIZES[1]}
            className={`${FIELD_BASE} cursor-pointer`}
          >
            {TEAM_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label htmlFor="apply-time" className="mb-1.5 block text-[12px] text-foreground-700">
            方便联系的时段
          </label>
          <select
            id="apply-time"
            name="preferred_time"
            defaultValue={TIME_SLOTS[1]}
            className={`${FIELD_BASE} cursor-pointer`}
          >
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0 sm:col-span-2">
          <label htmlFor="apply-scenario" className="mb-1.5 block text-[12px] text-foreground-700">
            你现在最想解决的会议场景
          </label>
          <textarea
            id="apply-scenario"
            name="scenario"
            rows={5}
            maxLength={500}
            placeholder="比如：每周 6 场跨部门会，黑话太多，新同事跟不上；纪要常常拖到第二天。"
            className="box-border w-full resize-none rounded-md border border-foreground-950/15 bg-background-50 px-3 py-2.5 text-[13px] leading-[1.8] text-foreground-900 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none"
          />
          <p className="mt-1.5 text-[11px] text-foreground-400">最多 500 字。写得越具体，第一次沟通越有用。</p>
        </div>
      </div>

      {/* 保留字段，请勿填写 */}
      <input
        type="text"
        name="contact_alt"
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

      <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-5 py-3 text-[13.5px] text-background-50 transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? '正在提交…' : '提交申请'}
          <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center" />
        </button>
        <p className="text-[11px] leading-[1.8] text-foreground-400">
          资料只用于这次沟通，不会进任何营销名单。
        </p>
      </div>
    </form>
  );
}