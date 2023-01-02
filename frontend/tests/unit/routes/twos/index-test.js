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
      results = [generatedValue];
      break;
    }
  }

  expected = expected.replace("{0}", results.join(' | '));

  context.pushResult({
    result: result,
    actual: result,
    expected: true,
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
    
    assert.correctDecimalAmount = function(min, max, numbersBeforeDecimal, testIterationcount, message) {
      testRng(this, () => {return twos.rng(min, max, numbersBeforeDecimal);}, (value) => { return value.toString().split('.')[0].length != numbersBeforeDecimal }, testIterationcount, `The following values all have ${numbersBeforeDecimal} numbers before the .: {0}`, message)
    }
    

    assert.generatedValuesBetween(0, 50, false, 100, 'rng generates whole numbers between two numbers');
    assert.generatedValuesBetween(0, 50, 2, 100, 'rng generates decimal numbers between two numbers');

    assert.correctDecimalAmount(1, 5, 1, 100, 'rng can generate exactly 1 number before the decimal');
    assert.correctDecimalAmount(10, 50, 2, 100, 'rng can generate exactly 2 numbers before the decimal');
    assert.correctDecimalAmount(100, 500, 3, 100, 'rng can generate exactly 3 numbers before the decimal');
    assert.correctDecimalAmount(0, 0, 0, 100, 'rng can generate exactly 0 numbers before the decimal');

  });

});
