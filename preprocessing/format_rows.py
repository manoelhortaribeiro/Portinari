# # ---------------------------- # # # # #
# # AUTHOR: MANOEL HORTA RIBEIRO # # # # #
# # ---------------------------- # # # # #
# This python file contains functions that given a huge unprocessed csv file:
# a) Rename the diagnosis numbers.
# b) Rename the type numbers.
# c) Rename the variable names.
# d) creates a new variable called, sincelast, with relative time, and another one called age.
# e) drop entire columns, and possibly, events with certain diagnosis.

from multiprocessing import Pool
import collections
import numpy as np
import functools
import datetime
import pandas
import time
import csv
import os
import gc


# ---- Helpers ----


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
        ms = 2592000
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
            np.floor(int(time.mktime(datetime.datetime.strptime(st, "%d.%m.%Y").timetuple())) / ms))


# ---- Scripts ----


def rename(path, dest, config):
    df = pandas.read_csv(path)
    var = config["variables"]

    for i in var:
        if "renaming" in var[i]:
            loc = list(df.columns.values).index(i)
            table = df.values

            f = type_flags(var[i]["new_type"])

            for row in range(len(table)):
                table[row][loc] = f(var[i]["renaming"][str(table[row][loc])])

            df = pandas.DataFrame(table, columns=df.columns)

        if "new_name" in var[i]:
            df.rename(columns={i: var[i]["new_name"]}, inplace=True)

    df.to_csv(dest, index=False)


def pre_process(path, dest, config):
    var = config["variables"]

    # Open files
    input_file, output_file = open(path, 'r'), open(dest, 'w')
    csv_in = csv.DictReader(input_file)

    attr = csv_in.fieldnames

    if "sincelast" in config and "age" in config and "eventdate" in config:
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
                f = type_flags(config["default_type"], info = row[val])
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

        # calculates new attributes
        row[config["sincelast"]] = row[config["eventdate"]] - p_diag_date if row[config["id"]] == p_row_id else 0
        row[config["age"]] = row[config["eventdate"]] - row[config["entitycreation"]]

        # gets data for this row for the future iteration
        p_diag_date, p_row_id = row[config["eventdate"]], row[config["id"]]

        # writes row
        csv_out.writerow(row)


def merge(table, config):
    # Prints the progress and does garbage collection manually
    if table[config["id"]].head(1).values[0] % 50000 == 0:
        print(table[config["id"]].head(1).values[0])
        gc.collect()

    # Copies the table
    tmp = table.copy(deep=False)
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

        merge_number, merge_order = var[master_name]["merge_number"], var[master_name]["merge_order"]
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
        to_drop = to_drop + item[:idx] + item[idx+1:]
        master = list(np.array(master)[taken])
        slaves = list(map(lambda slave: list(np.array(slave)[taken]), slaves))
        tmp.set_value(tmp.index[idx], master_disp, '0'.join(master))

        ids = 0
        for slave in slaves_names:
            tmp.set_value(tmp.index[idx], slave, '0'.join(slaves[ids]))
            ids += 1

    if len(to_drop) > 0:
        to_drop = list(map(lambda a: a -1, to_drop))
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
        list(map(f, range_of))

    os.system('cat ' + dest + 'r* > ' + dest)
    os.system('rm ' + dest + 'r*')
