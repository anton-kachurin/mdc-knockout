import {assert} from 'chai';
import bel from 'bel';
import domEvents from 'dom-events';
import augment from '../../src/mdc-knockout-augment';
import {CheckboxTemplate, CheckboxViewModel} from '../../src/mdc-knockout-checkbox';
import {MDCCheckbox, MDCCheckboxFoundation} from '@material/checkbox';

import ko from 'knockout';
global.ko = ko;
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-checkbox', CheckboxTemplate(), CheckboxViewModel, MDCCheckbox, MDCCheckboxFoundation);

suite('checkbox component');

test('checkbox is checked when "checked" attribute present', (done) => {
  const component = bel`<mdc-checkbox checked></mdc-checkbox>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.checked);

    done();
  });
});

test('checkbox is unchecked when no "checked" attribute present', (done) => {
  const component = bel`<mdc-checkbox></mdc-checkbox>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isNotOk(input.checked);

    done();
  });
});

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

test('checkbox is disabled when "disabled" attribute present', (done) => {
  const component = bel`<mdc-checkbox disabled></mdc-checkbox>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.disabled);

    done();
  });
});

test('checkbox is enabled when no "disabled" attribute present', (done) => {
  const component = bel`<mdc-checkbox></mdc-checkbox>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isNotOk(input.disabled);

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

test('changing "checked" of the native element updates "indeterminate" observable', (done) => {
  const component = bel`<mdc-checkbox params="indeterminate: isIndeterminate"></mdc-checkbox>`;
  const isIndeterminate = ko.observable(true);
  ko.applyBindings({isIndeterminate: isIndeterminate}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(isIndeterminate());

    input.checked = false;
    assert.isNotOk(isIndeterminate());

    done();
  });
});

test('changing "checked" of the MDCCheckbox updates "indeterminate" observable', (done) => {
  const component = bel`<mdc-checkbox params="indeterminate: isIndeterminate"></mdc-checkbox>`;
  const isIndeterminate = ko.observable(true);
  ko.applyBindings({isIndeterminate: isIndeterminate}, component);

  setTimeout(() => {
    const mdcCheckbox = component.MDCCheckbox;
    assert.isOk(isIndeterminate());

    mdcCheckbox.checked = false;
    assert.isNotOk(isIndeterminate());

    done();
  });
});

test('changing "indeterminate" of the native element updates corresponding observable', (done) => {
  const component = bel`<mdc-checkbox params="indeterminate: isIndeterminate"></mdc-checkbox>`;
  const isIndeterminate = ko.observable(true);
  ko.applyBindings({isIndeterminate: isIndeterminate}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(isIndeterminate());

    input.indeterminate = false;
    assert.isNotOk(isIndeterminate());

    done();
  });
});

test('changing "indeterminate" of the MDCCheckbox updates corresponding observable', (done) => {
  const component = bel`<mdc-checkbox params="indeterminate: isIndeterminate"></mdc-checkbox>`;
  const isIndeterminate = ko.observable(true);
  ko.applyBindings({isIndeterminate: isIndeterminate}, component);

  setTimeout(() => {
    const mdcCheckbox = component.MDCCheckbox;
    assert.isOk(isIndeterminate());

    mdcCheckbox.indeterminate = false;
    assert.isNotOk(isIndeterminate());

    done();
  });
});

test('"indeterminate" observable is updating when it is the only given parameter', (done) => {
  const component = bel`<mdc-checkbox params="indeterminate: isIndeterminate"></mdc-checkbox>`;
  const isIndeterminate = ko.observable(true);
  ko.applyBindings({isIndeterminate: isIndeterminate}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(isIndeterminate());

    domEvents.emit(input, 'click');
    assert.isNotOk(isIndeterminate());

    done();
  });
});

test('can use an observable array with "checked" binding', (done) => {
  const component = bel`
    <div>
      <mdc-checkbox id="c1" value="val1" params="checked: checkedItems"></mdc-checkbox>
      <mdc-checkbox id="c2" value="val2" params="checked: checkedItems"></mdc-checkbox>
    </div>
  `;
  const checkedItems = ko.observableArray();
  ko.applyBindings({checkedItems: checkedItems}, component);

  setTimeout(() => {
    const c1 = component.querySelector('#c1');
    const c2 = component.querySelector('#c2');
    assert.deepEqual(checkedItems(), []);

    domEvents.emit(c1, 'click');
    assert.deepEqual(checkedItems(), ['val1']);

    domEvents.emit(c2, 'click');
    assert.deepEqual(checkedItems(), ['val1', 'val2']);

    domEvents.emit(c1, 'click');
    assert.deepEqual(checkedItems(), ['val2']);

    done();
  });
});

test('can use checkedValue binding', (done) => {
  const component = bel`<mdc-checkbox params="checked: isChecked, checkedValue: val"></mdc-checkbox>`;
  const isChecked = ko.observableArray();
  const val = {some: 'value'};
  ko.applyBindings({isChecked: isChecked, val: val}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.deepEqual(isChecked(), []);

    domEvents.emit(input, 'click');
    assert.deepEqual(isChecked(), [{some: 'value'}]);

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
