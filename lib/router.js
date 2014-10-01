Router.configure({
  // the default layout
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('dashboard', {
    path: '/',
    template: 'map',
    yieldTemplates: {
        'metrics': {to: 'chart'},
        'gallery': {to: 'photos'}
    },
    layoutTemplate: 'layout'
  });

  this.route('plan', {
    path: '/plan',
    template: 'addSpotfix',
    layoutTemplate: 'layout'
  });

  this.route('map', {
    path: '/map',
    template: 'map',
    layoutTemplate: 'layout'
  });

  this.route('gallery', {
    path: '/gallery',
    template: 'gallery',
    layoutTemplate: 'layout'
  });

  this.route('calendar', {
    path: '/calendar',
    template: 'calendar',
    layoutTemplate: 'layout'
  });

    this.route('metrics', {
    path: '/metrics',
    template: 'metrics',
    layoutTemplate: 'layout'
  });

  this.route('volunteer', {
    path: '/volunteer',
    template: 'volunteer',
    layoutTemplate: 'layout'
  });

 });