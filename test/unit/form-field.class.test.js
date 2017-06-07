import {assert} from 'chai';
import {FormFieldViewModel} from '../../src/mdc-knockout-form-field';
import bel from 'bel';

function setupTestVM (element = null, params = {}, attrs = {}) {
  const vm = new FormFieldViewModel(element, params, attrs);
  return vm;
}

const vm = setupTestVM();

suite('form-field class');

test('"label" property exists', () => {
  assert.property(vm, 'label');
});

test('"label" has a default value of ""', () => {
  assert.equal(vm.label, "");
});

test('"alignEnd" property exists', () => {
  assert.property(vm, 'alignEnd');
});

test('"alignEnd" has a default value of false', () => {
  assert.equal(vm.alignEnd, false);
});

test('nodeFilter method exists', () => {
  assert.property(vm, 'nodeFilter');
});

test('nodeFilter method return value is true by default', () => {
  assert.isOk(vm.nodeFilter({}));
});

test('nodeFilter method return value is false if its parameter is a text node', () => {
  assert.isNotOk(vm.nodeFilter({
    nodeType: 3,
    textContent: ''
  }));
});

test('nodeFilter updates "label" property if it is empty', () => {
  const vm = setupTestVM();
  assert.equal(vm.label, '');

  vm.nodeFilter({
    nodeType: 3,
    textContent: 'label'
  });
  assert.equal(vm.label, 'label');
});

test('nodeFilter does not update "label" property if it is already set', () => {
  const vm = setupTestVM(null, {label: 'label1'});
  assert.equal(vm.label, 'label1');

  vm.nodeFilter({
    nodeType: 3,
    textContent: 'label2'
  });
  assert.equal(vm.label, 'label1');
});

test('nodeFilter does not update "label" property if its parameter is not a text node', () => {
  const vm = setupTestVM();
  assert.equal(vm.label, '');

  vm.nodeFilter({
    nodeType: 1,
    textContent: 'label'
  });
  assert.equal(vm.label, '');
});

test('nodeFilter does not update "label" property if child node has only whitespaces', () => {
  const vm = setupTestVM();
  assert.equal(vm.label, '');

  vm.nodeFilter({
    nodeType: 3,
    textContent: ' '
  });
  assert.equal(vm.label, '');
});

test('attrFor method exists', () => {
  assert.property(vm, 'attrFor');
});

test('attrFor updates attrs.for if it is empty', () => {
  const labelElement = bel`<label></label>`;
  const rootElement = bel`<div>${labelElement}</div>`;
  const vm = setupTestVM(rootElement);
  vm.attrFor('for');
  assert.equal(labelElement.getAttribute('for'), 'for');
});

test('attrFor does not update attrs.for if it is already set', () => {
  const labelElement = bel`<label for="for1"></label>`;
  const rootElement = bel`<div>${labelElement}</div>`;
  const vm = setupTestVM(rootElement, {}, {for: 'for1'});
  vm.attrFor('for2');
  assert.equal(labelElement.getAttribute('for'), 'for1');
});
