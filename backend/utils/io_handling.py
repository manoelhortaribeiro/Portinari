import config
import pandas
import json


def reads_dataset(event_name, event_description, individuals_name, individuals_description):
    e_table = pandas.read_csv(event_name, sep=',', index_col=False, dtype=event_description, engine='c')
    i_table = pandas.read_csv(individuals_name, sep=',', index_col=False, dtype=individuals_description, engine='c')
    return e_table, i_table


def reads_params(request):
    jload = json.loads
    nodes, edges, global_attr = jload(request.form['nodes']), jload(request.form['edges']), jload(request.form['globals'])
    outcomes, future_nodes = jload(request.form['outcomes']), jload(request.form['future_nodes'])
    prediction_attr, id_attr = jload(request.form['prediction_attr']), jload(request.form['id'])
    return nodes, edges, global_attr, outcomes, future_nodes, prediction_attr, id_attr


def read_config(request):
    return request.form['name']


def get_config(param):
    with open(config.config_frontend[param], "r") as file:
        string = file.read()
        return string


def load_config(cf):
    print(json.loads(cf))
