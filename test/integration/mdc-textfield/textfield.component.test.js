import {assert} from 'chai';
import bel from 'bel';
import domEvents from 'dom-events';
import augment from '../../../src/mdc-knockout-augment';
import {TextfieldTemplate, TextfieldViewModel} from '../../../src/mdc-knockout-textfield';
import {MDCTextfield} from '@material/textfield';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-textfield', TextfieldTemplate(), TextfieldViewModel, MDCTextfield);

suite('textfield component');

test('multiline, fullwidth, and invaid are unwrapped', (done) => {
  const component = bel`
    <mdc-textfield params="
      multiline: multiline,
      fullwidth: fullwidth,
      invalid: invalid
    "></mdc-textfield>`;
  const multiline = ko.observable(true);
  const fullwidth = ko.observable(true);
  const invalid = ko.observable(true);
  ko.applyBindings({multiline: multiline, fullwidth: fullwidth, invalid: invalid}, component);

  setTimeout(() => {
    const wrapper = component.querySelector('.mdc-textfield');
    const initialClasses = wrapper.className;

    multiline(false);
    fullwidth(false);
    invalid(false);

    assert.equal(initialClasses, wrapper.className);

    done();
  });
});

test('textfield with "value" attribute has that value', (done) => {
  const component = bel`<mdc-textfield value="val1"></mdc-textfield>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.equal(input.value, 'val1');

    done();
  });
});

test('"value" binding works', (done) => {
  const component = bel`<mdc-textfield params="value: textfield"></mdc-textfield>`;
  const textfield = ko.observable('');
  ko.applyBindings({textfield: textfield}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.equal(input.value, '');

    textfield('val1');
    assert.equal(input.value, 'val1');

    textfield('val2');
    assert.equal(input.value, 'val2');

    done();
  });
});

test('textfield is disabled when "disabled" attribute present', (done) => {
  const component = bel`<mdc-textfield disabled></mdc-textfield>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.disabled);

    done();
  });
});

test('textfield is enabled when no "disabled" attribute present', (done) => {
  const component = bel`<mdc-textfield></mdc-textfield>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isNotOk(input.disabled);

    done();
  });
});

test('"disable" plain param controls disabled state', (done) => {
  const component = bel`<mdc-textfield params="disable: true"></mdc-textfield>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.disabled);

    done();
  });
});

test('"disable" observable param controls disabled state', (done) => {
  const component = bel`<mdc-textfield params="disable: isDisabled"></mdc-textfield>`;
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

test('"label" plain param sets the label text', (done) => {
  const component = bel`<mdc-textfield params="label: 'text'"></mdc-textfield>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, 'text');

    done();
  });
});

test('"label" observable param sets the label text', (done) => {
  const component = bel`<mdc-textfield params="label: labelText"></mdc-textfield>`;
  const labelText = ko.observable('text1')
  ko.applyBindings({labelText: labelText}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, 'text1');

    labelText('text2');
    assert.equal(label.textContent, 'text2');

    done();
  });
});

test('text node in inner html is treated as label text', (done) => {
  const component = bel`<mdc-textfield>text</mdc-textfield>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, 'text');

    done();
  });
});

test('empty text nodes in inner html are ignored', (done) => {
  const emptyTextNode = document.createTextNode(' ');
  const component = bel`<mdc-textfield></mdc-textfield>`;
  component.appendChild(emptyTextNode);
  ko.applyBindings({}, component);

  setTimeout(() => {
    const label = component.querySelector('label');
    assert.equal(label.textContent, '');

    done();
  });
});

test('fullwidth component renders label as "placeholder" and "aria-label" attributes', (done) => {
  const component = bel`
    <div>
      <mdc-textfield params="fullwidth: true, label: 'text'"></mdc-textfield>
      <mdc-textfield params="fullwidth: true, label: labelText"></mdc-textfield>
      <mdc-textfield params="fullwidth: true">inner</mdc-textfield>
    </div>`;
  const labelText = ko.observable('text1')
  ko.applyBindings({labelText: labelText}, component);

  setTimeout(() => {
    const input1 = component.querySelector('mdc-textfield:nth-child(1) input');
    const input2 = component.querySelector('mdc-textfield:nth-child(2) input');
    const input3 = component.querySelector('mdc-textfield:nth-child(3) input');
    assert.strictEqual(input1.attributes['placeholder'].value, 'text');
    assert.strictEqual(input1.attributes['aria-label'].value, 'text');
    assert.strictEqual(input2.attributes['placeholder'].value, 'text1');
    assert.strictEqual(input2.attributes['aria-label'].value, 'text1');
    assert.strictEqual(input3.attributes['placeholder'].value, 'inner');
    assert.strictEqual(input3.attributes['aria-label'].value, 'inner');

    labelText('text2');
    assert.strictEqual(input2.attributes['placeholder'].value, 'text2');
    assert.strictEqual(input2.attributes['aria-label'].value, 'text2');

    done();
  });
});

test('"help" plain param sets the help text', (done) => {
  const component = bel`<mdc-textfield params="help: 'text'"></mdc-textfield>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const help = component.querySelector('p');
    assert.equal(help.textContent, 'text');

    done();
  });
});

test('"help" observable param sets the help text', (done) => {
  const component = bel`<mdc-textfield params="help: helpText"></mdc-textfield>`;
  const helpText = ko.observable('text1')
  ko.applyBindings({helpText: helpText}, component);

  setTimeout(() => {
    const help = component.querySelector('p');
    assert.equal(help.textContent, 'text1');

    helpText('text2');
    assert.equal(help.textContent, 'text2');

    done();
  });
});

test('<p> node in inner html is treated as help text', (done) => {
  const component = bel`<mdc-textfield><p>text</p></mdc-textfield>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const help = component.querySelector('p');
    assert.equal(help.textContent, 'text');

    done();
  });
});

test('<p persistent> node in inner html is treated as persistent help text', (done) => {
  const component = bel`
    <div>
      <mdc-textfield><p persistent>text</p></mdc-textfield>
      <mdc-textfield params="help: 'text', persistent: true"></mdc-textfield>
    </div>
  `;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const help1 = component.querySelector('mdc-textfield:nth-child(1) p');
    const help2 = component.querySelector('mdc-textfield:nth-child(2) p');
    assert.equal(help1.className, help2.className);

    done();
  });
});

test('<p validation> node in inner html is treated as help text with validation', (done) => {
  const component = bel`
    <div>
      <mdc-textfield><p validation>text</p></mdc-textfield>
      <mdc-textfield params="help: 'text', validation: true"></mdc-textfield>
    </div>
  `;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const help1 = component.querySelector('mdc-textfield:nth-child(1) p');
    const help2 = component.querySelector('mdc-textfield:nth-child(2) p');
    assert.equal(help1.className, help2.className);

    done();
  });
});

test('not a text or <p> node in inner html is ignored', (done) => {
  const component = bel`<mdc-textfield><span id="ignored"></span></mdc-textfield>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    assert.isNotOk(component.querySelector('#ignored'));

    done();
  });
});

test('if no id was set to the component, it is generated automatically', (done) => {
  const component = bel`<mdc-textfield></mdc-textfield>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    assert.isOk(input.id.length);

    done();
  });
});

test('"for" attribute of the label element equals to "id" of the input', (done) => {
  const component = bel`<mdc-textfield id="t1"></mdc-textfield>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    const label = component.querySelector('label');
    assert.equal(label.htmlFor, input.id);

    done();
  });
});

test('when helptext is present, "input" and "P" elements are connected via "aria-controls" attribute', (done) => {
  const component = bel`<mdc-textfield><p>help</p></mdc-textfield>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const input = component.querySelector('input');
    const help = component.querySelector('p');
    assert.equal(input.attributes['aria-controls'].value, help.id);

    done();
  });
});
