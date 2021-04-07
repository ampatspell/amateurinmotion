import Route from '@ember/routing/route';

export default class PagesPageIndexRoute extends Route {

  async model({ page_id: slug }) {
    let page = this.modelFor('pages').pageBySlug(slug);
    if(page) {
      await page.load();
    }
    return {
      slug,
      page
    };
  }

}
