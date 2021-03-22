import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class IndexRoute extends Route {

  @service models;
  @service files;

  async model() {
    let file = this.files.file('hello.md');
    let model = this.models.create('content/basic', { file });
    await model.load();
    return {
      hello: model
    };
  }

}
