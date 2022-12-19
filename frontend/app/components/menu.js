import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class AudioComponent extends Component {
    @tracked currentSong = "audio/music/Douglas Holmquist - The Emerald Electric.mp3";
    @tracked pauseOrPlay = 'Play';

    @action
    playMusic() {
        let audio = document.querySelector('audio')
        if (this.pauseOrPlay == 'Pause') {
            audio.pause();
            this.pauseOrPlay = 'Play';
        } else {
            audio.play();
            this.pauseOrPlay = 'Pause'
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
}
