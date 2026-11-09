import { useRef, useState, type PointerEvent } from 'react';
import {
  CALENDAR_TODAY_INDEX,
  CALENDAR_TODAY_WEEK,
  CALENDAR_WEEKS,
  type CalendarTaskStatus,
} from '@/mocks/taskCalendar';
import TaskCalendarList from './TaskCalendarList';
import TaskCalendarStrip from './TaskCalendarStrip';

const CYCLE: CalendarTaskStatus[] = ['待开始', '进行中', '已完成'];
const SWIPE_THRESHOLD = 40;

/** 任务与会议 · 周历视图 */
export default function TaskBoard({ className = '' }: { className?: string }) {
  const [weekIndex, setWeekIndex] = useState(CALENDAR_TODAY_WEEK);
  const [dayIndex, setDayIndex] = useState(CALENDAR_TODAY_INDEX);
  const [overrides, setOverrides] = useState<Record<string, CalendarTaskStatus>>({});

  const drag = useRef({ startX: 0, active: false, moved: false });

  const week = CALENDAR_WEEKS[weekIndex];
  const day = week.days[dayIndex];

  const statusOf = (taskId: string): CalendarTaskStatus => {
    const all = week.days.flatMap((d) => d.tasks);
    const task = all.find((t) => t.id === taskId);
    return overrides[taskId] ?? task?.status ?? '待开始';
  };

  const toggle = (taskId: string) => {
    const current = statusOf(taskId);
    const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];
    setOverrides((prev) => ({ ...prev, [taskId]: next }));
  };

  const goWeek = (delta: number) => {
    setWeekIndex((prev) => Math.min(CALENDAR_WEEKS.length - 1, Math.max(0, prev + delta)));
  };

  const onPointerDown = (e: PointerEvent) => {
    drag.current = { startX: e.clientX, active: true, moved: false };
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!drag.current.active) return;
    if (Math.abs(e.clientX - drag.current.startX) > 10) drag.current.moved = true;
  };

  const onPointerUp = (e: PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.active = false;
    if (Math.abs(dx) > SWIPE_THRESHOLD) goWeek(dx < 0 ? 1 : -1);
  };

  const onPointerCancel = () => {
    drag.current.active = false;
  };

  const selectDay = (index: number) => {
    if (drag.current.moved) return;
    setDayIndex(index);
  };

  const pendingToday = day.tasks.filter((t) => statusOf(t.id) !== '已完成').length;
  const awayFromToday = weekIndex !== CALENDAR_TODAY_WEEK || dayIndex !== CALENDAR_TODAY_INDEX;

  const first = week.days[0];
  const last = week.days[week.days.length - 1];
  const rangeLabel = `${first.month}月${first.dateNum}日 – ${last.month}月${last.dateNum}日`;

  return (
    <div
      className={`overflow-hidden rounded-xl border border-foreground-950/10 bg-background-50 ${className}`}
    >
      <div className="px-3 pb-2 pt-2.5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
          <p className="flex items-center gap-1.5 text-[12px] font-medium text-foreground-950">
            <i className="ri-calendar-line flex h-3.5 w-3.5 items-center justify-center text-[13px] text-primary-700" />
            任务与会议
          </p>

          <div className="flex items-center gap-2">
            <span className="tnum whitespace-nowrap text-[10.5px] text-foreground-500">
              {pendingToday} 项待完成
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => goWeek(-1)}
                disabled={weekIndex === 0}
                aria-label="上一周"
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-foreground-950/15 text-[12px] text-foreground-600 transition-colors hover:bg-background-100 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <i className="ri-arrow-left-s-line" />
              </button>
              <button
                type="button"
                onClick={() => goWeek(1)}
                disabled={weekIndex === CALENDAR_WEEKS.length - 1}
                aria-label="下一周"
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-foreground-950/15 text-[12px] text-foreground-600 transition-colors hover:bg-background-100 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <i className="ri-arrow-right-s-line" />
              </button>
            </div>
          </div>
        </div>

        <div
          key={week.key}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          className="mt-2 animate-fade touch-pan-y select-none"
        >
          <TaskCalendarStrip days={week.days} selectedIndex={dayIndex} onSelect={selectDay} />
        </div>

        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-foreground-950/8 pt-1.5">
          <span className="tnum text-[9.5px] text-foreground-500">{rangeLabel}</span>

          <div className="flex items-center gap-3 text-[9.5px] text-foreground-500">
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-primary-500" />
              会议
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-accent-500" />
              任务
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-foreground-950/10 px-3 pb-2.5 pt-2">
        <TaskCalendarList day={day} statusOf={statusOf} onToggle={toggle} />

        {awayFromToday && (
          <div className="mt-1.5 flex justify-end border-t border-foreground-950/8 pt-1.5">
            <button
              type="button"
              onClick={() => {
                setWeekIndex(CALENDAR_TODAY_WEEK);
                setDayIndex(CALENDAR_TODAY_INDEX);
              }}
              className="cursor-pointer whitespace-nowrap text-[9.5px] text-primary-700 transition-colors hover:text-primary-800"
            >
              回到今天
            </button>
          </div>
        )}
      </div>
    </div>
  );
}