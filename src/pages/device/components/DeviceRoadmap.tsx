import SectionLabel from '@/components/base/SectionLabel';

const GROUPS = [
  {
    icon: 'ri-check-double-line',
    title: '已经可用',
    tone: 'text-primary-700',
    chip: 'bg-primary-50',
    items: ['实体按键开始录音', '蓝牙连接与设备管理', '设备状态查看', '修改设备名称', '实时逐字稿', 'AI 会议纪要'],
    note: '',
  },
  {
    icon: 'ri-time-line',
    title: '仍在验证',
    tone: 'text-accent-800',
    chip: 'bg-accent-50',
    items: ['录音卡双击标记疑问', '录音卡离线文件同步'],
    note: '这两项还没有完成验证，暂未开放，上线时间以 App 内公告为准。',
  },
  {
    icon: 'ri-information-line',
    title: '以实际为准',
    tone: 'text-foreground-500',
    chip: 'bg-background-200',
    items: ['续航表现', '存储容量', '麦克风参数', '发言人区分效果'],
    note: '具体数值以厂家规格和实际设备为准；发言人区分也会受录音环境影响。',
  },
];

export default function DeviceRoadmap() {
  return (
    <section className="border-y border-foreground-950/10 bg-background-100 py-16 md:py-24">
      <div className="mx-auto w-full max-w-page px-5 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="03">开放状态</SectionLabel>
            <h2 className="mt-5 max-w-[520px] text-[26px] leading-[1.42] text-foreground-950 md:text-[34px]">
              还在验证的，
              <br className="hidden sm:block" />
              就先别当卖点。
            </h2>
          </div>
          <p className="max-w-[320px] text-[12.5px] leading-[1.95] text-foreground-600">
            哪些现在就能用、哪些还在验证，写清楚比说得好听更有用。
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {GROUPS.map((g) => (
            <div
              key={g.title}
              className="rounded-lg border border-foreground-950/12 bg-background-50 p-6 md:p-7"
            >
              <span className="flex items-center gap-2 text-[12px] tracking-[0.02em] text-foreground-950">
                <span className={`flex h-6 w-6 items-center justify-center rounded-md ${g.chip}`}>
                  <i className={`${g.icon} flex h-3.5 w-3.5 items-center justify-center ${g.tone}`} />
                </span>
                {g.title}
              </span>
              <ul className="mt-4 flex flex-col gap-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-[12.5px] leading-[1.8] text-foreground-600">
                    <span className="mt-[9px] h-px w-2.5 shrink-0 bg-foreground-950/25" />
                    {it}
                  </li>
                ))}
              </ul>
              {g.note && (
                <p className="mt-5 border-t border-foreground-950/12 pt-3 text-[11px] leading-[1.8] text-foreground-500">
                  {g.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}