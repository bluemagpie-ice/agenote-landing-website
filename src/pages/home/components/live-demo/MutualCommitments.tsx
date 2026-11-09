import { useState } from 'react';
import {
  COMMITMENTS,
  COMMITMENT_NOTE,
  COMMITMENT_TABS,
  type CommitmentSide,
} from '@/mocks/commitments';
import CommitmentCard from './CommitmentCard';

/** 双向承诺 · 我方 / 对方两个标签，各自一份承诺清单 */
export default function MutualCommitments() {
  const [side, setSide] = useState<CommitmentSide>('theirs');

  const list = COMMITMENTS.filter((c) => c.side === side);
  const countOf = (s: CommitmentSide) => COMMITMENTS.filter((c) => c.side === s).length;

  return (
    <div className="rounded-lg border border-foreground-950/12 bg-background-50 p-3">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="flex items-center gap-1.5 text-[11px] text-foreground-700">
          <i className="ri-shake-hands-line flex h-3.5 w-3.5 items-center justify-center text-[13px] text-primary-700" />
          基于会议内容生成 · 保留语音证据
        </p>
        <p className="tnum text-[9.5px] text-foreground-500">共 {COMMITMENTS.length} 项承诺</p>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1 rounded-full bg-background-200/60 p-1">
        {COMMITMENT_TABS.map((tab) => {
          const active = side === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSide(tab.key)}
              aria-pressed={active}
              className={`flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[11px] transition-colors ${
                active
                  ? 'bg-background-50 text-foreground-950'
                  : 'text-foreground-600 hover:text-foreground-900'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  tab.key === 'mine' ? 'bg-primary-500' : 'bg-accent-500'
                } ${active ? 'opacity-100' : 'opacity-40'}`}
              />
              {tab.label}
              <span
                className={`tnum flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9.5px] ${
                  active ? 'bg-foreground-950 text-background-50' : 'bg-background-300/70 text-foreground-600'
                }`}
              >
                {countOf(tab.key)}
              </span>
            </button>
          );
        })}
      </div>

      <div key={side} className="mt-2 flex animate-fade flex-col gap-1.5">
        {list.map((item) => (
          <CommitmentCard key={item.id} item={item} />
        ))}
      </div>

      <p className="mt-2 flex flex-wrap items-center gap-x-1 border-t border-foreground-950/10 pt-1.5 text-[9.5px] leading-[1.6] text-foreground-500">
        <i className="ri-information-line flex h-2.5 w-2.5 shrink-0 items-center justify-center" />
        {COMMITMENT_NOTE}点击播放可回放原话。
      </p>
    </div>
  );
}