import SiteNav from '@/components/feature/SiteNav';
import SiteFooter from '@/components/feature/SiteFooter';
import ClosingCTA from '@/components/feature/ClosingCTA';
import FaqAccordion, { type FaqItem } from '@/components/feature/FaqAccordion';
import TranscriptPanel from '@/components/feature/mocks/TranscriptPanel';
import NotesPanel from '@/components/feature/mocks/NotesPanel';
import AskPanel from '@/components/feature/mocks/AskPanel';
import TaskPanel from '@/components/feature/mocks/TaskPanel';
import KnowledgePanel from '@/components/feature/mocks/KnowledgePanel';
import WeChatPanel from '@/components/feature/mocks/WeChatPanel';
import FeaturesHero from './components/FeaturesHero';
import AnchorBar from './components/AnchorBar';
import FeatureSection from './components/FeatureSection';
import RealScreens from './components/RealScreens';

const FAQ: FaqItem[] = [
  {
    q: '录音满多久才会生成 AI 会议纪要？',
    a: '录音满 1 分钟后才会生成 AI 会议纪要。更短的录音不会生成纪要，但录音和逐字稿仍会保留，方便你回头确认。',
  },
  {
    q: '发言人区分准确吗？',
    a: '我们提供的是「区分发言人」，用来把逐字稿按不同说话人分开标注，让内容更好读。它不是身份识别，不会判断对方是谁、什么职位，实际效果也会受录音环境影响。',
  },
  {
    q: '疑问必须会中标记吗？',
    a: '目前是在 App 内手动标记有疑问的发言。录音卡双击标记还在验证中，暂未开放。',
  },
  {
    q: 'AI 的回答可以追查依据吗？',
    a: '可以。回答会标出引用的会议原话和相关资料，你可以逐条打开确认。是否把问题标记为已解决，由你自己决定。',
  },
  {
    q: '不绑定微信会少什么？',
    a: '只少掉微信里的接收和追问。会议记录、纪要、任务和知识库仍然在 App 内完整可用。',
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background-50">
      <SiteNav />
      <FeaturesHero />
      <AnchorBar />

      <FeatureSection
        id="realtime"
        index="01"
        eyebrow="实时会议记录"
        title="会议进行时，"
        highlight="重要信息不再一闪而过。"
        body="录音开始后，逐字稿一边说一边出现。AI 在过程中提示值得关注的疑点和风险，讨论再快也能跟得上。"
        points={['逐字稿实时出现', '支持区分发言人', '实时 AI 分析，提示疑点与风险', '回看原始发言与语音片段']}
        note="发言人区分作为整理辅助，不等同于识别每个人的真实身份或职位。"
      >
        <TranscriptPanel />
        <p className="mt-3 text-[11px] text-foreground-400">可以切换发言人筛选，或点击任意一句回听原声</p>
      </FeatureSection>

      <FeatureSection
        id="notes"
        index="02"
        eyebrow="会议纪要与思维导图"
        title="会议结束，"
        highlight="重点已经整理好。"
        body="结构化的一页里，结论、行动和原始依据集中呈现。回看时不用从头再听完整场录音。"
        points={[
          '一页读懂会议',
          '主要讨论与会议结论',
          '后续行动与待澄清问题',
          '逐字稿与思维导图',
          '点击依据，回到对应原话及音频',
        ]}
        note="录音满 1 分钟后才会生成 AI 会议纪要。"
        reverse
        tint
      >
        <NotesPanel />
        <p className="mt-3 text-[11px] text-foreground-400">切换上方标签，看看一页纪要里都装了什么</p>
      </FeatureSection>

      <FeatureSection
        id="questions"
        index="03"
        eyebrow="疑问标记与会后追问"
        title="有疑问，先标记，"
        highlight="稍后再弄清楚。"
        body="不打断会议，也能把想追问的问题留到会后处理。追问时，回答会结合这场会议的内容和你的资料。"
        points={[
          '会议中手动标记有疑问的发言',
          '会后结合会议内容寻找回答',
          '没讲清楚时，结合相关知识库资料分析',
          '查看回答依据，自己决定是否标记为已解决',
          '已绑定 ClawBot 的用户，可在微信继续追问',
        ]}
        note="目前是 App 内手动标记，录音卡双击标记暂未开放。"
      >
        <AskPanel />
        <p className="mt-3 text-[11px] text-foreground-400">试试点「会后追问」，再看依据和已解决状态</p>
      </FeatureSection>

      <FeatureSection
        id="tasks"
        index="04"
        eyebrow="任务、目标与承诺"
        title="会议说过的事，"
        highlight="有地方继续跟进。"
        body="行动项不再停在纪要里。它们进入首页任务列表，可以标记完成，也可以撤回，目标和承诺的进展集中可见。"
        points={['后续行动进入首页任务列表', '标记完成，也可以撤回完成状态', '查看目标进展、承诺与交期', '补充需要确认的信息']}
        reverse
        tint
      >
        <TaskPanel />
        <p className="mt-3 text-[11px] text-foreground-400">勾选或取消勾选任务，进度会跟着变化</p>
      </FeatureSection>

      <FeatureSection
        id="knowledge"
        index="05"
        eyebrow="知识库"
        title="让会议和资料，"
        highlight="连接起来。"
        body="把常用的资料导进来，会议纪要也可以作为资料留存。AI 分析时会结合相关资料，并标出来源。"
        points={['导入并管理资料', '会议纪要可以作为资料留存', 'AI 分析时结合相关资料', '查看资料来源与关联内容']}
      >
        <KnowledgePanel />
      </FeatureSection>

      <FeatureSection
        id="wechat"
        index="06"
        eyebrow="微信助手与职业化分析"
        title="会后继续，"
        highlight="帮你想一步。"
        body="绑定微信助手后，会议结束会在微信里收到摘要和 PDF。结合你的工作关注点，整理值得深入分析的问题。"
        points={[
          '用户可选择绑定微信助手',
          '针对有价值的问题生成职业相关分析成果',
          '通过 ClawBot 接收摘要和 PDF，并继续追问',
          '未绑定微信时，App 内的记录与结果仍可查看',
        ]}
        note="是否绑定由你决定，不绑定不影响会议记录与纪要。"
        reverse
        tint
      >
        <WeChatPanel />
        <p className="mt-3 text-[11px] text-foreground-400">切换「已绑定 / 未绑定」，看看两种状态下的差别</p>
      </FeatureSection>

      <RealScreens />

      <section className="border-t border-foreground-950/12 py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-page grid-cols-1 gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="text-[11.5px] tracking-[0.16em] text-foreground-500">常见问题</p>
            <h2 className="mt-4 text-[26px] leading-[1.42] md:text-[32px]">
              关于功能，
              <br />
              你可能想问的。
            </h2>
            <p className="mt-4 max-w-[300px] text-[12.5px] leading-[1.95] text-foreground-600">
              更完整的设备、连接与开放状态说明，放在常见问题页里。
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={FAQ} defaultOpen={-1} />
          </div>
        </div>
      </section>

      <ClosingCTA
        eyebrow="Agenote App"
        title="会开完了，"
        highlight="内容还能接着用。"
        body="把录音卡放在桌上，剩下的交给 Agenote。想先看看它怎么配合你的会议节奏，可以约一次体验。"
        primary={{ label: '申请体验', to: '/contact' }}
        secondary={{ label: '回到首页', to: '/' }}
      />
      <SiteFooter />
    </main>
  );
}