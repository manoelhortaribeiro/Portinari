from questionnaire import Questionnaire
import numpy as np
import pandas
import json
import os


def init_config_backend(name_json, _path_config):
    # if base exists, add dataset
    base = os.path.join(_path_config, "base.json")
    if os.path.exists(base):
        config_backend = json.loads(open(base, "r").read())
        if {"display": name_json, "name": name_json} not in config_backend["datasets"]:
            config_backend["datasets"].append({"display": name_json, "name": name_json})
        config_backend["default_dataset"] = name_json

    # otherwise, create everything
    else:
        config_backend = dict
        config_backend["no_indexed_event"] = 99,
        config_backend["time_min"] = 0,
        config_backend["time_max"] = 10000000,
        config_backend["event_min"] = 0,
        config_backend["event_max"] = 50,
        config_backend["nan"] = -999999999,
        config_backend["matching_options"] = [{"display": "First Occurence", "name": "first_occurence"},
                                              {"display": "First Event", "name": "first_event"}]
        config_backend["default_matching"] = "first_occurence"
        config_backend["datasets"] = [{"display": name_json, "name": name_json}]
        config_backend["default_dataset"] = name_json

    open(base, "w").write(json.dumps(config_backend))

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
    q1 = "Do you want to drop any columns?"
    q2 = "Select columns to drop?"
    k1 = 'drop_col'
    attr = 'drop_col'

    generic_selector(config_importer, df, q1, k1, attr)


def get_renaming_vars(config_importer, df):
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
                dst = list(filter(lambda a: a != str(config_importer["nan"]), dst))
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
                old_values = list(filter(lambda a: a != str(config_importer["nan"]), old_values))
                old_values.sort()

                new_values = answers[var].split(",")
                acc = {}
                for i, j in zip(old_values, new_values):
                    acc[i] = j
                config_importer["variables"][var]["rename"] = acc


def generic_selector(config_importer, df, q1, q2, k1, attr, flag=False):
    q = Questionnaire()

    o1 = ["Yes", "No"]

    q2 = q2
    rows = list(df.columns.values)
    rows.remove(config_importer["id"])
    rows.remove(config_importer["entitycreation"])
    rows.remove(config_importer["eventdate"])

    q.add_question(k1, prompt=q1, options=o1)

    q.add_question(q2, options=rows, prompter="multiple").add_condition(keys=k1, vals=['Yes'])

    ans = q.run()

    if flag:
        return ans

    if ans[k1] == "Yes":
        for var in ans[q2]:
            config_importer["variables"][var][attr] = "true"
            del df[var]


def get_string_attr(config_importer, df):
    q1 = "Are any of the attributes strings?"
    q2 = "Select string attributes?"
    k1 = "string_attr"
    attr = "is_str"

    ans = generic_selector(config_importer, df, q1, q2, k1, attr, flag=True)

    tmp = {}

    if ans[k1] == "Yes":
        for var in ans[q2]:
            old_values = list(map(str, np.unique(df[var].values)))
            old_values = list(filter(lambda a: a != str(config_importer["nan"]), old_values))
            old_values.sort()
            new_values = list(range(len(old_values)))
            acc = {}
            for i, j in zip(old_values, new_values):
                acc[i] = j
            config_importer["variables"][var]["rename"] = acc
            tmp[var]["rename"] = acc
    return tmp


def get_event_attr(config_importer, df):
    q1 = "Does the event contain more entities other than the Event Date?"
    q2 = "Select event attributes:"
    k1 = "is_event"
    attr = "event"

    generic_selector(config_importer, df, q1, q2, k1, attr)


_path_csv = "./data/surveys/mixed_sample.csv"

_path_config = "../backend/config/"

_name = "mixed_sample"

_df = pandas.read_csv(_path_csv, dtype=object, na_values=" ")

_config_importer = init_config_importer(_path_csv, _df)

_df = _df.fillna(_config_importer["nan"])

init_config_backend(_name, _path_config)

# global import var
get_global_import_var(_config_importer, _df)

# drop cols
get_drop_cols(_config_importer, _df)

# get renaming vars
get_renaming_vars(_config_importer, _df)

# get renaming vals
get_renaming_vals(_config_importer, _df)

# select string attr
string_mapping = get_string_attr(_config_importer, _df)

# select event attributes attr
get_event_attr(_config_importer, df)
