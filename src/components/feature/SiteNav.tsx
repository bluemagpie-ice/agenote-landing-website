import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_ICON } from '@/mocks/assets';

const NAV = [
  { label: '首页', to: '/' },
  { label: 'AI Voice 录音卡', to: '/device' },
  { label: '产品功能', to: '/features' },
  { label: '常见问题', to: '/faq' },
];

/** 安卓安装包 / 应用市场下载地址（改成正式链接即可） */
const ANDROID_DOWNLOAD_URL = 'https://www.pgyer.com/yanshuyunduan';

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  const isActive = (to: string) => {
    if (to.includes('#')) {
      const [path, target] = to.split('#');
      return pathname === path && hash === `#${target}`;
    }
    if (to === '/') return pathname === '/' && !hash;
    return pathname.startsWith(to);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'bg-background-50/90 backdrop-blur-xl border-b border-foreground-950/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-page items-center justify-between px-5 md:h-20 md:px-8">
        <Link to="/" className="group flex items-center gap-3 cursor-pointer">
          <img
            src={APP_ICON}
            alt="Agenote App 图标"
            title="Agenote · AI 会议助手"
            className="h-8 w-8 shrink-0 rounded-md object-cover md:h-9 md:w-9"
          />
          <span className="latin text-[24px] leading-none tracking-tight text-foreground-950 md:text-[28px]">
            Agenote
          </span>
          <span className="hidden h-4 w-px bg-foreground-950/20 lg:block" />
          <span className="hidden text-[11px] tracking-[0.18em] text-foreground-600 lg:block">会议助手</span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`relative cursor-pointer whitespace-nowrap rounded-md px-2.5 py-2 text-[12.5px] transition-colors ${
                isActive(n.to)
                  ? 'text-foreground-950'
                  : 'text-foreground-600 hover:text-foreground-950'
              }`}
            >
              {n.label}
              {isActive(n.to) && (
                <span className="absolute inset-x-2.5 -bottom-0.5 h-px bg-primary-600" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={ANDROID_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-md border border-foreground-950/20 px-3.5 py-2.5 text-[13px] text-foreground-900 transition-colors hover:border-foreground-950/40 hover:bg-background-100 cursor-pointer lg:flex"
          >
            <i className="ri-android-line flex h-4 w-4 items-center justify-center text-[15px]" />
            安卓下载
          </a>
          <Link
            to="/apply"
            className="flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-4 py-2.5 text-[13px] font-normal text-background-50 transition-colors hover:bg-primary-600 cursor-pointer"
          >
            iOS 体验申请
            <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center" />
          </Link>
        </div>

        <button
          type="button"
          aria-label="打开菜单"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-foreground-950/15 text-foreground-900 md:hidden"
        >
          <i className={`${open ? 'ri-close-line' : 'ri-menu-3-line'} flex h-5 w-5 items-center justify-center text-lg`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-foreground-950/10 bg-background-50 md:hidden">
          <nav className="flex flex-col px-5 py-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`cursor-pointer rounded-md px-3 py-3 text-sm ${
                  isActive(n.to) ? 'bg-background-100 text-foreground-950' : 'text-foreground-700'
                }`}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={ANDROID_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-md border border-foreground-950/20 px-4 py-3 text-sm text-foreground-900 cursor-pointer"
            >
              <i className="ri-android-line flex h-4 w-4 items-center justify-center text-[15px]" />
              安卓下载
            </a>
            <Link
              to="/apply"
              className="mt-2 flex items-center justify-center gap-2 rounded-md bg-primary-500 px-4 py-3 text-sm text-background-50 cursor-pointer"
            >
              iOS 体验申请
              <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}