import numpy as np
import unittest
import pandas
import pickle
import json
import os


class TestPreprocessing(unittest.TestCase):
    def test_bool_drop(self):
        from preprocessing.preprocess import bool_drop

        default, table = "event", "event"

        self.assertEqual(bool_drop(default, table, "true", "true"), False)
        self.assertEqual(bool_drop(default, table, "true", "false"), False)
        self.assertEqual(bool_drop(default, table, "false", "true"), True)
        self.assertEqual(bool_drop(default, table, "false", "false"), False)

        self.assertEqual(bool_drop(default, table, "nothing", "false"), False)
        self.assertEqual(bool_drop(default, table, "false", "nothing"), False)
        self.assertEqual(bool_drop(default, table, "nothing", "true"), True)
        self.assertEqual(bool_drop(default, table, "true", "nothing"), False)
        self.assertEqual(bool_drop(default, table, "nothing", "nothing"), False)

        default, table = "entity", "entity"

        self.assertEqual(bool_drop(default, table, "true", "true"), False)
        self.assertEqual(bool_drop(default, table, "true", "false"), True)
        self.assertEqual(bool_drop(default, table, "false", "true"), False)
        self.assertEqual(bool_drop(default, table, "false", "false"), False)

        self.assertEqual(bool_drop(default, table, "nothing", "false"), False)
        self.assertEqual(bool_drop(default, table, "false", "nothing"), False)
        self.assertEqual(bool_drop(default, table, "nothing", "true"), False)
        self.assertEqual(bool_drop(default, table, "true", "nothing"), True)
        self.assertEqual(bool_drop(default, table, "nothing", "nothing"), False)

        default, table = "entity", "event"

        self.assertEqual(bool_drop(default, table, "true", "true"), False)
        self.assertEqual(bool_drop(default, table, "true", "false"), False)
        self.assertEqual(bool_drop(default, table, "false", "true"), True)
        self.assertEqual(bool_drop(default, table, "false", "false"), False)

        self.assertEqual(bool_drop(default, table, "nothing", "false"), False)
        self.assertEqual(bool_drop(default, table, "false", "nothing"), False)
        self.assertEqual(bool_drop(default, table, "nothing", "true"), True)
        self.assertEqual(bool_drop(default, table, "true", "nothing"), False)
        self.assertEqual(bool_drop(default, table, "nothing", "nothing"), True)

        default, table = "entity", "entity"

        self.assertEqual(bool_drop(default, table, "true", "true"), False)
        self.assertEqual(bool_drop(default, table, "true", "false"), True)
        self.assertEqual(bool_drop(default, table, "false", "true"), False)
        self.assertEqual(bool_drop(default, table, "false", "false"), False)

        self.assertEqual(bool_drop(default, table, "nothing", "false"), False)
        self.assertEqual(bool_drop(default, table, "false", "nothing"), False)
        self.assertEqual(bool_drop(default, table, "nothing", "true"), False)
        self.assertEqual(bool_drop(default, table, "true", "nothing"), True)
        self.assertEqual(bool_drop(default, table, "nothing", "nothing"), False)

    def test_time_flags(self):
        from preprocessing.preprocess import to_unix, unapply_time_flag, apply_time_flag

        config = {"nan": -999, "time_format": "%d.%m.%Y"}

        self.assertEqual(to_unix("01.01.1970", "to_sec", config), 0)
        self.assertEqual(to_unix("02.01.1970", "to_sec", config), 86400)

        self.assertEqual(to_unix("01.01.1970", "to_hour", config), 0)
        self.assertEqual(to_unix("02.01.1970", "to_hour", config), 24)

        self.assertEqual(to_unix("01.01.1970", "to_year", config), 0)
        self.assertEqual(to_unix("01.01.2000", "to_year", config), 30)

        one_day_in_secs = to_unix("02.01.1970", "to_sec", config)
        self.assertEqual(apply_time_flag(one_day_in_secs, "to_hour", config), 24)

        thirty_years_in_months = to_unix("01.01.2000", "to_month", config)
        self.assertEqual(unapply_time_flag(thirty_years_in_months, "to_month", config), 946080000)

    def test_drop_cols(self):
        from preprocessing.preprocess import drop_cols

        config = {"variables": {
            "a": {"new_name": "A", "event": "true", "entity": "true"},
            "b": {"new_name": "B", "event": "false", "entity": "true"},
            "c": {"new_name": "C", "event": "true", "entity": "false"},
            "d": {"new_name": "D", "event": "true"},
            "e": {"new_name": "E", "entity": "true"}
        },
            "age": "Age",
            "sincelast": "SinceLast"
        }

        all_v = ["A", "B", "C", "D", "E", "f", "g", "Age", "SinceLast"]

        c_1 = drop_cols("event", "event", config["variables"], all_v, config["age"], config["sincelast"])
        a_1 = ['E', 'B']
        self.assertTrue(set(c_1) == set(a_1))

        c_2 = drop_cols("entity", "event", config["variables"], all_v, config["age"], config["sincelast"])
        a_2 = ['E', 'B', 'f', 'g']
        self.assertTrue(set(c_2) == set(a_2))

        c_3 = drop_cols("event", "entity", config["variables"], all_v, config["age"], config["sincelast"])
        a_3 = ['C', 'D', 'f', 'g', 'Age', 'SinceLast']
        self.assertTrue(set(c_3) == set(a_3))

        c_4 = drop_cols("entity", "entity", config["variables"], all_v, config["age"], config["sincelast"])
        a_4 = ['C', 'D', 'Age', 'SinceLast']
        self.assertTrue(set(c_4) == set(a_4))

    def test_fill_na(self):
        from preprocessing.preprocess import fill_na

        config = {"nan": -1}

        dfo = pandas.DataFrame(data={"a": [2., 4., 8., 16., 32., 64.], "b": [1., 2., np.nan, 3., np.nan, 4.]})
        dfn = pandas.DataFrame(data={"a": [2., 4., 8., 16., 32., 64.], "b": [1., 2., -1., 3., -1., 4.]})

        for row1, row2 in zip(dfn.values, fill_na(dfo, config).values):
            self.assertListEqual(list(row1), list(row2))

    def test_drop_cols_vals(self):
        from preprocessing.preprocess import drop_cols_vals

        config = {"variables": {"a": {"drop_col": "true"}, "b": {"drop_val": [3, 4]}}}

        dfo = pandas.DataFrame(data={"a": [2., 4., 8., 16., 32., 64.],
                                     "b": [1., 2., -1., 3., -1., 4.],
                                     "c": [0., 1., -2., 3., -4., 5]})

        dfn = pandas.DataFrame(data={"b": [1., 2., -1., -1.],
                                     "c": [0., 1., -2., -4.]})

        for row1, row2 in zip(dfn.values, drop_cols_vals(dfo, config).values):
            self.assertListEqual(list(row1), list(row2))

    def test_rename(self):
        from preprocessing.preprocess import rename

        config = {"variables": {"a": {"new_name": "A"}, "b": {"new_name": "B"}}}

        dfo = pandas.DataFrame(data={"a": [2., 4., 8., 16., 32., 64.],
                                     "b": [1., 2., -1., 3., -1., 4.]})
        dfn = pandas.DataFrame(data={"A": [2., 4., 8., 16., 32., 64.],
                                     "B": [1., 2., -1., 3., -1., 4.]})

        self.assertListEqual(list(dfn.columns.values), list(rename(dfo, config).columns.values))

    def test_time_conversion(self):
        from preprocessing.preprocess import time_conversion

        config = {"variables": {"a": {"new_name": "A", "conversion": "to_month"}},
                  "time_format": "%d.%m.%Y",
                  "nan": -9999}
        dfn = pandas.DataFrame(data={"A": ["01.01.1970", -9999, "01.07.1970", "01.01.1971"]})
        dfo = pandas.DataFrame(data={"A": [0, -9999, 5, 12]})

        row1 = list(time_conversion(dfn, config)["A"].values)
        row2 = list(dfo["A"].values)

        self.assertListEqual(row1, row2)

    def test_calculate_age(self):
        from preprocessing.preprocess import calculate_age

        config = {
            "variables": {"diagnosisdate": {"new_name": "DiagnosisDate", "conversion": "to_month"},
                          "birthdate": {"new_name": "Birthdate", "conversion": "to_month"}},
            "eventdate": "diagnosisdate",
            "entitycreation": "birthdate",
            "sincelast": "SinceLast",
            "age": "Age",
            "age_conversion": "to_year",
            "nan": -9999}

        dfn = pandas.DataFrame(data={"Birthdate": [0, 0, 0, 0],
                                     "DiagnosisDate": [0, 12, 13, 25]})

        self.assertListEqual(list(calculate_age(dfn, config)["Age"].values), [0, 1, 1, 2])

    def test_calculate_sincelast(self):
        from preprocessing.preprocess import calculate_sincelast
        config = {
            "variables": {
                "id": {"new_name": "ID"},
                "diagnosisdate": {"new_name": "DiagnosisDate", "conversion": "to_month"},
                "birthdate": {"new_name": "Birthdate", "conversion": "to_month"}},
            "eventdate": "diagnosisdate",
            "entitycreation": "birthdate",
            "sincelast": "SinceLast",
            "age": "Age",
            "age_conversion": "to_year",
            "nan": -9999,
            "id": "id"
        }

        dfn = pandas.DataFrame(data={"ID": [0, 0, 0, 0, 1, 1, 1, 1],
                                     "Birthdate": [0, 0, 0, 0, 31, 31, 31, 31],
                                     "DiagnosisDate": [0, 12, 13, 25, 32, 54, 100, 131]})

        self.assertListEqual(list(calculate_sincelast(dfn, config)["SinceLast"].values), [0, 12, 1, 12, 0, 22, 46, 31])

    def test_make_numeric(self):
        from preprocessing.preprocess import make_numeric

        df = pandas.DataFrame(data={"a": ["1.0", "2.0", "3.", "4.0", "5.0", "4.0"]})
        self.assertListEqual(list(make_numeric(df)["a"].values), [1, 2, 3, 4, 5, 4])

    def test_make_all(self):
        from preprocessing.preprocess import make_all

        config = json.load(open("./data/config.json", "r"))
        make_all(config)

        data_entity = pickle.load(open("./data/data_entity", "rb"))
        data_event = pickle.load(open("./data/data_event", "rb"))

        data_entity_true = pandas.read_csv("./data/data_entity_true.csv")
        data_event_true = pandas.read_csv("./data/data_event_true.csv")

        for row1, row2 in zip(data_entity.values, data_entity_true.values):
            for el1, el2 in zip(row1, row2):
                self.assertEqual(el1, el2)

        for row1, row2 in zip(data_event_true.values, data_event_true.values):
            for el1, el2 in zip(row1, row2):
                self.assertEqual(el1, el2)

        os.remove("./data/data_event")
        os.remove("./data/data_entity")
