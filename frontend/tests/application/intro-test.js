import {
  click,
  currentURL,
  fillIn,
  waitFor,
  visit,
  currentRouteName,
  waitUntil,
  pauseTest,
  resumeTest
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
    
    //await cont('thirteen.pt4');
    /*
    await click(testSelector('continue'));
    await pauseTest();
    assert.equal(currentRouteName(), 'thirteen.pt4', `pt3 -> pt4`);
    */

    /*
    waitUntil(() => {
      return assert.dom('#cont').hasStyle('display', 'initial')
    }, 10000);
    click('h3');
    assert.equal(currentRouteName(), 'thirteen.pt5', 'Clicking at the right time lets thirteen.pt4 navigate to thirteen.pt5')
    */
   //await cont('thirteen.pt5')

    


  });
});
