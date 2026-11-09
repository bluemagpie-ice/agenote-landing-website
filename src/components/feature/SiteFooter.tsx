import { Link } from 'react-router-dom';
import { APP_ICON } from '@/mocks/assets';

const COLS = [
  {
    title: '产品',
    items: [
      { label: 'AI Voice 录音卡', to: '/device' },
      { label: '产品功能', to: '/features' },
      { label: '交互体验 Demo', to: '/#interactive' },
      { label: '常见问题', to: '/faq' },
    ],
  },
  {
    title: '能力',
    items: [
      { label: '实时会议记录', to: '/features#realtime' },
      { label: '黑话解释与当前焦点', to: '/#interactive-during' },
      { label: '纪要与思维导图', to: '/features#notes' },
      { label: '任务与进展追踪', to: '/features#tasks' },
    ],
  },
  {
    title: '支持',
    items: [
      { label: '申请体验', to: '/apply' },
      { label: '联系我们', to: '/contact' },
      { label: '使用说明', to: '/faq#device' },
      { label: '功能开放状态', to: '/faq#roadmap' },
      { label: '微信 Chatbox', to: '/features#wechat' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-foreground-950/10 bg-background-100">
      <div className="mx-auto w-full max-w-page px-5 pb-10 pt-14 md:px-8 md:pb-12 md:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src={APP_ICON}
                alt="Agenote App 图标"
                title="Agenote · 会议助手"
                className="h-11 w-11 shrink-0 rounded-lg object-cover md:h-12 md:w-12"
              />
              <p className="latin text-[34px] leading-none tracking-tight text-foreground-950 md:text-[42px]">
                Agenote
              </p>
            </div>
            <p className="mt-5 max-w-[320px] text-[13.5px] leading-[1.9] text-foreground-600">
              一款面向跨部门协作的 AI 会议助手。
              <br />
              让员工在会议中理解信息，在会议后推动行动。
            </p>
            <p className="mt-6 flex items-center gap-2 text-[12px] text-foreground-500">
              <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              </span>
              设备与 App 配合使用，微信助手可自行选择绑定
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="mb-4 text-[12px] tracking-[0.14em] text-foreground-500">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      to={it.to}
                      className="cursor-pointer whitespace-nowrap text-[13.5px] text-foreground-700 transition-colors hover:text-primary-700"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-foreground-950/10 pt-6 text-[12px] text-foreground-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Agenote · 续航、存储与麦克风参数以厂家规格和实际设备为准</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/faq#roadmap" className="cursor-pointer transition-colors hover:text-foreground-900">
              尚未开放的功能
            </Link>
            <Link to="/contact" className="cursor-pointer transition-colors hover:text-foreground-900">
              隐私与数据
            </Link>
            <Link to="/contact" className="cursor-pointer transition-colors hover:text-foreground-900">
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}