Template.map.rendered = function() {
    if (! Session.get('map')) {
        gmaps.initialize();
        gmaps.addClickListener();
     }

        Deps.autorun(function() {
        var pages = Markers.find().fetch();
        _.each(pages, function(page) {
            var j = 0;
            if (!gmaps.markerExists('_d', page.id)) {
                gmaps.addMarker(page);
            }
        });
    });
}
Template.map.destroyed = function() {
    Session.set('map', false);
}


    getMarker = function(latitude, longitude) {
        return Markers.findOne({
            lat: latitude,
            lng: longitude
        });
    }