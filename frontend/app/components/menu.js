import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { transition } from '@ember/routing';
import { get, set } from '@ember/object';

export default class AudioComponent extends Component {
  @tracked pauseOrPlay = 'Play';

  @service router;
  @service menuService;
  //@tracked currentSong = get(this.menuService, 'music'); // = this.globals.music;

  get currentSong() {
    //let document.querySelector('audio');

    return this.menuService.music; // = this.globals.music;
  }

  get keys() {
    console.log(this.menuService.keys);
    return this.menuService.keys;
  }

  @action
  playMusic() {
    let audio = document.querySelector('audio');
    if (this.pauseOrPlay == 'Pause') {
      audio.pause();
      this.pauseOrPlay = 'Play';
    } else {
      audio.play();
      this.pauseOrPlay = 'Pause';
    }
  }

  @action
  reveal() {
    let musicComponent = document.getElementById('music-component');
    if (musicComponent.style.left == '-120px') {
      document.getElementById('music-component').style.left = 0;
    } else {
      document.getElementById('music-component').style.left = '-120px';
    }
  }

  @action
  keyDrag(event) {
    console.log(event.target.id);
    set(this.menuService, 'key', event.target.id);
  }
}
