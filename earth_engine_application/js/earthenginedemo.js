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

function comingSoon() {
    console.log("Coming Soon");
    $("#overlay").hide();
}
