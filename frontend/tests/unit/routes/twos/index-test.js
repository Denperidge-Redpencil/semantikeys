import { module, test } from 'qunit';
import { setupTest } from 'frontend/tests/helpers';

function testRng(context, rngFunc, testFunc, testIterationcount, expected, message) {
  // Min max inclusive!
  let result = true;
  let results = [];
  for (let i = 0; i < testIterationcount; i++) {
    let generatedValue = rngFunc();
    results.push(generatedValue);
    if (testFunc(generatedValue)) {
      result = false;
      results = generatedValue;
      break;
    }
  }

  expected = expected.replace("{0}", results.join(' | '));

  context.pushResult({
    result: result,
    actual: rngFunc.toString(),
    expected: expected,
    message: `${message} ${expected}`
  });
}

module('Unit | Route | twos/index', function (hooks) {
  setupTest(hooks);

  test('rng', function(assert) {
    let twos = this.owner.lookup('route:twos.index');
    assert.generatedValuesBetween = function(min, max, decimals=this.false, testIterationcount, message) {
      let func;
      if (!decimals) {
        func = () => {return twos.rng(min, max) };
      }
      else {
        func = () => {return twos.rng(min, max, decimals) };
      }
      testRng(this, func, (value) => {return value < min || max < value;}, testIterationcount, `${min} < {0} < ${max}`, message);
    }
    /*
    assert.correctDecimalAmount = function(func, min, max, testIterationcount) {

    }
    */

    assert.generatedValuesBetween(0, 50, false, 100, 'rng generates whole numbers between two numbers');
    assert.generatedValuesBetween(0, 50, 2, 100, 'rng generates decimal numbers between two numbers');

  });

});
