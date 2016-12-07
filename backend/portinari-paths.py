from utils.io_handling import reads_dataset, reads_params, get_config, read_config
from flask_cors import cross_origin
from flask import Flask, request, jsonify


app = Flask(__name__)


@app.route('/', methods=['POST'])
@cross_origin()
def index():

    response = jsonify({'some': 'data'})

    # Reads the parameters from the query
    nodes, edges, outcomes, globals, future_nodes, prediction_attr, id_attr = reads_params(request)

    print("Nodes", nodes)
    print("Edges", edges)
    print("outcomes", outcomes)
    print("globals", globals)
    print("future nodes", future_nodes)
    print("prediction attr", prediction_attr)
    print("id_attr", id_attr)

    # Gets individual
    #individuals = get_individuals(nodes, edges, i_table, e_table)

    return response

    # Makes Sankey diagram


@app.route('/config/', methods=['POST'])
@cross_origin()
def config():
    param = read_config(request)
    cf = get_config(param)
    return cf

if __name__ == "__main__":
    app.run()
