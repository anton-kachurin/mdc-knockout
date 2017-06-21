import {assert} from 'chai';
import bel from 'bel';
import augment from '../../../src/mdc-knockout-augment.js';
import {FABTemplate, FABViewModel} from '../../../src/mdc-knockout-fab';
import {componentTest} from '../../helpers/component.js';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-fab', FABTemplate(), FABViewModel);

function initComponent (modifier) {
  const component = bel`<mdc-fab>favorite</mdc-fab>`;
  if (modifier) {
    component.setAttribute('params', modifier + ': true');
  }
  ko.applyBindings({}, component);

  return component;
}

suite('fab template');

componentTest(initComponent(), 'has proper structure', (component) => {
  assert.equal(component.children.length, 1);
  assert.equal(component.children[0].tagName, 'BUTTON');

  assert.equal(component.children[0].children.length, 1);
  assert.equal(component.children[0].children[0].tagName, 'SPAN');
});

componentTest(initComponent(), 'has proper classes', (component) => {
  assert.equal(component.children[0].className, 'mdc-fab mdc-ripple-upgraded');
  assert.equal(component.children[0].children[0].className, 'mdc-fab__icon');
});

componentTest(initComponent(), 'sets font css classes properly', (component) => {
  assert.equal(component.children[0].style.fontFamily, 'inherit');
  assert.equal(component.children[0].style.fontSize, 'inherit');
});

componentTest(initComponent('mini'), 'sets proper "mini" modifier', (component) => {
  assert.isOk(component.children[0].classList.contains('mdc-fab--mini'));
});

componentTest(initComponent('plain'), 'sets proper "plain" modifier', (component) => {
  assert.isOk(component.children[0].classList.contains('mdc-fab--plain'));
});
