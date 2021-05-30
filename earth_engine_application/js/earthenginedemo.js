$(function () {
    loadMap("map", ol.proj.transform([-122, 37], 'EPSG:4326', 'EPSG:3857'), 10);
    test();
});

function test() {
    $.ajax({
        url: api_url + "test",
        type: "POST",
        async: true,
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify({})
    }).fail(function (jqXHR, textStatus, errorThrown) { fail(jqXHR, textStatus, errorThrown); })
        .done(function (data) { addMapLayer(data); });
}
