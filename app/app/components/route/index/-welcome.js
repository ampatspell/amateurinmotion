import Component from '@glimmer/component';
import { action } from "@ember/object";
import { widow } from '../../../util/string';

export default class RouteIndexWelcomeComponent extends Component {

  @action
  onPreprocess(node) {
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
