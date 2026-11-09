import type { CalendarDay } from '@/mocks/taskCalendar';

type Props = {
  days: CalendarDay[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

/** 一周七天，点选某一天；左右滑动由父级容器统一处理 */
export default function TaskCalendarStrip({ days, selectedIndex, onSelect }: Props) {
  return (
    <div className="flex items-stretch gap-0.5">
      {days.map((day, i) => {
        const selected = i === selectedIndex;
        const hasMeeting = day.meetingCount > 0;
        const hasTask = day.tasks.length > 0;

        return (
          <button
            key={day.key}
            type="button"
            onClick={() => onSelect(i)}
            aria-pressed={selected}
            aria-label={`${day.month}月${day.dateNum}日 ${day.weekday}，${day.tasks.length} 项任务，${day.meetingCount} 场会议`}
            className={`flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1 rounded-lg py-1.5 transition-colors ${
              selected ? 'bg-primary-100/70' : 'hover:bg-background-100'
            }`}
          >
            <span
              className={`whitespace-nowrap text-[10px] ${
                day.isToday
                  ? 'text-primary-800'
                  : selected
                    ? 'text-foreground-800'
                    : 'text-foreground-500'
              }`}
            >
              {day.isToday ? '今天' : day.weekday}
            </span>

            <span
              className={`h-1 w-1 rounded-full ${
                day.isToday ? 'bg-primary-500' : 'border border-foreground-300'
              }`}
            />

            <span
              className={`tnum text-[12.5px] leading-none ${
                day.isToday ? 'text-primary-900' : 'text-foreground-900'
              }`}
            >
              {day.dateNum}
            </span>

            <span className="flex h-1 items-center justify-center gap-[3px]">
              {hasMeeting && <span className="h-1 w-1 rounded-full bg-primary-500" />}
              {hasTask && <span className="h-1 w-1 rounded-full bg-accent-500" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}