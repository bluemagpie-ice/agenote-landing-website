import { useState } from 'react';

const TABS = ['一页读懂', '主要讨论', '会议结论', '后续行动', '待澄清', '思维导图'] as const;

const DISCUSSION = [
  { title: '发版范围与验收节奏', owner: '发言人 1', mins: '18 分钟', note: '确认本周发版范围，验收顺延到下周一' },
  { title: '预算口径与上季度对齐', owner: '发言人 2', mins: '12 分钟', note: '两版口径不一致，会上没有结论' },
  { title: '渠道排期同步', owner: '发言人 1', mins: '9 分钟', note: '会后同步一版，交给渠道同事' },
];

const CONCLUSIONS = [
  { text: '本周版本按原定计划发布，剩余验收顺延至下周一。', quote: '“这周的版本先按原定计划发，剩下的验收放到下周一。”', time: '00:12' },
  { text: '渠道排期以会后同步的版本为准，会上不逐条确认。', quote: '“渠道排期我们会后再同步一版。”', time: '00:41' },
];

const ACTIONS = [
  { task: '整理验收清单并发到群里', owner: '发言人 3', due: '周三前', done: true },
  { task: '同步一版渠道排期', owner: '发言人 1', due: '本周五', done: true },
  { task: '确认预算口径以哪一版为准', owner: '发言人 2', due: '下周一', done: false },
];

const OPEN = [
  { q: '预算口径以哪一版为准？', status: '待确认', source: '会议原话 · 00:28' },
  { q: '下周一验收由谁最终签字？', status: '待补充', source: '会议原话 · 00:17' },
];

const MINDMAP = [
  { label: '发版', children: ['本周按原计划', '验收顺延'] },
  { label: '预算', children: ['口径不一致', '待确认'] },
  { label: '渠道', children: ['会后同步排期'] },
  { label: '人', children: ['验收清单 · 发言人 3'] },
];

export default function NotesPanel() {
  const [tab, setTab] = useState<string>('一页读懂');
  const [evidence, setEvidence] = useState<number | null>(0);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-foreground-950/12 bg-background-50">
      <div className="flex items-center justify-between border-b border-foreground-950/10 bg-background-100/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-primary-500">
            <i className="ri-file-text-line flex h-3 w-3 items-center justify-center text-[10px] text-background-50" />
          </span>
          <span className="text-[12.5px] text-foreground-900">产品周会 · 10 月 28 日</span>
        </div>
        <span className="text-[10.5px] text-foreground-500">42 分钟 · 3 位发言人</span>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-foreground-950/10 px-3 py-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`cursor-pointer whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] transition-colors ${
              tab === t
                ? 'bg-primary-500 text-background-50'
                : 'text-foreground-600 hover:bg-background-200/70'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="min-h-[306px] px-4 py-4">
        {tab === '一页读懂' && (
          <div>
            <p className="text-[11px] tracking-[0.12em] text-foreground-500">本次会议</p>
            <p className="mt-2 text-[13.5px] leading-[1.85] text-foreground-800">
              确认了本周版本的发版范围，把验收、渠道排期和预算口径三件事拆到了具体负责人。
              预算口径仍在两个版本之间，会上没有形成结论。
            </p>
            <div className="mt-4 grid grid-cols-3 divide-x divide-foreground-950/10 border-y border-foreground-950/10">
              {[
                { v: '2', l: '会议结论' },
                { v: '3', l: '后续行动' },
                { v: '2', l: '待澄清' },
              ].map((s) => (
                <div key={s.l} className="px-3 py-3">
                  <p className="latin text-[26px] leading-none text-foreground-950">{s.v}</p>
                  <p className="mt-1.5 text-[11px] text-foreground-500">{s.l}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-[11.5px] text-foreground-500">
              <i className="ri-time-line flex h-3.5 w-3.5 items-center justify-center" />
              录音满 1 分钟后才会生成 AI 会议纪要
            </p>
          </div>
        )}

        {tab === '主要讨论' && (
          <ul className="flex flex-col divide-y divide-foreground-950/10">
            {DISCUSSION.map((d, i) => (
              <li key={d.title} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span className="tnum mt-0.5 text-[11px] text-foreground-400">0{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-foreground-950">{d.title}</p>
                  <p className="mt-1 text-[11.5px] leading-[1.7] text-foreground-600">{d.note}</p>
                </div>
                <span className="shrink-0 text-right text-[10.5px] text-foreground-500">
                  {d.owner}
                  <br />
                  {d.mins}
                </span>
              </li>
            ))}
          </ul>
        )}

        {tab === '会议结论' && (
          <ul className="flex flex-col gap-2">
            {CONCLUSIONS.map((c, i) => (
              <li key={c.text} className="rounded-lg border border-foreground-950/10 bg-background-100/40 p-3">
                <p className="text-[13px] leading-[1.75] text-foreground-900">{c.text}</p>
                <button
                  type="button"
                  onClick={() => setEvidence(evidence === i ? null : i)}
                  className="mt-2 flex cursor-pointer items-center gap-1 text-[11px] text-primary-700"
                >
                  <i className="ri-link flex h-3.5 w-3.5 items-center justify-center" />
                  依据
                  <i
                    className={`${
                      evidence === i ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                    } flex h-3.5 w-3.5 items-center justify-center`}
                  />
                </button>
                {evidence === i && (
                  <div className="mt-2 border-l-2 border-accent-400 bg-accent-50 px-3 py-2">
                    <p className="text-[11.5px] leading-[1.7] text-foreground-700">{c.quote}</p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-[10.5px] text-foreground-500">
                      <i className="ri-play-circle-line flex h-3.5 w-3.5 items-center justify-center" />
                      回听原声 {c.time}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {tab === '后续行动' && (
          <ul className="flex flex-col gap-2">
            {ACTIONS.map((a) => (
              <li
                key={a.task}
                className="flex items-center gap-3 rounded-lg border border-foreground-950/10 px-3 py-2.5"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${
                    a.done
                      ? 'border-primary-500 bg-primary-500 text-background-50'
                      : 'border-foreground-950/25'
                  }`}
                >
                  {a.done && <i className="ri-check-line flex h-3 w-3 items-center justify-center text-[10px]" />}
                </span>
                <span
                  className={`min-w-0 flex-1 text-[12.5px] ${
                    a.done ? 'text-foreground-500 line-through' : 'text-foreground-900'
                  }`}
                >
                  {a.task}
                </span>
                <span className="shrink-0 text-[10.5px] text-foreground-500">
                  {a.owner} · {a.due}
                </span>
              </li>
            ))}
            <li className="mt-1 text-[11px] text-foreground-500">行动项会同步到首页任务列表，可以完成，也可以撤回。</li>
          </ul>
        )}

        {tab === '待澄清' && (
          <ul className="flex flex-col gap-2">
            {OPEN.map((o) => (
              <li key={o.q} className="rounded-lg border border-accent-300/70 bg-accent-50/70 p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[12.5px] leading-[1.7] text-foreground-900">{o.q}</p>
                  <span className="shrink-0 rounded-full bg-accent-200 px-2 py-0.5 text-[10px] text-accent-900">
                    {o.status}
                  </span>
                </div>
                <p className="mt-1.5 text-[10.5px] text-foreground-500">{o.source}</p>
              </li>
            ))}
            <li className="mt-1 text-[11px] text-foreground-500">
              会后可以结合会议内容与相关知识库资料继续追问。
            </li>
          </ul>
        )}

        {tab === '思维导图' && (
          <div className="flex items-center gap-0">
            <div className="shrink-0 rounded-md bg-foreground-950 px-3 py-2 text-[11.5px] text-background-50">
              本周版本
            </div>
            <span className="h-px w-4 shrink-0 bg-foreground-950/25" />
            <div className="relative flex-1 border-l border-foreground-950/25 py-1 pl-3">
              {MINDMAP.map((m) => (
                <div key={m.label} className="relative py-1.5">
                  <span className="absolute -left-3 top-1/2 h-px w-3 bg-foreground-950/25" />
                  <p className="text-[11.5px] text-foreground-900">{m.label}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {m.children.map((c) => (
                      <span
                        key={c}
                        className="rounded border border-foreground-950/12 bg-background-100 px-1.5 py-0.5 text-[10px] text-foreground-700"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-foreground-950/10 px-4 py-2.5 text-[10.5px] text-foreground-500">
        <span className="flex items-center gap-1.5">
          <i className="ri-file-list-3-line flex h-3.5 w-3.5 items-center justify-center" />
          逐字稿已保留，可随时回听
        </span>
        <span className="hidden sm:block">点击结论后的「依据」回到原话</span>
      </div>
    </div>
  );
}