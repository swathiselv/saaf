gmaps = {
    // map object
    map: null,
 
    // google markers objects
    markers: [],
 
    // google lat lng objects
    latLngs: [],
 
    // our formatted marker data objects
    markerData: [],

    newMarker: undefined,

    newInfo: undefined,

    //newMarker: undefined,
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

        var spotFixInfo = getMarker(gLatLng.lat(), gLatLng.lng());
        var content = Blaze.toHTML(Blaze.With(spotFixInfo, function() { return Template.info; }));
        //Blaze.toHTML(Template.info)

        //temporarily create a new content:
        // var content = "Name: " + spotFixInfo.title + 
        //                 "<br>Email: " + spotFixInfo.email + 
        //                 "<br>Proposed Date: " + spotFixInfo.date +
        //                 "<br>Volunteers needed: " + spotFixInfo.volNeeded + 
        //                 "<br>Volunteers Signed up: " + spotFixInfo.volunteered;     


        this.showSpotfixWindow(gMarker, content);
        this.markers.push(gMarker);
        this.markerData.push(marker);
        var mc = new MarkerClusterer(this.map, this.markers);
        mc.repaint();
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
            zoom: 12,
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

        

          // set center and bounds to India
         var geocoder = new google.maps.Geocoder();
         var country = "India";
         var that = this;
         geocoder.geocode({'address' : country}, function (results, status) { 
            if (status == google.maps.GeocoderStatus.OK) {
                that.map.setCenter(results[0].geometry.location);
                that.map.fitBounds(results[0].geometry.bounds);
            } else {
                Console.log("Geocode was not successful for the following reason: " + status);
              }
        });

        this.addSearchBox();

        
        // global flag saying we intialized already
        Session.set('map', true);
    }, 

    resizeMap: function(map) {
        
    },

    // add markers on map clicks
    addClickListener: function() {
        var that = this;
        google.maps.event.addListener(this.map, 'click', function(e) {
            if (this.newMarker != undefined) { 
                this.newMarker.setVisible(false);
                this.newMarker = undefined;
            }
            this.newMarker = new google.maps.Marker({
                position: e.latLng,
                icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                map: that.map,
            });
            Session.set('lat', this.newMarker.position.lat());
            Session.set('lng', this.newMarker.position.lng());

            var content = Blaze.toHTML(Template.action);

            that.showSpotfixWindow(this.newMarker, content);
        });
    },

    // show infowindow on marker click
    showSpotfixWindow: function(marker, content) {
        google.maps.event.addListener(marker, 'click', function() {
            console.log("infowindow" + gmaps.newInfo);
            if(gmaps.newInfo != undefined) {
                console.log("trying to close infowindow " + gmaps.newInfo);
                gmaps.newInfo.close();
            }
            gmaps.newInfo = new google.maps.InfoWindow({
                content: content,
                maxWidth: 350
            });
            gmaps.newInfo.open(this.map,marker);
        });

    },

    // add autocomplete search box to the map
    addSearchBox : function() {
        var input = (document.getElementById('pac-input'));
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        var searchBox = new google.maps.places.SearchBox((input));
        this.addSearchMarkers(searchBox, this.map);
    },

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    addSearchMarkers: function(searchBox, map) {

          var that = this;
          google.maps.event.addListener(searchBox, 'places_changed', function() {
            
            var markers = [];
            var places = searchBox.getPlaces();

            if (places.length == 0) {
              return;
            }
            for (var i = 0, marker; marker = markers[i]; i++) {
              marker.setMap(null);
            }

            // For each place, get the icon, place name, and location.
            markers = [];
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, place; place = places[i]; i++) {
              var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };

              if (this.newMarker != undefined) { 
                this.newMarker.setVisible(false);
                this.newMarker = undefined;
            }
              // Create a marker for each place.
              this.newMarker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
              });
                Session.set('lat', this.newMarker.position.lat());
                Session.set('lng', this.newMarker.position.lng());

                var content = Blaze.toHTML(Template.action);

              that.showSpotfixWindow(this.newMarker, content);
              //markers.push(marker);

              bounds.extend(place.geometry.location);
            }

            map.fitBounds(bounds);
          });

          // Bias the SearchBox results towards places that are within the bounds of the
          // current map's viewport.
          google.maps.event.addListener(map, 'bounds_changed', function() {
            var bounds = map.getBounds();
            searchBox.setBounds(bounds);
          });
    },

}