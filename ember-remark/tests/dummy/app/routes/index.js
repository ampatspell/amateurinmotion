import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class IndexRoute extends Route {

  @service('ember-remark@files') files;
  @service('ember-remark@models') models;

  async model() {
    let { files, models } = this;
    await files.load();
    let file = files.file('hello.md');
    await file.load();
    return models.create('page', { file });
  }

}
