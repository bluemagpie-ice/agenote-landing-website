type Props = {
  index: string;
  label: string;
  title: string;
  note: string;
  onReset?: () => void;
};

/** 每个演示面板顶部的统一标题区 */
export default function PanelHeader({ index, label, title, note, onReset }: Props) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-foreground-950/10 pb-3">
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[10.5px] tracking-[0.14em] text-foreground-500">
          <span className="tnum text-primary-600">{index}</span>
          <span className="h-px w-5 bg-foreground-950/20" />
          {label}
        </p>
        <h3 className="mt-2 text-[18px] leading-[1.4] text-foreground-950 md:text-[21px]">{title}</h3>
        <p className="mt-1 text-[11.5px] leading-[1.8] text-foreground-500">{note}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <span className="flex items-center gap-1.5 rounded-full border border-accent-300 bg-accent-50 px-2 py-1 text-[10px] text-accent-900">
          <i className="ri-flask-line flex h-3 w-3 items-center justify-center" />
          模拟演示
        </span>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            title="重置这一段演示"
            className="flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-full border border-foreground-950/12 px-2 py-1 text-[10px] text-foreground-600 transition-colors hover:bg-background-100"
          >
            <i className="ri-restart-line flex h-3 w-3 items-center justify-center" />
            重置
          </button>
        )}
      </div>
    </div>
  );
}