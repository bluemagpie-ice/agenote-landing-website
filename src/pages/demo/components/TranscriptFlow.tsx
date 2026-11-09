import { TONE_STYLE, type TranscriptLine } from '@/mocks/meeting';
import TermText from './TermText';

type Props = {
  lines: TranscriptLine[];
  marked: string[];
  onMark?: (line: TranscriptLine) => void;
  /** 这两句里哪些可以被标记为待办 */
  todoLines?: string[];
  todoMarked?: string[];
  onTodo?: (line: TranscriptLine) => void;
  /** 是否显示底部的 AI 提示，默认取最后一条 */
  hint?: string;
  dense?: boolean;
};

export default function TranscriptFlow({
  lines,
  marked,
  onMark,
  todoLines = [],
  todoMarked = [],
  onTodo,
  hint,
  dense = false,
}: Props) {
  return (
    <div className="flex flex-col">
      {lines.map((line) => {
        const tone = TONE_STYLE[line.tone];
        const isMarked = marked.includes(line.id);
        const canTodo = Boolean(onTodo) && todoLines.includes(line.id);
        const isTodo = todoMarked.includes(line.id);
        return (
          <div
            key={line.id}
            className={`group border-b border-foreground-950/8 px-3.5 last:border-b-0 ${dense ? 'py-2.5' : 'py-3'}`}
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} />
              <span className={`rounded px-1.5 py-0.5 text-[10px] ${tone.chip}`}>
                {line.dept}
              </span>
              <span className="text-[10.5px] text-foreground-600">{line.speaker}</span>
              <span className="tnum text-[10px] text-foreground-400">{line.time}</span>

              {(onMark || canTodo) && (
                <span className="ml-auto flex items-center gap-1">
                  {canTodo && (
                    <button
                      type="button"
                      onClick={() => onTodo?.(line)}
                      aria-pressed={isTodo}
                      className={`flex cursor-pointer items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] transition-colors ${
                        isTodo
                          ? 'border-primary-400 bg-primary-100 text-primary-800'
                          : 'border-foreground-950/12 text-foreground-500 hover:border-primary-400 hover:text-primary-700'
                      }`}
                    >
                      <i
                        className={`${isTodo ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line'} flex h-2.5 w-2.5 items-center justify-center text-[9px]`}
                      />
                      {isTodo ? '待办已记录' : '标记待办'}
                    </button>
                  )}
                  {onMark && (
                    <button
                      type="button"
                      onClick={() => onMark(line)}
                      aria-pressed={isMarked}
                      className={`flex cursor-pointer items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] transition-colors ${
                        isMarked
                          ? 'border-accent-400 bg-accent-100 text-accent-900'
                          : 'border-foreground-950/12 text-foreground-500 hover:border-accent-400 hover:text-accent-800'
                      }`}
                    >
                      <i
                        className={`${isMarked ? 'ri-flag-2-fill' : 'ri-flag-2-line'} flex h-2.5 w-2.5 items-center justify-center text-[9px]`}
                      />
                      {isMarked ? '已标记' : '标记疑问'}
                    </button>
                  )}
                </span>
              )}
            </div>

            <TermText
              text={line.text}
              className={`mt-1.5 text-[12.5px] leading-[1.8] ${
                line.mine ? 'text-foreground-950' : 'text-foreground-800'
              }`}
            />
          </div>
        );
      })}

      {hint && (
        <div className="border-t border-accent-300/60 bg-accent-50/80 px-3.5 py-2.5">
          <p className="flex items-center gap-1.5 text-[10.5px] text-accent-800">
            <i className="ri-sparkling-2-line flex h-3 w-3 items-center justify-center" />
            实时提示
          </p>
          <p className="mt-1 text-[11.5px] leading-[1.7] text-foreground-800">{hint}</p>
        </div>
      )}
    </div>
  );
}