var spotfixes= new Meteor.Collection("Spotfixes");

Template.map.rendered = function() {
    if (! Session.get('map'))
        gmaps.initialize();
 
    Deps.autorun(function() {
        //var fixes = Spotfixes.find().fetch();

        var objMarker = {
                    id: 1,
                    lat: 42.376253,
                    lng: -71.242557,
                    title: 'woah'
                };

        var objMarker1 = {
                    id: 2,
                    lat: 42.376491,
                    lng: -71.245314,
                    title: 'woah woah'
                };

                // check if marker already exists
                if (!gmaps.markerExists('id', objMarker.id))
                    gmaps.addMarker(objMarker);

                // check if marker already exists
                if (!gmaps.markerExists('id', objMarker1.id))
                    gmaps.addMarker(objMarker1);
 
        // _.each(fixes, function(fix) {
        //     if (typeof fix.location !== 'undefined' &&
        //         typeof fix.location.latitude !== 'undefined' &&
        //         typeof fix.location.longitude !== 'undefined') {
 
        //         var objMarker = {
        //             id: fix._id,
        //             lat: fix.location.latitude,
        //             lng: fix.location.longitude,
        //             title: fix.name
        //         };
 
        //         // check if marker already exists
        //         if (!gmaps.markerExists('id', objMarker.id))
        //             gmaps.addMarker(objMarker);
 
        //     }
        // });
    });
}
Template.map.destroyed = function() {
    Session.set('map', false);
}
