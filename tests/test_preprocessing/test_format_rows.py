from preprocessing.format_rows import to_unix, pre_process_exams_only
import unittest
import csv
import os


class TestFormatRows(unittest.TestCase):

    def test_to_unix(self):

        # start of unix time is 0
        self.assertEquals(to_unix("01.01.1970"), 0)

        # one day after unix time is 1
        self.assertEquals(to_unix("02.01.1970"), 1)

        # one year after unix time is 365
        self.assertEquals(to_unix("01.01.1971"), 365)

        # empty string is empty string
        self.assertEquals(to_unix(""), "")

        print(">> preprocessing.format_rows.to_unix - OK")

    def test_pre_process(self):

        # declare file locations
        rel_p = "./files/"
        input_file, output_file = rel_p + "pre_process_input.csv", rel_p + "pre_process_output.csv"
        expected_output_file = rel_p + "pre_process_expected_output.csv"

        # declare diagnosis hash
        new_diagnosis = {0: 11, 1: 12, 9: 13, 10: 14, 11: 15, 12: 16, 13: 17, 14: 18, 15: 19, 16: 21, 17: 22, 18: 23,
                         10: 14, 20: 25, 21: 26, 22: 27, 30: 28, 31: 29, 32: 31, 33: 32, 34: 33, 35: 34, 99: 35, 41: 36,
                         42: 37, 43: 38}

        # does preprocessing
        pre_process_exams_only(input_file, output_file, new_diagnosis)

        # compare expected file with actual file
        output_dict = csv.DictReader(open(output_file, 'r'))
        expected_dict = csv.DictReader(open(expected_output_file, 'r'))

        # assert that all rows are the same
        for row1, row2 in zip(output_dict, expected_dict):
            self.assertDictEqual(row1, row2)

        # cleans output file
        os.remove(output_file)

        print(">> preprocessing.format_rows.test_pre_process - OK")
