import { useEffect, useRef, useState } from 'react';
import { WECHAT_PRESETS, WECHAT_PUSH, type WechatMessage } from '@/mocks/meeting';
import useInView from '@/hooks/useInView';
import PanelHeader from './PanelHeader';
import { replyFor } from './wechatReply';

const stamp = () =>
  new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });

const CAPABILITIES = ['主动推送', '智能追问', '会议依据可追溯'];

export default function PanelWechat() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [messages, setMessages] = useState<WechatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState('');
  const [pushKey, setPushKey] = useState(0);
  const [openEvidence, setOpenEvidence] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!inView) return;
    setTyping(true);
    const timer = window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...WECHAT_PUSH, ...prev]);
    }, 950);
    return () => window.clearTimeout(timer);
  }, [inView, pushKey]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const reset = () => {
    setMessages([]);
    setOpenEvidence([]);
    setDraft('');
    setTyping(true);
    setPushKey((k) => k + 1);
  };

  const toggleEvidence = (id: string) => {
    setOpenEvidence((prev) => (prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]));
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    const reply = replyFor(text);
    setDraft('');
    setMessages((prev) => [...prev, { id: `me-${Date.now()}`, from: 'me', time: stamp(), text }]);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          from: 'assistant',
          time: stamp(),
          text: reply.text,
          evidence: reply.evidence,
        },
      ]);
    }, 780);
  };

  return (
    <div ref={ref}>
      <PanelHeader
        index="04"
        label="会议外 · 微信联动"
        title="会议结束了，助手还在。"
        note="无需重新打开 App，会议任务主动提醒，重要信息随时追问。"
        onReset={reset}
      />

      <div className="mt-6 flex flex-col items-center">
        <div className="w-full max-w-[600px]">
          <div className="overflow-hidden rounded-[22px] border border-foreground-950/15 bg-background-100 p-[6px]">
            <div className="overflow-hidden rounded-[16px] bg-background-50">
              <div className="flex items-center gap-2.5 border-b border-foreground-950/10 bg-background-100 px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-500">
                  <i className="ri-robot-2-line flex h-4 w-4 items-center justify-center text-[14px] text-background-50" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] text-foreground-950">Agenote 会议助手</p>
                  <p className="text-[10px] text-foreground-500">微信 Chatbox · 演示对话</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-primary-300 bg-primary-50 px-2 py-0.5 text-[9.5px] text-primary-800">
                  <span className="h-1 w-1 rounded-full bg-primary-500" />
                  已绑定
                </span>
              </div>

              <div
                ref={listRef}
                className="flex max-h-[420px] min-h-[300px] flex-col gap-3 overflow-y-auto px-4 py-4 md:px-5"
              >
                <p className="mx-auto flex shrink-0 items-center gap-1 rounded-full bg-background-100 px-2.5 py-1 text-[9.5px] text-foreground-500">
                  <i className="ri-file-text-line flex h-2.5 w-2.5 items-center justify-center" />
                  会议已解析 · 3 条结论 / 5 项待办
                </p>

                {messages.map((m) => {
                  const mine = m.from === 'me';
                  const expanded = openEvidence.includes(m.id);
                  return (
                    <div
                      key={m.id}
                      className={`flex shrink-0 gap-2 ${mine ? 'justify-end' : 'justify-start'}`}
                      style={{ animation: 'rise-in 0.42s cubic-bezier(0.16,1,0.3,1) both' }}
                    >
                      {!mine && (
                        <span className="mt-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100">
                          <i className="ri-robot-2-line flex h-3 w-3 items-center justify-center text-[11px] text-primary-800" />
                        </span>
                      )}

                      <div className={`flex min-w-0 max-w-[86%] flex-col ${mine ? 'items-end' : 'items-start'}`}>
                        <p className="mb-1 px-0.5 text-[9px] text-foreground-400">{m.time}</p>
                        <div
                          className={`rounded-xl px-3 py-2 text-[12px] leading-[1.8] md:text-[12.5px] ${
                            mine
                              ? 'rounded-tr-sm bg-primary-500 text-background-50'
                              : 'rounded-tl-sm border border-foreground-950/10 bg-background-100 text-foreground-800'
                          }`}
                        >
                          {m.text}
                        </div>

                        {m.card && (
                          <div className="mt-2 flex w-full items-center gap-2 rounded-lg border border-foreground-950/10 bg-background-50 px-2.5 py-2">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-accent-100">
                              <i
                                className={`${m.card.icon} flex h-3.5 w-3.5 items-center justify-center text-accent-900`}
                              />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-[11.5px] text-foreground-900">{m.card.title}</p>
                              <p className="text-[10px] text-foreground-500">{m.card.meta}</p>
                            </div>
                          </div>
                        )}

                        {m.evidence && (
                          <div className="mt-1.5 w-full">
                            <button
                              type="button"
                              onClick={() => toggleEvidence(m.id)}
                              aria-expanded={expanded}
                              className="flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-full border border-foreground-950/12 bg-background-50 px-2 py-0.5 text-[9.5px] text-foreground-600 transition-colors hover:border-accent-300 hover:text-accent-900"
                            >
                              <i className="ri-link flex h-2.5 w-2.5 items-center justify-center" />
                              {expanded ? '收起依据' : '查看依据'}
                              <i
                                className={`ri-arrow-down-s-line flex h-2.5 w-2.5 items-center justify-center transition-transform ${
                                  expanded ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            {expanded && (
                              <div
                                className="mt-1.5 border-l-2 border-accent-400 bg-accent-50/70 px-2.5 py-2"
                                style={{ animation: 'fade-in 0.32s ease-out both' }}
                              >
                                <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[9.5px] text-foreground-500">
                                  <span className="flex items-center gap-1">
                                    <i className="ri-calendar-check-line flex h-2.5 w-2.5 items-center justify-center" />
                                    {m.evidence.meeting}
                                  </span>
                                  <span className="tnum">{m.evidence.time}</span>
                                  <span>{m.evidence.speaker}</span>
                                </p>
                                <p className="mt-1 text-[11px] leading-[1.8] text-foreground-800">
                                  “{m.evidence.quote}”
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {typing && (
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100">
                      <i className="ri-robot-2-line flex h-3 w-3 items-center justify-center text-[11px] text-primary-800" />
                    </span>
                    <p className="flex items-center gap-1.5 rounded-tl-sm rounded-xl border border-foreground-950/10 bg-background-100 px-3 py-2 text-[10.5px] text-foreground-500">
                      <span className="flex items-center gap-0.5">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="h-1 w-1 rounded-full bg-foreground-400"
                            style={{ animation: `waveform 1s ease-in-out ${i * 140}ms infinite` }}
                          />
                        ))}
                      </span>
                      正在读取会议记录…
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-foreground-950/10 bg-background-100/50 px-3.5 py-3 md:px-4">
                <p className="text-[9px] tracking-[0.1em] text-foreground-500">试试这样问</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {WECHAT_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => send(p.label)}
                      className="cursor-pointer whitespace-nowrap rounded-full border border-foreground-950/12 bg-background-50 px-2.5 py-1 text-[10px] text-foreground-700 transition-colors hover:border-primary-300 hover:text-primary-800"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <form
                  className="mt-2.5 flex items-center gap-1.5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(draft);
                  }}
                >
                  <label htmlFor="wechat-demo-input" className="sr-only">
                    输入你想问的问题
                  </label>
                  <input
                    id="wechat-demo-input"
                    name="wechat_demo_message"
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="问问这场会，比如「技术部什么时候联调完」"
                    autoComplete="off"
                    className="min-w-0 flex-1 rounded-md border border-foreground-950/12 bg-background-50 px-3 py-2 text-[11.5px] text-foreground-900 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="发送消息"
                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md bg-primary-500 text-background-50 transition-colors hover:bg-primary-600"
                  >
                    <i className="ri-send-plane-fill flex h-3.5 w-3.5 items-center justify-center text-[11px]" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          <p className="mt-2.5 text-center text-[10px] leading-[1.7] text-foreground-400">
            演示对话：回答只来自本场会议的纪要与待办，不连接真实微信与模型接口。
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {CAPABILITIES.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && <span className="h-2.5 w-px bg-foreground-950/15" aria-hidden="true" />}
              <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] text-foreground-600">
                <span className="h-1 w-1 rounded-full bg-primary-500" />
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}