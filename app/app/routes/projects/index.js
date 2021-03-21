import Route from '@ember/routing/route';

export default class ProjectsIndexRoute extends Route {

  model() {
    return this.modelFor('projects');
  }

}
