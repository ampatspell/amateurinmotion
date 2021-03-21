import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class IndexRoute extends Route {

  @service files;

  async model() {
    let index = await this.files.load('index', 'content/index.json');
    console.log(index);
    let file = await this.files.load('markdown', 'content/hello.md');
    return {
      file
    };
  }

}
