import { useState } from 'react';

const EVIDENCE = [
  { icon: 'ri-mic-line', label: '会议原话', meta: '00:28 · 发言人 2' },
  { icon: 'ri-book-2-line', label: '知识库 · Q3 预算口径确认', meta: '8 月 14 日上传' },
  { icon: 'ri-book-2-line', label: '知识库 · 渠道费用补充说明', meta: '9 月 2 日上传' },
];

export default function AskPanel() {
  const [asked, setAsked] = useState(false);
  const [resolved, setResolved] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-foreground-950/12 bg-background-50">
      <div className="flex items-center justify-between border-b border-foreground-950/10 bg-accent-50 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] text-accent-800">
          <i className="ri-flag-2-line flex h-3.5 w-3.5 items-center justify-center" />
          会议中标记的疑问
        </span>
        <span className="text-[10.5px] text-foreground-500">00:28 · 发言人 2</span>
      </div>

      <div className="px-4 py-4">
        <p className="text-[13.5px] leading-[1.8] text-foreground-950">
          预算口径和上季度对齐的那版不一致，以哪一版为准？
        </p>

        {!asked ? (
          <button
            type="button"
            onClick={() => setAsked(true)}
            className="mt-3 flex cursor-pointer items-center gap-1.5 rounded-md bg-primary-500 px-3 py-2 text-[12px] text-background-50 transition-colors hover:bg-primary-600"
          >
            <i className="ri-question-answer-line flex h-3.5 w-3.5 items-center justify-center" />
            会后追问
          </button>
        ) : (
          <div className="mt-3 animate-fade rounded-lg border border-foreground-950/10 bg-background-100/50 p-3">
            <p className="text-[11px] tracking-[0.1em] text-foreground-500">结合会议与知识库</p>
            <p className="mt-1.5 text-[12.5px] leading-[1.8] text-foreground-800">
              以 8 月确认的「确认版」口径为准。本季度新增的渠道费用单独列项，不并入原口径；
              会上提到的差异来自 6 月的试行版，已作废。
            </p>

            <ul className="mt-3 flex flex-col gap-1.5">
              {EVIDENCE.map((e) => (
                <li
                  key={e.label}
                  className="flex items-center gap-2 rounded border border-foreground-950/10 bg-background-50 px-2 py-1.5"
                >
                  <i className={`${e.icon} flex h-3.5 w-3.5 items-center justify-center text-foreground-500`} />
                  <span className="min-w-0 flex-1 truncate text-[11.5px] text-foreground-800">{e.label}</span>
                  <span className="shrink-0 text-[10px] text-foreground-400">{e.meta}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-[10.5px] text-foreground-500">要不要标记为已解决，由你决定</p>
              <button
                type="button"
                onClick={() => setResolved((v) => !v)}
                className={`flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] transition-colors ${
                  resolved
                    ? 'border-primary-500 bg-primary-500 text-background-50'
                    : 'border-foreground-950/15 text-foreground-700 hover:bg-background-200/60'
                }`}
              >
                <i
                  className={`${resolved ? 'ri-check-double-line' : 'ri-check-line'} flex h-3.5 w-3.5 items-center justify-center`}
                />
                {resolved ? '已解决' : '标记为已解决'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}