import { useMemo, useState } from 'react';
import {
  FOCUS_TIMELINE,
  MEETING,
  QUESTIONS,
  TASKS,
  TRANSCRIPT,
  type MeetingQuestion,
  type TranscriptLine,
} from '@/mocks/meeting';
import PhoneFrame from '@/pages/demo/components/PhoneFrame';
import TranscriptFlow from '@/pages/demo/components/TranscriptFlow';
import FocusCard from '@/pages/demo/components/FocusCard';
import QuestionTray from '@/pages/demo/components/QuestionTray';
import PanelHeader from './PanelHeader';

type Props = { progress: number; onNext: () => void };
type Tab = 'focus' | 'todo' | 'ask';

const START = 2;
const strip = (text: string) => text.replace(/\{\{|\}\}/g, '');
const TODO_LINES = TASKS.map((t) => t.sourceLineId);

export default function PanelDuring({ progress, onNext }: Props) {
  const [tab, setTab] = useState<Tab>('focus');
  const [manual, setManual] = useState(0);
  const [marked, setMarked] = useState<string[]>(QUESTIONS.map((q) => q.lineId));
  const [todoMarked, setTodoMarked] = useState<string[]>(['l2', 'l5']);

  const auto = START + Math.round(progress * (TRANSCRIPT.length - START));
  const count = Math.min(TRANSCRIPT.length, auto + manual);
  const visible = useMemo(() => TRANSCRIPT.slice(0, count), [count]);

  const focus = useMemo(() => {
    const list = FOCUS_TIMELINE.filter((f) => f.afterLine <= count);
    return list.length > 0 ? list[list.length - 1] : FOCUS_TIMELINE[0];
  }, [count]);

  const questions = useMemo<MeetingQuestion[]>(
    () =>
      TRANSCRIPT.filter((l) => marked.includes(l.id)).map((l) => {
        const preset = QUESTIONS.find((q) => q.lineId === l.id);
        if (preset) return preset;
        return {
          id: `q-${l.id}`,
          lineId: l.id,
          time: l.time,
          context: `${l.dept} · ${l.speaker}：${strip(l.text)}`,
          question: strip(l.text),
          status: '待确认',
        };
      }),
    [marked],
  );

  const todos = useMemo(() => TASKS.filter((t) => todoMarked.includes(t.sourceLineId)), [todoMarked]);

  const toggleQuestion = (line: TranscriptLine) => {
    setMarked((prev) => (prev.includes(line.id) ? prev.filter((id) => id !== line.id) : [...prev, line.id]));
  };

  const toggleTodo = (line: TranscriptLine) => {
    setTodoMarked((prev) => (prev.includes(line.id) ? prev.filter((id) => id !== line.id) : [...prev, line.id]));
  };

  const reset = () => {
    setManual(0);
    setMarked(QUESTIONS.map((q) => q.lineId));
    setTodoMarked(['l2', 'l5']);
    setTab('focus');
  };

  const last = visible[visible.length - 1];
  const hint = [...visible].reverse().find((l) => l.hint)?.hint;

  const TABS: { key: Tab; label: string; count?: number }[] = [
    { key: 'focus', label: '当前焦点' },
    { key: 'todo', label: '待办', count: todos.length },
    { key: 'ask', label: '疑问', count: questions.length },
  ];

  return (
    <div>
      <PanelHeader
        index="02"
        label="会议中 · 实时理解"
        title="黑话有解释，重点有标记。"
        note="点开带虚线的词就能看解释；每句都能标记待办或疑问，右侧三个视图随时切换。"
        onReset={reset}
      />

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-7">
        <div className="lg:col-span-7">
          <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-[10.5px] text-foreground-500">
              <span className="flex items-center gap-1.5 rounded-full border border-accent-300 bg-accent-50 px-2 py-0.5 text-accent-900">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                录音中
              </span>
              <span className="tnum">
                {count} / {TRANSCRIPT.length} 句
              </span>
            </span>

            <span className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setManual((v) => v + 1)}
                disabled={count >= TRANSCRIPT.length}
                className={`flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-md bg-primary-500 px-2.5 py-1.5 text-[10.5px] text-background-50 transition-colors hover:bg-primary-600 ${
                  count >= TRANSCRIPT.length ? 'cursor-default opacity-50' : ''
                }`}
              >
                <i className="ri-arrow-down-line flex h-3 w-3 items-center justify-center" />
                出现下一句
              </button>
              <button
                type="button"
                onClick={reset}
                title="重置会议中演示"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-foreground-950/12 text-foreground-600 transition-colors hover:bg-background-100"
              >
                <i className="ri-restart-line flex h-3.5 w-3.5 items-center justify-center" />
              </button>
            </span>
          </div>

          <PhoneFrame
            header={
              <div className="border-b border-foreground-950/10 px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[11px] text-foreground-950">{MEETING.title}</p>
                    <p className="text-[9px] text-foreground-500">产品部 · 技术部 · 市场部 · 测试部</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-background-100 px-1.5 py-0.5 text-[9px] text-foreground-600">
                    <i className="ri-mic-line flex h-2.5 w-2.5 items-center justify-center" />
                    {MEETING.card}
                  </span>
                </div>
              </div>
            }
          >
            <div className="max-h-[400px] overflow-y-auto">
              <TranscriptFlow
                lines={visible}
                marked={marked}
                onMark={toggleQuestion}
                todoLines={TODO_LINES}
                todoMarked={todoMarked}
                onTodo={toggleTodo}
                hint={hint}
              />
              {count < TRANSCRIPT.length && (
                <p className="px-3 py-2 text-[9.5px] text-foreground-400">
                  继续向下滚动，会议会接着往下走。
                </p>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-foreground-950/10 bg-background-100/40 px-3 py-1.5 text-[9px] text-foreground-500">
              <span className="flex items-center gap-1">
                <i className="ri-lightbulb-line flex h-3 w-3 items-center justify-center" />
                点术语看解释
              </span>
              <span className="tnum">{last?.time ?? '00:00:00'}</span>
            </div>
          </PhoneFrame>
        </div>

        <div className="lg:col-span-5">
          <div
            role="tablist"
            aria-label="会议中视图"
            className="flex items-stretch gap-1 rounded-full border border-foreground-950/10 bg-background-100 p-1"
          >
            {TABS.map((t) => {
              const on = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setTab(t.key)}
                  className={`flex flex-1 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] transition-colors ${
                    on ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:text-foreground-950'
                  }`}
                >
                  {t.label}
                  {typeof t.count === 'number' && (
                    <span className={`tnum text-[9.5px] ${on ? 'text-accent-300' : 'text-foreground-400'}`}>
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2.5">
            {tab === 'focus' && <FocusCard focus={focus} />}

            {tab === 'todo' && (
              <div className="overflow-hidden rounded-lg border border-foreground-950/12 bg-background-50">
                <div className="flex items-center justify-between border-b border-foreground-950/10 bg-primary-50/70 px-3.5 py-2">
                  <span className="flex items-center gap-1.5 text-[11px] text-primary-800">
                    <i className="ri-checkbox-multiple-line flex h-3.5 w-3.5 items-center justify-center" />
                    AI 待办
                  </span>
                  <span className="text-[10px] text-foreground-500">已记录 {todos.length} 项</span>
                </div>
                {todos.length === 0 ? (
                  <p className="px-3.5 py-5 text-[11px] leading-[1.8] text-foreground-500">
                    还没有待办。点转写里的「标记待办」，这句话会进入任务列表，并带上负责人和截止时间。
                  </p>
                ) : (
                  <ul className="divide-y divide-foreground-950/8">
                    {todos.map((t) => (
                      <li key={t.id} className="px-3.5 py-2.5">
                        <p className="text-[11.5px] leading-[1.65] text-foreground-900">{t.title}</p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[10px] text-foreground-500">
                          <span className="whitespace-nowrap">
                            {t.dept} · {t.owner}
                          </span>
                          <span className="whitespace-nowrap">截止 {t.due}</span>
                          <span className="rounded-full bg-accent-100 px-1.5 py-0.5 text-[9.5px] text-accent-900">
                            {t.status}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="border-t border-foreground-950/10 px-3.5 py-2 text-[9.5px] leading-[1.7] text-foreground-500">
                  这些待办会和会后任务列表保持一致。
                </p>
              </div>
            )}

            {tab === 'ask' && <QuestionTray items={questions} />}
          </div>

          <div className="mt-2.5 rounded-lg border border-foreground-950/10 bg-background-100/50 px-3.5 py-3">
            <p className="text-[10.5px] leading-[1.8] text-foreground-600">
              会议中只做三件事：看懂术语、标记重点、知道讨论到哪。整理留到会后。
            </p>
            <button
              type="button"
              onClick={onNext}
              className="mt-2 flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-[10.5px] text-primary-700 transition-colors hover:text-primary-800"
            >
              进入会议后
              <i className="ri-arrow-down-line flex h-3.5 w-3.5 items-center justify-center" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}