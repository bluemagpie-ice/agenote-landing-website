const ANCHORS = [
  { label: '实时记录', to: '#realtime' },
  { label: '纪要与导图', to: '#notes' },
  { label: '疑问与追问', to: '#questions' },
  { label: '任务与承诺', to: '#tasks' },
  { label: '知识库', to: '#knowledge' },
  { label: '微信助手', to: '#wechat' },
  { label: '真实界面', to: '#screens' },
];

export default function AnchorBar() {
  return (
    <div className="sticky top-[68px] z-30 border-y border-foreground-950/10 bg-background-50/92 backdrop-blur-xl md:top-20">
      <div className="mx-auto flex w-full max-w-page items-center gap-1 overflow-x-auto px-5 py-2.5 md:px-8">
        <span className="mr-2 hidden shrink-0 text-[10.5px] tracking-[0.12em] text-foreground-400 sm:block">
          产品功能
        </span>
        {ANCHORS.map((a) => (
          <a
            key={a.to}
            href={a.to}
            className="shrink-0 cursor-pointer whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] text-foreground-600 transition-colors hover:bg-background-100 hover:text-foreground-950"
          >
            {a.label}
          </a>
        ))}
      </div>
    </div>
  );
}