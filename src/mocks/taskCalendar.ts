/**
 * 任务与会议 · 周历数据（前端 Mock）
 * 按「周 → 天 → 任务」组织，用于会议后「任务与会议」的周历展示。
 * 每天只保留：任务标题、状态、截止时间；不再保留发布者与任务来源。
 */

export type CalendarTaskStatus = '待开始' | '进行中' | '已完成';

export type CalendarTask = {
  id: string;
  title: string;
  status: CalendarTaskStatus;
  /** 截止时间；已完成的任务展示为「已完成」 */
  due: string;
};

export type CalendarDay = {
  key: string;
  month: number;
  dateNum: number;
  weekday: string;
  isToday?: boolean;
  meetingCount: number;
  meetingTime?: string;
  meetingTitle?: string;
  tasks: CalendarTask[];
};

export type CalendarWeek = {
  key: string;
  days: CalendarDay[];
};

/** 当前所在周（含「今天」）的索引 */
export const CALENDAR_TODAY_WEEK = 2;
/** 今天所在列的索引（周一为 0） */
export const CALENDAR_TODAY_INDEX = 5;

export const CALENDAR_WEEKS: CalendarWeek[] = [
  {
    key: 'w-1012',
    days: [
      {
        key: 'd-1012',
        month: 10,
        dateNum: 12,
        weekday: '周一',
        meetingCount: 0,
        tasks: [
          { id: 'c-1012-1', title: '梳理 10 月遗留问题清单', status: '已完成', due: '10 月 12 日' },
          { id: 'c-1012-2', title: '把遗留问题同步到需求池', status: '已完成', due: '10 月 12 日' },
        ],
      },
      { key: 'd-1013', month: 10, dateNum: 13, weekday: '周二', meetingCount: 0, tasks: [] },
      {
        key: 'd-1014',
        month: 10,
        dateNum: 14,
        weekday: '周三',
        meetingCount: 0,
        tasks: [{ id: 'c-1014-1', title: '与测试部对齐回归范围', status: '已完成', due: '10 月 14 日' }],
      },
      {
        key: 'd-1015',
        month: 10,
        dateNum: 15,
        weekday: '周四',
        meetingCount: 1,
        meetingTime: '10:30',
        meetingTitle: '用户反馈复盘会',
        tasks: [
          { id: 'c-1015-1', title: '整理用户反馈并归档到需求池', status: '已完成', due: '10 月 15 日' },
          { id: 'c-1015-2', title: '输出反馈优先级建议', status: '进行中', due: '10 月 16 日' },
        ],
      },
      { key: 'd-1016', month: 10, dateNum: 16, weekday: '周五', meetingCount: 0, tasks: [] },
      { key: 'd-1017', month: 10, dateNum: 17, weekday: '周六', meetingCount: 0, tasks: [] },
      { key: 'd-1018', month: 10, dateNum: 18, weekday: '周日', meetingCount: 0, tasks: [] },
    ],
  },
  {
    key: 'w-1019',
    days: [
      {
        key: 'd-1019',
        month: 10,
        dateNum: 19,
        weekday: '周一',
        meetingCount: 0,
        tasks: [{ id: 'c-1019-1', title: '收集团队 11 月上线相关议题', status: '已完成', due: '10 月 19 日' }],
      },
      { key: 'd-1020', month: 10, dateNum: 20, weekday: '周二', meetingCount: 0, tasks: [] },
      {
        key: 'd-1021',
        month: 10,
        dateNum: 21,
        weekday: '周三',
        meetingCount: 1,
        meetingTime: '15:00',
        meetingTitle: '11 月上线预沟通',
        tasks: [{ id: 'c-1021-1', title: '确认会议参与人与时间', status: '已完成', due: '10 月 21 日' }],
      },
      { key: 'd-1022', month: 10, dateNum: 22, weekday: '周四', meetingCount: 0, tasks: [] },
      {
        key: 'd-1023',
        month: 10,
        dateNum: 23,
        weekday: '周五',
        meetingCount: 0,
        tasks: [
          { id: 'c-1023-1', title: '准备上线协调会的背景材料', status: '进行中', due: '10 月 23 日' },
          { id: 'c-1023-2', title: '收集各部门时间约束', status: '待开始', due: '10 月 24 日' },
        ],
      },
      { key: 'd-1024', month: 10, dateNum: 24, weekday: '周六', meetingCount: 0, tasks: [] },
      {
        key: 'd-1025',
        month: 10,
        dateNum: 25,
        weekday: '周日',
        meetingCount: 0,
        tasks: [{ id: 'c-1025-1', title: '确认会议室与线上会议链接', status: '已完成', due: '10 月 25 日' }],
      },
    ],
  },
  {
    key: 'w-1026',
    days: [
      {
        key: 'd-1026',
        month: 10,
        dateNum: 26,
        weekday: '周一',
        meetingCount: 0,
        tasks: [
          { id: 'c-1026-1', title: '确认上线范围与优先级排序', status: '已完成', due: '10 月 26 日' },
          { id: 'c-1026-2', title: '整理 11 月发布节奏初稿', status: '已完成', due: '10 月 26 日' },
        ],
      },
      {
        key: 'd-1027',
        month: 10,
        dateNum: 27,
        weekday: '周二',
        meetingCount: 1,
        meetingTime: '10:30',
        meetingTitle: '主流程评审会',
        tasks: [{ id: 'c-1027-1', title: '提交主流程验收清单', status: '已完成', due: '10 月 27 日' }],
      },
      {
        key: 'd-1028',
        month: 10,
        dateNum: 28,
        weekday: '周三',
        meetingCount: 0,
        tasks: [
          { id: 'c-1028-1', title: '与技术部确认联调前置条件', status: '已完成', due: '10 月 28 日' },
          { id: 'c-1028-2', title: '补充增值功能延后说明', status: '待开始', due: '10 月 29 日' },
        ],
      },
      {
        key: 'd-1029',
        month: 10,
        dateNum: 29,
        weekday: '周四',
        meetingCount: 1,
        meetingTime: '16:00',
        meetingTitle: '技术节奏同步会',
        tasks: [{ id: 'c-1029-1', title: '核对灰度名单口径', status: '待开始', due: '10 月 30 日' }],
      },
      {
        key: 'd-1030',
        month: 10,
        dateNum: 30,
        weekday: '周五',
        meetingCount: 0,
        tasks: [
          { id: 'c-1030-1', title: '输出宣传物料需求清单', status: '进行中', due: '10 月 31 日' },
          { id: 'c-1030-2', title: '同步测试环境准备情况', status: '待开始', due: '11 月 2 日' },
        ],
      },
      {
        key: 'd-1031',
        month: 10,
        dateNum: 31,
        weekday: '周六',
        isToday: true,
        meetingCount: 0,
        tasks: [
          { id: 'c-1031-1', title: '完成 API 联调并输出 SLA 结论', status: '进行中', due: '11 月 3 日' },
          { id: 'c-1031-2', title: '完成回归测试并提交测试报告', status: '进行中', due: '11 月 4 日' },
          { id: 'c-1031-3', title: '确认市场宣传材料（含发布日期）', status: '待开始', due: '11 月 4 日' },
          { id: 'c-1031-4', title: '确认 11 月 5 日灰度名单', status: '待开始', due: '11 月 5 日' },
          { id: 'c-1031-5', title: '把上线范围说明同步到内部文档', status: '已完成', due: '10 月 31 日' },
        ],
      },
      {
        key: 'd-1101',
        month: 11,
        dateNum: 1,
        weekday: '周日',
        meetingCount: 0,
        tasks: [{ id: 'c-1101-1', title: '整理 11 月对外排期表', status: '待开始', due: '11 月 1 日' }],
      },
    ],
  },
  {
    key: 'w-1102',
    days: [
      {
        key: 'd-1102',
        month: 11,
        dateNum: 2,
        weekday: '周一',
        meetingCount: 0,
        tasks: [
          { id: 'c-1102-1', title: '收到 SLA 结论并归档到物料说明', status: '待开始', due: '11 月 2 日' },
          { id: 'c-1102-2', title: '确认物料文案初稿', status: '待开始', due: '11 月 3 日' },
        ],
      },
      {
        key: 'd-1103',
        month: 11,
        dateNum: 3,
        weekday: '周二',
        meetingCount: 1,
        meetingTime: '14:00',
        meetingTitle: '联调收尾确认会',
        tasks: [{ id: 'c-1103-1', title: 'API 联调收尾确认', status: '待开始', due: '11 月 3 日' }],
      },
      {
        key: 'd-1104',
        month: 11,
        dateNum: 4,
        weekday: '周三',
        meetingCount: 0,
        tasks: [
          { id: 'c-1104-1', title: '宣传物料定稿并交付发布', status: '待开始', due: '11 月 4 日' },
          { id: 'c-1104-2', title: '确认回归测试报告已完成', status: '待开始', due: '11 月 4 日' },
        ],
      },
      {
        key: 'd-1105',
        month: 11,
        dateNum: 5,
        weekday: '周四',
        meetingCount: 0,
        tasks: [{ id: 'c-1105-1', title: '灰度发布当天值班安排', status: '待开始', due: '11 月 5 日' }],
      },
      {
        key: 'd-1106',
        month: 11,
        dateNum: 6,
        weekday: '周五',
        meetingCount: 1,
        meetingTime: '10:00',
        meetingTitle: '对外发布复盘',
        tasks: [{ id: 'c-1106-1', title: '整理对外发布后的反馈', status: '待开始', due: '11 月 6 日' }],
      },
      { key: 'd-1107', month: 11, dateNum: 7, weekday: '周六', meetingCount: 0, tasks: [] },
      { key: 'd-1108', month: 11, dateNum: 8, weekday: '周日', meetingCount: 0, tasks: [] },
    ],
  },
];