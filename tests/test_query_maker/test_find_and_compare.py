import unittest
import pandas
import numpy as np


def function(df):
    df['b'] **= 2
    return df


class TestFindAndCompare(unittest.TestCase):
    def test_filter_data_id(self):
        from backend.query_maker.get_individuals import filter_data_id

        a = pandas.DataFrame(data={"a": [1, 2], "b": [3, 4], "c": [5, 6]}, index=[1, 2])
        b = pandas.DataFrame(data={"a": [1], "b": [3], "c": [5]}, index=[1])
        config = {"id_attribute": {"name": "a"}}

        self.assertTrue(filter_data_id(a, b.index, config).equals(b))

        print(">> backend.query_maker.get_individuals - OK")

    def test_get_tuple(self):
        from backend.query_maker.get_individuals import get_tuple

        config = {"attr_n": {"name": "val"}}
        edge1 = {'val': [['>', '<'], ['0', '2'], 'range']}
        edge2 = {'val': [['>', '>'], ['30', '50'], 'range']}
        edge3 = {'val': [['<', '<'], ['-10', '-1'], 'range']}

        self.assertEqual(get_tuple(config, edge1, -1, 3, "attr_n"), [0, 2])
        self.assertEqual(get_tuple(config, edge2, 100, 500, "attr_n"), [100, 500])
        self.assertEqual(get_tuple(config, edge3, -5000, 0, "attr_n"), [-5000, -10])

        print(">> backend.query_maker.get_individuals - OK")

    def test_appending_help(self):
        from backend.query_maker.get_individuals import appending_help

        values = [['a', '>', '0'], ['a', '<', '15'],
                  ['b', '==', '1'], ['b', '!=', '2'],
                  ['c', '>', '2'], ['c', '==', '3']]

        self.assertEqual(appending_help(values), {'a': [['>', '<'], ['0', '15'], "range"],
                                                  'b': [['==', '!='], ['1', '2'], "categorical"],
                                                  'c': [['>', '=='], ['2', '3'], "range"]})

        print(">> backend.query_maker.appending_help - OK")

    def test_check_time(self):
        from backend.query_maker.get_individuals import check_time

        t_tim = [[[0, 10]], [[-5, 0]], [[10, 25]]]
        t_hop = [[[0, 100]], [[2, 5]], [[5, 30]]]

        self.assertFalse(check_time(t_tim[0], t_hop[0], acc_hop=0, acc_tim=0))
        self.assertTrue(check_time(t_tim[0], t_hop[0], acc_hop=1, acc_tim=1))
        self.assertFalse(check_time(t_tim[1], t_hop[1], acc_hop=3, acc_tim=3))
        self.assertTrue(check_time(t_tim[1], t_hop[1], acc_hop=3, acc_tim=-3))
        self.assertFalse(check_time(t_tim[2], t_hop[2], acc_hop=31, acc_tim=20))
        self.assertTrue(check_time(t_tim[2], t_hop[2], acc_hop=29, acc_tim=20))

        print(">> backend.query_maker.check_time - OK")

    def test_apply_parallel(self):
        from backend.query_maker.get_individuals import apply_parallel

        a = pandas.DataFrame(data={"a": [1, 1, 2, 2], "b": [10, 100, 20, 200]}, index=[1, 2, 3, 4])
        b = pandas.DataFrame(data={"a": [1, 1, 2, 2], "b": [100, 10000, 400, 40000]}, index=[1, 2, 3, 4])

        self.assertTrue(apply_parallel(a.groupby("a"), function).equals(b))

        print(">> backend.query_maker.apply_parallel - OK")

    def test_to_df(self):
        from backend.query_maker.get_individuals import to_df

        a = pandas.DataFrame(data={"Position": [1], "IDX": [0]}, index=[10])

        self.assertTrue(to_df(1, 0, 10).equals(a))

        print(">> backend.query_maker.to_df - OK")

    def test_filter_attributes(self):
        from backend.query_maker.get_individuals import filter_attributes as f

        a = pandas.DataFrame(data={"ID": [44], "a": [-99], "b": [70]}, index=[5])

        values1 = [['a', '==', '0']]
        values2 = [['b', '==', '70']]
        values3 = [['b', '!=', '70']]
        values4 = [['b', '>', '50'], ['b', '<', '75']]

        config = {"nan_int": -99, "id_attribute": {"name": "ID"}}

        self.assertTrue(np.array_equal(f(a, values1, config, flag=False), np.array([], dtype=np.int64)))
        self.assertTrue(f(a, values1, config, flag=True).equals(pandas.Int64Index([], dtype='int64')))

        self.assertTrue(np.array_equal(f(a, values2, config, flag=False), np.array([44], dtype=np.int64)))
        self.assertTrue(f(a, values2, config, flag=True).equals(pandas.Int64Index([5], dtype='int64')))

        self.assertTrue(np.array_equal(f(a, values3, config, flag=False), np.array([], dtype=np.int64)))
        self.assertTrue(f(a, values3, config, flag=True).equals(pandas.Int64Index([], dtype='int64')))

        self.assertTrue(np.array_equal(f(a, values4, config, flag=False), np.array([44], dtype=np.int64)))
        self.assertTrue(f(a, values4, config, flag=True).equals(pandas.Int64Index([5], dtype='int64')))

        a = pandas.DataFrame(data={"ID": [2, 2, 2, 2], "a": [-99, 0, 6, 5], "b": [120, 78, 44, 70]}, index=[5, 6, 7, 8])

        self.assertTrue(np.array_equal(f(a, values1, config, flag=False), np.array([2], dtype=np.int64)))
        self.assertTrue(f(a, values1, config, flag=True).equals(pandas.Int64Index([6], dtype='int64')))

        self.assertTrue(np.array_equal(f(a, values2, config, flag=False), np.array([2], dtype=np.int64)))
        self.assertTrue(f(a, values2, config, flag=True).equals(pandas.Int64Index([8], dtype='int64')))

        self.assertTrue(np.array_equal(f(a, values3, config, flag=False), np.array([2], dtype=np.int64)))
        self.assertTrue(f(a, values3, config, flag=True).equals(pandas.Int64Index([5, 6, 7], dtype='int64')))

        self.assertTrue(np.array_equal(f(a, values4, config, flag=False), np.array([2], dtype=np.int64)))
        self.assertTrue(f(a, values4, config, flag=True).equals(pandas.Int64Index([8], dtype='int64')))

        print(">> backend.query_maker.filter_attributes - OK")

    def test_filter_local_attributes_unordered(self):
        from backend.query_maker.get_individuals import filter_local_attributes_unordered as f

        from backend.query_interpreter.graph_maker import Graph

        nodes = [{'display_value': ['Diagnosis is HPV negative', 'Age smaller than 360'],
                  'name': 'n0', 'id': 0,
                  'key_op_value': [['Diagnosis', '==', '11'], ['Age', '<', '360']]},
                 {'display_value': ['Diagnosis is HPV positive'],
                  'name': 'n1', 'id': 1,
                  'key_op_value': [['Diagnosis', '==', '12']]}]
        edges = [{'display_value': ['Event Interval bigger than 0', 'Event Interval smaller than 2'],
                  'dst': nodes[1], 'src': nodes[0],
                  'source': 'n0', 'destination': 'n1', 'name': 'e2', 'id': 2, 'kind': 'directed',
                  'key_op_value': [['ExamInterval', '>', '0'], ['ExamInterval', '<', '2']]}]

        graph = Graph(nodes, edges)
        paths = graph.make_maximal_paths()

        config = {"nan_int": -99, "id_attribute": {"name": "ID"}}

        a = pandas.DataFrame(data={"ID": [1, 1, 2, 2, 2, 2, 3],
                                   "Diagnosis": [11, 12, 11, 11, 11, 13, -99],
                                   "Age": [240, 260, 300, 410, 450, 600, -99]},
                             index=[10, 20, 30, 40, 50, 60, 70])

        self.assertTrue(np.array_equal(f(a, graph, paths, config, flag=True), np.array([1, 2])))
        self.assertTrue(np.array_equal(f(a, graph, paths, config, flag=False), np.array([1])))

        nodes.append({'name': 'n5', 'key_op_value': [['Diagnosis', '==', '13']],
                      'id': 5, 'display_value': ['Diagnosis is HPV unsatisfactory']})

        edges.append({'name': 'e6', 'key_op_value': [], 'source': 'n0', 'id': 6, 'display_value': [],
                      'kind': 'directed', 'dst': nodes[2], 'src': nodes[0], 'destination': 'n5'})

        graph = Graph(nodes, edges)

        paths = graph.make_maximal_paths()

        self.assertTrue(np.array_equal(f(a, graph, paths, config, flag=True), np.array([1, 2])))
        self.assertTrue(np.array_equal(f(a, graph, paths, config, flag=False), np.array([1, 2])))

        print(">> backend.query_maker.test_filter_local_attributes_unordered - OK")

