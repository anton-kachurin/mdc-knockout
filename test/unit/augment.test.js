import {assert} from 'chai';

import augment from '../../src/mdc-knockout-augment';

function koMock () {
  return {
    bindingHandlers: {},
    virtualElements: {
      allowedBindings: []
    },
    components: {
      register: function () {}
    }
  }
}

function expectBindings () {
  return [
    'mdc-bindings', 'mdc-attrs', 'mdc-parent-bindings', 'mdc-parent-attrs',
    'mdc-child', 'mdc-ripple', 'mdc-css', 'mdc-attr', 'mdc-instance'
  ];
}

suite('Augment');

test('augment exports registerBindings and registerComponent', () => {
  assert.equal(typeof augment.registerBindings, 'function');
  assert.equal(typeof augment.registerComponent, 'function');
});

test('registerBindings requires knockout as a parameter', () => {
  const ko = koMock();
  assert.throws(augment.registerBindings);
  assert.throws(() => augment.registerBindings({}));
  assert.doesNotThrow(() => augment.registerBindings(ko));
});

test('registerBindings sets a complete list of bindings', () => {
  const ko = koMock();
  augment.registerBindings(ko);

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

test('registerBindings bounces multiple calls', () => {
  const ko = koMock();
  const handlers = ko.bindingHandlers;

  augment.registerBindings(ko);
  Object.keys(handlers).forEach(binding => handlers[binding] = 1);
  augment.registerBindings(ko);

  const nonOnes = [];
  Object.keys(handlers).forEach(binding => {
    if (handlers[binding] !== 1) {
      nonOnes.push(binding);
    }
  });

  assert.equal(nonOnes.length, 0);
});
