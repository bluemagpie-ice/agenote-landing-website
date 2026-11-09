import { Link } from 'react-router-dom';
import SectionLabel from '@/components/base/SectionLabel';

const TIER_ONE = [
  {
    icon: 'ri-book-open-line',
    title: '黑话解释',
    body: '会中点开术语就有解释，结合当前讨论的语境，而不是通用词典释义。',
  },
  {
    icon: 'ri-flag-2-line',
    title: '我的疑问',
    body: '听不懂的地方随手标记，不打断会议；会后带着时间点与上下文回来处理。',
  },
  {
    icon: 'ri-focus-3-line',
    title: '当前焦点',
    body: '议题、进展、主要分歧与最新结论随讨论更新，没内容的字段不会硬塞。',
  },
  {
    icon: 'ri-record-circle-line',
    title: '录音卡联动',
    body: '实体按键开始与结束录音，手机端同步进入这场会议的录音状态。',
  },
  {
    icon: 'ri-wechat-line',
    title: '微信 Chatbox',
    body: '任务推送、会议提醒和追问放在微信里，不必始终打开 Agenote。',
  },
];

const TIER_TWO = [
  {
    icon: 'ri-checkbox-multiple-line',
    title: 'AI 待办事项',
    body: '从讨论里拆出任务、负责人、截止时间与状态，保留来源原话。',
  },
  {
    icon: 'ri-line-chart-line',
    title: '任务进展追踪',
    body: '待开始、进行中、已完成集中查看，跨部门进度不再散落在群聊。',
  },
  {
    icon: 'ri-file-text-line',
    title: 'AI 会议纪要',
    body: '背景、结论、讨论与后续行动整理成一页，重要决策可回溯原话。',
  },
];

const TIER_THREE = [
  { icon: 'ri-live-line', label: '实时转写', note: '逐字出现，区分发言人' },
  { icon: 'ri-smartphone-line', label: '手机麦克风录音', note: '没有录音卡也能开始' },
  { icon: 'ri-node-tree', label: '思维导图', note: '会议结构一眼看完' },
  { icon: 'ri-file-list-3-line', label: '逐字稿', note: '带时间戳，可回听' },
];

function TierHeader({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[10.5px] tracking-[0.14em] text-foreground-500">
        <span className="tnum text-primary-600">{index}</span>
        <span className="h-px w-5 bg-foreground-950/20" />
        {title}
      </p>
      <p className="mt-2 text-[11px] leading-[1.8] text-foreground-500">{note}</p>
    </div>
  );
}

export default function FeatureTiers() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-page px-5 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="04">完整功能</SectionLabel>
            <h2 className="mt-5 max-w-[520px] text-[26px] leading-[1.4] text-foreground-950 md:text-[34px]">
              十二件事，
              <br className="hidden sm:block" />
              但不是同一个分量。
            </h2>
          </div>
          <p className="max-w-[330px] text-[12.5px] leading-[1.95] text-foreground-600">
            核心特色放在最前面，业务价值紧接其后，基础能力补全细节。
            所有能力都在这里，不会为了突出某三个而隐藏其他。
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-5 border-t border-foreground-950/12 pt-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <TierHeader index="第一层" title="产品特色" note="首页重点展示，交互演示里可以亲手试一遍" />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
              {TIER_ONE.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-lg border border-foreground-950/12 bg-background-50 px-3.5 py-3.5 transition-colors hover:border-primary-300 hover:bg-background-100/40"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-50">
                    <i className={`${f.icon} flex h-3.5 w-3.5 items-center justify-center text-primary-700`} />
                  </span>
                  <p className="mt-2.5 text-[12.5px] text-foreground-950">{f.title}</p>
                  <p className="mt-1 text-[11px] leading-[1.8] text-foreground-600">{f.body}</p>
                </div>
              ))}
              <Link
                to="/#interactive"
                className="flex cursor-pointer flex-col justify-center rounded-lg border border-dashed border-primary-300 bg-primary-50/50 px-3.5 py-3.5 transition-colors hover:bg-primary-50"
              >
                <span className="flex items-center gap-1.5 text-[12px] text-primary-800">
                  <i className="ri-play-circle-line flex h-3.5 w-3.5 items-center justify-center" />
                  直接在演示里试
                </span>
                <span className="mt-1 text-[11px] leading-[1.8] text-foreground-600">
                  五个特色能力都在同一场会里出现
                </span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 border-t border-foreground-950/12 pt-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <TierHeader index="第二层" title="业务价值" note="决定会议内容能不能真正落到行动上" />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-9">
              {TIER_TWO.map((f) => (
                <div key={f.title} className="rounded-lg border border-foreground-950/12 bg-background-100/60 px-3.5 py-3.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-background-50">
                    <i className={`${f.icon} flex h-3.5 w-3.5 items-center justify-center text-foreground-800`} />
                  </span>
                  <p className="mt-2.5 text-[12.5px] text-foreground-950">{f.title}</p>
                  <p className="mt-1 text-[11px] leading-[1.8] text-foreground-600">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 border-t border-foreground-950/12 pt-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <TierHeader index="第三层" title="基础能力" note="支撑上面所有体验的底层功能" />
            </div>
            <div className="lg:col-span-9">
              <div className="flex flex-wrap gap-2">
                {TIER_THREE.map((f) => (
                  <span
                    key={f.label}
                    className="flex items-center gap-2 rounded-md border border-foreground-950/12 px-2.5 py-1.5"
                  >
                    <i className={`${f.icon} flex h-3.5 w-3.5 items-center justify-center text-foreground-500`} />
                    <span className="text-[11.5px] text-foreground-900">{f.label}</span>
                    <span className="text-[10px] text-foreground-400">{f.note}</span>
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link
                  to="/features"
                  className="flex items-center gap-1.5 whitespace-nowrap text-[11.5px] text-primary-700 transition-colors hover:text-primary-800 cursor-pointer"
                >
                  看每一项的详细说明
                  <i className="ri-arrow-right-line flex h-3.5 w-3.5 items-center justify-center" />
                </Link>
                <span className="text-[10.5px] text-foreground-400">
                  双击标记、离线同步等仍在验证中的能力未列入本页
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}