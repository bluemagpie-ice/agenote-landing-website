import { Link } from 'react-router-dom';
import SiteNav from '@/components/feature/SiteNav';
import SiteFooter from '@/components/feature/SiteFooter';
import ClosingCTA from '@/components/feature/ClosingCTA';
import FaqAccordion, { type FaqItem } from '@/components/feature/FaqAccordion';
import SectionLabel from '@/components/base/SectionLabel';

type Group = { id: string; title: string; items: FaqItem[] };

const GROUPS: Group[] = [
  {
    id: 'device',
    title: '设备与连接',
    items: [
      {
        q: '怎么把录音卡连到手机？',
        a: '打开 Agenote App，在设备页里添加录音卡，按引导完成蓝牙连接。连接成功后，设备状态页会显示连接状态、电量、存储容量、固件版本和序列号。',
      },
      {
        q: '使用时需要一直连着手机吗？',
        a: '录音卡需要与 App 保持连接，按下实体键后才会直接进入这场会议的页面并同步逐字稿。具体的连接与使用方式，以 App 内的引导为准。',
      },
      {
        q: '卡上没有屏幕，怎么知道正在录音？',
        a: '录音状态会同时显示在 App 的会议页面和设备页里。录音卡本身只保留必要的按键与指示灯，不增加额外的操作负担。',
      },
      {
        q: '可以给录音卡改名字吗？',
        a: '可以。在设备页修改名称，比如「客户会议」「周会」，App 内的会议和设备列表都会使用这个名称，多人共用时更不容易拿错。',
      },
    ],
  },
  {
    id: 'meetings',
    title: '会议记录与纪要',
    items: [
      {
        q: '录音满多久才会生成 AI 会议纪要？',
        a: '录音满 1 分钟后才会生成 AI 会议纪要。更短的录音不会生成纪要，但录音与逐字稿仍会保留。',
      },
      {
        q: '发言人识别到什么程度？',
        a: '支持区分发言人，把逐字稿按不同说话人分开标注，比如发言人 1、发言人 2、发言人 3。它不是身份识别，不会判断对方是谁或什么职位，实际效果也会受录音环境影响。',
      },
      {
        q: '可以回听当时的原声吗？',
        a: '可以。逐字稿和语音片段都会保留，点击任意一句就能回听对应的原话，方便确认语气和上下文。',
      },
      {
        q: '纪要怎么查看和带走？',
        a: '可以直接在 App 里查看一页纪要、主要讨论、结论、后续行动、待澄清问题与思维导图。绑定微信助手后，也可以在微信里收到摘要与 PDF。',
      },
    ],
  },
  {
    id: 'followup',
    title: '疑问、任务与知识库',
    items: [
      {
        q: '会议中的疑问怎么标记？',
        a: '目前是在 App 内手动标记有疑问的发言。录音卡双击标记还在验证中，暂未开放。',
      },
      {
        q: 'AI 给出的回答能查依据吗？',
        a: '可以。回答会标出引用的会议原话与相关资料，你可以逐条打开确认。是否把这个问题标记为已解决，由你自己决定。',
      },
      {
        q: '任务标记完成后还能撤回吗？',
        a: '可以。首页任务列表支持标记完成，也支持撤回完成状态。目标和承诺的进展会同步更新。',
      },
      {
        q: '知识库可以放什么资料？',
        a: '常用的工作资料都可以导入并管理，会议纪要也可以作为资料留存。AI 在分析时会结合相关资料，并标出引用来源与关联内容。',
      },
    ],
  },
  {
    id: 'wechat',
    title: '微信助手',
    items: [
      {
        q: '一定要绑定微信才能用吗？',
        a: '不必须。绑定后可以在微信里接收摘要与 PDF 并继续追问；不绑定也可以在 App 内查看完整的会议记录、纪要和结果。',
      },
      {
        q: '绑定后会收到什么？',
        a: '会议结束后会收到摘要与 PDF，并可以在微信里就这场会议继续追问。是否绑定由你决定，也可以随时解绑。',
      },
      {
        q: '职业化分析是什么？',
        a: '会议结束后，针对其中有价值的问题，结合你的工作关注点生成职业相关分析成果，通过 ClawBot 送达，并支持继续追问。具体内容以实际生成为准。',
      },
    ],
  },
  {
    id: 'roadmap',
    title: '开放状态与参数',
    items: [
      {
        q: '现在还不能用的功能有哪些？',
        a: '录音卡双击标记疑问、录音卡离线文件同步这两项还没有完成验证，暂未开放，因此不作为现有卖点宣传。上线时间以 App 内公告为准。',
      },
      {
        q: '续航、存储容量和麦克风参数是多少？',
        a: '这些具体数字以厂家规格和实际设备为准。官网不写死数字，避免和你手上的设备不一致。',
      },
      {
        q: '功能会变化吗？',
        a: '会。产品的功能边界会随着验证进展调整，实际可用的功能以 App 内为准。已经开放的能力，我们会尽量稳定地保留。',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-background-50">
      <SiteNav />

      <section className="relative overflow-hidden pb-12 pt-[104px] md:pb-16 md:pt-[132px]">
        <div className="grid-lines mask-fade-radial pointer-events-none absolute inset-0 opacity-45" />
        <div className="relative mx-auto w-full max-w-page px-5 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 text-[11.5px] tracking-[0.16em] text-foreground-500">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                常见问题
              </div>
              <h1 className="mt-6 text-[34px] leading-[1.28] tracking-[-0.02em] text-foreground-950 sm:text-[42px] md:text-[50px]">
                关于录音卡和 App，
                <br />
                先把这些说清楚。
              </h1>
              <p className="mt-5 max-w-[460px] text-[13.5px] leading-[2] text-foreground-600">
                连接方式、纪要生成规则、发言人区分的边界，以及哪些功能还没开放。
                如果有没写到的地方，可以直接问我们。
              </p>
            </div>

            <div className="lg:col-span-5">
              <nav className="rounded-lg border border-foreground-950/12 bg-background-50 lg:mt-2">
                {GROUPS.map((g, i) => (
                  <a
                    key={g.id}
                    href={`#${g.id}`}
                    className="group flex items-center gap-3 border-b border-foreground-950/8 px-4 py-2.5 transition-colors last:border-b-0 hover:bg-background-100 cursor-pointer"
                  >
                    <span className="tnum text-[10.5px] text-foreground-400">0{i + 1}</span>
                    <span className="flex-1 text-[12.5px] text-foreground-800 group-hover:text-foreground-950">
                      {g.title}
                    </span>
                    <span className="text-[10.5px] text-foreground-400">{g.items.length} 个问题</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-foreground-950/12">
        {GROUPS.map((g, i) => (
          <section
            key={g.id}
            id={g.id}
            className={`scroll-mt-24 border-b border-foreground-950/12 py-12 md:py-16 ${
              i % 2 === 1 ? 'bg-background-100' : 'bg-background-50'
            }`}
          >
            <div className="mx-auto grid w-full max-w-page grid-cols-1 gap-8 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionLabel index={`0${i + 1}`}>{g.title}</SectionLabel>
              </div>
              <div className="lg:col-span-8">
                <FaqAccordion items={g.items} defaultOpen={-1} />
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-page px-5 md:px-8">
          <div className="grid grid-cols-1 gap-6 rounded-lg border border-accent-300/70 bg-accent-50 px-6 py-7 md:grid-cols-12 md:items-center md:px-8">
            <div className="md:col-span-8">
              <p className="flex items-center gap-2 text-[11.5px] tracking-[0.12em] text-accent-800">
                <i className="ri-information-line flex h-4 w-4 items-center justify-center" />
                关于「尚未开放」
              </p>
              <p className="mt-2 max-w-[620px] text-[12.5px] leading-[1.95] text-foreground-700">
                录音卡双击标记、录音卡离线文件同步仍在验证中，暂未开放。续航、存储与麦克风参数以厂家规格和
                实际设备为准。我们不会把这些写进现有卖点里。
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-foreground-950 px-4 py-2.5 text-[12.5px] text-background-50 transition-colors hover:bg-foreground-800 cursor-pointer"
              >
                还有问题？问我们
                <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ClosingCTA
        eyebrow="准备好再开始"
        title="先体验一次，"
        highlight="再决定怎么用。"
        body="带上你自己的会议场景来试：录音卡怎么连接、纪要怎么整理、行动项怎么跟进，一次就能看明白。"
        primary={{ label: '申请体验', to: '/contact' }}
        secondary={{ label: '查看产品功能', to: '/features' }}
      />
      <SiteFooter />
    </main>
  );
}