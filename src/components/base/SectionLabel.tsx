import type { ReactNode } from 'react';

type Props = {
  index?: string;
  children: ReactNode;
  tone?: 'light' | 'dark';
};

export default function SectionLabel({ index, children, tone = 'light' }: Props) {
  return (
    <div
      className={`flex items-center gap-3 text-[11px] tracking-[0.18em] ${
        tone === 'dark' ? 'text-background-400' : 'text-foreground-500'
      }`}
    >
      {index && (
        <span className={`tnum ${tone === 'dark' ? 'text-accent-300' : 'text-primary-600'}`}>{index}</span>
      )}
      <span className={`h-px w-8 ${tone === 'dark' ? 'bg-background-100/25' : 'bg-foreground-950/20'}`} />
      <span>{children}</span>
    </div>
  );
}