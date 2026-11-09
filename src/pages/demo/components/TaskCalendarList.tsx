import { useState } from 'react';
import type { CalendarDay, CalendarTaskStatus } from '@/mocks/taskCalendar';

type Props = {
  day: CalendarDay;
  statusOf: (taskId: string) => CalendarTaskStatus;
  onToggle: (taskId: string) => void;
};

/** 每天默认只展示两条任务，其余收起来 */
const VISIBLE_LIMIT = 2;

/** 选中日期的任务清单（只保留标题、状态、截止时间） */
export default function TaskCalendarList({ day, statusOf, onToggle }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [dayKey, setDayKey] = useState(day.key);

  // 切换日期时自动收起，保持每天默认两条
  if (day.key !== dayKey) {
    setDayKey(day.key);
    setExpanded(false);
  }

  const pending = day.tasks.filter((t) => statusOf(t.id) !== '已完成').length;
  const restCount = Math.max(0, day.tasks.length - VISIBLE_LIMIT);
  const visibleTasks = expanded ? day.tasks : day.tasks.slice(0, VISIBLE_LIMIT);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-[12.5px] font-medium text-foreground-950">
          {day.month}月{day.dateNum}日
        </p>
        <p className="tnum text-[10px] text-foreground-500">
          {day.tasks.length} 项任务 · {day.meetingCount} 场会议
          {pending > 0 && <span className="ml-1.5 text-accent-700">待完成 {pending}</span>}
        </p>
      </div>

      {day.meetingCount > 0 && day.meetingTitle && (
        <div className="mt-2 flex items-start gap-2 rounded-lg border border-primary-200/70 bg-primary-50/70 px-2.5 py-1.5">
          <i className="ri-calendar-event-line flex h-3.5 w-3.5 items-center justify-center text-[13px] text-primary-700" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11.5px] text-foreground-900">{day.meetingTitle}</p>
            <p className="tnum mt-0.5 text-[10px] text-foreground-500">{day.meetingTime} · 已自动记录纪要</p>
          </div>
        </div>
      )}

      {day.tasks.length === 0 ? (
        <div className="mt-2 rounded-lg border border-dashed border-foreground-950/15 px-3 py-4 text-center">
          <p className="text-[11px] text-foreground-500">这一天没有任务和会议</p>
        </div>
      ) : (
        <>
          <ul className="mt-1 divide-y divide-foreground-950/10">
            {visibleTasks.map((task) => {
              const status = statusOf(task.id);
              const done = status === '已完成';

              return (
                <li key={task.id} className="flex items-start gap-2.5 px-0.5 py-2">
                  <button
                    type="button"
                    onClick={() => onToggle(task.id)}
                    aria-pressed={done}
                    aria-label={done ? `标记「${task.title}」为待开始` : `标记「${task.title}」为已完成`}
                    className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 cursor-pointer items-center justify-center rounded-md border-[1.5px] transition-colors ${
                      done
                        ? 'border-primary-500 bg-primary-500 text-background-50'
                        : status === '进行中'
                          ? 'border-accent-400 bg-accent-100 text-accent-900'
                          : 'border-foreground-300 bg-transparent text-transparent hover:border-primary-400'
                    }`}
                  >
                    <i
                      className={`flex h-3 w-3 items-center justify-center text-[11px] ${
                        done ? 'ri-check-line' : status === '进行中' ? 'ri-subtract-line' : ''
                      }`}
                    />
                  </button>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[12px] leading-[1.55] ${
                        done ? 'text-foreground-400 line-through' : 'text-foreground-900'
                      }`}
                    >
                      {task.title}
                    </p>
                    <p
                      className={`mt-0.5 text-[9.5px] ${
                        done
                          ? 'text-primary-700'
                          : status === '进行中'
                            ? 'text-accent-700'
                            : 'text-foreground-500'
                      }`}
                    >
                      {done ? '已完成' : `截止 ${task.due}`}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {restCount > 0 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-1 flex w-full cursor-pointer items-center justify-center gap-1 rounded-md py-1 text-[10px] text-foreground-500 transition-colors hover:bg-background-100 hover:text-primary-800"
            >
              <i className="ri-arrow-down-s-line flex h-3 w-3 items-center justify-center" />
              {expanded ? '收起清单' : `还有 ${restCount} 项`}
            </button>
          )}
        </>
      )}
    </div>
  );
}