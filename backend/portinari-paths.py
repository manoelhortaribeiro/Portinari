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

app = Flask(__name__)

# STARTS A DATASET SINGLETON
dataset = Dataset()

print(dataset.event_data)

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

    return response


@app.route('/config/', methods=['POST'])
@cross_origin()
def config():
    param = read_config(request)
    cf = get_config(param)
    if DEBUG_CONFIG:
        print(param)
    return cf


@app.route('/minecohort/', methods=['POST'])
@cross_origin()
def mine():

    if len(NACREDITO) == 0:
        return_v = ["689 Individuals - Uses condom, has sexual intercourse",
                    "642 Individuals - Never had herpes, never had gonorreia"]
        NACREDITO.append(1)
    else:
        return_v = ["1342 Individuals - Has hormonal contraception, has sexual intercourse",
                    "642 Individuals -  Never had hormonal contraception, never had sexual intercourse"]
        NACREDITO.pop()


    return json.dumps(return_v)

if __name__ == "__main__":
    app.run()
