from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
from ee_utils import *


app = Flask(__name__)


@app.before_request
def before():
    ee.Initialize()
    CORS(app)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/test', methods=['GET', 'POST'])
def test():
    image = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_044034_20140318')

    # Define the visualization parameters.
    vis_params = {
        'bands': ['B5', 'B4', 'B3'],
        'min': 0,
        'max': 0.5,
        'gamma': [0.95, 1.1, 1]
    }

    url = image_to_map_id(image, vis_params)
    return jsonify(url), 200


if __name__ == '__main__':
    app.run()
