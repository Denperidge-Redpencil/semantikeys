import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend/tests/helpers';
import { click, find, render, pauseTest, doubleClick, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { testSelector } from 'frontend/tests/helpers/custom-helpers';

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

module('Integration | Component | menu', function (hooks) {
  setupRenderingTest(hooks);

  test('Menu open & close button works', async function (assert) {
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
