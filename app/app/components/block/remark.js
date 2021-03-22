import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { toDom } from '../../util/dom';

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

  render() {
    this.content = toDom(this.args.content);
  }

}
