/**
 * zeimoku → ruikei → entity の3層カードグリッドを描画する。
 *
 * @param {string} containerId - 描画先コンテナ要素の ID
 * @param {Array<{
 *   id: string,
 *   todohuken: string,
 *   dantai: string,
 *   zeimoku: string,
 *   ruikei: string,
 *   gaku: number | null
 * }>} data - フラットなデータ配列
 * @param {{
 *   zeimokuOrder?: string[],
 *   ruikeiOrder?: string[],
 *   onSelect?: (item) => void
 * }} [options]
 *   - zeimokuOrder: zeimoku の表示順（未指定のものはデータ出現順で末尾に追加）
 *   - ruikeiOrder:  ruikei の表示順（未指定のものはデータ出現順で末尾に追加）
 *   - onSelect:     カードクリック時のコールバック
 * @returns {void}
 */
function renderZeimokuRuikeiGrid(containerId, data, options = {}) {
  const container = document.getElementById(containerId)
  if (!container) return

  const { zeimokuOrder, ruikeiOrder, onSelect } = options
  const fmt = (v) => v == null ? null : v.toLocaleString()

  // zeimoku → ruikei → items の3層にグループ化
  const tree = {}
  data.forEach(d => {
    if (!tree[d.zeimoku]) tree[d.zeimoku] = {}
    if (!tree[d.zeimoku][d.ruikei]) tree[d.zeimoku][d.ruikei] = []
    tree[d.zeimoku][d.ruikei].push(d)
  })

  // 並び順を解決するヘルパー
  const sortKeys = (keys, order) => {
    if (!order || order.length === 0) return keys
    const rest = keys.filter(k => !order.includes(k))
    return [...order.filter(k => keys.includes(k)), ...rest]
  }

  container.innerHTML = ""

  const zeimokuKeys = sortKeys(Object.keys(tree), zeimokuOrder)

  zeimokuKeys.forEach(zeimoku => {
    const ruikeiGroups = tree[zeimoku]
    const totalCards = Object.values(ruikeiGroups).reduce((s, a) => s + a.length, 0)

    const zeimokuEl = document.createElement('div')
    zeimokuEl.className = 'zeimoku-section'
    zeimokuEl.innerHTML = `
      <div class="zeimoku-title">
        ${zeimoku}
        <span class="zeimoku-title-count">${totalCards} 団体</span>
      </div>
    `

    const ruikeiKeys = sortKeys(Object.keys(ruikeiGroups), ruikeiOrder)

    ruikeiKeys.forEach(ruikei => {
      const items = ruikeiGroups[ruikei]

      const ruikeiEl = document.createElement('div')
      ruikeiEl.className = 'ruikei-section'
      ruikeiEl.innerHTML = `<div class="ruikei-title">${ruikei}</div>`

      const grid = document.createElement('div')
      grid.className = 'entity-card-grid'

      items.forEach(d => {
        const card = document.createElement('div')
        card.className = 'zr-card'
        card.innerHTML = `
          <div class="zr-header">
            <span class="zr-name">${d.dantai}</span>
            <span class="zr-pref">${d.todohuken}</span>
          </div>
          <div class="zr-section">
            <div class="zr-row">
              <span class="zr-row-label">${d.zeimoku}</span>
              <span class="zr-gaku">
                ${d.gaku != null
            ? `${fmt(d.gaku)}<span class="zr-gaku-unit">千円</span>`
            : `<span style="color:var(--gray-dim);font-size:10px">—</span>`}
              </span>
            </div>
          </div>
        `

        card.addEventListener('click', () => {
          container.querySelectorAll('.zr-card').forEach(c => c.classList.remove('selected'))
          card.classList.add('selected')
          if (onSelect) onSelect(d)
        })

        grid.appendChild(card)
      })

      ruikeiEl.appendChild(grid)
      zeimokuEl.appendChild(ruikeiEl)
    })

    container.appendChild(zeimokuEl)
  })
}
