import os
import json
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

    if request.method == 'GET':
        return render_template('main.html', config_js=config_js)

if __name__ == '__main__':
    app.run()
