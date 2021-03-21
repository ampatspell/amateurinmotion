import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class IndexRoute extends Route {

  @service files;

  async model() {
    let index = await this.files.metadata.load('metadata.json');
    console.log(index);

    let file = await this.files.markdown.load('hello.md');

    return {
      file
    };
  }

}
