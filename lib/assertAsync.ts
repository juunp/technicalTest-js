import assert = require('assert'); 

export async function assertThrowsAsync(fn, regExp) {
  let func = () => {};
  try {
    await fn();
  } catch(e) {
    func = () => {throw e};
  } finally {
    assert.throws(func, regExp);
  }
}

export async function spyAsync(fn) {    
  let func = () => {};
    try {
        await fn();
    } catch(e) {
        func = () => {throw e};
    } finally {
        assert(fn.calledOnce);
    }
}