function fmt1000ennToKansuji(n) {
    if (Number.isFinite(n)) {
        const OKU = 10000
        const CHO = 10000 * 10000
        if (n >= OKU) {
            // oku
            const locales = new Intl.Locale("ja")
            return `${(n / OKU).toLocaleString(locales, {
                maximumFractionDigits: 1
            })} 億円`
        } else {
            return `${n.toLocaleString()} 千円`
        }
    }
    return "-"

}

function fmtPercentage(ratio) {
    if (Number.isFinite(ratio)) {
        return `${ratio.toFixed(2)} %`
    } else {
        return "-"
    }
}

function fmtNumber(n) {
    if (Number.isFinite(n)) {
        return n.toLocaleString()
    } else {
        return "-"
    }
}
