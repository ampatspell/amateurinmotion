import EmberRouter from '@ember/routing/router';
import config from 'amateurinmotion/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('projects', function() {
  });

  this.route('blog', function() {
  });

  this.route('route', function() {
    this.route('projects', function() {});
    this.route('blog', function() {});
  });
});
