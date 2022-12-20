import Route from '@ember/routing/route';
import { action } from '@ember/object';

import { Terminal } from 'xterm';

export default class CbrpnkPcRoute extends Route {

    model() {
        return {
            boot: this.boot
        };
    }

    @action
    boot() {
        let term = new Terminal();
        
        term.open(document.getElementById("screen"));
    }
}
