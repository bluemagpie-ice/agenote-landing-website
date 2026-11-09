import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '@/components/base/SectionLabel';

type Stage = {
  n: string;
  label: string;
  title: string;
  lead: string;
  points: string[];
  tags: string[];
  stageKey: string;
};

const STAGES: Stage[] = [
  {
    n: '01',
    label: '会议前',
    title: '一键开启，轻松记录。',
    lead: '卡放桌上，按一下实体键就开始。手机麦克风也能直接录，不用先打开一堆设置。',
    points: ['录音卡实体按键开始 / 结束', '手机麦克风直接录音', '录音卡与 App 状态同步', '进入这场会议的专属页面'],
    tags: ['AI Voice 录音卡联动', '手机麦克风'],
    stageKey: 'before',
  },
  {
    n: '02',
    label: '会议中',
    title: '听懂每一句，跟上每一步。',
    lead: '转写一边说一边出现。技术黑话点开就有解释，听不懂的地方随手标记，当前焦点始终告诉你讨论到哪。',
    points: ['实时转写，区分发言人', '行业术语与专业黑话解释', '我的疑问：会中标记，不打断', '当前焦点：议题、进展、分歧、结论'],
    tags: ['黑话解释', '我的疑问', '当前焦点'],
    stageKey: 'during',
  },
  {
    n: '03',
    label: '会议后',
    title: '从会议讨论，到实际行动。',
    lead: '纪要、思维导图、逐字稿都在一页里。AI 把讨论拆成带负责人和截止时间的待办，进展可以追踪。',
    points: ['AI 会议纪要，结论可回溯原话', '思维导图与逐字稿', 'AI 自动生成待办事项', '任务进展追踪与状态更新'],
    tags: ['AI 待办事项', '进展追踪', 'AI 会议纪要'],
    stageKey: 'after',
  },
  {
    n: '04',
    label: '会议外',
    title: '离开会议，协作仍在继续。',
    lead: '任务提醒和会议通知会推到微信 Chatbox。想确认某件事，直接在微信里问，不用重新打开 App。',
    points: ['微信 Chatbox 接收任务推送', '会议通知与提醒', '在微信里追问已有会议', '不必始终打开 Agenote'],
    tags: ['微信 Chatbox', '任务推送'],
    stageKey: 'wechat',
  },
];

export default function Workflow() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <section className="border-y border-foreground-950/10 bg-background-100 py-16 md:py-24">
      <div className="mx-auto w-full max-w-page px-5 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="01">完整工作流程</SectionLabel>
            <h2 className="mt-5 max-w-[520px] text-[26px] leading-[1.4] text-foreground-950 md:text-[34px]">
              会议前、会议中、
              <br className="hidden sm:block" />
              会议后，还有会议以外。
            </h2>
          </div>
          <p className="max-w-[330px] text-[12.5px] leading-[1.95] text-foreground-600">
            四个阶段各解决一个问题。点开任意一段，看看 Agenote 在那一步具体做了什么。
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <ol className="lg:col-span-5">
            {STAGES.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.n} className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={`flex w-full cursor-pointer items-start gap-3 border-t border-foreground-950/12 px-1 py-4 text-left transition-colors ${
                      i === STAGES.length - 1 ? 'border-b' : ''
                    } ${on ? 'bg-background-50/70' : 'hover:bg-background-50/40'}`}
                  >
                    <span
                      className={`tnum mt-0.5 text-[11px] ${on ? 'text-primary-600' : 'text-foreground-400'}`}
                    >
                      {s.n}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span
                          className={`text-[14.5px] ${on ? 'text-foreground-950' : 'text-foreground-800'}`}
                        >
                          {s.label}
                        </span>
                        {on && <span className="h-1 w-1 rounded-full bg-accent-500" />}
                      </span>
                      <span
                        className={`mt-1 block text-[12px] leading-[1.7] ${
                          on ? 'text-foreground-900' : 'text-foreground-500'
                        }`}
                      >
                        {s.title}
                      </span>
                    </span>
                    <i
                      className={`ri-arrow-right-s-line mt-0.5 flex h-4 w-4 items-center justify-center text-[14px] transition-transform ${
                        on ? 'translate-x-0.5 text-primary-600' : 'text-foreground-300'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="lg:col-span-7">
            <div className="flex h-full flex-col rounded-lg border border-foreground-950/12 bg-background-50 p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10.5px] tracking-[0.14em] text-foreground-500">
                    阶段 {stage.n} · {stage.label}
                  </p>
                  <h3 className="mt-2 text-[21px] leading-[1.4] text-foreground-950 md:text-[25px]">
                    {stage.title}
                  </h3>
                </div>
                <span className="latin shrink-0 text-[48px] leading-none text-background-300 md:text-[64px]">
                  {stage.n}
                </span>
              </div>

              <p className="mt-3 max-w-[440px] text-[12.5px] leading-[1.95] text-foreground-600">
                {stage.lead}
              </p>

              <ul className="mt-4 grid grid-cols-1 gap-2 border-t border-foreground-950/10 pt-4 sm:grid-cols-2">
                {stage.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-[11.5px] leading-[1.7] text-foreground-800"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-500" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-foreground-950/10 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {stage.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-accent-300/70 bg-accent-50 px-2 py-0.5 text-[10px] text-accent-900"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/#interactive-${stage.stageKey}`}
                  className="group flex items-center gap-1.5 whitespace-nowrap text-[11.5px] text-primary-700 transition-colors hover:text-primary-800 cursor-pointer"
                >
                  跳到这一段演示
                  <i className="ri-arrow-right-line flex h-3.5 w-3.5 items-center justify-center transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}