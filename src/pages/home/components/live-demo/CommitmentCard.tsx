import { useEffect, useState } from 'react';
import type { Commitment, CommitmentStatus } from '@/mocks/commitments';

const SIDE_LABEL = { mine: '我方履约项', theirs: '对方履约项' } as const;

const SIDE_CHIP = {
  mine: 'bg-primary-100 text-primary-800',
  theirs: 'bg-accent-100 text-accent-900',
} as const;

const STATUS_CHIP: Record<CommitmentStatus, string> = {
  待履行: 'bg-secondary-200 text-secondary-900',
  履行中: 'bg-accent-100 text-accent-900',
  已履行: 'bg-primary-100 text-primary-800',
};

/** 波形柱高度（px），固定值避免每次渲染跳动 */
const BARS = [9, 15, 22, 12, 26, 18, 30, 14, 24, 17, 28, 11, 20, 25, 15, 22, 29, 12, 19, 24, 14, 26, 17, 21];

function fmt(ms: number) {
  const total = Math.floor(ms / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, '0');
  const ss = String(total % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

/** 一条承诺：履约项 + 语音证据 + 交付节点 / 成果物（单行紧凑排版） */
export default function CommitmentCard({ item }: { item: Commitment }) {
  const durationMs = item.evidence.seconds * 1000;
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!playing) return undefined;
    const id = window.setInterval(() => setElapsed((prev) => Math.min(durationMs, prev + 100)), 100);
    return () => window.clearInterval(id);
  }, [playing, durationMs]);

  useEffect(() => {
    if (playing && elapsed >= durationMs) setPlaying(false);
  }, [playing, elapsed, durationMs]);

  const progress = durationMs === 0 ? 0 : elapsed / durationMs;
  const activeBar = item.side === 'mine' ? 'bg-primary-500' : 'bg-accent-500';

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      setElapsed(0);
      return;
    }
    setElapsed(0);
    setPlaying(true);
  };

  return (
    <article className="rounded-md border border-foreground-950/10 bg-background-100/45 px-2.5 py-2.5">
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <span className={`rounded px-1.5 py-0.5 text-[9.5px] ${SIDE_CHIP[item.side]}`}>{SIDE_LABEL[item.side]}</span>
        <span className={`rounded px-1.5 py-0.5 text-[9.5px] ${STATUS_CHIP[item.status]}`}>{item.status}</span>
        <span className="min-w-0 truncate text-[9.5px] text-foreground-500">{item.owner}</span>
        <span className="ml-auto flex shrink-0 items-center gap-1 whitespace-nowrap text-[9.5px] text-foreground-600">
          <i className="ri-calendar-check-line flex h-2.5 w-2.5 items-center justify-center text-primary-700" />
          <span className="tnum">{item.due}</span>
        </span>
      </div>

      <p className="mt-1.5 text-[12px] leading-[1.55] text-foreground-950">{item.title}</p>
      <p className="mt-0.5 text-[9.5px] leading-[1.6] text-foreground-500">{item.note}</p>

      <div className="mt-1.5 flex items-center gap-2 rounded-md border border-foreground-950/10 bg-background-50 px-2 py-1">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? '暂停语音证据' : '回放语音证据'}
          className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-foreground-950 text-background-50 transition-colors hover:bg-foreground-800"
        >
          <i
            className={`${playing ? 'ri-pause-fill' : 'ri-play-fill'} flex h-3 w-3 items-center justify-center text-[11px]`}
          />
        </button>

        <div className="flex h-5 shrink-0 items-center gap-[2px]">
          {BARS.map((h, i) => {
            const passed = i / BARS.length <= progress;
            return (
              <span
                key={i}
                style={{ height: `${Math.round(h * 0.72)}px`, animationDelay: `${i * 45}ms` }}
                className={`w-[2px] rounded-full transition-colors duration-200 ${
                  passed ? activeBar : 'bg-background-300'
                } ${playing && passed ? 'wave-bar' : ''}`}
              />
            );
          })}
        </div>

        <span className="tnum shrink-0 text-[9.5px] text-foreground-700">
          {playing || elapsed > 0 ? fmt(elapsed) : item.evidence.duration}
        </span>

        <p className="min-w-0 flex-1 truncate text-[9.5px] text-foreground-600">“{item.evidence.quote}”</p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? '收起原话' : '展开原话'}
          className="flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full text-[11px] text-foreground-500 transition-colors hover:bg-background-200/70 hover:text-foreground-800"
        >
          <i className={`ri-arrow-down-s-line transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="mt-1 animate-fade rounded-md border-l-2 border-foreground-300 bg-background-50 px-2.5 py-1.5">
          <p className="text-[10px] leading-[1.7] text-foreground-800">{item.evidence.quote}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[9px] text-foreground-500">
            <span>{item.evidence.speaker}</span>
            <span className="tnum">会议原话 {item.evidence.lineTime}</span>
            <span className="tnum">片段 {item.evidence.duration}</span>
          </p>
        </div>
      )}

      <p className="mt-1 flex items-center gap-1 text-[9.5px] text-foreground-600">
        <i className="ri-file-list-3-line flex h-2.5 w-2.5 shrink-0 items-center justify-center text-foreground-500" />
        <span className="truncate">
          <span className="text-foreground-500">成果物 </span>
          {item.artifact}
        </span>
      </p>
    </article>
  );
}