import { useState } from 'react';

export type FaqItem = { q: string; a: string };

type Props = {
  items: FaqItem[];
  defaultOpen?: number;
};

export default function FaqAccordion({ items, defaultOpen = 0 }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="border-t border-foreground-950/12">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-foreground-950/12">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-start gap-4 py-4 text-left"
            >
              <span className="min-w-0 flex-1 text-[14px] leading-[1.7] text-foreground-950">{item.q}</span>
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  isOpen
                    ? 'border-primary-500 bg-primary-500 text-background-50'
                    : 'border-foreground-950/20 text-foreground-600'
                }`}
              >
                <i
                  className={`${isOpen ? 'ri-subtract-line' : 'ri-add-line'} flex h-3.5 w-3.5 items-center justify-center text-[13px]`}
                />
              </span>
            </button>
            {isOpen && (
              <div className="animate-fade pb-5 pr-10">
                <p className="text-[13px] leading-[1.95] text-foreground-600">{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}