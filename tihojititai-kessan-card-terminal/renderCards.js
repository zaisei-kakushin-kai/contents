
// ══════════════════════════════════════════════
// CARD BROWSER
// ══════════════════════════════════════════════
function buildCardItem(item) {
    const pop = item["人口.住民基本台帳人口.令6_1_1"];
    const density = item["人口密度_人_per_km2"];
    const area = item["面積_km2"];
    const revenue = item["歳入の状況_千円.歳入合計.決算額"];
    const localTax = item["市町村税の状況_千円.普通税.合計.収入済額"];
    return {
        id: item['id'],
        name: item["団体名"] || "N/A",
        badge: item["市町村類型"] || "N/A",
        pref: item["都道府県名"] || "N/A",
        rows: [
            { label: "人口", value: pop ? Number(pop).toLocaleString() + " 人" : "-" },
            { label: "人口密度", value: density ? density + " 人/km²" : "-" },
            { label: "面積", value: area ? area + " km²" : "-" },
            { label: "歳入合計", value: revenue ? fmt1000ennToKansuji(Number(revenue)) : "-" },
            { label: "市町村税合計", value: localTax ? fmt1000ennToKansuji(Number(localTax)) : "-" },
        ],
    };
}

function buildCardItemTodoHuken(item) {
    const pop = item["人口.住民基本台帳人口.令6_1_1"];
    const density = item["人口密度_人_per_km2"];
    const area = item["面積_km2"];
    const revenue = item["歳入の状況_千円.歳入合計.決算額"];
    const localTax = item["道府県税の状況_千円.合計.収入済額"];
    return {
        id: item['id'],
        name: item["都道府県名"] || "N/A",
        badge: "都道府県",
        pref: "都道府県",
        rows: [
            { label: "人口", value: pop ? Number(pop).toLocaleString() + " 人" : "-" },
            { label: "人口密度", value: density.toLocaleString() + " 人/km²" },
            { label: "面積", value: area.toLocaleString() + " km²" },
            { label: "歳入合計", value: revenue ? fmt1000ennToKansuji(Number(revenue)) : "-" },
            { label: "道府県税合計", value: localTax ? fmt1000ennToKansuji(Number(localTax)) : "-" },
        ],
    };
}

function renderCards(data, todohukenData) {
    const cardHtml = d => `
        <div id="card-${d.id}" class="entity-card" onclick="selectEntity('${d.id}')">
          <div id="card-${d.id}-title" class="ec-header">
            <h2>${d.name}</h2>
            <div class="ec-badge">
              ${d.badge}
            </div>
          </div>
          <div class="ec-stats">
            ${d.rows.map(r => `
              <div class="ec-row">
                <span class="ec-label">${r.label}</span>
                <span class="ec-value">${r.value}</span>
              </div>
            `).join("")}
          </div>
        </div>`;

    const grouped = {};
    for (const d of data) {
        const todoHuken = todohukenData.find(e => e.name == d.pref)
        if (!grouped[d.pref]) {
            grouped[d.pref] = [todoHuken]
        };
        grouped[d.pref].push(d);
    }
    console.log(grouped)
    const grid = document.getElementById("entity-grid");
    grid.innerHTML = "";
    const keys = prefNameArray.filter(k => grouped[k]);
    let i = 0;

    function renderChunk() {
        const keys_ = []
        keys_.push(...keys)
        const end = Math.min(i + 3, keys_.length);
        const frag = document.createDocumentFragment();
        for (; i < end; i++) {
            const key = keys_[i];
            const div = document.createElement("div");
            div.id = `ec-group-${key}`;
            div.className = "ec-group";
            div.innerHTML = `<div class="ec-group-label">${key}</div><div class="ec-group-cards">${grouped[key].map(cardHtml).join("")}</div>`;
            frag.appendChild(div);
        }
        grid.appendChild(frag);
        if (i < keys_.length) requestAnimationFrame(renderChunk);
        else {
            updateVisibleCount()
            isDataLoadingFinished = true
        };
    }

    requestAnimationFrame(renderChunk);
}