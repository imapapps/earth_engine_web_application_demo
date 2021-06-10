function createChart(wText, wTimeseriesData) {
  Highcharts.setOptions({
    global: {
      useUTC: true,
    },
  });
  Highcharts.chart("graphcontainer", {
    chart: {
      zoomType: "x",
    },
    title: {
      text: "",
    },
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? "Click and drag in the plot area to zoom in"
          : "Pinch the chart to zoom in",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: wText,
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    tooltip: {
      pointFormat: "Value: {point.y} mm",
    },
    series: [
      {
        type: "line",
        name: wText,
        data: wTimeseriesData,
        color: "#31bab0",
      },
    ],
  });
}

function loadBands() {
  $("#bandselector").find('option').remove();
  var imageName = $("#imageName").val();
  if (imageName.length > 0) {
    theJson = {
      imageCollection: imageName,
    };

    $.ajax({
      url: api_url + "getAvailableBands",
      type: "POST",
      async: true,
      crossDomain: true,
      contentType: "application/json",
      data: JSON.stringify(theJson),
    })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.warn(jqXHR + textStatus + errorThrown);
        $("#overlay").hide();
      })
      .done(function (data, _textStatus, _jqXHR) {
        if (data.errMsg) {
          console.info(data.errMsg);
        } else {
          var bands = data["bands"];

          bands.forEach(function (band) {
            $("#bandselector").append(
              '<option value="' + band + '"> ' + band + "</option>"
            );
          });
        }
      });
  }
}
