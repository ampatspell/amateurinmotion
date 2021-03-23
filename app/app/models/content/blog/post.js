import Base, { attr, remark } from '../-base';
import { date, datetime } from '../../../util/datetime';

export default class Post extends Base {

  @attr('slug') slug;
  @attr('title') title;
  @attr('intro') intro;
  @attr('date') _date;

  @datetime('_date', 'dd.MM.yyyy') datetime;
  @date('datetime') date;

  @remark('body')
  tree(node) {
    let { type, tagName } = node;
    if(type === 'element' && tagName === 'a') {
      let href = node.properties.href;
      if(href.startsWith('http') || href.startsWith('mailto')) {
        node.properties.target = 'top';
      }
    } else if(tagName === 'counter') {
      let value = parseInt(node.properties.value);
      let text = node.children[0]?.value;
      return {
        type: 'component',
        name: 'remark/blog/counter',
        model: {
          value,
          text
        }
      };
    }
    return node;
  }

  get isHidden() {
    return this.file.filename.startsWith('-');
  }

}
