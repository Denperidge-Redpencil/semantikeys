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
  find
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

module('Acceptance | intro', function (hooks) {
  setupApplicationTest(hooks);


  test('Landing page navigates to every thirteen part, and then to navigation', async function (assert) {
    
    await visit('/');
    await cont('thirteen.pt1')
    await cont('thirteen.pt2')

    await click('a:last-child');
    assert.equal(currentRouteName(), 'thirteen.pt3', 'The third button in thirteen.pt2 navigates to thirteen.pt3')
    

    await cont('thirteen.pt4')
    await cont('thirteen.pt5')
    //await click(testSelector('continue'));

    //await click()
    /*
    await waitUntil(function() {
      click('#cont')
      return find('#cont');//.style.display != 'none';
    }, {timeout: 10000});
    */

    //await cont('thirteen.pt5');
    
    /*
    click(testSelector('continue'));
    waitUntil(function() {
      return find('#cont');//.style.display != 'none';
    }, {timeout: 10000});
    assert.equal(currentRouteName(), 'thirteen.pt4', 'pt4')

    */


  });
});
