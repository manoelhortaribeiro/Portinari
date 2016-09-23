from preprocessing.format_rows import to_unix, pre_process
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

        rel_p = "./test_preprocessing/files/"
        input_file, output_file = rel_p + "pre_process_input.csv", rel_p + "pre_process_output.csv"
        expected_output_file = rel_p + "pre_process_expected_output.csv"

        # does preprocessing
        pre_process(input_file, output_file)

        # compare expected file with actual file
        output_dict = csv.DictReader(open(output_file, 'r'))
        expected_dict = csv.DictReader(open(expected_output_file, 'r'))

        # assert that all rows are the same
        for row1, row2 in zip(output_dict, expected_dict):
            self.assertDictEqual(row1, row2)

        # cleans output file
        os.remove(output_file)

        print(">> preprocessing.format_rows.test_pre_process - OK")
