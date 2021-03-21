import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class BlogRoute extends Route {

  @service models;

  async model() {
    return this.models.create('blog').load();
  }

}
