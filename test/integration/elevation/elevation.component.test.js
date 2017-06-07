import {assert} from 'chai';
import bel from 'bel';
import augment from '../../src/mdc-knockout-augment';
import {ElevationTemplate, ElevationViewModel} from '../../src/mdc-knockout-elevation';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-elevation', ElevationTemplate(), ElevationViewModel);

suite('elevation component');

test('sets "z" == 0 by default', (done) => {
  const component = bel`<mdc-elevation></mdc-elevation>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    assert.isOk(component.classList.contains('mdc-elevation--z0'));

    done();
  });
});

test('"z" plain param sets proper modifier', (done) => {
  const component = bel`<mdc-elevation params="z: 1"></mdc-elevation>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    assert.isOk(component.classList.contains('mdc-elevation--z1'));

    done();
  });
});

test('"z" observable param sets proper modifiers', (done) => {
  const component = bel`<mdc-elevation params="z: z"></mdc-elevation>`;
  const z = ko.observable(1);
  ko.applyBindings({z: z}, component);

  setTimeout(() => {
    assert.isOk(component.classList.contains('mdc-elevation-transition'));
    assert.isOk(component.classList.contains('mdc-elevation--z1'));

    z(2);

    assert.isNotOk(component.classList.contains('mdc-elevation--z1'));
    assert.isOk(component.classList.contains('mdc-elevation--z2'));

    done();
  });
});

test('allows to use "css" binding', (done) => {
  const component = bel`
    <div>
      <mdc-elevation params="css: 'some-class1'"></mdc-elevation>
      <mdc-elevation params="z: 1, css: 'some-class2'"></mdc-elevation>
      <mdc-elevation params="z: z, css: 'some-class3'"></mdc-elevation>
    </div>
  `;
  const z = ko.observable(2);
  ko.applyBindings({z: z}, component);

  setTimeout(() => {
    const el1 = component.children[0];
    const el2 = component.children[1];
    const el3 = component.children[2];
    assert.isOk(el1.classList.contains('mdc-elevation--z0'));
    assert.isOk(el1.classList.contains('some-class1'));
    assert.isOk(el2.classList.contains('mdc-elevation--z1'));
    assert.isOk(el2.classList.contains('some-class2'));
    assert.isOk(el3.classList.contains('mdc-elevation--z2'));
    assert.isOk(el3.classList.contains('some-class3'));

    done();
  });
});

test('does not alter inner HTML', (done) => {
  const inner = bel`<span>text</span>`;
  const component = bel`<mdc-elevation>${inner}</mdc-elevation>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    assert.equal(component.children.length, 1);
    assert.strictEqual(component.children[0], inner);

    done();
  });
});
