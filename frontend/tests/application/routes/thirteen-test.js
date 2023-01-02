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

  test('pt3', async function (assert) {
    await visitRoute(this, 'thirteen.pt3');

    let dimensions = ['left', 'top', 'right', 'bottom'];
    let correctSteps = dimensions.map((dimension) => dimension = `${dimension} in bounds: `);
    for (let i = 4; i >= 1; i--) {
      correctSteps.splice(i, 0, 'true');
    }
    /* correctSteps =
        [
          "left in bounds: ",
          true,
          "top in bounds: ",
          true,
          "right in bounds: ",
          true,
          "bottom in bounds: ",
          true
        ]
    */

    let svgRect = find('svg').getBoundingClientRect();
    let continueRect = find(testSelector('continue')).getBoundingClientRect();


    dimensions.forEach((dimension) => {
      assert.step(`${dimension} in bounds: `)
      assert.step(`${svgRect[dimension] < continueRect[dimension]}`)
    });

    

    assert.verifySteps(correctSteps, 'The continue button is within the SVG\'s box.');
  });

  test('pt4', async function (assert) {
    await visitRoute(this, 'thirteen.pt4');

    await waitUntil(() => {
      return currentRouteName() == 'thirteen.pt3';
    },
    { 
      timeout: 10000,
      timeoutMessage: 'thirteen.pt4 auto-redirect without clicking isn\' working as expected.'
    });
    assert.ok(currentRouteName() == 'thirteen.pt3', 'Without interaction, pt4 automatically redirects to pt3');
    
    await visitRoute(this, 'thirteen.pt4');
    let clickTarget = find('#cont');
    await waitUntil(() => {
      return getComputedStyle(clickTarget).display != 'none';
    },
    {
      timeout: 10000,
      timeoutMessage: 'The clickable target stays on display: none.'
    });
    await click(clickTarget);
    assert.ok(currentRouteName() == 'thirteen.pt5', 'After clicking on the target, pt4 navigates to pt5');
  });

  test('pt5', async function (assert) {
    await visitRoute(this, 'thirteen.pt5');
    let key = find(testSelector('key'));
    let lock = find(testSelector('lock'));

    assert.equal(currentRouteName(), 'thirteen.pt5', 'Before dragging anything, the current route is pt5');

    await lock.dispatchEvent(new DragEvent('drag', {}));
    await key.dispatchEvent(new DragEvent('drop', {}));
    assert.equal(currentRouteName(), 'thirteen.pt5', 'After dragging the lock onto the key, the current route remained pt5');

    await lock.dispatchEvent(new DragEvent('drag', {}));
    await lock.dispatchEvent(new DragEvent('drop', {}));
    assert.equal(currentRouteName(), 'thirteen.pt5', 'After dragging the lock onto the lock, the current route remained pt5');

    await key.dispatchEvent(new DragEvent('drag', {}));
    await lock.dispatchEvent(new DragEvent('drop', {}));

    assert.equal(currentRouteName(), 'thirteen.pt6', 'After dragging the key onto the lock, the current route chanegd to pt6')
  });
});
