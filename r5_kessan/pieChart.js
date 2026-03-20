import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm'

/**
 * renderPieChart — D3 ドーナツ円グラフ
 *
 * HTML 文字列を返す。innerHTML += の後に D3 初期化が自動スケジュールされる。
 *
 * @param {object} params
 * @param {string} params.chartId           コンテナ要素の id（必須）
 * @param {string} [params.title]           タイトル文字列
 * @param {Array}  params.data              セグメント配列
 *                                          { name, value, color? }
 * @param {number} [params.total]           合計値（省略時は data の value 総和）
 * @param {function} [params.fmt]           値フォーマット関数
 * @param {HTMLElement} [params.tableBodyEl] tbody 連動先（省略可）
 * @returns {string} HTML 文字列
 */
export function renderPieChart({
  chartId,
  title = '',
  data,
  total,
  fmt,
  tableBodyEl = null,
}) {
  const listId = `${chartId}-list`

  // リスト HTML はここで生成（D3 不要）
  const TOTAL = total ?? data.reduce((s, d) => s + (d.value ?? 0), 0)
  const fmtPct = v => TOTAL > 0 ? `${(v / TOTAL * 100).toFixed(1)}%` : '—'
  const _fmt = fmt ?? (n => Number.isFinite(n) ? n.toLocaleString('ja-JP') : '—')

  const DEFAULT_COLORS = [
    '#fb8b1e', '#a29bfe', '#ef5777', '#2ecc71',
    '#e056fd', '#45aaf2', '#fda04a', '#696969',
    '#74b9ff', '#fd79a8', '#00b894', '#fdcb6e',
  ]
  const items = data.map((d, i) => ({
    name: d.name,
    value: d.value ?? 0,
    color: d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
  }))

  const listHtml = items.map((d, i) => `
    <div class="pie-list-item" data-index="${i}" data-name="${d.name}">
      <span class="pie-list-dot" style="background:${d.color}"></span>
      <span class="pie-list-name">${d.name}</span>
      <span class="pie-list-value">${_fmt(d.value)}</span>
      <span class="pie-list-pct">${fmtPct(d.value)}</span>
    </div>
  `).join('')

  setTimeout(() => {
    const chartEl = document.getElementById(chartId)
    const listEl = document.getElementById(listId)
    if (!chartEl) return

    _mount({ chartEl, listEl, tableBodyEl, items, TOTAL, fmt: _fmt })
  }, 0)

  return `
    <div class="pie-card">
      ${title ? `<div class="pie-header">${title}</div>` : ''}
      <div class="pie-body">
        <div class="pie-chart-col">
          <div id="${chartId}" class="pie-chart-el"></div>
        </div>
        <div class="pie-list-col" id="${listId}">
          ${listHtml}
        </div>
      </div>
    </div>
  `
}

// ── 内部マウント処理 ────────────────────────────────────────────────────────
function _mount({ chartEl, listEl, tableBodyEl, items, TOTAL, fmt }) {
  const SIZE = 220
  const R = SIZE / 2
  const OUTER_R = R - 8
  const INNER_R = OUTER_R * 0.52

  const pie = d3.pie().value(d => d.value).sort(null)
  const arc = d3.arc().innerRadius(INNER_R).outerRadius(OUTER_R)
  const arcHover = d3.arc().innerRadius(INNER_R).outerRadius(OUTER_R + 6)

  const svg = d3.select(chartEl)
    .append('svg')
    .attr('viewBox', [-R, -R, SIZE, SIZE])
    .style('width', '100%').style('height', '100%').style('max-height', `${SIZE}px`)

  const arcs = pie(items)

  const g = svg.append('g')
  const paths = g.selectAll('path')
    .data(arcs)
    .join('path')
    .attr('d', arc)
    .attr('fill', d => d.data.color)
    .attr('stroke', '#0a0a0a')
    .attr('stroke-width', 1.5)
    .style('cursor', 'pointer')
    .style('transition', 'fill-opacity 0.15s')

  // 中央テキスト
  const center = svg.append('g').attr('text-anchor', 'middle').style('pointer-events', 'none')
  const centerSub = center.append('text')
    .attr('dy', '-12')
    .style('fill', '#666')
    .style('font-family', 'var(--font-mono, monospace)')
    .style('font-size', '9px')
    .text('合計')
  const centerMain = center.append('text')
    .attr('dy', '6')
    .style('fill', '#e8e8e8')
    .style('font-family', 'var(--font-mono, monospace)')
    .style('font-size', '12px')
    .style('font-weight', 'bold')
    .text(fmt(TOTAL))

  // ── ホバー処理 ──
  function activate(index) {
    if (index < 0) {
      paths.attr('fill-opacity', 1).attr('d', arc)
      centerSub.text('合計').style('fill', '#666')
      centerMain.text(fmt(TOTAL)).style('fill', '#e8e8e8')
      if (listEl) listEl.querySelectorAll('.pie-list-item').forEach(el => el.classList.remove('active'))
      clearTable()
    } else {
      const d = items[index]
      paths.attr('fill-opacity', (_, i) => i === index ? 1 : 0.2)
      paths.filter((_, i) => i === index).attr('d', arcHover)
      paths.filter((_, i) => i !== index).attr('d', arc)
      centerSub.text(d.name).style('fill', d.color)
      centerMain.text(`${(d.value / TOTAL * 100).toFixed(1)}%`).style('fill', d.color)
      if (listEl) {
        listEl.querySelectorAll('.pie-list-item').forEach(el =>
          el.classList.toggle('active', +el.dataset.index === index)
        )
      }
      syncTable(d.name)
    }
  }

  function syncTable(name) {
    if (!tableBodyEl) return
    tableBodyEl.querySelectorAll('tr').forEach(tr =>
      tr.classList.toggle('row-highlight', tr.dataset.name === name)
    )
  }
  function clearTable() {
    if (!tableBodyEl) return
    tableBodyEl.querySelectorAll('tr').forEach(tr => tr.classList.remove('row-highlight'))
  }

  // チャート ↔ リスト 双方向
  paths
    .on('mouseenter', (_, d) => activate(d.index))
    .on('mouseleave', () => activate(-1))

  if (listEl) {
    listEl.addEventListener('mouseover', e => {
      const item = e.target.closest('.pie-list-item')
      if (item) activate(+item.dataset.index)
    })
    listEl.addEventListener('mouseleave', () => activate(-1))
  }

  // テーブル → チャート連動
  if (tableBodyEl) {
    tableBodyEl.addEventListener('mouseover', e => {
      const tr = e.target.closest('tr')
      if (!tr) return
      const idx = items.findIndex(d => d.name === tr.dataset.name)
      if (idx >= 0) activate(idx)
    })
    tableBodyEl.addEventListener('mouseleave', () => activate(-1))
  }
}
