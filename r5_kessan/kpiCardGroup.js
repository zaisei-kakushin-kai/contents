import { createKpiCard } from './deltaKPICard.js'

/**
 * カテゴリタイトル付き KPI カードグループのHTML文字列を生成する。
 *
 * @param {{
 *   title:      string,
 *   items:      Array<{ 
 *      title: string, 
 *      currentYear: number|string, 
 *      prevYear: number|string 
 *      currentYearLabel: number|string, 
 *      prevYearLabel: number|string,
 *      fmt: (number | string) => string
 *   }>,
 *   fmt?:       (v: number) => string
 * }} opts
 * @returns {string} HTML
 */
export function renderKpiCardGroup({ title, items, fmt: topLevelFMT }) {
    const cards = items.map(({ label, currentYear, currentYearLabel, prevYear, prevYearLabel, delta, fmt: itemLevelFmt }) => {
        const fmt = itemLevelFmt ?? topLevelFMT
        let dir = 'zero'

        delta = parseFloat(delta)
        dir = delta > 0 ? 'up' : delta < 0 ? 'down' : 'zero'

        const sign = delta >= 0 ? '+' : ''

        if (dir === 'zero') {
            delta = '-'
        } else {
            delta = `${sign}${fmt(delta)}`
        }

        return createKpiCard({
            title: label,
            current: fmt(currentYear),
            currentText: currentYearLabel,
            previous: fmt(prevYear),
            previousText: prevYearLabel,
            delta,
            dir,
        })
    }).join('')

    return `<div class="kpi-group">
        <div class="kpi-group-title">${title}</div>
        <div class="kpi-group-cards">${cards}</div>
    </div>`
}
