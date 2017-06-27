import {assert} from 'chai';
import bel from 'bel';
import domEvents from 'dom-events';
import augment from '../../../src/mdc-knockout-augment';
import {ToolbarTemplate, ToolbarViewModel} from '../../../src/mdc-knockout-toolbar';
import {MDCToolbar} from '@material/toolbar';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-toolbar', ToolbarTemplate(), ToolbarViewModel, MDCToolbar);

suite('toolbar component');

test('content is transformed', () => {
  const component = bel`<mdc-toolbar>title</mdc-toolbar>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const div = component.querySelector('div');
    const section = component.querySelector('section');
    const span = component.querySelector('span');

    assert.isOk(div);
    assert.isOk(section);
    assert.isOk(span);
  });
});

test('text binding on the title works', (done) => {
  const component = bel`
    <mdc-toolbar>
      <span title data-bind="text: 'title'"></span>
    </mdc-toolbar>
  `;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const span = component.querySelector('span');
    assert.equal(span.textContent, 'title');

    done();
  });
});

test('foreach binding in inner html works', (done) => {
  const component = bel`
    <mdc-toolbar>
      <!-- ko foreach: icons -->
        <span icon data-bind="text: $data"></span>
      <!-- /ko -->
    </mdc-toolbar>
  `;
  const icons = ['icon1', 'icon2'];
  ko.applyBindings({icons: icons}, component);

  setTimeout(() => {
    const spans = component.querySelectorAll('span');

    assert.equal(spans[0].textContent, 'icon1');
    assert.equal(spans[1].textContent, 'icon2');

    done();
  });
});

test('foreach binding in inner html works', (done) => {
  const adjust = bel`<div></div>`;
  const component = bel`
    <mdc-toolbar params="adjust: adjust, fixed: 1"></mdc-toolbar>
  `;
  ko.applyBindings({adjust: adjust}, component);

  setTimeout(() => {
    assert.isOk(adjust.style.marginTop);

    done();
  });
});

test('MDCToolbar:change event changes ratio', (done) => {
  const component = bel`
    <mdc-toolbar params="ratio: ratio, flexible: 1">
      title
    </mdc-toolbar>
  `;
  const ratio = ko.observable();
  ko.applyBindings({ratio: ratio}, component);

  setTimeout(() => {
    const header = component.querySelector('header');

    domEvents.emit(header, 'MDCToolbar:change', {detail: {flexibleExpansionRatio: 0.3}});
    assert.equal(ratio(), 0.3);

    done();
  });
});
