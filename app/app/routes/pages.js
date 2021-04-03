import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class PagesRoute extends Route {

  @service('ember-remark@models') models;

  async model() {
    return this.models.create('content/pages').load();
  }

}
