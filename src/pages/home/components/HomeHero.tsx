import { Link } from 'react-router-dom';
import { MEETING, PARTICIPANTS, TONE_STYLE, TRANSCRIPT, QUESTIONS } from '@/mocks/meeting';
import TermText from '@/pages/demo/components/TermText';
import { DEVICE_IMAGE } from '@/mocks/assets';

const FACTS = ['实时术语解释', '当前焦点', 'AI 待办与追踪', '微信提醒'];

const HERO_LINES = [TRANSCRIPT[1], TRANSCRIPT[4]];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-[104px] md:pb-24 md:pt-[136px]">
      <div className="grid-lines mask-fade-radial pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-40 top-16 h-[460px] w-[460px] rounded-full bg-accent-100/50 blur-[130px]" />

      <div className="relative mx-auto w-full max-w-page px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="animate-rise flex flex-wrap items-center gap-2.5 text-[11.5px] tracking-[0.14em] text-foreground-500">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              面向跨部门协作的 AI 会议助手
            </div>

            <h1
              className="animate-rise mt-6 text-[36px] leading-[1.25] tracking-[-0.02em] text-foreground-950 sm:text-[44px] md:text-[56px] md:leading-[1.2]"
              style={{ animationDelay: '80ms' }}
            >
              不止记录会议，
              <br />
              更让每个人
              <br className="hidden sm:block" />
              跟上讨论。
            </h1>

            <p
              className="animate-rise mt-6 max-w-[470px] text-[14px] leading-[2] text-foreground-600 md:text-[15px]"
              style={{ animationDelay: '160ms' }}
            >
              从录音卡一键记录，到实时会议理解、AI 任务追踪与微信智能提醒，
              让跨部门协作更加顺畅。听懂、跟上、落实，都在同一场会议里。
            </p>

            <div
              className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '230ms' }}
            >
              <Link
                to="/#interactive"
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-5 py-3 text-[13.5px] text-background-50 transition-colors hover:bg-primary-600 cursor-pointer"
              >
                <i className="ri-play-circle-line flex h-4 w-4 items-center justify-center" />
                体验产品
              </Link>
              <Link
                to="/features"
                className="group flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-foreground-950/15 px-5 py-3 text-[13.5px] text-foreground-800 transition-colors hover:bg-background-100 cursor-pointer"
              >
                探索全部功能
                <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center text-foreground-500 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <ul
              className="animate-rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-foreground-950/10 pt-5"
              style={{ animationDelay: '310ms' }}
            >
              {FACTS.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-[11.5px] text-foreground-600">
                  <i className="ri-check-line flex h-3.5 w-3.5 items-center justify-center text-primary-600" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* 会议实时理解场景 */}
          <div className="animate-rise relative lg:col-span-6" style={{ animationDelay: '180ms' }}>
            <div className="pointer-events-none absolute -left-3 -top-3 hidden h-full w-full rounded-xl border border-foreground-950/10 md:block" />

            <div className="relative overflow-hidden rounded-xl border border-foreground-950/12 bg-background-50">
              <div className="flex items-center justify-between border-b border-foreground-950/10 bg-background-100/60 px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="rec-dot relative h-2 w-2 rounded-full bg-accent-500" />
                  <span className="text-[11.5px] text-foreground-900">录音中</span>
                  <span className="tnum text-[10.5px] text-foreground-500">00:06:12</span>
                </div>
                <span className="rounded-full border border-foreground-950/12 px-1.5 py-0.5 text-[9.5px] text-foreground-500">
                  {MEETING.card} · 已连接
                </span>
              </div>

              <div className="px-3.5 pt-2.5">
                <p className="text-[10.5px] text-foreground-500">{MEETING.title}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {PARTICIPANTS.map((p) => (
                    <span
                      key={p.dept}
                      className={`rounded-full px-1.5 py-0.5 text-[9.5px] ${TONE_STYLE[p.tone].chip}`}
                    >
                      {p.dept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-2 divide-y divide-foreground-950/8 border-y border-foreground-950/8">
                {HERO_LINES.map((line) => (
                  <div key={line.id} className="px-3.5 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${TONE_STYLE[line.tone].dot}`} />
                      <span className="text-[10.5px] text-foreground-600">
                        {line.dept} · {line.speaker}
                      </span>
                      <span className="tnum text-[9.5px] text-foreground-400">{line.time}</span>
                    </div>
                    <TermText
                      text={line.text}
                      className="mt-1 text-[12px] leading-[1.8] text-foreground-800"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 divide-y divide-foreground-950/8 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <div className="px-3.5 py-3">
                  <p className="flex items-center gap-1 text-[9.5px] tracking-[0.1em] text-primary-700">
                    <i className="ri-focus-3-line flex h-3 w-3 items-center justify-center" />
                    当前焦点
                  </p>
                  <p className="mt-1 text-[11px] leading-[1.7] text-foreground-900">
                    技术上线节奏与宣传排期是否能对上
                  </p>
                  <p className="mt-1 text-[10.5px] leading-[1.7] text-foreground-500">
                    已对齐：11/5 灰度、11/6 对外
                  </p>
                </div>
                <div className="px-3.5 py-3">
                  <p className="flex items-center gap-1 text-[9.5px] tracking-[0.1em] text-accent-800">
                    <i className="ri-flag-2-line flex h-3 w-3 items-center justify-center" />
                    我的疑问
                  </p>
                  <p className="mt-1 text-[11px] leading-[1.7] text-foreground-900">
                    {QUESTIONS[0].question}
                  </p>
                  <p className="mt-1 text-[10.5px] text-foreground-500">已标记 · {QUESTIONS[0].time}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-foreground-950/10 bg-primary-50/60 px-3.5 py-2">
                <span className="text-[10.5px] text-primary-800">AI 已识别 4 个待办，会后自动同步</span>
                <span className="flex items-center gap-1 text-[10px] text-primary-700">
                  实时
                  <span className="h-1 w-1 rounded-full bg-primary-500" />
                </span>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-4 hidden w-[128px] -rotate-[5deg] md:block md:-left-10 md:w-[150px]">
              <div className="overflow-hidden rounded-lg border border-foreground-950/12 bg-background-50">
                <img
                  src={DEVICE_IMAGE}
                  alt="AI Voice 录音卡实物，金属机身与顶部实体按键"
                  title="AI Voice 录音卡 · 按住即可开始记录"
                  className="aspect-[3/4] w-full object-cover object-top"
                />
                <div className="flex items-center justify-between gap-1 px-1.5 py-1">
                  <span className="truncate text-[9px] text-foreground-700">会议卡 · 03</span>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}