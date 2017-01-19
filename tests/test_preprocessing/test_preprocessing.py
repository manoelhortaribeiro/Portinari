from preprocessing.preprocess import make_all
import unittest
import json
import csv
import os


class TestPreprocessing(unittest.TestCase):

    @staticmethod
    def compare_csv(f1, f2):
        # compare expected file with actual file
        output_dict = csv.DictReader(open(f1, 'r'))
        expected_dict = csv.DictReader(open(f2, 'r'))

        return zip(output_dict, expected_dict)

    def test_rename(self):

        test1 = json.loads(open("./data/test.json", "r").read())
        make_all(test1)

        compare = TestPreprocessing.compare_csv("./data/entity_test1.csv", "./data/expected_entity_test1.csv")

        for r1, r2, in compare:
                self.assertDictEqual(r1, r2)

        os.remove("./data/entity_test1.csv")
        os.remove("./data/events_test1.csv")



