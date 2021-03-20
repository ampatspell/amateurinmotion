import Route from '@ember/routing/route';
import { fetchMarkdown } from '../lib/fetch';

export default class IndexRoute extends Route {

  async model() {
    let hello = await fetchMarkdown('hello');
    return {
      hello
    };
  }

}
