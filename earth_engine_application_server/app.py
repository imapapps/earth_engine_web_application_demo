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
    image_name = 'LANDSAT/LC08/C01/T1_TOA/LC08_044034_20140318'

    # Define the visualization parameters.
    vis_params = {
        'bands': ['B5', 'B4', 'B3'],
        'min': 0,
        'max': 0.5,
        'gamma': [0.95, 1.1, 1]
    }

    url = image_to_map_id(image_name, vis_params)
    return jsonify(url), 200


@app.route('/meanImageByCollection', methods=['POST'])
def mean_image_by_collections():
    try:
        request_json = request.get_json()
        if request_json:
            collection_name = request_json.get('collectionName', None)
            if collection_name:
                values = mean_image_in_collection_to_map_id(
                    collection_name,
                    request_json.get('visParams', None),
                    request_json.get('dateFrom', None),
                    request_json.get('dateTo', None)
                )
            else:
                raise Exception("invalid request type, please use json")
        else:
            raise Exception("invalid request type, please use json")
    except Exception as e:
        values = {
            'errMsg': str(e)
        }
    return jsonify(values), 200


@app.route('/timeSeriesIndex', methods=['POST'])
def time_series_index():
    try:
        request_json = request.get_json()
        if request_json:
            geometry = request_json.get('geometry', None)
            collection_name = request_json.get('collectionNameTimeSeries', None)
            if geometry:
                timeseries = get_time_series_by_collection_and_index(collection_name,
                                                                     request_json.get('indexName', None),
                                                                     float(request_json.get('scale', 30)),
                                                                     geometry,
                                                                     request_json.get('dateFromTimeSeries', None),
                                                                     request_json.get('dateToTimeSeries', None),
                                                                     request_json.get('reducer', None)
                                                                     )
                values = {
                    'timeseries': timeseries
                }
            else:
                raise Exception
        else:
            raise Exception
    except Exception as e:\
        values = {
            'errMsg': str(e)
        }
    return jsonify(values), 200


@app.route('/getAvailableBands', methods=['POST'])
def get_available_bands():
    """  """
    try:
        request_json = request.get_json()
        if request_json:
            image_collection_name = request_json.get('imageCollection', None)
            image_name = request_json.get('image', None)
            if image_collection_name is None:
                values = list_available_bands(image_name, True)
            else:
                values = list_available_bands(image_collection_name, False)
        else:
            raise Exception(
                "Need either image or imageCollection parameter containing the full name")
    except Exception as e:
        values = {
            'errMsg': str(e)
        }
    return jsonify(values), 200


if __name__ == '__main__':
    app.run()
