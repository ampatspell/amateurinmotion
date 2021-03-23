import Component from '@glimmer/component';
import { action } from "@ember/object";
import { localCopy  } from "tracked-toolbox";

export default class RemarkBlogCounterComponent extends Component {

  @localCopy('args.model.value') value;

  @action
  onClick() {
    this.value++;
  }

}
