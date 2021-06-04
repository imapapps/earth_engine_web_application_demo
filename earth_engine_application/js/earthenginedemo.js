$(function () {
  loadMap("map", ol.proj.transform([-122, 37], "EPSG:4326", "EPSG:3857"), 10);
  initRequestModal();
});

function test() {
  $.ajax({
    url: api_url + "test",
    type: "POST",
    async: true,
    crossDomain: true,
    contentType: "application/json",
    data: JSON.stringify({}),
  })
    .fail(function (jqXHR, textStatus, errorThrown) {
      fail(jqXHR, textStatus, errorThrown);
    })
    .done(function (data) {
      addMapLayer(data);
    });
}

function meanImageByCollection() {
  const theJson = {
    collectionName: $("#imageName").val(),
    visParams: JSON.parse(
      $("#visParams").val().length ? $("#visParams").val() : null
    ),
    dateFrom: $("#fromDate").val(),
    dateTo: $("#toDate").val(),
  };

  $.ajax({
    url: api_url + "meanImageByCollection",
    type: "POST",
    async: true,
    crossDomain: true,
    contentType: "application/json",
    data: JSON.stringify(theJson),
  })
    .fail(function (jqXHR, textStatus, errorThrown) {
      fail(jqXHR, textStatus, errorThrown);
    })
    .done(function (data) {
      addMapLayer(data);
    });
}

function timeSeriesIndex() {
    theJson = {
        collectionNameTimeSeries: $("#imageName").val(),
        geometry: JSON.parse($("#drawnPolygon").text()),
        dateFromTimeSeries: $("#fromDate").val(), 
        dateToTimeSeries: $("#toDate").val(),
        indexName: $("#bandselector").val(), 
        reducer: $("#reducer").val(), 
        scale: $("#scale").val(), 
    };

    $.ajax({
        url: api_url + 'timeSeriesIndex',
        type: "POST",
        async: true,
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(theJson)
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.warn(jqXHR + textStatus + errorThrown);
        $("#overlay").hide();
    }).done(function (data, _textStatus, _jqXHR) {
        if (data.errMsg) {
            console.info(data.errMsg);
        } else {
            if (data.hasOwnProperty("timeseries")) {
                createChart('timeSeriesIndex', data.timeseries);
            } else {
                console.warn("Wrong Data Returned");
                console.log(data);
            }
        }
        $("#overlay").hide()
    });
}
