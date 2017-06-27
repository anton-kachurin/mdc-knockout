import {assert} from 'chai';
import bel from 'bel';
import augment from '../../../src/mdc-knockout-augment.js';
import {ToolbarTemplate, ToolbarViewModel} from '../../../src/mdc-knockout-toolbar';
import {MDCToolbar} from '@material/toolbar';
import {componentTest} from '../../helpers/component.js';

import ko from 'knockout';
augment.registerBindings(ko);
augment.registerComponent(ko, 'mdc-toolbar', ToolbarTemplate(), ToolbarViewModel, MDCToolbar);

function initComponent (param='') {
  const component = bel`
    <mdc-toolbar>
      <div>
        <section start>
          <a menu>menu</a>
        </section>
        <section shrink>
          <span title>Title</span>
        </section>
        <section end>
          <a icon>icon</a>
        </section>
      </div>
    </mdc-toolbar>
  `;

  if (param) {
    component.setAttribute('params', param + ': true');
  }

  ko.applyBindings(null, component);

  return component;
}

suite('toolbar template');

componentTest(initComponent(), 'has proper structure', (component) => {
  assert.equal(component.children.length, 1);
  assert.equal(component.children[0].tagName, 'HEADER');

  assert.equal(component.children[0].children.length, 1);
  assert.equal(component.children[0].children[0].tagName, 'DIV');

  assert.equal(component.children[0].children[0].children.length, 3);
  assert.equal(component.children[0].children[0].children[0].tagName, 'SECTION');

  assert.equal(component.children[0].children[0].children[0].children.length, 1);
  assert.equal(component.children[0].children[0].children[0].children[0].tagName, 'A');

  assert.equal(component.children[0].children[0].children[1].children.length, 1);
  assert.equal(component.children[0].children[0].children[1].children[0].tagName, 'SPAN');

  assert.equal(component.children[0].children[0].children[2].children.length, 1);
  assert.equal(component.children[0].children[0].children[2].children[0].tagName, 'A');
});

componentTest(initComponent(), 'has proper classes', (component) => {
  assert.equal(component.children[0].className, 'mdc-toolbar mdc-toolbar--flexible-space-maximized');

  assert.equal(component.children[0].children[0].className, 'mdc-toolbar__row');

  assert.equal(component.children[0].children[0].children[0].className,
               'mdc-toolbar__section mdc-toolbar__section--align-start');
  assert.equal(component.children[0].children[0].children[0].children[0].className, 'mdc-toolbar__icon--menu');

  assert.equal(component.children[0].children[0].children[1].className,
               'mdc-toolbar__section mdc-toolbar__section--shrink-to-fit');
  assert.equal(component.children[0].children[0].children[1].children[0].className, 'mdc-toolbar__title');

  assert.equal(component.children[0].children[0].children[2].className,
               'mdc-toolbar__section mdc-toolbar__section--align-end');
  assert.equal(component.children[0].children[0].children[2].children[0].className, 'mdc-toolbar__icon');
});

componentTest(initComponent('fixed'), 'sets "fixed" modifier', (component) => {
  assert.equal(component.children[0].className,
               'mdc-toolbar mdc-toolbar--fixed mdc-toolbar--flexible-space-maximized');
});

componentTest(initComponent('waterfall'), 'sets "waterfall" modifier', (component) => {
  assert.equal(component.children[0].className,
               'mdc-toolbar mdc-toolbar--fixed mdc-toolbar--waterfall mdc-toolbar--flexible-space-maximized');
});

componentTest(initComponent('lastrow'), 'sets "fixed-lastrow-only" modifier', (component) => {
  assert.equal(
    component.children[0].className,
    'mdc-toolbar mdc-toolbar--fixed mdc-toolbar--fixed-lastrow-only ' +
    'mdc-toolbar--flexible-space-maximized mdc-toolbar--fixed-at-last-row'
  );
});

componentTest(initComponent('flexible'), 'sets "flexible" modifier', (component) => {
  assert.equal(
    component.children[0].className,
    'mdc-toolbar mdc-toolbar--flexible mdc-toolbar--flexible-default-behavior mdc-toolbar--flexible-space-maximized'
  );
});
