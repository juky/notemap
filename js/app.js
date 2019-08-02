$(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
});
var lat;
var lng;
var locatie;

$(document).on("click",".rem",function(){
	var id = $(this).data('id');
	  NotitieOpslag.deleteNotitie(id);
  });
  
function onDeviceReady() {
	$('#mapcontainer').css('height', (screen.height-56)/2);
	$('#map_locaties').css('height', (screen.height-56));
	NotitieOpslag.init();
	maakmap()


}
$('.button-collapse').sideNav();
$('#navmenuclick').click(function(){
	NoteMapMaken.clickable(false);
	var interval = setInterval(function () {
    if (!$("#sidenav-overlay").length) {
        clearInterval(interval);
        NoteMapMaken.clickable(true);
    }
}, 100);
	 });
$('.side-nav a').click(function(){
    $('.spa').hide();
    $('#' + $(this).data('show')).show();
    $('.button-collapse').sideNav('hide');
	if($('#tabNoteMaken').is(':visible')){
		NoteMapMaken.remove();
		maakmap();
	}
	if($('#tabNotitieMap').is(':visible')){
		MapMaken.remove();
		NoteMapMaken.init();
	}
 });
 
 function maakmap(){
	$('#mapcontainer').empty();
	$('#mapcontainer').append('<div class="progress"><div class="indeterminate center"></div></div>');
	var onSuccess = function(position) {
		const latlng =  {"lat": position.coords.latitude, "lng":position.coords.longitude}
			$.ajax({ url:"https://maps.googleapis.com/maps/api/geocode/json?latlng=" +  position.coords.latitude + "," + position.coords.longitude + "&key=XXXX" 
			, success: function(geolocation){
				lat = position.coords.latitude ;
				lng = position.coords.longitude;
				locatie= geolocation.results[0].formatted_address;
				$('#mapcontainer').empty();
				$('#mapcontainer').append('<div id="map_canvas"></div>');
				$('#disabled').val(locatie);
				MapMaken.init(latlng,locatie);
				}
			})
		};
		navigator.geolocation.getCurrentPosition(onSuccess);
	};
 
$('#herladen').click(function(){
	maakmap();
});
$('#opslaan').click(function(){
	if($('#Notitie').val() != ""){
	NotitieOpslag.addNotitie($('#Notitie').val(), lat , lng , locatie);
	  $('#Notitie').val('');
	$('#Notitie').trigger('autoresize');
	}
});
