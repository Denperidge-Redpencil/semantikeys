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
