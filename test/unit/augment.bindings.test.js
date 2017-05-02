import {assert} from 'chai';
import bel from 'bel';
import augment from '../../src/mdc-knockout-augment';
import {PlainViewModel} from '../../src/mdc-knockout-base';

import {koMock} from './helpers/knockout';

import ko from 'knockout';
augment.registerBindings(ko);

function expectBindings () {
  return [
    'mdc-bindings', 'mdc-attrs', 'mdc-parent-bindings', 'mdc-parent-attrs',
    'mdc-child', 'mdc-ripple', 'mdc-css', 'mdc-attr', 'mdc-instance'
  ];
}

function allowedVirtual (name) {
  assert.isOk(ko.virtualElements.allowedBindings[name]);
}

suite('augment bindings');

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

test('mdc-bindings applies given bindings to the node', () => {
  const element = bel`<div data-bind="mdc-bindings: bindings"></div>`;
  assert.equal(element.textContent, '');

  const textContent = ko.observable('text content');

  ko.applyBindings({bindings: {text: textContent}}, element);
  assert.equal(element.textContent, 'text content');

  textContent('changed content');
  assert.equal(element.textContent, 'changed content');
});

test('mdc-bindings binding provides a default "bindings" value', () => {
  const element = bel`<div data-bind="mdc-bindings"></div>`;
  assert.equal(element.textContent, '');

  const textContent = ko.observable('text content');

  ko.applyBindings({bindings: {text: textContent}}, element);
  assert.equal(element.textContent, 'text content');
});

test('mdc-parent-bindings applies given bindings to the parent of the node', () => {
  const element = bel`<div data-bind="mdc-parent-bindings: bindings"></div>`;
  const parentElement = bel`<span class="class1">${element}</span>`;
  assert.equal(parentElement.className, 'class1');

  const className = ko.observable('class2');

  ko.applyBindings({bindings: {css: className}}, element);
  assert.equal(parentElement.className, 'class1 class2');

  className('class3');
  assert.equal(parentElement.className, 'class1 class3');
});

test('mdc-parent-bindings binding provides a default "bindings" value', () => {
  const element = bel`<div data-bind="mdc-parent-bindings"></div>`;
  const parentElement = bel`<span class="class1">${element}</span>`;
  assert.equal(parentElement.className, 'class1');

  const className = ko.observable('class2');

  ko.applyBindings({bindings: {css: className}}, element);
  assert.equal(parentElement.className, 'class1 class2');
});

test('mdc-parent-bindings binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-parent-bindings');
});

test('mdc-attrs binding adds given attributes to the node', () => {
  const element = bel`<div data-bind="mdc-attrs: attrs"></div>`;
  assert.equal(element.id, '');

  const id = 'element_id';
  const attr1 = ko.observable('a');

  ko.applyBindings({attrs: {id: id, attr1: attr1}}, element);
  assert.equal(element.id, id);
  assert.equal(element.getAttribute('attr1'), 'a');

  attr1('b');
  assert.equal(element.getAttribute('attr1'), 'b');
});

test('mdc-attrs binding provides a default "attrs" value', () => {
  const element = bel`<div data-bind="mdc-attrs"></div>`;
  assert.equal(element.id, '');

  const id = 'element_id';

  ko.applyBindings({attrs: {id: id}}, element);
  assert.equal(element.id, id);
});

test('mdc-parent-attrs binding adds given attributes to the parent node', () => {
  const element = bel`<div data-bind="mdc-parent-attrs: attrs"></div>`;
  const parentElement = bel`<span>${element}</span>`;

  const id = 'element_id';
  const attr1 = ko.observable('a');

  ko.applyBindings({attrs: {id: id, attr1: attr1}}, element);
  assert.equal(parentElement.id, id);
  assert.equal(parentElement.getAttribute('attr1'), 'a');

  attr1('b');
  assert.equal(parentElement.getAttribute('attr1'), 'b');
});

test('mdc-parent-attrs binding provides a default "attrs" value', () => {
  const element = bel`<div data-bind="mdc-parent-attrs"></div>`;
  const parentElement = bel`<span>${element}</span>`;

  const id = 'element_id';

  ko.applyBindings({attrs: {id: id}}, element);
  assert.equal(parentElement.id, id);
});

test('mdc-parent-attrs binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-parent-attrs');
});
