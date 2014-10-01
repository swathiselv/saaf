Template.addSpotfix.rendered= function() {
  		var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} var today = mm+'-'+dd+'-'+yyyy;
        $('#datepicker').val(today);

        $('#datepicker').datepicker({
            format: 'mm-dd-yyyy',
            weekStart: '0'
        });
  };


  Template.addSpotfix.events({
    'submit form': function(theEvent, theTemplate) {
        theEvent.preventDefault();
        var lat = Session.get('lat');
        var lng = Session.get('lng');

        var name = theTemplate.find('#name').value;
        var email = theTemplate.find('#email').value;
        var date = theTemplate.find('#datepicker').value;
        var description = theTemplate.find('#description').value;
        var volunteers = theTemplate.find('#volunteers').value;

        Meteor.call('addSpotFix', lat, lng, name, date, volunteers, email, description);
        Router.go("dashboard");
    },

    'click button.cancel': function(theEvent, theTemplate) {
            Router.go("dashboard");
    }
  });