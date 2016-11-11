from preprocessing.format_rows import to_unix, pre_process_exams_only, change_diagnosis
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
        input_file = rel_p + "pre_process_input.csv"
        output_file = rel_p + "pre_process_output.csv"
        tmp_file = rel_p + "tmp.csv"
        expected_output_file = rel_p + "pre_process_expected_output.csv"

        diag = {0: 11, 1: 12, 9: 13, 10: 14, 11: 15, 12: 16, 13: 17, 14: 18, 15: 19, 16: 21, 17: 22, 18: 23, 20: 25,
                21: 26, 22: 27, 30: 28, 31: 29, 32: 31, 33: 32, 34: 33, 35: 34, 99: 35, 41: 36, 42: 37, 43: 38}

        group = {36: 36, 37: 36, 38: 36, 34: 31, 32: 31, 31: 31, 29: 25, 28: 25,
                 27: 25, 26: 25, 25: 25, 16: 16, 17: 16, 22: 18, 21: 18, 18: 18}

        drop = [15]

        # does preprocessing
        change_diagnosis(input_file, tmp_file, diag)
        pre_process_exams_only(tmp_file, output_file, group, drop)

        # compare expected file with actual file
        output_dict = csv.DictReader(open(output_file, 'r'))
        expected_dict = csv.DictReader(open(expected_output_file, 'r'))

        # assert that all rows are the same
        for row1, row2 in zip(output_dict, expected_dict):
            self.assertDictEqual(row1, row2)

        # cleans output file and temp file
        os.remove(output_file)
        os.remove(tmp_file)

        print(">> preprocessing.format_rows.test_pre_process - OK")
