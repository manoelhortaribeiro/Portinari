from backend.query_interpreter.graph_maker import Graph
import unittest


class TestGraphMaker(unittest.TestCase):

    @staticmethod
    def simple_graph():

        nodes = [{'id': 0, 'name': 'n0', 'className': 'Node',
                  'display_value': ['Diagnosis is HPV: Negative'],
                  'key_op_value': [['Diagnosis', '==', '1']]},
                 {'id': 1, 'name': 'n1', 'className': 'Node',
                  'display_value': [], 'key_op_value': []}]

        edges = [{'className': 'Edge', 'id': 2, 'name': 'e2', 'kind': 'directed',
                  'source': 'n0', 'destination': 'n1',
                  'key_op_value': [], 'display_value': [],
                  'dst': nodes[1],
                  'src': nodes[0]}]

        return nodes, edges

    @staticmethod
    def complex_graph():

        nodes = [{'className': 'Node', 'display_value': ['Diagnosis is HPV: Negative'],
                  'key_op_value': [['Diagnosis', '==', '1']], 'id': 0, 'name': 'n0'},
                 {'className': 'Node', 'display_value': ['Diagnosis is Cyt: Normal'],
                  'key_op_value': [['Diagnosis', '==', '11']], 'id': 1, 'name': 'n1'},
                 {'className': 'Node', 'display_value': ['Diagnosis is HPV: Negative'],
                  'key_op_value': [['Diagnosis', '==', '1']], 'id': 3, 'name': 'n3'},
                 {'className': 'Node', 'display_value': ['Diagnosis is Cyt: Normal'],
                  'key_op_value': [['Diagnosis', '==', '11']], 'id': 5, 'name': 'n5'},
                 {'className': 'Node', 'display_value': ['Diagnosis is Cyt: LSIL'],
                  'key_op_value': [['Diagnosis', '==', '13']], 'id': 7, 'name': 'n7'},
                 {'className': 'Node', 'display_value': ['Diagnosis is Cyt: Normal'],
                  'key_op_value': [['Diagnosis', '==', '11']], 'id': 9, 'name': 'n9'}]

        edges = [{'source': 'n0', 'className': 'Edge', 'display_value': [], 'dst': nodes[1],
                  'destination': 'n1', 'key_op_value': [], 'src': nodes[0],
                  'id': 2, 'name': 'e2', 'kind': 'directed'},

                 {'source': 'n3', 'className': 'Edge', 'display_value': [], 'dst': nodes[1],
                  'destination': 'n1', 'key_op_value': [], 'src': nodes[2],
                  'id': 4, 'name': 'e4', 'kind': 'directed'},

                 {'source': 'n5', 'className': 'Edge', 'display_value': [], 'dst': nodes[4],
                  'destination': 'n7', 'key_op_value': [], 'src': nodes[3],
                  'id': 8, 'name': 'e8', 'kind': 'directed'},

                 {'source': 'n5', 'className': 'Edge', 'display_value': [], 'dst': nodes[5],
                  'destination': 'n9', 'key_op_value': [], 'src': nodes[3],
                  'id': 10, 'name': 'e10', 'kind': 'directed'},

                 {'source': 'n1', 'className': 'Edge', 'display_value': ['Time Interval smaller than 365'],
                  'dst': nodes[3], 'destination': 'n5', 'key_op_value': [['TimeSinceLast', '<', '365']],
                  'src': nodes[1], 'id': 11, 'name': 'e11', 'kind': 'undirected'}]

        return nodes, edges

    def test_graph_creator(self):

        nodes, edges = TestGraphMaker.simple_graph()
        graph = Graph(nodes, edges)

        # Checks if two nodes have been loaded
        self.assertEqual(len(graph.nodes), 2)

        # Checks if the in/out edges are alright
        self.assertEqual(len(graph.nodes[0][1]), 1)
        self.assertEqual(len(graph.nodes[1][2]), 1)
        print(">> backend.query_interpreter.graph_maker.creator - OK")

        # Checks the accessors
        self.assertEqual(graph.get_node(0), nodes[0])
        self.assertEqual(graph.get_node(1), nodes[1])
        self.assertEqual(graph.get_edge(0, 1), edges[0])
        print(">> backend.query_interpreter.graph_maker.accessor - OK")

    def test_graph_paths(self):

        nodes, edges = TestGraphMaker.complex_graph()
        graph = Graph(nodes, edges)
        expected = [[0, 1, 5, 7], [0, 1, 5, 9], [0, 5, 1, 7], [0, 5, 1, 9],
                    [3, 1, 5, 7], [3, 1, 5, 9], [3, 5, 1, 7], [3, 5, 1, 9]]

        self.assertEqual(graph.make_maximal_paths(), expected)

        print(">> backend.query_interpreter.graph_maker.maximal_paths - OK")
