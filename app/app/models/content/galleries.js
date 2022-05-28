import Model from '../-model';
import { inject as service } from "@ember/service";
import { sortedBy } from '../../util/array';

export default class Galleries extends Model {

  @service content;
  @service models;

  all = null;

  imagesForGallery(file) {
    let { name } = file;
    let directory = name.substr(0, name.lastIndexOf('.'));
    return this.content.filter(file => {
      return file.type === 'binary' && file.directory === directory;
    }).map(file => {
      return this.models.create('content/galleries/gallery/image', { file });
    });
  }

  async load() {
    this.all = sortedBy(await Promise.all(this.content.filter(file => {
      return file.directory === 'galleries' && file.type === 'markdown';
    }).map(async file => {
      let images = this.imagesForGallery(file);
      await Promise.all(images.map(image => image.load()));
      return this.models.create('content/galleries/gallery', { file, opts: { images } }).load();
    })), gallery => gallery.position);
    return this;
  }

  galleryBySlug(slug) {
    return this.all.find(page => page.slug === slug);
  }

}
