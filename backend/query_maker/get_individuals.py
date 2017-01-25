# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
#                                     # / ---------------------------- \ #                                             #
#                                     # | AUTHOR: MANOEL HORTA RIBEIRO | #                                             #
#                                     # \ ---------------------------- / #                                             #
#                                                                                                                      #
# This file the function ´get_individuals´, which interprets the query made by the interface and returns all of the    #
# individuals who match the query made. Notice that the matching of the indexes is done according to the specification.#
# A. filter_attributes                                                                                                 #
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
import numpy as np
import functools
import pandas
from joblib import Parallel, delayed
import multiprocessing

DEBUG_QUERY_MATCHING = True


def filter_attributes(data, attr, config, flag=False):
    """ This function receives the dataset object, the list of attributes and filters people based on them (no order).
    :param data: dataset object.
    :param attr: list of attributes.
    :param config: config file.
    :param flag: alters return value.
    :return: ids of filtered entities if flag = False, otherwise, return the indexes"""

    for name, op, value in attr:
        # Treat NaNs
        data = data[eval("data[\"" + name + "\"]" + "!=" + str(config["nan_int"]))]

    # Gets constraints
    names = appending_help(attr)

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

    if flag:
        return data[config["id_attribute"]["name"]].index
    else:
        return data[config["id_attribute"]["name"]].values


def filter_local_attributes_unordered(data, graph, paths, config):
    """ This function simply ensures that all the entities selected have atleast one instance of all the required local
    events. It unites the individuals matched for each one of the paths. For a given path, it  uses the function
    ´filter_attributes´ for the constraints of each node, and intersect the results of all nodes in the path.
    :param data:
    :param graph:
    :param paths:
    :param config:
    :return:
    """
    union_indexes = []
    for path in paths:

        inter_indexes = []

        for node in path:
            inter_indexes.append(filter_attributes(data, graph.get_node(node)["key_op_value"], config))

        if len(inter_indexes) == 0:
            continue

        intersection = np.unique(inter_indexes[0])

        for idx in inter_indexes[1:]:
            intersection = np.intersect1d(intersection, np.unique(idx), assume_unique=True)

        union_indexes.append(intersection)

    if len(union_indexes) != 0:
        index_ev = union_indexes[0]

        for idx in union_indexes[1:]:
            index_ev = np.union1d(idx, index_ev)
    else:
        index_ev = np.unique(data[config["id_attribute"]["name"]].values)

    return index_ev


def appending_help(attr):
    acc = {}

    for name, op, value in attr:
        if name not in acc:
            acc[name] = [[], [], "categorical"]

        acc[name][0].append(op)
        acc[name][1].append(value)

        if op == "<" or op == ">":
            acc[name][2] = "range"

    return acc


def get_tuple(config, edge, min, max, attr):
    tuple_v = [min, max]

    if config[attr] != "" and config[attr]["name"] in edge:
        for o, v in zip(edge[config[attr]["name"]][0], edge[config[attr]["name"]][1]):
            print(o, v)
            if o == ">" and eval(v) > tuple_v[0]:
                tuple_v[0] = eval(v)
            if o == "<" and eval(v) < tuple_v[1]:
                tuple_v[1] = eval(v)

        edge.pop(config[attr]["name"])

    return tuple_v


def filter_local_attributes_ordered(data, graph, paths, config):
    for path in paths:
        path_nodes = []
        t_time = []
        t_hop = []

        # gets all constraints of the node
        for n in path:
            attr = graph.get_node(n)["key_op_value"]
            path_nodes.append(attr)

        # gets all constraints on the edges
        for n1, n2 in zip(path[:-1], path[1:]):
            attr = graph.get_edge(n1, n2)["key_op_value"]
            edge = appending_help(attr)
            # gets the time constraints
            t_time.append(get_tuple(config, edge, config["time_min"], config["time_max"], "edge_time_attribute"))
            t_hop.append(get_tuple(config, edge, config["event_min"], config["event_max"], "edge_hops_attribute"))

        # gets all
        print(path_nodes)
        print(t_time, t_hop)
        f = functools.partial(recursive_check, path_nodes=path_nodes, t_time=t_time, t_hop=t_hop, config=config)
        print(data.groupby("PatientID").apply(f))

    return False


def recursive_check(x, path_nodes, t_time, t_hop, config, p=0, first=True, flag="first_event"):
    # case 1: pattern ended, returns true
    if len(path_nodes) == 0:
        return True, p

    # case 2: data ended, returns false
    if len(x) == 0:
        return False, p

    # Get pandas series
    tmp = filter_attributes(x, path_nodes[0], config, flag=True).values

    # case 3: no match, return false
    if len(tmp) == 0:
        return False, p

    # case 4: no first match in first_event
    if first and flag == "first_event" and x.head(1).index[0] != tmp[0]:
        return False, p

    # case 5: recursively calls itself
    for i in tmp:

        # calculates time/hop constraint or first
        match, path_position = False, p

        # case 4: if time_constraint or first
        # does recursive call "taking the exam"
        if True:
            idx = x.index.values
            idx = idx[idx > i]
            match, pos = recursive_check(x.iloc[idx], path_nodes[int(first):],
                                         t_time[int(first):], t_hop[int(first):],
                                         config, p=p + 1, first=False, flag=flag)


def filter_data_id(data, index, config):
    return data[data[config["id_attribute"]["name"]].isin(index)]


def get_individuals(nodes, edges, dataset, global_attr, prediction_attr, matching):
    dataframe_en = dataset.entity_data
    dataframe_ev = dataset.event_data

    # First creates the graph and the desired paths
    graph = Graph(nodes, edges)
    paths = graph.make_maximal_paths()

    # Filter global attributes
    index_en = filter_attributes(dataframe_en, global_attr, dataset.config)
    dataframe_ev = filter_data_id(dataframe_ev, index_en, dataset.config)

    # Filter local attributes
    index_en_ev = filter_local_attributes_unordered(dataframe_ev, graph, paths, dataset.config)
    dataframe_ev = filter_data_id(dataframe_ev, index_en_ev, dataset.config)

    # Filter non-indexed ordered attributes
    index_order = filter_local_attributes_ordered(dataframe_ev, graph, paths, dataset.config)

    return index_order
