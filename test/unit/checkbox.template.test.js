import {assert} from 'chai';
import bel from 'bel';
import augment from '../../src/mdc-knockout-augment.js';
import {CheckboxTemplate, CheckboxViewModel} from '../../src/mdc-knockout-checkbox';
import {componentTest} from './helpers/component.js';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-checkbox', CheckboxTemplate(), CheckboxViewModel);

function initComponent (isDisabled) {
  const component = bel`<mdc-checkbox params="disable: isDisabled"></mdc-checkbox>`;
  ko.applyBindings({isDisabled: isDisabled}, component);

  return component;
}

suite('checkbox template');

componentTest(initComponent(false), 'has all elements', (component) => {
  assert.equal(component.children.length, 1);
  assert.equal(component.children[0].tagName, 'DIV');

  assert.equal(component.children[0].children.length, 2);
  assert.equal(component.children[0].children[0].tagName, 'INPUT');
  assert.equal(component.children[0].children[1].tagName, 'DIV');

  assert.equal(component.children[0].children[1].children.length, 2);
  assert.equal(component.children[0].children[1].children[0].tagName.toUpperCase(), 'SVG');
  assert.equal(component.children[0].children[1].children[1].tagName, 'DIV');

  assert.equal(component.children[0].children[1].children[0].children.length, 1);
  assert.equal(component.children[0].children[1].children[0].children[0].tagName.toUpperCase(), 'PATH');
});

componentTest(initComponent(false), 'has proper classes', (component) => {
  assert.equal(component.children[0].className, 'mdc-checkbox');

  assert.equal(component.children[0].children[0].className, 'mdc-checkbox__native-control');
  assert.equal(component.children[0].children[1].className, 'mdc-checkbox__background');

  assert.equal(component.children[0].children[1].children[0].getAttribute('class'), 'mdc-checkbox__checkmark');
  assert.equal(component.children[0].children[1].children[1].className, 'mdc-checkbox__mixedmark');

  assert.equal(component.children[0].children[1].children[0].children[0].getAttribute('class'),
              'mdc-checkbox__checkmark__path');
});

componentTest(initComponent(true), 'sets "disabled" modifier', (component) => {
  assert.isOk(component.children[0].classList.contains('mdc-checkbox--disabled'));
});
