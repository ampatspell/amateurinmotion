import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RouteElzaComponent extends Component {

  @tracked isPlaying = false;

  @action
  toggle() {
    let { audio, isPlaying } = this;
    if(isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      this.isPlaying = false;
    } else {
      audio.play();
      this.isPlaying = true;
    }
  }

  @action
  didInsertAudio(audio) {
    this.audio = audio;
    audio.addEventListener('ended', () => {
      this.audio.currentTime = 0;
      this.isPlaying = false;
    });
  }

}
