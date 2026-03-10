function fmt1000ennToKansuji(n) {
    if (!Number.isFinite(n)) {
        return "-"
    }
    const MAN = 10
    const OKU = 100000
    const CHO = OKU * 10000
    const func = (div, kan) => {
        const locales = new Intl.Locale("ja")

        return `${(n / div).toLocaleString(locales, {
            maximumFractionDigits: 1
        })} ${kan}円`
    }

    if (n >= CHO) {
        return func(CHO, "兆")
    } else if (n >= OKU) {
        return func(OKU, "億")
    } else if (n >= MAN) {
        return func(MAN, "万")
    } else {
        return func(1, "千")
    }
}

function fmt100ennToKansuji(n) {
    if (!Number.isFinite(n)) {
        return '-'
    }

    const SEN = 10
    const MAN = 100
    const OKU = 100000 * 10
    const func = (div, kan) => {
        const locales = new Intl.Locale("ja")
        return `${(n / div).toLocaleString(locales, {
            maximumFractionDigits: 1
        })} ${kan}円`
    }

    if (n >= OKU) {
        return func(OKU, "億")
    } else if (n >= MAN) {
        return func(MAN, "万")
    } else if (n >= SEN) {
        return func(SEN, "千")
    } else {
        return `${n.toLocaleString()} 百円`
    }
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
