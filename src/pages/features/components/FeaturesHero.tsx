import { Link } from 'react-router-dom';

const CONTENTS = [
  { n: '01', label: '实时会议记录', to: '#realtime' },
  { n: '02', label: '纪要与思维导图', to: '#notes' },
  { n: '03', label: '疑问标记与会后追问', to: '#questions' },
  { n: '04', label: '任务、目标与承诺', to: '#tasks' },
  { n: '05', label: '知识库', to: '#knowledge' },
  { n: '06', label: '微信助手与职业分析', to: '#wechat' },
];

export default function FeaturesHero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-[104px] md:pb-20 md:pt-[132px]">
      <div className="grid-lines mask-fade-radial pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto w-full max-w-page px-5 md:px-8">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2.5 text-[11.5px] tracking-[0.16em] text-foreground-500">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              Agenote App
            </div>

            <h1 className="animate-rise mt-6 text-[36px] leading-[1.26] tracking-[-0.02em] text-foreground-950 sm:text-[44px] md:text-[54px]">
              把会议里的话，
              <br />
              变成能接着做的事。
            </h1>

            <p className="animate-rise mt-6 max-w-[470px] text-[14px] leading-[2] text-foreground-600 md:text-[15px]" style={{ animationDelay: '120ms' }}>
              从实时逐字稿到会议纪要，从待澄清的问题到行动项。所有内容都回到同一场会议里，
              不用在几个工具之间来回搬运。
            </p>

            <div className="animate-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ animationDelay: '200ms' }}>
              <Link
                to="/contact"
                className="flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-5 py-3 text-[13.5px] text-background-50 transition-colors hover:bg-primary-600 cursor-pointer"
              >
                预约体验
                <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center" />
              </Link>
              <Link
                to="/device"
                className="flex items-center gap-1.5 whitespace-nowrap text-[12.5px] text-foreground-700 transition-colors hover:text-primary-700 cursor-pointer"
              >
                先看看录音卡
                <i className="ri-arrow-right-up-line flex h-4 w-4 items-center justify-center" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg border border-foreground-950/12 bg-background-50">
              <div className="flex items-center justify-between border-b border-foreground-950/10 px-4 py-3">
                <span className="text-[11.5px] tracking-[0.1em] text-foreground-500">一场会议里包含</span>
                <span className="text-[10.5px] text-foreground-400">6 个部分</span>
              </div>
              <nav className="flex flex-col">
                {CONTENTS.map((c) => (
                  <a
                    key={c.n}
                    href={c.to}
                    className="group flex items-center gap-3 border-b border-foreground-950/8 px-4 py-2.5 transition-colors last:border-b-0 hover:bg-background-100 cursor-pointer"
                  >
                    <span className="tnum text-[10.5px] text-foreground-400">{c.n}</span>
                    <span className="min-w-0 flex-1 text-[12.5px] text-foreground-800 group-hover:text-foreground-950">
                      {c.label}
                    </span>
                    <i className="ri-arrow-right-s-line flex h-4 w-4 items-center justify-center text-foreground-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-600" />
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}