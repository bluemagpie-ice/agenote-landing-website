import { useState } from 'react';

type Line = {
  time: string;
  speaker: string;
  tone: 'a' | 'b' | 'c';
  text: string;
  flag?: boolean;
};

const LINES: Line[] = [
  { time: '00:00:12', speaker: '发言人 1', tone: 'a', text: '这周的版本先按原定计划发，剩下的验收放到下周一。' },
  {
    time: '00:00:28',
    speaker: '发言人 2',
    tone: 'b',
    text: '提醒一下，预算口径和上季度对齐的那版不太一样，需要确认一下。',
    flag: true,
  },
  { time: '00:00:41', speaker: '发言人 1', tone: 'a', text: '渠道排期我们会后再同步一版。' },
  { time: '00:00:55', speaker: '发言人 3', tone: 'c', text: '验收清单我来整理，周三之前发到群里。' },
];

const TONE: Record<Line['tone'], { dot: string; chip: string }> = {
  a: { dot: 'bg-primary-500', chip: 'bg-primary-100 text-primary-800' },
  b: { dot: 'bg-secondary-500', chip: 'bg-secondary-200 text-secondary-900' },
  c: { dot: 'bg-accent-500', chip: 'bg-accent-100 text-accent-900' },
};

const BARS = [10, 18, 26, 14, 30, 22, 12, 28, 34, 16, 24, 32, 20, 12, 26, 30, 18, 24, 14, 28];

type Props = {
  compact?: boolean;
  showFilter?: boolean;
};

export default function TranscriptPanel({ compact = false, showFilter = true }: Props) {
  const [selected, setSelected] = useState<number>(1);
  const [filter, setFilter] = useState<string>('全部');
  const [playing, setPlaying] = useState(false);

  const speakers = ['全部', '发言人 1', '发言人 2', '发言人 3'];
  const visible = LINES.map((line, index) => ({ line, index })).filter(
    (item) => filter === '全部' || item.line.speaker === filter,
  );

  const active = LINES[selected];

  return (
    <div className="w-full overflow-hidden rounded-xl border border-foreground-950/12 bg-background-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-foreground-950/10 bg-background-100/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className="rec-dot relative h-2 w-2 rounded-full" />
          </span>
          <span className="text-[12.5px] text-foreground-900">正在记录</span>
          <span className="tnum text-[12px] text-foreground-500">00:42:18</span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-foreground-950/12 px-2 py-1 text-[10.5px] text-foreground-500">
          <i className="ri-mic-line flex h-3 w-3 items-center justify-center" />
          会议卡 · 03
        </span>
      </div>

      {showFilter && !compact && (
        <div className="flex flex-wrap items-center gap-1.5 border-b border-foreground-950/8 px-4 py-2.5">
          {speakers.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`cursor-pointer whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] transition-colors ${
                filter === s
                  ? 'bg-foreground-950 text-background-50'
                  : 'text-foreground-600 hover:bg-background-200/70'
              }`}
            >
              {s}
            </button>
          ))}
          <span className="ml-auto hidden text-[11px] text-foreground-400 sm:block">已区分发言人</span>
        </div>
      )}

      {/* Lines */}
      <div className={compact ? 'divide-y divide-foreground-950/8' : 'divide-y divide-foreground-950/8'}>
        {visible.map(({ line, index }) => {
          const isActive = selected === index;
          return (
            <button
              key={line.time}
              type="button"
              onClick={() => {
                setSelected(index);
                setPlaying(false);
              }}
              className={`block w-full cursor-pointer px-4 text-left transition-colors ${
                compact ? 'py-2.5' : 'py-3'
              } ${isActive ? 'bg-background-100' : 'hover:bg-background-100/70'}`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${TONE[line.tone].dot}`} />
                <span className={`rounded px-1.5 py-0.5 text-[10.5px] ${TONE[line.tone].chip}`}>
                  {line.speaker}
                </span>
                <span className="tnum text-[10.5px] text-foreground-400">{line.time}</span>
                {line.flag && (
                  <span className="ml-auto flex items-center gap-1 text-[10.5px] text-accent-800">
                    <i className="ri-sparkling-2-line flex h-3 w-3 items-center justify-center" />
                    值得关注
                  </span>
                )}
              </div>
              <p
                className={`mt-1.5 pl-3.5 leading-[1.75] ${
                  compact ? 'text-[12.5px]' : 'text-[13.5px]'
                } ${isActive ? 'text-foreground-950' : 'text-foreground-700'}`}
              >
                {line.text}
              </p>
            </button>
          );
        })}
      </div>

      {/* AI hint */}
      <div className="border-t border-accent-300/70 bg-accent-50 px-4 py-3">
        <p className="flex items-center gap-1.5 text-[11px] text-accent-800">
          <i className="ri-sparkling-2-line flex h-3.5 w-3.5 items-center justify-center" />
          AI 实时分析
        </p>
        <p className="mt-1.5 text-[12.5px] leading-[1.75] text-foreground-800">
          预算口径与此前对齐的版本不一致。建议会后确认以哪一版为准，并把结论补进纪要。
        </p>
      </div>

      {/* Playback */}
      <div className="flex items-center gap-3 border-t border-foreground-950/10 px-4 py-3">
        <button
          type="button"
          aria-label={playing ? '暂停原声' : '播放原声'}
          onClick={() => setPlaying((v) => !v)}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary-500 text-background-50 transition-colors hover:bg-primary-600"
        >
          <i
            className={`${playing ? 'ri-pause-fill' : 'ri-play-fill'} flex h-4 w-4 items-center justify-center text-[13px]`}
          />
        </button>
        <div className="flex h-6 flex-1 items-center gap-[3px]">
          {BARS.map((h, i) => (
            <span
              key={i}
              className={`wave-bar flex-1 rounded-full ${i < 7 ? 'bg-primary-500' : 'bg-foreground-950/15'}`}
              style={{
                height: `${h}px`,
                animationDelay: `${(i % 7) * 90}ms`,
                animationPlayState: playing ? 'running' : 'paused',
                transform: playing ? undefined : 'scaleY(0.5)',
              }}
            />
          ))}
        </div>
        <span className="tnum shrink-0 text-[11px] text-foreground-500">回听 {active.time}</span>
      </div>
    </div>
  );
}