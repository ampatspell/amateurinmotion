import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { next, later } from '@ember/runloop';
import { htmlSafe } from '@ember/template';

export default class RouteIndexWelcomeComponent extends Component {

  @tracked pos = 25;
  delta = 0.5;

  get style() {
    let { pos } = this;
    return htmlSafe(`background: linear-gradient(0deg, rgba(187,254,255,0.8) 0%, rgba(187,254,255,0.5) ${pos}%, rgba(255,247,179,0.8) 100%);`);
  }

  constructor() {
    super(...arguments);
    next(() => this.animate());
  }

  animate() {
    if(this.isDestroying) {
      return;
    }
    this.pos += this.delta;
    if(this.pos > 75 || this.pos < 25) {
      this.delta = -this.delta;
    }
    later(() => this.animate(), 50);
  }

}
