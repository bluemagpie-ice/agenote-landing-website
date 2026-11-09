import { useState } from 'react';
import { TERMS } from '@/mocks/meeting';

type Props = {
  text: string;
  className?: string;
  onDark?: boolean;
};

/**
 * 解析 {{术语}} 标记，渲染成可点击的术语解释。
 * 解释以内联小块展开，不遮挡其他会议内容。
 */
export default function TermText({ text, className = '', onDark = false }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const parts = text.split(/(\{\{[^}]+\}\})/g);

  const toggle = (key: string) => setOpen((prev) => (prev === key ? null : key));
  const active = open ? TERMS[open] : null;

  return (
    <div>
      <p className={`${className}`}>
        {parts.map((part, i) => {
          if (!part.startsWith('{{')) return <span key={i}>{part}</span>;
          const key = part.slice(2, -2);
          const term = TERMS[key];
          if (!term) return <span key={i}>{key}</span>;
          const isOpen = open === key;
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(key)}
              aria-expanded={isOpen}
              title={`查看「${term.term}」解释`}
              className={`mx-0.5 inline-flex cursor-pointer items-center gap-0.5 whitespace-nowrap rounded px-1 align-baseline text-[0.95em] underline decoration-dotted decoration-[1.5px] underline-offset-[3px] transition-colors ${
                onDark
                  ? 'text-accent-200 hover:bg-background-50/10'
                  : 'text-accent-800 hover:bg-accent-100/70'
              }`}
            >
              {term.term}
              <i className="ri-question-line flex h-2.5 w-2.5 items-center justify-center text-[9px] opacity-70" />
            </button>
          );
        })}
      </p>

      {active && (
        <div
          className={`mt-2 animate-fade rounded-md border px-2.5 py-2 ${
            onDark ? 'border-background-100/20 bg-background-50/10' : 'border-accent-300/70 bg-accent-50'
          }`}
        >
          <p className={`text-[10.5px] tracking-[0.1em] ${onDark ? 'text-accent-200' : 'text-accent-800'}`}>
            术语解释 · {active.term}
          </p>
          <p
            className={`mt-1 text-[11.5px] leading-[1.75] ${
              onDark ? 'text-background-200' : 'text-foreground-800'
            }`}
          >
            {active.detail}
          </p>
          <p className={`mt-1.5 text-[10.5px] ${onDark ? 'text-background-400' : 'text-foreground-500'}`}>
            一句话：{active.short}
          </p>
        </div>
      )}
    </div>
  );
}