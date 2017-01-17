# # ---------------------------- # # # # #
# # AUTHOR: MANOEL HORTA RIBEIRO # # # # #
# # ---------------------------- # # # # #
# This script does the whole preprocessing of the two files. It has a lot of handwritten information on it. Basically it
# a) Rename the diagnosis numbers.
# b) Rename the type numbers.
# c) Rename the variable names.
# d) creates a new variable called, sincelast, with relative time, and another one called age.
# e) drop entire columns, and possibly, events with certain diagnosis.
# f) splits the big csv into two tables, an entity table and an event table.
# g) creates indexes for the selected attributes in the events in the entity table.

from preprocessing.format_rows import rename, pre_process, merge_groups_parallel
from preprocessing.make_tables import parallel_parsing
import numpy as np
import pandas
import json
import os


def make_int(src, desc):
    table = pandas.read_csv(src, na_values=['', ' '])
    table.fillna(-999999999, inplace=True)
    values_col = table.columns.values

    for col in values_col:
        if col not in desc:
            table[col] = table[col].astype(np.int32)

    table.to_csv(src,  mode='w', index=False)


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


def make_rows(original_path, changed_diagnosis, preprocessed, grouped, config):
    # change diagnosis
    rename(path=original_path, dest=changed_diagnosis, config=config)

    # # pre-process the tables
    pre_process(path=changed_diagnosis, dest=preprocessed, config=config)

    # # group different diagnosis, drop rows
    merge_groups_parallel(path=preprocessed, dest=grouped, config=config)


def make_all(config, int_steps=True):

    raw_dir = config["directory"]
    name = config["name"]

    original_path = raw_dir + name  # original dataset
    changed_diagnosis = raw_dir + "change_diag_" + name  # changed diagnosis, as shown in hash ´_diag´
    preprocessed = raw_dir + "pre_" + name  # adds sincelast, does grouping, drops diagnosis in ´_drop_diag´
    grouped = raw_dir + "pre_group_" + name  # merges diagnosis that happened in the same month
    entity_dest = raw_dir + "entity_" + name
    event_dest = raw_dir + "events_" + name

    make_rows(original_path, changed_diagnosis, preprocessed,  grouped, config)

    #make_tables(grouped, entity_dest, event_dest, config)
    #make_int(entity_dest, config)
    #make_int(event_dest, config)

    if int_steps is False:
        os.remove(changed_diagnosis)
        os.remove(preprocessed)
        os.remove(grouped)

if __name__ == "__main__":

    mixed_config = json.loads(open("./data/surveys/survey_both.json","r").read())

    make_all(mixed_config)
    #
    # # renaming the diagnosis
    # _diag = {0: 11,   # HPV Negative
    #          1: 12,   # HPV Positive
    #          9: 13,   # HPV Unsatisfactory
    #          10: 14,  # CYT/HIS Unsatisfactory
    #          11: 15,  # CYT Normal
    #          12: 16,  # CYT ASC-US
    #          13: 17,  # CYT LSIL
    #          14: 18,  # CYT ASC-H
    #          15: 19,  # CYT AGUS/ACIS
    #          16: 21,  # CYT HSIL
    #          17: 22,  # CYT Cancer
    #          18: 23,  # CYT Metastasis
    #          20: 25,  # HIS NILM
    #          31: 26,  # HIS CIN1
    #          32: 27,  # HIS CIN2
    #          33: 28,  # HIS CIN3
    #          35: 29,  # HIS ACIS
    #          99: 31,  # Unknown Morphology
    #          41: 32,  # Squamous cell carcinoma
    #          42: 33,  # Adenocarcinoma
    #          43: 34}  # Other cancers
    #
    # # renaming the type
    # _type = {"cyt": 11,           # cytological smear
    #          "biopsy": 12,        # biopsy or endocervical curretage (histology)
    #          "cone": 13,          # cone treatment (histology)
    #          "hyster": 14,        # hysterectomy (histology)
    #          "HCII": 15,          # Hybrid Capture II (hpv test)
    #          "Proofer": 16,       # PreTect HPV-Proofer (hpv test)
    #          "Amplicor": 17,      # Amplicor (hpv test)
    #          "Ventana": 18,       # Ventana Inform (hpv test)
    #          "PAP13": 19,         # PAP 13 Tele-lab (hpv test)
    #          "Paptype13": 20,     # Paptype 13 real time (hpv test)
    #          "Cobas": 21,         # Cobas 4800 System (hpv test)
    #          "Abbott": 22,        # Abbott RealTime High Risk (hpv test)
    #          "BD Onclarity": 23,  # BD Onclarity HPV assay (hpv test)
    #          "HPV other": 24,     # Other test type (hpv test)
    #          "cancer": 25         # cancer diagnosis (histologically verified)
    #         }
    #
    # _drop_diag, _drop_col, _idv = [], [], 'ID'
    #
    # # TODO
    # _group = {}
    #
    # _renaming_ev = {'ID': 'PatientID',
    #                 'diagnosisdate': 'DiagnosisDate',
    #                 'diagnosisnumber': 'DiagnosisNbr',
    #                 'type': 'ExamType',
    #                 'diagnosis1': 'Diagnosis',
    #                 'diagnosis2': 'MorphologyCode',
    #                 'stage': 'Stage',
    #                 'lab_nr': 'LaboratoryNbr',
    #                 'reg': 'Region',
    #                 'sincelast': 'TimeSinceLast',
    #                 'age': 'Age'}
    #
    # _sincelast = "sincelast"
    #
    # _index_values = ["diagnosis1", "type"]
    #
    # _index_display = ["StringRepDiagnosis", "StringRepExamType"]

    # OPENCRAB

    # _raw_dir, _name = "./data/opencrab/", "opencrab.csv"
    #
    # _renaming_en = {'ID': 'PatientID', 'birthdate': 'Birthdate', 'censordate': 'CensorDate'}
    #
    # make_all(_diag, _type, _drop_diag, _drop_col, _group, _raw_dir, _name, _idv, _renaming_en,
    #          _renaming_ev, _sincelast, _index_values, _index_display)

    # SURVEY BOTH
    #
    # _raw_dir, _name = "./data/surveys/", "mixedsample.csv"
    #
    # _drop_extra = ["c6b1lber"]
    #
    # _renaming_en_both = {
    #     'ID': 'PatientID',
    #     'birthdate': 'Birthdate',
    #     'censordate': 'CensorDate',
    #     "typeres": "typeres",
    #     "q2amarit": "q2amarit",
    #     "q3school": "q3school",
    #     "q4health": "q4health",
    #     "q5asmoke": "q5asmoke",
    #     "q5bagsmk": "q5bagsmk",
    #     "q5clgsmk": "q5clgsmk",
    #     "q5d1cig": "q5d1cig",
    #     "q5d2cig": "q5d2cig",
    #     "q5d3cig": "q5d3cig",
    #     "q5d4cig": "q5d4cig",
    #     "q5d5cig": "q5d5cig",
    #     "q5d6cig": "q5d6cig",
    #     "q5d7cig": "q5d7cig",
    #     "q5d8cig": "q5d8cig",
    #     "q6bbeer": "q6bbeer",
    #     "q6bvodk": "q6bvodk",
    #     "q6csixdr": "q6csixdr",
    #     "q7apregn": "q7apregn",
    #     "q7bbirth": "q7bbirth",
    #     "q8acontr": "q8acontr",
    #     "q9condom": "q9condom",
    #     "q9agecon": "q9agecon",
    #     "q11asx": "q11asx",
    #     "q11aagsx": "q11aagsx",
    #     "q11aagpa": "q11aagpa",
    #     "q12totpa": "q12totpa",
    #     "q15chla": "q15chla",
    #     "q15herp": "q15herp",
    #     "q15tric": "q15tric",
    #     "q15gono": "q15gono",
    #     "q16heard": "q16heard",
    #     "q17hadgw": "q17hadgw",
    #     "q17aggw": "q17aggw",
    #     "q18trtgw": "q18trtgw",
    #     "q20know": "q20know",
    #     "q21necc": "q21necc",
    #     "q23heigh": "q23heigh",
    #     "q23weigh": "q23weigh"
    # }
    #
    # make_all(_diag, _type, _drop_diag, _drop_col, _group, _raw_dir, _name, _idv, _renaming_en_both,
    #          _renaming_ev, _sincelast, _index_values, _index_display, extra_drop=_drop_extra)
    #
    # # SURVEY 1
    #
    # _raw_dir, _name = "./data/surveys/", "s1.csv"
    #
    # _renaming_en_s1 = {"c6c2wine": "c6c2wine",
    #                    "c6b2beer": "c6b2beer",
    #                    "c6b3soda": "c6b3soda",
    #                    "c6b4rwin": "c6b4rwin",
    #                    "c6b5wwin": "c6b5wwin",
    #                    "c6b6dwin": "c6b6dwin",
    #                    "c6b7vodk": "c6b7vodk",
    #                    "c6aagdrk": "c6aagdrk",
    #                    "c7aagepr": "c7aagepr",
    #                    "c8aageco": "c8aageco",
    #                    "c8bhormc": "c8bhormc",
    #                    "c8cyrhor": "c8cyrhor",
    #                    "c11conew": "c11conew"}
    #
    # _renaming_en_s1.update(_renaming_en_both)
    #
    # make_all(_diag, _type, _drop_diag, _drop_col, _group, _raw_dir, _name, _idv, _renaming_en_s1,
    #          _renaming_ev, _sincelast, _index_values, _index_display, extra_drop=_drop_extra)
    #
    # # SURVEY 2
    #
    # _raw_dir, _name = "./data/surveys/", "s2.csv"
    #
    # _renaming_en_s2 = {"q5aagsto": "q5aagsto",
    #                    "q5esnu": "q5aagsto",
    #                    "q5esnust": "q5esnust",
    #                    "q5fagsnu": "q5fagsnu",
    #                    "q5g1snu": "q5g1snu",
    #                    "q5g2snu": "q5g2snu",
    #                    "q5g3snu": "q5g3snu",
    #                    "q5g4snu": "q5g4snu",
    #                    "q5g5snu": "q5g5snu",
    #                    "q5g6snu": "q5g6snu",
    #                    "q5g7snu": "q5g7snu",
    #                    "q5g8snu": "q5g8snu",
    #                    "q6adrk": "q6adrk",
    #                    "q6aagsto": "q6aagsto",
    #                    "q6bsoda": "q6bsoda",
    #                    "q6brwin": "q6brwin",
    #                    "q6bwwin": "q6bwwin",
    #                    "q6bdwin": "q6bdwin",
    #                    "q6dbeer": "q6dbeer",
    #                    "q6dsoda": "q6dsoda",
    #                    "q6drwin": "q6drwin",
    #                    "q6dwwin": "q6dwwin",
    #                    "q6ddwin": "q6ddwin",
    #                    "q6dvodk": "q6dvodk",
    #                    "q6eagdrk": "q6eagdrk",
    #                    "q7cagpr1": "q7cagpr1",
    #                    "q7cres1": "q7cres1",
    #                    "q7cagpr2": "q7cagpr2",
    #                    "q7cres2": "q7cres2",
    #                    "q7cagpr3": "q7cagpr3",
    #                    "q7cres3": "q7cres3",
    #                    "q7cagpr4": "q7cagpr4",
    #                    "q7cres4": "q7cres4",
    #                    "q7cagpr5": "q7cagpr5",
    #                    "q7cres5": "q7cres5",
    #                    "q7cagpr6": "q7cagpr6",
    #                    "q7cres6": "q7cres6",
    #                    "q7cagpr7": "q7cagpr7",
    #                    "q7cres7": "q7cres7",
    #                    "q7cagpr8": "q7cagpr8",
    #                    "q7cres8": "q7cres8",
    #                    "q7cagpr9": "q7cagpr9",
    #                    "q7cres9": "q7cres9",
    #                    "q8bpill": "q8bpill",
    #                    "q8bagpi": "q8bagpi",
    #                    "q8bdupi": "q8bdupi",
    #                    "q8bmini": "q8bmini",
    #                    "q8bagmi": "q8bagmi",
    #                    "q8bdumi": "q8bdumi",
    #                    "q8bspir": "q8bspir",
    #                    "q8bagsp": "q8bagsp",
    #                    "q8bdusp": "q8bdusp",
    #                    "q8both": "q8both",
    #                    "q8bagot": "q8bagot",
    #                    "q8bduot": "q8bduot",
    #                    "q8cmapi": "q8cmapi",
    #                    "q8cagma": "q8cagma",
    #                    "q8crema": "q8crema",
    #                    "q10conew": "q10conew",
    #                    "q11bno": "q11bno",
    #                    "q11bco": "q11bco",
    #                    "q11bhor": "q11bhor",
    #                    "q11bsafe": "q11bsafe",
    #                    "q11bwith": "q11bwith",
    #                    "q11bmorn": "q11bmorn",
    #                    "q11both": "q11both",
    #                    "q13youpa": "q13youpa",
    #                    "q15risk": "q15risk",
    #                    "q15agchl": "q15agchl",
    #                    "q15agher": "q15agher",
    #                    "q15agtri": "q15agtri",
    #                    "q15aggon": "q15aggon",
    #                    "q19vac": "q19vac",
    #                    "q19agvac": "q19agvac",
    #                    "q22awork": "q22awork",
    #                    "q22bhome": "q22bhome"}
    #
    # _renaming_en_s2.update(_renaming_en_both)
    #
    # make_all(_diag, _type, _drop_diag, _drop_col, _group, _raw_dir, _name, _idv, _renaming_en_s2,
    #          _renaming_ev, _sincelast, _index_values, _index_display, extra_drop=_drop_extra)
