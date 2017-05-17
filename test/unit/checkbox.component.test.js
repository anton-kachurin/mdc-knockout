import {assert} from 'chai';
import bel from 'bel';
import augment from '../../src/mdc-knockout-augment';
import {CheckboxTemplate, CheckboxViewModel} from '../../src/mdc-knockout-checkbox';
import {MDCCheckbox, MDCCheckboxFoundation} from '@material/checkbox';

import ko from 'knockout';
global.ko = ko;
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-checkbox', CheckboxTemplate(), CheckboxViewModel, MDCCheckbox, MDCCheckboxFoundation);

suite('checkbox component');

test('"checked" plain param controls the state of the checkbox', (done) => {
  const component = bel`<mdc-checkbox params="checked: true"></mdc-checkbox>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.checked);

    done();
  });
});

test('"checked" observable param controls the state of the checkbox', (done) => {
  const component = bel`<mdc-checkbox params="checked: isOn"></mdc-checkbox>`;
  const isOn = ko.observable(false);
  ko.applyBindings({isOn: isOn}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isNotOk(input.checked);

    isOn(true);
    assert.isOk(input.checked);

    done();
  });
});

test('"disable" plain param controls disabled state', (done) => {
  const component = bel`<mdc-checkbox params="disable: true"></mdc-checkbox>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.disabled);

    done();
  });
});

test('"disable" observable param controls disabled state', (done) => {
  const component = bel`<mdc-checkbox params="disable: isDisabled"></mdc-checkbox>`;
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

test('"indeterminate" plain param sets the indeterminate state', (done) => {
  const component = bel`<mdc-checkbox params="indeterminate: true"></mdc-checkbox>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.indeterminate);

    done();
  });
});

test('"indeterminate" observable param sets the indeterminate state', (done) => {
  const component = bel`<mdc-checkbox params="indeterminate: isIndeterminate"></mdc-checkbox>`;
  const isIndeterminate = ko.observable(false);
  ko.applyBindings({isIndeterminate: isIndeterminate}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isNotOk(input.indeterminate);

    isIndeterminate(true);
    assert.isOk(input.indeterminate);

    done();
  });
});

test('changing "checked" sets "indeterminate" to false, but not vice versa', (done) => {
  const component = bel`<mdc-checkbox params="indeterminate: isIndeterminate,
                                              checked: isChecked"></mdc-checkbox>`;
  const isIndeterminate = ko.observable(true);
  const isChecked = ko.observable(false);
  ko.applyBindings({isIndeterminate: isIndeterminate, isChecked: isChecked}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.indeterminate);

    isChecked(true);
    assert.isOk(input.checked);
    assert.isNotOk(input.indeterminate);
    assert.isNotOk(isIndeterminate());

    isIndeterminate(true);
    assert.isOk(input.checked);
    assert.isOk(input.indeterminate);
    assert.isOk(isIndeterminate());

    isChecked(false);
    assert.isNotOk(input.checked);
    assert.isNotOk(input.indeterminate);
    assert.isNotOk(isIndeterminate());

    done();
  });
});

test('if no id was set to the component, it is generated automatically', (done) => {
  const component = bel`<mdc-checkbox></mdc-checkbox>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.id.length);

    done();
  });
});
