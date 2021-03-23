import Model from '../-model';
import { inject as service } from "@ember/service";
import config from '../../config/environment';
import { sortedBy } from '../../util/array';

export default class Blog extends Model {

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
    this.all = sortedBy(this.files.filter(file => {
      return file.directory === 'blog' && file.type === 'markdown';
    }).map(file => {
      return this.models.create('content/blog/post', { file });
    }), model => model.date?.getTime()).reverse();
    return this;
  }

  postBySlug(slug) {
    return this.all.find(post => post.slug === slug);
  }

}
