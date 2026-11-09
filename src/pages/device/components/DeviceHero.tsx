import { Link } from 'react-router-dom';
import { DEVICE_IMAGE } from '@/mocks/assets';

const FACTS = ['实体按键', '蓝牙连接', '状态可查'];

export default function DeviceHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-[104px] md:pb-24 md:pt-[132px]">
      <div className="grid-lines mask-fade-radial pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto w-full max-w-page px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2.5 text-[11.5px] tracking-[0.16em] text-foreground-500">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              AI Voice 录音卡
            </div>

            <h1 className="animate-rise mt-6 text-[36px] leading-[1.25] tracking-[-0.02em] text-foreground-950 sm:text-[44px] md:text-[54px]">
              一张卡，
              <br />
              负责把会议记下来。
            </h1>

            <p
              className="animate-rise mt-6 max-w-[440px] text-[14px] leading-[2] text-foreground-600 md:text-[15px]"
              style={{ animationDelay: '120ms' }}
            >
              它没有屏幕，也不需要学一套新操作。连接 Agenote，按一下，开始记录；
              逐字稿、纪要、行动项，都在同一场会议里等你。
            </p>

            <div
              className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '200ms' }}
            >
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-5 py-3 text-[13.5px] text-background-50 transition-colors hover:bg-primary-600 cursor-pointer"
              >
                申请体验
                <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center" />
              </Link>
              <Link
                to="/features#realtime"
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-foreground-950/15 px-5 py-3 text-[13.5px] text-foreground-800 transition-colors hover:bg-background-100 cursor-pointer"
              >
                它能记录什么
              </Link>
            </div>

            <ul
              className="animate-rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-foreground-950/10 pt-5"
              style={{ animationDelay: '280ms' }}
            >
              {FACTS.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[12px] text-foreground-600">
                  <i className="ri-check-line flex h-3.5 w-3.5 items-center justify-center text-primary-600" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-rise relative lg:col-span-6" style={{ animationDelay: '160ms' }}>
            <div className="pointer-events-none absolute -right-3 -top-3 hidden h-full w-full rounded-lg border border-foreground-950/10 md:block" />
            <div className="relative w-full overflow-hidden rounded-lg border border-foreground-950/12 bg-background-50">
              <img
                src={DEVICE_IMAGE}
                alt="AI Voice 录音卡实物：金属面板、两枚顶部按键与竖向拾音开孔"
                title="AI Voice 录音卡 · 正面细节"
                className="aspect-[3/4] w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-md border border-foreground-950/10 bg-background-50/95 px-3 py-2.5 backdrop-blur-sm">
                <div>
                  <p className="text-[11px] text-foreground-500">设备名称</p>
                  <p className="mt-0.5 text-[12.5px] text-foreground-950">会议卡 · 03</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-foreground-950/12 px-2.5 py-1 text-[10.5px] text-foreground-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                  已连接
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}