import Base, { attr, remark } from '../-base';

export default class Page extends Base {

  @attr('slug') slug;
  @attr('title') title;
  @attr('date') date;

  @remark('body')
  tree(node) {
    if(node.tagName === 'block') {
      let title = node.properties.title;
      return {
        type: 'component',
        name: 'remark/pages/block',
        model: {
          title
        },
        children: node.children
      }
    } else if(node.tagName === 'a') {
      let href = node.properties.href;
      if(href.startsWith('http') || href.startsWith('mailto')) {
        node.properties.target = 'top';
      }
    }
    return node;
  }

}
