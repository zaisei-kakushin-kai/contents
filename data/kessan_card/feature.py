import polars as pl


HEADERS_KESSAN_GAKU = [
    {"name": "項目", "key": "name"},
    {"name": "決算額", "key": "value"},
    {"name": "構成比", "key": "ratio"},
]

HEADERS_SYUNYUZUMI_GAKU = [
    {"name": "項目", "key": "name"},
    {"name": "収入済額", "key": "value"},
    {"name": "超過課税分", "key": "choka"},
    {"name": "歳入構成比", "key": "ratio"},
]

HEADERS_CHOKA_GAKU = [
    {"name": "項目", "key": "name"},
    {"name": "超過課税分", "key": "value"},
    {"name": "歳入構成比", "key": "ratio"},
]

DOHUKEN_KOUHUKIN = [
    "歳入の状況_千円.地方譲与税.決算額",
    "歳入の状況_千円.地方譲与税.内訳.地方揮発油譲与税.決算額",
    "歳入の状況_千円.地方譲与税.内訳.特別とん譲与税.決算額",
    "歳入の状況_千円.地方譲与税.内訳.石油ガス譲与税.決算額",
    "歳入の状況_千円.地方譲与税.内訳.自動車重量譲与税.決算額",
    "歳入の状況_千円.地方譲与税.内訳.航空機燃料譲与税.決算額",
    "歳入の状況_千円.地方譲与税.内訳.森林環境譲与税.決算額",
    "歳入の状況_千円.地方譲与税.内訳.特別法人事業譲与税.決算額",
    "歳入の状況_千円.市町村たばこ税都道府県交付金.決算額"
]


def collect_dohhuken_kohukin():
    stack = []
    for key in DOHUKEN_KOUHUKIN:
        depth = key.count(".")-2
        name = key.replace(
            "歳入の状況_千円.", "").replace(".決算額", "")
        stack.append({"key": key, "depth": depth, "name": name.split(".")[-1]})
    return stack


collect_dohhuken_kohukin()

DOHUKEN_ZEI = [
    '道府県税の状況_千円.普通税.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.個人均等割.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.所得割.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.法人均等割.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.法人税割.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.利子割.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.配当割.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.株式等譲渡所得割.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.事業税.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.事業税.内訳.個人分.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.事業税.内訳.法人分.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.地方消費税.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.不動産取得税.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.道府県たばこ税.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.ゴルフ場利用税.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.軽油引取税.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.自動車税.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.鉱区税.収入済額',
    '道府県税の状況_千円.普通税.法定普通税.固定資産税特例.収入済額',
    '道府県税の状況_千円.普通税.法定外普通税.収入済額',
    '道府県税の状況_千円.目的税.収入済額',
    '道府県税の状況_千円.目的税.法定目的税.収入済額',
    '道府県税の状況_千円.目的税.法定目的税.狩猟税.収入済額',
    '道府県税の状況_千円.目的税.法定外目的税.収入済額',
    '道府県税の状況_千円.旧法による税.収入済額',
    '道府県税の状況_千円.合計.収入済額'
]


def collect_dohukenzei_table():
    stack = []
    for key in DOHUKEN_ZEI:
        depth = key.count(".")-2
        name = key.replace(
            "道府県税の状況_千円.", "").replace(".収入済額", "")
        stack.append({"key": key, "depth": depth, "name": name.split(
            ".")[-1], "isFooter": key == "道府県税の状況_千円.合計.収入済額"})
    return stack


collect_dohukenzei_table()

DOHUKEN_CHOKA_ZEI = [
    '道府県税の状況_千円.普通税.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.個人均等割.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.所得割.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.法人均等割.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.法人税割.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.利子割.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.配当割.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.道府県民税.株式等譲渡所得割.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.事業税.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.事業税.内訳.個人分.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.事業税.内訳.法人分.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.地方消費税.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.不動産取得税.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.道府県たばこ税.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.ゴルフ場利用税.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.軽油引取税.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.自動車税.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.鉱区税.超過課税分',
    '道府県税の状況_千円.普通税.法定普通税.固定資産税特例.超過課税分',
    '道府県税の状況_千円.普通税.法定外普通税.超過課税分',
    '道府県税の状況_千円.目的税.超過課税分',
    '道府県税の状況_千円.目的税.法定目的税.超過課税分',
    '道府県税の状況_千円.目的税.法定目的税.狩猟税.超過課税分',
    '道府県税の状況_千円.目的税.法定外目的税.超過課税分',
    '道府県税の状況_千円.旧法による税.超過課税分',
    '道府県税の状況_千円.合計.超過課税分'
]


def collect_dohukenzei_choka_table():
    stack = []
    for key in DOHUKEN_ZEI:
        depth = key.count(".")-2
        name = key.replace(
            "道府県税の状況_千円.", "").replace(".超過課税分", "")
        stack.append({"key": key, "depth": depth, "name": name.split(
            ".")[-1], "isFooter": "道府県税の状況_千円.合計.超過課税分"})
    return stack


collect_dohukenzei_choka_table()

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


def collect_sichoson_table():
    stack = []
    for key in SICHOSON_ZEI:
        depth = key.count(".")-2
        name = key.replace(
            "市町村税の状況_千円.", "").replace(".収入済額", "")
        stack.append({"key": key, "depth": depth, "name": name.split(
            ".")[-1], "isFooter": key == "市町村税の状況_千円.合計.収入済額"})
    return stack


collect_sichoson_table()

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


def collect_sichoson_choka_table():
    stack = []
    for key in CHOKA_KAZEI:
        depth = key.count(".")-2
        name = key.replace(
            "市町村税の状況_千円.", "").replace(".超過課税分", "")
        stack.append({"key": key, "depth": depth, "name": name.split(
            ".")[-1], "isFooter": key == "市町村税の状況_千円.合計.超過課税分"})
    return stack


def datatable_key():
    return [
        {
            "title": "歳入の状況",
            "rows": collect_dohhuken_kohukin()
        },
        {
            "title": "道府県税の状況",
            "rows": collect_dohukenzei_table()
        },
        {
            "title": "超過課税の状況",
            "rows": collect_dohukenzei_choka_table()
        },
        {
            "title": "市町村税の状況",
            "rows": collect_sichoson_table()
        },
        {
            "title": "超過課税の状況",
            "rows": collect_sichoson_choka_table()
        }
    ]


collect_dohukenzei_table()

ROW_COLS = {
    "人口.住民基本台帳人口.令6_1_1": "人口",
    "面積_km2": "面積",
    "収支状況_千円.歳入総額.令和5年度": "歳入総額",
    "収支状況_千円.歳出総額.令和5年度": "歳出総額",
}


def create_card_data(df: pl.DataFrame, isDnatai: bool):
    if isDnatai:
        return df.select(*[
            pl.col("id"),
            pl.col('団体コード').cast(pl.Int32).alias("dantaiCode"),
            pl.col('都道府県コード').cast(pl.Int32).alias("todohukenCode"),
            pl.col("団体名").alias("title"),
            pl.col("都道府県名").alias("subtitle"),
            pl.col("市町村類型").alias("badge"),
            pl.concat_list([
                pl.struct(
                    pl.lit(label).alias("label"),
                    pl.col(col).cast(pl.Float64).alias("value"))
                for col, label in ROW_COLS.items()
            ]).alias("rows")
        ]).with_columns(pl.col(pl.Utf8).cast(pl.Categorical))
    else:
        return df.select(*[
            pl.col("id"),
            pl.lit(0).cast(pl.Int32).alias("dantaiCode"),
            pl.col('都道府県コード').cast(pl.Int32).alias("todohukenCode"),
            pl.col("都道府県名").alias("title"),
            pl.col("都道府県名").alias("subtitle"),
            pl.lit("都道府県").alias("badge"),
            pl.concat_list([
                pl.struct(
                    pl.lit(label).alias("label"),
                    pl.col(col).cast(pl.Float64).alias("value"))
                for col, label in ROW_COLS.items()
            ]).alias("rows")
        ]).with_columns(pl.col(pl.Utf8).cast(pl.Categorical))


def create_id(df: pl.DataFrame):
    try:
        df = df.with_columns(pl.concat_str(pl.lit('c'), pl.col('都道府県コード'),
                                           pl.lit('-'), pl.col('団体コード')).alias('id'))
    except:
        df = df.with_columns(pl.concat_str(
            pl.lit('c'), pl.col('都道府県コード')).alias('id'))

    return df


def zeimoku(df: pl.DataFrame):
    ippann = pl.col("歳入の状況_千円.一般財源計.決算額")
    goukei = pl.col("歳入の状況_千円.歳入合計.決算額")
    stack = []

    df = create_id(df)

    COL_LIST = SICHOSON_ZEI+DOHUKEN_ZEI+DOHUKEN_KOUHUKIN

    COL_LIST_SET = list(set(COL_LIST).intersection(set(df.columns)))

    ippanratio_df = df.select(pl.col("id"), (pl.col(
        COL_LIST_SET)/ippann*100).name.suffix(".ratio_ippan"))

    ratio_df = df.select(pl.col("id"), (pl.col(
        COL_LIST_SET)/goukei*100).name.suffix(".ratio"))

    for i in SICHOSON_ZEI+DOHUKEN_ZEI+DOHUKEN_KOUHUKIN:
        try:
            df.get_column(i)
        except:
            continue

        _df = df.unpivot(
            on=[i],
            index=['id'],
            variable_name="zeimoku",
            value_name="gaku",
        )
        _ratiodf = ratio_df.unpivot(
            on=[f"{i}.ratio"],
            index=['id'],
            variable_name="zeimoku",
            value_name="ratio",
        )
        _ippanratio_df = ippanratio_df.unpivot(
            on=[f"{i}.ratio_ippan"],
            index=['id'],
            variable_name="zeimoku",
            value_name="ratio_ippan",
        )
        stack.append(_df.join(on="id", other=_ratiodf).drop(
            'zeimoku_right').join(on="id", other=_ippanratio_df).drop(
            'zeimoku_right'))

        df = stack[0]
        if len(stack) > 1:
            for i in stack[1:]:
                df = df.vstack(other=i)

    return df.with_columns(pl.col("id").cast(pl.Categorical)).with_columns(
        pl.col("zeimoku").cast(pl.Categorical))


def main():
    # -----------
    # add ID
    # -----------
    df1 = create_id(pl.read_parquet("./r5_kessan_data.parquet")
                    ).with_columns(pl.col(pl.Int64))
    df2 = create_id(pl.read_parquet("./r5_kessan_todohuken.parquet")
                    ).with_columns(pl.col(pl.Int64))

    df1.write_parquet(
        "./r5_kessan/r5_kessan_data.parquet", compression="snappy")
    df2.write_parquet(
        "./r5_kessan/r5_kessan_todohuken.parquet", compression="snappy")

    # -----------
    # per zeimoku
    # -----------
    df3 = zeimoku(df1).vstack(zeimoku(df2))
    df3.write_parquet("./zeimoku.parquet", compression="snappy")

    # -----------
    # named card
    # -----------
    df4 = create_card_data(df1, True).vstack(create_card_data(df2, False))

    df4.write_parquet(
        "./r5_kessan/r5_kessan_data_named_card.parquet", compression="snappy")

    return df4


df = main()
