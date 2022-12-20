import Route from '@ember/routing/route';
import { action } from '@ember/object';

import { Terminal } from 'xterm';
import LocalEchoController from 'local-echo';

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
        const localEcho = new LocalEchoController();
        term.loadAddon(localEcho);
        localEcho.read("~$ ")
            .then(input => alert(`User entered: ${input}`))
            .catch(error => alert(`Error reading: ${error}`));
    }
}
