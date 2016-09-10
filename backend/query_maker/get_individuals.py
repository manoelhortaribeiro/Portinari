from query_interpreter.graph_maker import Graph
import numpy as np


def get_individuals(nodes, edges, individuals_table, exams_table):



    # First creates the graph and the desired paths
    graph = Graph(nodes, edges)
    paths = graph.make_maximal_paths()
    print(graph)
    print(nodes)
    print(edges)

    print(paths)

    # individuals = None
    #
    # for path in paths:
    #     for node in path:
    #         json_node = graph.get_node(node)
    #         for constraint in json_node['key_op_value']:
    #             if constraint[0] == 'Diagnosis' and constraint[1] == '==':
    #                 tmp = exams_table.query("Diagnosis == " + constraint[2]).PatientID
    #                 if individuals is None:
    #                     individuals = tmp
    #                 else:
    #                     individuals = np.intersect1d(tmp, individuals)
    #
    # print(len(individuals), individuals)
    # patients_of_interest = individuals_table[individuals_table['PatientID'].isin(individuals)]
    # print(patients_of_interest)