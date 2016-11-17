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


def change_diagnosis(path, dest, new_diagnosis):
    """
    This simple function changes the original diagnosis numbers to a new representation that is more friendly to joint
    diagnosis.
    :param path: Path to the source file.
    :param dest: Path to the destination file.
    :param new_diagnosis: Hash table having the old diagnosis as keys and the new ones as items.
    :return: Nothing.
    """
    df = pandas.read_csv(path)

    loc = list(df.columns.values).index('diagnosis1')
    table = df.values

    for row in range(len(table)):
        table[row][loc] = new_diagnosis[table[row][loc]]
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
            types.append(row_of_int[loc_type])
            diagnosis1.append(str(row_of_int[loc_diag]))

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

        all_types.append('/'.join(types))
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


if __name__ == "__main__":

    _diag = {0: 11, 1: 12, 9: 13, 10: 14, 11: 15, 12: 16, 13: 17, 14: 18, 15: 19, 16: 21, 17: 22, 18: 23, 20: 25,
             21: 26, 22: 27, 30: 28, 31: 29, 32: 31, 33: 32, 34: 33, 35: 34, 99: 35, 41: 36, 42: 37, 43: 38}

    _drop_diag = [35, 14]

    _drop_col = ['stage']

    _group = {36: 36, 37: 36, 38: 36, 34: 31, 32: 31, 31: 31, 29: 25, 28: 25,
              27: 25, 26: 25, 25: 25, 16: 16, 17: 16, 22: 18, 21: 18, 18: 18}

    # # -- OPENCRAB DATASET
    #
    # _raw_oc = "./raw/opencrab/"
    # _pre_oc = "./preprocessed/opencrab/"
    #
    # _original_path = _raw_oc + "opencrab.csv"  # original dataset
    # _changed_diagnosis = _raw_oc + "change_tmp.csv"  # changed diagnosis, as shown in hash ´_diag´
    # _preprocessed = _pre_oc + "opencrab_processed.csv"  # adds sincelast, does grouping, drops diagnosis in ´_drop_diag´
    # _grouped = _pre_oc + "opencrab_p_g.csv"  # merges diagnosis that happened in the same month
    #
    # # change diagnosis
    # change_diagnosis(path=_original_path, dest=_changed_diagnosis, new_diagnosis=_diag)
    #
    # # pre-process the tables
    # pre_process_exams_only(path=_changed_diagnosis, dest=_preprocessed, group=_group, drop=_drop_diag)
    #
    # # group different diagnosis, drop rows
    # merge_groups_parallel(path=_preprocessed, dest=_grouped, drop=_drop_col)
    #
    # os.remove(_changed_diagnosis)
    # os.remove(_preprocessed)

    # -- SURVEYS DATASET

    _original_name = "./raw/surveys/surveydata.csv", "./raw/surveys/regdata.csv"  # original datasets
    _pre_sv = "./preprocessed/surveys/"
    _srctmp = ["s1_tmp.csv", "s2_tmp.csv", "mixed_tmp.csv"]  # joins all data in one big stupid file
    _srctmp2 = ["s1_tmp2.csv", "s2_tmp2.csv", "mixed_tmp2.csv"]  # changed diagnosis, as shown in hash ´_diag´
    _srctmp3 = ["s1_tmp3.csv", "s2_tmp3.csv", "mixed_tmp3.csv"]  # sincelast grouping, drops diagnosis in ´_drop_diag´

    _srcfin = ["s1.csv", "s2.csv", "mixed.csv"]  # merges diagnosis that happened in the same month

    _undocumented = ["q14newpa"]

    _survey2fields = ["q5aagsto", "q5esnu", "q5esnust", "q5fagsnu", "q5g1snu", "q5g2snu", "q5g3snu", "q5g4snu",
                      "q5g5snu", "q5g6snu", "q5g7snu", "q5g8snu", "q6adrk", "q6aagsto", "q6bsoda", "q6brwin",
                      "q6bwwin", "q6bdwin", "q6dbeer", "q6dsoda", "q6drwin", "q6dwwin", "q6ddwin", "q6dvodk",
                      "q6eagdrk", "q7cagpr1", "q7cres1", "q7cagpr2", "q7cres2", "q7cagpr3", "q7cres3",
                      "q7cagpr4", "q7cres4", "q7cagpr5", "q7cres5", "q7cagpr6", "q7cres6", "q7cagpr7", "q7cres7",
                      "q7cagpr8", "q7cres8", "q7cagpr9", "q7cres9", "q8bpill", "q8bagpi", "q8bdupi", "q8bmini",
                      "q8bagmi", "q8bdumi", "q8bspir", "q8bagsp", "q8bdusp", "q8both", "q8bagot", "q8bduot", "q8cmapi",
                      "q8cagma", "q8crema", "q10conew", "q11bno", "q11bco", "q11bhor", "q11bsafe", "q11bwith",
                      "q11bmorn", "q11both", "q13youpa", "q15risk", "q15agchl", "q15agher", "q15agtri", "q15aggon",
                      "q19vac", "q19agvac", "q22awork", "q22bhome", "q23heigh", "q23weigh"]

    _survey1fields = ["c6c2wine", "c6b2beer", "c6b3soda", "c6b4rwin", "c6b5wwin", "c6b6dwin", "c6b7vodk", "c6aagdrk",
                      "c7aagepr", "c8aageco", "c8bhormc", "c8cyrhor", "c11conew"]

    _dest, _src = (_pre_sv, _srctmp[0], _srctmp[1], _srctmp[2]), \
                  (_original_name[0], _original_name[1])

    # condenses survey and the diagnosis into one file
    pre_process_exams_query(_src, _dest, _survey1fields, _survey2fields, _undocumented)

    for s1, s2, s3, d in zip(_srctmp, _srctmp2, _srctmp3, _srcfin):
        # change diagnosis
        change_diagnosis(path=_pre_sv + s1, dest=_pre_sv + s2, new_diagnosis=_diag)

        # pre-process the tables
        pre_process_exams_only(path=_pre_sv + s2, dest=_pre_sv + s3, group=_group, drop=_drop_diag, has_dateres=True)

        # group different diagnosis, drop rows
        merge_groups_parallel(path=_pre_sv + s3, dest=_pre_sv + d, drop=_drop_col)

        os.remove(_pre_sv + s1)
        os.remove(_pre_sv + s2)
        os.remove(_pre_sv + s3)
