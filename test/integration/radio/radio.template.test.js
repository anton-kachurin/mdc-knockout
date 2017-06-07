import {assert} from 'chai';
import bel from 'bel';
import augment from '../../src/mdc-knockout-augment.js';
import {RadioTemplate, RadioViewModel} from '../../src/mdc-knockout-radio';
import {componentTest} from './helpers/component.js';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-radio', RadioTemplate(), RadioViewModel);

function initComponent (isDisabled) {
  const component = bel`<mdc-radio params="disable: isDisabled"></mdc-radio>`;
  ko.applyBindings({isDisabled: isDisabled}, component);

  return component;
}

suite('radio template');

componentTest(initComponent(false), 'has all elements', (component) => {
  assert.equal(component.children.length, 1);
  assert.equal(component.children[0].tagName, 'DIV');

  assert.equal(component.children[0].children.length, 2);
  assert.equal(component.children[0].children[0].tagName, 'INPUT');
  assert.equal(component.children[0].children[1].tagName, 'DIV');

  assert.equal(component.children[0].children[1].children.length, 2);
  assert.equal(component.children[0].children[1].children[0].tagName, 'DIV');
  assert.equal(component.children[0].children[1].children[1].tagName, 'DIV');
});

componentTest(initComponent(false), 'has proper classes', (component) => {
  assert.equal(component.children[0].className, 'mdc-radio');

  assert.equal(component.children[0].children[0].className, 'mdc-radio__native-control');
  assert.equal(component.children[0].children[1].className, 'mdc-radio__background');

  assert.equal(component.children[0].children[1].children[0].className, 'mdc-radio__outer-circle');
  assert.equal(component.children[0].children[1].children[1].className, 'mdc-radio__inner-circle');
});

componentTest(initComponent(true), 'sets "disabled" modifier', (component) => {
  assert.isOk(component.children[0].classList.contains('mdc-radio--disabled'));
});
