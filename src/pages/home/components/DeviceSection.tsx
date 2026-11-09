import { Link } from 'react-router-dom';
import SectionLabel from '@/components/base/SectionLabel';
import { DEVICE_IMAGE } from '@/mocks/assets';

const CAPS = [
  {
    icon: 'ri-record-circle-line',
    title: '实体按键开始录音',
    body: '设备与 App 连接后，按下卡上的按键开始录音，同时进入这场会议的页面。',
  },
  {
    icon: 'ri-bluetooth-connect-line',
    title: '蓝牙连接手机',
    body: '在 Agenote App 里添加和管理你的录音卡，连接状态随手就能看到。',
  },
  {
    icon: 'ri-battery-charge-line',
    title: '设备状态一目了然',
    body: '连接状态、电量、存储容量、固件版本、序列号和当前录音状态。',
  },
  {
    icon: 'ri-edit-line',
    title: '给卡改个记得住的名字',
    body: '按会议类型或使用场景命名，比如「客户会议」「周会」，多人共用也不容易拿错。',
  },
];

export default function DeviceSection() {
  return (
    <section className="bg-background-100 py-16 md:py-24">
      <div className="mx-auto w-full max-w-page px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative w-full max-w-[420px] overflow-hidden rounded-lg border border-foreground-950/12 bg-background-50">
              <img
                src={DEVICE_IMAGE}
                alt="AI Voice 录音卡：金属机身、顶部实体按键与指示区"
                title="AI Voice 录音卡 · 拿起就能记录"
                className="aspect-[3/4] w-full object-cover"
              />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-md border border-foreground-950/10 bg-background-50/95 px-3 py-2 backdrop-blur-sm">
                <span className="whitespace-nowrap text-[11px] text-foreground-600">录音卡实物</span>
                <span className="whitespace-nowrap text-[11.5px] text-foreground-950">实体键 · 蓝牙 · 无屏幕</span>
              </div>
            </div>
            <p className="mt-4 max-w-[420px] text-[11.5px] leading-[1.8] text-foreground-500">
              续航、存储容量与麦克风参数以厂家规格和实际设备为准。
            </p>
          </div>

          <div className="lg:col-span-7">
            <SectionLabel index="03">AI Voice 录音卡</SectionLabel>
            <h2 className="mt-5 text-[26px] leading-[1.4] text-foreground-950 md:text-[34px]">
              让记录更轻松，
              <br />
              从一个实体按键开始
            </h2>
            <p className="mt-4 max-w-[480px] text-[12.5px] leading-[1.95] text-foreground-600">
              它只有一个按键和一条连接。连接 Agenote，设备状态与会议进展一目了然。
            </p>

            <ul className="mt-8 border-t border-foreground-950/12">
              {CAPS.map((c) => (
                <li key={c.title} className="flex gap-3 border-b border-foreground-950/12 py-3.5 md:gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary-50">
                    <i className={`${c.icon} flex h-3.5 w-3.5 items-center justify-center text-primary-700`} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12.5px] text-foreground-950">{c.title}</p>
                    <p className="mt-1 text-[11px] leading-[1.8] text-foreground-600">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                to="/device"
                className="flex items-center gap-1.5 whitespace-nowrap text-[11.5px] text-primary-700 transition-colors hover:text-primary-800 cursor-pointer"
              >
                看看这张卡的细节
                <i className="ri-arrow-right-line flex h-3.5 w-3.5 items-center justify-center" />
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-accent-300 bg-accent-50 px-2.5 py-1 whitespace-nowrap text-[10.5px] text-accent-900 transition-colors hover:bg-accent-100 cursor-pointer"
              >
                想要一张实体卡
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}