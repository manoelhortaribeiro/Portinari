import os
import json
import pandas
from neo4jdb import db_access
from parser.sankey_maker import make_sankey
from parser.json_to_query import parse_sequence
from flask import Flask, render_template, request

# Gets the paths
APP_ROOT = os.path.dirname(os.path.abspath(__file__))  # refers to application_top
APP_STATIC = os.path.join(APP_ROOT, 'static')

# Loads a config file
config_js = json.loads(open(os.path.join(APP_STATIC, "config.json"), "r").read())

# Custom flask thingy
app = Flask(__name__)


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        print("query started")

        # Creates database
        db = db_access.Neo4jDatabase("admin")
        nodes = json.loads(request.form['nodes'])
        edges = json.loads(request.form['edges'])
        pred_attr = json.loads(request.form['pred_attr'])
        future_nodes = json.loads(request.form['future_nodes'])
        id_attr = json.loads(request.form['id'])

        print(nodes, edges, pred_attr, future_nodes, id_attr)


        return 123;

        if len(request.form['begin_date']) > 2 and len(request.form['end_date']) > 2:
            begin_date = json.loads(request.form['begin_date'])
            end_date = json.loads(request.form['end_date'])
        else:
            begin_date = 0
            end_date = 10000 * 365  # 10 thousand years ;)

        query = parse_sequence(nodes, edges, pred_attr, future_nodes, id_attr, begin_date, end_date)

        split = query.split("UNION")
        print(split)

        data = None
        for i in split:
            print("acessing the db...\n", i)
            result = db.make_query(i)
            print("query done!")
            if data is None:
                data = pandas.DataFrame(result.data())
            else:
                data.append(pandas.DataFrame(result.data()))

        data.fillna(-1, inplace=True)

        sankey_json = make_sankey(data, future_nodes)

        return sankey_json

    if request.method == 'GET':
        return render_template('main.html', config_js=config_js)

if __name__ == '__main__':
    app.run()
