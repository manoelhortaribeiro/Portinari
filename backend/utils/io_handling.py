import pandas
import json
import numpy as np

class Dataset:

    def __init__(self):
        self.name, self.event_data, self.entity_data, self.config = None, None, None, None

    def get_instance(self, param):

        if param == self.name:
            return self.entity_data, self.event_data

        # READS CONFIG

        self.config = json.loads(open("./config/" + param + ".json", "r").read())

        # READS EVENT DATA

        description = {}

        # adds node attributes
        for node in self.config["node_attributes"]:
            description[node["name"]] = getattr(np,  node["pytype"])

        # id attribute
        description[self.config["id_attribute"]["name"]] = self.config["id_attribute"]["pytype"]

        self.event_data = pandas.read_csv(self.config["event_table_name"], sep=',',
                                          index_col=False, dtype=description, engine='c')

        # READS ENTITY DATA

        description = {}

        # adds global attributes
        for node in self.config["global_attributes"]:
            description[node["name"]] = node["pytype"]

        # id attribute
        description[self.config["id_attribute"]["name"]] = self.config["id_attribute"]["pytype"]

        # adds indexes
        for outcome in self.config["outcome_attributes"]:
            description[outcome["index"]] = getattr(np, outcome["index_pytype"])

        self.entity_data = pandas.read_csv(self.config["individuals_table_name"], sep=',',
                                           index_col=False, dtype=description, engine='c')

        # READS NAME

        self.name = param


def reads_params(request):
    jload = json.loads

    nodes, edges, global_attr = jload(request.form['nodes']), \
                                jload(request.form['edges']), \
                                jload(request.form['globals'])

    outcomes, future_nodes = jload(request.form['outcomes']), \
                             jload(request.form['future_nodes'])

    prediction_attr, id_attr = jload(request.form['prediction_attr']), \
                               jload(request.form['id'])

    matching, ds = jload(request.form['matching']), \
                   jload(request.form['datasets'])

    return nodes, edges, global_attr, outcomes, future_nodes, prediction_attr, id_attr, matching, ds


def read_config(request):
    return request.form['name']


def get_config(param):
    base_json = json.loads(open("./config/base.json", "r").read())
    other_json = json.loads(open("./config/" + param + ".json", "r").read())
    merged_json = {key: value for (key, value) in (list(base_json.items()) + list(other_json.items()))}
    return json.dumps(merged_json)
