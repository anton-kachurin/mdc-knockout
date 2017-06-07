import {assert} from 'chai';
import {ElevationViewModel} from '../../src/mdc-knockout-elevation';
import td from 'testdouble';
import ko from 'knockout';

function HTMLElementMock (properties = {}) {
  const element = {
    classList: {
      add: () => {},
      remove: () => {}
    }
  };

  Object.assign(element, properties);

  return element;
}

function setupTestVM (root = HTMLElementMock(), params = {}, attrs = {}) {
  const vm = new ElevationViewModel(root, params, attrs);
  return vm;
}

const vm = setupTestVM();

suite('elevation class');

test('"z" property exists', () => {
  assert.property(vm, 'z');
});

test('"z" has a default value of 0', () => {
  assert.equal(vm.z, 0);
});

test('"mdc-elevation--z*" class added to root element according to "z" value', () => {
  const add = td.function();
  const vm = setupTestVM(HTMLElementMock({classList: {add: add}}), {z: 5});
  td.verify(add('mdc-elevation--z5'));
});

test('"mdc-elevation--z*" updates when observable "z" changes', () => {
  const add = td.function();
  const remove = td.function();
  const z = ko.observable(1);
  const vm = setupTestVM(HTMLElementMock({classList: {add: add, remove: remove}}), {z: z});
  td.verify(add('mdc-elevation--z1'));

  z(2);
  td.verify(remove('mdc-elevation--z1'));
  td.verify(add('mdc-elevation--z2'));

  z(3);
  td.verify(remove('mdc-elevation--z2'));
  td.verify(add('mdc-elevation--z3'));
});

test('when "z" property is observable, add "mdc-elevation-transition" class to root element', () => {
  const add = td.function();
  const z = ko.observable(1);
  const vm = setupTestVM(HTMLElementMock({classList: {add: add}}), {z: z});
  td.verify(add('mdc-elevation-transition'));
});
