import csv
import datetime
import time
import pandas
import collections
import gc
import functools
from multiprocessing import Pool
import os


def to_unix(s):
    if s == "":
        return s
    else:
        return int(int(time.mktime(datetime.datetime.strptime(s, "%d.%m.%Y").timetuple())) / 86400)


def pre_process(path, dest, drop, group, field_names):
    # Open the file
    file_input = open(path, 'r')
    file_output = open(dest, 'w')
    csv_in = csv.DictReader(file_input)
    csv_out = csv.DictWriter(file_output, field_names)

    csv_out.writeheader()

    previous_row_id = -1
    previous_diagnosis_date = -1

    count = 0

    for row in csv_in:

        if row["birthdate"] == "":
            continue

        if int(row["diagnosis1"]) in drop:
            continue

        count += 1

        if count % 100000 == 0:
            print(row["ID"], count)

        row["birthdate"] = to_unix(row["birthdate"])
        row["diagnosisdate"] = to_unix(row["diagnosisdate"])
        row["censordate"] = to_unix(row["censordate"])

        if int(row["diagnosis1"]) in list(group.keys()):
            row["diagnosis1"] = group[int(row["diagnosis1"])]

        row["age"] = row["diagnosisdate"] - row["birthdate"]

        if row["ID"] == previous_row_id:
            row["sincelast"] = row["diagnosisdate"] - previous_diagnosis_date
        else:
            row["sincelast"] = 0

        previous_diagnosis_date = row["diagnosisdate"]
        previous_row_id = row["ID"]
        csv_out.writerow(row)


def merge(table):

    if table['ID'].head(1).values[0] % 1000 == 0:
        print(table['ID'].head(1).values[0])
        gc.collect()

    # print('===============')
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

    orderd_dgs = collections.OrderedDict(number_exams)
    dgs = []

    for k, v in orderd_dgs.items():
        dgs.append(v)

    tmp['diagnosisgroupsize'] = pandas.Series(dgs, index=tmp.index)

    # Merge the fields

    all_types = []
    all_diagnosis = []
    for key, item in dictionary.items():

        types = []
        diagnosis1 = []

        for i in item:
            row_of_int = tmp[tmp.diagnosisnumber == i].iloc[0].values
            types.append(row_of_int[4])
            diagnosis1.append(str(row_of_int[5]))

        is_first = False
        to_drop = []
        for i in item:
            if not is_first:
                is_first = True
            else:
                to_drop.append(i)

        all_types.append('/'.join(types))
        all_diagnosis.append(int('0'.join(diagnosis1)))

        # print('types', all_types)
        # print('diagn', all_diagnosis)

        if len(to_drop) > 0:
            # print('to_drop:', to_drop)
            tmp = tmp[~tmp.diagnosisnumber.isin(to_drop)]

    tmp['diagnosis1'] = all_diagnosis
    tmp['type'] = all_types
    tmp['diagnosisnumber'] = range(1, len(all_diagnosis) + 1)

    return tmp


def make_patient_tables(ran, df, dest):

    has_header = False
    if ran[0] == 0:
        has_header = True

    df = df.query('ID >= ' + str(ran[0]))
    df = df.query('ID < ' + str(ran[1]))

    df = df.groupby('ID').apply(merge)

    df = df.reset_index(drop=True)

    gc.collect()
    df.to_csv(dest + 'r' + str(ran[0]) + str(ran[1]), mode='w', index=False, header=has_header)

_drop = [35, 14]

_group = {
    36: 36, 37: 36, 38: 36,  # Cancer - done
    34: 31, 32: 31, 31: 31,  # Hist:High-grade - done
    29: 25, 28: 25, 27: 25, 26: 25, 25: 25,  # Hist:Normal - done
    16: 16, 17: 16,  # Cyt:Low-grade - done
    22: 18, 21: 18, 18: 18  # Cyt High-grade - done
}

_field_names = [
    "ID", "birthdate", "diagnosisnumber", "censordate",  # Related to the patient
    "type", "diagnosis1", "diagnosis2", "stage",  # Related to the diagnosis
    "lab_nr", "reg",  # Related to location
    "diagnosisdate", "age", "sincelast"  # Related to date
]

unprocessed = "../raw_data/opencrab_d.csv"
source = "../processed_data/opencrabunix_d.csv"
dest = '../processed_data/opencrab_final.csv'

# pre_process(unprocessed, source, _drop, _group, _field_names)


_df = pandas.read_csv(source)

f = functools.partial(make_patient_tables, df=_df, dest=dest,)

range_of = list(zip(list(range(0, 1000000, 25000)), list(range(25000, 1000000, 25000))))
with Pool(3) as p:
    p.map(f, range_of)

os.system('cat ' + dest + 'r* > ' + dest)
os.system('rm ' + dest + 'r*')
