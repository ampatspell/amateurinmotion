import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default class RouteIndexComponent extends Component {

  @service assetMap;

  @reads('args.model.file.body') body;

  @action
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
      let src = node.properties.src;
      if(src.startsWith('/')) {
        let path = `content${src}`;
        let resolved = this.assetMap.resolve(path);
        node.properties.src = resolved;
      }
    }
    return node;
  }

}
