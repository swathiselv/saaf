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
 });