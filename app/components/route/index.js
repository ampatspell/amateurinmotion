import Component from '@glimmer/component';
import { action } from "@ember/object";
import { localCopy } from "tracked-toolbox";

export default class RouteIndexComponent extends Component {

  @localCopy('args.content') content;

  @action
  onInput(e) {
    this.content = e.target.value;
  }

  onPreprocess(node) {
    if(node.tagName === 'gallery') {
      let name = node.properties.name;
      return {
        type: 'component',
        name: 'block/remark/gallery',
        model: {
          name
        }
      };
    }
    return node;
  }

}
