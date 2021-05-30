let map;
const api_url = "http://127.0.0.1:5000/";

function loadMap(target, center, zoom) {
    const raster = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    map = new ol.Map({
        layers: [raster],
        target: target,
        view: new ol.View({
            center: center,
            zoom: zoom
        })
    });
}

function addMapLayer(data) {
    if (data.errMsg) {
        console.info(data.errMsg);
    } else {
        if (data.hasOwnProperty("url")) {
            var $this = this;
            addTileServerURL(data.url, "geeLayer");
        } else {
            console.warn("Wrong Data Returned");
        }
    }
}

function addTileServerURL(url, layerID) {
    var geeLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: url
        }),
        id: layerID
    });
    map.addLayer(geeLayer);
};