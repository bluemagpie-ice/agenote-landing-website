import { useState } from 'react';

export default function WeChatPanel() {
  const [bound, setBound] = useState(true);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-foreground-950/12 bg-background-50">
      <div className="flex items-center justify-between border-b border-foreground-950/10 bg-background-100/60 px-4 py-3">
        <span className="flex items-center gap-2 text-[12.5px] text-foreground-900">
          <i className="ri-wechat-line flex h-4 w-4 items-center justify-center text-primary-700" />
          微信助手 · ClawBot
        </span>
        <button
          type="button"
          onClick={() => setBound((v) => !v)}
          className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2 py-1 text-[10.5px] transition-colors ${
            bound
              ? 'border-primary-300 bg-primary-50 text-primary-800'
              : 'border-foreground-950/15 text-foreground-500'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${bound ? 'bg-primary-500' : 'bg-foreground-300'}`} />
          {bound ? '已绑定' : '未绑定'}
        </button>
      </div>

      {bound ? (
        <div className="flex flex-col gap-2.5 px-4 py-4">
          <p className="text-center text-[10px] text-foreground-400">会议结束 · 21:06</p>

          <div className="max-w-[88%] self-start rounded-lg rounded-tl-sm border border-foreground-950/10 bg-background-100 px-3 py-2">
            <p className="text-[11.5px] leading-[1.75] text-foreground-800">
              产品周会已整理好。本次 2 条结论、3 项行动，预算口径仍需确认。
            </p>
          </div>

          <div className="flex max-w-[88%] items-center gap-2.5 self-start rounded-lg border border-foreground-950/10 bg-background-100 px-3 py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-accent-100">
              <i className="ri-file-pdf-line flex h-4 w-4 items-center justify-center text-accent-800" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11.5px] text-foreground-900">产品周会 · 职业化分析.pdf</p>
              <p className="text-[10px] text-foreground-500">1.2 MB · 含纪要原文与依据</p>
            </div>
          </div>

          <div className="max-w-[88%] self-end rounded-lg rounded-tr-sm bg-primary-500 px-3 py-2">
            <p className="text-[11.5px] leading-[1.75] text-background-50">
              预算口径这件事，我该在会上怎么推进？
            </p>
          </div>

          <div className="max-w-[92%] self-start rounded-lg rounded-tl-sm border border-foreground-950/10 bg-background-100 px-3 py-2">
            <p className="text-[11.5px] leading-[1.75] text-foreground-800">
              建议把「确认版口径」和「6 月试行版」并列摆出来，只请会议对一个决定：
              本季度渠道费用是否单列。这样一次会议就能闭环。
            </p>
            <p className="mt-1.5 text-[10px] text-foreground-500">依据：知识库 2 篇 · 会议原话 1 处</p>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[220px] flex-col items-center justify-center px-6 py-8 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground-950/12">
            <i className="ri-wechat-line flex h-5 w-5 items-center justify-center text-foreground-400" />
          </span>
          <p className="mt-3 text-[12.5px] leading-[1.8] text-foreground-700">
            未绑定微信时，会议记录、纪要和分析结果仍然可以在 App 内查看。
          </p>
          <p className="mt-1.5 text-[11px] text-foreground-500">绑定后可在微信里接收摘要与 PDF，并继续追问</p>
          <button
            type="button"
            onClick={() => setBound(true)}
            className="mt-4 cursor-pointer rounded-md border border-foreground-950/15 px-3 py-1.5 text-[11.5px] text-foreground-800 transition-colors hover:bg-background-100"
          >
            绑定微信助手
          </button>
        </div>
      )}
    </div>
  );
}