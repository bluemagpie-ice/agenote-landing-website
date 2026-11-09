import SectionLabel from '@/components/base/SectionLabel';
import useStageProgress from '@/hooks/useStageProgress';
import { DEMO_STAGES, MEETING, PARTICIPANTS, TONE_STYLE } from '@/mocks/meeting';
import StageRail from './StageRail';
import PanelBefore from './PanelBefore';
import PanelDuring from './PanelDuring';
import PanelAfter from './PanelAfter';
import PanelWechat from './PanelWechat';

export default function LiveDemo() {
  const { refs, progress, active } = useStageProgress(DEMO_STAGES.length);

  const goTo = (index: number) => {
    const el = refs.current[index];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="interactive"
      className="scroll-mt-20 border-y border-foreground-950/10 bg-background-200/50 py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-page px-5 md:px-8">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionLabel index="02">交互体验 · 模拟一场会</SectionLabel>
            <h2 className="mt-5 text-[26px] leading-[1.4] text-foreground-950 md:text-[34px]">
              向下滚动，
              <br className="hidden sm:block" />
              把一场会完整走一遍。
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[12.5px] leading-[1.95] text-foreground-600">
              这不是截图合集。左边是会议进度的四条线，右边每一步都能真的点：
              按键开始录音、点术语看解释、标记待办、切换任务状态，最后在微信里追问。
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="rounded-full border border-foreground-950/12 bg-background-50 px-2 py-0.5 text-[10px] text-foreground-600">
                {MEETING.title}
              </span>
              {PARTICIPANTS.map((p) => (
                <span key={p.dept} className={`rounded-full px-2 py-0.5 text-[10px] ${TONE_STYLE[p.tone].chip}`}>
                  {p.dept}
                </span>
              ))}
              <span className="rounded-full border border-accent-300 bg-accent-50 px-2 py-0.5 text-[10px] text-accent-900">
                模拟数据
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <aside className="hidden lg:col-span-3 lg:block">
            <StageRail active={active} progress={progress} onSelect={goTo} />
          </aside>

          <div className="lg:col-span-9">
            {DEMO_STAGES.map((stage, i) => (
              <div
                key={stage.key}
                id={`interactive-${stage.key}`}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="scroll-mt-24 py-4 lg:flex lg:min-h-[86vh] lg:items-center lg:py-8"
              >
                <div className="w-full rounded-xl border border-foreground-950/12 bg-background-50 p-4 md:p-6">
                  {stage.key === 'before' && <PanelBefore onNext={() => goTo(1)} />}
                  {stage.key === 'during' && (
                    <PanelDuring progress={progress[i] ?? 0} onNext={() => goTo(2)} />
                  )}
                  {stage.key === 'after' && <PanelAfter />}
                  {stage.key === 'wechat' && <PanelWechat />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10.5px] leading-[1.8] text-foreground-500">
          <span className="flex items-center gap-1.5">
            <i className="ri-information-line flex h-3.5 w-3.5 items-center justify-center" />
            演示内容全部为前端模拟，与真实会议无关
          </span>
          <span className="flex items-center gap-1.5">
            <i className="ri-restart-line flex h-3.5 w-3.5 items-center justify-center" />
            每一段都可以单独重置
          </span>
          <span className="flex items-center gap-1.5">
            <i className="ri-lock-2-line flex h-3.5 w-3.5 items-center justify-center" />
            不会修改真实会议数据
          </span>
        </p>
      </div>
    </section>
  );
}