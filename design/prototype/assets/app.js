/* LEAP prototype behaviour: navigation fold, filters, data-driven rows.
   Motion is feedback only — no entrance animation on an app screen. */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------- phone menu ---------- */
const sidebar = $('.sidebar');
const menuBtn = $('#menu');
if (menuBtn && sidebar) {
  menuBtn.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    let scrim = $('.scrim');
    if (open && !scrim) {
      scrim = document.createElement('div');
      scrim.className = 'scrim';
      scrim.addEventListener('click', () => { sidebar.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); scrim.remove(); });
      document.body.appendChild(scrim);
    } else if (!open && scrim) scrim.remove();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sidebar.classList.contains('open')) menuBtn.click(); });
}

/* ---------- shared marks ---------- */
const KIND_LABEL = { competition: '比赛', academic: '征文', job: '求职' };

function ruler(o) {
  const d = daysLeft(o.deadline);
  const pct = d > 14 ? 0 : Math.max(0, Math.min(100, Math.round((d / 14) * 100)));
  const cls = d < 0 ? 'over' : d <= 7 ? 'closing' : '';
  const text = d < 0 ? `已截止 ${Math.abs(d)} 天` : `${d} 天`;
  const num = d < 0 ? `<span class="n">−${Math.abs(d)}</span><span class="u">天前截止</span>` : `<span class="n">${d}</span><span class="u">天</span>`;
  return `<span class="ruler ${cls}" style="--w:${pct}%"><i style="width:${d < 0 ? 100 : pct}%"></i></span>
          <span class="due ${cls}" title="${text}">${num}</span>`;
}

function priceCell(o) {
  if (o.kind === 'job') return `<span class="small"><span class="num">${o.pay}</span></span>`;
  return o.fee === 0 ? '<span class="muted small">免费</span>' : `<span class="small"><span class="num">¥${o.fee}</span></span>`;
}

function statusOf(o) {
  const d = daysLeft(o.deadline);
  if (d < 0) return '<span class="pill line">已截止</span>';
  if (d <= 7) return '<span class="pill warn">即将截止</span>';
  if (o.mine) return '<span class="pill pos">已加入</span>';
  return '<span class="pill">报名中</span>';
}

/* ---------- 首页 ---------- */
const dueBody = $('#due-body');
if (dueBody) {
  const rows = DUE_SOON.filter(o => o.mine || o.saved);
  $('#due-count').textContent = DUE_SOON.length;
  $('#mine-count').textContent = rows.length;
  $('#closing-7').textContent = DUE_SOON.filter(o => daysLeft(o.deadline) <= 7).length;

  dueBody.innerHTML = DUE_SOON.map(o => {
    const d = daysLeft(o.deadline);
    const mine = o.mine || o.saved;
    return `<tr${mine ? ' class="is-mine"' : ''}>
      <td data-l="截止" style="width:74px"><span class="mono small">${fmtDate(o.deadline)}</span></td>
      <td data-l="类型"><span class="pill line">${KIND_LABEL[o.kind]}</span></td>
      <td data-l=""><a class="link" href="competition.html">${o.title}</a><span class="sub">${o.org} · ${o.audience}</span></td>
      <td data-l="费用" class="n" style="width:132px">${priceCell(o)}</td>
      <td data-l="剩余" class="n" style="width:170px"><div style="display:flex;align-items:center;gap:10px;justify-content:flex-end">${ruler(o)}</div></td>
      <td data-l="状态" class="n" style="width:96px">${statusOf(o)}</td>
    </tr>`;
  }).join('');
}

const teamRows = $('#team-rows');
if (teamRows) {
  teamRows.innerHTML = TEAMS.map(t => {
    const open = TASKS.filter(k => k.team === t.id && k.status !== 'done').length;
    const d = daysLeft(t.nextDue);
    return `<div class="row">
      <div class="grow">
        <div class="title">${t.name} <span class="muted small" style="font-weight:400">· ${t.myRole}</span></div>
        <div class="line2">${OPPORTUNITIES.find(o => o.id === t.opp).title.split('·')[0].trim()} · ${open > 0 ? `${open} 项待办` : '无待办'}</div>
      </div>
      <span class="due ${d <= 7 ? 'closing' : ''}"><span class="n">${fmtDate(t.nextDue)}</span></span>
    </div>`;
  }).join('') + `<div class="row">
      <div class="grow">
        <div class="title">${TEAMS.reduce((n, t) => n + (t.apps || 0), 0)} 份入队申请待审核</div>
        <div class="line2">${TEAMS[0].name} · 缺${TEAMS[0].need}</div>
      </div>
      <a class="card-link" href="team.html">去审核</a>
    </div>`;
}

const newRows = $('#new-rows');
if (newRows) {
  const fresh = OPPORTUNITIES.filter(o => !o.mine).slice(0, 4);
  const newMeta = $('#new-meta');
  if (newMeta) newMeta.textContent = `最近更新 ${fresh.length} 条`;
  newRows.innerHTML = fresh.map(o => `<div class="row">
      <div class="grow">
        <div class="title"><a class="link" href="competition.html" style="text-decoration-color:transparent">${o.title}</a></div>
        <div class="line2">${KIND_LABEL[o.kind]} · ${o.org} · 截止 ${fmtDate(o.deadline)}</div>
      </div>
      <span class="time">${o.updated.slice(5, 10)}</span>
    </div>`).join('');
}

/* ---------- 机会列表 ---------- */
const oppBody = $('#opp-body');
if (oppBody) {
  const kinds = ['all', 'competition', 'academic', 'job'];
  $$('[data-kind-count]').forEach(el => {
    const k = el.dataset.kindCount;
    el.textContent = k === 'all' ? OPPORTUNITIES.length : OPPORTUNITIES.filter(o => o.kind === k).length;
  });

  const state = { kind: new URLSearchParams(location.search).get('kind') || 'all', near: false, view: 'detail' };
  if (!kinds.includes(state.kind)) state.kind = 'all';
  $$('[data-kind]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.kind === state.kind)));

  const table = $('#opp-table');
  const dateList = $('#opp-date');

  const row = o => `<tr${o.mine ? ' class="is-mine"' : ''}>
      <td data-l=""><a class="link" href="competition.html">${o.title}</a><span class="sub">${KIND_LABEL[o.kind]} · ${o.grade} · 来源：${o.source}</span></td>
      <td data-l="主办" class="muted">${o.org}</td>
      <td data-l="截止" class="n"><span class="mono small">${fmtDate(o.deadline)}</span></td>
      <td data-l="剩余" class="n" style="width:168px"><div style="display:flex;align-items:center;gap:10px;justify-content:flex-end">${ruler(o)}</div></td>
      <td data-l="费用" class="n" style="width:110px">${priceCell(o)}</td>
      <td data-l="状态" class="n" style="width:96px">${statusOf(o)}</td>
    </tr>`;

  /* 按日期看：日期从一列升为分组标题，行内不再重复日期与剩余天数 */
  /* 按日期看：日期与剩余天数移到左侧刻度轨，一组只说一次；右侧每项一行 */
  const byDate = rows => {
    const groups = [];
    rows.forEach(o => {
      const last = groups[groups.length - 1];
      if (last && last.date === o.deadline) last.items.push(o);
      else groups.push({ date: o.deadline, items: [o] });
    });
    return groups.map(g => {
      const d = daysLeft(g.date);
      const cls = d < 0 ? 'over' : d <= 7 ? 'closing' : '';
      const rel = d < 0
        ? `<span class="due over"><span class="n">−${Math.abs(d)}</span><span class="u">天前截止</span></span>`
        : `<span class="due ${cls}"><span class="n">${d}</span><span class="u">天后</span></span>`;
      return `<li class="date-group">
        <div class="rail">
          <span class="d">${fmtDate(g.date)}</span>
          <span class="w">${fmtWeek(g.date)}</span>
        </div>
        <ul class="date-rows">${g.items.map(o => `<li${o.mine ? ' class="is-mine"' : ''}>
          <a class="link t" href="competition.html">${o.title}</a>
          <span class="o">${o.org}</span>
        </li>`).join('')}</ul>
        ${rel}
      </li>`;
    }).join('');
  };

  const render = () => {
    const rows = OPPORTUNITIES
      .filter(o => (state.kind === 'all' || o.kind === state.kind) &&
        (!state.near || (daysLeft(o.deadline) >= 0 && daysLeft(o.deadline) <= 14)))
      .sort((a, b) => a.deadline.localeCompare(b.deadline));

    $('#opp-total').textContent = OPPORTUNITIES.length;
    oppBody.innerHTML = rows.map(row).join('');
    dateList.innerHTML = byDate(rows);
    table.hidden = state.view !== 'detail';
    dateList.hidden = state.view !== 'date';
    $('#opp-empty').hidden = rows.length > 0;
  };

  $$('[data-kind]').forEach(btn => btn.addEventListener('click', () => {
    state.kind = btn.dataset.kind;
    $$('[data-kind]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    render();
  }));
  $$('[data-view]').forEach(btn => btn.addEventListener('click', () => {
    state.view = btn.dataset.view;
    $$('[data-view]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    render();
  }));
  const near = $('#near');
  if (near) near.addEventListener('click', () => {
    state.near = !state.near;
    near.setAttribute('aria-pressed', String(state.near));
    render();
  });
  render();
}

/* ---------- 资料库：赛事 → 年份 → 类型 ---------- */
const resBody = $('#res-body');
if (resBody) {
  const state = { moot: 'all', year: 'all', type: 'all' };
  const YEARS = ['2027', '2026', '2025'];
  const nameOf = (list, id) => (list.find(x => x.id === id) || {}).name || '';

  /* 每一级的分母是“另外两级已选”的结果，所以点数就是点进去能看到的份数 */
  const passes = (r, skip) =>
    (skip === 'moot' || state.moot === 'all' || r.moot === state.moot) &&
    (skip === 'year' || state.year === 'all' || String(r.year) === state.year) &&
    (skip === 'type' || state.type === 'all' || r.type === state.type);

  const countOf = (key, val) => LIBRARY.filter(r => passes(r, key) &&
    (val === 'all' || String(r[key]) === String(val))).length;

  const facet = (key, options) => options.map(([val, label]) => {
    const n = countOf(key, val);
    const cur = state[key] === val;
    return `<li><button type="button" data-facet="${key}" data-val="${val}"
      aria-current="${cur}"${n === 0 && !cur ? ' aria-disabled="true"' : ''}>
      <span class="name">${label}</span><span class="c">${n}</span></button></li>`;
  }).join('');

  /* 路径常驻四段：未选的层级用浅色占位，读起来是“你在这一层的顶上”，而不是一个孤立的词 */
  const path = () => {
    const segs = [
      { key: null, label: '资料库', on: false },
      { key: 'moot', label: state.moot === 'all' ? '全部赛事' : nameOf(MOOTS, state.moot).split(' ')[0], on: state.moot !== 'all' },
      { key: 'year', label: state.year === 'all' ? '全部年份' : `${state.year} 年`, on: state.year !== 'all' },
      { key: 'type', label: state.type === 'all' ? '全部类型' : nameOf(TYPES, state.type), on: state.type !== 'all' }
    ];
    const deepest = segs.reduce((acc, s, i) => (s.on ? i : acc), 0);
    return segs.map((s, i) => {
      const sep = i ? '<span class="sep">›</span>' : '';
      if (i === deepest) return sep + `<span class="here">${s.label}</span>`;
      if (!s.on) return sep + `<span class="off">${s.label}</span>`;
      return sep + `<a href="#" data-up="${s.key}">${s.label}</a>`;
    }).join('');
  };

  const render = () => {
    $('#facet-moot').innerHTML = facet('moot', [['all', '全部赛事'], ...MOOTS.map(m => [m.id, m.short])]);
    $('#facet-year').innerHTML = facet('year', [['all', '全部年份'], ...YEARS.map(y => [y, `${y} 年`])]);
    $('#facet-type').innerHTML = facet('type', [['all', '全部类型'], ...TYPES.map(t => [t.id, t.name])]);
    $('#path').innerHTML = path();

    const rows = LIBRARY.filter(r => passes(r));
    rows.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title, 'zh'));
    $('#res-body').innerHTML = rows.map(r => `<tr>
      <td data-l=""><a class="link" href="#">${r.title}</a><span class="sub">${nameOf(TYPES, r.type)} · ${r.format}${r.pages ? ` · ${r.pages} 页` : ''} · ${r.lang === '英' ? '英文' : '中文'}</span></td>
      <td data-l="来源"><span class="muted small">${r.src}</span></td>
      <td data-l="授权"><span class="${RIGHTS[r.rights][1]}">${RIGHTS[r.rights][0]}</span></td>
      <td data-l="更新" class="n"><span class="mono small">${r.updated}</span></td>
      <td class="n" style="width:72px">${r.rights === 'public' || r.rights === 'team'
        ? '<a class="link small" href="#">获取</a>' : '<span class="muted small">—</span>'}</td>
    </tr>`).join('');

    const bits = [];
    if (state.moot !== 'all') bits.push(nameOf(MOOTS, state.moot));
    if (state.year !== 'all') bits.push(`${state.year} 年`);
    if (state.type !== 'all') bits.push(nameOf(TYPES, state.type));
    $('#res-title').textContent = bits.length ? bits.join(' · ') : '全部资料';
    $('#res-count').textContent = `共 ${rows.length} 份 · 其中 ${rows.filter(r => r.rights === 'public').length} 份官方公开`;
    $('#res-empty').hidden = rows.length > 0;

    /* 手机端：三级列换成三个下拉，选项里带份数 */
    const sel = (id, key, options) => {
      const el = $(id);
      el.innerHTML = options.map(([val, label]) => `<option value="${val}"${state[key] === val ? ' selected' : ''}>${label}（${countOf(key, val)}）</option>`).join('');
      el.disabled = options.filter(([v]) => v !== 'all').every(([v]) => countOf(key, v) === 0);
    };
    sel('#sel-moot', 'moot', [['all', '全部赛事'], ...MOOTS.map(m => [m.id, m.short])]);
    sel('#sel-year', 'year', [['all', '全部年份'], ...YEARS.map(y => [y, `${y} 年`])]);
    sel('#sel-type', 'type', [['all', '全部类型'], ...TYPES.map(t => [t.id, t.name])]);
  };

  $('#facets').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-facet]');
    if (!btn || btn.getAttribute('aria-disabled') === 'true') return;
    state[btn.dataset.facet] = btn.dataset.val;
    render();
  });
  $('#path').addEventListener('click', (e) => {
    const a = e.target.closest('[data-up]');
    if (!a) return;
    e.preventDefault();
    const key = a.dataset.up;
    if (key === 'moot') { state.moot = 'all'; state.year = 'all'; state.type = 'all'; }
    if (key === 'year') { state.year = 'all'; state.type = 'all'; }
    if (key === 'type') state.type = 'all';
    render();
  });
  [['#sel-moot', 'moot'], ['#sel-year', 'year'], ['#sel-type', 'type']].forEach(([id, key]) => {
    $(id).addEventListener('change', (e) => { state[key] = e.target.value; render(); });
  });
  $('#res-all').addEventListener('click', (e) => {
    e.preventDefault();
    state.moot = state.year = state.type = 'all';
    render();
  });
  render();
}

/* ---------- 队伍空间 ---------- */
const taskBody = $('#task-body');
if (taskBody) {
  const STATUS = {
    todo: ['待开始', 'pill line'], doing: ['进行中', 'pill'], review: ['待审', 'pill warn'],
    done: ['已完成', 'pill pos'], overdue: ['逾期', 'pill neg']
  };
  const renderTasks = (filter) => {
    let rows = TASKS.filter(t => t.team === 'hengping');
    if (filter === 'mine') rows = rows.filter(t => t.owner === '李昀');
    if (filter === 'open') rows = rows.filter(t => t.status !== 'done');
    rows.sort((a, b) => a.due.localeCompare(b.due));
    taskBody.innerHTML = rows.map(t => {
      const d = daysLeft(t.due);
      const [label, cls] = STATUS[t.status];
      const rest = t.status === 'done' ? '<span class="muted small">—</span>'
        : `<span class="due ${t.status === 'overdue' ? 'over' : d <= 3 ? 'closing' : ''}"><span class="n">${d < 0 ? '−' + Math.abs(d) : d}</span><span class="u">天</span></span>`;
      return `<tr>
        <td data-l=""><a class="link" href="#">${t.title}</a>${t.file ? '<span class="sub">含 1 个附件</span>' : ''}</td>
        <td data-l="负责人" class="muted">${t.owner}</td>
        <td data-l="截止"><span class="mono small">${fmtDate(t.due)}</span></td>
        <td data-l="剩余" style="width:120px">${rest}</td>
        <td data-l="状态" class="n" style="width:84px"><span class="${cls}">${label}</span></td>
      </tr>`;
    }).join('');
    $('#task-open').textContent = TASKS.filter(t => t.team === 'hengping' && t.status !== 'done').length;
    $('#task-count').textContent = rows.length;
  };
  $$('[data-task]').forEach(btn => btn.addEventListener('click', () => {
    $$('[data-task]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    renderTasks(btn.dataset.task);
  }));
  renderTasks('all');
}

/* ---------- 学校端 ---------- */
const classBody = $('#class-body');
if (classBody) {
  classBody.innerHTML = CLASSES.map(c => {
    const rate = c.submitted / c.due;
    return `<tr>
      <td>${c.name}</td>
      <td class="n"><span class="mono">${c.due}</span></td>
      <td class="n"><span class="mono">${c.submitted}</span></td>
      <td class="n"><span class="mono">${c.pending}</span></td>
      <td class="n"><span class="mono">${c.returned}</span></td>
      <td class="n"><span class="mono">${c.due - c.submitted}</span></td>
      <td class="n"><div style="display:flex;align-items:center;gap:10px;justify-content:flex-end">
        <span class="ruler ${rate < 0.8 ? 'closing' : ''}" style="width:64px"><i style="width:${Math.round(rate * 100)}%"></i></span>
        <span class="mono small" style="width:46px;text-align:right">${(rate * 100).toFixed(1)}%</span>
      </div></td>
    </tr>`;
  }).join('');

  $('#tot-due').textContent = TOTAL.due;
  $('#tot-sub').textContent = TOTAL.submitted;
  $('#tot-pending').textContent = TOTAL.pending;
  $('#tot-rate').textContent = ((TOTAL.submitted / TOTAL.due) * 100).toFixed(1);
  $('#sub-n').textContent = TOTAL.submitted;
  $('#pend-n').textContent = TOTAL.pending;

  const reqRows = $('#req-rows');
  if (reqRows) reqRows.innerHTML = REQUIREMENTS.map(r => {
    const pct = Math.round((r.got / r.total) * 100);
    return `<div class="row">
      <div class="grow">
        <div class="title">${r.name}${r.required ? '' : ' <span class="muted small" style="font-weight:400">选交</span>'}</div>
        <div class="line2">截止 ${fmtDate(r.due)}${r.needsSign ? ' · 需导师签字' : ''}</div>
      </div>
      <span class="ruler ${pct < 80 ? 'closing' : ''}" style="width:64px"><i style="width:${pct}%"></i></span>
      <span class="mono small" style="width:64px;text-align:right">${r.got}/${r.total}</span>
    </div>`;
  }).join('');

  const queue = $('#queue-rows');
  if (queue) queue.innerHTML = REVIEW_QUEUE.map(q => `<div class="row">
      <div class="grow">
        <div class="title">${q.student} <span class="muted small" style="font-weight:400">· ${q.cls}</span>${q.state === 'returned' ? ' <span class="pill neg">已打回</span>' : ''}</div>
        <div class="line2">${q.item} · ${q.at} 提交</div>
      </div>
      <button class="btn sm">${q.state === 'returned' ? '复核' : '审核'}</button>
    </div>`).join('');
}
