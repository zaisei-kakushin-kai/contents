import { fmtScore, SICHOSON_UI_kokuminkenkohoken } from './detail-sichoson-components.js'

/**
 * 国民健康保険事業会計の状況 UI を HTML 文字列で返す。
 *
 * @param {object} dataItem - 生データ行
 * @returns {string} HTML 文字列
 */
export function renderKokuminkenkohoken(dataItem) {
    const { title, kpiSet, headCount, perCapita } = SICHOSON_UI_kokuminkenkohoken(dataItem)

    const kpiCards = kpiSet.map(({ label, value }) => {
        const isNeg = String(value ?? '').startsWith('-') || String(value ?? '').startsWith('▲')
        const colorClass = value === '-' ? 'd-zero' : isNeg ? 'd-down' : 'd-up'
        return `
        <div class="kpi-card">
            <div class="kpi-card-header">
                <div class="kpi-card-label">${label}</div>
            </div>
            <div class="kpi-card-r5-wrap">
                <span class="kpi-card-r5 ${colorClass}">${value}</span>
            </div>
        </div>`
    }).join('')

    const hcCard = `
        <div class="hc-card">
            <div class="hc-label">${headCount.label}</div>
            <div class="hc-value">${headCount.value}</div>
        </div>`

    const pcCards = perCapita.map(({ label, value }) => `
        <div class="pc-card">
            <div class="pc-label">${label}</div>
            <div class="pc-value">${value}</div>
        </div>`).join('')

    return `
        <div class="kokuhoken-block">
            <div class="kokuhoken-title">${title}</div>
            <div class="kokuhoken-top">
                ${kpiCards}
                ${hcCard}
            </div>
            <div class="per-capita-section">
                <div class="per-capita-title">被保険者 1人当たり</div>
                <div class="per-capita-cards">${pcCards}</div>
            </div>
        </div>`
}

/**
 * 公営事業等への繰出 ドーナツチャート UI を HTML 文字列で返す。
 * innerHTML への挿入後、D3 が自動で初期化される（pieChart.js の仕様による）。
 *
 * @param {object} dataItem - 生データ行
 * @returns {string} HTML 文字列
 */
export function renderKoeiJigyo(dataItem) {
    const KEYS = [
        { name: '下水道', key: '公営事業等への繰出.下水道_千円' },
        { name: '交通', key: '公営事業等への繰出.交通_千円' },
        { name: '病院', key: '公営事業等への繰出.病院_千円' },
        { name: '上水道', key: '公営事業等への繰出.上水道_千円' },
        { name: '国民健康保険', key: '公営事業等への繰出.国民健康保険_千円' },
        { name: 'その他', key: '公営事業等への繰出.その他_千円' },
    ]

    const data = KEYS.map(({ name, key }) => ({
        name,
        value: parseFloat(dataItem[key]) || 0,
    }))

    const total = data.reduce((s, d) => s + d.value, 0)
    const maxVal = Math.max(...data.map(d => d.value))

    const COLORS = ['#fb8b1e', '#a29bfe', '#ef5777', '#2ecc71', '#45aaf2', '#888888']

    const rows = data
        .map(({ name, value }, i) => {
            const pct = total > 0 ? (value / total * 100).toFixed(1) : '0.0'
            const barPct = maxVal > 0 ? (value / maxVal * 100).toFixed(1) : '0'
            const color = COLORS[i % COLORS.length]
            return `
        <div class="koei-bar-row">
            <div class="koei-bar-name">${name}</div>
            <div class="koei-bar-track">
                <div class="koei-bar-fill" style="width:${barPct}%;background:${color}"></div>
            </div>
            <div class="koei-bar-val">${fmtScore(value)}<span class="koei-bar-pct">${pct}%</span></div>
        </div>`
        }).join('')

    return `
        <div class="koei-bar-block">
            <div class="koei-bar-title">公営事業等への繰出</div>
            <div class="koei-bar-list">${rows}</div>
        </div>`
}
