import {assert} from 'chai';
import td from 'testdouble';
import {RadioViewModel} from '../../src/mdc-knockout-radio';

function setupTestVM (params = {}, attrs = {}) {
  const vm = new RadioViewModel(null, params, attrs);
  return vm;
}

const vm = setupTestVM();

suite('radio class');

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

test('"checked" binding default value is false', () => {
  assert.equal(vm.bindings.checked, false);
});

test('"checked" binding default value equals attrs.value value when attr.checked is set', () => {
  const vm = setupTestVM({}, {checked: true, value: 'value'});
  assert.equal(vm.bindings.checked, 'value');
});

test('attrs.id is set automatically when not provided', () => {
  assert.isOk(vm.attrs.id.length);
});

test('attrs.id is preserved when provided', () => {
  const vm = setupTestVM({}, {id: 'some_id'})
  assert.equal(vm.attrs.id, 'some_id');
});

test('initialize method exists', () => {
  assert.property(vm, 'initialize');
});

test('initialize passes attrs.id into attrFor method of the parent', () => {
  const attrFor = td.function();
  const vm = setupTestVM();
  vm.initialize({attrFor: attrFor});
  td.verify(attrFor(vm.attrs.id));
});

test('initialize assigns "instance" property to parent.instance.input', () => {
  const parent = {
    instance: {
      input: 'input1'
    }
  };
  const vm = setupTestVM();
  vm.instance = 'input2';
  vm.initialize(parent);
  assert(parent.instance.input, 'input2');
});
