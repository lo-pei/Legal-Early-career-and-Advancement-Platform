/* LEAP sample data — 2026-11-01.
   Every figure the screens show is computed from these rows, never typed twice.
   Totals: console.assert at the foot of the file. */

const TODAY = new Date(2026, 10, 1); // 2026-11-01, matches the stamp on every screen

const OPPORTUNITIES = [
  { id: 'jessup27', kind: 'competition', title: '第二十四届 Jessup 国际法模拟法庭辩论赛 · 中国选拔赛',
    org: '中国国际法学会', audience: '本科生 / 法学硕士', grade: '大二及以上',
    deadline: '2026-11-08', start: '2027-02-27', end: '2027-03-08', mode: '线上初赛 + 线下正赛',
    region: '北京', fee: 600, award: '一等奖 1 队，二等奖 3 队，最佳书状、最佳辩手各 1 名',
    source: '中国国际法学会官网', updated: '2026-10-30 17:20', mine: false, saved: true,
    tags: ['国际公法', '英文', '团队 5 人'] },
  { id: 'cietac13', kind: 'competition', title: '第十三届“贸仲杯”国际商事仲裁模拟仲裁庭辩论赛',
    org: '中国国际经济贸易仲裁委员会', audience: '法学本科 / 研究生', grade: '不限年级',
    deadline: '2026-11-05', start: '2026-11-28', end: '2026-12-04', mode: '线下',
    region: '北京', fee: 0, award: '冠亚军各 1 队，最佳辩手 3 名',
    source: '贸仲委官网', updated: '2026-10-28 09:05', mine: true, saved: true,
    tags: ['国际商法', '英文', '团队 4 人'] },
  { id: 'icc27', kind: 'competition', title: '2027 年国际刑事法院模拟法庭竞赛（中文赛）',
    org: '中国政法大学国际法学院', audience: '法学本科 / 研究生', grade: '大二及以上',
    deadline: '2026-11-20', start: '2027-03-20', end: '2027-03-22', mode: '线下',
    region: '北京', fee: 300, award: '前 8 强进入决赛轮',
    source: 'ICC Moot 中国赛区组委会', updated: '2026-10-26 14:11', mine: false, saved: false,
    tags: ['国际刑法', '中文', '团队 5 人'] },
  { id: 'writing26', kind: 'academic', title: '2026 全国法科学生写作大赛（论文类）',
    org: '全国法科学生写作大赛组委会', audience: '法学本科生', grade: '在读本科',
    deadline: '2026-11-30', start: '2026-12-15', end: '2026-12-15', mode: '线上投稿',
    region: '全国', fee: 0, award: '一等奖 10 篇，二等奖 30 篇，结集出版',
    source: '大赛公告（2026 年第 2 号）', updated: '2026-10-22 10:30', mine: false, saved: true,
    tags: ['论文', '中文', '个人'] },
  { id: 'legis26', kind: 'competition', title: '第四届“中伦杯”模拟立法大赛',
    org: '中伦律师事务所 / 华东政法大学', audience: '法学本科 / 研究生', grade: '不限年级',
    deadline: '2026-12-10', start: '2027-01-09', end: '2027-01-10', mode: '线下',
    region: '上海', fee: 200, award: '一等奖 1 队，最佳立法说明 1 份',
    source: '华东政法大学教务处', updated: '2026-10-19 16:40', mine: false, saved: false,
    tags: ['立法学', '中文', '团队 3 人'] },
  { id: 'viseast27', kind: 'competition', title: 'Vis East Moot 2027 中国赛区预选赛',
    org: 'Vis East Moot Foundation', audience: '法学本科 / 研究生', grade: '不限年级',
    deadline: '2026-12-01', start: '2027-03-15', end: '2027-03-21', mode: '线下（香港）',
    region: '中国香港', fee: 1200, award: '优胜队获维也纳正赛资格',
    source: 'Vis East 官方邮件列表', updated: '2026-10-25 11:02', mine: false, saved: false,
    tags: ['国际仲裁', '英文', '团队 4 人'] },
  { id: 'kwdxt', kind: 'competition', title: '中国政法大学第十六届“学术十星”论文大赛',
    org: '中国政法大学团委', audience: '本校本科生', grade: '大二及以上',
    deadline: '2026-11-15', start: '2026-12-06', end: '2026-12-06', mode: '校内',
    region: '北京', fee: 0, award: '十星各 1 名，奖金 3000 元',
    source: '校团委通知（10 月 18 日）', updated: '2026-10-18 15:00', mine: true, saved: false,
    tags: ['论文', '中文', '个人'] },
  { id: 'legalforum10', kind: 'academic', title: '第十届“长三角”法学研究生论坛 · 数字法治专题',
    org: '长三角法学研究生论坛理事会', audience: '法学研究生', grade: '在读硕士 / 博士',
    deadline: '2026-11-25', start: '2026-12-19', end: '2026-12-20', mode: '线下',
    region: '南京', fee: 0, award: '优秀论文 12 篇，推荐至合作期刊',
    source: '论坛征稿启事', updated: '2026-10-24 09:20', mine: false, saved: false,
    tags: ['数字法治', '中文', '个人'] },
  { id: 'clscience', kind: 'academic', title: '《法律科学》“数据合规”专题征稿',
    org: '《法律科学》编辑部', audience: '高校教师 / 博士生 / 优秀硕士生', grade: '不限',
    deadline: '2027-02-28', start: '2027-05-01', end: '2027-05-01', mode: '线上投稿',
    region: '全国', fee: 0, award: '录用后刊于 2027 年第 4 期',
    source: '期刊官网征稿启事', updated: '2026-10-20 13:00', mine: false, saved: false,
    tags: ['数据合规', '中文', '个人'] },
  { id: 'kwdr', kind: 'job', title: '金杜律师事务所 2027 年暑期实习 · 争议解决组',
    org: '北京市金杜律师事务所', audience: '法学本科三年级 / 法学硕士二年级', grade: '2028 届',
    deadline: '2026-11-10', start: '2027-07-01', end: '2027-08-31', mode: '线下',
    region: '北京', fee: 0, award: '实习津贴 200 元/日，表现优异可转正', pay: '200 元/日',
    source: '金杜招聘官网', updated: '2026-10-29 18:00', mine: false, saved: true,
    tags: ['律所', '争议解决', '可留用'] },
  { id: 'zlhg', kind: 'job', title: '中伦律师事务所 合规与政府监管组 实习生',
    org: '北京市中伦律师事务所', audience: '法学硕士一年级及以上', grade: '2027 / 2028 届',
    deadline: '2026-11-18', start: '2026-12-01', end: '2027-03-31', mode: '线下',
    region: '北京', fee: 0, award: '150 元/日，每周到岗 3 天', pay: '150 元/日',
    source: '中伦招聘公众号', updated: '2026-10-27 10:15', mine: false, saved: false,
    tags: ['律所', '合规', '可留用'] },
  { id: 'platcompliance', kind: 'job', title: '某互联网平台 数据合规法务实习生',
    org: '某互联网平台（规模 5000 人以上）', audience: '法学本科 / 硕士', grade: '不限',
    deadline: '2026-11-22', start: '2026-12-08', end: '2027-06-30', mode: '线下',
    region: '杭州', fee: 0, award: '180 元/日，提供住宿补贴', pay: '180 元/日',
    source: '企业校招官网', updated: '2026-10-30 09:40', mine: false, saved: false,
    tags: ['企业法务', '数据合规', '可留用'] },
  { id: 'shiac', kind: 'job', title: '上海国际仲裁中心 案件管理部 实习助理',
    org: '上海国际经济贸易仲裁委员会', audience: '法学研究生', grade: '研二及以上',
    deadline: '2026-12-05', start: '2027-01-05', end: '2027-04-30', mode: '线下',
    region: '上海', fee: 0, award: '120 元/日', pay: '120 元/日',
    source: '机构官网招聘栏', updated: '2026-10-23 14:50', mine: false, saved: false,
    tags: ['仲裁机构', '英文', '不留用'] }
];

const TEAMS = [
  { id: 'hengping', name: '「衡平」队', opp: 'jessup27', school: '中国政法大学', captain: '陈亦然',
    members: 4, limit: 5, need: '书状写作（英文）', track: 'Applicant / Part B',
    closed: false, myRole: '队长', nextDue: '2026-11-04', apps: 2,
    about: '连续三年进入中国选拔赛口头轮，2026 年获二等奖。今年补一名英文书状写手，要求能读 ICJ 判例原文。' },
  { id: 'mingli', name: '「明理」队', opp: 'cietac13', school: '中国政法大学', captain: '周予安',
    members: 4, limit: 4, need: '', track: 'Respondent',
    closed: true, myRole: '队员', nextDue: '2026-11-03',
    about: '本届贸仲杯参赛队，四人已满。' },
  { id: 'legis2', name: '立法二组', opp: 'legis26', school: '华东政法大学（跨校）', captain: '林知远',
    members: 2, limit: 3, need: '立法说明撰写', track: '《人工智能服务管理条例》建议稿',
    closed: false, myRole: '队员', nextDue: '2026-11-12',
    about: '跨校组队，已有华东政法、中国政法各 1 人。' }
];

/* Jessup 招募中的队伍：报名页与详情页共用 */
const RECRUITING = [
  { name: '「衡平」队', school: '中国政法大学', have: 4, limit: 5, need: '书状写作（英文）', cross: false, mine: true },
  { name: '「万国」队', school: '北京大学', have: 5, limit: 5, need: '已满员', cross: false, mine: false },
  { name: '「未名」队', school: '中国人民大学', have: 4, limit: 5, need: '研究员 1 名', cross: true, mine: false },
  { name: 'Lex Anglia', school: '华东政法大学', have: 3, limit: 5, need: '研究员 2 名', cross: true, mine: false }
];

const TASKS = [
  { id: 't1', team: 'hengping', title: '反方书状 Part B 初稿', owner: '陈亦然', due: '2026-11-04', status: 'doing', priority: '高', file: true },
  { id: 't2', team: 'hengping', title: 'ICJ 2005—2015 判例检索汇总', owner: '李昀', due: '2026-11-06', status: 'todo', priority: '中', file: false },
  { id: 't3', team: 'hengping', title: '口头陈述提纲 v1', owner: '周予安', due: '2026-11-08', status: 'review', priority: '中', file: true },
  { id: 't4', team: 'hengping', title: '报名表与队员信息核对', owner: '李昀', due: '2026-11-02', status: 'done', priority: '高', file: true },
  { id: 't5', team: 'hengping', title: '报名费缴纳凭证上传', owner: '林知远', due: '2026-10-30', status: 'overdue', priority: '高', file: false },
  { id: 't6', team: 'mingli', title: '仲裁条款争议焦点清单', owner: '李昀', due: '2026-11-03', status: 'doing', priority: '高', file: false },
  { id: 't7', team: 'legis2', title: '条例建议稿第 2、3 章', owner: '李昀', due: '2026-11-12', status: 'todo', priority: '中', file: false }
];

const MEMBERS = [
  { name: '陈亦然', initial: '陈', tint: 'a1', role: '队长 · 辩手', tasks: 1 },
  { name: '李昀', initial: '李', tint: 'a2', role: '研究员 · 检索', tasks: 2 },
  { name: '周予安', initial: '周', tint: 'a3', role: '副队长 · 辩手', tasks: 1 },
  { name: '林知远', initial: '林', tint: 'a4', role: '书状 · 排版', tasks: 1 }
];

const RESOURCES = [
  { title: '2027 年 Jessup 赛题（Compromis）', type: '赛题', year: 2027, source: 'ILSA 官方发布', note: '官方公开，原文 PDF', ok: true },
  { title: 'Jessup 书状规则与格式手册（第 12 版）', type: '规则', year: 2026, source: 'ILSA 官方发布', note: '官方公开', ok: true },
  { title: '2026 年中国选拔赛二等奖书状（Applicant）', type: '书状', year: 2026, source: '「衡平」队授权', note: '队伍授权公开', ok: true },
  { title: '口头轮法官提问高频清单（整理）', type: '经验帖', year: 2026, source: '站内用户投稿', note: '待审核', ok: false },
  { title: '书状引用格式检查表（模板）', type: '模板', year: 2026, source: '站内用户投稿', note: '待审核', ok: false }
];

/* ---------- 资料库 ----------
   三级路径：赛事 → 年份 → 类型。赛道（中／英）不进路径：除 ICC 分中英两赛外，
   其余赛事只有一个语言值，做一级会让用户点进去发现选项没有变窄。语言放在行内副行里。 */
const MOOTS = [
  { id: 'jessup', name: 'Jessup 国际法模拟法庭', short: 'Jessup' },
  { id: 'cietac', name: '贸仲杯国际商事仲裁模拟仲裁庭', short: '贸仲杯' },
  { id: 'viseast', name: 'Vis East Moot', short: 'Vis East' },
  { id: 'icc', name: 'ICC 模拟法庭竞赛', short: 'ICC' },
  { id: 'zhonglun', name: '中伦杯模拟立法大赛', short: '中伦杯' }
];

const TYPES = [
  { id: 'prompt', name: '赛题' },
  { id: 'rule', name: '规则' },
  { id: 'work', name: '成果' },
  { id: 'tpl', name: '模板' },
  { id: 'note', name: '经验帖' }
];

const LIBRARY = [
  { moot: 'jessup', year: 2027, type: 'prompt', title: '2027 年 Jessup 赛题（Compromis）', format: 'PDF', lang: '英', pages: 41,
    rights: 'public', src: 'ILSA 官方发布', updated: '2026.10.28' },
  { moot: 'jessup', year: 2027, type: 'rule', title: '书状规则与格式手册（第 12 版）', format: 'PDF', lang: '英', pages: 28,
    rights: 'public', src: 'ILSA 官方发布', updated: '2026.10.28' },
  { moot: 'jessup', year: 2027, type: 'rule', title: '口头轮评分表与法官提问范围', format: 'PDF', lang: '英', pages: 4,
    rights: 'public', src: '中国选拔赛组委会', updated: '2026.10.26' },
  { moot: 'jessup', year: 2026, type: 'work', title: '中国选拔赛二等奖书状（Applicant）', format: 'PDF', lang: '英', pages: 34,
    rights: 'team', src: '「衡平」队授权', updated: '2026.10.12' },
  { moot: 'jessup', year: 2026, type: 'work', title: '决赛书状（Respondent）', format: 'PDF', lang: '英', pages: 38,
    rights: 'index', src: '仅登记题录，未取得授权', updated: '2026.09.30' },
  { moot: 'jessup', year: 2026, type: 'note', title: '口头轮法官提问高频清单（站内整理）', format: 'DOCX', lang: '中', pages: 6,
    rights: 'pending', src: '站内用户投稿', updated: '2026.10.24' },
  { moot: 'jessup', year: 2025, type: 'prompt', title: '2025 年 Jessup 赛题（Compromis）', format: 'PDF', lang: '英', pages: 39,
    rights: 'public', src: 'ILSA 官方发布', updated: '2025.08.15' },
  { moot: 'jessup', year: 2025, type: 'work', title: '全国一等奖书状（Respondent）', format: 'PDF', lang: '英', pages: 36,
    rights: 'team', src: '华东政法大学代表队授权', updated: '2025.06.20' },

  { moot: 'cietac', year: 2026, type: 'prompt', title: '第十三届贸仲杯赛题与程序令', format: 'PDF', lang: '英', pages: 22,
    rights: 'public', src: '贸仲委官网', updated: '2026.10.20' },
  { moot: 'cietac', year: 2026, type: 'rule', title: '参赛手册与仲裁规则适用说明', format: 'PDF', lang: '英', pages: 18,
    rights: 'public', src: '贸仲委官网', updated: '2026.10.18' },
  { moot: 'cietac', year: 2025, type: 'work', title: '冠军队书状（Claimant / Respondent 合订）', format: 'PDF', lang: '英', pages: 31,
    rights: 'team', src: '对外经济贸易大学代表队授权', updated: '2025.12.18' },
  { moot: 'cietac', year: 2025, type: 'note', title: '争议焦点梳理：仲裁条款效力与管辖', format: 'DOCX', lang: '中', pages: 6,
    rights: 'pending', src: '站内用户投稿', updated: '2026.10.21' },

  { moot: 'viseast', year: 2027, type: 'prompt', title: 'Vis East 2027 赛题（Problem）', format: 'PDF', lang: '英', pages: 40,
    rights: 'public', src: 'Vis East 官方邮件列表', updated: '2026.10.25' },
  { moot: 'viseast', year: 2027, type: 'rule', title: '报名、签证与差旅须知', format: '链接', lang: '英', pages: 0,
    rights: 'public', src: 'Vis East 官网', updated: '2026.10.25' },
  { moot: 'viseast', year: 2026, type: 'note', title: '参赛复盘：从 16 强到 8 强做了什么', format: '链接', lang: '中', pages: 0,
    rights: 'team', src: '站内作者授权转载', updated: '2026.04.12' },

  { moot: 'icc', year: 2026, type: 'prompt', title: 'ICC 中文赛赛题与附件', format: 'PDF', lang: '中', pages: 26,
    rights: 'public', src: 'ICC Moot 中国赛区组委会', updated: '2026.10.23' },
  { moot: 'icc', year: 2026, type: 'rule', title: '程序与证据规则（中文赛版）', format: 'PDF', lang: '中', pages: 20,
    rights: 'public', src: 'ICC Moot 中国赛区组委会', updated: '2026.10.23' },
  { moot: 'icc', year: 2025, type: 'tpl', title: '书状模板（中文，含引注格式）', format: 'DOCX', lang: '中', pages: 12,
    rights: 'public', src: '组委会公开模板 + 站内排版', updated: '2025.11.20' },

  { moot: 'zhonglun', year: 2026, type: 'tpl', title: '立法建议稿模板与说明体例', format: 'DOCX', lang: '中', pages: 9,
    rights: 'public', src: '华东政法大学教务处', updated: '2026.10.19' },
  { moot: 'zhonglun', year: 2026, type: 'rule', title: '评审标准与答辩流程', format: 'PDF', lang: '中', pages: 7,
    rights: 'public', src: '华东政法大学教务处', updated: '2026.10.19' },
  { moot: 'zhonglun', year: 2025, type: 'work', title: '一等奖建议稿：《生成式人工智能服务管理条例》', format: 'PDF', lang: '中', pages: 24,
    rights: 'team', src: '作者授权公开', updated: '2025.12.22' }
];

/* 授权状态是资料库的第一等字段：能看什么、能不能下载，由它决定 */
const RIGHTS = {
  public: ['官方公开', 'pill pos'],
  team: ['队伍授权', 'pill'],
  index: ['仅索引', 'pill line'],
  pending: ['待审核', 'pill warn']
};

/* 学校端：2026 秋季 · 法学 2023 级集中实习 */
const CLASSES = [
  { name: '法学 2301', due: 36, submitted: 33, passed: 28, pending: 3, returned: 2 },
  { name: '法学 2302', due: 34, submitted: 31, passed: 26, pending: 3, returned: 2 },
  { name: '法学 2303', due: 35, submitted: 24, passed: 18, pending: 4, returned: 2 },
  { name: '法学 2304', due: 33, submitted: 29, passed: 24, pending: 4, returned: 1 },
  { name: '知产 2301', due: 30, submitted: 25, passed: 20, pending: 4, returned: 1 }
];

const REQUIREMENTS = [
  { name: '实习接收函', required: true, due: '2026-09-20', got: 168, total: 168, needsSign: true },
  { name: '实习证明（单位盖章）', required: true, due: '2026-12-31', got: 142, total: 168, needsSign: true },
  { name: '实习周记（4 篇）', required: true, due: '2026-12-31', got: 131, total: 168, needsSign: false },
  { name: '实习鉴定表', required: true, due: '2026-12-31', got: 128, total: 168, needsSign: true },
  { name: '保险信息登记', required: false, due: '2026-09-30', got: 160, total: 168, needsSign: false }
];

const REVIEW_QUEUE = [
  { student: '王沐晴', sid: '2023010412', cls: '法学 2301', item: '实习证明（单位盖章）', at: '11-01 09:12', state: 'pending' },
  { student: '赵斯远', sid: '2023010733', cls: '法学 2303', item: '实习鉴定表', at: '11-01 08:47', state: 'pending' },
  { student: '孙昀', sid: '2023010905', cls: '知产 2301', item: '实习周记（4 篇）', at: '10-31 21:30', state: 'returned' },
  { student: '陈嘉禾', sid: '2023010219', cls: '法学 2302', item: '实习证明（单位盖章）', at: '10-31 17:05', state: 'pending' }
];

/* ---------- derived ---------- */
const DAY = 86400000;
const daysLeft = (iso) => Math.round((new Date(iso + 'T00:00:00') - TODAY) / DAY);
const pad = (n) => String(n).padStart(2, '0');
const fmtDate = (iso) => { const d = new Date(iso + 'T00:00:00'); return `${pad(d.getMonth() + 1)}.${pad(d.getDate())}`; };
const fmtCN = (iso) => { const d = new Date(iso + 'T00:00:00'); return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`; };
const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const fmtWeek = (iso) => WEEK[new Date(iso + 'T00:00:00').getDay()];

const TOTAL = CLASSES.reduce((a, c) => ({
  due: a.due + c.due, submitted: a.submitted + c.submitted, passed: a.passed + c.passed,
  pending: a.pending + c.pending, returned: a.returned + c.returned
}), { due: 0, submitted: 0, passed: 0, pending: 0, returned: 0 });

const OPEN_TASKS = TASKS.filter(t => t.team === 'hengping' && t.status !== 'done');
const DUE_SOON = OPPORTUNITIES.filter(o => daysLeft(o.deadline) >= 0 && daysLeft(o.deadline) <= 14)
  .sort((a, b) => a.deadline.localeCompare(b.deadline));

/* the data must agree with itself */
console.assert(TOTAL.submitted === CLASSES.reduce((a, c) => a + c.passed + c.pending + c.returned, 0), '提交 = 通过 + 待审 + 打回');
console.assert(TOTAL.due === CLASSES.reduce((a, c) => a + c.submitted + (c.due - c.submitted), 0), '应交 = 已提交 + 未交');
console.assert(TEAMS.every(t => t.members <= t.limit), '队伍人数不超过上限');
console.assert(DUE_SOON.every(o => daysLeft(o.deadline) <= 14), '14 天内截止');
console.assert(LIBRARY.every(r => MOOTS.some(m => m.id === r.moot)), '每份资料都挂在已知赛事下');
console.assert(LIBRARY.every(r => TYPES.some(t => t.id === r.type)), '每份资料都有已知类型');
console.assert(LIBRARY.every(r => RIGHTS[r.rights]), '每份资料都有授权状态');
console.assert(LIBRARY.every(r => r.rights !== 'pending' || r.src.includes('投稿')), '待审核的都是投稿');
console.assert(new Set(LIBRARY.map(r => r.moot + r.year + r.type + r.title)).size === LIBRARY.length, '资料不重复');
