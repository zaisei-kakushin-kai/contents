import msgpack
import polars as pl
from pathlib import Path

AKAJI_BOUNDARY = [
    2,   # 2000円       時給の壁
    15,  # 15,000円     日給の壁
    350,  # 350,000円    月給の壁
    3000,  # 300万円 年収の壁
]

HUSAISAN_BOUNDARY = [
    0.01,  # 一般財源の0.01 %未満
    0.03,  # 一般財源の0.03 %未満
    0.05,  # 一般財源の0.05 %未満
]

AKAJI_NAME_LIST = [
    "時給の壁",
    "日給の壁",
    "月給の壁",
    "100万円の壁",
]


def load_data():
    path = "D:/projects/zaisei-kakushin-kai/data/kessan_card/r5_kessan_data.msgpack"
    fp = open(path, "rb")
    data = msgpack.unpack(fp)

    return pl.DataFrame(data)


SICHOSON_ZEI = [
    "市町村税の状況_千円.普通税.合計.収入済額",
    "市町村税の状況_千円.普通税.法定普通税.合計.収入済額",
    "市町村税の状況_千円.普通税.法定普通税.市町村民税.合計.収入済額",
    "市町村税の状況_千円.普通税.法定普通税.市町村民税.個人均等割.収入済額",
    "市町村税の状況_千円.普通税.法定普通税.市町村民税.所得割.収入済額",
    "市町村税の状況_千円.普通税.法定普通税.市町村民税.法人均等割.収入済額",
    "市町村税の状況_千円.普通税.法定普通税.市町村民税.法人税割.収入済額",
    "市町村税の状況_千円.普通税.法定普通税.固定資産税.収入済額",
    "市町村税の状況_千円.普通税.法定普通税.固定資産税.うち純固定資産税.収入済額",
    "市町村税の状況_千円.普通税.法定普通税.軽自動車税.収入済額",
    "市町村税の状況_千円.普通税.法定普通税.市町村たばこ税.収入済額",
    "市町村税の状況_千円.普通税.法定普通税.鉱産税.収入済額",
    "市町村税の状況_千円.普通税.法定普通税.特別土地保有税.収入済額",
    "市町村税の状況_千円.普通税.法定外普通税.収入済額",
    "市町村税の状況_千円.目的税.合計.収入済額",
    "市町村税の状況_千円.目的税.法定目的税.入湯税.収入済額",
    "市町村税の状況_千円.目的税.法定目的税.事業所税.収入済額",
    "市町村税の状況_千円.目的税.法定目的税.都市計画税.収入済額",
    "市町村税の状況_千円.目的税.法定目的税.水利地益税等.収入済額",
    "市町村税の状況_千円.目的税.法定外目的税.収入済額",
    "市町村税の状況_千円.旧法による税.収入済額",
    "市町村税の状況_千円.合計.収入済額",
]

CHOKA_KAZEI = [
    "市町村税の状況_千円.普通税.合計.超過課税分",
    "市町村税の状況_千円.普通税.法定普通税.合計.超過課税分",
    "市町村税の状況_千円.普通税.法定普通税.市町村民税.合計.超過課税分",
    "市町村税の状況_千円.普通税.法定普通税.市町村民税.個人均等割.超過課税分",
    "市町村税の状況_千円.普通税.法定普通税.市町村民税.所得割.超過課税分",
    "市町村税の状況_千円.普通税.法定普通税.市町村民税.法人均等割.超過課税分",
    "市町村税の状況_千円.普通税.法定普通税.市町村民税.法人税割.超過課税分",
    "市町村税の状況_千円.普通税.法定普通税.固定資産税.超過課税分",
    "市町村税の状況_千円.普通税.法定普通税.固定資産税.うち純固定資産税.超過課税分",
    "市町村税の状況_千円.普通税.法定普通税.軽自動車税.超過課税分",
    "市町村税の状況_千円.普通税.法定普通税.市町村たばこ税.超過課税分",
    "市町村税の状況_千円.普通税.法定普通税.鉱産税.超過課税分",
    "市町村税の状況_千円.普通税.法定普通税.特別土地保有税.超過課税分",
    "市町村税の状況_千円.普通税.法定外普通税.超過課税分",
    "市町村税の状況_千円.目的税.合計.超過課税分",
    "市町村税の状況_千円.目的税.法定目的税.入湯税.超過課税分",
    "市町村税の状況_千円.目的税.法定目的税.事業所税.超過課税分",
    "市町村税の状況_千円.目的税.法定目的税.都市計画税.超過課税分",
    "市町村税の状況_千円.目的税.法定目的税.水利地益税等.超過課税分",
    "市町村税の状況_千円.目的税.法定外目的税.超過課税分",
    "市町村税の状況_千円.旧法による税.超過課税分",
    "市町村税の状況_千円.合計.超過課税分",
]


def topics_choka(df: pl.DataFrame):
    listCols = CHOKA_KAZEI
    fil_col = None
    for col in listCols:
        s = df.get_column(col)
        if s.name.endswith('超過課税分') and not s.dtype.is_(pl.Null):
            c = pl.col(col).gt(0)
            if fil_col is None:
                fil_col = c
            else:
                fil_col = fil_col.or_(c)

    return df.filter(fil_col).filter(pl.any_horizontal(pl.col(c).is_not_null() for c in CHOKA_KAZEI))


def topics_husaisan_choka(df: pl.DataFrame):
    df = df.clone()
    checkCols = []
    for col in CHOKA_KAZEI:
        colRoot = None
        for lt_eq, val in zip(AKAJI_BOUNDARY, AKAJI_NAME_LIST):
            if colRoot is None:
                colRoot = pl.when(pl.col(col).le(lt_eq)).then(pl.lit(val))
            else:
                colRoot = colRoot.when(pl.col(col).le(lt_eq)).then(pl.lit(val))

        for val in HUSAISAN_BOUNDARY:
            _c = (pl.col(col) / pl.col("歳入の状況_千円.一般財源計.決算額") * 100).lt(val)
            colRoot = colRoot.when(_c).then(pl.lit(f"{val}%未満"))

        segments = col.split(".")[:-1]
        segments.extend(["不採算超過税"])
        husaisanRuikei = ".".join(segments)
        df = df.with_columns(colRoot.otherwise(None).alias(husaisanRuikei))

        checkCols.append(husaisanRuikei)

    cols = ['都道府県コード', '団体コード']
    cols.extend(checkCols)
    return df.select(cols).filter(pl.any_horizontal(pl.col(c).is_not_null() for c in checkCols))


def topics_akaji_zei(df: pl.DataFrame):
    df = df.clone()

    checkCols = []
    for col in SICHOSON_ZEI:
        colRoot = None
        for r, name in zip(AKAJI_BOUNDARY, AKAJI_NAME_LIST):
            if colRoot is None:
                colRoot = pl.when(pl.col(col).le(r)).then(pl.lit(name))
            else:
                colRoot = colRoot.when(pl.col(col).le(r)).then(pl.lit(name))

        segments = col.split(".")[:-1]
        segments.extend(["赤字税類型"])
        akajiRuikei = ".".join(segments)
        df = df.with_columns(colRoot.otherwise(None).alias(akajiRuikei))

        checkCols.append(akajiRuikei)

    cols = ['都道府県コード', '団体コード']
    cols.extend(checkCols)
    return df.select(cols).filter(pl.any_horizontal(pl.col(c).is_not_null() for c in checkCols))


def topics_husaisan_zei(df: pl.DataFrame):
    df = df.clone()
    checkCols = []
    for c in SICHOSON_ZEI:
        colMath = (pl.col(c)/pl.col("歳入の状況_千円.一般財源計.決算額")*100)
        colRoot = None
        for husaisanVal in HUSAISAN_BOUNDARY:
            if colRoot is None:
                colRoot = pl.when(colMath.le(husaisanVal)).then(
                    pl.lit(f"{husaisanVal}%未満"))
            else:
                colRoot = colRoot.when(colMath.le(
                    husaisanVal)).then(pl.lit(f"{husaisanVal}%未満"))

        segments = c.split(".")[:-1].copy()
        segments.append("不採算税類型")
        husaisanzei = ".".join(segments)
        df = df.with_columns(colRoot.otherwise(None).alias(husaisanzei))

        checkCols.append(husaisanzei)

    cols = ['都道府県コード', '団体コード']
    cols.extend(checkCols)
    return df.select(cols).filter(
        pl.any_horizontal(pl.col(c).is_not_null() for c in checkCols)
    )


def main(output_path):
    output_pathobj = Path(output_path)
    df = load_data()
    return {
        "choka": topics_choka(df),
        "akaji_zei": topics_akaji_zei(df),
        "husaisan_zei": topics_husaisan_zei(df),
        "husaisan_choka": topics_husaisan_choka(df)
    }


df = main("D:/projects/zaisei-kakushin-kai/data/kessan_card/")

_df = df["akaji_zei"]
_df
