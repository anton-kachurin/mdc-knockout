import {assert} from 'chai';
import td from 'testdouble';
import bel from 'bel';
import domEvents from 'dom-events';
import augment from '../../../src/mdc-knockout-augment';
import {RadioTemplate, RadioViewModel} from '../../../src/mdc-knockout-radio';
import {MDCRadio} from '@material/radio';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-radio', RadioTemplate(), RadioViewModel, MDCRadio);

suite('radio component');

test('radio is checked according to "checked" attribute presence', (done) => {
  const component = bel`
  <div>
    <mdc-radio value="val1" checked></mdc-radio>
    <mdc-radio value="val2"></mdc-radio>
  </div>
  `;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input1 = component.querySelector('input[value=val1]');
    const input2 = component.querySelector('input[value=val2]');
    assert.isOk(input1.checked);
    assert.isNotOk(input2.checked);

    done();
  });
});

test('"checked" observable param controls the state of the radio', (done) => {
  const component = bel`
  <div>
    <mdc-radio value="val1" params="checked: radio"></mdc-radio>
    <mdc-radio value="val2" params="checked: radio"></mdc-radio>
  </div>
  `;
  const radio = ko.observable();
  ko.applyBindings({radio: radio}, component);

  setTimeout(() => {
    const input1 = component.querySelector('input[value=val1]');
    const input2 = component.querySelector('input[value=val2]');
    assert.isNotOk(input1.checked);
    assert.isNotOk(input2.checked);

    radio('val1');
    assert.isOk(input1.checked);
    assert.isNotOk(input2.checked);

    radio('val2');
    assert.isNotOk(input1.checked);
    assert.isOk(input2.checked);

    done();
  });
});

test('radio is disabled when "disabled" attribute present', (done) => {
  const component = bel`<mdc-radio disabled></mdc-radio>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.disabled);

    done();
  });
});

test('radio is enabled when no "disabled" attribute present', (done) => {
  const component = bel`<mdc-radio></mdc-radio>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isNotOk(input.disabled);

    done();
  });
});

test('"disable" plain param controls disabled state', (done) => {
  const component = bel`<mdc-radio params="disable: true"></mdc-radio>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.disabled);

    done();
  });
});

test('"disable" observable param controls disabled state', (done) => {
  const component = bel`<mdc-radio params="disable: isDisabled"></mdc-radio>`;
  const isDisabled = ko.observable(false);
  ko.applyBindings({isDisabled: isDisabled}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isNotOk(input.disabled);

    isDisabled(true);
    assert.isOk(input.disabled);

    done();
  });
});

test('can use checkedValue binding', (done) => {
  const component = bel`
  <div>
    <mdc-radio id="r1" params="checked: radio, checkedValue: val1"></mdc-radio>
    <mdc-radio id="r2" params="checked: radio, checkedValue: val2"></mdc-radio>
  </div>
  `;
  const radio = ko.observable();
  const val1 = {some: 'value1'};
  const val2 = {some: 'value2'};
  ko.applyBindings({radio: radio, val1: val1, val2: val2}, component);

  setTimeout(() => {
    const input1 = component.querySelector('#r1');
    const input2 = component.querySelector('#r2');
    assert.isUndefined(radio());

    domEvents.emit(input1, 'click');
    assert.deepEqual(radio(), {some: 'value1'});

    domEvents.emit(input2, 'click');
    assert.deepEqual(radio(), {some: 'value2'});

    done();
  });
});

test('if no id was set to the component, it is generated automatically', (done) => {
  const component = bel`<mdc-radio></mdc-radio>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.id.length);

    done();
  });
});

test('"attrFor" method of the parent is used when available', (done) => {
  const onAttrFor = td.function();
  class TestViewModel {
    constructor (root) {
      this.root = root;

      this.instance = null;
      this.MDCComponent = {attachTo: () => ({})};
    }

    attrFor (value) {
      onAttrFor(value);
    }
  }
  const template = '<span data-bind="mdc-child"></span><span data-bind="mdc-instance"></span>';
  augment.registerComponent(ko, 'mdc-outer', template, TestViewModel);

  const component = bel`<mdc-outer><mdc-radio id="some_id"></mdc-radio></mdc-outer>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    td.verify(onAttrFor('some_id'));

    ko.components.unregister('mdc-outer');
    done();
  });
});
