import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { transition } from '@ember/routing';
import { get, set } from '@ember/object';

export default class AudioComponent extends Component {
  //@tracked pauseOrPlay = 'Play';
  @tracked paused = true;

  @service router;
  @service menuService;


  //@tracked currentSong = get(this.menuService, 'music'); // = this.globals.music;

  get currentSong() {
    return this.menuService.music; // = this.globals.music;
  }

  get keys() {
    return this.menuService.keys;
  }

  @action
  setupAudio() {
    let audio = document.querySelector('audio');
    audio.addEventListener('play', () => {
      set(this, 'paused', false); 
    });
    audio.addEventListener('pause', () => {
      set(this, 'paused', true)
    });
  }

  @action
  playMusic() {
    let audio = document.querySelector('audio');
    if (this.paused == false) {
      audio.pause();
      //set(this, 'paused', true);
    } else {
      audio.play();
      //set(this, 'paused', false);
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
