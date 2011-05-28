$(document).ready(function() {
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    // Remove any existing overlays from the map.
    // map.clearOverlays();

    var gpxFiles = $("a.gpx").get();
    $.each(gpxFiles, function(i, file) {
        loadGPXFileIntoGoogleMap(map, $(file).attr("href"));
    });
});

function loadGPXFileIntoGoogleMap(map, filename) {
    $.ajax({url: filename,
        dataType: "xml",
        success: function(data) {
          var parser = new GPXParser(data, map);
          parser.SetTrackColour("#ff0000");     // Set the track line colour
          parser.SetTrackWidth(5);          // Set the track line width
          parser.SetMinTrackPointDelta(0.001);      // Set the minimum distance between track points
          parser.CenterAndZoom(data);
          parser.AddTrackpointsToMap();         // Add the trackpoints
          parser.AddWaypointsToMap();           // Add the waypoints
        }
    });
}
