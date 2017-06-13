import {ToolbarViewModel} from '../../src/mdc-knockout-toolbar';
import td from 'testdouble';
import ko from 'knockout';
import virtualize from 'vdom-virtualize';
import bel from 'bel';
import chai from 'chai';
import chaiVirtualDom from 'chai-virtual-dom';

chai.use(chaiVirtualDom);
const assert = chai.assert;
const expect = chai.expect;

function htmlToList (html) {
  const wrapper = bel`<div></div>`;
  wrapper.innerHTML = html;
  return [...wrapper.children];
}

function setupTestVM (element = null, params = {}, attrs = {}) {
  const vm = new ToolbarViewModel(element, params, attrs);
  return vm;
}

const vm = setupTestVM();

const singleRowTest = virtualize(bel`
  <div>
    <section>
      <span>text</span>
    </section>
  </div>
`);

const singleRowTestTitle = virtualize(bel`
  <div>
    <section>
      <span title="true">text</span>
    </section>
  </div>
`);

suite('toolbar class');

test('"fixed" property exists', () => {
  assert.property(vm, 'fixed');
});

test('"fixed" has a default value of false', () => {
  assert.strictEqual(vm.fixed, false);
});

test('"fixed" is unwrapped', () => {
  const fixed = ko.observable('fixedStub');
  const vm = setupTestVM(null, {fixed: fixed});
  assert.equal(vm.fixed, 'fixedStub');
});

test('"waterfall" property exists', () => {
  assert.property(vm, 'waterfall');
});

test('"waterfall" has a default value of false', () => {
  assert.strictEqual(vm.waterfall, false);
});

test('"waterfall" is unwrapped', () => {
  const waterfall = ko.observable('waterfallStub');
  const vm = setupTestVM(null, {waterfall: waterfall});
  assert.equal(vm.waterfall, 'waterfallStub');
});

test('"lastrow" property exists', () => {
  assert.property(vm, 'lastrow');
});

test('"lastrow" has a default value of false', () => {
  assert.strictEqual(vm.lastrow, false);
});

test('"lastrow" is unwrapped', () => {
  const lastrow = ko.observable('lastrowStub');
  const vm = setupTestVM(null, {lastrow: lastrow});
  assert.equal(vm.lastrow, 'lastrowStub');
});

test('"flexible" property exists', () => {
  assert.property(vm, 'flexible');
});

test('"flexible" has a default value of false', () => {
  assert.strictEqual(vm.flexible, false);
});

test('"flexible" is unwrapped', () => {
  const flexible = ko.observable('flexibleStub');
  const vm = setupTestVM(null, {flexible: flexible});
  assert.equal(vm.flexible, 'flexibleStub');
});

test('"adjust" property exists', () => {
  assert.property(vm, 'adjust');
});

test('"adjust" has a default value of undefined', () => {
  assert.strictEqual(vm.adjust, undefined);
});

test('"adjust" is unwrapped', () => {
  const adjust = ko.observable('adjustStub');
  const vm = setupTestVM(null, {adjust: adjust});
  assert.equal(vm.adjust, 'adjustStub');
});

test('"ratio" property exists', () => {
  assert.property(vm, 'ratio');
});

test('"ratio" has a default value of null', () => {
  assert.strictEqual(vm.ratio, null);
});

test('"fixed" is set to true when "waterfall" is true', () => {
  const vm = setupTestVM(null, {waterfall: true});
  assert.strictEqual(vm.fixed, true);
});

test('"fixed" is set to true when "lastrow" is true', () => {
  const vm = setupTestVM(null, {lastrow: true});
  assert.strictEqual(vm.fixed, true);
});

test('instance.fixedAdjustElement is set to "adjust" value', () => {
  const vm = setupTestVM(null, {adjust: 'adjustStub'});
  vm.instance = {};
  vm.initialize();
  assert.strictEqual(vm.instance.fixedAdjustElement, 'adjustStub');
});

test('MDCToolbar:change event listener added when "ratio" present', () => {
  const listen = td.function();
  const vm = setupTestVM(null, {flexible: true, ratio: ko.observable()});
  vm.instance = {
    listen: listen
  };
  vm.initialize();
  td.verify(listen('MDCToolbar:change', td.matchers.isA(Function)));
});

test('MDCToolbar:change event updates "ratio"', () => {
  const ratio = ko.observable();
  const vm = setupTestVM(null, {flexible: true, ratio: ratio});
  let handler;
  vm.instance = {
    listen: (name, callback) => {handler = callback}
  };
  vm.initialize();
  handler({detail: {flexibleExpansionRatio: 0.5}});
  assert.strictEqual(ratio(), 0.5);
});

test('childrenTransform method exists', () => {
  assert.property(vm, 'childrenTransform');
});

test('childrenTransform does not alter properly structured input', () => {
  const row = bel`
    <div>
      <section>
        <span>text</span>
      </section>
    </div>
  `;
  const transformed = vm.childrenTransform([row]);

  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(singleRowTest);
});

test('childrenTransform add an empty <div> to empty toolbars', () => {
  const transformed = vm.childrenTransform([]);

  const test = bel`<div></div>`;
  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(virtualize(test));
});

test('childrenTransform ignores empty standalone text nodes', () => {
  const textNode = document.createTextNode(' ');
  const transformed = vm.childrenTransform([textNode]);

  const test = bel`<div></div>`;
  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(virtualize(test));
});

test('childrenTransform ignores empty text nodes inside <div>', () => {
  const div = bel`<div>${' '}<section><span title="true">text</span></section>${' '}</div>`;
  const transformed = vm.childrenTransform([div]);

  const test = bel`<div>${' '}<section><span title="true">text</span></section>${' '}</div>`;
  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(virtualize(test));
});

test('childrenTransform wraps a standalone section in <div>', () => {
  const row = bel`
    <section>
      <span>text</span>
    </section>
  `;
  const transformed = vm.childrenTransform([row]);

  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(singleRowTest);
});

test('childrenTransform wraps a standalone span in <div> and <section>', () => {
  const row = bel`
      <span>text</span>
  `;
  const transformed = vm.childrenTransform([row]);

  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(singleRowTest);
});

test('childrenTransform wraps a standalone text node in <div>, <section>, and <span title>', () => {
  const textNode = document.createTextNode('text');
  const transformed = vm.childrenTransform([textNode]);

  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(singleRowTestTitle);
});

test('childrenTransform wraps a standalone span inside <div> in <section>', () => {
  const row = bel`
    <div>
      <span>text</span>
    </div>
  `;
  const transformed = vm.childrenTransform([row]);

  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(singleRowTest);
});

test('childrenTransform wraps a standalone text node inside <div> in <section> and <span title>', () => {
  const row = bel`
    <div>
      text
    </div>
  `;
  const transformed = vm.childrenTransform([row]);

  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(singleRowTestTitle);
});

test('childrenTransform wraps a standalone <section> with text in <div> and <span title>', () => {
  const row = bel`
    <section>
      text
    </section>
  `;
  const transformed = vm.childrenTransform([row]);

  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(singleRowTestTitle);
});

test('childrenTransform combines non-div elements under a single div', () => {
  const section1 = bel`<section></section>`;
  const section2 = bel`<section></section>`;
  const textNode = document.createTextNode('text');
  const transformed = vm.childrenTransform([section1, textNode, section2]);

  const test = bel`
    <div>
      <section></section>
      <section>
        <span title="true">text</span>
      </section>
      <section></section>
    </div>
  `;
  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(virtualize(test));
});

test('childrenTransform transfers section-related attributes while wrapping', () => {
  const row = bel`
    <div>
      <span title start>text</span>
      <span title end>text</span>
      <span title shrink>text</span>
    </div>`;
  const transformed = vm.childrenTransform([row]);

  const test = bel`
    <div>
      <section start="start">
        <span title="title">text</span>
      </section>
      <section end="end">
        <span title="title">text</span>
      </section>
      <section shrink="shrink">
        <span title="title">text</span>
      </section>
    </div>
  `;
  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(virtualize(test));
});

test('childrenTransform does not transfer attributes if the element is not being wrapped', () => {
  const row = bel`
    <div>
      <section>
        <span title start>text</span>
      </section>
    </div>`;
  const transformed = vm.childrenTransform([row]);

  const test = bel`
    <div>
      <section>
        <span title="title" start="start">text</span>
      </section>
    </div>
  `;
  assert.equal(transformed.length, 1);
  expect(virtualize(transformed[0])).to.look.exactly.like(virtualize(test));
});
