import Base, { file } from '../../-base';
import { cached } from 'tracked-toolbox';

export default class GalleryImage extends Base {

  @file('filename') filename;
  @file('blob') blob;

  get label() {
    let { filename } = this;
    return filename.substr(0, filename.lastIndexOf('.'));
  }

  @cached
  get url() {
    return URL.createObjectURL(this.blob);
  }

}
