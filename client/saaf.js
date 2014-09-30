var i = 0;
eventFunction = function(e) {
    Markers.insert({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        title: "new map: " + i++
    });
}

Template.map.rendered = function() {
    if (! Session.get('map')) {
        gmaps.initialize();
        gmaps.addClickListener(eventFunction);
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
