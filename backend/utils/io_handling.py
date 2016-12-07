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

    base_json = json.loads(open("./config/base.json", "r").read())

    other_json = json.loads(open("./config/" + param + ".json", "r").read())

    merged_json = {key: value for (key, value) in (list(base_json.items()) + list(other_json.items()))}

    print(merged_json)

    return json.dumps(merged_json)
