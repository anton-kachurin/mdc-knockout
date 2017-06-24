import {assert} from 'chai';
import augment from '../../src/mdc-knockout-augment';

import {koMock} from '../helpers/knockout';

const ko = koMock();
augment.registerBindings(ko);

function expectBindings () {
  return [
    'mdc-initialize',
    'mdc-children', 'mdc-children-transform', 'mdc-children-filter',
    'mdc-bindings', 'mdc-container-bindings',
    'mdc-attrs', 'mdc-container-attrs',
    'mdc-ripple',
  ];
}

function allowedVirtual (name) {
  assert.isOk(ko.virtualElements.allowedBindings[name]);
}

suite('augment bindings');

test('registerBindings sets a complete list of bindings', () => {
  const handlers = ko.bindingHandlers;
  const bindings = expectBindings();

  bindings.forEach(binding => {
    if (handlers[binding]) {
      delete handlers[binding];
    }
    else {
      handlers[binding] = 'is missing';
    }
  });

  assert.deepEqual(handlers, {});
});


test('mdc-initialize binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-initialize');
});

test('mdc-children binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-children');
});

test('mdc-children-transform binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-children-transform');
});

test('mdc-children-filter binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-children-filter');
});

test('mdc-container-bindings binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-container-bindings');
});

test('mdc-container-attrs binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-container-attrs');
});
