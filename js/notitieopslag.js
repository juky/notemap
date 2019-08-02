var NotitieOpslag = function () {
    var _notitie = [];
	var _lat = [];
	var _lng = [];
	var _locatienaam = [];

var _setLocalStorage = function() {
    localStorage.setItem('notitie', JSON.stringify(_notitie));
	localStorage.setItem('lat', JSON.stringify(_lat));
	localStorage.setItem('lng', JSON.stringify(_lng));
	localStorage.setItem('locatienaam', JSON.stringify(_locatienaam));
    _NotitieList();
}				

var _NotitieList = function() {
	$('#tabNotities').empty();
	var html = '<ul class="collapsible" data-collapsible="expandable">'
	for(var i = 0; i < _notitie.length; i++) {
		var note = _notitie[i].split("\n").join("</br>");
		html += '<li><div class="collapsible-header"><i class="material-icons">place</i>'+ _locatienaam[i] + '</div><div class="collapsible-body"><span>'+ note +'</span></br><div class="centera"> <a class="waves-effect waves-light btn red rem" data-id="' + i +'"><i class="material-icons left">delete_forever</i>Verwijderen</a></div></div></li>'
	}
	html += '</ul>'
	$('#tabNotities').append(html);
	$('.collapsible').collapsible();
};

var init = function(){
    _notitie = [];
    var notitie_str = localStorage.getItem('notitie'); 
	if (notitie_str !== null) {
         _notitie = JSON.parse(notitie_str);
    }
	_lat = [];
    var lat_str = localStorage.getItem('lat'); 
	if (lat_str !== null) {
         _lat = JSON.parse(lat_str);
    }
	_lng = [];
    var lng_str = localStorage.getItem('lng'); 
	if (lng_str !== null) {
         _lng = JSON.parse(lng_str);
    }
	_locatienaam = [];
    var locatienaam_str = localStorage.getItem('locatienaam'); 
	if (locatienaam_str !== null) {
         _locatienaam = JSON.parse(locatienaam_str);
    }
	_NotitieList();
}				
var addNotitie= function(notitie,lat,lng,locatienaam){
    _notitie.push(notitie);
	_lat .push(lat);
	_lng.push(lng);
	_locatienaam.push(locatienaam);
    _setLocalStorage();
};

var getNotities = function (){
	var notitieslijst = [];
	for(var i = 0; i < _notitie.length; i++) {
	notitieslijst.push(_notitie[i]);
	}
	return notitieslijst;
};
var getlat = function (){
	var latslijst = [];
	for(var i = 0; i < _lat.length; i++) {
	latslijst.push(_lat[i]);
	}
	return latslijst;
};
var getlng = function (){
	var lngslijst = [];
	for(var i = 0; i < _lng.length; i++) {
	lngslijst.push(_lng[i]);
	}
	return lngslijst;
};
var deleteNotitie = function(id){
	function onInput(buttonIndex) {
		if(buttonIndex==1)
	{
		_notitie.splice(id, 1);
		_lat.splice(id, 1);
		_lng.splice(id, 1);
		_locatienaam.splice(id, 1);
		_setLocalStorage();
	}
	}
	navigator.notification.confirm(
    'Wilt u deze notitie verwijderen',
	onInput,
    'Verwijderen',	
	['Ja','Nee'] 
		)}
	
    return {
        init: init,
		addNotitie: addNotitie,
		getNotities: getNotities,
		getlat: getlat,
		getlng: getlng,
		deleteNotitie: deleteNotitie
    };
}()
