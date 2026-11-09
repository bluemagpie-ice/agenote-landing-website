const FILES = [
  { icon: 'ri-file-pdf-line', name: 'Q3 预算口径确认.pdf', meta: '8 月 14 日 · 知识库', tone: 'accent' },
  { icon: 'ri-file-word-line', name: '渠道费用补充说明.docx', meta: '9 月 2 日 · 知识库', tone: 'secondary' },
  { icon: 'ri-file-text-line', name: '产品周会 · 10 月 28 日纪要', meta: '本次会议 · 已存入', tone: 'primary' },
];

export default function KnowledgePanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-foreground-950/12 bg-background-50">
      <div className="flex items-center justify-between border-b border-foreground-950/10 bg-background-100/60 px-4 py-3">
        <span className="flex items-center gap-2 text-[12.5px] text-foreground-900">
          <i className="ri-book-2-line flex h-4 w-4 items-center justify-center text-foreground-600" />
          团队知识库
        </span>
        <span className="text-[10.5px] text-foreground-500">12 份资料</span>
      </div>
      <ul className="divide-y divide-foreground-950/8">
        {FILES.map((f) => (
          <li key={f.name} className="flex items-center gap-3 px-4 py-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded ${
                f.tone === 'accent' ? 'bg-accent-100' : f.tone === 'secondary' ? 'bg-secondary-200' : 'bg-primary-100'
              }`}
            >
              <i
                className={`${f.icon} flex h-4 w-4 items-center justify-center ${
                  f.tone === 'accent'
                    ? 'text-accent-800'
                    : f.tone === 'secondary'
                      ? 'text-secondary-900'
                      : 'text-primary-800'
                }`}
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] text-foreground-900">{f.name}</p>
              <p className="text-[10.5px] text-foreground-500">{f.meta}</p>
            </div>
            <i className="ri-arrow-right-s-line flex h-4 w-4 items-center justify-center text-foreground-300" />
          </li>
        ))}
      </ul>
      <div className="border-t border-foreground-950/10 bg-background-100/40 px-4 py-3">
        <p className="text-[10.5px] text-foreground-500">AI 分析时引用</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {['预算口径', '渠道费用', '上周结论'].map((t) => (
            <span
              key={t}
              className="rounded-full border border-foreground-950/12 bg-background-50 px-2 py-0.5 text-[10.5px] text-foreground-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}