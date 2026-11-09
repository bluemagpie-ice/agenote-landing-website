import type { ReactNode } from 'react';

type Props = {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** 手机外壳 —— 用于承载 Demo 的 App 界面 */
export default function PhoneFrame({ header, children, className = '' }: Props) {
  return (
    <div className={`w-full max-w-[420px] rounded-[26px] border border-foreground-950/15 bg-background-100 p-[6px] ${className}`}>
      <div className="overflow-hidden rounded-[20px] border border-foreground-950/10 bg-background-50">
        <div className="flex items-center justify-between border-b border-foreground-950/10 bg-background-100/50 px-3 py-1.5">
          <span className="tnum text-[10px] text-foreground-500">14:00</span>
          <span className="h-1 w-10 rounded-full bg-foreground-950/20" />
          <span className="flex items-center gap-1 text-[10px] text-foreground-500">
            <i className="ri-signal-tower-line flex h-3 w-3 items-center justify-center" />
            <i className="ri-battery-charge-line flex h-3 w-3 items-center justify-center" />
          </span>
        </div>
        {header}
        {children}
      </div>
    </div>
  );
}