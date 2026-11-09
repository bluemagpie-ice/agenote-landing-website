import { DEMO_STAGES } from '@/mocks/meeting';

type Props = {
  active: number;
  progress: number[];
  onSelect: (index: number) => void;
};

/** 左侧固定阶段导航：滚动时逐段推进进度条 */
export default function StageRail({ active, progress, onSelect }: Props) {
  return (
    <div className="sticky top-24">
      <p className="flex items-center gap-2 text-[10.5px] tracking-[0.16em] text-foreground-500">
        <span className="h-px w-6 bg-foreground-950/25" />
        演示流程
      </p>

      <ol className="mt-5 flex flex-col gap-5">
        {DEMO_STAGES.map((s, i) => {
          const on = i === active;
          const pct = on ? Math.round((progress[i] ?? 0) * 100) : (progress[i] ?? 0) >= 1 ? 100 : 0;

          return (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={on ? 'step' : undefined}
                className="group block w-full cursor-pointer text-left"
              >
                <span className="flex items-baseline gap-2">
                  <span
                    className={`tnum text-[10px] transition-colors ${
                      on ? 'text-primary-600' : 'text-foreground-400'
                    }`}
                  >
                    {s.index}
                  </span>
                  <span
                    className={`text-[13.5px] transition-colors ${
                      on ? 'text-foreground-950' : 'text-foreground-500 group-hover:text-foreground-800'
                    }`}
                  >
                    {s.label}
                  </span>
                  <i
                    className={`${s.icon} ml-auto flex h-3.5 w-3.5 items-center justify-center text-[12px] transition-colors ${
                      on ? 'text-primary-600' : 'text-foreground-300'
                    }`}
                  />
                </span>

                <span className="mt-2 block h-[2px] w-full overflow-hidden rounded-full bg-foreground-950/12">
                  <span
                    className="block h-full rounded-full bg-primary-500 transition-[width] duration-200 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </span>

                <span
                  className={`mt-1.5 block text-[10.5px] leading-[1.6] transition-colors ${
                    on ? 'text-foreground-700' : 'text-foreground-400'
                  }`}
                >
                  {s.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-7 flex items-center gap-1.5 text-[10px] text-foreground-400">
        <i className="ri-mouse-line flex h-3.5 w-3.5 items-center justify-center" />
        继续向下滚动
      </div>
    </div>
  );
}