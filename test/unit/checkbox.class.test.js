import {assert} from 'chai';
import td from 'testdouble';
import bel from 'bel';
import {CheckboxViewModel} from '../../src/mdc-knockout-checkbox';
import ko from 'knockout';

function setupTestVM (setElement = false, params = {}, attrs = {}) {
  let element = null;
  if (setElement) {
    element = bel`<span><input></span>`;
  }
  const vm = new CheckboxViewModel(element, params, attrs);
  vm.instance = {};
  return vm;
}

const vm = setupTestVM();

suite('checkbox class');

test('"indeterminate" property exists', () => {
  assert.property(vm, 'indeterminate');
});

test('"indeterminate" has a default value of false', () => {
  assert.equal(vm.indeterminate, false);
});

test('hookedElement property exists', () => {
  const vm = setupTestVM(true);
  assert.property(vm, 'hookedElement');
});

test('hookedElement returns input element', () => {
  const vm = setupTestVM(true);
  assert.equal(vm.hookedElement.tagName, 'INPUT');
});

test('hookedProperties property exists', () => {
  const vm = setupTestVM(true);
  assert.property(vm, 'hookedProperties');
});

test('hookedProperties contains "checked" property', () => {
  const vm = setupTestVM(true);
  assert.property(vm.hookedProperties, 'checked');
});

test('"checked" hook sets "indeterminate" property of hookedElement to false', () => {
  const vm = setupTestVM(true);
  vm.hookedElement.indeterminate = true;
  vm.hookedProperties.checked();
  assert.isNotOk(vm.hookedElement.indeterminate);
});

test('hookedProperties contains "indeterminate" property', () => {
  const vm = setupTestVM(true);
  assert.property(vm.hookedProperties, 'indeterminate');
});

test('"indeterminate" hook updates observable "indeterminate" property of viewModel', () => {
  const indeterminate = ko.observable(false);
  const vm = setupTestVM(true, {indeterminate: indeterminate});
  vm.hookedProperties.indeterminate(true);
  assert.isOk(indeterminate());
});

test('"indeterminate" hook ignores non-observable "indeterminate" property of viewModel', () => {
  const indeterminate = 'stub';
  const vm = setupTestVM(true, {indeterminate: indeterminate});
  vm.hookedProperties.indeterminate(true);
  assert.equal(indeterminate, 'stub');
});

test('"disable" binding is set automatically when not provided', () => {
  assert.property(vm.bindings, 'disable');
});

test('"disable" binding default value equals attrs.disabled value', () => {
  const vm = setupTestVM(false, {}, {disabled: true});
  assert.equal(vm.bindings.disable, true);
});

test('"checked" binding is set automatically when not provided', () => {
  assert.property(vm.bindings, 'checked');
});

test('"checked" binding default value equals attrs.checked value', () => {
  const vm = setupTestVM(false, {}, {checked: true});
  assert.equal(vm.bindings.checked, true);
});

test('attrs.id is set automatically when not provided', () => {
  assert.isOk(vm.attrs.id.length);
});

test('attrs.id is preserved when provided', () => {
  const vm = setupTestVM(false, {}, {id: 'some_id'})
  assert.equal(vm.attrs.id, 'some_id');
});

test('initialize method exists', () => {
  assert.property(vm, 'initialize');
});

test('initialize passes attrs.id into attrFor method of the parent', () => {
  const attrFor = td.function();
  const vm = setupTestVM(true);
  vm.initialize({attrFor: attrFor});
  td.verify(attrFor(vm.attrs.id));
});

test('initialize assigns "instance" property to parent.instance.input', () => {
  const parent = {
    instance: {
      input: 'inputStub'
    }
  };
  const vm = setupTestVM(true);
  vm.initialize(parent);
  assert.equal(parent.instance.input, vm.instance);
});

test('initialize assigns "indeterminate" property to instance.indeterminate', () => {
  const vm = setupTestVM(true, {indeterminate: 'indeterminateStub'});
  vm.initialize({});
  assert.equal(vm.instance.indeterminate, 'indeterminateStub');
});

test('observable "indeterminate" property updates instance.indeterminate', () => {
  const indeterminate = ko.observable('val1');
  const vm = setupTestVM(true, {indeterminate: indeterminate});
  vm.initialize({});
  assert.equal(vm.instance.indeterminate, 'val1');

  indeterminate('val2');
  assert.equal(vm.instance.indeterminate, 'val2');
});
