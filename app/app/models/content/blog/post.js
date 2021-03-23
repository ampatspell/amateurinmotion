import Base, { attr, remark } from '../-base';

export default class Post extends Base {

  @attr('slug') slug;
  @attr('title') title;
  @attr('intro') intro;
  @attr('date') date;

  @remark('body')
  tree(node) {
    let { type, tagName } = node;
    if(type === 'element' && tagName === 'a') {
      let href = node.properties.href;
      if(href.startsWith('http') || href.startsWith('mailto')) {
        node.properties.target = 'top';
      }
    }
    return node;
  }

  get isHidden() {
    return this.file.filename.startsWith('-');
  }

}
