import { Link } from 'react-router-dom';
import SiteNav from '@/components/feature/SiteNav';
import SiteFooter from '@/components/feature/SiteFooter';
import ContactForm from './components/ContactForm';

const CHANNELS = [
  { label: '销售与合作', value: 'hello@agenote.com', icon: 'ri-mail-line' },
  { label: '产品与售后', value: 'support@agenote.com', icon: 'ri-customer-service-2-line' },
  { label: '工作时间', value: '周一至周五 10:00–19:00 (GMT+8)', icon: 'ri-time-line' },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background-50">
      <SiteNav />

      <section className="relative overflow-hidden pb-10 pt-[104px] md:pb-14 md:pt-[132px]">
        <div className="grid-lines mask-fade-radial pointer-events-none absolute inset-0 opacity-45" />
        <div className="relative mx-auto w-full max-w-page px-5 md:px-8">
          <div className="flex items-center gap-2.5 text-[11.5px] tracking-[0.16em] text-foreground-500">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            联系我们
          </div>
          <h1 className="mt-6 max-w-[720px] text-[34px] leading-[1.3] tracking-[-0.02em] text-foreground-950 sm:text-[42px] md:text-[50px]">
            先说说，
            <br className="sm:hidden" />
            你的会是怎么开的。
          </h1>
          <p className="mt-5 max-w-[480px] text-[13.5px] leading-[2] text-foreground-600">
            想了解录音卡、App 或者团队使用方式，都可以从这里开始。
            写清楚你现在的会议习惯，我们会带着具体建议回复，而不是发一份通用介绍。
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-page px-5 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg border border-foreground-950/12 bg-background-100 p-6">
                <p className="text-[11.5px] tracking-[0.12em] text-foreground-500">回复时间</p>
                <p className="mt-2 text-[13.5px] leading-[1.9] text-foreground-800">
                  通常在一个工作日内回复。涉及设备与连接的问题，我们会先确认你使用的机型和系统版本。
                </p>
              </div>

              <div className="mt-4 rounded-lg border border-foreground-950/12 bg-background-50">
                <ul className="divide-y divide-foreground-950/10">
                  {CHANNELS.map((c) => (
                    <li key={c.label} className="flex items-start gap-3 px-5 py-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-background-100">
                        <i className={`${c.icon} flex h-3.5 w-3.5 items-center justify-center text-primary-700`} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] text-foreground-500">{c.label}</p>
                        <p className="mt-0.5 break-words text-[12.5px] text-foreground-900">{c.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-lg border border-accent-300/70 bg-accent-50 p-5">
                <p className="flex items-center gap-2 text-[11.5px] tracking-[0.12em] text-accent-800">
                  <i className="ri-wechat-line flex h-4 w-4 items-center justify-center" />
                  微信助手 · ClawBot
                </p>
                <p className="mt-2 text-[12.5px] leading-[1.9] text-foreground-700">
                  绑定后可接收会议摘要与 PDF，并在微信里继续追问。是否绑定完全由你决定，
                  不绑定也能在 App 内查看全部内容。
                </p>
              </div>

              <div className="mt-6 border-t border-foreground-950/12 pt-5">
                <p className="text-[11px] tracking-[0.12em] text-foreground-500">在找别的东西</p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {[
                    { label: '申请体验录音卡与 App', to: '/apply' },
                    { label: '看看 AI Voice 录音卡', to: '/device' },
                    { label: 'Agenote App 的六项功能', to: '/features' },
                    { label: '常见问题与开放状态', to: '/faq' },
                  ].map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="group flex cursor-pointer items-center justify-between gap-3 text-[12.5px] text-foreground-800 transition-colors hover:text-primary-700"
                    >
                      {l.label}
                      <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center text-foreground-400 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}