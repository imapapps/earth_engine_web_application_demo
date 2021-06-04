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


def get_time_series_by_collection_and_index(collection_name, index_name, scale, coords=[], date_from=None, date_to=None,
                                            reducer=None):
    """  """
    try:
        geometry = None
        if isinstance(coords[0], list):
            geometry = ee.Geometry.Polygon(coords)
        else:
            geometry = ee.Geometry.Point(coords)
        if index_name:
            index_collection = ee.ImageCollection(collection_name).filterDate(date_from, date_to).select(index_name)
        else:
            index_collection = ee.ImageCollection(collection_name).filterDate(date_from, date_to)

        def get_index(image):
            """  """
            if reducer:
                the_reducer = eval("ee.Reducer." + reducer + "()")
            else:
                the_reducer = ee.Reducer.mean()
            if index_name:
                index_value = image.clip(geometry).reduceRegion(the_reducer, geometry, scale).get(index_name)
            else:
                index_value = image.reduceRegion(the_reducer, geometry, scale)
            return ee.Image().set('indexValue', [ee.Number(image.get('system:time_start')), index_value])

        return index_collection.map(get_index).aggregate_array('indexValue').getInfo()
    except Exception as e:
        raise Exception(sys.exc_info()[0])


def list_available_bands(name, is_image):
    if is_image:
        ee_image = ee.Image(name)
    else:
        ee_image = ee.ImageCollection(name).first()
    return {
        'bands': ee_image.bandNames().getInfo(),
        'imageName': name
    }
