Template.action.events({
  'click .plan': function(e) {
      e.preventDefault();
      console.log("Here I am");
      Router.go('addSpotfix');
  }
});