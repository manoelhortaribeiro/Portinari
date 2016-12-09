from utils.io_handling import Dataset, reads_params, get_config, read_config
from flask_cors import cross_origin
from flask import Flask, request, jsonify


app = Flask(__name__)
dataset = Dataset()


@app.route('/', methods=['POST'])
@cross_origin()
def index():

    response = jsonify({'some': 'data'})

    # Reads the parameters from the query
    nodes, edges, outcomes, global_v, future_nodes, prediction_attr, id_attr, matching, ds = reads_params(request)

    print("prediction attr:", prediction_attr)
    print("future nodes:", future_nodes)
    print("outcomes:", outcomes)
    print("matching:", matching)
    print("globals:", global_v)
    print("id_attr:", id_attr)
    print("Nodes:", nodes)
    print("Edges:", edges)
    print("dataset:", ds)

    dataset.get_instance(ds)

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
