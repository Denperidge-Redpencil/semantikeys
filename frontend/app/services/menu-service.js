import Service from '@ember/service';

export default class MenuServiceService extends Service {
    _music = '';

    get music() {
        return 'audio/music/' + this._music + '.mp3';
    }

    set music(val) {
        this._music = val;
    }
}
