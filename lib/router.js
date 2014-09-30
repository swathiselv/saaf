Router.map(function() {
  this.route('dashboard', {
    path: '/',
  	});

    this.route('addSpotfix', {
    path: '/plan',
  	});

  	this.route('reportSpotfix', {
    path: '/report',
  	});
});