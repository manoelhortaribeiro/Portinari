from multiprocessing import Pool
import pandas as pd
import functools
import gc
import os


def get_first_pdseries(series):
    """
    This function returns the first value of the first element of a panda series.
    :param series: panda series.
    :return: First value of the first element.
    """
    return series.head(1).values[0]


def make_individual_table(x, renam):
    """
    This function is responsible for extracting the data from each group (Records of different patients)
    :param x: DataFrame containing a single group of a groupBy.
    :param renam: hash containing the renaming for the patient table attributes.
    :return: Treated data frame.
    """

    string_rep = ""
    for i, j in zip(x['sincelast'].values, x['diagnosis1'].values):
        string_rep += 't{0}d{1}'.format(i, j)

    if get_first_pdseries(x['ID']) % 10000 == 0:
        gc.collect()

    tmp = {}

    for key, item in renam.items():
        tmp[item] = get_first_pdseries(x[key])

    tmp['StringRep'] = [string_rep]

    return pd.DataFrame.from_dict(data=tmp)


def make_patient_tables(ran, df, dest, renaming_hash):
    """
    This function queries a range of ids and generates their individual tables.
    :param ran: Tuple containing the start and end of the range.
    :param df: data frame with preprocessed data.
    :param dest: destination of the file.
    :param renaming_hash: hash containing the renaming for the patient table attributes.
    :return: Nothing.
    """

    has_header = False
    if ran[0] == 0:
        has_header = True

    f = functools.partial(make_individual_table, renam=renaming_hash)

    df = df.query('ID >= ' + str(ran[0]))
    df = df.query('ID < ' + str(ran[1]))

    patients_table_raw = df.groupby('ID').apply(f)

    patients_table_raw.to_csv(dest + 'r' + str(ran[0]) + str(ran[1]), mode='w', index=False, header=has_header)


def make_exams_tables(rows_to_drop, renaming_hash, df, dest):
    """
    This function drops the rows used in the patients tables and creates a table just with the exams.
    :param rows_to_drop: Rows that will be dropped in dataframe.
    :param renaming_hash: hash with the new names.
    :param df: Dataframe.
    :param dest: destination of the file.
    :return: Nothing.
    """
    df.drop(rows_to_drop, axis=1, inplace=True)
    df.rename(columns=renaming_hash, inplace=True)

    df.to_csv(dest, mode='w', index=False)


def parallel_parsing(source, patient_dest, exams_dest, renaming_pa, renaming_ex, to_drop_ex):
    main_df = pd.read_csv(source)

    f = functools.partial(make_patient_tables, df=main_df, dest=patient_dest, renaming_hash=renaming_pa)

    range_of = list(zip(list(range(0, 1000000, 100000)), list(range(100000, 1100000, 100000))))
    with Pool(2) as p:
        ret_list = p.map(f, range_of)

    os.system('cat ' + patient_dest + 'r* > ' + patient_dest)
    os.system('rm ' + patient_dest + 'r*')

    make_exams_tables(to_drop_ex, renaming_ex, main_df, exams_dest)


if __name__ == '__main__':

    # -- OPENCRAB DATASET

    # - Patients Table
    _renaming_pa = {'ID': 'PatientID',
                    'birthdate': 'Birthdate',
                    'censordate': 'CensorDate'}

    # - Exams Table
    _renaming_ex = {'ID': 'PatientID', 'diagnosisdate': 'DiagnosisDate',
                    'diagnosisnumber': 'DiagnosisNbr', 'type': 'ExamType',
                    'diagnosis1': 'Diagnosis', 'diagnosis2': 'MorphologyCode',
                    'stage': 'Stage', 'lab_nr': 'LaboratoryNbr',
                    'reg': 'Region', 'sincelast': 'TimeSinceLast', 'age': 'Age'}

    _to_drop_ex = list(_renaming_pa.keys())
    _to_drop_ex.remove('ID')

    parallel_parsing(source="./preprocessed/opencrab/opencrab_processed_sample.csv",
                     patient_dest="./final/opencrab/patients_sample.csv",
                     exams_dest="./final/opencrab/exams_sample.csv",
                     renaming_pa=_renaming_pa,
                     renaming_ex=_renaming_ex,
                     to_drop_ex=_to_drop_ex)

    # -- SURVEYS DATASET

    # - Patients Table
    _renaming_pa_both = {
        'ID': 'PatientID', 'birthdate': 'Birthdate', 'censordate': 'CensorDate', "typeres": "typeres",
        "q2amarit": "q2amarit", "q3school": "q3school", "q4health": "q4health",
        "q5asmoke": "q5asmoke", "q5bagsmk": "q5bagsmk", "q5clgsmk": "q5clgsmk", "q5d1cig": "q5d1cig",
        "q5d2cig": "q5d2cig", "q5d3cig": "q5d3cig", "q5d4cig": "q5d4cig", "q5d5cig": "q5d5cig",
        "q5d6cig": "q5d6cig", "q5d7cig": "q5d7cig", "q5d8cig": "q5d8cig", "q6bbeer": "q6bbeer",
        "q6bvodk": "q6bvodk", "q6csixdr": "q6csixdr", "q7apregn": "q7apregn", "q7bbirth": "q7bbirth",
        "q8acontr": "q8acontr", "q9condom": "q9condom", "q9agecon": "q9agecon", "q12totpa": "q12totpa",
        "q15chla": "q15chla", "q15herp": "q15herp", "q15tric": "q15tric", "q15gono": "q15gono",
        "q16heard": "q16heard", "q17hadgw": "q17hadgw", "q17aggw": "q17aggw", "q18trtgw": "q18trtgw",
        "q20know": "q20know", "q21necc": "q21necc"
    }

    _remaining_pa_s2 = {"q5aagsto": "q5aagsto", "q5esnu": "q5aagsto", "q5esnust": "q5esnust", "q5fagsnu": "q5fagsnu",
                        "q5g1snu": "q5g1snu", "q5g2snu": "q5g2snu", "q5g3snu": "q5g3snu", "q5g4snu": "q5g4snu",
                        "q5g5snu": "q5g5snu", "q5g6snu": "q5g6snu", "q5g7snu": "q5g7snu", "q5g8snu": "q5g8snu",
                        "q6adrk": "q6adrk", "q6aagsto": "q6aagsto", "q6bsoda": "q6bsoda", "q6brwin": "q6brwin",
                        "q6bwwin": "q6bwwin", "q6bdwin": "q6bdwin", "q6dbeer": "q6dbeer", "q6dsoda": "q6dsoda",
                        "q6drwin": "q6drwin", "q6dwwin": "q6dwwin", "q6ddwin": "q6ddwin", "q6dvodk": "q6dvodk",
                        "q6eagdrk": "q6eagdrk", "q7cagpr1": "q7cagpr1", "q7cres1": "q7cres1", "q7cagpr2": "q7cagpr2",
                        "q7cres2": "q7cres2", "q7cagpr3": "q7cagpr3", "q7cres3": "q7cres3", "q7cagpr4": "q7cagpr4",
                        "q7cres4": "q7cres4", "q7cagpr5": "q7cagpr5", "q7cres5": "q7cres5", "q7cagpr6": "q7cagpr6",
                        "q7cres6": "q7cres6", "q7cagpr7": "q7cagpr7", "q7cres7": "q7cres7", "q7cagpr8": "q7cagpr8",
                        "q7cres8": "q7cres8", "q7cagpr9": "q7cagpr9", "q7cres9": "q7cres9", "q8bpill": "q8bpill",
                        "q8bagpi": "q8bagpi", "q8bdupi": "q8bdupi", "q8bmini": "q8bmini", "q8bagmi": "q8bagmi",
                        "q8bdumi": "q8bdumi", "q8bspir": "q8bspir", "q8bagsp": "q8bagsp", "q8bdusp": "q8bdusp",
                        "q8both ": "q8both ", "q8bagot": "q8bagot", "q8bduot": "q8bduot", "q8cmapi": "q8cmapi",
                        "q8cagma": "q8cagma", "q8crema": "q8crema", "q10conew": "q10conew", "q11bno": "q11bno",
                        "q11bco": "q11bco", "q11bhor": "q11bhor", "q11bsafe": "q11bsafe", "q11bwith": "q11bwith",
                        "q11bmorn": "q11bmorn", "q11both": "q11both", "q13youpa": "q13youpa", "q15risk": "q15risk",
                        "q15agchl": "q15agchl", "q15agher": "q15agher", "q15agtri": "q15agtri",
                        "q15aggon": "q15aggon", "q19vac": "q19vac", "q19agvac": "q19agvac", "q22awork": "q22awork",
                        "q22bhome": "q22bhome", "q23heigh": "q23heigh", "q23weigh": "q23weigh"}
    _remaining_pa_s2.update(_renaming_pa_both)

    _remaining_pa_s1 = {"c6c2wine": "c6c2wine", "c6b2beer": "c6b2beer", "c6b3soda": "c6b3soda",
                        "c6b4rwin": "c6b4rwin", "c6b5wwin": "c6b5wwin", "c6b6dwin": "c6b6dwin",
                        "c6b7vodk": "c6b7vodk", "c6aagdrk": "c6aagdrk", "c7aagepre": "c7aagepre",
                        "c8aageco": "c8aageco", "c8bhormc": "c8bhormc", "c8cyrhor": "c8cyrhor", "c11conew": "c11conew"}
    _remaining_pa_s1.update(_renaming_pa_both)

    # - Exams Table
    _renaming_ex = {'ID': 'PatientID', 'diagnosisdate': 'DiagnosisDate',
                    'diagnosisnumber': 'DiagnosisNbr', 'type': 'ExamType',
                    'diagnosis1': 'Diagnosis', 'diagnosis2': 'MorphologyCode',
                    'stage': 'Stage', 'lab_nr': 'LaboratoryNbr',
                    'reg': 'Region', 'sincelast': 'TimeSinceLast', 'age': 'Age'}

    _to_drop_ex = list(_renaming_pa.keys())
    _to_drop_ex.remove('ID')

    parallel_parsing(source="./preprocessed/surveys/mixed.csv",
                     patient_dest="./final/surveys/mixed_patients.csv",
                     exams_dest="./final/surveys/mixed_exams.csv",
                     renaming_pa=_renaming_pa,
                     renaming_ex=_renaming_ex,
                     to_drop_ex=_to_drop_ex)

    parallel_parsing(source="./preprocessed/surveys/s1.csv",
                     patient_dest="./final/surveys/s1_patients.csv",
                     exams_dest="./final/surveys/s1_exams.csv",
                     renaming_pa=_renaming_pa,
                     renaming_ex=_renaming_ex,
                     to_drop_ex=_to_drop_ex)

    parallel_parsing(source="./preprocessed/surveys/s2.csv",
                     patient_dest="./final/surveys/s2_patients.csv",
                     exams_dest="./final/surveys/s2_exams.csv",
                     renaming_pa=_renaming_pa,
                     renaming_ex=_renaming_ex,
                     to_drop_ex=_to_drop_ex)
