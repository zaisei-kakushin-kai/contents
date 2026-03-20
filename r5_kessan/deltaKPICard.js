/**
 * KPI カードHTMLを生成し、指定IDの要素に挿入する (E' スタイル)
 *
 * @param {object} opts
 * @param {string} opts.title        - 指標名 (例: "財政力指数")
 * @param {string} opts.current      - 現在の値 (例: "0.412")
 * @param {string} opts.currentText  - 現在の値のラベル (例: "R5")
 * @param {string} opts.previous     - 過去の値 (例: "0.404")
 * @param {string} opts.previousText - 過去の値に追加するラベル
 * @param {string|null} [opts.delta] - 増減テキスト (例: "▲0.008")。null なら非表示
 * @param {'up'|'down'|'zero'} [opts.dir='zero'] - 増減方向 (色クラスに使用)
 * @returns {string} カードのHTML文字列
 */
export function createKpiCard({
    title,
    current,
    currentText,
    previous,
    previousText,
    delta = null,
    dir = 'zero'
}) {
    let deltaHtml = ''
    if (delta !== null) {
        deltaHtml = `<span class="kpi-card-delta d-${dir}">${delta}</span>`
    }

    const html = `
        <div class="kpi-card">
            <div class="kpi-card-header">
                <div class="kpi-card-label">${title}</div>
                ${deltaHtml}
            </div>
            <div class="kpi-card-r5-wrap">
                <span class="kpi-card-r5-year">
                    ${currentText}
                </span>
                <span class="kpi-card-r5">
                    ${current}
                </span>
            </div>
            <div class="kpi-card-bottom">
                <span class="kpi-card-r4">
                    ${previousText}: ${previous}
                </span>
            </div>
        </div>
    `

    return html
}