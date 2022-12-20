import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MenuServiceService extends Service {
  @tracked _music = '';

  get music() {
    return '/audio/music/' + this._music + '.mp3';
  }

  set music(val) {
    this._music = val.split('.')[0];
  }
}
