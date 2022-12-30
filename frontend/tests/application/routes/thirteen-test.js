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
  triggerEvent,
  findAll
} from '@ember/test-helpers';
import {} from '@ember/test';
import { setupApplicationTest } from 'ember-qunit';
import { assert, module, test } from 'qunit';
import { testSelector } from 'frontend/tests/helpers/custom-helpers';
import { service } from '@ember/service';

function waitUntilVisible(assert, element, message) {
  return waitUntil(() => {
    return assert.dom(element).hasStyle({opacity: "1"}, message); //getComputedStyle(element).opacity == 1;
  }, {
    timeout: 6000
  });
}

async function visitRoute(context, route) {
  let router = context.owner.lookup('service:router');
  return visit(router.urlFor(route));
}

module('Acceptance | thirteen', function (hooks) {
  setupApplicationTest(hooks);


  test('pt1', async function (assert) {
    await visitRoute(this, 'thirteen.pt1');
    
    await waitUntilVisible(assert, find(testSelector('continue')), 'The continue link gets displayed.');
  });

  test('pt2', async function (assert) {
    await visitRoute(this, 'thirteen.pt2');

    let pt3Url = this.owner.lookup('service:router').urlFor('thirteen.pt3');
    let correctOptions = 0;

    let options = findAll(testSelector('option'));
    
    options.forEach((option) => {
      if (option.href.endsWith(pt3Url)) { correctOptions++; }
    });
    
    assert.ok(correctOptions == 1, 'There is only 1 option with the correct href.');
    assert.ok(options.length > correctOptions, 'There are more options than correct ones.');
  });
});
