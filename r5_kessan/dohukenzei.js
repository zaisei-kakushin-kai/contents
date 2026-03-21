export function fmtScore(bigint, unit) {
    if (typeof bigint === 'string') {
        bigint = bigint.replace('-', '-')
    } else if (null === bigint) {
        return "-"
    }
    const v = parseFloat(bigint)
    if (!Number.isFinite(v)) {
        return bigint
    }

    if (unit) {
        return `${bigint.toLocaleString()} ${unit}`
    }

    // 億
    const MAN = 10
    const OKU = 10_0000
    const CHO = 10_0000_0000
    const maximumFractionDigits = 3
    const minimumFractionDigits = 0
    const opt = { maximumFractionDigits, minimumFractionDigits }
    const absV = Math.abs(v)
    if (absV < MAN) {
        return v.toLocaleString("ja-JP", { maximumFractionDigits: 0, minimumFractionDigits: 0 }) + ' 千円'
    } else if (absV < OKU) {
        return (v / MAN).toLocaleString("ja-JP", { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + ' 万円'
    } else if (absV < CHO) {
        return (v / OKU).toLocaleString("ja-JP", opt) + ' 億円'
    } else {
        return (v / CHO).toLocaleString("ja-JP", opt) + ' 兆円'
    }
}

export function DOHUKEN_UI_Syushi(dataItem) {
    const rows = [
        { label: "歳入総額", r5: "収支状況_千円.歳入総額.令和5年度", r4: "収支状況_千円.歳入総額.令和4年度" },
        { label: "歳出総額", r5: "収支状況_千円.歳出総額.令和5年度", r4: "収支状況_千円.歳出総額.令和4年度" },
        { label: "歳入歳出差引", r5: "収支状況_千円.歳入歳出差引.令和5年度", r4: "収支状況_千円.歳入歳出差引.令和4年度" },
        { label: "翌年度繰越財源", r5: "収支状況_千円.翌年度に繰越すべき財源.令和5年度", r4: "収支状況_千円.翌年度に繰越すべき財源.令和4年度" },
        { label: "実質収支", r5: "収支状況_千円.実質収支.令和5年度", r4: "収支状況_千円.実質収支.令和4年度" },
        { label: "単年度収支", r5: "収支状況_千円.単年度収支.令和5年度", r4: "収支状況_千円.単年度収支.令和4年度" },
        { label: "積立金", r5: "収支状況_千円.積立金.令和5年度", r4: "収支状況_千円.積立金.令和4年度" },
        { label: "繰上償還金", r5: "収支状況_千円.繰上償還金.令和5年度", r4: "収支状況_千円.繰上償還金.令和4年度" },
        { label: "積立金取崩し額", r5: "収支状況_千円.積立金取崩し額.令和5年度", r4: "収支状況_千円.積立金取崩し額.令和4年度" },
        { label: "実質単年度収支", r5: "収支状況_千円.実質単年度収支.令和5年度", r4: "収支状況_千円.実質単年度収支.令和4年度" },
        { label: "収益事業収入", r5: "収益事業収入_千円.令和5年度", r4: "収益事業収入_千円.令和4年度" },
    ]
    return {
        title: "収支状況",
        fmt: fmtScore,
        items: rows.map(e => ({
            label: e.label,
            currentYear: dataItem[e.r5],
            currentYearLabel: '令和5年度',
            prevYear: dataItem[e.r4],
            prevYearLabel: '令和4年度',
            delta: parseFloat(dataItem[e.r5]) - parseFloat(dataItem[e.r4]),
        }))
    }
}

export function DOHUKEN_UI_SainyuJyokyo(dataItem) {
    const schema = {
        "title": "歳入の状況",
        "headers": [
            { "label": "項目", "key": "name" },
            { "label": "決算額", "key": "value", "right": true },
            { "label": "構成比", "key": "ratio", "right": true },
            { "label": "経常一般財源等", "key": "ippan_value", "right": true },
            { "label": "経常一般財源等構成比", "key": "ippan_ratio", "right": true },
        ],
        "rows": [
            { "name": "地方税", "depth": 0, "value": "歳入の状況_千円.地方税.決算額", "ratio": "歳入の状況_千円.地方税.構成比", "ippan_value": "歳入の状況_千円.地方税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方税.経常一般財源等構成比" },
            { "name": "地方譲与税", "depth": 0, "value": "歳入の状況_千円.地方譲与税.決算額", "ratio": "歳入の状況_千円.地方譲与税.構成比", "ippan_value": "歳入の状況_千円.地方譲与税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方譲与税.経常一般財源等構成比" },
            { "name": "地方揮発油譲与税", "depth": 1, "value": "歳入の状況_千円.地方譲与税.内訳.地方揮発油譲与税.決算額", "ratio": "歳入の状況_千円.地方譲与税.内訳.地方揮発油譲与税.構成比", "ippan_value": "歳入の状況_千円.地方譲与税.内訳.地方揮発油譲与税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方譲与税.内訳.地方揮発油譲与税.経常一般財源等構成比" },
            { "name": "特別とん譲与税", "depth": 1, "value": "歳入の状況_千円.地方譲与税.内訳.特別とん譲与税.決算額", "ratio": "歳入の状況_千円.地方譲与税.内訳.特別とん譲与税.構成比", "ippan_value": "歳入の状況_千円.地方譲与税.内訳.特別とん譲与税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方譲与税.内訳.特別とん譲与税.経常一般財源等構成比" },
            { "name": "石油ガス譲与税", "depth": 1, "value": "歳入の状況_千円.地方譲与税.内訳.石油ガス譲与税.決算額", "ratio": "歳入の状況_千円.地方譲与税.内訳.石油ガス譲与税.構成比", "ippan_value": "歳入の状況_千円.地方譲与税.内訳.石油ガス譲与税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方譲与税.内訳.石油ガス譲与税.経常一般財源等構成比" },
            { "name": "自動車重量譲与税", "depth": 1, "value": "歳入の状況_千円.地方譲与税.内訳.自動車重量譲与税.決算額", "ratio": "歳入の状況_千円.地方譲与税.内訳.自動車重量譲与税.構成比", "ippan_value": "歳入の状況_千円.地方譲与税.内訳.自動車重量譲与税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方譲与税.内訳.自動車重量譲与税.経常一般財源等構成比" },
            { "name": "航空機燃料譲与税", "depth": 1, "value": "歳入の状況_千円.地方譲与税.内訳.航空機燃料譲与税.決算額", "ratio": "歳入の状況_千円.地方譲与税.内訳.航空機燃料譲与税.構成比", "ippan_value": "歳入の状況_千円.地方譲与税.内訳.航空機燃料譲与税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方譲与税.内訳.航空機燃料譲与税.経常一般財源等構成比" },
            { "name": "森林環境譲与税", "depth": 1, "value": "歳入の状況_千円.地方譲与税.内訳.森林環境譲与税.決算額", "ratio": "歳入の状況_千円.地方譲与税.内訳.森林環境譲与税.構成比", "ippan_value": "歳入の状況_千円.地方譲与税.内訳.森林環境譲与税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方譲与税.内訳.森林環境譲与税.経常一般財源等構成比" },
            { "name": "特別法人事業譲与税", "depth": 1, "value": "歳入の状況_千円.地方譲与税.内訳.特別法人事業譲与税.決算額", "ratio": "歳入の状況_千円.地方譲与税.内訳.特別法人事業譲与税.構成比", "ippan_value": "歳入の状況_千円.地方譲与税.内訳.特別法人事業譲与税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方譲与税.内訳.特別法人事業譲与税.経常一般財源等構成比" },
            { "name": "市町村たばこ税都道府県交付金", "depth": 0, "value": "歳入の状況_千円.市町村たばこ税都道府県交付金.決算額", "ratio": "歳入の状況_千円.市町村たばこ税都道府県交付金.構成比", "ippan_value": "歳入の状況_千円.市町村たばこ税都道府県交付金.経常一般財源等", "ippan_ratio": "歳入の状況_千円.市町村たばこ税都道府県交付金.経常一般財源等構成比" },
            { "name": "地方特例交付金等", "depth": 0, "value": "歳入の状況_千円.地方特例交付金等.決算額", "ratio": "歳入の状況_千円.地方特例交付金等.構成比", "ippan_value": "歳入の状況_千円.地方特例交付金等.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方特例交付金等.経常一般財源等構成比" },
            { "name": "地方特例交付金", "depth": 1, "value": "歳入の状況_千円.地方特例交付金等.内訳.地方特例交付金.決算額", "ratio": "歳入の状況_千円.地方特例交付金等.内訳.地方特例交付金.構成比", "ippan_value": "歳入の状況_千円.地方特例交付金等.内訳.地方特例交付金.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方特例交付金等.内訳.地方特例交付金.経常一般財源等構成比" },
            { "name": "新型コロナウイルス感染症対策地方税減収補塡特別交付金", "depth": 1, "value": "歳入の状況_千円.地方特例交付金等.内訳.新型コロナウイルス感染症対策地方税減収補塡特別交付金.決算額", "ratio": "歳入の状況_千円.地方特例交付金等.内訳.新型コロナウイルス感染症対策地方税減収補塡特別交付金.構成比", "ippan_value": "歳入の状況_千円.地方特例交付金等.内訳.新型コロナウイルス感染症対策地方税減収補塡特別交付金.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方特例交付金等.内訳.新型コロナウイルス感染症対策地方税減収補塡特別交付金.経常一般財源等構成比" },
            { "name": "地方交付税", "depth": 0, "value": "歳入の状況_千円.地方交付税.決算額", "ratio": "歳入の状況_千円.地方交付税.構成比", "ippan_value": "歳入の状況_千円.地方交付税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方交付税.経常一般財源等構成比" },
            { "name": "普通交付税", "depth": 1, "value": "歳入の状況_千円.地方交付税.内訳.普通交付税.決算額", "ratio": "歳入の状況_千円.地方交付税.内訳.普通交付税.構成比", "ippan_value": "歳入の状況_千円.地方交付税.内訳.普通交付税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方交付税.内訳.普通交付税.経常一般財源等構成比" },
            { "name": "特別交付税", "depth": 1, "value": "歳入の状況_千円.地方交付税.内訳.特別交付税.決算額", "ratio": "歳入の状況_千円.地方交付税.内訳.特別交付税.構成比", "ippan_value": "歳入の状況_千円.地方交付税.内訳.特別交付税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方交付税.内訳.特別交付税.経常一般財源等構成比" },
            { "name": "震災復興特別交付税", "depth": 1, "value": "歳入の状況_千円.地方交付税.内訳.震災復興特別交付税.決算額", "ratio": "歳入の状況_千円.地方交付税.内訳.震災復興特別交付税.構成比", "ippan_value": "歳入の状況_千円.地方交付税.内訳.震災復興特別交付税.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方交付税.内訳.震災復興特別交付税.経常一般財源等構成比" },
            { "name": "(一般財源計)", "depth": 0, "value": "歳入の状況_千円.一般財源計.決算額", "ratio": "歳入の状況_千円.一般財源計.構成比", "ippan_value": "歳入の状況_千円.一般財源計.経常一般財源等", "ippan_ratio": "歳入の状況_千円.一般財源計.経常一般財源等構成比", "highlightRow": true },
            { "name": "交通安全対策特別交付金", "depth": 0, "value": "歳入の状況_千円.交通安全対策特別交付金.決算額", "ratio": "歳入の状況_千円.交通安全対策特別交付金.構成比", "ippan_value": "歳入の状況_千円.交通安全対策特別交付金.経常一般財源等", "ippan_ratio": "歳入の状況_千円.交通安全対策特別交付金.経常一般財源等構成比" },
            { "name": "分担金・負担金", "depth": 0, "value": "歳入の状況_千円.分担金・負担金.決算額", "ratio": "歳入の状況_千円.分担金・負担金.構成比", "ippan_value": "歳入の状況_千円.分担金・負担金.経常一般財源等", "ippan_ratio": "歳入の状況_千円.分担金・負担金.経常一般財源等構成比" },
            { "name": "使用料", "depth": 0, "value": "歳入の状況_千円.使用料.決算額", "ratio": "歳入の状況_千円.使用料.構成比", "ippan_value": "歳入の状況_千円.使用料.経常一般財源等", "ippan_ratio": "歳入の状況_千円.使用料.経常一般財源等構成比" },
            { "name": "手数料", "depth": 0, "value": "歳入の状況_千円.手数料.決算額", "ratio": "歳入の状況_千円.手数料.構成比", "ippan_value": "歳入の状況_千円.手数料.経常一般財源等", "ippan_ratio": "歳入の状況_千円.手数料.経常一般財源等構成比" },
            { "name": "国庫支出金", "depth": 0, "value": "歳入の状況_千円.国庫支出金.決算額", "ratio": "歳入の状況_千円.国庫支出金.構成比", "ippan_value": "歳入の状況_千円.国庫支出金.経常一般財源等", "ippan_ratio": "歳入の状況_千円.国庫支出金.経常一般財源等構成比" },
            { "name": "国有提供交付金", "depth": 0, "value": "歳入の状況_千円.国有提供交付金.決算額", "ratio": "歳入の状況_千円.国有提供交付金.構成比", "ippan_value": "歳入の状況_千円.国有提供交付金.経常一般財源等", "ippan_ratio": "歳入の状況_千円.国有提供交付金.経常一般財源等構成比" },
            { "name": "財産収入", "depth": 0, "value": "歳入の状況_千円.財産収入.決算額", "ratio": "歳入の状況_千円.財産収入.構成比", "ippan_value": "歳入の状況_千円.財産収入.経常一般財源等", "ippan_ratio": "歳入の状況_千円.財産収入.経常一般財源等構成比" },
            { "name": "寄附金", "depth": 0, "value": "歳入の状況_千円.寄附金.決算額", "ratio": "歳入の状況_千円.寄附金.構成比", "ippan_value": "歳入の状況_千円.寄附金.経常一般財源等", "ippan_ratio": "歳入の状況_千円.寄附金.経常一般財源等構成比" },
            { "name": "繰入金", "depth": 0, "value": "歳入の状況_千円.繰入金.決算額", "ratio": "歳入の状況_千円.繰入金.構成比", "ippan_value": "歳入の状況_千円.繰入金.経常一般財源等", "ippan_ratio": "歳入の状況_千円.繰入金.経常一般財源等構成比" },
            { "name": "繰越金", "depth": 0, "value": "歳入の状況_千円.繰越金.決算額", "ratio": "歳入の状況_千円.繰越金.構成比", "ippan_value": "歳入の状況_千円.繰越金.経常一般財源等", "ippan_ratio": "歳入の状況_千円.繰越金.経常一般財源等構成比" },
            { "name": "諸収入", "depth": 0, "value": "歳入の状況_千円.諸収入.決算額", "ratio": "歳入の状況_千円.諸収入.構成比", "ippan_value": "歳入の状況_千円.諸収入.経常一般財源等", "ippan_ratio": "歳入の状況_千円.諸収入.経常一般財源等構成比" },
            { "name": "地方債", "depth": 0, "value": "歳入の状況_千円.地方債.決算額", "ratio": "歳入の状況_千円.地方債.構成比", "ippan_value": "歳入の状況_千円.地方債.経常一般財源等", "ippan_ratio": "歳入の状況_千円.地方債.経常一般財源等構成比" },
            { "name": "歳入合計", "depth": 0, "value": "歳入の状況_千円.歳入合計.決算額", "ratio": "歳入の状況_千円.歳入合計.構成比", "ippan_value": "歳入の状況_千円.歳入合計.経常一般財源等", "ippan_ratio": "歳入の状況_千円.歳入合計.経常一般財源等構成比", "isFooter": true },
        ]
    }

    schema.rows = schema.rows.map(e => ({
        ...e,
        value: fmtScore(dataItem[e.value]),
        ratio: fmtScore(dataItem[e.ratio], '%'),
        ippan_value: fmtScore(dataItem[e.ippan_value]),
        ippan_ratio: fmtScore(dataItem[e.ippan_ratio], '%'),
    }))
    return schema
}

export function DOHUKEN_UI_DohukenZeiJyokyo(dataItem) {
    const schema = {
        "title": "道府県税の状況",
        "headers": [
            { "label": "項目", "key": "name" },
            { "label": "収入済額", "key": "value", "right": true },
            { "label": "構成比", "key": "ratio", "right": true, "unit": ' %' },
            { "label": "超過課税分", "key": "choka", "right": true },
        ],
        "rows": [
            { "name": "普通税", "depth": 0, "highlight": true, "isFooter": false, "value": "道府県税の状況_千円.普通税.収入済額", "ratio": "道府県税の状況_千円.普通税.構成比", "choka": "道府県税の状況_千円.普通税.超過課税分" },
            { "name": "法定普通税", "depth": 1, "highlight": true, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.超過課税分" },
            { "name": "道府県民税", "depth": 2, "highlight": true, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.道府県民税.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.道府県民税.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.道府県民税.超過課税分" },
            { "name": "個人均等割", "depth": 3, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.道府県民税.個人均等割.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.道府県民税.個人均等割.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.道府県民税.個人均等割.超過課税分" },
            { "name": "所得割", "depth": 3, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.道府県民税.所得割.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.道府県民税.所得割.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.道府県民税.所得割.超過課税分" },
            { "name": "法人均等割", "depth": 3, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.道府県民税.法人均等割.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.道府県民税.法人均等割.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.道府県民税.法人均等割.超過課税分" },
            { "name": "法人税割", "depth": 3, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.道府県民税.法人税割.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.道府県民税.法人税割.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.道府県民税.法人税割.超過課税分" },
            { "name": "利子割", "depth": 3, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.道府県民税.利子割.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.道府県民税.利子割.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.道府県民税.利子割.超過課税分" },
            { "name": "配当割", "depth": 3, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.道府県民税.配当割.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.道府県民税.配当割.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.道府県民税.配当割.超過課税分" },
            { "name": "株式等譲渡所得割", "depth": 3, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.道府県民税.株式等譲渡所得割.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.道府県民税.株式等譲渡所得割.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.道府県民税.株式等譲渡所得割.超過課税分" },
            { "name": "事業税", "depth": 2, "highlight": true, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.事業税.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.事業税.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.事業税.超過課税分" },
            { "name": "個人分", "depth": 3, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.事業税.内訳.個人分.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.事業税.内訳.個人分.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.事業税.内訳.個人分.超過課税分" },
            { "name": "法人分", "depth": 3, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.事業税.内訳.法人分.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.事業税.内訳.法人分.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.事業税.内訳.法人分.超過課税分" },
            { "name": "地方消費税", "depth": 2, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.地方消費税.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.地方消費税.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.地方消費税.超過課税分" },
            { "name": "不動産取得税", "depth": 2, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.不動産取得税.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.不動産取得税.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.不動産取得税.超過課税分" },
            { "name": "道府県たばこ税", "depth": 2, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.道府県たばこ税.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.道府県たばこ税.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.道府県たばこ税.超過課税分" },
            { "name": "ゴルフ場利用税", "depth": 2, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.ゴルフ場利用税.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.ゴルフ場利用税.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.ゴルフ場利用税.超過課税分" },
            { "name": "軽油引取税", "depth": 2, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.軽油引取税.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.軽油引取税.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.軽油引取税.超過課税分" },
            { "name": "自動車税", "depth": 2, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.自動車税.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.自動車税.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.自動車税.超過課税分" },
            { "name": "鉱区税", "depth": 2, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.鉱区税.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.鉱区税.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.鉱区税.超過課税分" },
            { "name": "固定資産税特例", "depth": 2, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定普通税.固定資産税特例.収入済額", "ratio": "道府県税の状況_千円.普通税.法定普通税.固定資産税特例.構成比", "choka": "道府県税の状況_千円.普通税.法定普通税.固定資産税特例.超過課税分" },
            { "name": "法定外普通税", "depth": 1, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.普通税.法定外普通税.収入済額", "ratio": "道府県税の状況_千円.普通税.法定外普通税.構成比", "choka": "道府県税の状況_千円.普通税.法定外普通税.超過課税分" },
            { "name": "目的税", "depth": 0, "highlight": true, "isFooter": false, "value": "道府県税の状況_千円.目的税.収入済額", "ratio": "道府県税の状況_千円.目的税.構成比", "choka": "道府県税の状況_千円.目的税.超過課税分" },
            { "name": "法定目的税", "depth": 1, "highlight": true, "isFooter": false, "value": "道府県税の状況_千円.目的税.法定目的税.収入済額", "ratio": "道府県税の状況_千円.目的税.法定目的税.構成比", "choka": "道府県税の状況_千円.目的税.法定目的税.超過課税分" },
            { "name": "狩猟税", "depth": 2, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.目的税.法定目的税.狩猟税.収入済額", "ratio": "道府県税の状況_千円.目的税.法定目的税.狩猟税.構成比", "choka": "道府県税の状況_千円.目的税.法定目的税.狩猟税.超過課税分" },
            { "name": "法定外目的税", "depth": 1, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.目的税.法定外目的税.収入済額", "ratio": "道府県税の状況_千円.目的税.法定外目的税.構成比", "choka": "道府県税の状況_千円.目的税.法定外目的税.超過課税分" },
            { "name": "旧法による税", "depth": -1, "highlight": false, "isFooter": false, "value": "道府県税の状況_千円.旧法による税.収入済額", "ratio": "道府県税の状況_千円.旧法による税.構成比", "choka": "道府県税の状況_千円.旧法による税.超過課税分" },
            { "name": "合計", "depth": -1, "highlight": false, "isFooter": true, "value": "道府県税の状況_千円.合計.収入済額", "ratio": "道府県税の状況_千円.合計.構成比", "choka": "道府県税の状況_千円.合計.超過課税分" },
        ]
    }

    schema.rows = schema.rows.map(e => ({
        ...e,
        value: fmtScore(dataItem[e.value]),
        ratio: dataItem[e.ratio],
        choka: fmtScore(dataItem[e.choka]),
    }))
    return schema
}

export function DOHUKEN_UI_Seishitsu(dataItem) {
    return {
        "title": "性質別歳出の状況",
        "headers": [
            { "label": "項目", "key": "title" },
            { "label": "決算額", "key": "value", "right": true },
            { "label": "構成比", "key": "ratio", "right": true, "unit": " %" },
            { "label": "充当一般財源等", "key": "ippann", "right": true },
        ],
        "rows": [
            { "title": "人件費", "depth": 0, "value": "性質別歳出の状況_千円.義務的経費計.人件費.決算額", "ratio": "性質別歳出の状況_千円.義務的経費計.人件費.構成比", "ippann": "性質別歳出の状況_千円.義務的経費計.人件費.充当一般財源等" },
            { "title": "うち職員給", "depth": 1, "value": "性質別歳出の状況_千円.義務的経費計.人件費.うち職員給.決算額", "ratio": "性質別歳出の状況_千円.義務的経費計.人件費.うち職員給.構成比", "ippann": "性質別歳出の状況_千円.義務的経費計.人件費.うち職員給.充当一般財源等" },
            { "title": "扶助費", "depth": 0, "value": "性質別歳出の状況_千円.義務的経費計.扶助費.決算額", "ratio": "性質別歳出の状況_千円.義務的経費計.扶助費.構成比", "ippann": "性質別歳出の状況_千円.義務的経費計.扶助費.充当一般財源等" },
            { "title": "公債費", "depth": 0, "value": "性質別歳出の状況_千円.義務的経費計.公債費.決算額", "ratio": "性質別歳出の状況_千円.義務的経費計.公債費.構成比", "ippann": "性質別歳出の状況_千円.義務的経費計.公債費.充当一般財源等" },
            { "title": "元利償還金", "depth": 1 },
            { "title": "元金", "depth": 2, "value": "性質別歳出の状況_千円.義務的経費計.公債費.元利償還金.元金.決算額", "ratio": "性質別歳出の状況_千円.義務的経費計.公債費.元利償還金.元金.構成比", "ippann": "性質別歳出の状況_千円.義務的経費計.公債費.元利償還金.元金.充当一般財源等" },
            { "title": "利子", "depth": 2, "value": "性質別歳出の状況_千円.義務的経費計.公債費.元利償還金.利子.決算額", "ratio": "性質別歳出の状況_千円.義務的経費計.公債費.元利償還金.利子.構成比", "ippann": "性質別歳出の状況_千円.義務的経費計.公債費.元利償還金.利子.充当一般財源等" },
            { "title": "一時借入金利子", "depth": 2, "value": "性質別歳出の状況_千円.義務的経費計.公債費.元利償還金.一時借入金利子.決算額", "ratio": "性質別歳出の状況_千円.義務的経費計.公債費.元利償還金.一時借入金利子.構成比", "ippann": "性質別歳出の状況_千円.義務的経費計.公債費.元利償還金.一時借入金利子.充当一般財源等" },
            { "title": "(義務的経費計)", "depth": 0, "value": "性質別歳出の状況_千円.義務的経費計.決算額", "ratio": "性質別歳出の状況_千円.義務的経費計.構成比", "ippann": "性質別歳出の状況_千円.義務的経費計.充当一般財源等", "highlightRow": true },
            { "title": "物件費", "depth": 1, "value": "性質別歳出の状況_千円.その他の経費.物件費.決算額", "ratio": "性質別歳出の状況_千円.その他の経費.物件費.構成比", "ippann": "性質別歳出の状況_千円.その他の経費.物件費.充当一般財源等" },
            { "title": "維持補修費", "depth": 1, "value": "性質別歳出の状況_千円.その他の経費.維持補修費.決算額", "ratio": "性質別歳出の状況_千円.その他の経費.維持補修費.構成比", "ippann": "性質別歳出の状況_千円.その他の経費.維持補修費.充当一般財源等" },
            { "title": "補助費等", "depth": 1, "value": "性質別歳出の状況_千円.その他の経費.補助費等.決算額", "ratio": "性質別歳出の状況_千円.その他の経費.補助費等.構成比", "ippann": "性質別歳出の状況_千円.その他の経費.補助費等.充当一般財源等" },
            { "title": "繰出金", "depth": 0, "value": "性質別歳出の状況_千円.その他の経費.繰出金.決算額", "ratio": "性質別歳出の状況_千円.その他の経費.繰出金.構成比", "ippann": "性質別歳出の状況_千円.その他の経費.繰出金.充当一般財源等" },
            { "title": "積立金", "depth": 0, "value": "性質別歳出の状況_千円.その他の経費.積立金.決算額", "ratio": "性質別歳出の状況_千円.その他の経費.積立金.構成比", "ippann": "性質別歳出の状況_千円.その他の経費.積立金.充当一般財源等" },
            { "title": "投資及び出資金", "depth": 0, "value": "性質別歳出の状況_千円.その他の経費.投資及び出資金.決算額", "ratio": "性質別歳出の状況_千円.その他の経費.投資及び出資金.構成比", "ippann": "性質別歳出の状況_千円.その他の経費.投資及び出資金.充当一般財源等" },
            { "title": "貸付金", "depth": 0, "value": "性質別歳出の状況_千円.その他の経費.貸付金.決算額", "ratio": "性質別歳出の状況_千円.その他の経費.貸付金.構成比", "ippann": "性質別歳出の状況_千円.その他の経費.貸付金.充当一般財源等" },
            { "title": "前年度繰上充用金", "depth": 0, "value": "性質別歳出の状況_千円.その他の経費.前年度繰上充用金.決算額", "ratio": "性質別歳出の状況_千円.その他の経費.前年度繰上充用金.構成比", "ippann": "性質別歳出の状況_千円.その他の経費.前年度繰上充用金.充当一般財源等" },
            { "title": "投資的経費", "depth": 0, "value": "性質別歳出の状況_千円.投資的経費計.決算額", "ratio": "性質別歳出の状況_千円.投資的経費計.構成比", "ippann": "性質別歳出の状況_千円.投資的経費計.充当一般財源等" },
            { "title": "うち人件費", "depth": 1, "value": "性質別歳出の状況_千円.投資的経費計.うち人件費.決算額", "ratio": "性質別歳出の状況_千円.投資的経費計.うち人件費.構成比", "ippann": "性質別歳出の状況_千円.投資的経費計.うち人件費.充当一般財源等" },
            { "title": "普通建設事業費", "depth": 0, "value": "性質別歳出の状況_千円.投資的経費計.普通建設事業費.決算額", "ratio": "性質別歳出の状況_千円.投資的経費計.普通建設事業費.構成比", "ippann": "性質別歳出の状況_千円.投資的経費計.普通建設事業費.充当一般財源等" },
            { "title": "うち補助", "depth": 2, "value": "性質別歳出の状況_千円.投資的経費計.普通建設事業費.うち補助.決算額", "ratio": "性質別歳出の状況_千円.投資的経費計.普通建設事業費.うち補助.構成比", "ippann": "性質別歳出の状況_千円.投資的経費計.普通建設事業費.うち補助.充当一般財源等" },
            { "title": "うち単独", "depth": 2, "value": "性質別歳出の状況_千円.投資的経費計.普通建設事業費.うち単独.決算額", "ratio": "性質別歳出の状況_千円.投資的経費計.普通建設事業費.うち単独.構成比", "ippann": "性質別歳出の状況_千円.投資的経費計.普通建設事業費.うち単独.充当一般財源等" },
            { "title": "災害復旧事業費", "depth": 1, "value": "性質別歳出の状況_千円.投資的経費計.災害復旧事業費.決算額", "ratio": "性質別歳出の状況_千円.投資的経費計.災害復旧事業費.構成比", "ippann": "性質別歳出の状況_千円.投資的経費計.災害復旧事業費.充当一般財源等" },
            { "title": "失業対策事業費", "depth": 1, "value": "性質別歳出の状況_千円.投資的経費計.失業対策事業費.決算額", "ratio": "性質別歳出の状況_千円.投資的経費計.失業対策事業費.構成比", "ippann": "性質別歳出の状況_千円.投資的経費計.失業対策事業費.充当一般財源等" },
            { "title": "歳出合計", "depth": 0, "value": "性質別歳出の状況_千円.歳出合計.決算額", "ratio": "性質別歳出の状況_千円.歳出合計.構成比", "ippann": "性質別歳出の状況_千円.歳出合計.充当一般財源等", "isFooter": true },
        ].map(e => ({
            ...e,
            value: fmtScore(dataItem[e.value]),
            ippann: fmtScore(dataItem[e.ippann]),
            ratio: dataItem[e.ratio],
        }))
    }
}

export function DOHUKEN_UI_Mokuteki(dataItem) {
    return {
        "title": "目的別歳出の状況",
        "headers": [
            { "label": "項目", "key": "title" },
            { "label": "決算額", "key": "value", "right": true },
            { "label": "構成比", "key": "ratio", "right": true, "unit": " %" },
            { "label": "普通建設事業費", "key": "kensetsu", "right": true },
            { "label": "充当一般財源等", "key": "ippann", "right": true },
        ],
        "rows": [
            { "title": "議会費", "depth": 0, "value": "目的別歳出の状況_千円.議会費.決算額", "ratio": "目的別歳出の状況_千円.議会費.構成比", "kensetsu": "目的別歳出の状況_千円.議会費.普通建設事業費", "ippann": "目的別歳出の状況_千円.議会費.充当一般財源等" },
            { "title": "総務費", "depth": 0, "value": "目的別歳出の状況_千円.総務費.決算額", "ratio": "目的別歳出の状況_千円.総務費.構成比", "kensetsu": "目的別歳出の状況_千円.総務費.普通建設事業費", "ippann": "目的別歳出の状況_千円.総務費.充当一般財源等" },
            { "title": "民生費", "depth": 0, "value": "目的別歳出の状況_千円.民生費.決算額", "ratio": "目的別歳出の状況_千円.民生費.構成比", "kensetsu": "目的別歳出の状況_千円.民生費.普通建設事業費", "ippann": "目的別歳出の状況_千円.民生費.充当一般財源等" },
            { "title": "衛生費", "depth": 0, "value": "目的別歳出の状況_千円.衛生費.決算額", "ratio": "目的別歳出の状況_千円.衛生費.構成比", "kensetsu": "目的別歳出の状況_千円.衛生費.普通建設事業費", "ippann": "目的別歳出の状況_千円.衛生費.充当一般財源等" },
            { "title": "労働費", "depth": 0, "value": "目的別歳出の状況_千円.労働費.決算額", "ratio": "目的別歳出の状況_千円.労働費.構成比", "kensetsu": "目的別歳出の状況_千円.労働費.普通建設事業費", "ippann": "目的別歳出の状況_千円.労働費.充当一般財源等" },
            { "title": "農林水産業費", "depth": 0, "value": "目的別歳出の状況_千円.農林水産業費.決算額", "ratio": "目的別歳出の状況_千円.農林水産業費.構成比", "kensetsu": "目的別歳出の状況_千円.農林水産業費.普通建設事業費", "ippann": "目的別歳出の状況_千円.農林水産業費.充当一般財源等" },
            { "title": "商工費", "depth": 0, "value": "目的別歳出の状況_千円.商工費.決算額", "ratio": "目的別歳出の状況_千円.商工費.構成比", "kensetsu": "目的別歳出の状況_千円.商工費.普通建設事業費", "ippann": "目的別歳出の状況_千円.商工費.充当一般財源等" },
            { "title": "土木費", "depth": 0, "value": "目的別歳出の状況_千円.土木費.決算額", "ratio": "目的別歳出の状況_千円.土木費.構成比", "kensetsu": "目的別歳出の状況_千円.土木費.普通建設事業費", "ippann": "目的別歳出の状況_千円.土木費.充当一般財源等" },
            { "title": "警察費", "depth": 0, "value": "目的別歳出の状況_千円.警察費.決算額", "ratio": "目的別歳出の状況_千円.警察費.構成比", "kensetsu": "目的別歳出の状況_千円.警察費.普通建設事業費", "ippann": "目的別歳出の状況_千円.警察費.充当一般財源等" },
            { "title": "消防費", "depth": 0, "value": "目的別歳出の状況_千円.消防費.決算額", "ratio": "目的別歳出の状況_千円.消防費.構成比", "kensetsu": "目的別歳出の状況_千円.消防費.普通建設事業費", "ippann": "目的別歳出の状況_千円.消防費.充当一般財源等" },
            { "title": "教育費", "depth": 0, "value": "目的別歳出の状況_千円.教育費.決算額", "ratio": "目的別歳出の状況_千円.教育費.構成比", "kensetsu": "目的別歳出の状況_千円.教育費.普通建設事業費", "ippann": "目的別歳出の状況_千円.教育費.充当一般財源等" },
            { "title": "災害復旧費", "depth": 0, "value": "目的別歳出の状況_千円.災害復旧費.決算額", "ratio": "目的別歳出の状況_千円.災害復旧費.構成比", "kensetsu": "目的別歳出の状況_千円.災害復旧費.普通建設事業費", "ippann": "目的別歳出の状況_千円.災害復旧費.充当一般財源等" },
            { "title": "公債費", "depth": 0, "value": "目的別歳出の状況_千円.公債費.決算額", "ratio": "目的別歳出の状況_千円.公債費.構成比", "kensetsu": "目的別歳出の状況_千円.公債費.普通建設事業費", "ippann": "目的別歳出の状況_千円.公債費.充当一般財源等" },
            { "title": "諸支出金", "depth": 0, "value": "目的別歳出の状況_千円.諸支出金.決算額", "ratio": "目的別歳出の状況_千円.諸支出金.構成比", "kensetsu": "目的別歳出の状況_千円.諸支出金.普通建設事業費", "ippann": "目的別歳出の状況_千円.諸支出金.充当一般財源等" },
            { "title": "前年度繰上充用金", "depth": 0, "value": "目的別歳出の状況_千円.前年度繰上充用金.決算額", "ratio": "目的別歳出の状況_千円.前年度繰上充用金.構成比", "kensetsu": "目的別歳出の状況_千円.前年度繰上充用金.普通建設事業費", "ippann": "目的別歳出の状況_千円.前年度繰上充用金.充当一般財源等" },
            { "title": "利子割交付金", "depth": 0, "value": "目的別歳出の状況_千円.利子割交付金.決算額", "ratio": "目的別歳出の状況_千円.利子割交付金.構成比", "kensetsu": "目的別歳出の状況_千円.利子割交付金.普通建設事業費", "ippann": "目的別歳出の状況_千円.利子割交付金.充当一般財源等" },
            { "title": "配当割交付金", "depth": 0, "value": "目的別歳出の状況_千円.配当割交付金.決算額", "ratio": "目的別歳出の状況_千円.配当割交付金.構成比", "kensetsu": "目的別歳出の状況_千円.配当割交付金.普通建設事業費", "ippann": "目的別歳出の状況_千円.配当割交付金.充当一般財源等" },
            { "title": "株式等譲渡所得割交付金", "depth": 0, "value": "目的別歳出の状況_千円.株式等譲渡所得割交付金.決算額", "ratio": "目的別歳出の状況_千円.株式等譲渡所得割交付金.構成比", "kensetsu": "目的別歳出の状況_千円.株式等譲渡所得割交付金.普通建設事業費", "ippann": "目的別歳出の状況_千円.株式等譲渡所得割交付金.充当一般財源等" },
            { "title": "分離課税所得割交付金", "depth": 0, "value": "目的別歳出の状況_千円.分離課税所得割交付金.決算額", "ratio": "目的別歳出の状況_千円.分離課税所得割交付金.構成比", "kensetsu": "目的別歳出の状況_千円.分離課税所得割交付金.普通建設事業費", "ippann": "目的別歳出の状況_千円.分離課税所得割交付金.充当一般財源等" },
            { "title": "地方消費税交付金", "depth": 0, "value": "目的別歳出の状況_千円.地方消費税交付金.決算額", "ratio": "目的別歳出の状況_千円.地方消費税交付金.構成比", "kensetsu": "目的別歳出の状況_千円.地方消費税交付金.普通建設事業費", "ippann": "目的別歳出の状況_千円.地方消費税交付金.充当一般財源等" },
            { "title": "ゴルフ場利用税交付金", "depth": 0, "value": "目的別歳出の状況_千円.ゴルフ場利用税交付金.決算額", "ratio": "目的別歳出の状況_千円.ゴルフ場利用税交付金.構成比", "kensetsu": "目的別歳出の状況_千円.ゴルフ場利用税交付金.普通建設事業費", "ippann": "目的別歳出の状況_千円.ゴルフ場利用税交付金.充当一般財源等" },
            { "title": "特別地方消費税交付金", "depth": 0, "value": "目的別歳出の状況_千円.特別地方消費税交付金.決算額", "ratio": "目的別歳出の状況_千円.特別地方消費税交付金.構成比", "kensetsu": "目的別歳出の状況_千円.特別地方消費税交付金.普通建設事業費", "ippann": "目的別歳出の状況_千円.特別地方消費税交付金.充当一般財源等" },
            { "title": "自動車取得税交付金", "depth": 0, "value": "目的別歳出の状況_千円.自動車取得税交付金.決算額", "ratio": "目的別歳出の状況_千円.自動車取得税交付金.構成比", "kensetsu": "目的別歳出の状況_千円.自動車取得税交付金.普通建設事業費", "ippann": "目的別歳出の状況_千円.自動車取得税交付金.充当一般財源等" },
            { "title": "軽油引取税交付金", "depth": 0, "value": "目的別歳出の状況_千円.軽油引取税交付金.決算額", "ratio": "目的別歳出の状況_千円.軽油引取税交付金.構成比", "kensetsu": "目的別歳出の状況_千円.軽油引取税交付金.普通建設事業費", "ippann": "目的別歳出の状況_千円.軽油引取税交付金.充当一般財源等" },
            { "title": "自動車税環境性能割交付金", "depth": 0, "value": "目的別歳出の状況_千円.自動車税環境性能割交付金.決算額", "ratio": "目的別歳出の状況_千円.自動車税環境性能割交付金.構成比", "kensetsu": "目的別歳出の状況_千円.自動車税環境性能割交付金.普通建設事業費", "ippann": "目的別歳出の状況_千円.自動車税環境性能割交付金.充当一般財源等" },
            { "title": "法人事業税交付金", "depth": 0, "value": "目的別歳出の状況_千円.法人事業税交付金.決算額", "ratio": "目的別歳出の状況_千円.法人事業税交付金.構成比", "kensetsu": "目的別歳出の状況_千円.法人事業税交付金.普通建設事業費", "ippann": "目的別歳出の状況_千円.法人事業税交付金.充当一般財源等" },
            { "title": "特別区財政調整交付金", "depth": 0, "value": "目的別歳出の状況_千円.特別区財政調整交付金.決算額", "ratio": "目的別歳出の状況_千円.特別区財政調整交付金.構成比", "kensetsu": "目的別歳出の状況_千円.特別区財政調整交付金.普通建設事業費", "ippann": "目的別歳出の状況_千円.特別区財政調整交付金.充当一般財源等" },
            { "title": "歳出合計", "depth": 0, "value": "目的別歳出の状況_千円.歳出合計.決算額", "ratio": "目的別歳出の状況_千円.歳出合計.構成比", "kensetsu": "目的別歳出の状況_千円.歳出合計.普通建設事業費", "ippann": "目的別歳出の状況_千円.歳出合計.充当一般財源等", "isFooter": true },
        ].map(e => {
            const entries = Object.entries(e).map(([key, value]) => {
                if (key === 'title' || key === 'isFooter') return [key, value]
                if (key === 'ratio') return [key, dataItem[value]]
                return [key, fmtScore(dataItem[value])]
            })
            return Object.fromEntries(entries)
        })
    }
}

export function DOHUKEN_UI_ZaiseiShihyo(dataItem) {
    const rows = [
        { label: "基準財政収入額", r5: "財政指標.基準財政収入額_千円.令和5年度", r4: "財政指標.基準財政収入額_千円.令和4年度", fmt: fmtScore },
        { label: "基準財政需要額", r5: "財政指標.基準財政需要額_千円.令和5年度", r4: "財政指標.基準財政需要額_千円.令和4年度", fmt: fmtScore },
        { label: "標準税収入額等", r5: "財政指標.標準税収入額等_千円.令和5年度", r4: "財政指標.標準税収入額等_千円.令和4年度", fmt: fmtScore },
        { label: "標準財政規模", r5: "財政指標.標準財政規模_千円.令和5年度", r4: "財政指標.標準財政規模_千円.令和4年度", fmt: fmtScore },
        { label: "財政力指数", r5: "財政指標.財政力指数.令和5年度", r4: "財政指標.財政力指数.令和4年度", fmt: v => v },
        { label: "実質収支比率", r5: "財政指標.実質収支比率_percent.令和5年度", r4: "財政指標.実質収支比率_percent.令和4年度", fmt: v => fmtScore(v, '%') },
        { label: "公債費負担比率", r5: "財政指標.公債費負担比率_percent.令和5年度", r4: "財政指標.公債費負担比率_percent.令和4年度", fmt: v => fmtScore(v, '%') },
    ]
    return {
        title: "財政指標",
        items: rows.map(e => {
            if ("財政力指数" == e.label) {
                return {
                    label: e.label,
                    currentYear: dataItem[e.r5].toFixed(3),
                    currentYearLabel: '令和5年度',
                    prevYear: dataItem[e.r4].toFixed(3),
                    prevYearLabel: '令和4年度',
                    delta: (parseFloat(dataItem[e.r5]) - parseFloat(dataItem[e.r4])).toFixed(2),
                    fmt: e.fmt,
                }
            }
            return {
                label: e.label,
                currentYear: dataItem[e.r5],
                currentYearLabel: '令和5年度',
                prevYear: dataItem[e.r4],
                prevYearLabel: '令和4年度',
                delta: parseFloat(dataItem[e.r5]) - parseFloat(dataItem[e.r4]),
                fmt: e.fmt,
            }
        })
    }
}

export function DOHUKEN_UI_ShisanSaimu(dataItem) {
    const rows = [
        { label: "財政調整基金", r5: "積立金現在高_千円.財政調整基金.令和5年度", r4: "積立金現在高_千円.財政調整基金.令和4年度" },
        { label: "減債基金", r5: "積立金現在高_千円.減債基金.令和5年度", r4: "積立金現在高_千円.減債基金.令和4年度" },
        { label: "その他特定目的基金", r5: "積立金現在高_千円.その他特定目的基金.令和5年度", r4: "積立金現在高_千円.その他特定目的基金.令和4年度" },
        { label: "定額運用基金", r5: "積立金現在高_千円.定額運用基金.令和5年度", r4: "積立金現在高_千円.定額運用基金.令和4年度" },
        { label: "土地開発基金", r5: "土地開発基金現在高_千円.令和5年度", r4: "土地開発基金現在高_千円.令和4年度" },
        { label: "地方債現在高", r5: "地方債現在高_千円.令和5年度", r4: "地方債現在高_千円.令和4年度" },
    ]
    return {
        title: "積立金・基金・地方債　現在高",
        fmt: fmtScore,
        items: rows.map(e => ({
            label: e.label,
            currentYear: dataItem[e.r5],
            currentYearLabel: '令和5年度',
            prevYear: dataItem[e.r4],
            prevYearLabel: '令和4年度',
            delta: parseFloat(dataItem[e.r5]) - parseFloat(dataItem[e.r4]),
        }))
    }
}


export function DOHUKEN_UI_SaimuHutanKoui(dataItem) {
    const rows = [
        { label: "合計", r5: "債務負担行為額支出予定額_千円.合計.令和5年度", r4: "債務負担行為額支出予定額_千円.合計.令和4年度" },
        { label: "物件等購入", r5: "債務負担行為額支出予定額_千円.物件等購入.令和5年度", r4: "債務負担行為額支出予定額_千円.物件等購入.令和4年度" },
        { label: "保証・補償", r5: "債務負担行為額支出予定額_千円.保証・補償.令和5年度", r4: "債務負担行為額支出予定額_千円.保証・補償.令和4年度" },
        { label: "その他", r5: "債務負担行為額支出予定額_千円.その他.令和5年度", r4: "債務負担行為額支出予定額_千円.その他.令和4年度" },
        { label: "実質的なもの", r5: "債務負担行為額支出予定額_千円.実質的なもの.令和5年度", r4: "債務負担行為額支出予定額_千円.実質的なもの.令和4年度" },
    ]
    return {
        title: "債務負担行為",
        fmt: fmtScore,
        items: rows.map(e => ({
            label: e.label,
            currentYear: dataItem[e.r5],
            currentYearLabel: '令和5年度',
            prevYear: dataItem[e.r4],
            prevYearLabel: '令和4年度',
            delta: parseFloat(dataItem[e.r5]) - parseFloat(dataItem[e.r4]),
        }))
    }
}

export function DOHUKEN_UI_Kaikei(dataItem) {
    const rows = [
        { label: "実質収支", r5: "国民健康保険事業会計の状況.実質収支_千円.令和5年度", r4: "国民健康保険事業会計の状況.実質収支_千円.令和4年度" },
        { label: "再差引収支", r5: "国民健康保険事業会計の状況.再差引収支_千円.令和5年度", r4: "国民健康保険事業会計の状況.再差引収支_千円.令和4年度" },
    ]
    return {
        title: "国民健康保険の状況",
        fmt: fmtScore,
        items: rows.map(e => ({
            label: e.label,
            currentYear: dataItem[e.r5],
            currentYearLabel: '令和5年度',
            prevYear: dataItem[e.r4],
            prevYearLabel: '令和4年度',
            delta: parseFloat(dataItem[e.r5]) - parseFloat(dataItem[e.r4]),
        }))
    }
}

export function DOHUKEN_UI_ZaiseiKenzenka(dataItem) {
    const rows = [
        { label: "実質赤字比率", r5: "財政指標.健全化判断比率.実質赤字比率_percent.令和5年度", r4: "財政指標.健全化判断比率.実質赤字比率_percent.令和4年度", fmt: v => fmtScore(v, '%') },
        { label: "連結実質赤字比率", r5: "財政指標.健全化判断比率.連結実質赤字比率_percent.令和5年度", r4: "財政指標.健全化判断比率.連結実質赤字比率_percent.令和4年度", fmt: v => fmtScore(v, '%') },
        { label: "実質公債費比率", r5: "財政指標.健全化判断比率.実質公債費比率_percent.令和5年度", r4: "財政指標.健全化判断比率.実質公債費比率_percent.令和4年度", fmt: v => fmtScore(v, '%') },
        { label: "将来負担比率", r5: "財政指標.健全化判断比率.将来負担比率_percent.令和5年度", r4: "財政指標.健全化判断比率.将来負担比率_percent.令和4年度", fmt: v => fmtScore(v, '%') },
    ]
    return {
        title: "財政健全化比率",
        items: rows.map(e => ({
            label: e.label,
            currentYear: dataItem[e.r5],
            currentYearLabel: '令和5年度',
            prevYear: dataItem[e.r4],
            prevYearLabel: '令和4年度',
            delta: parseFloat(dataItem[e.r5]) - parseFloat(dataItem[e.r4]),
            fmt: e.fmt,
        }))
    }
}

export function DOHUKEN_UI_SyokuinKyuyo(dataItem) {
    const rasPaires = dataItem["職員給与の状況.ラスパイレス指数"]
    const getRasPairesGaugeColor = (value) => {
        const numericValue = Number(value)
        if (!Number.isFinite(numericValue)) return '#9ca3af'
        if (numericValue < 96) return '#16a34a'
        if (numericValue < 98) return '#84cc16'
        if (numericValue < 101) return '#facc15'
        if (numericValue < 102) return '#f97316'
        return '#a72f2f'
    }

    const schema = {
        "title": "職員給与の状況",
        "headers": [
            { "label": "職種", "key": "name" },
            { "label": "職員数", "key": "headCount", "right": true },
            { "label": "給料月額", "key": "salary100enn", "right": true },
            { "label": "一人当たり平均給料月額", "key": "salaryPerEmployee", "right": true },
        ],
        "badge": {
            title: "ラスパイレス指数",
            value: rasPaires,
            color: getRasPairesGaugeColor(rasPaires)
        },
        "rows": [
            { "name": "一般職員等", "headCount": "", "salary100enn": "", "salaryPerEmployee": "", "isFooter": false, "depth": 0 },
            { "name": "一般職員", "headCount": "職員給与の状況.一般職員等.一般職員.職員数_人", "salary100enn": "職員給与の状況.一般職員等.一般職員.給料月額_百円", "salaryPerEmployee": "職員給与の状況.一般職員等.一般職員.一人当たり平均給料月額_百円", "isFooter": false, "depth": 1 },
            { "name": "うち消防職員", "headCount": "職員給与の状況.一般職員等.うち消防職員.職員数_人", "salary100enn": "職員給与の状況.一般職員等.うち消防職員.給料月額_百円", "salaryPerEmployee": "職員給与の状況.一般職員等.うち消防職員.一人当たり平均給料月額_百円", "isFooter": false, "depth": 2 },
            { "name": "うち技能労務職員", "headCount": "職員給与の状況.一般職員等.うち技能労務職員.職員数_人", "salary100enn": "職員給与の状況.一般職員等.うち技能労務職員.給料月額_百円", "salaryPerEmployee": "職員給与の状況.一般職員等.うち技能労務職員.一人当たり平均給料月額_百円", "isFooter": false, "depth": 2 },
            { "name": "警察官", "headCount": "職員給与の状況.警察官.職員数_人", "salary100enn": "職員給与の状況.警察官.給料月額_百円", "salaryPerEmployee": "職員給与の状況.警察官.一人当たり平均給料月額_百円", "isFooter": false, "depth": 0 },
            { "name": "教育公務員", "headCount": "職員給与の状況.教育公務員.職員数_人", "salary100enn": "職員給与の状況.教育公務員.給料月額_百円", "salaryPerEmployee": "職員給与の状況.教育公務員.一人当たり平均給料月額_百円", "isFooter": false, "depth": 0 },
            { "name": "臨時職員", "headCount": "職員給与の状況.臨時職員.職員数_人", "salary100enn": "職員給与の状況.臨時職員.給料月額_百円", "salaryPerEmployee": "職員給与の状況.臨時職員.一人当たり平均給料月額_百円", "isFooter": false, "depth": 0 },
            { "name": "合計", "headCount": "職員給与の状況.合計.職員数_人", "salary100enn": "職員給与の状況.合計.給料月額_百円", "salaryPerEmployee": "職員給与の状況.合計.一人当たり平均給料月額_百円", "isFooter": true, "depth": 0 },
        ]
    }

    schema.rows = [
        schema.rows[0],
        ...schema.rows.slice(1).map(e => {
            const n = parseFloat(dataItem[e.salaryPerEmployee]) / 10
            let salaryPerEmployee = fmtScore(n)
            if (Number.isNaN(n)) salaryPerEmployee = '-'
            return {
                ...e,
                headCount: fmtScore(dataItem[e.headCount], '人'),
                salary100enn: fmtScore(dataItem[e.salary100enn]),
                salaryPerEmployee,
            }
        })
    ]
    return schema
}

export function DOHUKEN_UI_SyokuinTokubetsu(dataItem) {
    return {
        "title": "特別職等 職員給与の状況",
        "headers": [
            { "label": "職種", "key": "name" },
            { "label": "定数", "key": "headCount", "right": true },
            { "label": "適用開始年月日", "key": "tekiyou", "right": true },
            { "label": "一人当たり平均給料報酬月額", "key": "salaryPerEmployee", "right": true },
        ],
        "rows": [
            { "name": "知事", "headCount": "職員給与の状況.特別職等.知事.定数", "tekiyou": "職員給与の状況.特別職等.知事.適用開始年月日", "salaryPerEmployee": "職員給与の状況.特別職等.知事.一人当たり平均給料報酬月額_百円", "isFooter": false, "depth": 0 },
            { "name": "副知事", "headCount": "職員給与の状況.特別職等.副知事.定数", "tekiyou": "職員給与の状況.特別職等.副知事.適用開始年月日", "salaryPerEmployee": "職員給与の状況.特別職等.副知事.一人当たり平均給料報酬月額_百円", "isFooter": false, "depth": 0 },
            { "name": "教育長", "headCount": "職員給与の状況.特別職等.教育長.定数", "tekiyou": "職員給与の状況.特別職等.教育長.適用開始年月日", "salaryPerEmployee": "職員給与の状況.特別職等.教育長.一人当たり平均給料報酬月額_百円", "isFooter": false, "depth": 0 },
            { "name": "議会議長", "headCount": "職員給与の状況.特別職等.議会議長.定数", "tekiyou": "職員給与の状況.特別職等.議会議長.適用開始年月日", "salaryPerEmployee": "職員給与の状況.特別職等.議会議長.一人当たり平均給料報酬月額_百円", "isFooter": false, "depth": 0 },
            { "name": "議会副議長", "headCount": "職員給与の状況.特別職等.議会副議長.定数", "tekiyou": "職員給与の状況.特別職等.議会副議長.適用開始年月日", "salaryPerEmployee": "職員給与の状況.特別職等.議会副議長.一人当たり平均給料報酬月額_百円", "isFooter": false, "depth": 0 },
            { "name": "議会議員", "headCount": "職員給与の状況.特別職等.議会議員.定数", "tekiyou": "職員給与の状況.特別職等.議会議員.適用開始年月日", "salaryPerEmployee": "職員給与の状況.特別職等.議会議員.一人当たり平均給料報酬月額_百円", "isFooter": false, "depth": 0 },
        ].map(e => ({
            ...e,
            tekiyou: dataItem[e.tekiyou],
            headCount: dataItem[e.headCount],
            salaryPerEmployee: fmtScore(parseFloat(dataItem[e.salaryPerEmployee]) / 10),
        }))
    }
}
