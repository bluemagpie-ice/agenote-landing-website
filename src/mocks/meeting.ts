/**
 * 统一演示数据源 —— 一场跨部门会议（新产品上线协调会）
 * 页面上的所有 Demo 内容都从这里读取，保证会议前 / 中 / 后 / 微信四个阶段
 * 出现的是同一场会、同一批人、同一批任务。
 *
 * 注意：这里全部是前端 Mock 数据，不代表真实 AI 或真实会议记录。
 */

export type Tone = 'product' | 'tech' | 'market' | 'qa';

export type Participant = {
  dept: string;
  name: string;
  role: string;
  tone: Tone;
  isMe?: boolean;
};

export const TONE_STYLE: Record<Tone, { dot: string; chip: string; bar: string }> = {
  product: { dot: 'bg-primary-500', chip: 'bg-primary-100 text-primary-800', bar: 'bg-primary-500' },
  tech: { dot: 'bg-secondary-500', chip: 'bg-secondary-200 text-secondary-900', bar: 'bg-secondary-500' },
  market: { dot: 'bg-accent-500', chip: 'bg-accent-100 text-accent-900', bar: 'bg-accent-500' },
  qa: { dot: 'bg-foreground-600', chip: 'bg-background-200 text-foreground-800', bar: 'bg-foreground-500' },
};

export const MEETING = {
  title: '新产品上线协调会',
  date: '10 月 31 日',
  weekday: '周五',
  start: '14:00',
  duration: '38 分钟',
  place: '会议室 B · 线上同步',
  goal: '确认 11 月新产品上线的时间、范围与各部门分工',
  myRole: '市场部 · 负责宣传物料与对外排期',
  card: '会议卡 · 03',
};

export const PARTICIPANTS: Participant[] = [
  { dept: '产品部', name: '林舟', role: '主持', tone: 'product' },
  { dept: '技术部', name: '陈熠', role: '接口与发布', tone: 'tech' },
  { dept: '市场部', name: '我', role: '宣传排期', tone: 'market', isMe: true },
  { dept: '测试部', name: '赵敏', role: '回归测试', tone: 'qa' },
];

export const MEETING_STATS = {
  minutes: 38,
  speakers: 4,
  decisions: 3,
  tasks: 5,
  questions: 2,
};

/* ---------------------------------- 术语 --------------------------------- */

export type Term = { term: string; short: string; detail: string };

export const TERMS: Record<string, Term> = {
  'API 联调': {
    term: 'API 联调',
    short: '前后端接口接通并一起验证数据能正确传递',
    detail:
      '技术部把「产品功能」和「后台服务」之间的接口接通，一起验证数据能不能正确传过去。联调没通过之前，页面上看到的数据都可能是假的。',
  },
  SLA: {
    term: 'SLA',
    short: '对外承诺的稳定性与响应时间标准',
    detail:
      '服务等级约定，这里指上线后系统允许的故障时长、响应速度等标准。SLA 确认之后，技术部才敢承诺具体上线日期。',
  },
  灰度发布: {
    term: '灰度发布',
    short: '先让一小部分用户用新版本，再全量上线',
    detail:
      '先把新版本放开给一小部分用户使用，观察稳定性后再对所有人开放。所以灰度日期会直接影响对外宣传的日期。',
  },
  回归测试: {
    term: '回归测试',
    short: '确认新改动没有弄坏原有功能',
    detail: '把原来正常的功能再完整跑一遍，确认这次改动没有把旧功能弄坏。测试部需要时间，通常排在上线之前。',
  },
};

/* --------------------------------- 转写 --------------------------------- */

export type TranscriptLine = {
  id: string;
  time: string;
  dept: string;
  speaker: string;
  tone: Tone;
  /** {{术语}} 会被解析成可点击的术语解释 */
  text: string;
  mine?: boolean;
  /** 这句是否值得关注的 AI 提示 */
  hint?: string;
};

export const TRANSCRIPT: TranscriptLine[] = [
  {
    id: 'l1',
    time: '00:02:14',
    dept: '产品部',
    speaker: '林舟',
    tone: 'product',
    text: '这次 11 月上新，先把范围收一下：主流程必须齐，增值功能可以放到下个版本。',
  },
  {
    id: 'l2',
    time: '00:03:02',
    dept: '技术部',
    speaker: '陈熠',
    tone: 'tech',
    text: '我们需要先完成 {{API 联调}}，确认 {{SLA}} 之后再安排 {{灰度发布}}。',
    hint: '这句话决定了上线日期，建议确认联调完成时间。',
  },
  {
    id: 'l3',
    time: '00:03:41',
    dept: '市场部',
    speaker: '我',
    tone: 'market',
    mine: true,
    text: '如果 {{灰度发布}}时间推迟，会不会影响宣传计划？',
  },
  {
    id: 'l4',
    time: '00:04:20',
    dept: '技术部',
    speaker: '陈熠',
    tone: 'tech',
    text: '按现在的进度，11 月 3 日能完成联调，灰度放在 11 月 5 日，宣传可以按 11 月 6 日排。',
  },
  {
    id: 'l5',
    time: '00:05:03',
    dept: '测试部',
    speaker: '赵敏',
    tone: 'qa',
    text: '联调完成后我们需要两天{{回归测试}}，测试报告 11 月 4 日给到大家。',
  },
  {
    id: 'l6',
    time: '00:06:12',
    dept: '产品部',
    speaker: '林舟',
    tone: 'product',
    text: '那结论先定：11 月 6 日对外发布，宣传物料 11 月 4 日前定稿，市场部确认一下。',
  },
  {
    id: 'l7',
    time: '00:06:40',
    dept: '市场部',
    speaker: '我',
    tone: 'market',
    mine: true,
    text: '宣传物料里要写发布日期，能不能等 {{SLA}} 确认之后再定稿？',
  },
  {
    id: 'l8',
    time: '00:07:05',
    dept: '产品部',
    speaker: '林舟',
    tone: 'product',
    text: '可以，物料先排到 11 月 4 日，SLA 结论 11 月 2 日给到市场部。',
  },
];

/* ------------------------------- 当前焦点 ------------------------------- */

export type FocusSnapshot = {
  /** 显示到第几句转写后，焦点内容切换到这个快照 */
  afterLine: number;
  issue: string;
  progress: string;
  divergences?: string[];
  conclusion?: string;
  background?: string;
  /** 只有值得追溯的字段才带依据 */
  evidence?: { label: string; time: string } | null;
};

export const FOCUS_TIMELINE: FocusSnapshot[] = [
  {
    afterLine: 1,
    issue: '11 月新产品的上线范围',
    progress: '产品部已收敛范围：主流程优先，增值功能排到下个版本。',
    background: '距离计划对外发布还有 6 天，宣传物料尚未定稿。',
  },
  {
    afterLine: 3,
    issue: '技术上线节奏与宣传排期是否能对上',
    progress: '技术部给出联调、灰度两个时间点，市场部关心宣传排期。',
    divergences: ['市场部担心灰度推迟会连带影响宣传计划'],
    background: '技术部把上线拆成联调、灰度、全量三步，灰度日期尚未确认。',
    evidence: { label: '技术部：先联调再灰度', time: '00:03:02' },
  },
  {
    afterLine: 4,
    issue: '技术上线节奏与宣传排期是否能对上',
    progress: '技术部给出明确时间：11 月 3 日联调、11 月 5 日灰度、11 月 6 日对外。',
    divergences: ['市场部希望物料定稿等 SLA 结论'],
    conclusion: '宣传排期按 11 月 6 日对外准备，物料 11 月 4 日前定稿。',
    evidence: { label: '技术部：联调与灰度时间', time: '00:04:20' },
  },
  {
    afterLine: 7,
    issue: '上线时间、宣传物料与 SLA 结论的依赖关系',
    progress: '各部门时间点已对齐，剩物料定稿的前置条件需要落到人。',
    divergences: ['物料定稿是否要等 SLA 结论'],
    conclusion: 'SLA 结论 11 月 2 日给到市场部，物料 11 月 4 日定稿，11 月 6 日对外发布。',
    evidence: { label: '产品部：物料与 SLA 的先后顺序', time: '00:07:05' },
  },
];

/* ------------------------------- 我的疑问 ------------------------------- */

export type MeetingQuestion = {
  id: string;
  lineId: string;
  time: string;
  context: string;
  question: string;
  status: '待确认' | '已回复';
  answer?: string;
};

export const QUESTIONS: MeetingQuestion[] = [
  {
    id: 'q1',
    lineId: 'l3',
    time: '00:03:41',
    context: '市场部 · 我：如果灰度发布时间推迟，会不会影响宣传计划？',
    question: '灰度推迟会不会让宣传排期整体后移？',
    status: '已回复',
    answer:
      '影响可控。技术部确认 11 月 5 日灰度、11 月 6 日对外，宣传按 11 月 6 日排即可；若灰度推迟超过 1 天，再同步调整对外时间。',
  },
  {
    id: 'q2',
    lineId: 'l7',
    time: '00:06:40',
    context: '市场部 · 我：宣传物料能不能等 SLA 确认之后再定稿？',
    question: '物料定稿是否可以等 SLA 结论出来？',
    status: '待确认',
  },
];

/* --------------------------------- 纪要 --------------------------------- */

export const AI_NOTES = {
  background:
    '11 月新产品计划对外发布，产品部需要收敛上线范围，技术部需要评估联调与灰度节奏，市场部需要据此安排宣传物料，测试部负责上线前回归测试。',
  decisions: [
    {
      text: '11 月 6 日对外发布，灰度发布从 11 月 5 日开始。',
      quote: '“11 月 3 日能完成联调，灰度放在 11 月 5 日，宣传可以按 11 月 6 日排。”',
      time: '00:04:20',
    },
    {
      text: '宣传物料 11 月 4 日前定稿，SLA 结论 11 月 2 日先给到市场部。',
      quote: '“物料先排到 11 月 4 日，SLA 结论 11 月 2 日给到市场部。”',
      time: '00:07:05',
    },
    {
      text: '上线范围收敛为主流程，增值功能排到下个版本。',
      quote: '“主流程必须齐，增值功能可以放到下个版本。”',
      time: '00:02:14',
    },
  ],
  discussion: [
    { title: '上线范围与优先级', dept: '产品部', minutes: '9 分钟', note: '主流程优先，增值功能延后' },
    { title: '联调、SLA 与灰度节奏', dept: '技术部', minutes: '12 分钟', note: '三个时间点已给出' },
    { title: '宣传排期与物料定稿', dept: '市场部', minutes: '8 分钟', note: '物料等 SLA 结论后定稿' },
    { title: '上线前回归测试安排', dept: '测试部', minutes: '6 分钟', note: '11 月 4 日提交测试报告' },
  ],
};

export const MINDMAP = {
  root: '新产品 11 月上线',
  branches: [
    { label: '上线范围', children: ['主流程必须齐', '增值功能延后'] },
    { label: '技术节奏', children: ['11/3 联调完成', '11/5 灰度', '11/6 对外'] },
    { label: '宣传排期', children: ['11/2 收到 SLA', '11/4 物料定稿'] },
    { label: '测试', children: ['两天回归', '11/4 测试报告'] },
    { label: '待确认', children: ['灰度名单'] },
  ],
};

/* --------------------------------- 待办 --------------------------------- */

export type TaskStatus = '待开始' | '进行中' | '已完成';

export type DemoTask = {
  id: string;
  title: string;
  owner: string;
  dept: string;
  due: string;
  status: TaskStatus;
  sourceLineId: string;
  source: string;
};

export const TASKS: DemoTask[] = [
  {
    id: 't1',
    title: '完成 API 联调并输出 SLA 结论',
    owner: '陈熠',
    dept: '技术部',
    due: '11 月 3 日',
    status: '进行中',
    sourceLineId: 'l2',
    source: '技术部：我们需要先完成 API 联调，确认 SLA 之后再安排灰度发布。',
  },
  {
    id: 't2',
    title: '完成回归测试并提交测试报告',
    owner: '赵敏',
    dept: '测试部',
    due: '11 月 4 日',
    status: '进行中',
    sourceLineId: 'l5',
    source: '测试部：联调完成后我们需要两天回归测试，测试报告 11 月 4 日给到大家。',
  },
  {
    id: 't3',
    title: '确认市场宣传材料（含发布日期）',
    owner: '我',
    dept: '市场部',
    due: '11 月 4 日',
    status: '待开始',
    sourceLineId: 'l6',
    source: '产品部：宣传物料 11 月 4 日前定稿，市场部确认一下。',
  },
  {
    id: 't4',
    title: '确认 11 月 5 日灰度名单',
    owner: '陈熠',
    dept: '技术部',
    due: '11 月 5 日',
    status: '待开始',
    sourceLineId: 'l4',
    source: '技术部：灰度放在 11 月 5 日，宣传可以按 11 月 6 日排。',
  },
  {
    id: 't5',
    title: '把上线范围说明同步到内部文档',
    owner: '林舟',
    dept: '产品部',
    due: '10 月 31 日',
    status: '已完成',
    sourceLineId: 'l1',
    source: '产品部：这次 11 月上新，先把范围收一下。',
  },
];

export const TASK_STATUS_ORDER: TaskStatus[] = ['待开始', '进行中', '已完成'];

/* --------------------------------- 微信 --------------------------------- */

/** 可展开的会议依据：会议名 + 原话时间点 + 原话内容 */
export type WechatEvidence = {
  meeting: string;
  speaker: string;
  time: string;
  quote: string;
};

export type WechatMessage = {
  id: string;
  from: 'assistant' | 'me';
  time: string;
  text: string;
  card?: { title: string; meta: string; icon: string };
  evidence?: WechatEvidence;
};

export const WECHAT_PUSH: WechatMessage[] = [
  {
    id: 'w1',
    from: 'assistant',
    time: '15:02',
    text:
      '你在今天的新产品上线协调会中，有一项待完成任务：确认市场宣传材料（含发布日期），截止时间为 11 月 4 日。',
    card: { title: '新产品上线协调会 · 会议纪要', meta: '38 分钟 · 3 条结论 · 5 项待办', icon: 'ri-file-text-line' },
  },
  {
    id: 'w2',
    from: 'assistant',
    time: '15:03',
    text: '另外提醒你：11 月 2 日会收到技术部的 SLA 结论，收到后再定稿物料。',
    evidence: {
      meeting: '新产品上线协调会',
      speaker: '产品部 · 林舟',
      time: '00:07:05',
      quote: '可以，物料先排到 11 月 4 日，SLA 结论 11 月 2 日给到市场部。',
    },
  },
];

export const WECHAT_PRESETS = [
  { id: 'p1', label: '今天会议的主要结论是什么？' },
  { id: 'p2', label: '技术部为什么建议推迟上线？' },
  { id: 'p3', label: '我有哪些待完成任务？' },
  { id: 'p4', label: '我在会上标记的疑问解决了吗？' },
];

export const WECHAT_ANSWERS: Record<string, { text: string; evidence?: WechatEvidence }> = {
  p1: {
    text:
      '三条结论：① 11 月 6 日对外发布，11 月 5 日开始灰度；② 宣传物料 11 月 4 日前定稿；③ 上线范围收敛为主流程，增值功能排到下个版本。',
    evidence: {
      meeting: '新产品上线协调会',
      speaker: '技术部 · 陈熠',
      time: '00:04:20',
      quote: '按现在的进度，11 月 3 日能完成联调，灰度放在 11 月 5 日，宣传可以按 11 月 6 日排。',
    },
  },
  p2: {
    text:
      '技术部没有建议整体推迟。他们的意思是：先完成 API 联调并确认 SLA，再安排灰度发布。按目前进度是 11 月 3 日联调、11 月 5 日灰度、11 月 6 日对外，宣传排期不用后移。',
    evidence: {
      meeting: '新产品上线协调会',
      speaker: '技术部 · 陈熠',
      time: '00:03:02',
      quote: '我们需要先完成 API 联调，确认 SLA 之后再安排灰度发布。',
    },
  },
  p3: {
    text: '你（市场部）有 1 项待完成任务：确认市场宣传材料（含发布日期），截止 11 月 4 日，目前状态为待开始。前置条件是 11 月 2 日收到技术部 SLA 结论。',
  },
  p4: {
    text:
      '标记了 2 个疑问。「灰度是否影响宣传」已回复：技术部确认 11 月 5 日灰度、11 月 6 日对外，影响可控。「物料能否等 SLA 后再定稿」仍为待确认，等 11 月 2 日结论。',
    evidence: {
      meeting: '新产品上线协调会',
      speaker: '市场部 · 我',
      time: '00:03:41',
      quote: '如果灰度发布时间推迟，会不会影响宣传计划？',
    },
  },
};

/* ------------------------------ 阶段配置 ------------------------------ */

export const DEMO_STAGES = [
  { key: 'before', index: '01', label: '会议前', title: '一键开启，轻松记录', icon: 'ri-record-circle-line' },
  { key: 'during', index: '02', label: '会议中', title: '听懂每一句，跟上每一步', icon: 'ri-live-line' },
  { key: 'after', index: '03', label: '会议后', title: '从会议讨论，到实际行动', icon: 'ri-file-list-3-line' },
  { key: 'wechat', index: '04', label: '微信联动', title: '会议结束了，助手还在', icon: 'ri-wechat-line' },
] as const;

export type StageKey = (typeof DEMO_STAGES)[number]['key'];