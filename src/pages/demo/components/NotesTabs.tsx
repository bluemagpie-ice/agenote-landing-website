import { useState } from 'react';
import { AI_NOTES, MINDMAP, MEETING, TONE_STYLE, TRANSCRIPT } from '@/mocks/meeting';

const TABS = ['AI 纪要', '思维导图', '逐字稿'] as const;

/** 会后的三份内容，来自同一场会议 */
export default function NotesTabs({ className = '' }: { className?: string }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>('AI 纪要');
  const [quote, setQuote] = useState<number | null>(0);

  return (
    <div className={`overflow-hidden rounded-lg border border-foreground-950/12 bg-background-50 ${className}`}>
      <div className="flex items-center justify-between border-b border-foreground-950/10 bg-background-100/60 px-3.5 py-2.5">
        <span className="flex items-center gap-2 text-[12px] text-foreground-900">
          <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-primary-500">
            <i className="ri-file-text-line flex h-2.5 w-2.5 items-center justify-center text-[8px] text-background-50" />
          </span>
          {MEETING.title} · {MEETING.date}
        </span>
        <span className="hidden text-[10px] text-foreground-500 sm:block">
          {MEETING.duration} · 4 位发言人
        </span>
      </div>

      <div className="flex gap-1 border-b border-foreground-950/10 px-2.5 py-1.5">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`cursor-pointer whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] transition-colors ${
              tab === t
                ? 'bg-foreground-950 text-background-50'
                : 'text-foreground-600 hover:bg-background-200/60'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="max-h-[452px] overflow-y-auto px-3.5 py-3">
        {tab === 'AI 纪要' && (
          <div>
            <p className="text-[10px] tracking-[0.12em] text-foreground-500">会议背景</p>
            <p className="mt-1.5 text-[12px] leading-[1.85] text-foreground-800">{AI_NOTES.background}</p>

            <p className="mt-3.5 text-[10px] tracking-[0.12em] text-foreground-500">核心结论与决策</p>
            <ul className="mt-1.5 flex flex-col gap-1.5">
              {AI_NOTES.decisions.map((d, i) => (
                <li key={d.text} className="rounded-md border border-foreground-950/10 bg-background-100/40 px-2.5 py-2">
                  <p className="text-[12px] leading-[1.75] text-foreground-900">{d.text}</p>
                  <button
                    type="button"
                    onClick={() => setQuote(quote === i ? null : i)}
                    className="mt-1 flex cursor-pointer items-center gap-1 text-[10.5px] text-primary-700"
                  >
                    <i className="ri-link flex h-3 w-3 items-center justify-center" />
                    {quote === i ? '收起依据' : '查看依据'}
                  </button>
                  {quote === i && (
                    <p className="mt-1 animate-fade border-l-2 border-accent-400 bg-accent-50 px-2 py-1 text-[10.5px] leading-[1.7] text-foreground-700">
                      {d.quote}
                      <span className="tnum ml-1 text-foreground-500">· {d.time}</span>
                    </p>
                  )}
                </li>
              ))}
            </ul>

            <p className="mt-3.5 text-[10px] tracking-[0.12em] text-foreground-500">主要讨论</p>
            <ul className="mt-1 flex flex-col divide-y divide-foreground-950/8">
              {AI_NOTES.discussion.map((d) => (
                <li key={d.title} className="flex items-start gap-2 py-2">
                  <span className="min-w-0 flex-1">
                    <span className="text-[11.5px] text-foreground-900">{d.title}</span>
                    <span className="mt-0.5 block text-[10.5px] text-foreground-500">{d.note}</span>
                  </span>
                  <span className="shrink-0 text-right text-[10px] text-foreground-500">
                    {d.dept}
                    <br />
                    {d.minutes}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === '思维导图' && (
          <div>
            <div className="flex items-start gap-0">
              <div className="shrink-0 rounded-md bg-foreground-950 px-2.5 py-2 text-[11px] leading-[1.5] text-background-50">
                {MINDMAP.root}
              </div>
              <span className="mt-6 h-px w-3 shrink-0 bg-foreground-950/25" />
              <div className="flex-1 border-l border-foreground-950/25 pl-3">
                {MINDMAP.branches.map((b) => (
                  <div key={b.label} className="relative py-1.5">
                    <span className="absolute -left-3 top-[18px] h-px w-3 bg-foreground-950/25" />
                    <p className="text-[11.5px] text-foreground-900">{b.label}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {b.children.map((c) => (
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
            <p className="mt-3 text-[10.5px] leading-[1.7] text-foreground-500">
              导图按会议讨论的层级生成，可以逐层展开回看上下文。
            </p>
          </div>
        )}

        {tab === '逐字稿' && (
          <ul className="flex flex-col divide-y divide-foreground-950/8">
            {TRANSCRIPT.map((line) => (
              <li key={line.id} className="py-2">
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${TONE_STYLE[line.tone].dot}`} />
                  <span className={`rounded px-1.5 py-0.5 text-[10px] ${TONE_STYLE[line.tone].chip}`}>
                    {line.dept}
                  </span>
                  <span className="text-[10.5px] text-foreground-600">{line.speaker}</span>
                  <span className="tnum ml-auto text-[10px] text-foreground-400">{line.time}</span>
                </div>
                <p className="mt-1 text-[11.5px] leading-[1.75] text-foreground-800">
                  {line.text.replace(/\{\{|\}\}/g, '')}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-foreground-950/10 px-3.5 py-2 text-[10px] text-foreground-500">
        <span className="flex items-center gap-1.5">
          <i className="ri-time-line flex h-3 w-3 items-center justify-center" />
          录音满 1 分钟后生成纪要
        </span>
        <span className="hidden sm:block">三个视图来自同一场会议</span>
      </div>
    </div>
  );
}