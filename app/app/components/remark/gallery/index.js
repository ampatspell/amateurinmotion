import Component from '@glimmer/component';
import { cached } from 'tracked-toolbox';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { nextObject, prevObject  } from '../../../util/array';

export default class RemarkGalleryIndex extends Component {

  @tracked image = null;

  get isGrid() {
    return !this.image;
  }

  @cached
  get images() {
    let { args: { model: { gallery, content } } } = this;
    let string = content[0]?.value;
    if(!string) {
      return null;
    }
    return string.split('\n').map(string => {
      let [ filename, ...rest ] = string.trim().split(' ');
      if(filename) {
        let label = rest.join(' ') || filename;
        let model = gallery.images.find(image => image.filename === filename );
        if(!model) {
          return;
        }
        return { model, label };
      }
    }).filter(Boolean);
  }

  @action
  async onSelect(image) {
    this.image = image;
  }

  @action
  onPrev() {
    let { image, images } = this;
    this.image = prevObject(images, image, true);
  }

  @action
  onNext() {
    let { image, images } = this;
    this.image = nextObject(images, image, true);
  }

  @action
  onDeselect() {
    document.body.scrollIntoView({ behavior: 'smooth' });
    this.image = null;
  }

}
