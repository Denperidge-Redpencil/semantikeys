import {
  click,
  currentURL,
  fillIn,
  waitFor,
  visit,
  currentRouteName,
  waitUntil,
  pauseTest,
  resumeTest,
  settled,
  find,
  triggerEvent
} from '@ember/test-helpers';
import {} from '@ember/test';
import { setupApplicationTest } from 'ember-qunit';
import { assert, module, test } from 'qunit';
import { testSelector } from 'frontend/tests/helpers/custom-helpers';

async function cont(dest) {
  let from = currentRouteName();
  await click(testSelector('continue'));
  assert.equal(currentRouteName(), dest, `${from} navigates to ${dest}`);
}

async function checkMusicChangeAfterRouteChange(assert, menuService, dest) {
  let musicBeforeNavigating = menuService.music;
  await visit(dest);
  let musicAfterNavigating = menuService.music;
  assert.ok(musicBeforeNavigating != musicAfterNavigating, `Music changed from ${musicBeforeNavigating} to ${musicAfterNavigating} after visiting ${dest}`);
}

module('Acceptance | intro', function (hooks) {
  setupApplicationTest(hooks);

  test('Music adapts to the current route', async function(assert) {
    let menuService = await this.owner.lookup('service:menu-service');

    await checkMusicChangeAfterRouteChange(assert, menuService, '/');
    await checkMusicChangeAfterRouteChange(assert, menuService, '/navigation');
  });


  test('Landing page navigates to thirteen.pt*, awards the smoky key, and then navigates to navigation', async function (assert) {
    
    await visit('/');
    await cont('thirteen.pt1')
    await cont('thirteen.pt2')

    await click('a:last-child');
    assert.equal(currentRouteName(), 'thirteen.pt3', 'The third button in thirteen.pt2 navigates to thirteen.pt3')
    

    await cont('thirteen.pt4')
    await cont('thirteen.pt5')

    await triggerEvent(testSelector('key'), 'drag');
    await triggerEvent(testSelector('lock'), 'drop');
    assert.equal(currentRouteName(), 'thirteen.pt6', 'Dragging the key onto the lock in thirteen.pt5 navigates to thirteen.pt6');

    assert.ok(find('#smoky').className.includes('owned'), 'The smoky key is now owned.');

    await cont('navigation');

  });
});
