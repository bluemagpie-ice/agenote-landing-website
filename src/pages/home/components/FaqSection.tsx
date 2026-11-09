import { Link } from 'react-router-dom';
import SectionLabel from '@/components/base/SectionLabel';
import FaqAccordion, { type FaqItem } from '@/components/feature/FaqAccordion';

const ITEMS: FaqItem[] = [
  {
    q: '使用时需要一直连着手机吗？',
    a: '录音卡通过蓝牙与 App 连接，在 App 里完成添加和管理。连接后按下卡上的实体键即可开始录音，并进入这场会议的页面。具体的连接与配对方式以 App 内的引导为准。',
  },
  {
    q: '多久的录音才会生成 AI 会议纪要？',
    a: '录音满 1 分钟后才会生成 AI 会议纪要。更短的录音不会生成纪要，但录音与逐字稿仍会保留，方便你回头确认。',
  },
  {
    q: '能识别出说话的人是谁吗？',
    a: '目前支持区分发言人，比如发言人 1、发言人 2、发言人 3，用来让逐字稿读起来更清楚。它不等同于识别每个人的真实身份或职位，效果也会受录音环境影响。',
  },
  {
    q: '一定要绑定微信才能用吗？',
    a: '不必须。绑定 ClawBot 之后，可以在微信里接收会议摘要和 PDF 并继续追问；不绑定也可以在 App 内查看完整的会议记录、纪要和分析结果。',
  },
  {
    q: '双击标记和离线同步现在能用吗？',
    a: '这两项还在验证中，暂未开放。目前会议中的疑问是在 App 内手动标记的。功能上线状态以 App 内实际可用的为准。',
  },
];

export default function FaqSection() {
  return (
    <section className="border-t border-foreground-950/10 bg-background-100 py-16 md:py-24">
      <div className="mx-auto w-full max-w-page px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel index="05">常见问题</SectionLabel>
            <h2 className="mt-5 text-[26px] leading-[1.42] md:text-[32px]">
              先把话说清楚，
              <br />
              再谈体验。
            </h2>
            <p className="mt-4 max-w-[300px] text-[12.5px] leading-[1.95] text-foreground-600">
              哪些已经能用、哪些还在验证，我们尽量写在明面上，避免你在用的时候才发现。
            </p>
            <Link
              to="/faq"
              className="mt-6 inline-flex items-center gap-2 whitespace-nowrap text-[12.5px] text-primary-700 transition-colors hover:text-primary-800 cursor-pointer"
            >
              查看全部问题
              <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center" />
            </Link>
          </div>

          <div className="lg:col-span-8">
            <FaqAccordion items={ITEMS} defaultOpen={-1} />
          </div>
        </div>
      </div>
    </section>
  );
}