var map;
var MapMaken = function () {
	var init = function(latlng, locatienaam){
		var mapDiv = document.getElementById("map_canvas");
		map = plugin.google.maps.Map.getMap(mapDiv);
		map.on(plugin.google.maps.event.MAP_READY, onMapInit);
		function onMapInit(map) {
			map.animateCamera({
			'target': latlng,
			'zoom': 18,
			'bearing': 140
			});
			 map.addMarker({
			'position': latlng,
			'title': locatienaam
			}, function(marker) {
			marker.showInfoWindow();
			});
		}

	}
		var remove = function()
	{
		map.remove();
	}
    return {
        init: init,
		remove:remove
    };
}()

