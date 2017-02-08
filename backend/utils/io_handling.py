# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
#                                     # / ---------------------------- \ #                                             #
#                                     # | AUTHOR: MANOEL HORTA RIBEIRO | #                                             #
#                                     # \ ---------------------------- / #                                             #
#                                                                                                                      #
# This has the functions and classes to deal with the input and output of data in portinari:                           #
#                                                                                                                      #
# 1. Dataset class: is a singleton that grants access to the dataset tables, config and name.                          #
#                                                                                                                      #
# 2. read_params: is a function that reads the fields of interest in the request made by the website                   #
#                                                                                                                      #
# 3. read_config: is a function that reads the name of the config file to be loaded, in the request made by the fe     #
#                                                                                                                      #
# 4. get_config: is a function that uses the name of the config file to be load it and turns it into a string.         #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #
#  Some relevant observations are that:                                                                                #
#  - We need to preprocess the inputs that come on the month form, this could have been done here, but I chose the FE  #
# ---------------------------- ----------------------------  ---------------------------- ---------------------------- #

import numpy as np
import pandas
import pickle
import json


class Dataset:
    """ This class is a singleton that allow us to reference a dataset in our backend. """

    def __init__(self):
        """ Initializes everything as None.
        :return: Nothing. """
        self.name, self.event_data, self.entity_data, self.config = None, None, None, None

    def get_instance(self, param):
        """ Reads the config files, the entity/event tables, and the name of the dataset.
        :param param: name of the dataset.
        :return: Nothing. """

        if param == self.name:
            return self.entity_data, self.event_data

        # READS CONFIG
        base = json.loads(open("./config/base.json", "r").read())
        param_config = json.loads(open("./config/" + param + ".json", "r").read())
        self.config = {key: value for (key, value) in (list(base.items()) + list(param_config.items()))}

        # READS EVENT DATA
        self.event_data = pickle.load(open(self.config["event_table_name"], "rb"))

        # READS ENTITY DATA
        self.entity_data = pickle.load(open(self.config["individuals_table_name"], "rb"))

        # READS NAME
        self.name = param


def reads_params(request):
    """ This function simply reads the fields of interest in the request made by the front-end.
    :param request: HTTP request hash.
    :return: nodes, edges, global_attr, outcomes, future_nodes, prediction_attr, id_attr, matching, ds"""

    jload = json.loads
    prediction_attr = jload(request.form['prediction_attr'])
    future_nodes = jload(request.form['future_nodes'])
    matching = jload(request.form['matching'])
    global_attr = jload(request.form['globals'])
    outcomes = jload(request.form['outcomes'])
    nodes = jload(request.form['nodes'])
    edges = jload(request.form['edges'])
    ds = jload(request.form['datasets'])
    id_attr = jload(request.form['id'])
    typ = jload(request.form['type'])

    return nodes, edges, global_attr, outcomes, future_nodes, prediction_attr, id_attr, matching, ds, typ


def read_config(request):
    """ This function simply reads the dataset to be loaded in the request made by the front-end.
    :param request: HTTP request hash.
    :return: config name """

    return request.form['name']


def read_cohort_nodes(request):

    return json.loads(request.form["nodes"])


def get_config(param):
    """ This function loads the config and returns it, so it is loaded by the front-end
    :param param: config name.
    :return: json string with the configuration """

    base_json = json.loads(open("./config/base.json", "r").read())
    other_json = json.loads(open("./config/" + param + ".json", "r").read())
    merged_json = {key: value for (key, value) in (list(base_json.items()) + list(other_json.items()))}
    return json.dumps(merged_json)
