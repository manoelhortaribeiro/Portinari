from query_maker.get_individuals import get_individuals
from flask_cors import cross_origin
from flask import Flask, request
import numpy as np
import pandas
import json

app = Flask(__name__)

exams_table = pandas.read_csv('./data/exams_table.csv', sep=',', index_col=False,
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

individuals_table = pandas.read_csv('./data/patients_table.csv', sep=',', index_col=False,
                                    dtype={'Birthdate': str,
                                  'CensorDate': str,
                                  'PatientID': np.uint32,
                                  'StringRep': str}, engine='c')


@app.route('/', methods=['POST'])
@cross_origin()
def index():
    if request.method == 'POST':

        jload = json.loads
        nodes, edges = jload(request.form['nodes']), jload(request.form['edges'])
        outcomes, future_nodes = jload(request.form['outcomes']), jload(request.form['future_nodes'])
        prediction_attr, id_attr = jload(request.form['prediction_attr']), jload(request.form['id'])

        print(prediction_attr, id_attr)
        #get_individuals(nodes, edges, individuals_table, exams_table)
    return "Hello World!"


if __name__ == "__main__":
    app.run()
