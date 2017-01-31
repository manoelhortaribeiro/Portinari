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

    def test_preprocessing(self):

        # ---- Test 1

        test1 = json.loads(open("./test_preprocessing/data/test1.json", "r").read())
        make_all(test1)

        compare = TestPreprocessing.compare_csv("./test_preprocessing/data/entity_test1.csv",
                                                "./test_preprocessing/data/expected_entity_test1.csv")

        for r1, r2, in compare:
            self.assertDictEqual(r1, r2)

        os.remove("./test_preprocessing/data/entity_test1.csv")
        os.remove("./test_preprocessing/data/events_test1.csv")

        print(">> preprocessing integration test 1 - OK")

        # ---- Test 2

        test2 = json.loads(open("./test_preprocessing/data/test2.json", "r").read())
        make_all(test2)

        compare = TestPreprocessing.compare_csv("./test_preprocessing/data/entity_test2.csv",
                                                "./test_preprocessing/data/expected_entity_test2.csv")

        for r1, r2, in compare:
            self.assertDictEqual(r1, r2)

        os.remove("./test_preprocessing/data/entity_test2.csv")
        os.remove("./test_preprocessing/data/events_test2.csv")

        print(">> preprocessing integration test 2 - OK")

        # ---- Test 3

        test3 = json.loads(open("./test_preprocessing/data/test3.json", "r").read())
        make_all(test3)

        compare = TestPreprocessing.compare_csv("./test_preprocessing/data/entity_test3.csv",
                                                "./test_preprocessing/data/expected_entity_test3.csv")

        for r1, r2, in compare:
            self.assertDictEqual(r1, r2)

        os.remove("./test_preprocessing/data/entity_test3.csv")
        os.remove("./test_preprocessing/data/events_test3.csv")

        print(">> preprocessing integration test 2 - OK")
