from query_maker.get_individuals import get_individuals
from utils.io_handling import reads_dataset, reads_params, get_config, read_config, load_config
from flask_cors import cross_origin
from flask import Flask, request, jsonify
import backend.config as config


app = Flask(__name__)

# Reads the dataset on initialization
# e_table, i_table = reads_dataset(config.event_table_name,
#                                  config.event_table_description,
#                                  config.individuals_table_name,
#                                  config.individuals_table_description)


@app.route('/', methods=['POST'])
@cross_origin()
def index():

    print(request)
    response = jsonify({'some': 'data'})

    # Reads the parameters from the query
    nodes, edges, outcomes, globals, future_nodes, prediction_attr, id_attr = reads_params(request)

    print(nodes, edges, outcomes, future_nodes, prediction_attr, id_attr)

    # Gets individual
    ##individuals = get_individuals(nodes, edges, i_table, e_table)

    ##print(individuals)
    return response

    # Makes Sankey diagram


@app.route('/config/', methods=['POST'])
@cross_origin()
def config():
    param = read_config(request)
    cf = get_config(param)
    load_config(cf)
    return cf

if __name__ == "__main__":
    app.run()
