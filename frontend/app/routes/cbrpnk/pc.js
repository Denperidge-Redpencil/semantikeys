import Route from '@ember/routing/route';
import { action } from '@ember/object';

import bashEmulator from 'bash-emulator';

import { Terminal } from 'xterm';
import LocalEchoController from 'local-echo';

export default class CbrpnkPcRoute extends Route {
  model() {
    return {
      boot: this.boot,
    };
  }

  @action
  boot(e) {
    e.target.style.display = "none";
    document.getElementById('screen').style.display = 'block';

    
    // START Imported directly from the bash-terminal repo
    var input = document.getElementById('input')
    var output = document.getElementById('output')

    var emulator = bashEmulator({
      workingDirectory: '/',
      fileSystem: {
        '/': {
          type: 'dir',
          modified: Date.now()
        },
        '/README.txt': {
          type: 'file',
          modified: Date.now(),
          content: 'empty'
        },
        '/home': {
          type: 'dir',
          modified: Date.now()
        },
        '/home/user/journal.txt': {
          type: 'file',
          modified: Date.now(),
          content: 'this is private!'
        },
        '/home/user': {
          type: 'dir',
          modified: Date.now()
        }
      }
    })

    emulator.commands.clear = function (env) {
      output.innerHTML = ''
      env.exit()
    }

    var ENTER = 13
    var UP = 38
    var DOWN = 40

    function log (result) {
      if (result) {
        output.innerHTML += result + '\n'
      }
    }

    function error (result) {
      log('<div class="error">' + result + '</div>')
    }

    function run (cmd) {
      log('$ ' + cmd)
      return emulator.run(cmd).then(log, error)
    }

    var completeFunctions = {}
    completeFunctions[UP] = emulator.completeUp
    completeFunctions[DOWN] = emulator.completeDown

    function complete (direction) {
      var completeFunction = completeFunctions[direction]
      if (!completeFunction) {
        return
      }
      var cursorPosition = input.selectionStart
      var beforeCursor = input.value.slice(0, cursorPosition)
      completeFunction(beforeCursor).then(function (completion) {
        if (completion) {
          input.value = completion
          input.setSelectionRange(cursorPosition, cursorPosition)
        }
      })
    }

    input.addEventListener('keydown', function (e) {
      if (e.altKey || e.metaKey || e.shiftKey || e.ctrlKey) {
        return
      }
      if (e.which === UP || e.which === DOWN) {
        e.preventDefault()
        complete(e.which)
      }
    })

    input.addEventListener('keyup', function (e) {
      if (e.which !== ENTER) {
        return
      }
      run(input.value).then(function () {
        input.value = ''
        document.body.scrollTop = 10e6
      })
    })

    document.body.addEventListener('click', function () {
      // Prevent when user is selecting text
      if (!window.getSelection().isCollapsed) {
        return
      }
      input.focus()
    })

    run('pwd').then(function () {
      run('ls')
    })
    // END Imported directly from the bash-terminal repo


    emulator.commands.help = function (env) {
      env.output(Object.keys(emulator.commands).join('\n'));
      env.exit(0);
    }

    /*
    let term = new Terminal();


    term.open(document.getElementById('screen'));
    const localEcho = new LocalEchoController();
    term.loadAddon(localEcho);
    localEcho
      .read('~$ ')
      .then((input) => alert(`User entered: ${input}`))
      .catch((error) => alert(`Error reading: ${error}`));
    */

  }
}
