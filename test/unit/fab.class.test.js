import {assert} from 'chai';
import {FABViewModel} from '../../src/mdc-knockout-fab';

function setupTestVM (params = {}, attrs = {}) {
  const vm = new FABViewModel(null, params, attrs);
  return vm;
}

const vm = setupTestVM();

suite('fab class');

test('"mini" property exists', () => {
  assert.property(vm, 'mini');
});

test('"mini" has a default value of false', () => {
  assert.equal(vm.mini, false);
});

test('"plain" property exists', () => {
  assert.property(vm, 'plain');
});

test('"plain" has a default value of false', () => {
  assert.equal(vm.plain, false);
});
