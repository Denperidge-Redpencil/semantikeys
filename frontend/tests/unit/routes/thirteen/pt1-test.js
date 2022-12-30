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
import { module, test } from 'qunit';
import { setupTest } from 'frontend/tests/helpers';
import { testSelector } from 'frontend/tests/helpers/custom-helpers';

module('Unit | Route | thirteen/pt1', function (hooks) {
  setupTest(hooks);

  //test('Continue becomes visible', function (assert) {
    //assert.dom(testSelector('continue')).hasStyle({opacity: 1});
/*
     waitUntil(() => {
      return find(testSelector('continue')).style.opacity == 1;
    }, { timeout: 10000 });
    */
    
  //});
});
