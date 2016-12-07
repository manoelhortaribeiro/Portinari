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
         p.map(f, range_of)

    os.system('cat ' + patient_dest + 'r* > ' + patient_dest)
    os.system('rm ' + patient_dest + 'r*')

    make_exams_tables(to_drop_ex, renaming_ex, main_df, exams_dest)

