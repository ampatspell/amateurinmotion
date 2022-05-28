import Base, { attr, remark } from '../-base';
import { date, datetime } from '../../../util/datetime';
import { reads } from 'macro-decorators';

export default class Gallery extends Base {

  @attr('slug') slug;
  @attr('title') title;
  @attr('date') _date;
  @attr('hidden') hidden;

  @datetime('_date', 'dd.MM.yyyy') datetime;
  @date('datetime') date;

  @reads('opts.images') images;

  @remark('body')
  tree(node) {
    if(!node) {
      return;
    }
    let { tagName } = node;
    if(tagName === 'generate') {
      return {
        type: 'component',
        name: 'remark/gallery/generate',
        model: {
          gallery: this
        },
        children: node.children
      };
    } else if(tagName === 'gallery') {
      return {
        type: 'component',
        name: 'remark/gallery',
        model: {
          gallery: this,
          content: node.children
        }
      };
    }
    return node;
  }

  async load() {
    await super.load();
    return this;
  }

}
