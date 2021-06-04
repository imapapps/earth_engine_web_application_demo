let map;
const api_url = "http://127.0.0.1:5000/";

function loadMap(target, center, zoom) {
  const raster = new ol.layer.Tile({
    source: new ol.source.OSM(),
  });
  map = new ol.Map({
    layers: [raster],
    target: target,
    view: new ol.View({
      center: center,
      zoom: zoom,
    }),
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
  $("#overlay").hide();
}

function addTileServerURL(url, layerID) {
  var geeLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: url,
    }),
    id: layerID,
  });
  map.addLayer(geeLayer);
}

function removeLayer(which) {
  map.getLayers().forEach(function (layer) {
    if (layer.get("id") != undefined && layer.get("id") === which) {
      map.removeLayer(layer);
    }
  });
}

function addInteraction(which) {

    var source = new ol.source.Vector({ wrapX: false });
    var vectorLayer = new ol.layer.Vector({
        source: source,
        id: 'drawLayer',
    });

    map.addLayer(vectorLayer);

    draw = new ol.interaction.Draw({
        source: source,
        type: which,
    });
    map.addInteraction(draw);
    draw.on('drawend', drawEnd);
}


function drawEnd(event) {
    map.removeInteraction(draw);
    var geom = event.feature.getGeometry().clone().transform('EPSG:3857', 'EPSG:4326');
    if (geom.flatCoordinates.length == 2) {
        polygon = geom.getCoordinates();
    } else {
        polygon = geom.getCoordinates()[0];
    }
    //ap = polygon;
    $("#drawnPolygon").text(JSON.stringify(polygon));
    jQuery(requestModal).modal('show');
}

function drawPolyStart() {
    jQuery(requestModal).modal('hide');
    addInteraction('Polygon');
}
