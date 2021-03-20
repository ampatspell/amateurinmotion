import Route from '@ember/routing/route';
import { fetchMarkdown } from '../lib/fetch';
import { matter } from '../lib/matter';

export default class IndexRoute extends Route {

  async model() {
    let content = await fetchMarkdown('hello');
    let { attributes, body } = matter(content);
    return {
      attributes,
      body
    };
  }

}
