import Route from '@ember/routing/route';

export default class GalleriesGalleryRoute extends Route {

  async model({ gallery_id: slug }) {
    let gallery = this.modelFor('galleries').galleryBySlug(slug);
    if(gallery) {
      await gallery.load();
    }
    return {
      slug,
      gallery
    };
  }

}
