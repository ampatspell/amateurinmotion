import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export default class RouteIndexComponent extends Component {

  @reads('args.model.file.body') body;

  @action
  onPreprocess(node) {
    if(node.tagName === 'img') {
      let src = node.properties.src;
      if(src.startsWith('/')) {
        let path = `content${src}`;
        let resolved = this.assetMap.resolve(path);
        node.properties.src = resolved;
      }
    }
    return node;
  }

  // } else if(node.tagName === 'gallery') {
  //   let name = node.properties.name;
  //   return {
  //     type: 'component',
  //     name: 'block/remark/gallery',
  //     model: {
  //       name
  //     }
  //   };

}
