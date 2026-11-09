import SiteNav from '@/components/feature/SiteNav';
import SiteFooter from '@/components/feature/SiteFooter';
import ClosingCTA from '@/components/feature/ClosingCTA';
import DeviceHero from './components/DeviceHero';
import DeviceCapabilities from './components/DeviceCapabilities';
import DeviceSteps from './components/DeviceSteps';
import DeviceRoadmap from './components/DeviceRoadmap';

export default function DevicePage() {
  return (
    <main className="min-h-screen bg-background-50">
      <SiteNav />
      <DeviceHero />
      <DeviceCapabilities />
      <DeviceSteps />
      <DeviceRoadmap />
      <ClosingCTA
        eyebrow="AI Voice 录音卡"
        title="带上它，"
        highlight="去开下一场会。"
        body="一张卡放在桌上，剩下的交给 Agenote。需要了解设备与 App 的配合方式，可以先约一次体验。"
        primary={{ label: '申请体验', to: '/contact' }}
        secondary={{ label: '看看产品功能', to: '/features' }}
      />
      <SiteFooter />
    </main>
  );
}