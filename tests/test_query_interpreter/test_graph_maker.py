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
