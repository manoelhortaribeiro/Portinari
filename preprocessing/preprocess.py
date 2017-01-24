# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
#                                     # / ---------------------------- \ #                                             #
#                                     # | AUTHOR: MANOEL HORTA RIBEIRO | #                                             #
#                                     # \ ---------------------------- / #                                             #
#                                                                                                                      #
# This script does the whole preprocessing of the two files. Basically it:                                             #
#                                                                                                                      #
# 1. rename         - Rename the categorical values of some attributes as specified by config file.                    #
#                                                                                                                      #
# 2. preprocess     - Creates two attributes ´age´ and ´sincelast´, derived from ´eventdate´ and ´entitycreation´.     #
#                   - Fill empty attributes as specified by the config file.                                           #
#                   - Drop columns as specified by the config file.                                                    #
#                   - Ignore rows with invalid values as specified by the config file.                                 #
#                   - Group distinct categorical attributes as specified by the config file.                           #
#                   - Does the conversion from date string to int as specified by config file.                         #
#                   - Does type casting as specified by the config file.                                               #
#                                                                                                                      #
# 3. merge          - Merge categorical attr in order, w/ number of max elements and priority sppec by config file.    #
#                                                                                                                      #
# 4. make_tables    -  Make relational-like tables. The separation betw. events and entity is spec by config file.     #
#                                                                                                                      #
#                                                                                                                      #
# The config file contains the following fields                                                                        #
#                                                                                                                      #
#  "variables" : // if variables are not specified they will be treated according to default configurations.           #
#  {                                                                                                                   #
#    (name_in_row): {                                                                                                  #
#                     "new_name": string w/ name the attribute will have in the new datafile, MBD unless dropcol=true, #
#                     "new_type": (int|float|string) Type in the new datafile, MBD unless dropcol=true,                #
#                     "renaming": hash containing ´old_categorical_val´ : ´new_categorical_val´, OPTIONAL,             #
#                     "merge": (master|slave|false) if master, will define the order, if slave follows it, OPTIONAL,   #
#                     "merge_number": 2, defined in master, max merged attributes, if merge=master, MBD,               #
#                     "merge_order": list containing the order of (possibly renamed attributes), if merge=master, MBD, #
#                     "event"/"entity": (true|false) specified destination tables, if not defined, defined by standard,#
#                     "index": (true|false) only possible for "entity" categorical values, OPTIONAL,                   #
#                     "index_name": name for the index, if index=true, MBD,                                            #
#                     "drop_val": list containing attributes values not allowed, OPTIONAL,                             #
#                     "drop_col": (true|false) list w/ attr to drop, if true, should be the only value, OPTIONAL,      #
#                     "conversion": (to_sec|to_min|to_hour|to_day|to_week|to_month|to_year), OPTIONAL                  #
#                    }                                                                                                 #
#      ...                                                                                                             #
# }                                                                                                                    #
#                                                                                                                      #
#  "id": name of id attribute in dataset, MBD,                                                                         #
#  "eventnumber": number of the event in future dataset, MBD,                                                          #
#  "groupsize": number of group event in future dataset, MBD,                                                          #
#                                                                                                                      #
#  "default": (event|entity) default table where undescribed variables go, MBD,                                        #
#  "default_type": (int|float|str) default type of undescribed varibles, MBD,                                          #
#  "time_format": (%d.%m.%Y|...) format of the dates in the original dataset, MBD,                                     #
#                                                                                                                      #
#  "nan_int": value for non defined integers in new dataset, MBD,                                                      #
#  "nan_float": value for non defined floats in new dataset, MBD,                                                      #
#  "nan_str": value for non defined strings in new dataset, MBD,                                                       #
#                                                                                                                      #
#  "sincelast": name of sincelast attribute in future dataset, MBD if age or entity creation or eventdate are,         #
#  "age": name of age attribute in future dataset, MBD if age or entity creation or eventdate are,                     #
#  "eventdate": name of eventdate attribute in current dataset, MBD if age or entity creation or eventdate are,        #
#  "entitycreation": name of eventcreation attribute in curr dataset, MBD if age or entity creation or eventdate are   #
#                                                                                                                      #
#  "directory": path to directory where the data is, MBD,                                                              #
#  "name": name of the file, MBD,                                                                                      #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
#  Some relevant observations are that:                                                                                #
#  - Renaming takes place before dropping the values                                                                   #
#  - Dropping values take place before filling in NaN, so you can't drop NaN in this script                            #
#  - All indexable variables have to be of the type:                                                                   #
#  - There can't be indexes without sincelast attribute                                                                #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #


from multiprocessing import Pool
import pandas as pd
import collections
import numpy as np
import functools
import datetime
import json
import pandas
import time
import csv
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


def drop_cols(default, table_type, var, all, index_disp=[], age="", sincelast="", groupsize="", dnumber=""):
    to_drop = []
    names = []
    for col in var:
        if "drop_col" in var[col] and var[col]["drop_col"] == "true":
            continue
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
        if col not in names and col not in index_disp and col not in [age, sincelast, groupsize, dnumber]:
            if default == "entity" and table_type == "event":
                to_drop.append(col)
            elif default == "event" and table_type == "entity":
                to_drop.append(col)

        if col in index_disp and table_type == "event":
            to_drop.append(col)
        if col in [age, sincelast, groupsize, dnumber] and table_type == "entity":
            to_drop.append(col)
    return to_drop


def time_flags(flag):
    if flag == "to_sec":
        ms = 1
    elif flag == "to_min":
        ms = 60
    elif flag == "to_hour":
        ms = 3600
    elif flag == "to_day":
        ms = 86400
    elif flag == "to_week":
        ms = 604800
    elif flag == "to_month":
        ms = 2628000
    elif flag == "to_year":
        ms = 31536000
    return ms


def type_flags(flag, info=None):
    if flag == "int":
        if info is not None and type(info) is str and len(info) > 2 and info[-2:] == ".0":
            f = lambda a: int(a[:-2])
        else:
            f = functools.partial(int)

    elif flag == "float":
        f = functools.partial(float)
    else:
        f = functools.partial(str)
    return f


def nan_flags(flag, config):
    if flag == "int":
        nan = config["nan_int"]
    elif flag == "float":
        nan = config["nan_float"]
    else:
        nan = config["nan_string"]
    return nan


def to_unix(st, flag, config):
    ms = time_flags(flag)

    return config["nan_int"] if st == "" else int(
            np.floor(int(time.mktime(datetime.datetime.strptime(st, config["time_format"]).timetuple())) / ms))


# ---- Scripts ----


# rename


def rename(path, dest, config):
    df = pandas.read_csv(path)
    var = config["variables"]

    for i in var:
        if "renaming" in var[i]:
            loc = list(df.columns.values).index(i)
            table = df.values

            for row in range(len(table)):
                f = type_flags(var[i]["new_type"], info=str(table[row][loc]))
                table[row][loc] = f(var[i]["renaming"][str(table[row][loc])])

            df = pandas.DataFrame(table, columns=df.columns)

        if "new_name" in var[i]:
            df.rename(columns={i: var[i]["new_name"]}, inplace=True)

    df.to_csv(dest, index=False)


# preprocess


def pre_process(path, dest, config):
    var = config["variables"]

    # Open files
    input_file, output_file = open(path, 'r'), open(dest, 'w')
    csv_in = csv.DictReader(input_file)

    attr = csv_in.fieldnames

    if "sincelast" in config and "age" in config and "eventdate" in config and "entitycreation" in config:
        attr = attr + [config["sincelast"], config["age"]]

    for col in var:
        if "drop_col" in var[col] and var[col]["drop_col"] == "true":
            attr.remove(col)

    csv_out = csv.DictWriter(output_file, attr)

    p_row_id, p_diag_date = -1, -1  # Silly control variables

    csv_out.writeheader()

    for row in csv_in:

        # fills nans in the dataset with established default
        all_n, names, types, drops, invalid_row = [], [], [], [], False

        for col in var:

            if "new_name" in var[col]:
                all_n.append(var[col]["new_name"])

            if "new_name" in var[col] and "conversion" not in var[col]:
                names.append(var[col]["new_name"])
                types.append(var[col]["new_type"])

            if "drop_col" in var[col] and var[col]["drop_col"] == "true":
                drops.append(col)
                row.pop(col)  # Drop invalid columns

            if "conversion" in var[col]:
                drops.append(var[col]["new_name"])

            if "drop_val" in var[col] and row[var[col]["new_name"]] in var[col]["drop_val"]:
                invalid_row = True

        # drop rows with invalid values
        if invalid_row:
            continue

        for val in row:
            if row[val] == "" or row[val] == " ":

                if val in names:
                    idx = names.index(val)
                    row[val] = nan_flags(types[idx], config)

                elif val not in drops:
                    row[val] = nan_flags(config["default_type"], config)

            if val not in all_n:
                f = type_flags(config["default_type"], info=row[val])
                row[val] = f(row[val])

        # does type unix conversion, casting and grouping
        for col in var:

            i = var[col]

            if "conversion" in i:
                row[i["new_name"]] = to_unix(row[i["new_name"]], i["conversion"], config)

            if "grouping" in i:
                row[i["new_name"]] = i["grouping"][row[i["new_name"]]]

            if "new_type" in i:
                f = type_flags(i["new_type"])
                row[i["new_name"]] = f(row[i["new_name"]])

        if "sincelast" in config and "age" in config and "eventdate" in config and "entitycreation" in config:
            # calculates new attributes
            row[config["sincelast"]] = row[config["eventdate"]] - p_diag_date if row[config["id"]] == p_row_id else 0
            row[config["age"]] = row[config["eventdate"]] - row[config["entitycreation"]]
            # gets data for this row for the future iteration
            p_diag_date, p_row_id = row[config["eventdate"]], row[config["id"]]

        # writes row
        csv_out.writerow(row)


# merge


def merge(table, config):
    # Prints the progress and does garbage collection manually
    if table[config["id"]].head(1).values[0] % 50000 == 0:
        print(table[config["id"]].head(1).values[0])
        gc.collect()

    # Copies the table
    tmp = table.copy(deep=True)
    tmp.reset_index(drop=True)
    tmp[config["eventnumber"]] = range(1, len(tmp[config["id"]].values) + 1)

    # Creates the dictionary with date:row number
    dictionary = collections.OrderedDict()
    values = tmp[config["eventdate"]].values
    for num, date in enumerate(values):
        if date in dictionary:
            dictionary[date].append(num + 1)
        else:
            dictionary[date] = [num + 1]

    # Creates the field for number of events that happened in a day
    number_exams = {}
    for key, item in dictionary.items():
        for i in item:
            number_exams[i] = len(item)

    orderd_dgs, dgs = collections.OrderedDict(number_exams), []

    for k, v in orderd_dgs.items():
        dgs.append(v)

    tmp[config["groupsize"]] = pandas.Series(dgs, index=tmp.index)

    # Merge the events in a given day
    var = config["variables"]
    master_disp = ""
    master_name = ""
    slaves_names = []
    to_drop = []
    acc = 0

    for col in var:
        if "merge" in var[col] and var[col]["merge"] == "master":
            master_disp = var[col]["new_name"]
            master_name = col
        if "merge" in var[col] and var[col]["merge"] == "slave":
            slaves_names.append(var[col]["new_name"])

    for key, item in dictionary.items():
        master = []
        slaves = []

        for d in slaves_names:
            slaves.append([])

        for i in item:
            row_of_int = tmp[tmp[config["eventnumber"]] == i].iloc[0].values
            loc_master = list(tmp.columns.values).index(master_disp)
            ids = 0
            for slave in slaves_names:
                loc_slave = list(tmp.columns.values).index(slave)
                slaves[ids].append(str(int(row_of_int[loc_slave])))
                ids += 1

            master.append(str(int(row_of_int[loc_master])))

        merge_number, merge_order = int(var[master_name]["merge_number"]), var[master_name]["merge_order"]
        taken = np.array([False] * len(master))

        for event in merge_order:
            if merge_number == 0:
                break
            occurences = [i for i, val in enumerate(master) if val == event]

            for i in occurences:
                if merge_number == 0:
                    break
                taken[i] = True
                merge_number -= 1

        idx = list(taken).index(True)
        to_drop = to_drop + item[:idx] + item[idx + 1:]
        master = list(np.array(master)[taken])
        slaves = list(map(lambda slave: list(np.array(slave)[taken]), slaves))
        tmp.set_value(tmp.index[acc + idx], master_disp, '0'.join(master))
        ids = 0
        for slave in slaves_names:
            tmp.set_value(tmp.index[acc + idx], slave, '0'.join(slaves[ids]))
            ids += 1

        acc += len(item)

    if len(to_drop) > 0:
        to_drop = list(map(lambda a: a - 1, to_drop))

        tmp.drop(tmp.index[to_drop], inplace=True)

    tmp[config["eventnumber"]] = range(1, len(tmp[config["id"]].values) + 1)

    return tmp


def merge_groups(ran, df, dest, config):
    has_header = False
    if ran[0] == 0:
        has_header = True
    df = df.query(config["id"] + ' >= ' + str(ran[0]))
    df = df.query(config["id"] + ' < ' + str(ran[1]))
    f = functools.partial(merge, config=config)
    df = df.groupby(config["id"]).apply(f)
    df = df.reset_index(drop=True)
    gc.collect()
    df.to_csv(dest + 'r' + str(ran[0]) + str(ran[1]), mode='w', index=False, header=has_header)


def merge_groups_parallel(path, dest, config):
    df = pandas.read_csv(path)

    f = functools.partial(merge_groups, df=df, dest=dest, config=config)

    range_of = list(zip(list(range(0, 1000000, 25000)), list(range(25000, 1000000, 25000))))

    with Pool(2) as p:
        p.map(f, range_of)

    os.system('cat ' + dest + 'r* > ' + dest)
    os.system('rm ' + dest + 'r*')


# make_tables


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


def make_patient_tables(ran, df, dest, config, index_vars, index_disp):
    has_header = False
    if ran[0] == 0:
        has_header = True

    f = functools.partial(make_individual_patient_table, config=config, index_vars=index_vars, index_disp=index_disp)

    df = df.query(config["id"] + ' >= ' + str(ran[0]))
    df = df.query(config["id"] + ' < ' + str(ran[1]))

    df = df.groupby(config["id"]).apply(f)

    df.to_csv(dest + 'r' + str(ran[0]) + str(ran[1]), mode='w', index=False, header=has_header)


def make_exams_tables(df, dest, config):
    df.drop(drop_cols(config["default"], "event", config["variables"], df.columns, age=config["age"],
                      sincelast=config["sincelast"], groupsize=config["groupsize"], dnumber=config["eventnumber"]),
            axis=1, inplace=True)
    df.to_csv(dest, mode='w', index=False)


def make_tables_parallel(source, patient_dest, exams_dest, config):
    main_df = pd.read_csv(source)
    make_exams_tables(main_df, exams_dest, config)

    main_df = pd.read_csv(source)
    index_vars, index_disp, var = [], [], config["variables"]

    for col in var:
        if "index" in var[col] and var[col]["index"] == "true":
            index_vars.append(var[col]["new_name"])
            index_disp.append(var[col]["index_name"])

    f = functools.partial(make_patient_tables, df=main_df, dest=patient_dest, config=config, index_disp=index_disp,
                          index_vars=index_vars)

    range_of = list(zip(list(range(0, 1000000, 100000)), list(range(100000, 1100000, 100000))))

    with Pool(2) as p:
        p.map(f, range_of)

    os.system('cat ' + patient_dest + 'r* > ' + patient_dest)
    os.system('rm ' + patient_dest + 'r*')
    main_df = pd.read_csv(patient_dest)
    main_df.drop(
        drop_cols(config["default"], "entity", config["variables"], main_df.columns,
                  index_disp=index_disp, age=config["age"], sincelast=config["sincelast"],
                  groupsize=config["groupsize"], dnumber=config["eventnumber"]),
        axis=1, inplace=True)
    main_df.to_csv(patient_dest, mode='w', index=False)


# all together in nice way


def make_all(config, r_rename=True, r_preprocess=True, r_grouped=True):
    raw_dir = config["directory"]
    name = config["name"]

    # paths
    original_path = raw_dir + name
    changed_diagnosis = raw_dir + "rename_" + name
    preprocessed = raw_dir + "pre_" + name
    grouped = raw_dir + "grouped_" + name
    entity_dest = raw_dir + "entity_" + name
    event_dest = raw_dir + "events_" + name

    # change diagnosis
    rename(path=original_path, dest=changed_diagnosis, config=config)

    # # pre-process the tables
    pre_process(path=changed_diagnosis, dest=preprocessed, config=config)

    # # group different diagnosis, drop rows
    merge_groups_parallel(path=preprocessed, dest=grouped, config=config)

    # # makes tables
    make_tables_parallel(source=grouped, patient_dest=entity_dest, exams_dest=event_dest, config=config)

    if r_rename is True:
        os.remove(changed_diagnosis)
    if r_preprocess is True:
        os.remove(preprocessed)
    if r_grouped is True:
        os.remove(grouped)


if __name__ == "__main__":
    mixed_config = json.loads(open("./data/surveys/meta/survey_both.json", "r").read())
    make_all(mixed_config)
