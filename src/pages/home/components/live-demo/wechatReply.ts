import { MEETING, TASKS, WECHAT_ANSWERS, type WechatEvidence } from '@/mocks/meeting';

export type ChatReply = { text: string; evidence?: WechatEvidence };

const has = (input: string, words: string[]) => words.some((word) => input.includes(word));

const taskLine = (id: string) => {
  const task = TASKS.find((t) => t.id === id);
  if (!task) return '';
  return `「${task.title}」由${task.dept} · ${task.owner}负责，截止 ${task.due}，当前状态：${task.status}。`;
};

/** 从这场会议的转写里取一条原话，作为可展开的依据 */
const quoteOf = (speaker: string, time: string, quote: string): WechatEvidence => ({
  meeting: MEETING.title,
  speaker,
  time,
  quote,
});

/**
 * 基于本场会议数据的规则式回答。
 * 只回答这场会议里已有的内容，不连接任何模型接口。
 * 有原话可引的回答才带依据，没有依据的直接不给入口。
 */
export function replyFor(input: string): ChatReply {
  const text = input.trim();

  if (has(text, ['结论', '决定', '结果', '达成'])) {
    return { text: WECHAT_ANSWERS.p1.text, evidence: WECHAT_ANSWERS.p1.evidence };
  }

  if (has(text, ['疑问', '标记', '解决'])) {
    return { text: WECHAT_ANSWERS.p4.text, evidence: WECHAT_ANSWERS.p4.evidence };
  }

  if (has(text, ['待办', '待完成', '任务', '我要做', '我的事'])) {
    return { text: WECHAT_ANSWERS.p3.text, evidence: WECHAT_ANSWERS.p3.evidence };
  }

  if (has(text, ['为什么', '推迟', '延迟', '灰度', '什么时候', '上线时间'])) {
    return { text: WECHAT_ANSWERS.p2.text, evidence: WECHAT_ANSWERS.p2.evidence };
  }

  if (has(text, ['联调', 'SLA', '接口', '技术'])) {
    return {
      text: `技术部的任务：${taskLine('t1')}联调完成后才安排灰度，所以它是上线和宣传的共同前置条件。`,
      evidence: quoteOf(
        '技术部 · 陈熠',
        '00:03:02',
        '我们需要先完成 API 联调，确认 SLA 之后再安排灰度发布。',
      ),
    };
  }

  if (has(text, ['物料', '宣传', '海报', '文案', '定稿'])) {
    return {
      text: `你在这场会里的任务：${taskLine('t3')}前置条件是 11 月 2 日拿到技术部的 SLA 结论。`,
      evidence: quoteOf(
        '产品部 · 林舟',
        '00:07:05',
        '可以，物料先排到 11 月 4 日，SLA 结论 11 月 2 日给到市场部。',
      ),
    };
  }

  if (has(text, ['测试', '回归', '报告'])) {
    return {
      text: `测试部的任务：${taskLine('t2')}回归测试排在联调完成之后，两天内给出报告。`,
      evidence: quoteOf(
        '测试部 · 赵敏',
        '00:05:03',
        '联调完成后我们需要两天回归测试，测试报告 11 月 4 日给到大家。',
      ),
    };
  }

  if (has(text, ['纪要', '总结', '记录', '逐字稿'])) {
    return {
      text: '这场会的纪要在 15:02 已经推给你了，里面包含 3 条结论和 5 项待办。想看原话可以直接问我某一条结论。',
    };
  }

  return {
    text: '这个问题在本次会议记录里没有对应内容。你可以问我：主要结论、我的待办、技术部的时间安排，或者会上标记的疑问。',
  };
}