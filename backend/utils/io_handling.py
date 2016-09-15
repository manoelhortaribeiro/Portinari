import pandas
import json


def reads_dataset(event_name, event_description, individuals_name, individuals_description):
    e_table = pandas.read_csv(event_name, sep=',', index_col=False, dtype=event_description, engine='c')
    i_table = pandas.read_csv(individuals_name, sep=',', index_col=False, dtype=individuals_description, engine='c')
    return e_table, i_table


def reads_params(request):
    jload = json.loads
    nodes, edges = jload(request.form['nodes']), jload(request.form['edges'])
    outcomes, future_nodes = jload(request.form['outcomes']), jload(request.form['future_nodes'])
    prediction_attr, id_attr = jload(request.form['prediction_attr']), jload(request.form['id'])
    return nodes, edges, outcomes, future_nodes, prediction_attr, id_attr
