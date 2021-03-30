import Route from '@ember/routing/route';
import { page } from './-page';

export default class IndexRoute extends Route {

  async model() {
    let hello = await page(this, 'hello.md', { widow: true });
    return {
      hello
    };
  }

}
