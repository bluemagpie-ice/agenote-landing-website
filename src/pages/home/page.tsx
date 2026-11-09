import SiteNav from '@/components/feature/SiteNav';
import SiteFooter from '@/components/feature/SiteFooter';
import ClosingCTA from '@/components/feature/ClosingCTA';
import HomeHero from './components/HomeHero';
import Workflow from './components/Workflow';
import LiveDemo from './components/live-demo/LiveDemo';
import DeviceSection from './components/DeviceSection';
import FeatureTiers from './components/FeatureTiers';
import FaqSection from './components/FaqSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-background-50">
      <SiteNav />
      <HomeHero />
      <Workflow />
      <LiveDemo />
      <DeviceSection />
      <FeatureTiers />
      <FaqSection />
      <ClosingCTA
        eyebrow="让每一次会议都能听懂、跟上、落实"
        title="下一场会，"
        highlight="带上 Agenote。"
        body="从一张录音卡开始，把会议里的理解、疑问、结论和行动都留在同一处。想先看看它怎么配合你的会议节奏，可以约一次体验。"
        primary={{ label: '申请体验', to: '/contact' }}
        secondary={{ label: '先看产品功能', to: '/features' }}
      />
      <SiteFooter />
    </main>
  );
}