var map;
var NoteMapMaken = function () {
	var init = function(){
		var mapDiv = document.getElementById("map_locaties");
		map = plugin.google.maps.Map.getMap(mapDiv);
		map.on(plugin.google.maps.event.MAP_READY, onMapInit);
		function onMapInit(map) {
			var latslijst = NotitieOpslag.getlat();
			var lngslijst = NotitieOpslag.getlng();
			var notitieslijst = NotitieOpslag.getNotities();
			var data = [];
			for(var i = 0; i < latslijst.length; i++) {
			data.push({'title': notitieslijst[i] , 'position': {lat: latslijst[i], lng: lngslijst[i]}});
			}
			if(data.length != 0){
			addMarkers(data, function(markers) {
			markers[markers.length - 1].showInfoWindow();
});

function addMarkers(data, callback) {
  var markers = [];
  function onMarkerAdded(marker) {
    markers.push(marker);
    if (markers.length === data.length) {
      callback(markers);
    }
  }
  data.forEach(function(markerOptions) {
    map.addMarker(markerOptions, onMarkerAdded);
  });
}
		}
		}

	}
	var remove = function()
	{
		map.remove();
	}
		var clickable = function(input)
	{
		map.setClickable(input);
	}

    return {
        init: init,
		remove: remove,
		clickable:clickable
    };
}()

