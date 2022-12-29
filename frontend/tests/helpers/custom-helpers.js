export function testSelector(name, psuedoClass = '') {
    let selector = `[data-test-rr="${name}"]`;
    if (psuedoClass != '') {
      selector += `${psuedoClass}`;
    }
    return selector;
  }
  
export async function dataTestSteps(...args) {
    for (let i = 0; i < args.length; i += 2) {
      let func = args[i];
      let target = args[i + 1];
      let selector;
      if (target.startsWith('[')) {
        selector = target;
      } else {
        selector = testSelector(target);
      }
  
      // If no additional parameter
      if (typeof args[i + 2] === 'function') {
        await func(selector);
      }
      // If additional parameter
      else {
        await func(selector, args[i + 2]);
        i++; // Skip the additional parameter next step
      }
    }
  }