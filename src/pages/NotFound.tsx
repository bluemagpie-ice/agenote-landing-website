import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-50 px-5 text-center">
      <p className="latin text-[80px] leading-none text-foreground-300 select-none md:text-[120px]">404</p>
      <h1 className="mt-4 text-[24px] leading-[1.4] text-foreground-950 md:text-[30px]">
        这一页还没被记录。
      </h1>
      <p className="mt-3 max-w-[360px] text-[13px] leading-[1.95] text-foreground-600">
        你要找的页面可能已经调整过位置。可以从首页重新开始，或者直接看看录音卡和 App。
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-5 py-3 text-[13px] text-background-50 transition-colors hover:bg-primary-600 cursor-pointer"
        >
          回到首页
          <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center" />
        </Link>
        <Link
          to="/features"
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-foreground-950/15 px-5 py-3 text-[13px] text-foreground-800 transition-colors hover:bg-background-100 cursor-pointer"
        >
          查看产品功能
        </Link>
      </div>
    </div>
  );
}