from preprocessing.format_rows import to_unix, pre_process, change_diagnosis
from preprocessing.format_rows import pre_process_exams_query, merge_groups_parallel
import unittest
import pandas
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

    def test_pre_process_exams_only(self):
        # declare file locations
        rel_p = "./files_test_format_rows/"
        input_file = rel_p + "pre_process_input.csv"
        output_file = rel_p + "pre_process_output.csv"
        grouped_file = rel_p + "pre_process_merge_expected.csv"
        tmp_file = rel_p + "tmp.csv"
        expected_output_file = rel_p + "pre_process_expected_output.csv"
        expected_group_file = rel_p + "pre_process_merge_expected_output.csv"


        diag = {0: 11, 1: 12, 9: 13, 10: 14, 11: 15, 12: 16, 13: 17, 14: 18, 15: 19, 16: 21, 17: 22, 18: 23, 20: 25,
                21: 26, 22: 27, 30: 28, 31: 29, 32: 31, 33: 32, 34: 33, 35: 34, 99: 35, 41: 36, 42: 37, 43: 38}

        ntype = {'cyt':11, 'hist':12, 'cancer':13, 'hpv':14}

        group = {36: 36, 37: 36, 38: 36, 34: 31, 32: 31, 31: 31, 29: 25, 28: 25,
                 27: 25, 26: 25, 25: 25, 16: 16, 17: 16, 22: 18, 21: 18, 18: 18}

        drop = [15]

        # does preprocessing
        change_diagnosis(input_file, tmp_file, diag, ntype)
        pre_process(tmp_file, output_file, group, drop)

        # compare expected file with actual file
        output_dict = csv.DictReader(open(output_file, 'r'))
        expected_dict = csv.DictReader(open(expected_output_file, 'r'))

        # assert that all rows are the same
        for row1, row2 in zip(output_dict, expected_dict):
            self.assertDictEqual(row1, row2)

        merge_groups_parallel(output_file, grouped_file, drop=['stage'])

        # compare expected file with actual file
        output_dict = csv.DictReader(open(grouped_file, 'r'))
        expected_dict = csv.DictReader(open(expected_group_file, 'r'))

        # assert that all rows are the same
        for row1, row2 in zip(output_dict, expected_dict):
            self.assertDictEqual(row1, row2)

        print(">> preprocessing.format_rows.test_pre_process - OK")

        # cleans output file and temp file
        os.remove(grouped_file)
        os.remove(output_file)
        os.remove(tmp_file)

    def test_pre_process_exams_query(self):
        _original_name = "./files_test_format_rows/surveydata_sample.csv", "./files_test_format_rows/regdata_sample.csv"
        _pre_sv = "./files_test_format_rows/"
        _srctmp = ["s1.csv", "s2.csv", "mixed.csv"]  # joins all data in one big stupid file

        _undocumented = ["q14newpa"]

        _survey2fields = ["q5aagsto", "q5esnu", "q5esnust", "q5fagsnu", "q5g1snu", "q5g2snu", "q5g3snu", "q5g4snu",
                          "q5g5snu", "q5g6snu", "q5g7snu", "q5g8snu", "q6adrk", "q6aagsto", "q6bsoda", "q6brwin",
                          "q6bwwin", "q6bdwin", "q6dbeer", "q6dsoda", "q6drwin", "q6dwwin", "q6ddwin", "q6dvodk",
                          "q6eagdrk", "q7cagpr1", "q7cres1", "q7cagpr2", "q7cres2", "q7cagpr3", "q7cres3",
                          "q7cagpr4", "q7cres4", "q7cagpr5", "q7cres5", "q7cagpr6", "q7cres6", "q7cagpr7", "q7cres7",
                          "q7cagpr8", "q7cres8", "q7cagpr9", "q7cres9", "q8bpill", "q8bagpi", "q8bdupi", "q8bmini",
                          "q8bagmi", "q8bdumi", "q8bspir", "q8bagsp", "q8bdusp", "q8both", "q8bagot", "q8bduot",
                          "q8cmapi", "q8cagma", "q8crema", "q10conew", "q11bno", "q11bco", "q11bhor", "q11bsafe",
                          "q11bwith", "q11bmorn", "q11both", "q13youpa", "q15risk", "q15agchl", "q15agher", "q15agtri",
                          "q15aggon", "q19vac", "q19agvac", "q22awork", "q22bhome", "q23heigh", "q23weigh"]

        _survey1fields = ["c6c2wine", "c6b2beer", "c6b3soda", "c6b4rwin", "c6b5wwin", "c6b6dwin", "c6b7vodk",
                          "c6aagdrk", "c7aagepr", "c8aageco", "c8bhormc", "c8cyrhor", "c11conew"]

        _dest, _src = (_pre_sv, _srctmp[0], _srctmp[1], _srctmp[2]), (_original_name[0], _original_name[1])

        # condenses survey and the diagnosis into one file
        pre_process_exams_query(_src, _dest, _survey1fields, _survey2fields, _undocumented)

        surveydata, regdata = pandas.read_csv(_original_name[0]), pandas.read_csv(_original_name[1])

        s1, s2, both = pandas.read_csv(_pre_sv + _srctmp[0]), \
            pandas.read_csv(_pre_sv + _srctmp[1]), \
            pandas.read_csv(_pre_sv + _srctmp[2])

        all_values = set(surveydata.columns.values) \
            .union(set(regdata.columns.values)) \
            .difference(_undocumented + ['study'])

        s1_expected = all_values.difference(set(_survey2fields))

        s2_expected = all_values.difference(set(_survey1fields))

        both_expected = all_values.difference(set(_survey1fields)).difference(set(_survey2fields))

        # checks number of fields
        self.assertEqual(set(s1.columns.values), s1_expected)
        self.assertEqual(set(s2.columns.values), s2_expected)
        self.assertEqual(set(both.columns.values), both_expected)

        os.remove(_pre_sv + _srctmp[0])
        os.remove(_pre_sv + _srctmp[1])
        os.remove(_pre_sv + _srctmp[2])

        print(">> preprocessing.format_rows.test_pre_process_exams_query - OK")

