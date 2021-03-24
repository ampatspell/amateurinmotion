import Route from '@ember/routing/route';
import { file } from './-basic';

export default class IndexRoute extends Route {

  async model() {
    let hello = await file(this, 'hello.md');
    return {
      hello
    };
  }

}
