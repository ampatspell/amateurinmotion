import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class RemarkLinkToComponent extends Component {

  @service router;

  @reads('args.model.route') route;

  get url() {
    let { route } = this;
    return this.router.urlFor(route);
  }

  @action
  transitionTo(e) {
    if(e.metaKey) {
      return;
    }
    e.preventDefault();
    this.router.transitionTo(this.route);
  }

}
