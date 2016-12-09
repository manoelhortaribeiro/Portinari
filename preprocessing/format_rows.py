from multiprocessing import Pool
import collections
import functools
import datetime
import pandas
import time
import csv
import os
import gc


def to_unix(st):
    """
    This function receives either a date time in the format %d.%m.%Y or an empty string. In the first case it converts
    the timestamp to a unix time, whereas in the second it returns an empty string.
    :param st: Date string or empty string.
    :return: Number of days in the unix time or empty string.
    """

    day_ms = 86400
    return "" if st == "" else int(int(time.mktime(datetime.datetime.strptime(st, "%d.%m.%Y").timetuple())) / day_ms)


def pre_process_exams_only(path, dest, group, drop, has_dateres=False):
    """
    This function receives a path to an existing csv file and for an output csv file, which may exist or not. It
    calculates the time in between diagnosis taken by the same individual, adding a row called "sincelast" has the time
    in days since the individual's last diagnosis. It also group all diagnosis as specified in the group hash, and
    ignores all the diagnosis in the array drop.
    :param path: Path to origin csv file.
    :param dest: Path to destination csv file.
    :param group: Hash containing the diagnosis groupings.
    :param drop: If diagnosis is in this list, drops it.
    :param has_dateres: has the column dateres.
    :return: Nothing.
    """

    # Open files
    input_file, output_file = open(path, 'r'), open(dest, 'w')
    csv_in = csv.DictReader(input_file)
    csv_out = csv.DictWriter(output_file, csv_in.fieldnames + ["sincelast", "age"])

    p_row_id, p_diag_date = -1, -1  # Silly control variables

    csv_out.writeheader()

    for row in csv_in:

        # Skips records without birth dates ( due to a bug in the dataset )
        if row["birthdate"] == "":
            continue

        if int(row["diagnosis1"]) in drop:
            continue

        # Calculates time in days since last diagnosis
        row["sincelast"] = to_unix(row["diagnosisdate"]) - to_unix(p_diag_date) if row["ID"] == p_row_id else 0

        p_diag_date, p_row_id = row["diagnosisdate"], row["ID"]  # Gets data for this row for the future iteration

        row["diagnosisdate"] = to_unix(row["diagnosisdate"])
        row["birthdate"] = to_unix(row["birthdate"])
        row["censordate"] = to_unix(row["censordate"])

        if "dateres" in row:
            row["dateres"] = to_unix(row["dateres"])

        row["stage"] = int(row["stage"])

        if row["diagnosis2"] == "":
            row["diagnosis2"] = 0
        else:
            row["diagnosis2"] = int(float(row["diagnosis2"]))

        if int(row["diagnosis1"]) in list(group.keys()):
            row["diagnosis1"] = group[int(row["diagnosis1"])]

        if has_dateres:
            row["dateres"] = to_unix(row["dateres"])

        row["age"] = row["diagnosisdate"] - row["birthdate"]

        csv_out.writerow(row)


def pre_process_exams_query(src, dest, s1_fields, s2_fields, undocumented):
    """
    This function receives a tuple with the path to the source of the surveys and its destination. It also receives the
    fields for each distinct survey and the undocumented fields. It pre process it.

    :param src: source csv files.
    :param dest: destination csv files.
    :param s1_fields: list of fields in the first survey.
    :param s2_fields: list of fields in the second survey.
    :param undocumented: list of undocumented fields.
    :return:
    """
    # opens
    survey_df = pandas.read_csv(src[0])

    # finds outcomes in reg_data
    reg_data = pandas.read_csv(src[1])

    # merge both
    survey_df = pandas.merge(survey_df, reg_data)

    # separates survey1 and survey2
    survey1 = survey_df[survey_df.study == 1].copy(deep=True)
    survey1.drop(s2_fields + ['study'] + undocumented, axis=1, inplace=True)

    survey2 = survey_df[survey_df.study == 2].copy(deep=True)
    survey2.drop(s1_fields + ['study'] + undocumented, axis=1, inplace=True)

    mixed = survey_df.copy(deep=True)
    mixed.drop(s1_fields + s2_fields + ['study'] + undocumented, axis=1, inplace=True)

    # saves
    mixed.to_csv(dest[0] + dest[3], index=False)
    survey1.to_csv(dest[0] + dest[1], index=False)
    survey2.to_csv(dest[0] + dest[2], index=False)


def change_diagnosis(path, dest, new_diagnosis, new_type):
    """
    This simple function changes the original diagnosis numbers to a new representation that is more friendly to joint
    diagnosis.
    :param path: Path to the source file.
    :param dest: Path to the destination file.
    :param new_diagnosis: Hash table having the old diagnosis as keys and the new ones as items.
    :param new_type: Hash table having the old types as keys and the new ones as items.
    :return: Nothing.
    """
    df = pandas.read_csv(path)

    loc_d1 = list(df.columns.values).index('diagnosis1')
    loc_t1 = list(df.columns.values).index('type')
    table = df.values

    for row in range(len(table)):
        table[row][loc_d1] = new_diagnosis[table[row][loc_d1]]
        table[row][loc_t1] = new_type[table[row][loc_t1]]

    df2 = pandas.DataFrame(table, columns=df.columns)
    df2.to_csv(dest, index=False)


def merge(table):
    # Prints the progress and does garbage collection manually
    if table['ID'].head(1).values[0] % 50000 == 0:
        print(table['ID'].head(1).values[0])
        gc.collect()

    # Copies the table
    tmp = table.copy(deep=False)
    tmp['diagnosisnumber'] = range(1, len(tmp['ID'].values) + 1)

    # Creates the dictionary with date:row number
    dictionary = collections.OrderedDict()
    values = tmp['diagnosisdate'].values
    for num, date in enumerate(values):
        if date in dictionary:
            dictionary[date].append(num + 1)
        else:
            dictionary[date] = [num + 1]

    # Creates the field for number of exams taken that day
    number_exams = {}
    for key, item in dictionary.items():
        for i in item:
            number_exams[i] = len(item)

    orderd_dgs, dgs = collections.OrderedDict(number_exams), []

    for k, v in orderd_dgs.items():
        dgs.append(v)

    tmp['diagnosisgroupsize'] = pandas.Series(dgs, index=tmp.index)

    # Merge the exams taken in the same date
    all_types = []
    all_diagnosis = []
    for key, item in dictionary.items():

        types = []
        diagnosis1 = []

        for i in item:
            row_of_int = tmp[tmp.diagnosisnumber == i].iloc[0].values
            loc_type = list(tmp.columns.values).index('type')
            loc_diag = list(tmp.columns.values).index('diagnosis1')
            types.append(str(int(row_of_int[loc_type])))
            diagnosis1.append(str(int(row_of_int[loc_diag])))

        is_first = False
        to_drop = []
        for i in item:
            if not is_first:
                is_first = True
            else:
                to_drop.append(i)

        tuples = list(zip(diagnosis1, types))
        tuples = sorted(tuples, key=lambda a: a[0])
        diagnosis1, types = list(list(zip(*tuples))[0]), list(list(zip(*tuples))[1])

        all_types.append(int('0'.join(types)))
        all_diagnosis.append(int('0'.join(diagnosis1)))

        if len(to_drop) > 0:
            tmp = tmp[~tmp.diagnosisnumber.isin(to_drop)]

    tmp['diagnosis1'] = all_diagnosis
    tmp['type'] = all_types
    tmp['diagnosisnumber'] = range(1, len(all_diagnosis) + 1)
    return tmp


def merge_groups(ran, df, dest):
    has_header = False
    if ran[0] == 0:
        has_header = True
    df = df.query('ID >= ' + str(ran[0]))
    df = df.query('ID < ' + str(ran[1]))
    df = df.groupby('ID').apply(merge)
    df = df.reset_index(drop=True)
    gc.collect()
    df.to_csv(dest + 'r' + str(ran[0]) + str(ran[1]), mode='w', index=False, header=has_header)


def merge_groups_parallel(path, dest, drop=None):
    df = pandas.read_csv(path)

    if drop is not None:
        df.drop(drop, axis=1, inplace=True)

    f = functools.partial(merge_groups, df=df, dest=dest, )

    range_of = list(zip(list(range(0, 1000000, 25000)), list(range(25000, 1000000, 25000))))

    with Pool(3) as p:
        p.map(f, range_of)

    os.system('cat ' + dest + 'r* > ' + dest)
    os.system('rm ' + dest + 'r*')
