import json
from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)


@app.route('/', methods=['POST'])
@cross_origin()
def index():

    if request.method == 'POST':
        print("query started")
        nodes = json.loads(request.form['nodes'])
        edges = json.loads(request.form['edges'])
        pred_attr = json.loads(request.form['pred_attr'])
        future_nodes = json.loads(request.form['future_nodes'])
        id_attr = json.loads(request.form['id'])

        print(nodes, edges, pred_attr, future_nodes, id_attr)

    return "Hello World!"


if __name__ == "__main__":
    app.run()
