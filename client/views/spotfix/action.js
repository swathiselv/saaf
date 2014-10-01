Template.action.latitude = function() {
	console.log(gmaps.newMarker);
	return gmaps.newMarker.position.lat();
}

Template.action.longitude = function() {
	return gmaps.newMarker.position.lng();
}