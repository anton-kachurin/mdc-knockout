import {assert} from 'chai';
import bel from 'bel';
import augment from '../../../src/mdc-knockout-augment.js';
import {TextfieldTemplate, TextfieldViewModel} from '../../../src/mdc-knockout-textfield';
import {MDCTextfield} from '@material/textfield';
import {componentTest} from '../../helpers/component.js';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-textfield', TextfieldTemplate(), TextfieldViewModel, MDCTextfield);

function initPlain (invalid, box) {
  const component = bel`<mdc-textfield params="invalid: invalid, box: box"></mdc-textfield>`;
  ko.applyBindings({invalid: invalid, box: box}, component);

  return component;
}

function initPlainHelptext (invalid, persistent, validation, box) {
  const p = bel`<p>help</p>`;
  const component = bel`
    <mdc-textfield params="invalid: invalid, box: box">
      ${p}
    </mdc-textfield>
  `;

  if (persistent) {
    p.setAttribute('persistent', true);
  }

  if (validation) {
    p.setAttribute('validation', true);
  }

  ko.applyBindings({invalid: invalid, persistent: persistent, validation: validation, box: box}, component);

  return component;
}

function initFullwidth (invalid) {
  const component = bel`<mdc-textfield params="fullwidth: true, invalid: invalid"></mdc-textfield>`;
  ko.applyBindings({invalid: invalid}, component);

  return component;
}

function initMultiline (invalid) {
  const component = bel`<mdc-textfield params="multiline: true, invalid: invalid"></mdc-textfield>`;
  ko.applyBindings({invalid: invalid}, component);

  return component;
}

suite('textfield template');

componentTest(initPlain(), 'plain component has proper structure', (component) => {
  assert.equal(component.children.length, 1);
  assert.equal(component.children[0].tagName, 'DIV');

  assert.equal(component.children[0].children.length, 2);
  assert.equal(component.children[0].children[0].tagName, 'INPUT');
  assert.equal(component.children[0].children[1].tagName, 'LABEL');
});

componentTest(initPlain(), 'plain component has proper classes', (component) => {
  assert.equal(component.children[0].className, 'mdc-textfield mdc-textfield--upgraded');

  assert.equal(component.children[0].children[0].className, 'mdc-textfield__input');
  assert.equal(component.children[0].children[1].className, 'mdc-textfield__label');
});

componentTest(initPlain(true), 'plain component sets "invalid" modifier', (component) => {
  assert.equal(component.children[0].className, 'mdc-textfield mdc-textfield--invalid mdc-textfield--upgraded');
});

componentTest(initPlain(false, true), 'plain component sets "box" modifier', (component) => {
  assert.equal(component.children[0].className,
               'mdc-textfield mdc-textfield--box mdc-textfield--upgraded mdc-ripple-upgraded');
});

componentTest(initPlainHelptext(), 'plain with helptext component has proper structure', (component) => {
  assert.equal(component.children.length, 2);
  assert.equal(component.children[0].tagName, 'DIV');
  assert.equal(component.children[1].tagName, 'P');
  assert.equal(component.children[1].getAttribute('aria-hidden'), 'true');

  assert.equal(component.children[0].children.length, 2);
  assert.equal(component.children[0].children[0].tagName, 'INPUT');
  assert.equal(component.children[0].children[1].tagName, 'LABEL');
});

componentTest(initPlainHelptext(), 'plain with helptext component has proper classes', (component) => {
  assert.equal(component.children[0].className, 'mdc-textfield mdc-textfield--upgraded');
  assert.equal(component.children[1].className, 'mdc-textfield-helptext');

  assert.equal(component.children[0].children[0].className, 'mdc-textfield__input');
  assert.equal(component.children[0].children[1].className, 'mdc-textfield__label');
});

componentTest(initPlainHelptext(false, true), 'plain with helptext sets "persistent" modifier', (component) => {
  assert.equal(component.children[1].className, 'mdc-textfield-helptext mdc-textfield-helptext--persistent');
});

componentTest(initPlainHelptext(false, false, true), 'plain with helptext sets "validation" modifier', (component) => {
  assert.equal(component.children[1].className, 'mdc-textfield-helptext mdc-textfield-helptext--validation-msg');
});

componentTest(initPlainHelptext(true), 'plain with helptext sets "invalid" modifier', (component) => {
  assert.equal(component.children[0].className, 'mdc-textfield mdc-textfield--invalid mdc-textfield--upgraded');
});

componentTest(initPlainHelptext(false, false, false, true), 'plain with helptext sets "box" modifier', (component) => {
  assert.equal(component.children[0].className,
               'mdc-textfield mdc-textfield--box mdc-textfield--upgraded mdc-ripple-upgraded');
});

componentTest(initFullwidth(), 'fullwidth component has proper structure', (component) => {
  assert.equal(component.children.length, 1);
  assert.equal(component.children[0].tagName, 'DIV');

  assert.equal(component.children[0].children.length, 2);
  assert.equal(component.children[0].children[0].tagName, 'INPUT');
  assert.equal(component.children[0].children[1].tagName, 'LABEL');

  assert.isOk(component.children[0].children[0].hasAttribute('placeholder'));
  assert.isOk(component.children[0].children[0].hasAttribute('aria-label'));

  assert.equal(component.children[0].children[1].style.display, 'none');
});

componentTest(initFullwidth(), 'fullwidth component has proper classes', (component) => {
  assert.equal(component.children[0].className, 'mdc-textfield mdc-textfield--fullwidth mdc-textfield--upgraded');

  assert.equal(component.children[0].children[0].className, 'mdc-textfield__input');
});

componentTest(initFullwidth(true), 'fullwidth component sets "invalid" modifier', (component) => {
  assert.equal(component.children[0].className,
               'mdc-textfield mdc-textfield--fullwidth mdc-textfield--invalid mdc-textfield--upgraded');
});

componentTest(initMultiline(), 'multiline component has proper structure', (component) => {
  assert.equal(component.children.length, 1);
  assert.equal(component.children[0].tagName, 'DIV');

  assert.equal(component.children[0].children.length, 2);
  assert.equal(component.children[0].children[0].tagName, 'TEXTAREA');
  assert.equal(component.children[0].children[1].tagName, 'LABEL');
});

componentTest(initMultiline(), 'multiline component has proper classes', (component) => {
  assert.equal(component.children[0].className, 'mdc-textfield mdc-textfield--multiline mdc-textfield--upgraded');

  assert.equal(component.children[0].children[0].className, 'mdc-textfield__input');
  assert.equal(component.children[0].children[1].className, 'mdc-textfield__label');
});

componentTest(initMultiline(true), 'multiline component sets "invalid" modifier', (component) => {
  assert.equal(component.children[0].className,
               'mdc-textfield mdc-textfield--multiline mdc-textfield--invalid mdc-textfield--upgraded');
});
