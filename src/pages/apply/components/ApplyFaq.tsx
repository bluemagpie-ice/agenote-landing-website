import { useState } from 'react';

type FaqItem = {
  q: string;
  a: string;
};

const FAQS: FaqItem[] = [
  {
    q: '为什么是邀请制，不能直接下载吗？',
    a: '录音卡目前是少量出货，iOS App 也还在 TestFlight 里迭代。先了解你的会议场景，能避免你装完发现用不上，也方便我们把版本调对。',
  },
  {
    q: 'TestFlight 是什么，怎么装 iOS App？',
    a: '申请通过后，你会收到一封 TestFlight 邀请邮件。先在 App Store 装好 TestFlight，再点邀请链接安装 Agenote，整个过程不需要 Apple 开发者账号。',
  },
  {
    q: '会议内容会被怎么处理？',
    a: '只在你主动开始时才录制，转写和纪要在你的账号下，可以随时导出或删除。资料不会转给第三方，也不会用于营销推送。',
  },
];

export default function ApplyFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-foreground-950/12 bg-background-50">
      <div className="flex items-center gap-2.5 px-5 pb-3.5 pt-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-100">
          <i className="ri-question-line flex h-3.5 w-3.5 items-center justify-center text-accent-800" />
        </span>
        <p className="text-[11.5px] tracking-[0.12em] text-foreground-500">关于邀请制</p>
      </div>

      <ul className="border-t border-foreground-950/10">
        {FAQS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <li key={item.q} className="border-b border-foreground-950/10 last:border-b-0">
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-start justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-background-100"
              >
                <span className="text-[12.5px] leading-[1.7] text-foreground-900">{item.q}</span>
                <i
                  className={`${
                    isOpen ? 'ri-subtract-line' : 'ri-add-line'
                  } mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-[14px] text-foreground-500`}
                />
              </button>
              {isOpen && (
                <p className="px-5 pb-4 text-[12px] leading-[1.9] text-foreground-600">{item.a}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}