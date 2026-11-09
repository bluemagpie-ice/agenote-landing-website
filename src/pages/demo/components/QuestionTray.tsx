import { useState } from 'react';
import type { MeetingQuestion } from '@/mocks/meeting';

type Props = {
  items: MeetingQuestion[];
  className?: string;
  title?: string;
};

/** 我的疑问 —— 会中标记的清单，会后可以看处理结果 */
export default function QuestionTray({ items, className = '', title = '我的疑问' }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={`rounded-lg border border-foreground-950/12 bg-background-50 ${className}`}>
      <div className="flex items-center justify-between border-b border-foreground-950/10 bg-accent-50/70 px-3.5 py-2">
        <span className="flex items-center gap-1.5 text-[11px] text-accent-900">
          <i className="ri-flag-2-line flex h-3.5 w-3.5 items-center justify-center" />
          {title}
        </span>
        <span className="tnum text-[10px] text-foreground-500">{items.length} 条</span>
      </div>

      {items.length === 0 ? (
        <p className="px-3.5 py-5 text-[11.5px] leading-[1.8] text-foreground-500">
          还没有标记疑问。会中点到「标记疑问」，不打断会议，也不会漏掉。
        </p>
      ) : (
        <ul className="divide-y divide-foreground-950/8">
          {items.map((q) => {
            const open = openId === q.id;
            return (
              <li key={q.id} className="px-3.5 py-2.5">
                <div className="flex items-start gap-2">
                  <span className="tnum mt-0.5 text-[10px] text-foreground-400">{q.time}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] leading-[1.7] text-foreground-900">{q.question}</p>
                    <p className="mt-0.5 truncate text-[10.5px] text-foreground-500">{q.context}</p>
                  </div>
                  <span
                    className={`shrink-0 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[10px] ${
                      q.status === '已回复'
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-accent-100 text-accent-900'
                    }`}
                  >
                    {q.status}
                  </span>
                </div>

                {q.answer && (
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : q.id)}
                    className="mt-1 cursor-pointer text-[10.5px] text-primary-700 transition-colors hover:text-primary-800"
                  >
                    {open ? '收起回答' : '查看回答'}
                  </button>
                )}

                {open && q.answer && (
                  <p className="mt-1.5 animate-fade border-l-2 border-primary-300 bg-primary-50/60 px-2 py-1.5 text-[11px] leading-[1.75] text-foreground-800">
                    {q.answer}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}