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
      }
    }
    return node;
  }

}
