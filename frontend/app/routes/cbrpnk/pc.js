import Route from '@ember/routing/route';
import { action } from '@ember/object';

import bashEmulator from 'bash-emulator';

function bashEmulatorFs(...args) {
  let fileSystem = {};
  for (let i = 0; i < args.length; i++) {
    let arg = args[i]

    let file = {
      type: arg.name.endsWith('/') ? 'dir' : 'file',
    }
    if (arg.date) {
      //YYYY-MM-DDTHH:mm:ss.sssZ
      file.modified = Date.parse(arg.date + 'T12:00:13.000Z');
    } else {
      file.modified = Date.now();
    }
    if (arg.content) {
      file.content = content
    }

    fileSystem[arg.name] = file;
  }

  return fileSystem;
}

/*
bashEmulatorFs(
  {
    name: '/home/cat/createdat',
    modified: '2022-12-20'
  },
)*/

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

    let writedate1 = Date.parse('2022-12-20T19:32:44.947Z');

    var emulator = bashEmulator({
      workingDirectory: '/',
      fileSystem: {
        // Custom fileSystem: {}
        '/': {
          type: 'dir',
          modified: Date.now()
        },
        '/home': {
          type: 'dir',
          modified: Date.now()
        },
        '/home/john/journal.txt': {
          type: 'file',
          modified: Date.now(),
          content: 'this is private!'
        },
        '/home/john': {
          type: 'dir',
          modified: Date.now()
        },

        '/home/cat': {
          type: 'dir',
          modified: writedate1
        },
        '/home/cat/notes': {
          type: 'dir',
          modified: writedate1
        },
        
        '/home/cat/notes/music.md': {
          type: 'file',
          modified: writedate1,
          content: `
          I want to use some music I like to fuel this project. But you know, actually have them be beneficial to the atmosphere.
          ~~Cyberpunk (stay ugly - crime3s)~~
          ~~laye night illuminati talks~~
          I can't stop me - twice for timed math thing
          ox let's go

          passenger siouxxie

          god is a circle for bossfight?
          `
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

    emulator.commands.login = function(env, args) {
      console.log(args)
      if (args[0] != 'infinitytrain') {
        env.error('Incorrect username.');
        env.exit(1);
      } else if (args[1] != '8tr@!n') {
        env.error('Incorrect password.');
        env.exit(1);

      } else {
        env.output('Logged in.')
        delete emulator.commands.login;
        emulator.commands.printkey = function(env) {
          env.output('Successful print.');
          env.output('Added key to your inventory.')
          env.exit(0);
        }
        env.exit(0);
      }


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
