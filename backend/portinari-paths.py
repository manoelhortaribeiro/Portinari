from query_maker.get_individuals import get_individuals
from data_and_input_handling.reads_dataset import reads_dataset
from flask_cors import cross_origin
from flask import Flask, request
import config
import json

app = Flask(__name__)

# Reads the dataset on initialization
reads_dataset(config.event_table_name, config.event_table_description,
              config.individuals_table_name, config.individuals_table_description)

@app.route('/', methods=['POST'])
@cross_origin()
def index():
    if request.method == 'POST':

        jload = json.loads
        nodes, edges = jload(request.form['nodes']), jload(request.form['edges'])
        outcomes, future_nodes = jload(request.form['outcomes']), jload(request.form['future_nodes'])
        prediction_attr, id_attr = jload(request.form['prediction_attr']), jload(request.form['id'])

        print(nodes, edges)
        #get_individuals(nodes, edges, individuals_table, exams_table)
    return "Hello World!"


if __name__ == "__main__":
    app.run()
