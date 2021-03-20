import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { toTree } from '../../lib/remark';
import { toDom } from '../../lib/dom';

export default class BlockRemarkComponent extends Component {

  @tracked content;

  constructor() {
    super(...arguments);
    this.render();
  }

  @action
  didUpdateContent() {
    this.render();
  }

  async render() {
    let content = this.args.content;
    let tree = await toTree(content);
    if(this.args.content === content) {
      this.content = toDom(tree, this.args.onPreprocess);
    }
  }

}
