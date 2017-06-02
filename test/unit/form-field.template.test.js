import {assert} from 'chai';
import bel from 'bel';
import augment from '../../src/mdc-knockout-augment.js';
import {FormFieldTemplate, FormFieldViewModel} from '../../src/mdc-knockout-form-field';
import {componentTest} from './helpers/component.js';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-form-field', FormFieldTemplate(), FormFieldViewModel);

function initComponent (alignEnd) {
  const component = bel`<mdc-form-field params="alignEnd: alignEnd"></mdc-form-field>`;
  ko.applyBindings({alignEnd: alignEnd}, component);

  return component;
}

suite('form-field template');

componentTest(initComponent(false), 'has all elements', (component) => {
  assert.equal(component.children.length, 1);
  assert.equal(component.children[0].tagName, 'DIV');

  assert.equal(component.children[0].children.length, 1);
  assert.equal(component.children[0].children[0].tagName, 'LABEL');
});

componentTest(initComponent(false), 'has proper classes', (component) => {
  assert.equal(component.children[0].className, 'mdc-form-field');
});

componentTest(initComponent(true), 'sets "align-end" modifier properly', (component) => {
  assert.isOk(component.children[0].classList.contains('mdc-form-field--align-end'));
});
