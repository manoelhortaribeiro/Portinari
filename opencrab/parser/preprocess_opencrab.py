import csv
import datetime
import time
import pandas

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

        count += 1

        if count % 100000 == 0:
            print(row["ID"], count)

        row["birthdate"] = to_unix(row["birthdate"])
        row["diagnosisdate"] = to_unix(row["diagnosisdate"])
        row["censordate"] = to_unix(row["censordate"])

        if row["birthdate"] == "":
            continue

        if int(row["diagnosis1"]) in drop:
            continue

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


_drop = [99, 10]

_group = {
    41: 41, 42: 41, 43: 41,  # Cancer
    35: 32, 33: 32, 32: 32,  # Hist:High-grade
    31: 20, 30: 20, 22: 20, 21: 20, 20: 20,  # Hist:Normal
    12: 12, 13: 12,  # Cyt:Low-grade
    17: 14, 16: 14, 14: 14  # Cyt High-grade
}

_field_names = [
    "ID", "birthdate", "diagnosisnumber", "censordate",  # Related to the patient
    "type", "diagnosis1", "diagnosis2", "stage",  # Related to the diagnosis
    "lab_nr", "reg",  # Related to location
    "diagnosisdate", "age", "sincelast"  # Related to date
]

#pre_process("../raw_data/opencrab.csv",
#            "../processed_data/opencrabunix.csv",
#            _drop,
#            _group,
#            _field_names)

df = pandas.read_csv("../processed_data/opencrabunix_sample.csv")

print(df)
