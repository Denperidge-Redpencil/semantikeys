import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {tracked as Tracked} from 'tracked-built-ins';
import { set } from '@ember/object';

export default class MenuServiceService extends Service {
  @tracked _music = '';
  _keys = Tracked([
    {
      name: 'maxi',
      owned: false,
    },
    {
      name: 'frostbite',
      owned: false,
    },
    {
      name: 'acid',
      owned: false,
    },
    {
      name: 'smoky',
      owned: false,
    },
  ]);

  get keys() {
    return this._keys;
  }

  get music() {
    return '/audio/music/' + this._music + '.mp3';
  }

  set music(val) {
    this._music = val.split('.')[0];
  }

  /*
  get keys() {
    let keyExport = []

    Object.keys(this._keys).forEach((key) => {
      keyExport['key.' + key] = _keys[key];
    });
    return keyExport;

  }
  */
 getKey(name) {
  let key = this.keys.find((key) => key.name == name)
  set(key, 'owned', true);

 }
}
