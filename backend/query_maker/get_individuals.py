# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
#                                     # / ---------------------------- \ #                                             #
#                                     # | AUTHOR: MANOEL HORTA RIBEIRO | #                                             #
#                                     # \ ---------------------------- / #                                             #
#                                                                                                                      #
# This file has the func. ´get_individuals´, which interprets the query made by the interface and returns all of the   #
# individuals who match the query made.                                                                                #
#                                                                                                                      #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
#                                                                                                                      #
#                                           /=========================\                                                #
#                                           ||||||get_individuals||||||                                                #
#                        ___________________\=========================/___________________                             #
#                       /                                |                                \                            #
#                      /                                 |                                 \                           #
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
# 1. It is important that we have different behaviour for different attributes:                                        #
#                                                                                                                      #
#   - For those called range attributes, where the selection is made using operators such as < and >, we have:         #
#       attr_constraint = attr_constraint1 && attr_constraint2 && ... && attr_constraintN                              #
#                                                                                                                      #
#   - For those called categorical attributes, where the selection is made using operators such as == and !=, we have: #
#       attr_constraint = attr_constraint1 || attr_constraint2 || ... || attr_constraintN                              #
#                                                                                                                      #
# 2. We also assume that, when we have a constraint over some attr, we eliminate all null values for that variable. In #
#  putting data should probably be done before importing your data to portinari.                                       #
#                                                                                                                      #
# 4. Categorical attributes are guaranteed no to have 0's, due to the importer. Thus, when a query is made with 402,   #
#  what it really means is 4 & 2, so instead of doing attr == 2 || attr == 4, we require that two events on the same   #
#  event date have attributes 2 and attributes 4, regardless of order. This is yet to be implemented.             - TODO
#                                                                                                                      #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #

from joblib import Parallel, delayed
import multiprocessing
import numpy as np
import functools
import pandas
import time

DEBUG_QUERY_MATCHING = False


# ---- Helpers ----


def get_rr(events, individuals, config, outcomes):
    rr = {}

    for key, ind in individuals.items():
        exposed = events[events[config["id_attribute"]["name"]].isin(ind.index)]
        not_exposed = events[~events[config["id_attribute"]["name"]].isin(ind.index)]
        exposed_true = filter_attributes(exposed, outcomes, config, flag=False)
        not_exposed_true = filter_attributes(not_exposed, outcomes, config, flag=False)

        try:
            rr[key] = (len(exposed_true) / len(exposed)) / (len(not_exposed_true) / len(not_exposed))
        except ZeroDivisionError:
            rr[key] = -1

    print(rr)
    return rr


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
            if o == "==":
                tuple_v = (eval(v), eval(v))

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
    # ret_lst = Parallel(n_jobs=multiprocessing.cpu_count())(delayed(func)(group) for name, group in dfgrouped)
    ret_lst = [func(group) for name, group in dfgrouped]  # For testing this can be useful

    ret_lst = list(zip(*ret_lst))

    return pandas.DataFrame(data={"Position": ret_lst[0], "IDX": ret_lst[1]}, index=ret_lst[2])


# ---- Unordered Filtering ----


def filter_attributes(data, attr, config, flag=False):
    """ This function receives a dataframe, the list of attributes and filters people based on them (no order).
    :param data: dataframe object.
    :param attr: list of attributes.
    :param config: config file.
    :param flag: alters return value, if true, return the indexes, if false, the IDS.
    :return: ids of filtered entities if flag = False, otherwise, return the indexes. """
    global g_time

    for name, op, value in attr:
        # Treat NaNs
        data = data.loc[~data[name].isin([config["nan"]])]

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
        ret = data[config["id_attribute"]["name"]].index
    else:
        ret = np.unique(data[config["id_attribute"]["name"]].values)

    return ret


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

        result = apply_parallel(data.groupby(config["id_attribute"]["name"]), f)

        print(result)

        path_r = list.copy(path)
        path_r.reverse()
        acc = None

        print("PATHS: ", path, path_r)

        for idx, n in enumerate(path_r):
            to_app = result[result["Position"] == len(path) - idx]["IDX"]
            print("----")
            print(idx, len(to_app))
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

        print("-----------")

    return entity_matching


def reset_global():
    global g_time
    g_time = 0


def get_global():
    global g_time
    return g_time


g_time = 0


def rec_match(x, pt_nd, t_tim, t_hop, config, p=0, idval=(0, 0), pid=0, first=True, flg="first_event"):
    global g_time

    if DEBUG_QUERY_MATCHING:
        print("\t\t" * p + "-" * 40)
        print("\t\t" * p + "values", x["at1"].values)
        print("\t\t" * p + "pt_nd", pt_nd)
        print("\t\t" * p + "t_tim", t_tim)
        print("\t\t" * p + "t_hop", t_hop)
        print("\t\t" * p + "p ", p)

    if first:
        pid = x.iloc[0][config["id_attribute"]["name"]]  # gets patient id attribute

    if len(pt_nd) == 0 or len(x) == 0:  # case 1: pattern or data ended
        if DEBUG_QUERY_MATCHING:
            print("\t\t" * p + "-> pattern or data ended, matching is completed")
        return [p, idval, pid]

    tmp = filter_attributes(x, pt_nd[0], config, flag=True).values  # Get indexes of filtered attributes



    if DEBUG_QUERY_MATCHING:
        print("\t\t" * p + "tmp ", tmp)

    # case 2: no match
    if len(tmp) == 0:
        if DEBUG_QUERY_MATCHING:
            print("\t\t" * p + "-> can't match next node")
        return [p, idval, pid]

    # case 3: no first match in the first event for the "first_event" flag
    if flg == "first_event" and first:
        idx = x.index[0]  # gets first index value
        if idx != tmp[0]:
            if DEBUG_QUERY_MATCHING:
                print("\t\t" * p + "-> can't match first node")
            return [p, idval, pid]
        else:
            tmp = np.array([tmp[0]])

    best_match = [p, idval, pid]

    for i in tmp:

        # case 4: if time_constraint or first
        time_constraint = first or check_time(t_tim, t_hop,
                                              x[config["edge_time_attribute"]["name"]].ix[idval[1] + 1:i].values.sum(),
                                              i - idval[1])

        if DEBUG_QUERY_MATCHING:
            print("\t\t" * p + "| src:", idval[1], "next:", i, time_constraint)
            if not first:
                print("\t\t" * p + "| tim:", x[config["edge_time_attribute"]["name"]].ix[idval[1] + 1:i].values.sum())
                print("\t\t" * p + "| hop:", i - idval[1] - 1)

        idval = (i, i) if first else (idval[0], i)

        if time_constraint:
            df = rec_match(x.ix[x.index.values[x.index.values > i]],
                           pt_nd[1:],
                           t_tim[int(not first):], t_hop[int(not first):],
                           config, p=p + 1, first=False, flg=flg,
                           idval=idval, pid=pid)

            if df[0] == p + len(pt_nd[1:]) + 1:
                if DEBUG_QUERY_MATCHING:
                    print("\t\t" * p, "returning after successful match...")
                return df

            elif df[0] > best_match[0]:
                best_match = df

    if DEBUG_QUERY_MATCHING:
        print("\t\t" * p + "returning after unsuccessful matches", p)
        print("\t\t" * p + "-" * 40)

    return best_match


def get_individuals(dataset, global_attr, matching, typ, graph, paths):
    dataframe_en = dataset.entity_data
    dataframe_ev = dataset.event_data

    # Filter global attributes
    index_en = filter_attributes(dataframe_en, global_attr, dataset.config)
    dataframe_ev = filter_data_id(dataframe_ev, index_en, dataset.config)

    # Filter local attributes
    index_en_ev = filter_local_attributes_unordered(dataframe_ev, graph, paths, dataset.config, flag=True)
    dataframe_ev = filter_data_id(dataframe_ev, index_en_ev, dataset.config)

    # Filter non-indexed ordered attributes
    entity_matching = filter_local_attributes_ordered(dataframe_ev, graph, paths, dataset.config, matching)

    return entity_matching
