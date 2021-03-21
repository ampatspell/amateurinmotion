import Model from './model';
import { inject as service } from "@ember/service";

export default class Projects extends Model {

  @service files;
  @service models;

  posts = null;

  async load() {
    this.posts = this.files.filter(file => {
      return file.directory === 'blog' && file.type === 'markdown';
    }).reverse().map(file => {
      return this.models.create('post', { file });
    });
    return this;
  }

  postBySlug(slug) {
    return this.posts.find(post => post.slug === slug);
  }

}
