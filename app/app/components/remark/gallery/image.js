import Component from '@glimmer/component';
import { cached } from 'tracked-toolbox';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';

export default class RemarkGalleryImage extends Component {

  @tracked isDone = false;

  @action
  async didInsert(el) {
    el.scrollIntoView({ behavior: 'smooth' });
    await new Promise(resolve => setTimeout(() => resolve(), 250));
    this.isDone = true;
  }

  @cached
  get style() {
    let url = this.args.image.model.url;
    return htmlSafe(`background-image: url("${url}")`);
  }

}
