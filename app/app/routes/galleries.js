import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class ProjectsRoute extends Route {

  @service models;

  model() {
    return this.models.create('content/galleries').load();
  }

}
