import SectionLabel from '@/components/base/SectionLabel';
import { DeviceStatus } from '@/components/feature/mocks/DeviceStatus';

const CAPS = [
  {
    icon: 'ri-record-circle-line',
    title: '实体按键开始录音',
    body: '设备与 App 连接后，按下卡上的实体键开始录音，App 会直接进入这场会议的页面，不需要先在手机里找入口。',
  },
  {
    icon: 'ri-bluetooth-connect-line',
    title: '蓝牙连接手机',
    body: '打开 App，按引导添加录音卡。之后在设备页就能看到它、改名字、确认它是否在线。',
  },
  {
    icon: 'ri-dashboard-3-line',
    title: '查看设备状态',
    body: '连接状态、电量、存储容量、固件版本、设备序列号，以及当前是否在录音，放在同一屏里。',
  },
  {
    icon: 'ri-edit-line',
    title: '修改设备名称',
    body: '给每张卡设置容易识别的名称。团队里多人共用时，比记序列号靠谱得多。',
  },
];

export default function DeviceCapabilities() {
  return (
    <section className="border-y border-foreground-950/10 bg-background-100 py-16 md:py-24">
      <div className="mx-auto w-full max-w-page px-5 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="01">设备能做什么</SectionLabel>
            <h2 className="mt-5 max-w-[520px] text-[26px] leading-[1.42] md:text-[34px]">
              按一下，
              <br className="hidden sm:block" />
              其余交给 App。
            </h2>
          </div>
          <p className="max-w-[320px] text-[12.5px] leading-[1.95] text-foreground-600">
            录音卡只负责记录这一件事。连接、状态、命名都在 App 里完成，界面和会议页是同一套。
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ul className="border-t border-foreground-950/15">
              {CAPS.map((c) => (
                <li key={c.title} className="flex gap-4 border-b border-foreground-950/12 py-5 md:gap-5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-foreground-950/12 bg-background-50">
                    <i className={`${c.icon} flex h-4 w-4 items-center justify-center text-primary-700`} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] text-foreground-950">{c.title}</p>
                    <p className="mt-1.5 text-[12.5px] leading-[1.95] text-foreground-600">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] leading-[1.8] text-foreground-400">
              可以试试右边的面板：修改设备名称后，App 内所有会议都会使用这个名称。
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <DeviceStatus />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}