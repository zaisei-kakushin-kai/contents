/**
 * 税目ツリーサイドバー＋ブレッドクラム＋カードグリッドを描画・制御する。
 *
 * @param {string} sidebarId    - サイドバーコンテナ要素の ID
 * @param {string} breadcrumbId - ブレッドクラムコンテナ要素の ID
 * @param {string} cardsId      - カードグリッドコンテナ要素の ID
 * @param {Array<{
 *   zeimoku: string,
 *   ruikei: Array<{
 *     name: string,
 *     colorKey: string,
 *     entities: Array<{
 *       title: string,
 *       subtitle: string,
 *       grid: Array<{ label: string, value: string, valueColor?: string, highlightColor?: string }>
 *     }>
 *   }>
 * }>} data - 税目データ配列
 * @param {Object.<string, { valueColor: string, highlightColor: string }>} palette
 *   - colorKey → 色情報のマップ
 * @returns {void}
 */
function renderTreeSidebarNav(sidebarId, breadcrumbId, cardsId, data, palette) {
    // ── 内部状態 ──
    let selectedZmIdx = 0;
    let selectedRkName = null;
    const openSet = new Set([0]);

    // ── カードグリッド描画 ──
    function _renderCards() {
        const zm = data[selectedZmIdx];
        const entities = selectedRkName === null
            ? zm.ruikei.flatMap(r => r.entities)
            : (zm.ruikei.find(r => r.name === selectedRkName)?.entities ?? []);
        renderQuadCardGrid(cardsId, entities);
    }

    // ── ブレッドクラム更新 ──
    function _updateBreadcrumb() {
        const bc = document.getElementById(breadcrumbId);
        if (!bc) return;
        const zm = data[selectedZmIdx];
        const rkEntry = selectedRkName
            ? zm.ruikei.find(r => r.name === selectedRkName)
            : null;
        const pal = rkEntry ? palette[rkEntry.colorKey] : null;
        const cnt = selectedRkName === null
            ? zm.ruikei.reduce((s, r) => s + r.entities.length, 0)
            : (rkEntry?.entities.length ?? 0);

        if (selectedRkName === null) {
            bc.innerHTML =
                `<span class="bc-zm">${zm.zeimoku}</span>` +
                `<span class="bc-sep">›</span>` +
                `<span class="bc-all">全類型</span>` +
                `<span class="bc-cnt">${cnt} 自治体</span>`;
        } else {
            bc.innerHTML =
                `<span class="bc-zm">${zm.zeimoku}</span>` +
                `<span class="bc-sep">›</span>` +
                `<div class="bc-dot" style="background:${pal?.valueColor ?? "var(--gray-dim)"}"></div>` +
                `<span class="bc-rk">${selectedRkName}</span>` +
                `<span class="bc-cnt">${cnt} 自治体</span>`;
        }
    }

    // ── サイドバー再描画 ──
    function _buildSidebar() {
        const sidebar = document.getElementById(sidebarId);
        if (!sidebar) return;
        sidebar.innerHTML = "";

        data.forEach((zm, i) => {
            const total = zm.ruikei.reduce((s, r) => s + r.entities.length, 0);
            const isOpen = openSet.has(i);
            const isZmActive = i === selectedZmIdx && selectedRkName === null;

            // 税目ボタン
            const zmBtn = document.createElement("button");
            zmBtn.className =
                "f3-zm-btn" +
                (isZmActive ? " active" : "") +
                (isOpen ? " open" : "");
            zmBtn.title = zm.zeimoku;
            zmBtn.innerHTML =
                `<span class="f3-zm-arrow">▶</span>` +
                `<span class="f3-zm-name">${zm.zeimoku}</span>` +
                `<span class="f3-zm-badge">${total}</span>`;

            // 類型リスト
            const rkList = document.createElement("div");
            rkList.className = "f3-rk-list" + (isOpen ? " open" : "");

            zm.ruikei.forEach(rk => {
                const pal = palette[rk.colorKey];
                const rkBtn = document.createElement("button");
                rkBtn.className =
                    "f3-rk-btn" +
                    (i === selectedZmIdx && selectedRkName === rk.name ? " active" : "");
                rkBtn.title = rk.name;
                rkBtn.innerHTML =
                    `<div class="f3-rk-dot" style="background:${pal?.valueColor ?? "var(--gray-dim)"}"></div>` +
                    `<span class="f3-rk-name">${rk.name}</span>` +
                    `<span class="f3-rk-badge">${rk.entities.length}</span>`;

                rkBtn.addEventListener("click", e => {
                    e.stopPropagation();
                    selectedZmIdx = i;
                    selectedRkName = rk.name;
                    _buildSidebar();
                    _updateBreadcrumb();
                    _renderCards();
                });
                rkList.appendChild(rkBtn);
            });

            zmBtn.addEventListener("click", () => {
                if (openSet.has(i)) {
                    openSet.delete(i);
                } else {
                    openSet.add(i);
                }
                selectedZmIdx = i;
                selectedRkName = null;
                _buildSidebar();
                _updateBreadcrumb();
                _renderCards();
            });

            sidebar.appendChild(zmBtn);
            sidebar.appendChild(rkList);
        });
    }

    // ── 初期描画 ──
    _buildSidebar();
    _updateBreadcrumb();
    _renderCards();
}
