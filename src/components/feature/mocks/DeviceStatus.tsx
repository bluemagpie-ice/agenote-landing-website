import { useState } from 'react';

type Props = {
  className?: string;
  name?: string;
};

export default function DeviceCard({ className = '', name = '会议卡 · 03' }: Props) {
  return (
    <div
      className={`relative aspect-[1.62/1] w-full overflow-hidden rounded-2xl border border-foreground-950/40 bg-foreground-950 p-4 ${className}`}
    >
      {/* speaker grill */}
      <div className="grid w-[46%] grid-cols-12 gap-[5px] pt-1 opacity-50">
        {Array.from({ length: 48 }).map((_, i) => (
          <span key={i} className="h-[2px] w-[2px] rounded-full bg-background-100" />
        ))}
      </div>

      {/* top labels */}
      <div className="absolute left-4 right-4 top-3.5 flex items-center justify-between">
        <span className="text-[8.5px] tracking-[0.3em] text-background-300">AI VOICE</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
          <span className="text-[8.5px] tracking-[0.14em] text-background-300">已连接</span>
        </span>
      </div>

      {/* record button */}
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-background-100/25 bg-background-50/5">
          <span className="h-3.5 w-3.5 rounded-full bg-accent-500" />
        </span>
        <span className="text-[8px] tracking-[0.14em] text-background-400">按住录音</span>
      </div>

      {/* bottom label */}
      <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] tracking-[0.04em] text-background-100">{name}</p>
          <p className="mt-0.5 text-[8px] tracking-[0.12em] text-background-500">AGENOTE · 8GB</p>
        </div>
        <span className="flex items-center gap-1">
          <span className="h-[3px] w-4 rounded-full bg-primary-400" />
          <span className="h-[3px] w-4 rounded-full bg-primary-400" />
          <span className="h-[3px] w-4 rounded-full bg-background-600" />
        </span>
      </div>
    </div>
  );
}

const STATUS = [
  { icon: 'ri-bluetooth-line', label: '连接状态', value: '已连接 · iPhone 15', ok: true },
  { icon: 'ri-battery-charge-line', label: '电量', value: '62%', ok: true },
  { icon: 'ri-hard-drive-2-line', label: '存储容量', value: '4.2 / 8 GB', ok: true },
  { icon: 'ri-cpu-line', label: '固件版本', value: 'v1.4.2', ok: true },
  { icon: 'ri-barcode-line', label: '序列号', value: 'AV-2026-0418', ok: true },
  { icon: 'ri-mic-line', label: '录音状态', value: '待机', ok: false },
];

export function DeviceStatus() {
  const [name, setName] = useState('会议卡 · 03');
  const [draft, setDraft] = useState('会议卡 · 03');
  const [saved, setSaved] = useState(false);

  const save = () => {
    const next = draft.trim();
    if (!next) return;
    setName(next);
    setSaved(true);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-foreground-950/12 bg-background-50">
      <div className="flex items-center justify-between border-b border-foreground-950/10 bg-background-100/60 px-4 py-3">
        <span className="flex items-center gap-2 text-[12.5px] text-foreground-900">
          <i className="ri-device-line flex h-4 w-4 items-center justify-center text-foreground-600" />
          我的设备
        </span>
        <span className="flex items-center gap-1.5 text-[10.5px] text-primary-700">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          在线
        </span>
      </div>

      <div className="px-4 py-3">
        <p className="mb-2 text-[11px] tracking-[0.1em] text-foreground-500">{name}</p>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-foreground-950/10 bg-foreground-950/10">
          {STATUS.map((s) => (
            <li key={s.label} className="bg-background-50 px-2.5 py-2.5">
              <p className="flex items-center gap-1.5 text-[10.5px] text-foreground-500">
                <i className={`${s.icon} flex h-3 w-3 items-center justify-center`} />
                {s.label}
              </p>
              <p className={`mt-1 text-[12px] ${s.ok ? 'text-foreground-900' : 'text-accent-800'}`}>{s.value}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-foreground-950/10 px-4 py-3">
        <label htmlFor="device-name" className="text-[11px] tracking-[0.1em] text-foreground-500">
          修改设备名称
        </label>
        <div className="mt-1.5 flex items-center gap-2">
          <input
            id="device-name"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setSaved(false);
            }}
            maxLength={20}
            className="h-9 min-w-0 flex-1 rounded-md border border-foreground-950/15 bg-background-50 px-2.5 text-[12px] text-foreground-900 focus:border-primary-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={save}
            className="h-9 shrink-0 cursor-pointer rounded-md bg-foreground-950 px-3 text-[12px] text-background-50 transition-colors hover:bg-foreground-800"
          >
            保存
          </button>
        </div>
        <p className="mt-1.5 text-[10.5px] text-foreground-500">
          {saved ? `已保存为「${name}」，App 与录音卡会使用这个名称` : '给每张卡设置容易识别的名称，比如「客户会议」「周会」'}
        </p>
      </div>
    </div>
  );
}