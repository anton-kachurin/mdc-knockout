import {assert} from 'chai';
import bel from 'bel';
import augment from '../../src/mdc-knockout-augment.js';
import {ButtonTemplate, ButtonViewModel} from '../../src/mdc-knockout-button';
import {componentTest} from './helpers/component.js';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-button', ButtonTemplate(), ButtonViewModel);

function initComponent (isLink, modifier) {
  const hrefStr = isLink ? 'href' : '';
  const component = bel`
    <mdc-button ${hrefStr}></mdc-button>
  `;
  if (modifier) {
    component.setAttribute('params', modifier + ': true');
  }
  ko.applyBindings({}, component);

  return component;
}

suite('button template');

function getStructureTest (tagName) {
  return (component) => {
    assert.equal(component.children.length, 1);
    assert.equal(component.children[0].tagName, tagName);
  }
}

componentTest(initComponent(false), 'renders properly (button element)', getStructureTest('BUTTON'));
componentTest(initComponent(true), 'renders properly (anchor element)', getStructureTest('A'));

const classTestCallback = (component) => {
  assert.isOk(component.children[0].classList.contains('mdc-button'));
};

componentTest(initComponent(false), 'has proper class name (button element)', classTestCallback);
componentTest(initComponent(true), 'has proper class name (anchor element)', classTestCallback);

function modifierTest (modifier) {
  const test = (component) => {
    assert.isOk(component.children[0].classList.contains('mdc-button--' + modifier))
  };
  componentTest(initComponent(false, modifier), `sets "${modifier}" modifier (button element)`, test);
  componentTest(initComponent(true, modifier), `sets "${modifier}" modifier (anchor element)`, test);
}

modifierTest('dense');
modifierTest('raised');
modifierTest('compact');
modifierTest('primary');
modifierTest('accent');
