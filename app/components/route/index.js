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
    } else if(node.tagName === 'img') {
      node.properties.src = `https://64.media.tumblr.com/ce1ca5212821c5285737b2b7404b1322/tumblr_pcjt3xUKNf1qz5jeho1_1280.jpg`;
    }
    return node;
  }

}
