import csv
import datetime
import time


def to_unix(s):
    if s == "":
        return s
    else:
        return int(int(time.mktime(datetime.datetime.strptime(s, "%d.%m.%Y").timetuple()))/86400)


def pre_process(path, dest, field_names):
    # Open the file
    input = open(path, 'r')
    output = open(dest, 'w')
    csv_in = csv.DictReader(input)
    csv_out = csv.DictWriter(output, field_names)

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

        row["age"] = row["diagnosisdate"] - row["birthdate"]

        if row["ID"] == previous_row_id:
            row["sincelast"] = row["diagnosisdate"] - previous_diagnosis_date
        else:
            row["sincelast"] = 0

        previous_diagnosis_date = row["diagnosisdate"]
        previous_row_id = row["ID"]
        csv_out.writerow(row)


_field_names = [
                # Related to the patient
                "ID", "birthdate", "diagnosisnumber", "censordate",
                # Related to the diagnosis
                "type", "diagnosis1", "diagnosis2", "stage",
                # Related to location
                "lab_nr", "reg",
                # Related to date
                "diagnosisdate", "age", "sincelast"]


pre_process("../data/raw_data/opencrab.csv",
            "../data/processed_data/opencrabunix.csv",
            _field_names)
