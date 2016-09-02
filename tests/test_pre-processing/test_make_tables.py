from make_tables import get_first_pdseries, make_individual_table, make_patient_tables
import unittest
import pandas
import os

class TestFormatRows(unittest.TestCase):

    def test_get_first_pdseries(self):

        # creates series of different types
        series1, series2 = pandas.Series([1]), pandas.Series([7, 3, 4, 5, 6])

        # tests first_pdseries
        self.assertEqual(get_first_pdseries(series1), 1)
        self.assertEqual(get_first_pdseries(series2), 7)

        print(">> preprocessing.make_tables.get_first_pdseries - OK")

    def test_make_individual_table(self):

        # make data frames
        dataframe = pandas.read_csv('./test_pre-processing/files/make_individual_table_input.csv')
        expected_dataframe = pandas.read_csv('./test_pre-processing/files/make_individual_table_expected_output.csv')

        # make individual table
        individual_table = make_individual_table(dataframe)

        # assert these two things are equal
        self.assertDictEqual(expected_dataframe.to_dict(), individual_table.to_dict())

        print(">> preprocessing.make_tables.make_individual_table - OK")

    def test_make_patient_tables(self):

        ran = (0, 3)
        rel_p = "./test_pre-processing/files/"
        input_file, output_file = rel_p + "make_patient_tables_input.csv", rel_p + "make_patient_tables_output.csv"
        expected_output_file = rel_p + "make_patient_tables_expected_output.csv"

        # read data frames
        dataframe = pandas.read_csv(input_file)

        # make tables
        make_patient_tables(ran, dataframe, output_file)

        # clean tmp files
        os.system('cat ' + output_file + 'r* > ' + output_file)

        # compare expected and actual output
        output_dataframe = pandas.read_csv(output_file)
        expected_dataframe = pandas.read_csv(expected_output_file)
        self.assertEqual(output_dataframe.to_dict(), expected_dataframe.to_dict())

        # clean out files
        os.system('rm ' + output_file + '*')

        print(">> preprocessing.make_tables.make_patient_tables - OK")
