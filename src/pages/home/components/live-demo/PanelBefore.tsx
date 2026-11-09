import { useEffect, useState } from 'react';
import { FOCUS_TIMELINE, MEETING, MEETING_STATS, PARTICIPANTS, TONE_STYLE, TRANSCRIPT } from '@/mocks/meeting';
import { DEVICE_IMAGE } from '@/mocks/assets';
import PhoneFrame from '@/pages/demo/components/PhoneFrame';
import PanelHeader from './PanelHeader';

type RecState = 'idle' | 'recording' | 'ended';
type Method = 'card' | 'phone';

const BARS = [10, 18, 28, 16, 34, 24, 13, 31, 39, 18, 26, 34, 21, 13, 29, 37, 18, 26];
const MINI_BARS = [4, 8, 12, 6, 14, 9, 5, 11, 15, 7, 9, 13, 8, 4, 11, 14, 6, 10, 7, 12];
const DOTS = [4, 7, 10, 6, 12, 8, 5, 9, 13, 6, 8, 11, 7, 4, 10, 12, 6, 9, 5, 11, 8, 13, 7, 4, 9, 11, 6, 8, 12, 5, 7, 10];

function fmt(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const METHODS: {
  key: Method;
  badge: string;
  name: string;
  desc: string;
  note: string;
}[] = [
  { key: 'card', badge: 'A', name: 'AI Voice 录音卡', desc: '按卡片上的实体键', note: '不用打开手机' },
  { key: 'phone', badge: 'B', name: '手机麦克风', desc: '按手机上的录音键', note: '没带录音卡时用' },
];

export default function PanelBefore({ onNext }: { onNext: () => void }) {
  const [state, setState] = useState<RecState>('idle');
  const [method, setMethod] = useState<Method>('card');
  const [seconds, setSeconds] = useState(0);
  const [marks, setMarks] = useState<number[]>([]);
  const [focusOpen, setFocusOpen] = useState(false);

  useEffect(() => {
    if (state !== 'recording') return undefined;
    const timer = window.setInterval(() => setSeconds((v) => v + 1), 1000);
    return () => window.clearInterval(timer);
  }, [state]);

  const start = (m: Method) => {
    setMethod(m);
    setSeconds(0);
    setMarks([]);
    setFocusOpen(false);
    setState('recording');
  };

  const pressKey = (m: Method) => {
    if (state === 'recording') {
      setState('ended');
      return;
    }
    if (state === 'ended') {
      setSeconds(0);
      setState('idle');
      return;
    }
    start(m);
  };

  const end = () => {
    if (state !== 'recording') return;
    setState('ended');
  };

  const reset = () => {
    setState('idle');
    setSeconds(0);
    setMarks([]);
    setFocusOpen(false);
  };

  const markQuestion = () => {
    if (state !== 'recording') return;
    setMarks((prev) => [...prev, seconds]);
  };

  const recording = state === 'recording';
  const sourceLabel = method === 'card' ? 'AI Voice 录音卡' : '手机麦克风';
  const focus = FOCUS_TIMELINE[0];
  const liveLine = TRANSCRIPT[0];

  return (
    <div>
      <PanelHeader
        index="01"
        label="会议前 · 便捷开启"
        title="两种方式，按一下就开场。"
        note="录音卡和手机麦克风二选一，条件相同、效果相同：按左边任意一颗键，右边手机立刻开始录音。"
        onReset={reset}
      />

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-7">
        {/* ---------------- 左：两条并列的开启路径 ---------------- */}
        <div className="lg:col-span-5">
          <p className="flex items-center gap-2 text-[10px] tracking-[0.12em] text-foreground-500">
            <span className="h-px w-4 bg-foreground-950/20" />
            二选一 · 任选一种开始
          </p>

          <div className="mt-2.5 flex flex-col">
            {METHODS.map((m, i) => {
              const on = recording && method === m.key;
              return (
                <div key={m.key}>
                  {i === 1 && (
                    <div className="flex items-center gap-2 py-2">
                      <span className="h-px flex-1 bg-foreground-950/12" />
                      <span className="rounded-full border border-foreground-950/12 bg-background-50 px-2 py-[1px] text-[9px] tracking-[0.1em] text-foreground-500">
                        或
                      </span>
                      <span className="h-px flex-1 bg-foreground-950/12" />
                    </div>
                  )}

                  <div
                    className={`rounded-lg border px-3 py-2.5 transition-colors ${
                      on ? 'border-primary-400 bg-primary-50/60' : 'border-foreground-950/12 bg-background-100/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-[11px] text-foreground-800">
                        <span className="tnum flex h-4 w-4 items-center justify-center rounded-full bg-foreground-950 text-[8.5px] text-background-50">
                          {m.badge}
                        </span>
                        {m.name}
                      </span>
                      <span className="flex items-center gap-1.5 text-[9.5px] text-foreground-600">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            on ? 'rec-dot relative bg-accent-500' : 'bg-primary-500'
                          }`}
                        />
                        {on ? '正在拾音' : state === 'ended' && method === m.key ? '已归档' : '待命'}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between gap-3">
                      {/* 视觉：录音卡实物 / 手机麦克风 */}
                      {m.key === 'card' ? (
                        <div className="relative h-[62px] w-[86px] shrink-0">
                          <img
                            src={DEVICE_IMAGE}
                            alt="AI Voice 录音卡金属机身与顶部实体按键"
                            title="AI Voice 录音卡 · 按下实体键开始记录"
                            className="h-full w-full rounded-md border border-foreground-950/10 object-cover object-top"
                          />
                          <span className="absolute bottom-1 left-1 rounded-full bg-foreground-950/60 px-1.5 py-[1px] text-[8px] text-background-100">
                            {MEETING.card}
                          </span>
                        </div>
                      ) : (
                        <div className="relative flex h-[62px] w-[86px] shrink-0 items-center justify-center rounded-md border border-dashed border-foreground-950/20 bg-background-50">
                          <div className="flex h-[42px] w-[26px] flex-col items-center justify-center rounded-[5px] border border-foreground-950/25">
                            <span className="h-[3px] w-[8px] rounded-full bg-foreground-950/25" />
                            <i className="ri-mic-fill mt-1 flex h-3 w-3 items-center justify-center text-[11px] text-foreground-600" />
                          </div>
                          <span className="absolute bottom-1 left-1 rounded-full bg-foreground-950/60 px-1.5 py-[1px] text-[8px] text-background-100">
                            手机端
                          </span>
                        </div>
                      )}

                      {/* 实体键 / 录音键 */}
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={() => pressKey(m.key)}
                          aria-pressed={on}
                          aria-label={`${m.name}：${on ? '结束录音' : '开始录音'}`}
                          className={`relative flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border transition-transform active:scale-95 ${
                            on
                              ? 'key-pulse border-accent-400 bg-accent-100'
                              : 'border-foreground-950/15 bg-background-50 hover:border-primary-400 hover:bg-primary-50'
                          }`}
                        >
                          <span
                            className={`flex h-[38px] w-[38px] flex-col items-center justify-center gap-[1px] rounded-full transition-colors ${
                              on ? 'bg-accent-500 text-foreground-950' : 'bg-foreground-950 text-background-50'
                            }`}
                          >
                            <i
                              className={`${
                                on ? 'ri-stop-fill' : m.key === 'card' ? 'ri-record-circle-line' : 'ri-mic-line'
                              } flex h-3 w-3 items-center justify-center text-[12px]`}
                            />
                            <span className="text-[7.5px] tracking-[0.06em]">{on ? '结束' : '开始'}</span>
                          </span>
                        </button>
                        <span className="text-[8.5px] text-foreground-500">{on ? '再按结束' : '点它开始'}</span>
                      </div>
                    </div>

                    {/* 录音中：卡片内也给出即时反馈 */}
                    <div className="mt-2 flex h-[18px] items-center gap-2 border-t border-foreground-950/10 pt-1.5">
                      <div className="flex h-[12px] flex-1 items-center gap-[2px]" aria-hidden>
                        {MINI_BARS.map((h, bi) => (
                          <span
                            key={bi}
                            className={`wave-bar w-[2px] rounded-full ${on ? 'bg-accent-500/80' : 'bg-foreground-950/15'}`}
                            style={{
                              height: `${h}px`,
                              animationDelay: `${(bi % 8) * 90}ms`,
                              animationPlayState: on ? 'running' : 'paused',
                            }}
                          />
                        ))}
                      </div>
                      <span className={`tnum text-[9.5px] ${on ? 'text-foreground-800' : 'text-foreground-400'}`}>
                        {on ? fmt(seconds) : m.desc}
                      </span>
                    </div>

                    <p className="mt-1 text-[9px] leading-[1.6] text-foreground-400">{m.note}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-3 flex items-start gap-1.5 rounded-md bg-background-100/60 px-2.5 py-2 text-[10px] leading-[1.7] text-foreground-500">
            <i className="ri-information-line mt-[1px] flex h-3 w-3 shrink-0 items-center justify-center" />
            {recording
              ? `正在用${sourceLabel}录音：再按一次任意一颗键，就会结束并自动归档。`
              : '两种方式地位相同，按哪个，右侧手机都会同步进入同一个录音界面。'}
          </p>
        </div>

        {/* ---------------- 右：手机端 ---------------- */}
        <div className="flex flex-col items-center lg:col-span-7">
          <div className="mb-2.5 flex w-full max-w-[420px] items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-[10.5px] text-foreground-500">
              <i className="ri-smartphone-line flex h-3.5 w-3.5 items-center justify-center" />
              手机端 Agenote
            </span>
            <span
              className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] transition-colors ${
                recording
                  ? 'border-accent-300 bg-accent-50 text-accent-900'
                  : 'border-foreground-950/12 text-foreground-500'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${recording ? 'bg-accent-500' : 'bg-foreground-300'}`} />
              {recording ? `由${sourceLabel}开始` : state === 'ended' ? '已归档' : '等待开始'}
            </span>
          </div>

          <PhoneFrame
            header={
              <div className="border-b border-foreground-950/10 bg-background-50 px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex min-w-0 items-center gap-2">
                    <i className="ri-arrow-left-s-line flex h-4 w-4 items-center justify-center text-foreground-700" />
                    <p className="truncate text-[12px] text-foreground-950">录音会议</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <i className="ri-notification-3-line text-[14px] text-foreground-700" />
                      {marks.length > 0 && (
                        <span className="tnum absolute -right-1.5 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-accent-500 px-0.5 text-[8px] text-foreground-950">
                          {marks.length}
                        </span>
                      )}
                    </span>
                    <i className="ri-question-line flex h-4 w-4 items-center justify-center text-[14px] text-foreground-700" />
                  </div>
                </div>
                <p className="mt-1 pl-6 text-[8.5px] text-foreground-400">
                  {recording
                    ? `${sourceLabel} · 实时转写 · 说完整一段后自动分析`
                    : state === 'ended'
                      ? `${sourceLabel} · 已结束 · 正在整理会议内容`
                      : '尚未开始录音'}
                </p>
              </div>
            }
          >
            {/* 待开始 */}
            {state === 'idle' && (
              <div className="px-3 py-3">
                <div className="rounded-lg border border-foreground-950/10 bg-background-100/50 px-3 py-2.5">
                  <p className="text-[11.5px] text-foreground-950">{MEETING.title}</p>
                  <p className="mt-1 text-[9px] text-foreground-500">
                    {MEETING.date} {MEETING.start} · {MEETING.place}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {PARTICIPANTS.map((p) => (
                      <span
                        key={p.dept}
                        className={`rounded-full px-1.5 py-0.5 text-[8.5px] ${TONE_STYLE[p.tone].chip}`}
                      >
                        {p.dept} · {p.name}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-[9px] leading-[1.65] text-foreground-600">本次目标：{MEETING.goal}</p>
                </div>

                <div className="mt-3 flex flex-col items-center rounded-lg border border-dashed border-foreground-950/15 px-3 py-5 text-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background-100">
                    <i className="ri-mic-line flex h-4 w-4 items-center justify-center text-[16px] text-foreground-500" />
                  </span>
                  <p className="mt-2 text-[10.5px] text-foreground-800">还没有开始录音</p>
                  <p className="mt-1 max-w-[210px] text-[9.5px] leading-[1.7] text-foreground-500">
                    按下左侧任意一颗录音键（录音卡或手机），这里会立刻进入录音状态。
                  </p>
                </div>
              </div>
            )}

            {/* 录音中 */}
            {recording && (
              <div className="animate-fade flex min-h-[400px] flex-col bg-background-50">
                <div className="flex items-center justify-between border-b border-foreground-950/10 bg-background-100/40 px-3 py-2">
                  <span className="flex items-center gap-1.5 text-[10px] text-foreground-800">
                    <span className="rec-dot relative h-1.5 w-1.5 rounded-full bg-accent-500" />
                    正在录音
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-foreground-950/12 px-1.5 py-[1px] text-[8.5px] text-foreground-600">
                    <i
                      className={`${
                        method === 'card' ? 'ri-record-circle-line' : 'ri-smartphone-line'
                      } flex h-2.5 w-2.5 items-center justify-center text-[9px]`}
                    />
                    {sourceLabel}
                  </span>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center px-4 py-5 text-center">
                  <div className="flex h-11 items-end justify-center gap-[3px]" aria-hidden>
                    {BARS.map((h, i) => (
                      <span
                        key={i}
                        className="wave-bar w-[3px] rounded-full bg-primary-500/75"
                        style={{ height: `${h}px`, animationDelay: `${(i % 6) * 110}ms` }}
                      />
                    ))}
                  </div>

                  <p className="tnum mt-4 text-[38px] font-semibold leading-none tracking-[0.02em] text-foreground-950">
                    {fmt(seconds)}
                  </p>
                  <p className="mt-2 text-[12px] text-foreground-900">正在听，请开始说话</p>
                  <p className="mt-1 max-w-[250px] text-[9px] leading-[1.7] text-foreground-500">
                    说完整一段后自动分析；会议中可以随时标记疑问，结束后自动生成纪要。
                  </p>
                </div>

                {/* 实时转写第一条 */}
                {seconds >= 4 && (
                  <div className="animate-fade mx-3 mb-2 rounded-md border border-foreground-950/10 bg-background-100/50 px-2.5 py-2 text-left">
                    <p className="flex items-center gap-1 text-[8.5px] text-foreground-500">
                      <i className="ri-live-line flex h-2.5 w-2.5 items-center justify-center text-[9px]" />
                      实时转写
                      <span className="tnum ml-auto">{liveLine.time}</span>
                    </p>
                    <p className="mt-1 text-[9.5px] leading-[1.6] text-foreground-800">
                      <span className={`mr-1 rounded-sm px-1 py-[1px] text-[8.5px] ${TONE_STYLE[liveLine.tone].chip}`}>
                        {liveLine.dept}
                      </span>
                      {liveLine.text}
                    </p>
                  </div>
                )}

                {/* 底部录音面板 */}
                <div className="mt-auto rounded-t-[16px] border-t border-foreground-950/10 bg-background-100/40 px-3 pb-3 pt-2.5">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-1.5 text-[9.5px] text-foreground-600">
                      <span className="tnum flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary-100 text-[8px] text-primary-700">
                        1
                      </span>
                      录音中 · 自动分段
                    </p>
                    <button
                      type="button"
                      onClick={() => setFocusOpen((v) => !v)}
                      className="flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[9.5px] text-primary-700 transition-colors hover:bg-primary-50"
                    >
                      <i className="ri-focus-3-line flex h-3 w-3 items-center justify-center text-[10px]" />
                      当前焦点
                      <i
                        className={`ri-arrow-down-s-line flex h-3 w-3 items-center justify-center transition-transform ${
                          focusOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {focusOpen && (
                    <div className="animate-fade mt-1.5 rounded-md border border-primary-200 bg-primary-50/70 px-2.5 py-2 text-left">
                      <p className="text-[8.5px] tracking-[0.08em] text-primary-700">当前议题</p>
                      <p className="mt-0.5 text-[9.5px] leading-[1.6] text-foreground-800">{focus.issue}</p>
                      <p className="mt-1.5 text-[8.5px] tracking-[0.08em] text-primary-700">最新进展</p>
                      <p className="mt-0.5 text-[9.5px] leading-[1.6] text-foreground-700">{focus.progress}</p>
                    </div>
                  )}

                  <div className="mt-1.5 flex h-3 items-center justify-center gap-[3px]" aria-hidden>
                    {DOTS.map((h, i) => (
                      <span
                        key={i}
                        className="wave-bar w-[2px] rounded-full bg-primary-400/70"
                        style={{ height: `${h}px`, animationDelay: `${(i % 8) * 90}ms` }}
                      />
                    ))}
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={markQuestion}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-full border border-foreground-950/15 bg-background-50 px-2 py-1.5 text-[9.5px] text-foreground-700 transition-colors hover:border-foreground-950/30 hover:bg-background-100"
                    >
                      <i className="ri-question-line flex h-3 w-3 items-center justify-center text-[11px]" />
                      疑问标记
                    </button>
                    <button
                      type="button"
                      onClick={end}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-full bg-primary-500 px-2 py-1.5 text-[9.5px] text-background-50 transition-colors hover:bg-primary-600"
                    >
                      <i className="ri-stop-fill flex h-3 w-3 items-center justify-center text-[10px]" />
                      结束并归档
                    </button>
                  </div>

                  {marks.length > 0 && (
                    <p className="animate-fade mt-1.5 flex items-center justify-center gap-1 text-[8.5px] text-foreground-600">
                      <i className="ri-bookmark-line flex h-3 w-3 items-center justify-center text-accent-600" />
                      已标记 {marks.length} 个疑问（{marks.map((m) => fmt(m)).join('、')}）
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 已结束 */}
            {state === 'ended' && (
              <div className="animate-fade px-3 py-3">
                <div className="rounded-lg border border-foreground-950/10 bg-background-100/40 px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[11px] text-foreground-900">
                      <i className="ri-checkbox-circle-line flex h-3.5 w-3.5 items-center justify-center text-primary-600" />
                      录音已结束，正在归档
                    </span>
                    <span className="tnum text-[10.5px] text-foreground-600">{fmt(seconds)}</span>
                  </div>

                  <div className="mt-2 grid grid-cols-3 divide-x divide-foreground-950/10 border-y border-foreground-950/10">
                    {[
                      { v: `${MEETING_STATS.speakers}`, l: '位发言人' },
                      { v: `${MEETING_STATS.decisions}`, l: '条结论' },
                      { v: `${MEETING_STATS.tasks}`, l: '项待办' },
                    ].map((s) => (
                      <div key={s.l} className="px-1.5 py-1.5">
                        <p className="latin text-[19px] leading-none text-foreground-950">{s.v}</p>
                        <p className="mt-1 text-[9px] text-foreground-500">{s.l}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 flex flex-col gap-1">
                    {['逐字稿已保存', 'AI 纪要已生成', '5 项待办进入任务列表'].map((t) => (
                      <p key={t} className="flex items-center gap-1 text-[9.5px] text-foreground-700">
                        <i className="ri-check-line flex h-3 w-3 items-center justify-center text-primary-600" />
                        {t}
                      </p>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={onNext}
                    className="mt-2.5 flex w-full cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-md bg-primary-500 px-2.5 py-1.5 text-[10.5px] text-background-50 transition-colors hover:bg-primary-600"
                  >
                    进入会议中
                    <i className="ri-arrow-down-line flex h-3 w-3 items-center justify-center" />
                  </button>
                </div>

                <p className="mt-2 text-center text-[9px] leading-[1.7] text-foreground-400">
                  想再看一次？点左侧任意一颗录音键即可重新开始。
                </p>
              </div>
            )}
          </PhoneFrame>

          <p className="mt-2.5 max-w-[400px] text-center text-[10px] leading-[1.75] text-foreground-400">
            这里演示录音卡、手机麦克风与 App 的状态联动，尚未连接真实硬件；真实设备通过蓝牙与 App 同步录音状态。
          </p>
        </div>
      </div>
    </div>
  );
}