import {assert} from 'chai';
import bel from 'bel';
import td from 'testdouble';
import augment from '../../../src/mdc-knockout-augment';
import {FormFieldTemplate, FormFieldViewModel} from '../../../src/mdc-knockout-form-field';
import {MDCFormField} from '@material/form-field';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-form-field', FormFieldTemplate(), FormFieldViewModel, MDCFormField);

suite('form-field component');

test('"alignEnd" param can be observable, non-observable, or not set at all', (done) => {
  const component = bel`
    <div>
      <mdc-form-field></mdc-form-field>
      <mdc-form-field params="alignEnd: false"></mdc-form-field>
      <mdc-form-field params="alignEnd: true"></mdc-form-field>
      <mdc-form-field params="alignEnd: alignEnd"></mdc-form-field>
    </div>
  `;
  const alignEnd = ko.observable(true);
  ko.applyBindings({alignEnd: alignEnd}, component);

  setTimeout(() => {
    const ff1 = component.querySelector(':nth-child(1) > div');
    const ff2 = component.querySelector(':nth-child(2) > div');
    const ff3 = component.querySelector(':nth-child(3) > div');
    const ff4 = component.querySelector(':nth-child(4) > div');

    assert.equal(ff1.className, ff2.className);
    assert.equal(ff3.className, ff4.className);

    alignEnd(false);

    assert.equal(ff1.className, ff4.className);
    assert.notEqual(ff3.className, ff4.className);

    done();
  });
});

test('"label" plain param sets the label text', (done) => {
  const component = bel`<mdc-form-field params="label: 'form-field label'"></mdc-form-field>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, 'form-field label');

    done();
  });
});

test('"label" observable param sets the label text', (done) => {
  const component = bel`<mdc-form-field params="label: labelText"></mdc-form-field>`;
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
  const component = bel`<mdc-form-field>inner</mdc-form-field>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, 'inner');

    done();
  });
});

test('not a text node in inner html is not treated as label text', (done) => {
  const component = bel`<mdc-form-field><span>will be ignored</span></mdc-form-field>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, '');

    done();
  });
});

test('label as param has higher priority than label as inner html', (done) => {
  const component = bel`<mdc-form-field params="label: 'as param'">as inner</mdc-form-field>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, 'as param');

    done();
  });
});

test('can contain child elements', (done) => {
  const inner = bel`<span>inner</span>`;
  const component = bel`<mdc-form-field>${inner}</mdc-form-field>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    assert.strictEqual(component.children[0].children[0], inner);
    done();
  });
});

test('child elements can set "for" attribute value by using "attrFor" method if it is not set', (done) => {
  const onInitialization = td.function();
  class TestViewModel {
    constructor (root) {
      this.root = root;

      this.instance = null;
      this.MDCComponent = {attachTo: () => {}};
    }

    initialize (parent) {
      onInitialization(parent);
      parent.attrFor('custom_for');
    }
  }
  augment.registerComponent(ko, 'mdc-inner', '<span data-bind="mdc-instance"></span>', TestViewModel);

  const component = bel`<mdc-form-field><mdc-inner></mdc-inner></mdc-form-field>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector(':first-child label');

    td.verify(onInitialization(td.matchers.argThat(
      obj => obj && obj.root && obj.root.tagName === 'MDC-FORM-FIELD' && obj.attrFor
    )));
    assert.equal(label.attributes['for'].value, 'custom_for');

    ko.components.unregister('mdc-inner');
    done();
  });
});

test('child elements cannot set "for" attribute value by using "attrFor" method if it is already set', (done) => {
  const onInitialization = td.function();
  class TestViewModel {
    constructor (root) {
      this.root = root;

      this.instance = null;
      this.MDCComponent = {attachTo: () => {}};
    }

    initialize (parent) {
      onInitialization(parent);
      parent.attrFor('custom_for');
    }
  }
  augment.registerComponent(ko, 'mdc-inner', '<span data-bind="mdc-instance"></span>', TestViewModel);

  const component = bel`<mdc-form-field for="preset_for"><mdc-inner></mdc-inner></mdc-form-field>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector(':last-child label');

    td.verify(onInitialization(td.matchers.argThat(
      obj => obj && obj.root && obj.root.tagName === 'MDC-FORM-FIELD' && obj.attrFor
    )));
    assert.equal(label.attributes['for'].value, 'preset_for');

    ko.components.unregister('mdc-inner');
    done();
  });
});
