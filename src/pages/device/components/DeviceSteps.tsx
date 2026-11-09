import SectionLabel from '@/components/base/SectionLabel';

const STEPS = [
  {
    title: '在 App 里添加录音卡',
    body: '打开 Agenote，按引导完成蓝牙连接。配对之后，它会留在设备列表里，随时能看到是否在线。',
  },
  {
    title: '按下实体键开始录音',
    body: '设备与 App 连接时，按键即开始录音，App 同时进入这场会议的页面，逐字稿开始出现。',
  },
  {
    title: '会后在同一场会议里整理',
    body: '逐字稿、纪要、结论、行动项都挂在这次会议下面，不用在几个页面之间来回找。',
  },
];

export default function DeviceSteps() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-page px-5 md:px-8">
        <SectionLabel index="02">怎么用</SectionLabel>
        <h2 className="mt-5 max-w-[480px] text-[26px] leading-[1.42] md:text-[34px]">
          只有三步，
          <br className="hidden sm:block" />
          中间没有多余的设置。
        </h2>

        <ol className="mt-12 grid grid-cols-1 border-t border-foreground-950/15 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="border-b border-foreground-950/12 py-7 md:border-b-0 md:border-r md:py-8 md:pr-8 md:last:border-r-0 md:last:pr-0 [&:not(:first-child)]:md:pl-8"
            >
              <div className="flex items-center gap-3">
                <span className="latin text-[28px] leading-none text-foreground-300">0{i + 1}</span>
                <span className="h-px flex-1 bg-foreground-950/12" />
              </div>
              <h3 className="mt-5 text-[16px] leading-[1.5]">{s.title}</h3>
              <p className="mt-2 text-[12.5px] leading-[1.95] text-foreground-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}