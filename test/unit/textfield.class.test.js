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

test('"help" property exists', () => {
  assert.property(vm, 'help');
});

test('"help" has a default value of ""', () => {
  assert.equal(vm.help, "");
});

test('"persistent" property exists', () => {
  assert.property(vm, 'persistent');
});

test('"persistent" has a default value of false', () => {
  assert.equal(vm.persistent, false);
});

test('"validation" property exists', () => {
  assert.property(vm, 'validation');
});

test('"validation" has a default value of false', () => {
  assert.equal(vm.validation, false);
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

test('nodeFilter method exists', () => {
  assert.property(vm, 'nodeFilter');
});

test('nodeFilter method return value is false', () => {
  assert.isNotOk(vm.nodeFilter({}));
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


test('nodeFilter updates "label", attrs["aria-label"], attrs["placeholder"] properties' +
     'if "label" is empty and "fullwidth" is true', () => {
  const vm = setupTestVM(null, {fullwidth: true});
  assert.equal(vm.label, '');
  assert.equal(vm.attrs['aria-label'], '');
  assert.equal(vm.attrs['placeholder'], '');

  vm.nodeFilter({
    nodeType: 3,
    textContent: 'label'
  });
  assert.equal(vm.label, 'label');
  assert.equal(vm.attrs['aria-label'], 'label');
  assert.equal(vm.attrs['placeholder'], 'label');
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

test('nodeFilter updates "help" property if it is empty', () => {
  const vm = setupTestVM();
  assert.equal(vm.help, '');

  vm.nodeFilter(bel`<p>help</p>`);
  assert.equal(vm.help, 'help');
});

test('nodeFilter sets "persistent" property to true if there is corresponding attribute on <p> node', () => {
  const vm = setupTestVM();
  assert.equal(vm.persistent, false);

  vm.nodeFilter(bel`<p persistent></p>`);
  assert.equal(vm.persistent, true);
});

test('nodeFilter sets "validation" property to true if there is corresponding attribute on <p> node', () => {
  const vm = setupTestVM();
  assert.equal(vm.validation, false);

  vm.nodeFilter(bel`<p validation></p>`);
  assert.equal(vm.validation, true);
});

test('nodeFilter does not update "help" property if its parameter is not a <p> node', () => {
  const vm = setupTestVM();
  assert.equal(vm.help, '');

  vm.nodeFilter(bel`<a>help</a>`);
  assert.equal(vm.help, '');
});
