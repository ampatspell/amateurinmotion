import Component from '@glimmer/component';

const pad = (num, places) => String(num).padStart(places, '0');
const r = num => Math.round((num + Number.EPSILON) * 100) / 100;

export default class RouteToolsClockComponent extends Component {

  years = {
    earth: 4_543_000_000,
    humans: 200_000
  };

  get seconds() {
    let { years } = this;
    let range = 12 * 60 * 60;
    return range * (years.humans / years.earth);
  }

  get description() {
    let { years, seconds } = this;
    return {
      earth: years.earth.toLocaleString(),
      humans: years.humans.toLocaleString(),
      seconds: r(seconds)
    };
  }

  get string() {
    let milliseconds = Math.round(this.seconds * 10000);
    let seconds = Math.floor(milliseconds / 10000);
    let remaining = milliseconds - (seconds * 10000);
    return `00:00:${pad(seconds, 2)}.${remaining}`;
  }

}
