import Route from '@ember/routing/route';

export default class BlogPostRoute extends Route {

  async model({ post_id: slug }) {
    let post = this.modelFor('blog').postBySlug(slug);
    if(post) {
      await post.load();
    }
    return {
      post,
      slug
    };
  }

}
