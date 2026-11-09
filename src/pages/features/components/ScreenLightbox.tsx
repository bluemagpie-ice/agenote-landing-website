import { useCallback, useEffect } from 'react';

export type LightboxShot = {
  src: string;
  alt: string;
  title: string;
  tag: string;
};

type Props = {
  shots: LightboxShot[];
  index: number;
  onClose: () => void;
  onChange: (next: number) => void;
};

export default function ScreenLightbox({ shots, index, onClose, onChange }: Props) {
  const shot = shots[index];

  const goPrev = useCallback(() => {
    onChange((index - 1 + shots.length) % shots.length);
  }, [index, shots.length, onChange]);

  const goNext = useCallback(() => {
    onChange((index + 1) % shots.length);
  }, [index, shots.length, onChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, goPrev, goNext]);

  if (!shot) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground-950/85 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${shot.title} 大图预览`}
      onClick={onClose}
    >
      <div
        className="flex max-h-full w-full max-w-[1040px] flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="tnum text-[10.5px] uppercase tracking-[0.14em] text-background-200/80">
              {shot.tag} · {index + 1} / {shots.length}
            </p>
            <p className="mt-1 truncate text-[13px] text-background-50">{shot.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭预览"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-background-50/25 text-background-50 transition-colors hover:bg-background-50/12"
          >
            <i className="ri-close-line text-[17px]"></i>
          </button>
        </div>

        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
          <button
            type="button"
            onClick={goPrev}
            aria-label="上一张"
            className="absolute left-0 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-background-50/25 text-background-50 transition-colors hover:bg-background-50/12 md:-left-2"
          >
            <i className="ri-arrow-left-s-line text-[18px]"></i>
          </button>

          <img
            src={shot.src}
            alt={shot.alt}
            title={`Agenote · ${shot.title}`}
            className="mx-auto block max-h-[74vh] w-auto max-w-full rounded-md border border-background-50/15 object-contain md:max-h-[78vh]"
          />

          <button
            type="button"
            onClick={goNext}
            aria-label="下一张"
            className="absolute right-0 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-background-50/25 text-background-50 transition-colors hover:bg-background-50/12 md:-right-2"
          >
            <i className="ri-arrow-right-s-line text-[18px]"></i>
          </button>
        </div>

        <p className="text-center text-[11px] leading-[1.7] text-background-200/70">
          点击图片外区域或按 Esc 关闭 · 方向键切换
        </p>
      </div>
    </div>
  );
}