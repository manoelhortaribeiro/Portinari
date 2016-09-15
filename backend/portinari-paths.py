from query_maker.get_individuals import get_individuals
from utils.io_handling import reads_dataset, reads_params
from flask_cors import cross_origin
from flask import Flask, request
import backend.config as config

app = Flask(__name__)

# Reads the dataset on initialization
e_table, i_table = reads_dataset(config.event_table_name,
                                 config.event_table_description,
                                 config.individuals_table_name,
                                 config.individuals_table_description)


@app.route('/', methods=['POST'])
@cross_origin()
def index():
    if request.method == 'POST':

        # Reads the parameters from the query
        nodes, edges, outcomes, future_nodes, prediction_attr, id_attr = reads_params(request)

        # Gets individual
        get_individuals(nodes, edges, i_table, e_table)

        # Makes Sankey diagram

    return "Hello World!"


if __name__ == "__main__":
    app.run()
