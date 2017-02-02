# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
#                                     # / ---------------------------- \ #                                             #
#                                     # | AUTHOR: MANOEL HORTA RIBEIRO | #                                             #
#                                     # \ ---------------------------- / #                                             #
#                                                                                                                      #
# This file the function ´get_individuals´, which interprets the query made by the interface and returns all of the    #
# individuals who match the query made.                                                                                #
#                                                                                                                      #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
#                                                                                                                      #
#                                           /=========================\                                                #
#                                           ||||||get_individuals||||||                                                #
#                                           \=========================/                                                #
#                       /                                |                              \                              #
#                      /                                 |                               \                             #
#         /-----------------\         /---------------------------------\        /-------------------------------\     #
#         |filter_attributes|         |filter_local_attributes_unordered|        |filter_local_attributes_ordered|     #
#         \-----------------/         \---------------------------------/        \-------------------------------/     #
#                     \                                |                               /                               #
#                                                                                                                      #
#                   //=======\\                   //=======\\                    //=======\\                           #
#           \\\\   ||  filter ||           \\\\   |  filter |             \\\\   |  filter |          \\\\             #
#    |\\\\\\\\\\\  ||existence||   |\\\\\\\\\\\\  |existence|     |\\\\\\\\\\\\  |  order  |   |\\\\\\\\\\\            #
#    |///////////  || global  ||   |////////////  |  local  |     |////////////  |  local  |   |///////////            #
#           ////    \\=======//            ////   \\=======//             ////   \\=======//          ////             #
#                                                                                                                      #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
#                                                                                                                      #
# A. filter_attributes                                                                                                 #
# 1. It is important that we have different behaviour for different attributes:                                        #
#                                                                                                                      #
#   - For those called range attributes, where the selection is made using operators such as < and >, we have:         #
#       attr_constraint = attr_constraint1 && attr_constraint2 && ... && attr_constraintN                              #
#                                                                                                                      #
#   - For those called categorical attributes, where the selection is made using operators such as == and !=, we have: #
#       attr_constraint = attr_constraint1 || attr_constraint2 && ... || attr_constraintN#                             #
#                                                                                                                      #
# 2. We also assume that, when we have a constraint over some attr, we eliminate all null values for that variable.    #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #

import numpy as np
import functools
import pandas
from joblib import Parallel, delayed
import multiprocessing
import time

DEBUG_QUERY_MATCHING = False


def get_rr(events, individuals, config, outcomes):

    rr = {}

    for key, ind in individuals.items():
        print(events[config["id_attribute"]["name"]])
        print(ind.index)
        exposed = events[events[config["id_attribute"]["name"]].isin(ind.index)]
        not_exposed = events[~events[config["id_attribute"]["name"]].isin(ind.index)]
        exposed_true =filter_attributes(exposed, outcomes, config, flag=False)
        not_exposed_true =filter_attributes(not_exposed, outcomes, config, flag=False)

        rr[key] = (len(exposed_true)/len(exposed))/(len(not_exposed_true)/len(not_exposed))

    return rr

# ---- Helpers ----


def filter_data_id(data, index, config):
    """ This helper simply filters a dataframe, selecting only the instances where the id_attr name is in an array.
    :param data: dataframe.
    :param index: index to filter with.
    :param config: config filter.
    :return: filtered dataframe. """
    return data[data[config["id_attribute"]["name"]].isin(index)]


def get_tuple(config, edge, min_v, max_v, attr):
    """ This helper, given an edge, extract the tuple containing the time and hops constraints. Notice that the function
    pops the attr from the edge.
    :param config: config file.
    :param edge: edge containing the constraints.
    :param min_v: min default value.
    :param max_v: max default value.
    :param attr: attribute in question.
    :return: tuple with min max. """
    tuple_v = [min_v, max_v]

    if config[attr] != "" and config[attr]["name"] in edge:
        for o, v in zip(edge[config[attr]["name"]][0], edge[config[attr]["name"]][1]):
            if o == ">" and eval(v) > tuple_v[0]:
                tuple_v[0] = eval(v)
            if o == "<" and eval(v) < tuple_v[1]:
                tuple_v[1] = eval(v)
        edge.pop(config[attr]["name"])

    return tuple_v


def appending_help(attr):
    """ This helper function iterates through a list of (name, op, value) tuples and place all constraints regarding
     the same name into a dictionary. It also classifies the constraint as categorical or range.
    :param attr: list of (name, op, value) tuples.
    :return: dictionary {name: [[ops],[values],category]}.
    """
    acc = {}
    for name, op, value in attr:
        if name not in acc:
            acc[name] = [[], [], "categorical"]
        acc[name][0].append(op)
        acc[name][1].append(value)
        if op == "<" or op == ">":
            acc[name][2] = "range"

    return acc


def check_time(t_time, t_hop, acc_hop, acc_tim):
    """ This checks the time constraints.
    :param t_time: tuples with time constraints.
    :param t_hop: tuples with hop constraints.
    :param acc_hop: current number of hops.
    :param acc_tim: current number of time passed.
    :return: True of False. """
    return (t_time[0][0] < acc_tim < t_time[0][1]) and (t_hop[0][0] < acc_hop < t_hop[0][1])


def apply_parallel(dfgrouped, func):
    """ This applies a function in parallel.
    :param dfgrouped: dataframe grouped.
    :param func: function to be used
    :return: applied dataframe. """
    #ret_lst = Parallel(n_jobs=multiprocessing.cpu_count())(delayed(func)(group) for name, group in dfgrouped)
    ret_lst = [func(group) for name, group in dfgrouped]
    print(ret_lst)
    return pandas.concat(ret_lst)


def to_df(pos, idx, pid):
    """ Creates a dataframe with index pid and two rows.
    :param pos: position matched.
    :param idx: index of position matched.
    :param pid: patient id.
    :return: dataframe with all this things.
    """
    return pandas.DataFrame(data={"Position": [pos], "IDX": [idx]}, index=[pid])


# ---- Unordered Filtering ----

# TODO: COMPOSITE ATTRIBUTES (405)
def filter_attributes(data, attr, config, flag=False):
    """ This function receives a dataframe, the list of attributes and filters people based on them (no order).
    :param data: dataframe object.
    :param attr: list of attributes.
    :param config: config file.
    :param flag: alters return value, if true, return the indexes, if false, the IDS.
    :return: ids of filtered entities if flag = False, otherwise, return the indexes. """

    for name, op, value in attr:
        # Treat NaNs
        data = data[eval("data[\"" + name + "\"]" + "!=" + str(config["nan"]))]

    # Gets constraints
    names = appending_help(attr)

    # Treat constraints
    for key, item in names.items():
        strings = []
        filter_v = ""
        for op, val in zip(item[0], item[1]):
            strings.append("(data[\"" + key + "\"]" + op + val + ").values")
        if item[2] == "range":
            filter_v = " & ".join(strings)
        elif item[2] == "categorical":
            filter_v = " | ".join(strings)
        data = data[eval(filter_v)]

    if flag:
        return data[config["id_attribute"]["name"]].index
    else:
        return np.unique(data[config["id_attribute"]["name"]].values)


def filter_local_attributes_unordered(data, graph, paths, config, flag=True):
    """ This function simply ensures that all the entities selected have at least one instance of all the required local
    events. It unites the individuals matched for each one of the paths. For a given path, it  uses the function
    ´filter_attributes´ for the constraints of each node, and intersect the results of all nodes in the path.
    :param data: dataframe containing event data.
    :param graph: graph object.
    :param paths: maximal path in the graphs.
    :param config: config file.
    :param flag: if flag, gets only the first edge
    :return: index of filtered entities, or unique IDs of the patient, depending on flag. """
    union_indexes = []
    for path in paths:

        inter_indexes = []

        if flag:
            inter_indexes.append(filter_attributes(data, graph.get_node(path[0])["key_op_value"], config, flag=False))
        else:
            for node in path:
                filter_attributes(data, graph.get_node(node)["key_op_value"], config, flag=False)
                inter_indexes.append(filter_attributes(data, graph.get_node(node)["key_op_value"], config, flag=False))
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


# ---- Ordered Filtering ----


def filter_local_attributes_ordered(data, graph, paths, config, matching):
    """ Filter the local attributes concerning the order of the node constraints and the edges constraints.
    :param data: event data frames.
    :param graph: graph object.
    :param paths: maximal paths in the graph.
    :param config: config file.
    :param matching: first_event or first_occurence.
    :return: indexes and positions failure. """

    entity_matching = {}

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

        # gets all matching values
        f = functools.partial(rec_match, pt_nd=path_nodes, t_tim=t_time, t_hop=t_hop, config=config, flg=matching)

        start = time.time()
        result = apply_parallel(data.groupby(config["id_attribute"]["name"]), f)
        # result.index = result.index.droplevel(1)
        end = time.time()
        print(end - start)

        path_r = list.copy(path)
        path_r.reverse()
        acc = None


        for idx, n in enumerate(path_r):
            to_app = result[result["Position"] == idx + 1]["IDX"]

            if acc is None:
                acc = to_app
            else:
                acc = acc.append(to_app)
            acc.append(to_app)

            if n in entity_matching:
                entity_matching[n] = entity_matching[n].append(acc)
                entity_matching[n] = entity_matching[n].drop_duplicates()
            else:
                entity_matching[n] = acc

    return entity_matching


def rec_match(x, pt_nd, t_tim, t_hop, config, p=0, idval=(0, 0), pid=0, first=True,
              flg="first_event", acc_hop=0, acc_tim=0):

    if DEBUG_QUERY_MATCHING:
        if first:
            print("-" * 30)
        print("---")
        print(x["Diagnosis"].values)
        print(x["SinceLast"].values)
        print(pt_nd)
        print(t_tim)
        print(t_hop)

    if first:
        pid = x.head(1)[config["id_attribute"]["name"]].values[0]

    # case 1: pattern ended, returns true
    if len(pt_nd) == 0:
        return to_df(p, idval, pid=pid)

    if DEBUG_QUERY_MATCHING:
        print("case 1: false")

    # case 2: data ended, returns false
    if len(x) == 0:
        return to_df(p, idval, pid=pid)

    if DEBUG_QUERY_MATCHING:
        print("case 2: false")

    # Get index of current attribute
    idx = x.head(1).index[0]

    # Get indexes of filtered attributes
    tmp = filter_attributes(x, pt_nd[0], config, flag=True).values

    if DEBUG_QUERY_MATCHING:
        print("index matching:", tmp)

    # case 3: no match, return false
    if len(tmp) == 0:
        return to_df(p, idval, pid=pid)

    if DEBUG_QUERY_MATCHING:
        print("case 3: false")

    if DEBUG_QUERY_MATCHING:
        print("index_first:", idx)

    # case 4: no first match in first_event
    if flg == "first_event" and first:
        if idx != tmp[0]:
            return to_df(p, idval, pid=pid)
        else:
            tmp = np.array([tmp[0]])

    # it matches!
    p += 1

    if DEBUG_QUERY_MATCHING:
        print("case 4: false")

    # case 5: recursively calls itself
    for i in tmp:

        if first:
            idval = (i, i)
        else:
            idval = (idval[0], i)

        if DEBUG_QUERY_MATCHING:
            print("->", i, tmp)

        mod_hop = i - idx
        mod_tim = x[config["edge_time_attribute"]["name"]].ix[idx:i].values.sum()

        if DEBUG_QUERY_MATCHING:
            print(mod_hop, mod_tim)

        # case 4: if time_constraint or first
        time_constraint = first or check_time(t_tim, t_hop, acc_hop + mod_hop, acc_tim + mod_tim)

        if DEBUG_QUERY_MATCHING:
            print("time_constraint:", time_constraint)

        if time_constraint:
            n_idx = x.index.values
            n_idx = n_idx[n_idx > i]

            if DEBUG_QUERY_MATCHING:
                print("indexes", x.index.values, n_idx)
                print("path_nodes", pt_nd, pt_nd[i:])
                print("t_time", t_tim, t_tim[int(not first):])
                print("t_hop", t_hop, t_hop[int(not first):])

            df = rec_match(x.ix[n_idx],
                           pt_nd[1:],
                           t_tim[int(not first):], t_hop[int(not first):],
                           config, p=p, first=False, flg=flg,
                           acc_hop=acc_hop + mod_hop,
                           acc_tim=acc_tim + mod_tim,
                           idval=idval, pid=pid)
            if df.iloc[0]["Position"] == p + len(pt_nd[1:]):
                return df

    return to_df(p, idval, pid=pid)


def get_individuals(dataset, global_attr, prediction_attr, matching, typ, graph, paths):
    dataframe_en = dataset.entity_data
    dataframe_ev = dataset.event_data

    # Filter global attributes
    index_en = filter_attributes(dataframe_en, global_attr, dataset.config)

    print(index_en)
    dataframe_ev = filter_data_id(dataframe_ev, index_en, dataset.config)

    # Filter local attributes, in cohort, flag = true, otherwise, false
    if typ == "cohort":
        index_en_ev = filter_local_attributes_unordered(dataframe_ev, graph, paths, dataset.config, flag=True)
    else:
        index_en_ev = filter_local_attributes_unordered(dataframe_ev, graph, paths, dataset.config, flag=False)

    dataframe_ev = filter_data_id(dataframe_ev, index_en_ev, dataset.config)

    # Filter non-indexed ordered attributes
    entity_matching = filter_local_attributes_ordered(dataframe_ev, graph, paths, dataset.config, matching)

    return entity_matching
