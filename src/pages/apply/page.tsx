import SiteNav from '@/components/feature/SiteNav';
import SiteFooter from '@/components/feature/SiteFooter';
import ApplyForm from './components/ApplyForm';
import ApplyFaq from './components/ApplyFaq';

const STEPS = [
  { title: '填写申请', desc: '两分钟，写清你现在的会议场景，比填一堆公司信息有用。' },
  { title: '我们回访', desc: '一个工作日内，按你选的时段联系，先确认适配度再谈下一步。' },
  { title: '安排体验', desc: '匹配的话，发你 TestFlight 邀请装上 iOS App，并安排录音卡的试用。' },
];

const ANDROID_DOWNLOAD_URL = 'https://www.pgyer.com/yanshuyunduan';

const NOTES = [
  { icon: 'ri-time-line', label: '一个工作日内回复', value: '工作日 10:00–19:00（GMT+8）' },
  { icon: 'ri-shield-check-line', label: '数据只用在这件事上', value: '不转给第三方，不做营销推送' },
  { icon: 'ri-user-voice-line', label: '先看适配度', value: '场景不匹配我们会直说' },
];

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-background-50">
      <SiteNav />

      <section className="relative overflow-hidden pb-10 pt-[104px] md:pb-14 md:pt-[132px]">
        <div className="grid-lines mask-fade-radial pointer-events-none absolute inset-0 opacity-45" />
        <div className="pointer-events-none absolute -left-32 top-10 h-[360px] w-[360px] rounded-full bg-accent-100/40 blur-[120px]" />
        <div className="relative mx-auto w-full max-w-page px-5 md:px-8">
          <div className="flex items-center gap-2.5 text-[11.5px] tracking-[0.16em] text-foreground-500">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            iOS 体验申请
          </div>
          <h1 className="mt-6 max-w-[720px] text-[34px] leading-[1.3] tracking-[-0.02em] text-foreground-950 sm:text-[42px] md:text-[50px]">
            先说说，
            <br className="sm:hidden" />
            你的会卡在哪一步。
          </h1>
          <p className="mt-5 max-w-[520px] text-[13.5px] leading-[2] text-foreground-600">
            iOS 版 Agenote App 与录音卡目前是邀请制体验，通过 TestFlight 分发。填一张申请，
            我们会先判断你的会议场景能不能真被帮上忙，再决定要不要占用你的时间。
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-foreground-500">
            <span>用安卓？不用等邀请，</span>
            <a
              href={ANDROID_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex cursor-pointer items-center gap-1 whitespace-nowrap text-primary-700"
            >
              直接下载安装包
              <i className="ri-arrow-right-line flex h-3.5 w-3.5 items-center justify-center transition-transform group-hover:translate-x-0.5" />
            </a>
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-page px-5 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <ApplyForm />
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg border border-foreground-950/12 bg-background-100 p-6">
                <p className="text-[11.5px] tracking-[0.12em] text-foreground-500">提交之后</p>
                <ol className="mt-4 flex flex-col gap-4">
                  {STEPS.map((s, i) => (
                    <li key={s.title} className="flex gap-3">
                      <span className="tnum mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background-50 text-[11px] text-primary-700">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[13px] text-foreground-900">{s.title}</p>
                        <p className="mt-1 text-[12px] leading-[1.85] text-foreground-600">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-4 rounded-lg border border-foreground-950/12 bg-background-50">
                <ul className="divide-y divide-foreground-950/10">
                  {NOTES.map((n) => (
                    <li key={n.label} className="flex items-start gap-3 px-5 py-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-background-100">
                        <i className={`${n.icon} flex h-3.5 w-3.5 items-center justify-center text-primary-700`} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] text-foreground-500">{n.label}</p>
                        <p className="mt-0.5 break-words text-[12.5px] text-foreground-900">{n.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <ApplyFaq />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}