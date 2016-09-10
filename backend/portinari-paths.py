from query_interpreter.graph_maker import Graph
from flask_cors import cross_origin
from flask import Flask, request
import numpy as np
import pandas
import json


app = Flask(__name__)

exams = pandas.read_csv('./data/exams_table.csv', sep=',', index_col=False,
                        dtype={'PatientID': np.uint32,
                               'DiagnosisDate': str,
                               'DiagnosisNbr': np.uint8,
                               'ExamType': str,
                               'Diagnosis': np.uint8,
                               'MorphologyCode': str,
                               'Stage': str,
                               'LaboratoryNbr': np.uint8,
                               'Region':  np.uint8,
                               'TimeSinceLast': np.int16}, engine='c')

patients = pandas.read_csv('./data/patients_table.csv', sep=',', index_col=False,
                           dtype={'Birthdate': str,
                                  'CensorDate': str,
                                  'PatientID': np.uint32,
                                  'StringRep': str}, engine='c')


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
                    if constraint[0] == 'Diagnosis' and constraint[1] == '==':
                        tmp = exams.query("Diagnosis == " + constraint[2]).PatientID
                        if individuals is None:
                            individuals = tmp
                        else:
                            individuals = np.intersect1d(tmp, individuals)

        print(len(individuals), individuals)
        patients_of_interest = patients[patients['PatientID'].isin(individuals)]
        print(patients_of_interest)

    return "Hello World!"


if __name__ == "__main__":
    app.run()
