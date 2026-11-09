import { useState } from 'react';
import SectionLabel from '@/components/base/SectionLabel';
import { SHOT_CLARIFY, SHOT_DETAIL, SHOT_REPORT } from '@/mocks/assets';
import ScreenLightbox from '@/pages/features/components/ScreenLightbox';

const SHOTS = [
  {
    src: SHOT_CLARIFY,
    tag: '会议进行中',
    title: '逐句回听与 AI 补充',
    body: '听到一句没讲清楚的，点开原声片段重听一遍。AI 会把指代不明的地方标成「待核对」，会后不用靠回忆。',
    alt: 'Agenote App 中发言人 C 的发言，附带原声片段与 AI 补充待核对内容',
  },
  {
    src: SHOT_DETAIL,
    tag: '会议详情',
    title: 'AI 纪要：一页读懂会议',
    body: '一场会整理成一页读懂、主要讨论与逐条议题，每条都标着时间点，点「查看原始依据」就能回到那句话和那段原声。纪要、思维导图、逐字稿随时切换。',
    alt: 'Agenote App 会议详情页的 AI 纪要视图，展示一页读懂会议、主要讨论与查看原始依据',
  },
  {
    src: SHOT_REPORT,
    tag: '会后',
    title: '职业化分析成果',
    body: '针对值得深挖的问题生成分析文档：结论先行、关键判断逐条标注依据，可以核验的部分和无法核验的部分分开写，可直接下载或转发。',
    alt: 'Agenote 生成的职业化分析文档预览，包含结论先行、核心结论表格与依据编号',
  },
];

export default function RealScreens() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="screens" className="scroll-mt-32 border-t border-foreground-950/12 bg-background-100 py-16 md:py-24">
      <div className="mx-auto w-full max-w-page px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="07">App 真实界面</SectionLabel>
            <h2 className="mt-5 max-w-[560px] text-[26px] leading-[1.42] text-foreground-950 md:text-[34px]">
              不看示意图，
              <br className="hidden sm:block" />
              直接看 App 里的样子。
            </h2>
          </div>
          <p className="max-w-[330px] text-[12.5px] leading-[1.95] text-foreground-600">
            下面三张是 Agenote App 内的真实界面：会中回听与补充、会后的会议结构，以及会后生成的分析文档。三张放在同样大小的展示框里、从顶部开始看，超出部分自然淡出，点任意一张可以放大看完整内容。
          </p>
        </div>

        <div className="mt-11 grid grid-cols-1 items-stretch gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
          {SHOTS.map((s, i) => (
            <figure key={s.title} className="flex h-full flex-col">
              <div className="flex items-center gap-2.5">
                <span className="tnum text-[10.5px] text-foreground-400">0{i + 1}</span>
                <span className="rounded-full border border-foreground-950/12 bg-background-50 px-2.5 py-1 text-[10.5px] text-foreground-700">
                  {s.tag}
                </span>
              </div>

              <h3 className="mt-3 text-[14px] leading-[1.5] text-foreground-950 lg:min-h-[21px]">{s.title}</h3>
              <p className="mt-3 text-[12px] leading-[1.9] text-foreground-600 lg:min-h-[92px]">{s.body}</p>

              <div className="mt-auto pt-8">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`放大查看：${s.title}`}
                  className="group relative block h-[380px] w-full cursor-pointer overflow-hidden rounded-2xl border border-[#E6E9EF] bg-[#F5F7FA] p-4 text-left shadow-[0_1px_3px_rgba(23,32,28,0.045)] transition-colors hover:border-[#D2D8E2] sm:h-[420px] md:p-5 lg:h-[440px]"
                >
                  <span className="relative block h-full w-full overflow-hidden rounded-[10px] bg-background-50">
                    <img
                      src={s.src}
                      alt={s.alt}
                      title={`Agenote · ${s.title}`}
                      className="absolute inset-x-0 top-0 block w-full"
                    />

                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F5F7FA] via-[#F5F7FA]/72 to-transparent" />

                    <span className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-foreground-950/85 px-3 py-1.5 text-[10.5px] text-background-50 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                      <i className="ri-zoom-in-line text-[13px]"></i>
                      点击看完整界面
                    </span>
                  </span>
                </button>
              </div>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-[11px] leading-[1.8] text-foreground-400">
          截图为 App 内真实界面，其中的会议与数据为示例内容，实际生成结果以你使用的版本为准。
        </p>
      </div>

      {active !== null && (
        <ScreenLightbox shots={SHOTS} index={active} onClose={() => setActive(null)} onChange={setActive} />
      )}
    </section>
  );
}