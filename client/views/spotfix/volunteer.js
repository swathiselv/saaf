  Template.volunteer.events({
    'submit form': function(theEvent, theTemplate) {
        console.log(Session.get('lat') + ":" + Session.get('lng'));
        Meteor.call('addVolunteer', Session.get('lat'), Session.get('lng'));
  }});