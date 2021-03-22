import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class IndexRoute extends Route {

  @service files;

  async model() {
    let hello = await this.files.file('hello.md').load();
    return {
      hello
    };
  }

}
