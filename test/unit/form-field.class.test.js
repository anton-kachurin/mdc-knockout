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
