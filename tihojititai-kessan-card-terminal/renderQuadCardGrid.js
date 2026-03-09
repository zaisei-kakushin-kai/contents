/**
 * 案D: 2×2 クアッドグリッドカードを指定コンテナに描画する。
 *
 * @param {string} document_id - カードを挿入するコンテナ要素の ID
 * @param {Array<{
 *   title: string,
 *   subtitle: string,
 *   grid: Array<{
 *     label: string,
 *     value: string,
 *     valueColor: string,
 *     highlightColor: string
 *   }>
 * }>} parameters - 描画するアイテムの配列
 * @returns {void}
 */
function renderQuadCardGrid(document_id, parameters) {
    const container = document.getElementById(document_id);
    if (!container) return;

    const wrapper = document.createElement("div");
    wrapper.className = "quad-card-grid";

    for (const item of parameters) {
        const hasData = item.grid.some(cell => cell.value != null && cell.value !== "");

        // カード本体
        const card = document.createElement("div");
        card.className = "quad-card" + (hasData ? " has-data" : "");

        // ヘッダ（title / subtitle）
        const header = document.createElement("div");
        header.className = "quad-card-header";
        header.innerHTML =
            `<span class="quad-card-title">${item.title}</span>` +
            `<span class="quad-card-subtitle">${item.subtitle}</span>`;
        card.appendChild(header);

        // セルグリッド
        const cells = document.createElement("div");
        cells.className = "quad-card-grid-cells";

        for (const cell of item.grid) {
            const hasVal = cell.value != null && cell.value !== "";

            const cellEl = document.createElement("div");
            cellEl.className = "quad-card-cell" + (hasVal ? " has" : "");
            if (hasVal && cell.highlightColor) {
                cellEl.style.background = cell.highlightColor;
            }

            const labelEl = document.createElement("div");
            labelEl.className = "quad-card-cell-label";
            labelEl.textContent = cell.label;

            const valEl = document.createElement("div");
            if (hasVal) {
                valEl.className = "quad-card-cell-val";
                valEl.textContent = cell.value;
                if (cell.valueColor) valEl.style.color = cell.valueColor;
            } else {
                valEl.className = "quad-card-cell-val quad-card-cell-null";
                valEl.textContent = "—";
            }

            cellEl.appendChild(labelEl);
            cellEl.appendChild(valEl);
            cells.appendChild(cellEl);
        }

        card.appendChild(cells);
        wrapper.appendChild(card);
    }

    container.innerHTML = "";
    container.appendChild(wrapper);
}
