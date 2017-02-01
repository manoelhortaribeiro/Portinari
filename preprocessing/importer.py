from questionnaire import Questionnaire
import numpy as np
import pandas
import os


def init_config_importer(path, df):
    config_importer = {}
    head, tail = os.path.split(path)
    config_importer["name"] = head
    config_importer["directory"] = tail
    config_importer["nan"] = -999999999
    config_importer["sincelast"] = "SinceLast"
    config_importer["age"] = "Age"
    config_importer["eventnumber"] = "DiagnosisNumber"
    config_importer["groupsize"] = "GroupSize"
    config_importer["default"] = "entity"
    config_importer["variables"] = {}
    for val in df.columns.values:
        config_importer["variables"][val] = {}
    return config_importer


def get_global_import_var(config_importer, df):

    q1 = "Select the identifier of your entity, e.g. PatientID"

    q2 = "Select the creation date of your entity, e.g. BirthDate"

    q3 = "Select the date of your events, e.g. DiagnosisDate"

    q4 = "Select the date format in the file"
    o4 = ["15.09.1964", "15-09-1964", "15/09/1964"]
    m4 = {"15.09.1964": "%d.%m.%Y", "15-09-1964": "%d-%m-%Y", "15/09/1964": "%d/%m/%Y"}

    global_q = Questionnaire()

    global_q.add_question(q1, options=df.columns.values)
    global_q.add_question(q2, options=df.columns.values)
    global_q.add_question(q3, options=df.columns.values)
    global_q.add_question(q4, options=o4)

    global_answers = global_q.run()

    config_importer["id"] = global_answers[q1]
    config_importer["entitycreation"] = global_answers[q2]
    config_importer["eventdate"] = global_answers[q3]
    config_importer["time_format"] = m4[global_answers[q4]]


def get_drop_cols(config_importer, df):
    drop_cols_q = Questionnaire()

    q1 = "Do you want to drop any columns?"
    o1 = ["Yes", "No"]

    q2 = "Select columns to drop"
    rows = list(df.columns.values)
    rows.remove(config_importer["id"])
    rows.remove(config_importer["entitycreation"])
    rows.remove(config_importer["eventdate"])

    drop_cols_q.add_question('drop_col', prompt=q1, options=o1)

    drop_cols_q.add_question(q2, options=rows, prompter="multiple").add_condition(keys=['drop_col'], vals=['Yes'])

    drop_cols_ans = drop_cols_q.run()

    if drop_cols_ans["drop_col"] == "Yes":
        for var in drop_cols_ans[q2]:
            config_importer["variables"][var]["drop_col"] = "true"
            del df[var]


def get_renaming_vars(config_importer, df):

    renaming_hash = {}
    rows = list(df.columns.values)

    while True:
        q = Questionnaire()
        q1 = "Do you want to rename any variable?"
        o1 = ["Yes", "No"]

        q.add_question(q1, options=o1)
        answers = q.run()

        if answers[q1] == "No":
            break

        else:
            q = Questionnaire()

            q2 = "Select the variables:"

            q.add_question(q2, options=rows, prompter="multiple")
            answers = q.run()

            q = Questionnaire()

            idx_val = list(enumerate(answers[q2]))

            for idx, var in idx_val:
                string = "Old name: " + var + ". Write the new name:\n"
                q.add_question(var, prompt=string, prompter="raw", type=str)

            answers = q.run()
            for idx, var in idx_val:
                config_importer["variables"][var]["new_name"] = answers[var]


def get_renaming_vals(config_importer, df):
    rows = list(df.columns.values)

    while True:
        q = Questionnaire()
        q1 = "Do you want to rename any variable value (for categorical values only)?"
        o1 = ["Yes", "No"]

        q.add_question(q1, options=o1)
        answers = q.run()

        if answers[q1] == "No":
            break

        else:
            q = Questionnaire()

            q2 = "Select the variables:"
            q.add_question(q2, options=rows, prompter="multiple")
            answers = q.run()

            q = Questionnaire()

            idx_val = list(enumerate(answers[q2]))

            for idx, var in idx_val:

                dst = list(map(str, np.unique(df[var].values)))
                dst.sort()
                dsp = ",".join(dst)

                string = var + " - " + dsp + ". Write the new values in commas in the same order:\n"
                q.add_question(var,
                               prompt=string,
                               prompter="raw",
                               type=str)

            answers = q.run()
            for idx, var in idx_val:
                old_values = list(map(str, np.unique(df[var].values)))
                dst.sort()
                new_values = answers[var].split(",")
                acc = {}
                for i, j in zip(old_values, new_values):
                    acc[i] = j
                config_importer["variables"][var]["rename"] = acc


_path = "./data/surveys/mixed_sample.csv"
_df = pandas.read_csv(_path, dtype=object)

_config_importer = init_config_importer(_path, _df)

# global import var
get_global_import_var(_config_importer, _df)

# drop cols
get_drop_cols(_config_importer, _df)

# get renaming vars
get_renaming_vars(_config_importer, _df)

# get renaming vals
get_renaming_vals(_config_importer, _df)



