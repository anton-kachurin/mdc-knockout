import {assert} from 'chai';
import bel from 'bel';
import augment from '../../../src/mdc-knockout-augment.js';
import {FABTemplate, FABViewModel} from '../../../src/mdc-knockout-fab';
import {componentTest} from '../../helpers/component.js';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-fab', FABTemplate(), FABViewModel);

function initComponent () {
  const component = bel`<mdc-fab></mdc-fab>`;
  ko.applyBindings({}, component);
  return component;
}

suite('fab component');

test('fab is disabled when "disabled" attribute present', (done) => {
  const component = bel`<mdc-fab disabled></mdc-fab>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const button = component.querySelector('button');
    assert.isOk(button.disabled);

    done();
  });
});

test('fab is enabled when no "disabled" attribute present', (done) => {
  const component = bel`<mdc-fab></mdc-fab>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const button = component.querySelector('button');
    assert.isNotOk(button.disabled);

    done();
  });
});

test('"disable" plain param controls disabled state', (done) => {
  const component = bel`<mdc-fab params="disable: true"></mdc-fab>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const button = component.querySelector('button');
    assert.isOk(button.disabled);

    done();
  });
});

test('"disable" observable param controls disabled state', (done) => {
  const component = bel`<mdc-fab params="disable: isDisabled"></mdc-fab>`;
  const isDisabled = ko.observable(false);
  ko.applyBindings({isDisabled: isDisabled}, component);

  setTimeout(() => {
    const button = component.querySelector('button');
    assert.isNotOk(button.disabled);

    isDisabled(true);
    assert.isOk(button.disabled);

    done();
  });
});

test('"icon" plain param sets the icon text', (done) => {
  const component = bel`<mdc-fab params="icon: 'fab icon'"></mdc-fab>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const icon = component.querySelector('span');
    assert.equal(icon.textContent, 'fab icon');

    done();
  });
});

test('"icon" observable param sets the icon text', (done) => {
  const component = bel`<mdc-fab params="icon: iconText"></mdc-fab>`;
  const iconText = ko.observable('a');
  ko.applyBindings({iconText: iconText}, component);

  setTimeout(() => {
    const icon = component.querySelector('span');
    assert.equal(icon.textContent, 'a');

    iconText('b');
    assert.equal(icon.textContent, 'b');

    done();
  });
});

test('text node in inner html is treated as icon text', (done) => {
  const component = bel`<mdc-fab>inner</mdc-fab>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const icon = component.querySelector('span');
    assert.equal(icon.textContent, 'inner');

    done();
  });
});

test('not a text node in inner html is ignored', (done) => {
  const component = bel`<mdc-fab><span>will be ignored</span></mdc-fab>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const icon = component.querySelector('span');
    assert.equal(icon.textContent, '');

    done();
  });
});

test('empty text nodes in inner html are ignored', (done) => {
  const emptyTextNode = document.createTextNode(' ');
  const component = bel`<mdc-fab></mdc-fab>`;
  component.appendChild(emptyTextNode);
  ko.applyBindings({}, component);

  setTimeout(() => {
    const icon = component.querySelector('span');
    assert.equal(icon.textContent, '');

    done();
  });
});

test('icon as param has higher priority than icon as inner html', (done) => {
  const component = bel`<mdc-fab params="icon: 'as param'">as inner</mdc-fab>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const icon = component.querySelector('span');
    assert.equal(icon.textContent, 'as param');

    done();
  });
});

componentTest(initComponent(), 'has an attached ripple effect', (component) => {
  const element = component.querySelector('button');
  assert.property(element, 'MDCRipple');
});
