# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
#                                     # / ---------------------------- \ #                                             #
#                                     # | AUTHOR: MANOEL HORTA RIBEIRO | #                                             #
#                                     # \ ---------------------------- / #                                             #
#                                                                                                                      #
# This file the function ´get_individuals´, which interprets the query made by the interface and returns all of the    #
# individuals who match the query made. Notice that the matching of the indexes is done according to the specification.#
#                                                                                                                      #
# 1. It is important that we have different behaviour for different attributes:                                        #
#                                                                                                                      #
#   - For those called range attributes, where the selection is made using operators such as < and >, we have:         #
#       attr_constraint = attr_constraint1 && attr_constraint2 && ... && attr_constraintN                              #
#                                                                                                                      #
#   - For those called categorical attributes, where the selection is made using operators such as == and !=, we have: #
#       attr_constraint = attr_constraint1 || attr_constraint2 && ... || attr_constraintN#                             #
#
# 2. We also assume that, when we have a constraint over some attr, we eliminate all null values for that variable.    #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #


from backend.query_interpreter.graph_maker import Graph
from query_maker.find_and_compare import match_time_sequence
import numpy as np
import functools
import pandas
from joblib import Parallel, delayed
import multiprocessing

DEBUG_QUERY_MATCHING = True


# def apply_parallel(df, func):
#     """ Applies a function on a parallel function in a pandas data frame.
#     :param df: data frame of interest.
#     :param func: function to be applied.
#     :return: whatever the function returns. """
#     ret_list = Parallel(n_jobs=multiprocessing.cpu_count())(delayed(func)(val) for val in df)
#
#     return ret_list
#
#
# def get_constraint(key_values, name, operator, not_found_return):
#     """ Given a key value, a name, an operator and a not_found value, returns the first constrained value found.
#     :param key_values: values on the node attribute.
#     :param name: value of the node attribute of interest.
#     :param operator:  operator of interest.
#     :param not_found_return: custom value.
#     :return: value of the not_found_return, or of the constraint. """
#     for constraint in key_values:
#         if constraint[0] == name and constraint[1] == operator:
#             return constraint[2]
#
#     return not_found_return
#
#
# def get_query_matching_values(graph, paths, config, prediction_attr):
#     """ This function extracts the index values of the expected outcome, the time constraints and the hops constraints.
#     :param graph: Query graph.
#     :param paths: Maximal paths on the graph.
#     :param config: Config file.
#     :param prediction_attr: Attribute of interest.
#     :return: index values, time constraint values, hop constraints values. """
#     index_v, times, hops = [], [], []
#
#     for path in paths:
#         is_first = True
#
#         diag, time, exam = [], [], []
#
#         for node1, node2 in zip(path[:-1], path[1:]):
#             jnode1, jnode2 = graph.get_node(node1), graph.get_node(node2)
#             # gets the first diagnosis
#             if is_first:
#                 interest_node = jnode1
#             else:
#                 interest_node = jnode2
#                 is_first = False
#
#             # gets the i-th diagnosis
#             diagnosis = get_constraint(interest_node['key_op_value'], prediction_attr, '==', config["no_indexed_event"])
#             diag.append(int(diagnosis))
#
#             jedge = graph.get_edge(node1, node2)
#
#             # gets the (i-1th,i-th) hops bound
#             exam_lb = get_constraint(jedge['key_op_value'], config["edge_hops_attribute"]["name"],
#                                      '>', config["event_min"])
#             exam_ub = get_constraint(jedge['key_op_value'], config["edge_hops_attribute"]["name"],
#                                      '<', config["event_max"])
#             exam.append((int(exam_lb), int(exam_ub)))
#
#             # gets the (i-1th,i-th) time bound
#             time_lb = get_constraint(jedge['key_op_value'], config["edge_time_attribute"]["name"],
#                                      '>', config["time_min"])
#             time_ub = get_constraint(jedge['key_op_value'], config["edge_time_attribute"]["name"],
#                                      '<', config["time_max"])
#             time.append((int(time_lb), int(time_ub)))
#
#         index_v.append(diag), times.append(time), hops.append(exam)
#
#     return index_v, times, hops
#
#
# def filter_by_attributes(graph, paths, dataset, config, prediction_attr):
#
#     # Filter by attributes
#     individuals = None
#     has_constraint = False
#
#     # Get the data tables
#     exa_table = dataset.event_data
#     ind_table = dataset.entity_data
#
#     for path in paths:
#         for node in path:
#             json_node = graph.get_node(node)
#             for constraint in json_node['key_op_value']:
#                 query = constraint[0] + constraint[1] + constraint[2]
#                 tmp = exa_table.query(query)[config["id_attribute"]["name"]].values
#                 if individuals is None:
#                     individuals = tmp
#                 else:
#                     individuals = np.intersect1d(tmp, individuals)
#
#     if individuals is not None:
#         ind = ind_table[ind_table[config["id_attribute"]["name"]].isin(individuals)]
#     elif not has_constraint:
#         ind = ind_table
#     else:
#         ind = None
#
#     return ind
#
#

def filter_attributes(data, attr, config):
    """ This function receives the dataset object, the list of attributes and filters people based on them (no order).
    :param dataset: dataset object.
    :param attr: list of attributes.
    :return: filtered dataframe. """

    names = {}

    for name, op, value in attr:

        # Treat NaNs
        data = data[eval("data[\"" + name + "\"]" + "!=" + str(config["nan_int"]))]
        if name not in names:
            names[name] = [[],[], "categorical"]

        names[name][0].append(op)
        names[name][1].append(value)

        if op == "<" or op == ">":
            names[name][2] = "range"

    # Treat constraints
    for key, item in names.items():
        strings = []
        filter_v = ""
        for op, val in zip(item[0], item[1]):
            strings.append("(data[\"" + name + "\"]" + op + val + ").values")
        if item[2] == "range":
            filter_v = " & ".join(strings)
        elif item[2] == "categorical":
            filter_v = " | ".join(strings)
        data = data[eval(filter_v)]

    return data


def get_individuals(nodes, edges, dataset, global_attr, prediction_attr):

    # Filter global attributes
    dataframe = filter_attributes(dataset.entity_data, global_attr, config)

    # First creates the graph and the desired paths
    graph = Graph(nodes, edges)
    paths = graph.make_maximal_paths()

    # Get query matching string
    index_v, times, exams = get_query_matching_values(graph, paths, dataset.config, prediction_attr)

    if DEBUG_QUERY_MATCHING:
        print(index_v)
        print(times)
        print(exams)

    # Filter local attributes


    # Filter indexed order


    # Filter non-indexed order



    #
    #
    #     ent[eval("ent[\"" + name + "\"]"  + op + value))]


    # rs = []
    #
    # # Filter by attributes
    # for i, t, e in zip(index_v, times, exams):
    #     if i == dataset.config["no_indexed_event"]:
    #         continue
    #
    #     patients_of_interest = filter_by_attributes(graph, paths, dataset, dataset.config, prediction_attr)
    #
    #     f = functools.partial(match_time_sequence, diagnosis=i, time=t, exams_range=e)
    #     print(patients_of_interest)
    #     ##rs.append(apply_parallel(pandas.DataFrame(patients_of_interest)['DiagnosisIndex'], f))


    return 12
