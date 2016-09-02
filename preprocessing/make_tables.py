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


def make_individual_table(x):
    """
    This function is responsible for extracting the data from each group (Records of different patients)
    :param x: DataFrame containing a single group of a groupBy.
    :return: Treated data frame.
    """

    string_rep = ""
    for i, j in zip(x['sincelast'].values, x['diagnosis1'].values):
        string_rep += 't{0}d{1}'.format(i, j)

    if get_first_pdseries(x['ID']) % 50000 == 0:
        print(get_first_pdseries(x['ID']))
        gc.collect()

    return pd.DataFrame.from_dict(data=dict(PatientID=get_first_pdseries(x['ID']),
                                            Birthdate=get_first_pdseries(x['birthdate']),
                                            CensorDate=get_first_pdseries(x['censordate']),
                                            StringRep=[string_rep]))


def make_patient_tables(ran, df, dest):
    """
    This function queries a range of ids and generates their individual tables.
    :param ran: Tuple containing the start and end of the range.
    :param df: data frame with preprocessed data.
    :param dest: destination of the file.
    :return: Nothing.
    """

    df = df.query('ID >= ' + str(ran[0]))
    df = df.query('ID < ' + str(ran[1]))
    patients_table_raw = df.groupby('ID').apply(make_individual_table)
    patients_table_raw.to_csv(dest + 'r' + str(ran[0]) + str(ran[1]), mode='w', index=False)


def make_exams_tables(rows_to_drop, df, dest):
    df.drop(rows_to_drop, axis=1, inplace=True)
    df.to_csv(dest, mode='w', index=False)

if __name__ == '__main__':
    source = "./preprocessed/opencrab_processed.csv"
    patient_dest = "./final/patients.csv"
    exams_dest = "./final/exams.csv"

    main_df = pd.read_csv("./preprocessed/opencrab_processed.csv")

    # - Patients Table
    f = functools.partial(make_patient_tables, df=main_df, dest=patient_dest)

    range_of = list(zip(list(range(0, 1000000, 100000)), list(range(100000, 1100000, 100000))))
    with Pool(3) as p:
        ret_list = p.map(f, range_of)

    os.system('cat ' + patient_dest + 'r* > ' + patient_dest)
    os.system('rm ' + patient_dest + 'r*')

    # - Exams Table
    make_exams_tables(['birthdate', 'censordate'], main_df, exams_dest)

