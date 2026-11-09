import { useState } from 'react';
import type { FocusSnapshot } from '@/mocks/meeting';

type Props = {
  focus: FocusSnapshot | null;
  className?: string;
};

/** 当前焦点 —— 只渲染这一时刻真正有内容的字段 */
export default function FocusCard({ focus, className = '' }: Props) {
  const [showEvidence, setShowEvidence] = useState(false);

  if (!focus) {
    return (
      <div className={`rounded-lg border border-dashed border-foreground-950/15 bg-background-50 px-4 py-6 ${className}`}>
        <p className="text-[11.5px] text-foreground-500">会议刚开始，AI 还在整理这一段的议题。</p>
      </div>
    );
  }

  const rows: { label: string; value: string }[] = [];
  if (focus.issue) rows.push({ label: '当前议题', value: focus.issue });
  if (focus.progress) rows.push({ label: '讨论进展', value: focus.progress });
  if (focus.conclusion) rows.push({ label: '最新结论', value: focus.conclusion });
  if (focus.background) rows.push({ label: '关键背景', value: focus.background });

  return (
    <div className={`rounded-lg border border-foreground-950/12 bg-background-50 ${className}`}>
      <div className="flex items-center justify-between border-b border-foreground-950/10 bg-primary-50/70 px-3.5 py-2">
        <span className="flex items-center gap-1.5 text-[11px] text-primary-800">
          <i className="ri-focus-3-line flex h-3.5 w-3.5 items-center justify-center" />
          当前焦点
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-foreground-500">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          随讨论更新
        </span>
      </div>

      <div className="divide-y divide-foreground-950/8">
        {rows.map((r) => (
          <div key={r.label} className="px-3.5 py-2.5">
            <p className="text-[10px] tracking-[0.1em] text-foreground-500">{r.label}</p>
            <p className="mt-1 text-[12px] leading-[1.75] text-foreground-900">{r.value}</p>
          </div>
        ))}

        {focus.divergences && focus.divergences.length > 0 && (
          <div className="px-3.5 py-2.5">
            <p className="text-[10px] tracking-[0.1em] text-foreground-500">主要分歧</p>
            <ul className="mt-1 flex flex-col gap-1">
              {focus.divergences.map((d) => (
                <li key={d} className="flex items-start gap-1.5 text-[12px] leading-[1.7] text-foreground-900">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {focus.evidence && (
        <div className="border-t border-foreground-950/10 px-3.5 py-2">
          <button
            type="button"
            onClick={() => setShowEvidence((v) => !v)}
            className="flex cursor-pointer items-center gap-1 text-[10.5px] text-primary-700 transition-colors hover:text-primary-800"
          >
            <i className="ri-link flex h-3 w-3 items-center justify-center" />
            {showEvidence ? '收起依据' : '查看依据'}
          </button>
          {showEvidence && (
            <p className="mt-1.5 animate-fade border-l-2 border-accent-400 bg-accent-50 px-2 py-1.5 text-[10.5px] leading-[1.7] text-foreground-700">
              {focus.evidence.label} · {focus.evidence.time}
            </p>
          )}
        </div>
      )}
    </div>
  );
}