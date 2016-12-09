from preprocessing.make_tables import parallel_parsing
from preprocessing.format_rows import change_diagnosis, pre_process_exams_only, merge_groups_parallel
import numpy as np
import os
import pandas


def make_int(src, desc):
    table = pandas.read_csv(src, na_values=['', ' '])
    table.fillna(-999999999, inplace=True)
    values_col = table.columns.values

    for col in values_col:
        if col not in desc:
            table[col] = table[col].astype(np.int32)

    table.to_csv(src)


def make_tables(renaming_pa, renaming_ex, source, patient_dest, exams_dest, idv,
                sincelast, index_values, index_display, extra_drop=None):
    to_drop_ex = list(renaming_pa.keys())
    to_drop_ex.remove(idv)

    if extra_drop is not None:
        to_drop_ex += extra_drop

    parallel_parsing(source=source,
                     patient_dest=patient_dest,
                     exams_dest=exams_dest,
                     renaming_pa=renaming_pa,
                     renaming_ex=renaming_ex,
                     to_drop_ex=to_drop_ex,
                     sincelast=sincelast,
                     index_values=index_values,
                     index_display=index_display)


def make_rows(original_path, changed_diagnosis, diag, typ, preprocessed, group, drop_diag, grouped, drop_col):
    # change diagnosis
    change_diagnosis(path=original_path, dest=changed_diagnosis, new_diagnosis=diag, new_type=typ)

    # pre-process the tables
    pre_process_exams_only(path=changed_diagnosis, dest=preprocessed, group=group, drop=drop_diag)

    # group different diagnosis, drop rows
    merge_groups_parallel(path=preprocessed, dest=grouped, drop=drop_col)


def make_all(diag, typ, drop_diag, drop_col, group, raw_dir, name, idv, renaming_en,
             renaming_ev, sincelast, index_values, index_display,
             pre_dir="", final_dir="", int_steps=False, extra_drop=None):
    if pre_dir is "":
        pre_dir = raw_dir
    if final_dir is "":
        final_dir = raw_dir

    original_path = raw_dir + name  # original dataset
    changed_diagnosis = raw_dir + "change_diag_" + name  # changed diagnosis, as shown in hash ´_diag´
    preprocessed = pre_dir + "pre_" + name  # adds sincelast, does grouping, drops diagnosis in ´_drop_diag´
    grouped = pre_dir + "pre_group_" + name  # merges diagnosis that happened in the same month
    entity_dest = final_dir + "entity_" + name
    event_dest = final_dir + "events_" + name

    make_rows(original_path, changed_diagnosis, diag, typ, preprocessed, group, drop_diag, grouped, drop_col)

    make_tables(renaming_en, renaming_ev, grouped, entity_dest, event_dest,
                idv, sincelast, index_values, index_display, extra_drop=extra_drop)

    make_int(entity_dest, index_display)
    make_int(event_dest, index_display)

    if int_steps is False:
        os.remove(changed_diagnosis)
        os.remove(preprocessed)
        os.remove(grouped)


if __name__ == "__main__":
    _diag = {0: 11, 1: 12, 9: 13, 10: 14, 11: 15, 12: 16, 13: 17, 14: 18, 15: 19, 16: 21, 17: 22, 18: 23, 20: 25,
             21: 26, 22: 27, 30: 28, 31: 29, 32: 31, 33: 32, 34: 33, 35: 34, 99: 35, 41: 36, 42: 37, 43: 38}

    _type = {"cyt": 11, "hist": 12, "hpv": 13, "cancer": 14}

    _drop_diag, _drop_col, _idv = [35, 14], ['stage'], 'ID'

    _group = {36: 36, 37: 36, 38: 36, 34: 31, 32: 31, 31: 31, 29: 25, 28: 25, 27: 25, 26: 25, 25: 25, 16: 16, 17: 16,
              22: 18, 21: 18, 18: 18}

    _renaming_ev = {'ID': 'PatientID',
                    'diagnosisdate': 'DiagnosisDate',
                    'diagnosisnumber': 'DiagnosisNbr',
                    'type': 'ExamType',
                    'diagnosis1': 'Diagnosis',
                    'diagnosis2': 'MorphologyCode',
                    'stage': 'Stage',
                    'lab_nr': 'LaboratoryNbr',
                    'reg': 'Region',
                    'sincelast': 'TimeSinceLast', 'age': 'Age'}

    _sincelast = "sincelast"

    _index_values = ["diagnosis1", "type"]

    _index_display = ["StringRepDiagnosis", "StringRepExamType"]

    # OPENCRAB

    _raw_dir, _name = "./data/opencrab/", "opencrab_sample.csv"

    _renaming_en = {'ID': 'PatientID', 'birthdate': 'Birthdate', 'censordate': 'CensorDate'}

    make_all(_diag, _type, _drop_diag, _drop_col, _group, _raw_dir, _name, _idv, _renaming_en,
             _renaming_ev, _sincelast, _index_values, _index_display)

    # SURVEY BOTH

    _raw_dir, _name = "./data/surveys/", "mixed_sample.csv"

    _drop_extra = ["c6b1lber"]

    _renaming_en_both = {
        'ID': 'PatientID',
        'birthdate': 'Birthdate',
        'censordate': 'CensorDate',
        "typeres": "typeres",
        "q2amarit": "q2amarit",
        "q3school": "q3school",
        "q4health": "q4health",
        "q5asmoke": "q5asmoke",
        "q5bagsmk": "q5bagsmk",
        "q5clgsmk": "q5clgsmk",
        "q5d1cig": "q5d1cig",
        "q5d2cig": "q5d2cig",
        "q5d3cig": "q5d3cig",
        "q5d4cig": "q5d4cig",
        "q5d5cig": "q5d5cig",
        "q5d6cig": "q5d6cig",
        "q5d7cig": "q5d7cig",
        "q5d8cig": "q5d8cig",
        "q6bbeer": "q6bbeer",
        "q6bvodk": "q6bvodk",
        "q6csixdr": "q6csixdr",
        "q7apregn": "q7apregn",
        "q7bbirth": "q7bbirth",
        "q8acontr": "q8acontr",
        "q9condom": "q9condom",
        "q9agecon": "q9agecon",
        "q11asx": "q11asx",
        "q11aagsx": "q11aagsx",
        "q11aagpa": "q11aagpa",
        "q12totpa": "q12totpa",
        "q15chla": "q15chla",
        "q15herp": "q15herp",
        "q15tric": "q15tric",
        "q15gono": "q15gono",
        "q16heard": "q16heard",
        "q17hadgw": "q17hadgw",
        "q17aggw": "q17aggw",
        "q18trtgw": "q18trtgw",
        "q20know": "q20know",
        "q21necc": "q21necc",
        "q23heigh": "q23heigh",
        "q23weigh": "q23weigh"
    }

    make_all(_diag, _type, _drop_diag, _drop_col, _group, _raw_dir, _name, _idv, _renaming_en_both,
             _renaming_ev, _sincelast, _index_values, _index_display, extra_drop=_drop_extra)
    # SURVEY 1

    _raw_dir, _name = "./data/surveys/", "s1_sample.csv"

    _renaming_en_s1 = {"c6c2wine": "c6c2wine",
                       "c6b2beer": "c6b2beer",
                       "c6b3soda": "c6b3soda",
                       "c6b4rwin": "c6b4rwin",
                       "c6b5wwin": "c6b5wwin",
                       "c6b6dwin": "c6b6dwin",
                       "c6b7vodk": "c6b7vodk",
                       "c6aagdrk": "c6aagdrk",
                       "c7aagepr": "c7aagepr",
                       "c8aageco": "c8aageco",
                       "c8bhormc": "c8bhormc",
                       "c8cyrhor": "c8cyrhor",
                       "c11conew": "c11conew"}

    _renaming_en_s1.update(_renaming_en_both)

    make_all(_diag, _type, _drop_diag, _drop_col, _group, _raw_dir, _name, _idv, _renaming_en_s1,
             _renaming_ev, _sincelast, _index_values, _index_display, extra_drop=_drop_extra)
    # SURVEY 2

    _raw_dir, _name = "./data/surveys/", "s2_sample.csv"

    _renaming_en_s2 = {"q5aagsto": "q5aagsto",
                       "q5esnu": "q5aagsto",
                       "q5esnust": "q5esnust",
                       "q5fagsnu": "q5fagsnu",
                       "q5g1snu": "q5g1snu",
                       "q5g2snu": "q5g2snu",
                       "q5g3snu": "q5g3snu",
                       "q5g4snu": "q5g4snu",
                       "q5g5snu": "q5g5snu",
                       "q5g6snu": "q5g6snu",
                       "q5g7snu": "q5g7snu",
                       "q5g8snu": "q5g8snu",
                       "q6adrk": "q6adrk",
                       "q6aagsto": "q6aagsto",
                       "q6bsoda": "q6bsoda",
                       "q6brwin": "q6brwin",
                       "q6bwwin": "q6bwwin",
                       "q6bdwin": "q6bdwin",
                       "q6dbeer": "q6dbeer",
                       "q6dsoda": "q6dsoda",
                       "q6drwin": "q6drwin",
                       "q6dwwin": "q6dwwin",
                       "q6ddwin": "q6ddwin",
                       "q6dvodk": "q6dvodk",
                       "q6eagdrk": "q6eagdrk",
                       "q7cagpr1": "q7cagpr1",
                       "q7cres1": "q7cres1",
                       "q7cagpr2": "q7cagpr2",
                       "q7cres2": "q7cres2",
                       "q7cagpr3": "q7cagpr3",
                       "q7cres3": "q7cres3",
                       "q7cagpr4": "q7cagpr4",
                       "q7cres4": "q7cres4",
                       "q7cagpr5": "q7cagpr5",
                       "q7cres5": "q7cres5",
                       "q7cagpr6": "q7cagpr6",
                       "q7cres6": "q7cres6",
                       "q7cagpr7": "q7cagpr7",
                       "q7cres7": "q7cres7",
                       "q7cagpr8": "q7cagpr8",
                       "q7cres8": "q7cres8",
                       "q7cagpr9": "q7cagpr9",
                       "q7cres9": "q7cres9",
                       "q8bpill": "q8bpill",
                       "q8bagpi": "q8bagpi",
                       "q8bdupi": "q8bdupi",
                       "q8bmini": "q8bmini",
                       "q8bagmi": "q8bagmi",
                       "q8bdumi": "q8bdumi",
                       "q8bspir": "q8bspir",
                       "q8bagsp": "q8bagsp",
                       "q8bdusp": "q8bdusp",
                       "q8both": "q8both",
                       "q8bagot": "q8bagot",
                       "q8bduot": "q8bduot",
                       "q8cmapi": "q8cmapi",
                       "q8cagma": "q8cagma",
                       "q8crema": "q8crema",
                       "q10conew": "q10conew",
                       "q11bno": "q11bno",
                       "q11bco": "q11bco",
                       "q11bhor": "q11bhor",
                       "q11bsafe": "q11bsafe",
                       "q11bwith": "q11bwith",
                       "q11bmorn": "q11bmorn",
                       "q11both": "q11both",
                       "q13youpa": "q13youpa",
                       "q15risk": "q15risk",
                       "q15agchl": "q15agchl",
                       "q15agher": "q15agher",
                       "q15agtri": "q15agtri",
                       "q15aggon": "q15aggon",
                       "q19vac": "q19vac",
                       "q19agvac": "q19agvac",
                       "q22awork": "q22awork",
                       "q22bhome": "q22bhome"}

    _renaming_en_s2.update(_renaming_en_both)

    make_all(_diag, _type, _drop_diag, _drop_col, _group, _raw_dir, _name, _idv, _renaming_en_s2,
             _renaming_ev, _sincelast, _index_values, _index_display, extra_drop=_drop_extra)
