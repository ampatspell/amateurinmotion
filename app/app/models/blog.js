import Model from './model';
import { inject as service } from "@ember/service";
import config from '../config/environment';

export default class Projects extends Model {

  @service files;
  @service models;

  all = null;

  get posts() {
    if(config.environment === 'development') {
      return this.all;
    }
    return this.all.filter(post => !post.isHidden);
  }

  async load() {
    this.all = this.files.filter(file => {
      return file.directory === 'blog' && file.type === 'markdown';
    }).reverse().map(file => {
      return this.models.create('post', { file });
    });
    return this;
  }

  postBySlug(slug) {
    return this.all.find(post => post.slug === slug);
  }

}
