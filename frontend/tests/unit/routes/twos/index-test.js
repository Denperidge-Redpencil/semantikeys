import { module, test } from 'qunit';
import { setupTest } from 'frontend/tests/helpers';

function testRng(rngFunc, testFunc) {
  
}

module('Unit | Route | twos/index', function (hooks) {
  setupTest(hooks);

  test('rng', function(assert) {
    let twos = this.owner.lookup('route:twos.index');
    assert.generatedValuesBetween = function(func, min, max, testIterationcount, message) {
      // Min max inclusive!
      let result = true;
      let results = [];
      for (let i = 0; i < testIterationcount; i++) {
        let generatedValue = func();
        results.push(generatedValue);
        if (generatedValue < min || generatedValue > max) {
          result = false;
        }
      }

      this.pushResult({
        result: result,
        actual: func.toString(),
        expected: `${min} < ${results.join('|')} < ${max}`,
        message: `${message} (${min} < ${results.join('|')} < ${max})`
      });
    }

    assert.generatedValuesBetween(() => {return twos.rng(0, 50)}, 0, 50, 100, 'rng generates whole numbers between two numbers');
    assert.generatedValuesBetween(() => {return twos.rng(0, 50, 2)}, 0, 50, 100, 'rng generates decimal numbers between two numbers');

  });

});
