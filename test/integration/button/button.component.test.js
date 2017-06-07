import {assert} from 'chai';
import bel from 'bel';
import {componentTest} from './helpers/component.js';
import augment from '../../src/mdc-knockout-augment';
import {ButtonTemplate, ButtonViewModel} from '../../src/mdc-knockout-button';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-button', ButtonTemplate(), ButtonViewModel);

function initComponent () {
  const component = bel`
    <div>
      <mdc-button></mdc-button>
      <mdc-button href></mdc-button>
    </div>
  `;
  ko.applyBindings({}, component);
  return component;
}

suite('button component');

test('native button is used by default', (done) => {
  const component = bel`<mdc-button></mdc-button>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const element = component.querySelector('button.mdc-button');
    assert.isOk(element);

    done();
  });
});

test('native anchor is used when "href" attribute is present', (done) => {
  const component = bel`<mdc-button href></mdc-button>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const element = component.querySelector('a.mdc-button');
    assert.isOk(element);

    done();
  });
});

test('native anchor is used when "href" param is present', (done) => {
  const component = bel`<mdc-button params="href: '/'"></mdc-button>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const element = component.querySelector('a.mdc-button');
    assert.isOk(element);

    done();
  });
});

test('inner html may contain anything', (done) => {
  const component = bel`
    <div>
      <mdc-button>text</mdc-button>
      <mdc-button><span>span</span></mdc-button>
      <mdc-button href>text</mdc-button>
      <mdc-button href><span>span</span></mdc-button>
    </div>
  `;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const element1 = component.querySelector('mdc-button:nth-child(1)');
    const element2 = component.querySelector('mdc-button:nth-child(2)');
    const element3 = component.querySelector('mdc-button:nth-child(3)');
    const element4 = component.querySelector('mdc-button:nth-child(4)');
    assert.include(element1.textContent, 'text');
    assert.include(element2.textContent, 'span');
    assert.include(element3.textContent, 'text');
    assert.include(element4.textContent, 'span');

    done();
  });
});

componentTest(initComponent(), 'has an attached ripple effect', (component) => {
  const element1 = component.querySelector('mdc-button:first-child button');
  const element2 = component.querySelector('mdc-button:last-child a');

  assert.property(element1, 'MDCRipple');
  assert.property(element2, 'MDCRipple');
});
