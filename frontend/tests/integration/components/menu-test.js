import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend/tests/helpers';
import { click, find, render, pauseTest, doubleClick, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';
import { testSelector } from 'frontend/tests/helpers/custom-helpers';
import { get, set } from '@ember/object';

function offsetRelativeToContainer(element, container) {
  return element.getBoundingClientRect().left - container.getBoundingClientRect().left;
}

function assertMenuKeysVisible(assert, keys, container, visible, messageAddition) {
  let test;
  let message;
  if (visible) {
    test = offsetRelativeToContainer(keys, container) >= 0;
    message = 'Menu keys are visible ' + messageAddition;
  } else {
    test = offsetRelativeToContainer(keys, container) < 0;
    message = 'Menu keys are not in view ' + messageAddition;
  }
  assert.ok(test, message);
}

async function waitForAudioPaused(audio, paused) {
  return waitUntil(() => {
    return audio.paused == paused;
  }, {timeout: 1500});
}

module('Integration | Component | menu', function (hooks) {
  setupRenderingTest(hooks);

  test('Open & close button works', async function (assert) {
    await render(hbs`<Menu />`);

    let container = document.querySelector('#ember-testing');
    let keys = find('#keys');
    let openMenuButton = find(testSelector('openMenuButton'));

    assertMenuKeysVisible(assert, keys, container, false, 'by default');

    await doubleClick(openMenuButton);
    await waitUntil(() => {
      return offsetRelativeToContainer(keys, container) >= 0;
    }, { timeout: 3000 });

    assertMenuKeysVisible(assert, keys, container, true, 'after double clicking the menu button');
    
    await click(openMenuButton);
    await waitUntil(() => {
      return offsetRelativeToContainer(keys, container) < 0;
    }, { timeout: 3000 });

    assertMenuKeysVisible(assert, keys, container, false, 'after clicking the menu button while it\'s opened');
  });



  test('Keys', async function (assert) {
    await render(hbs`<Menu />`);

    let menuService = this.owner.lookup('service:menu-service');
    let keyId = 'acid';

    let key = menuService.keys.find((key) => key.name == keyId);
    let keyElement = find('#' + keyId);

    assert.notOk(key.owned, `The ${keyId} key is unowned in the service by default.`);
    assert.notOk(keyElement.attributes.draggable, 'Unowned keys aren\'t draggable.')
    assert.notOk(getComputedStyle(keyElement).filter == 'none', 'Unowned keys have css filters applied.');


    await menuService.getKey(keyId);
    await waitUntil(() => {return find('#' + keyId).attributes.draggable != undefined}, {timeout: 3000})
    
    
    assert.ok(key.owned, `getKey succesfully sets key to owned in the service.`);
    assert.ok(find('#' + keyId).attributes.draggable, 'Owned keys are draggable.')
    assert.ok(getComputedStyle(keyElement).filter == 'none', 'Owned keys have no css filters applied.');
  });

  // Audio element testing in ember.js is, to say it nicely: not ideal.
  test('Audio', async function (assert) {
    await render(hbs`<Menu />`);

    let menuService = await this.owner.lookup('service:menu-service');
    let audio = find('audio');
    let audioButton = find(testSelector('audioButton'));
    audio.autoplay = false;
    await audio.pause();

    let audioToPlay = 'navigation';

    let oldSrc = audio.src;
    await set(menuService, 'music', audioToPlay);
    await waitUntil(() => {
      return audio.src != oldSrc;
    }, {
      timeout: 1500,
      timeoutMessage: 'Setting menu-service.music doesn\t change the audio elements\' src property.'
    });
    console.log(audio.src);

    assert.ok(audio.src != oldSrc, 'Setting menu-service.music changes the audio elements\' src property.')
    assert.ok(audio.src.endsWith('.mp3'), 'The newly set src is a .mp3 file.');
    assert.ok(audio.src.includes('/'), 'The newly set src is a path.');

    assert.ok(audio.paused, 'Before clicking play, the audio is paused...')
    assert.dom(testSelector('audioButton')).hasText(/play/i, '... and the audio button says play');
    await click(audioButton);

    assert.notOk(audio.paused, 'After clicking play, the audio is played...')
    assert.dom(testSelector('audioButton')).hasText(/pause/i, '... and the audio button says pause');

    await audio.pause();
    await waitForAudioPaused(audio, true);

    assert.dom(testSelector('audioButton')).hasText(/play/i, 'If the audio gets paused without clicking the button, the button still changes to say \'play\'.');
  });
  
  /*
  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Menu />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Menu>
        template block text
      </Menu>
    `);

    assert.dom(this.element).hasText('template block text');
  });
  */
});

