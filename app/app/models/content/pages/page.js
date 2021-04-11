import Base, { attr, remark } from '../-base';
import { widow } from '../../../util/string';

export default class Page extends Base {

  @attr('slug') _slug;
  @attr('title') title;
  @attr('date') date;
  @attr('hidden') hidden;

  get slug() {
    let { _slug } = this;
    if(_slug) {
      return _slug;
    }
    let filename = this.file.filename;
    let components = filename.split('.');
    components.pop();
    return components.join('.');
  }

  @remark('body')
  tree(node) {
    let { type, tagName } = node;
    if(type === 'text') {
      if(this.opts.widow) {
        node.value = widow(node.value);
      }
    } else if(tagName === 'block') {
      let title = node.properties.title;
      return {
        type: 'component',
        name: 'remark/pages/block',
        model: {
          title
        },
        children: node.children
      }
    } else if(tagName === 'a') {
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
