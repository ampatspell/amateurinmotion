import Model from './model';
import { inject as service } from "@ember/service";

export default class Projects extends Model {

  @service files;
  @service models;

  all = null;

  async load() {
    this.all = this.files.filter(file => {
      return file.directory === 'pages' && file.type === 'markdown';
    }).reverse().map(file => {
      return this.models.create('page', { file });
    });
    return this;
  }

  pageBySlug(slug) {
    return this.all.find(page => page.slug === slug);
  }

}
