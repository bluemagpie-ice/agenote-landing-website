import { Link } from 'react-router-dom';

type Action = { label: string; to: string };

type Props = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  body: string;
  primary: Action;
  secondary?: Action;
};

export default function ClosingCTA({
  eyebrow = '从一张卡开始',
  title,
  highlight,
  body,
  primary,
  secondary,
}: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Abstract%20macro%20photograph%20of%20layered%20warm%20ivory%20paper%20sheets%20with%20a%20deep%20forest%20green%20ink%20wash%20spreading%20across%20the%20surface%2C%20soft%20directional%20daylight%20raking%20over%20the%20fibers%2C%20subtle%20ochre%20pigment%20dust%2C%20quiet%20contemplative%20mood%2C%20fine%20paper%20texture%2C%20editorial%20still%20life%2C%20no%20text%2C%20no%20logos&width=1600&height=900&seq=agenote-cta-paper-ink-01&orientation=landscape"
          alt="纸张与墨迹的抽象背景"
          title="让会议内容留下来"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-foreground-950/90 via-foreground-950/75 to-foreground-950/55" />

      <div className="relative mx-auto w-full max-w-page px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-[560px]">
          <p className="flex items-center gap-2.5 text-[11.5px] tracking-[0.18em] text-accent-200">
            <span className="h-px w-8 bg-accent-300/70" />
            {eyebrow}
          </p>
          <h2 className="mt-6 text-[30px] leading-[1.35] text-background-50 md:text-[42px]">
            {title}
            {highlight && (
              <>
                <br />
                {highlight}
              </>
            )}
          </h2>
          <p className="mt-5 max-w-[400px] text-[13.5px] leading-[2] text-background-300">{body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to={primary.to}
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-background-50 px-5 py-3 text-[13.5px] text-foreground-950 transition-colors hover:bg-background-200 cursor-pointer"
            >
              {primary.label}
              <i className="ri-arrow-right-line flex h-4 w-4 items-center justify-center" />
            </Link>
            {secondary && (
              <Link
                to={secondary.to}
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-background-100/35 px-5 py-3 text-[13.5px] text-background-100 transition-colors hover:bg-background-50/10 cursor-pointer"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}