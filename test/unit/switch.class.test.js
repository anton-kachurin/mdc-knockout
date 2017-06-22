import {assert} from 'chai';
import {SwitchViewModel} from '../../src/mdc-knockout-switch';

function setupTestVM (params = {}, attrs = {}) {
  const vm = new SwitchViewModel(null, params, attrs);
  return vm;
}

const vm = setupTestVM();

suite('switch class');

test('"label" property exists', () => {
  assert.property(vm, 'label');
});

test('"label" has a default value of ""', () => {
  assert.equal(vm.label, "");
});

test('"disable" binding is set automatically when not provided', () => {
  assert.property(vm.bindings, 'disable');
});

test('"disable" binding default value equals attrs.disabled value', () => {
  const vm = setupTestVM({}, {disabled: true});
  assert.equal(vm.bindings.disable, true);
});

test('"checked" binding is set automatically when not provided', () => {
  assert.property(vm.bindings, 'checked');
});

test('"checked" binding default value equals attrs.checked value', () => {
  const vm = setupTestVM({}, {checked: true});
  assert.equal(vm.bindings.checked, true);
});

test('attrs.id is set automatically when not provided', () => {
  assert.isOk(vm.attrs.id.length);
});

test('attrs.id is preserved when provided', () => {
  const vm = setupTestVM({}, {id: 'some_id'})
  assert.equal(vm.attrs.id, 'some_id');
});
