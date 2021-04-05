import Model from '../-model';
import { inject as service } from "@ember/service";

export default class Pages extends Model {

  @service content;
  @service models;

  all = null;

  async load() {
    this.all = this.content.filter(file => {
      return file.directory === 'pages' && file.type === 'markdown';
    }).reverse().map(file => {
      return this.models.create('content/pages/page', { file });
    });
    return this;
  }

  pageBySlug(slug) {
    return this.all.find(page => page.slug === slug);
  }

}
