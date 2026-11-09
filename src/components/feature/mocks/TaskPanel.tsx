import { useState } from 'react';

type Task = {
  id: number;
  task: string;
  owner: string;
  due: string;
  goal: string;
};

const INITIAL: Task[] = [
  { id: 1, task: '整理验收清单并发到群里', owner: '发言人 3', due: '周三前', goal: '本周发版' },
  { id: 2, task: '同步一版渠道排期', owner: '发言人 1', due: '本周五', goal: '渠道上线' },
  { id: 3, task: '确认预算口径以哪一版为准', owner: '发言人 2', due: '下周一', goal: '预算对齐' },
  { id: 4, task: '补充下周一验收的签字人', owner: '发言人 1', due: '未定', goal: '本周发版' },
];

const GOALS = [
  { label: '本周发版', progress: 66, note: '2 / 3 项已落实' },
  { label: '预算对齐', progress: 30, note: '等待口径确认' },
];

export default function TaskPanel() {
  const [done, setDone] = useState<number[]>([1, 2]);
  const [noteSaved, setNoteSaved] = useState(false);
  const [note, setNote] = useState('');

  const toggle = (id: number) =>
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="w-full overflow-hidden rounded-xl border border-foreground-950/12 bg-background-50">
      <div className="flex items-center justify-between border-b border-foreground-950/10 bg-background-100/60 px-4 py-3">
        <span className="text-[12.5px] text-foreground-900">首页任务</span>
        <span className="tnum text-[11px] text-foreground-500">
          {done.length} / {INITIAL.length} 已完成
        </span>
      </div>

      <div className="h-[3px] w-full bg-background-200">
        <div
          className="h-full bg-primary-500 transition-all duration-500"
          style={{ width: `${(done.length / INITIAL.length) * 100}%` }}
        />
      </div>

      <ul className="divide-y divide-foreground-950/8">
        {INITIAL.map((t) => {
          const checked = done.includes(t.id);
          return (
            <li key={t.id} className="flex items-start gap-3 px-4 py-2.5">
              <button
                type="button"
                aria-label={checked ? '撤回完成' : '标记完成'}
                onClick={() => toggle(t.id)}
                className={`mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border transition-colors ${
                  checked
                    ? 'border-primary-500 bg-primary-500 text-background-50'
                    : 'border-foreground-950/25 hover:border-primary-500'
                }`}
              >
                {checked && <i className="ri-check-line flex h-3 w-3 items-center justify-center text-[10px]" />}
              </button>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-[12.5px] leading-[1.6] ${
                    checked ? 'text-foreground-400 line-through' : 'text-foreground-900'
                  }`}
                >
                  {t.task}
                </p>
                <p className="mt-0.5 text-[10.5px] text-foreground-500">
                  {t.owner} · 交期 {t.due} · {t.goal}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-foreground-950/10 px-4 py-3">
        <p className="text-[11px] tracking-[0.1em] text-foreground-500">目标进展与承诺</p>
        <ul className="mt-2 flex flex-col gap-2.5">
          {GOALS.map((g) => (
            <li key={g.label}>
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] text-foreground-800">{g.label}</span>
                <span className="text-[10.5px] text-foreground-500">{g.note}</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-background-200">
                <div
                  className={`h-full rounded-full ${g.progress > 50 ? 'bg-primary-500' : 'bg-accent-500'}`}
                  style={{ width: `${g.progress}%` }}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center gap-2">
          <input
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setNoteSaved(false);
            }}
            placeholder="补充需要确认的信息"
            className="h-8 min-w-0 flex-1 rounded-md border border-foreground-950/15 bg-background-50 px-2.5 text-[11.5px] text-foreground-900 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => note.trim() && setNoteSaved(true)}
            className="h-8 shrink-0 cursor-pointer rounded-md border border-foreground-950/15 px-2.5 text-[11.5px] text-foreground-800 transition-colors hover:bg-background-200/60"
          >
            记下
          </button>
        </div>
        {noteSaved && (
          <p className="mt-1.5 flex items-center gap-1 text-[10.5px] text-primary-700">
            <i className="ri-check-line flex h-3 w-3 items-center justify-center" />
            已记在这条任务下
          </p>
        )}
      </div>
    </div>
  );
}