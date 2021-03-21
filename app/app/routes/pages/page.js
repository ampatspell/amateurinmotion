import Route from '@ember/routing/route';

export default class PagesPageIndexRoute extends Route {

  async model({ page_id }) {
    let page = this.modelFor('pages').pageBySlug(page_id);
    if(!page) {
      this.transitionTo('index');
      return;
    }
    return await page.load();
  }

}
