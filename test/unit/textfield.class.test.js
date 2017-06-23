import {assert} from 'chai';
import {TextfieldViewModel} from '../../src/mdc-knockout-textfield';
import bel from 'bel';
import ko from 'knockout';

function setupTestVM (element = null, params = {}, attrs = {}) {
  const vm = new TextfieldViewModel(element, params, attrs);
  return vm;
}

const vm = setupTestVM();

suite('textfield class');

test('"label" property exists', () => {
  assert.property(vm, 'label');
});

test('"label" has a default value of ""', () => {
  assert.equal(vm.label, "");
});

test('"invalid" property exists', () => {
  assert.property(vm, 'invalid');
});

test('"invalid" has a default value of false', () => {
  assert.equal(vm.invalid, false);
});

test('"invalid" is unwrapped', () => {
  const invalid = ko.observable('invalidStub');
  const vm = setupTestVM(null, {invalid: invalid});
  assert.equal(vm.invalid, 'invalidStub');
});

test('"multiline" property exists', () => {
  assert.property(vm, 'multiline');
});

test('"multiline" has a default value of false', () => {
  assert.equal(vm.multiline, false);
});

test('"multiline" is unwrapped', () => {
  const multiline = ko.observable('multilineStub');
  const vm = setupTestVM(null, {multiline: multiline});
  assert.equal(vm.multiline, 'multilineStub');
});

test('"fullwidth" property exists', () => {
  assert.property(vm, 'fullwidth');
});

test('"fullwidth" has a default value of false', () => {
  assert.equal(vm.fullwidth, false);
});

test('"fullwidth" is unwrapped', () => {
  const fullwidth = ko.observable('fullwidthStub');
  const vm = setupTestVM(null, {fullwidth: fullwidth});
  assert.equal(vm.fullwidth, 'fullwidthStub');
});

test('"disable" binding is set automatically when not provided', () => {
  assert.property(vm.bindings, 'disable');
});

test('"disable" binding default value equals attrs.disabled value', () => {
  const vm = setupTestVM(null, {}, {disabled: true});
  assert.equal(vm.bindings.disable, true);
});

test('attrs.id is set automatically when not provided', () => {
  assert.isOk(vm.attrs.id.length);
});

test('attrs.id is preserved when provided', () => {
  const vm = setupTestVM(null, {}, {id: 'some_id'})
  assert.equal(vm.attrs.id, 'some_id');
});

test('attrs["aria-controls"] is set', () => {
  assert.isOk(vm.attrs['aria-controls'].length);
});

test('attrs["aria-label"] and attrs["placeholder"] are assigned "label" value when "fullwidth" is true', () => {
  const vm = setupTestVM(null, {fullwidth: true, label: 'label'});
  assert.equal(vm.attrs['aria-label'], 'label');
  assert.equal(vm.attrs['placeholder'], 'label');
});

test('attrs["aria-label"] and attrs["placeholder"] are not set when "fullwidth" is false', () => {
  const vm = setupTestVM(null, {fullwidth: false, label: 'label'});
  assert.notProperty(vm.attrs, 'aria-label');
  assert.notProperty(vm.attrs, 'placeholder');
});

test('fullwidth textfields receive attributes on initialization if label is set via inner html', () => {
  const vm1 = setupTestVM(null, {fullwidth: true});
  const input = bel`<input />`;
  const label1 = bel`<label>label text</label>`;
  vm1.root = bel`<div>${input}${label1}<div>`;
  vm1.initialize();
  assert.equal(input.getAttribute('aria-label'), 'label text');
  assert.equal(input.getAttribute('placeholder'), 'label text');

  const vm2 = setupTestVM(null, {fullwidth: true});
  const textarea = bel`<textarea></textarea>`;
  const label2 = bel`<label>label text</label>`;
  vm2.root = bel`<div>${textarea}${label2}<div>`;
  vm2.initialize();
  assert.equal(textarea.getAttribute('aria-label'), 'label text');
  assert.equal(textarea.getAttribute('placeholder'), 'label text');
});

test('regular textfields do not receive attributes on initialization if label is set via inner html', () => {
  const vm = setupTestVM(null, {});
  const input = bel`<input />`;
  const label = bel`<label>label text</label>`;
  vm.root = bel`<div>${input}${label}<div>`;
  vm.initialize();
  assert.isNotOk(input.getAttribute('aria-label'));
  assert.isNotOk(input.getAttribute('placeholder'));
});

test('"childrenTransform" method exists', () => {
  assert.property(vm, 'childrenTransform');
});

test('"childrenTransform" ignores not <p> nodes', () => {
  const p = bel`<p></p>`;
  const span = bel`<span></span>`;
  const result = vm.childrenTransform([p, span]);
  assert.deepEqual(result, [p]);
});

test('"childrenTransform" adds "aria-hidden" attribute to nodes', () => {
  const p = bel`<p></p>`;
  vm.childrenTransform([p]);
  assert.isOk(p.getAttribute('aria-hidden'));
});

test('"childrenTransform" adds "id" attribute which equals to attrs["aria-controls"] of the vm', () => {
  const p = bel`<p></p>`;
  vm.childrenTransform([p]);
  assert.equal(p.getAttribute('id'), vm.attrs['aria-controls']);
});
