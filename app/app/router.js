import EmberRouter from '@ember/routing/router';
import config from 'amateurinmotion/config/environment';

let first = true;

const sendPageView = () => {
  if(first) {
    first = false;
    return;
  }
  let key = config.analytics?.ga;
    if(!key || typeof window.gtag === 'undefined') {
    return;
  }
  window.gtag('config', key);
};

export default class Router extends EmberRouter {

  location = config.locationType;
  rootURL = config.rootURL;

  constructor() {
    super(...arguments);
    this.on('routeDidChange', () => sendPageView());
  }

}

Router.map(function () {

  this.route('projects', function() {});

  this.route('blog', function() {
    this.route('post', { path: '/:post_id' }, function() {});
  });

  this.route('pages', function() {
    this.route('page', { path: '/:page_id' }, function() {});
  });

  this.route('training', function() {});

});
