import Base, { remark } from './-base';
import { widow } from '../../util/string';

export default class Basic extends Base {

  @remark('body')
  tree(node) {
    let { type, tagName } = node;
    if(type === 'text') {
      node.value = widow(node.value);
    } else if(type === 'element' && tagName === 'a') {
      let href = node.properties.href;
      if(href.startsWith('http') || href.startsWith('mailto')) {
        node.properties.target = 'top';
      } else if(href.startsWith('/')) {
        let route = href.substr(1);
        return {
          type: 'component',
          name: 'remark/link-to',
          inline: true,
          model: {
            route
          },
          children: node.children
        };
      }
    }
    return node;
  }

}
