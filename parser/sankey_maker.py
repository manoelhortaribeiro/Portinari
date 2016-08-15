import pandas
import numpy
import json


class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, numpy.integer):
            return int(obj)
        elif isinstance(obj, numpy.floating):
            return float(obj)
        elif isinstance(obj, numpy.ndarray):
            return obj.tolist()
        else:
            return super(MyEncoder, self).default(obj)


def get_hash_val(node_key, i):
    if i == 0:
        return 0
    else:
        return str(node_key) + "_" + str(i)


def make_sankey(data, future_nodes):

    print(data)


    # Gets "val_hash"

    val_hash = dict()
    count = 0

    for i in range(int(future_nodes) + 1):
        p = 'p' + str(i)
        attr = pandas.Series(data[p].ravel()).unique().tolist()
        for node_key in attr:
            value = get_hash_val(node_key, i)
            if value not in val_hash:
                val_hash[value] = count
                count += 1

    # Gets "nodes"
    nodes = list()

    for i in range(int(future_nodes) + 1):
        p = 'p' + str(i)
        attr = pandas.Series(data[p].ravel()).unique().tolist()
        for node_key in attr:

            node = {"node": val_hash[get_hash_val(node_key, i)], "name": node_key}
            nodes.append(node)


    # Gets "edges"
    edges = list()

    past_iter = list(range(int(future_nodes) + 1)[:-1])
    future_iter = list(range(int(future_nodes) + 1)[1:])

    for past, future in zip(past_iter, future_iter):
        p_past = 'p' + str(past)
        p_future = 'p' + str(future)
        c_past = 'c' + str(past)
        tmp_data = data.groupby([p_past, p_future])[c_past].sum()
        tmp_data = tmp_data.reset_index()

        print(tmp_data)

        p0s = pandas.Series(tmp_data[p_past].ravel()).tolist()
        p1s = pandas.Series(tmp_data[p_future].ravel()).tolist()
        c0s = pandas.Series(tmp_data[c_past].ravel()).tolist()

        for p0, p1, c0 in zip(p0s, p1s, c0s):

            edge = {
                    "source": val_hash[get_hash_val(p0, past)],
                    "target": val_hash[get_hash_val(p1, future)],
                    "value": c0
                    }

            if edge["value"] != 0:
                edges.append(edge)

    # Creates sankey diagram
    sankey = {
        "nodes": nodes,
        "links": edges
    }

    print(sankey)

    return json.dumps(sankey, cls=MyEncoder)

