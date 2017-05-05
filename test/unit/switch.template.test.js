import {assert} from 'chai';
import bel from 'bel';
import augment from '../../src/mdc-knockout-augment.js';
import {SwitchTemplate, SwitchViewModel} from '../../src/mdc-knockout-switch';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-switch', SwitchTemplate(), SwitchViewModel);

function getComponent (isDisabled) {
  const component = bel`<mdc-switch params="disable: isDisabled"></mdc-switch>`;
  ko.applyBindings({isDisabled: isDisabled}, component);

  return component;
}

suite('switch template');

test('has all elements', (done) => {
  const component = getComponent(false);

  setTimeout(() => {
    assert.equal(component.children.length, 2);
    assert.equal(component.children[0].tagName, 'DIV');
    assert.equal(component.children[1].tagName, 'LABEL');

    assert.equal(component.children[0].children.length, 2);
    assert.equal(component.children[0].children[0].tagName, 'INPUT');
    assert.equal(component.children[0].children[1].tagName, 'DIV');

    assert.equal(component.children[0].children[1].children.length, 1);
    assert.equal(component.children[0].children[1].children[0].tagName, 'DIV');

    done();
  });
});

test('has proper classes', (done) => {
  const component = getComponent(false);

  setTimeout(() => {
    assert.equal(component.children[0].className, 'mdc-switch');
    assert.equal(component.children[1].className, 'mdc-switch-label');

    assert.equal(component.children[0].children[0].className, 'mdc-switch__native-control');
    assert.equal(component.children[0].children[1].className, 'mdc-switch__background');

    assert.equal(component.children[0].children[1].children[0].className, 'mdc-switch__knob');

    done();
  });
});

test('sets proper modifiers', (done) => {
  const component = getComponent(true);

  setTimeout(() => {
    assert.isOk(component.children[0].classList.contains('mdc-switch--disabled'));

    done();
  });
});
