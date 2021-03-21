import Route from '@ember/routing/route';

export default class PagesIndexRoute extends Route {

  beforeModel() {
    this.transitionTo('index');
  }

}
