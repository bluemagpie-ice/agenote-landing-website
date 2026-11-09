/**
 * 双向承诺 · 数据（前端 Mock）
 * 内容全部来自同一条演示链路：11 月新产品上线协调会。
 * 每条承诺都对应一句会议原话，作为可回放的语音证据。
 */

export type CommitmentSide = 'mine' | 'theirs';

export type CommitmentStatus = '待履行' | '履行中' | '已履行';

export type Commitment = {
  id: string;
  side: CommitmentSide;
  /** 履约方，例如「市场部 · 我」 */
  owner: string;
  title: string;
  note: string;
  status: CommitmentStatus;
  /** 承诺交付节点 */
  due: string;
  /** 成果物拟定路径 */
  artifact: string;
  evidence: {
    /** 会议原话的时间点 */
    lineTime: string;
    /** 这段话在录音里的长度 */
    duration: string;
    /** 录音片段时长（秒），用于回放进度 */
    seconds: number;
    speaker: string;
    quote: string;
  };
};

export const COMMITMENT_TABS: { key: CommitmentSide; label: string }[] = [
  { key: 'mine', label: '我方承诺' },
  { key: 'theirs', label: '对方承诺' },
];

export const COMMITMENTS: Commitment[] = [
  /* ------------------------------- 我方 ------------------------------- */
  {
    id: 'cm-1',
    side: 'mine',
    owner: '市场部 · 我',
    title: '11 月 4 日前完成宣传物料定稿（含发布日期）',
    note: '按 11 月 6 日对外发布准备，定稿后同步给产品部确认。',
    status: '履行中',
    due: '11 月 4 日',
    artifact: '宣传物料终稿 · 已关联 2 份文件',
    evidence: {
      lineTime: '00:06:12',
      duration: '00:04',
      seconds: 4,
      speaker: '产品部 · 林舟',
      quote: '宣传物料 11 月 4 日前定稿，市场部确认一下。',
    },
  },
  {
    id: 'cm-2',
    side: 'mine',
    owner: '市场部 · 我',
    title: '收到 SLA 结论后回写物料说明，并同步产品部',
    note: '前置条件是 11 月 2 日拿到技术部 SLA 结论，未到之前不改发布日期。',
    status: '待履行',
    due: '11 月 2 日',
    artifact: '物料说明修订版 · 尚未关联附件',
    evidence: {
      lineTime: '00:06:40',
      duration: '00:03',
      seconds: 3,
      speaker: '市场部 · 我',
      quote: '宣传物料里要写发布日期，能不能等 SLA 确认之后再定稿？',
    },
  },

  /* ------------------------------- 对方 ------------------------------- */
  {
    id: 'cm-3',
    side: 'theirs',
    owner: '技术部 · 陈熠',
    title: '11 月 3 日完成 API 联调，并给出 SLA 结论',
    note: '联调结论决定灰度日期，也决定宣传物料能否按 11 月 6 日排。',
    status: '履行中',
    due: '11 月 3 日',
    artifact: '联调记录与 SLA 结论 · 尚未关联附件',
    evidence: {
      lineTime: '00:04:20',
      duration: '00:05',
      seconds: 5,
      speaker: '技术部 · 陈熠',
      quote: '按现在的进度，11 月 3 日能完成联调，灰度放在 11 月 5 日，宣传可以按 11 月 6 日排。',
    },
  },
  {
    id: 'cm-4',
    side: 'theirs',
    owner: '产品部 · 林舟',
    title: '11 月 2 日把 SLA 结论同步给市场部',
    note: '这是物料定稿的前置动作，逾期会连带影响 11 月 4 日定稿。',
    status: '待履行',
    due: '11 月 2 日',
    artifact: 'SLA 结论通知 · 尚未关联附件',
    evidence: {
      lineTime: '00:07:05',
      duration: '00:03',
      seconds: 3,
      speaker: '产品部 · 林舟',
      quote: '可以，物料先排到 11 月 4 日，SLA 结论 11 月 2 日给到市场部。',
    },
  },
];

export const COMMITMENT_NOTE = '承诺由会议原话生成，履约状态以实际核验为准。';