import Component from '@glimmer/component';
import { reads } from "macro-decorators";

export default class RouteIndexComponent extends Component {

  @reads('args.model.file.body') body;

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
