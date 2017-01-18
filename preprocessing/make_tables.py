# # ---------------------------- # # # # #
# # AUTHOR: MANOEL HORTA RIBEIRO # # # # #
# # ---------------------------- # # # # #
# This python file contains functions that given a huge processed csv file, and
# f) splits the big csv into two tables, an entity table and an event table.
# g) creates indexes for the selected attributes in the events in the entity table.


from multiprocessing import Pool
import pandas as pd
import functools
import gc
import os


# ---- Helpers ----


def bool_drop(default, table, event, entity):
    if event == "nothing" and entity == "nothing":
        if table == "entity" and default == "event":
            return True
        if table == "event" and default == "entity":
            return True
    if event == "true" and entity != "true" and table == "entity":
        return True
    if event != "true" and entity == "true" and table == "event":
        return True
    return False


def drop_cols(default, table_type, var, all, index_disp=[]):
    to_drop = []
    names = []
    for col in var:
        entity, event = "nothing", "nothing"
        if "new_name" in var[col]:
            names.append(var[col]["new_name"])
        if "entity" in var[col] and var[col]["entity"] == "true":
            entity = "true"
        if "event" in var[col] and var[col]["event"] == "true":
            event = "true"
        if bool_drop(default, table_type, event, entity):
            if "new_name" in var[col]:
                to_drop.append(var[col]["new_name"])
            elif "drop_col" not in var[col]:
                to_drop.append(col)

    for col in all:
        if col not in names and col not in index_disp:
            if default == "entity" and table_type == "event":
                to_drop.append(col)
            elif default == "event" and table_type == "entity":
                to_drop.append(col)

    return to_drop


# ---- Scripts ----


def make_individual_patient_table(x, config, index_vars, index_disp):

    if x[config["id"]].head(1).values[0] % 50000 == 0:
        gc.collect()

    new_x = x.head(1)

    for val, disp in zip(index_vars, index_disp):
        string_rep = ""

        for i, j in zip(x[config["sincelast"]].values, x[val].values):
            string_rep += 't{0}d{1}'.format(i, j)

        new_x.set_value(new_x.index[0], disp, string_rep)

    return new_x


def make_patient_tables(ran, df, dest, config):
    has_header = False
    if ran[0] == 0:
        has_header = True

    index_vars, index_disp, var = [], [], config["variables"]

    for col in var:
        if "index" in var[col] and var[col]["index"] == "true":
            index_vars.append(var[col]["new_name"])
            index_disp.append(var[col]["index_name"])

    f = functools.partial(make_individual_patient_table, config=config, index_vars=index_vars, index_disp=index_disp)

    df = df.query(config["id"] + ' >= ' + str(ran[0]))
    df = df.query(config["id"] + ' < ' + str(ran[1]))

    patients_table_raw = df.groupby(config["id"]).apply(f)

    df.drop(drop_cols(config["default"], "entity", config["variables"], df.columns, index_disp), axis=1, inplace=True)

    patients_table_raw.to_csv(dest + 'r' + str(ran[0]) + str(ran[1]), mode='w', index=False, header=has_header)


def make_exams_tables(df, dest, config):
    df.drop(drop_cols(config["default"], "event", config["variables"], df.columns), axis=1, inplace=True)
    df.to_csv(dest, mode='w', index=False)


def make_tables_parallel(source, patient_dest, exams_dest, config):
    main_df = pd.read_csv(source)

    f = functools.partial(make_patient_tables, df=main_df, dest=patient_dest, config=config)

    range_of = list(zip(list(range(0, 1000000, 100000)), list(range(100000, 1100000, 100000))))

    with Pool(2) as p:
        list(map(f, range_of))

    os.system('cat ' + patient_dest + 'r* > ' + patient_dest)
    os.system('rm ' + patient_dest + 'r*')

    make_exams_tables(main_df, exams_dest, config)
