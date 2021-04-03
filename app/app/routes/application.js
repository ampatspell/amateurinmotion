import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class ApplicationRoute extends Route {

  @service('ember-remark@files') files;

  async beforeModel() {
    await this.files.load();
  }

}
