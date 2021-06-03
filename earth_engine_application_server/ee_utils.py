import ee
import sys


def image_to_map_id(image_name, vis_params={}):
    """  """
    try:
        ee_image = ee.Image(image_name)
        map_info = ee_image.getMapId(vis_params)
        return {
            'url': map_info['tile_fetcher'].url_format
        }
    except Exception as e:
        return {
            'errMsg': str(sys.exc_info()[0])
        }


def mean_image_in_collection_to_map_id(collection_name, vis_params={}, date_from=None, date_to=None):
    """  """
    try:
        if date_from and date_to:
            ee_collection = ee.ImageCollection(collection_name).filter(ee.Filter.date(date_from, date_to))
        else:
            ee_collection = ee.ImageCollection(collection_name)
        return image_to_map_id(ee.Image(ee_collection.mean()), vis_params)
    except Exception as e:
        raise Exception(sys.exc_info()[0])
