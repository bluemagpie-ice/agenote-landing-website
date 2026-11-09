import type { ReactNode } from 'react';

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  body: string;
  points?: string[];
  note?: string;
  children: ReactNode;
  reverse?: boolean;
  tint?: boolean;
};

export default function FeatureSection({
  id,
  index,
  eyebrow,
  title,
  highlight,
  body,
  points = [],
  note,
  children,
  reverse = false,
  tint = false,
}: Props) {
  return (
    <section
      id={id}
      className={`scroll-mt-32 border-t border-foreground-950/12 py-14 md:py-20 ${
        tint ? 'bg-background-100' : 'bg-background-50'
      }`}
    >
      <div className="mx-auto w-full max-w-page px-5 md:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className={`lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`}>
            <p className="flex items-center gap-2.5 text-[11.5px] tracking-[0.14em] text-foreground-500">
              <span className="tnum text-primary-600">{index}</span>
              <span className="h-px w-6 bg-foreground-950/20" />
              {eyebrow}
            </p>

            <h2 className="mt-4 text-[25px] leading-[1.45] text-foreground-950 md:text-[31px]">
              {title}
              {highlight && (
                <>
                  <br />
                  {highlight}
                </>
              )}
            </h2>

            <p className="mt-3.5 max-w-[390px] text-[13px] leading-[2] text-foreground-600">{body}</p>

            {points.length > 0 && (
              <ul className="mt-7 flex flex-col gap-2.5 border-t border-foreground-950/12 pt-5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[12.5px] leading-[1.75] text-foreground-800">
                    <i className="ri-check-line mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center text-primary-600" />
                    {p}
                  </li>
                ))}
              </ul>
            )}

            {note && (
              <p className="mt-5 border-l-2 border-accent-400 bg-accent-50/60 px-3 py-2 text-[11.5px] leading-[1.85] text-foreground-700">
                {note}
              </p>
            )}
          </div>

          <div className={`lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`}>{children}</div>
        </div>
      </div>
    </section>
  );
}