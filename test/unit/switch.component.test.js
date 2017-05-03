import {assert} from 'chai';
import bel from 'bel';
import td from 'testdouble';
import augment from '../../src/mdc-knockout-augment';
import {SwitchTemplate, SwitchViewModel} from '../../src/mdc-knockout-switch';

import ko from 'knockout';
global.ko = ko;
augment.registerComponent(ko, 'mdc-switch', SwitchTemplate(), SwitchViewModel);

suite('switch component');

test('checked plain param controls the state of the switch', (done) => {
  const component = bel`<mdc-switch params="checked: true"></mdc-switch>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.checked);

    done();
  });
});

test('checked observable param controls the state of the switch', (done) => {
  const component = bel`<mdc-switch params="checked: isOn"></mdc-switch>`;
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

test('disable plain param controls disabled state', (done) => {
  const component = bel`<mdc-switch params="disable: true"></mdc-switch>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.disabled);

    done();
  });
});

test('disable observable param controls disabled state', (done) => {
  const component = bel`<mdc-switch params="disable: isDisabled"></mdc-switch>`;
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

test('label plain param sets the label text', (done) => {
  const component = bel`<mdc-switch params="label: 'switch label'"></mdc-switch>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, 'switch label');

    done();
  });
});

test('label observable param sets the label text', (done) => {
  const component = bel`<mdc-switch params="label: labelText"></mdc-switch>`;
  const labelText = ko.observable('a');
  ko.applyBindings({labelText: labelText}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, 'a');

    labelText('b');
    assert.equal(label.textContent, 'b');

    done();
  });
});

test('text node in inner html is treated as label text', (done) => {
  const component = bel`<mdc-switch>inner</mdc-switch>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, 'inner');

    done();
  });
});

test('not a text node in inner html is ignored', (done) => {
  const component = bel`<mdc-switch><span>will be ignored</span></mdc-switch>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, '');

    done();
  });
});

test('label as param has higher priority than label as inner html', (done) => {
  const component = bel`<mdc-switch params="label: 'as param'">as inner</mdc-switch>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, 'as param');

    done();
  });
});

test('label element is assigned the same id as the component', (done) => {
  const component = bel`<mdc-switch id="some_id"></mdc-switch>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.htmlFor, 'some_id');

    done();
  });
});

test('if no id was set to the component, it is generated automatically', (done) => {
  const component = bel`<mdc-switch></mdc-switch>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    const label = component.querySelector('label');
    assert.isOk(input.id.length);
    assert.equal(label.htmlFor, input.id);

    done();
  });
});
