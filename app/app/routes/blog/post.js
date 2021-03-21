import Route from '@ember/routing/route';

export default class BlogPostRoute extends Route {

  async model({ post_id }) {
    let post = this.modelFor('blog').postBySlug(post_id);
    if(!post) {
      this.transitionTo('blog');
      return;
    }
    return await post.load();
  }

}
