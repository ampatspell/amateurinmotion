import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class BlogRoute extends Route {

  @service('ember-remark@models') models;

  model() {
    return this.models.create('content/blog').load();
  }

}
