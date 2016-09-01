import json
import numpy as np
import pandas
from flask import Flask, request
from flask_cors import cross_origin
from query_interpreter.graph_maker import Graph

app = Flask(__name__)

df = pandas.read_csv('opencrab.csv')
df.set_index(keys=['diagnosis1'], drop=False, inplace=True)


@app.route('/', methods=['POST'])
@cross_origin()
def index():
    if request.method == 'POST':

        nodes = json.loads(request.form['nodes'])
        edges = json.loads(request.form['edges'])
        outcomes = json.loads(request.form['outcomes'])
        prediction_attr = json.loads(request.form['prediction_attr'])
        future_nodes = json.loads(request.form['future_nodes'])
        id_attr = json.loads(request.form['id'])

        graph = Graph(nodes, edges)
        paths = graph.make_maximal_paths()

        individuals = None

        for path in paths:
            for node in path:
                json_node = graph.get_node(node)
                for constraint in json_node['key_op_value']:
                    if constraint[0] == 'diagnosis1' and constraint[1] == '==':
                        tmp = df.query("diagnosis1 == " + constraint[2])['ID'].unique()
                        if individuals is None:
                            individuals = tmp
                        else:
                            individuals = np.intersect1d(tmp, individuals, assume_unique=True)

        print(individuals, len(individuals))

    return "Hello World!"


if __name__ == "__main__":
    app.run()
