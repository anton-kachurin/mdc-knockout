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

test('"icon" property exists', () => {
  assert.property(vm, 'icon');
});

test('"icon" has a default value of ""', () => {
  assert.equal(vm.icon, "");
});

test('nodeFilter method exists', () => {
  assert.property(vm, 'nodeFilter');
});

test('nodeFilter method return value is false', () => {
  assert.isNotOk(vm.nodeFilter({}));
});

test('nodeFilter updates "icon" property if it is empty', () => {
  const vm = setupTestVM();
  assert.equal(vm.icon, '');

  vm.nodeFilter({
    nodeType: 3,
    textContent: 'icon'
  });
  assert.equal(vm.icon, 'icon');
});

test('nodeFilter does not update "icon" property if its parameter is not a text node', () => {
  const vm = setupTestVM();
  assert.equal(vm.icon, '');

  vm.nodeFilter({
    nodeType: 1,
    textContent: 'icon'
  });
  assert.equal(vm.icon, '');
});

test('nodeFilter does not update "icon" property if child node has only whitespaces', () => {
  const vm = setupTestVM();
  assert.equal(vm.icon, '');

  vm.nodeFilter({
    nodeType: 3,
    textContent: ' '
  });
  assert.equal(vm.icon, '');
});
