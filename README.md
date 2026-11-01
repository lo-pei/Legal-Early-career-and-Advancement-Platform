# LEAP

**Legal Early-career and Advancement Platform** — 法学本科生 / 研究生的比赛、征文、求职信息与协作平台。

本仓库当前存放 **产品计划书** 与 **六屏高保真原型**（静态 HTML/CSS/JS，无构建步骤）。

```
.
├── LEAP 平台开发计划书.md     产品与技术计划书（含功能清单、里程碑、成本）
├── design/
│   ├── PRODUCT.md             为谁做、必须做到什么、明确的边界
│   ├── DESIGN.md              设计令牌、字体、栅格算术、组件规则、逐屏决策
│   ├── prototype/             六页原型
│   │   ├── index.html         今天：未来 14 天截止表
│   │   ├── competitions.html  机会：在架信息列表（表格 / 仅按日期 两种密度）
│   │   ├── competition.html   比赛详情：赛程轨道、组队、资料
│   │   ├── team.html          队伍空间：任务、成员、材料
│   │   ├── library.html       资料库：赛事 → 年份 → 类型 三级浏览
│   │   ├── school.html        学校端：按班级的提交率与审核队列
│   │   └── assets/            app.css · app.js · data.js
│   └── review/                1440 / 768 / 390 三档截图与设计方向存档
└── .workbuddy/memory/         设计与实现过程的决策日志
```

## 本地预览

原型是纯静态页面，直接打开即可；因涉及 `file://` 下的字体与脚本加载，建议起一个本地服务：

```bash
cd design/prototype
python -m http.server 8000
# 打开 http://localhost:8000/index.html
```

## 设计依据

界面不是凭个人偏好画的，方向与规则由脚本裁定：

- **[taste-skill](https://github.com/Leonxlnx/taste-skill)** — 用 `draw.mjs` 发牌得到风格方向 `achromatic-ledger`（seed 209491491）：界面骨架无色相，数字用墨色，唯一色相只落在主数据元素上。所有页面通过 `lint.mjs` 与 `inspect.mjs` 的浏览器实测（1440 / 768 / 390，共 18 次度量）。
- **[impeccable](https://github.com/pbakaus/impeccable)** — 用 `impeccable detect` 对渲染后的六页做反模式扫描，含对比度与小字规则。

两处对发牌结果的主动重绘及其理由写在 `design/DESIGN.md`。

## 数据说明

`design/prototype/assets/data.js` 中的机会、队伍、任务、班级、资料全部为示例数据，人名与机构名需替换或脱敏；截止日期以 `TODAY = 2026-11-01` 为基准。
