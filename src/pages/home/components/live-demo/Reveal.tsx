import type { ReactNode } from 'react';
import useInView from '@/hooks/useInView';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** 图片插入效果 */
  insert?: boolean;
};

/** 内容进入视口时淡入上移，用于会议后的分步展示 */
export default function Reveal({ children, delay = 0, className = '', insert = false }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className}`}
    >
      <div className={inView && insert ? 'animate-insert' : ''}>{children}</div>
    </div>
  );
}