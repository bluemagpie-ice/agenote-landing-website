import { useState } from 'react';
import NotesTabs from '@/pages/demo/components/NotesTabs';
import TaskBoard from '@/pages/demo/components/TaskBoard';
import MutualCommitments from './MutualCommitments';
import PanelHeader from './PanelHeader';
import Reveal from './Reveal';

function StepLabel({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <p className="flex items-center gap-2 text-[11px] text-foreground-800">
        <span className="tnum flex h-4 w-4 items-center justify-center rounded-full bg-foreground-950 text-[9px] text-background-50">
          {index}
        </span>
        {title}
      </p>
      <p className="text-[10px] text-foreground-500">{note}</p>
    </div>
  );
}

export default function PanelAfter() {
  const [boardKey, setBoardKey] = useState(0);

  return (
    <div>
      <PanelHeader
        index="03"
        label="会议后 · 协作落实"
        title="讨论留下来，也变成动作。"
        note="向下滚动的顺序就是会后的处理顺序：先看待办，再看双方承诺，最后看整理好的纪要。"
        onReset={() => setBoardKey((k) => k + 1)}
      />

      <div className="mt-4 flex flex-col gap-6">
        <div>
          <StepLabel index="1" title="任务与会议" note={`按日期查看 · 左右滑动切换周`} />
          <Reveal>
            <TaskBoard key={boardKey} />
          </Reveal>
        </div>

        <div>
          <StepLabel index="2" title="双向承诺" note="我方 / 对方各一份 · 可回放语音证据" />
          <Reveal delay={60}>
            <MutualCommitments />
          </Reveal>
        </div>

        <div>
          <StepLabel index="3" title="AI 会议纪要" note="纪要 / 导图 / 逐字稿，同一份记录" />
          <Reveal>
            <NotesTabs />
          </Reveal>
        </div>
      </div>
    </div>
  );
}