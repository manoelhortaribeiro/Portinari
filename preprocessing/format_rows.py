import numpy as np
import datetime
import pandas
import time
import csv
import os


def to_unix(s):
    """
    This function receives either a date time in the format %d.%m.%Y or an empty string. In the first case it converts
    the timestamp to a unix time, whereas in the second it returns an empty string.
    :param s: Date string or empty string.
    :return: Number of days in the unix time or empty string.
    """

    day_ms = 86400
    return "" if s == "" else int(int(time.mktime(datetime.datetime.strptime(s, "%d.%m.%Y").timetuple())) / day_ms)


def pre_process_exams_only(path, dest):
    """
    This function receives a path to an existing csv file and for an output csv file, which may exist or not. It
    calculates the time in between diagnosis taken by the same individual, adding a row called "sincelast" has the time
    in days since the individual's last diagnosis.
    :param path: Path to origin csv file.
    :param dest: Path to destination csv file.
    :return: Nothing
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

        # Calculates time in days since last diagnosis
        row["sincelast"] = to_unix(row["diagnosisdate"]) - to_unix(p_diag_date) if row["ID"] == p_row_id else 0

        p_diag_date, p_row_id = row["diagnosisdate"], row["ID"]  # Gets data for this row for the future iteration

        row["diagnosisdate"], row["birthdate"] = to_unix(row["diagnosisdate"]), to_unix(row["birthdate"])

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


if __name__ == "__main__":
    # -- OPENCRAB DATASET

    # pre_process_exams_only("./surveys/opencrab/opencrab.csv", "./preprocessed/opencrab/opencrab_processed.csv")

    # -- SURVEYS DATASET

    _undocumented = ["q14newpa"]

    _survey2fields = [
        "q5aagsto", "q5esnu", "q5esnust", "q5fagsnu", "q5g1snu", "q5g2snu", "q5g3snu", "q5g4snu", "q5g5snu", "q5g6snu",
        "q5g7snu", "q5g8snu", "q6adrk", "q6aagsto", "q6bsoda", "q6brwin", "q6bwwin", "q6bdwin", "q6dbeer", "q6dsoda",
        "q6drwin", "q6dwwin", "q6ddwin", "q6dvodk", "c6aagdrk", "q6eagdrk", "q7cagpr1", "q7cres1", "q7cagpr2",
        "q7cres2", "q7cagpr3", "q7cres3", "q7cagpr4", "q7cres4", "q7cagpr5", "q7cres5", "q7cagpr6", "q7cres6",
        "q7cagpr7", "q7cres7", "q7cagpr8", "q7cres8", "q7cagpr9", "q7cres9", "q8bpill", "q8bagpi", "q8bdupi",
        "q8bmini", "q8bagmi", "q8bdumi", "q8bspir", "q8bagsp", "q8bdusp", "q8both", "q8bagot", "q8bduot", "q8cmapi",
        "q8cagma", "q8crema", "q10conew", "q11bno", "q11bco", "q11bhor", "q11bsafe", "q11bwith", "q11bmorn", "q11both",
        "q13youpa", "q15risk", "q15agchl", "q15agher", "q15agtri", "q15aggon", "q19vac", "q19agvac", "q22awork",
        "q22bhome", "q23heigh", "q23weigh"
    ]

    _survey1fields = [
        "c6c2wine", "c6b2beer", "c6b3soda", "c6b4rwin", "c6b5wwin", "c6b6dwin", "c6b7vodk", "c6aagdrk", "c7aagepr",
        "c8aageco", "c8bhormc", "c8cyrhor", "c11conew"
    ]

    _dest, _src = ("./preprocessed/surveys/", "s1_tmp.csv", "s2_tmp.csv", "mixed_tmp.csv"), \
                  ("./raw/surveys/surveydata.csv", "./raw/surveys/regdata.csv")

    pre_process_exams_query(_src, _dest, _survey1fields, _survey2fields, _undocumented)

    pre_process_exams_only("./preprocessed/surveys/s1_tmp.csv", "./preprocessed/surveys/s1.csv")
    pre_process_exams_only("./preprocessed/surveys/s2_tmp.csv", "./preprocessed/surveys/s2.csv")
    pre_process_exams_only("./preprocessed/surveys/mixed_tmp.csv", "./preprocessed/surveys/mixed.csv")
    os.system('rm ./preprocessed/surveys/s1_tmp.csv')
    os.system('rm ./preprocessed/surveys/s2_tmp.csv')
    os.system('rm ./preprocessed/surveys/mixed_tmp.csv')
