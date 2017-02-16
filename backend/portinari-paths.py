# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
#                                     # / ---------------------------- \ #                                             #
#                                     # | AUTHOR: MANOEL HORTA RIBEIRO | #                                             #
#                                     # \ ---------------------------- / #                                             #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #

from backend.utils.io_handling import Dataset, reads_params, get_config, read_config, read_cohort_nodes
from backend.query_maker.get_individuals import get_individuals, get_rr
from backend.visualization_maker.make_sankey import new_sankey
from backend.query_interpreter.graph_maker import Graph
from flask_cors import cross_origin
from flask import Flask, request
import json
import pandas
import numpy
from backend.mining.pattern import Pattern

from itertools import combinations

app = Flask(__name__)

# STARTS A DATASET SINGLETON
dataset = Dataset()


# DEBUG VARIABLES
DEBUG_PARAMETERS = True
DEBUG_CONFIG = False
mem_ind = []

NACREDITO = []


@app.route('/', methods=['POST'])
@cross_origin()
def index():
    # Reads the parameters from the query
    nodes, edges, glob_att, outcomes, fut_nodes, prediction_attr, id_attr, matching, ds, typ = reads_params(request)

    if DEBUG_PARAMETERS:
        print("--------- Debug Parameters ---------")
        print("prediction attr:", prediction_attr)
        print("future nodes:", fut_nodes)
        print("outcomes:", outcomes)
        print("matching:", matching)
        print("globals:", glob_att)
        print("id_attr:", id_attr)
        print("Nodes:", nodes)
        print("Edges:", edges)
        print("dataset:", ds)
        print("type:", typ)
        print("------------------------------------")

    import time
    time_v = time.time()

    # Gets dataset
    dataset.get_instance(ds)

    # Gets graph and paths
    graph = Graph(nodes, edges)
    paths = graph.make_maximal_paths()

    # Gets individual
    mem_ind.append(get_individuals(dataset, glob_att, matching, typ, graph, paths))

    individuals = mem_ind[0]

    for key, item in individuals.items():
        print(len(item))

    # Gets Relative Risk
    rr = get_rr(dataset.event_data, individuals, dataset.config, outcomes)

    # Sankey
    response = new_sankey(individuals, graph, paths, dataset.config, rr)

    from backend.query_maker.get_individuals import get_global,reset_global

    print(get_global(), time.time() - time_v, get_global()/(time.time() - time_v))
    reset_global()

    return response


@app.route('/config/', methods=['POST'])
@cross_origin()
def config():
    param = read_config(request)
    cf = get_config(param)
    if DEBUG_CONFIG:
        print(param)
    return cf


def apriori(df, up, min, cols):

    pandas.get_dummies(df.unstack()[~(df.unstack() == -9999)]).groupby(level=1).sum()




#     patterns = []
#     for cnum in range(minlen, rowlen+1):
#         for cols in combinations(ts, cnum):
#             patsup = ts[list(cols)].all(axis=1).sum()
#             patsup=float(patsup)/collen
#             pattern.append([",".join(cols), patsup])
#     sdf = pd.DataFrame(pattern, columns=["Pattern", "Support"])
#     results=sdf[sdf.Support >= support]
#
#     return results

@app.route('/minecohort/', methods=['POST'])
@cross_origin()
def mine():

    nodes = read_cohort_nodes(request)
    indexes = None

    for node in nodes:
        if indexes is None:
            indexes = mem_ind[0][int(node)].index.values
        else:
            indexes = numpy.union1d(indexes, mem_ind[0][int(node)].index.values)

    indexes = numpy.unique(indexes)

    # get dataset on binary format
    ds = dataset.entity_data
    new_data = ds.loc[ds[dataset.config["id_attribute"]["name"]].isin(indexes)]
    new_data = new_data.drop(dataset.config["id_attribute"]["name"], 1)
    cols = Dataset.get_categorical_columns(dataset.config["global_attributes"], dataset.config["types"])
    new_data = new_data[cols]
    for col in cols:
        new_data[col] = pandas.Series(list(map(lambda x: (col,x), new_data[col].values)), index=new_data[col].index)
    new_data = pandas.get_dummies(new_data.unstack()).groupby(level=1).sum() == 1
    cols = new_data.columns
    for col in cols:
        if col[1] == dataset.config["nan"]:
            del new_data[col]
    new_data = new_data == 1

    # sets variables for apriori
    cols = new_data.columns
    min_sup = 50

    fp = []
    pn = []
    for col in cols:
        sup = (new_data[col]).sum()
        if sup >= min_sup:
            pat = Pattern(attributes=[col[0]], values=[col[1]])
            pat.add("sup", sup)
            fp.append(pat)
            pn.append(pat)

    it = 0

    while len(pn) != 0 and it < 1:
        it += 1
        print(len(pn), pn)
        npn = Pattern.generate_npn(pn)
        pn = []

        for pat in npn:
            tup = pat.get_tuples()

            truth_table = new_data[tup[0]]

            for t in tup[1:]:
                truth_table = truth_table & new_data[t]

            sup = truth_table.sum()
            pat.add("sup", sup)

            if pat.get("sup") >= min_sup:
                fp.append(pat)
                pn.append(pat)

    print("finish mining!")
    for pat in fp:

        tup = pat.get_tuples()
        truth_table = dataset.entity_data[tup[0][0]] == tup[0][1]
        for t in tup[1:]:
            truth_table = truth_table & (dataset.entity_data[t[0]] == t[1])
        r_sup_o = truth_table.sum()/len(dataset.entity_data)
        r_sup_n = pat.get("sup")/len(new_data)
        pat.add("excitingness", r_sup_n/r_sup_o)

    fp = Pattern.sort_on(fp, "excitingness")
    new_fp = fp[-3:] + fp[:3]

    new_fp_rpr = list(map(lambda a: a.__repr__(), new_fp))


    return json.dumps(new_fp_rpr)

if __name__ == "__main__":
    app.run()
