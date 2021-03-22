import EmberRouter from '@ember/routing/router';
import config from 'amateurinmotion/config/environment';

const sendPageView = url => {
  let key = config.analytics?.ga;
    if(!key || typeof window.gtag === 'undefined') {
    return;
  }
  window.gtag('config', key, {
    'page_path': url
  });
};

export default class Router extends EmberRouter {

  location = config.locationType;
  rootURL = config.rootURL;

  constructor() {
    super(...arguments);
    this.on('routeDidChange', () => sendPageView(this.currentURL));
  }

}

Router.map(function () {
  this.route('projects', function() {
  });

  this.route('blog', function() {
    this.route('post', { path: '/:post_id' }, function() {
    });
  });

  this.route('pages', function() {
    this.route('page', { path: '/:page_id' }, function() {
    });
  });

});
