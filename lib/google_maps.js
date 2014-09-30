gmaps = {
    // map object
    map: null,
 
    // google markers objects
    markers: [],
 
    // google lat lng objects
    latLngs: [],
 
    // our formatted marker data objects
    markerData: [],

    //our formatted infowindow object
    infowindow: null,

    // add a marker given our formatted marker data object
    addMarker: function(marker) {
        var gLatLng = new google.maps.LatLng(marker.lat, marker.lng);
        var gMarker = new google.maps.Marker({
            position: gLatLng,
            map: this.map,
            title: marker.title,
            //animation: google.maps.Animation.DROP,
            icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
        this.latLngs.push(gLatLng);
        this.addMarkerClickListener(gMarker);
        this.markers.push(gMarker);
        this.markerData.push(marker);
        return gMarker;
    },

    // calculate and move the bound box based on our markers
    calcBounds: function() {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, latLngLength = this.latLngs.length; i < latLngLength; i++) {
            bounds.extend(this.latLngs[i]);
        }
        this.map.fitBounds(bounds);
    },

    // check if a marker already exists
    markerExists: function(key, val) {
        _.each(this.markers, function(storedMarker) {
            if (storedMarker[key] == val)
                return true;
        });
        return false;
    },

    // initialize the map
    initialize: function() {
        console.log("[+] Intializing Google Maps...");
        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(16.375954, 80.251014),
            mapTypeControl: true,
        	mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        	},
        	navigationControl: true,
        	mapTypeId: google.maps.MapTypeId.ROADMAP
        };

          
 
        this.map = new google.maps.Map(
            document.getElementById('map-canvas'),
            mapOptions
        );

 
        // global flag saying we intialized already
        Session.set('map', true);
    }, 

    // add markers on map clicks
    addClickListener: function(e) {
        google.maps.event.addListener(this.map, 'click', e);
    },

    // show infowindow on marker click
    addMarkerClickListener: function(marker) {
        google.maps.event.addListener(marker, 'click', function() {
            var infowindow = new google.maps.InfoWindow({
                content: Detail
            });
            infowindow.open(this.map,marker);
        });
    }
}