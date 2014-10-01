Meteor.methods({

	'addSpotFix': function(latitude, longitude, spotTitle, proposedDate, volunteersNeeded, emailId,description) {
		console.log("adding spotfix");
		Markers.insert({
			lat: latitude, 
			lng: longitude,
			title: spotTitle,
			date: proposedDate,
			volNeeded: volunteersNeeded,
			desc: description,
			email: emailId,
			volunteered: 0
		});
		console.log("done adding spotfix");
	},


	'getSpotFix': function(latitude, longitude) {
		return Markers.findOne({
			lat: latitude,
			lng: longitude
		});
	}
});