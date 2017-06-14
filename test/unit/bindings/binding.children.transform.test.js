import {childrenTransformBinding, childrenTransformUtil} from '../../../src/bindings/children-transform';
import {koMock} from '../../helpers/knockout';
import td from 'testdouble';
import bel from 'bel';
import virtualize from 'vdom-virtualize';
import chai from 'chai';
import chaiVirtualDom from 'chai-virtual-dom';

chai.use(chaiVirtualDom);
const assert = chai.assert;
const expect = chai.expect;

function invokeInit (binding, $component, parameters, children) {
  const bindingContext = { $component: {}, $componentTemplateNodes: [] };

  if ($component) {
    bindingContext.$component = $component;
  }

  if (children) {
    bindingContext.$componentTemplateNodes = children;
  }

  const valueAccessor = () => parameters || {};

  binding.init([], valueAccessor, null, null, bindingContext);
}

suite('children-transform binding');

test('"transform" method invokes "transformFunction" with "children" argument', () => {
  const transformFunction = td.function('transformFunction');
  childrenTransformUtil.transform('childrenStub', transformFunction);
  td.verify(transformFunction('childrenStub'));
});

test('"transform" returns the result of "transformFunction"', () => {
  const transformFunction = () => 'returnStub';
  const result = childrenTransformUtil.transform('', transformFunction);
  assert.equal(result, 'returnStub');
});

test('"makeList" lists "nodes" children to the given "maxDepth"', () => {
  const node = bel`
    <div>
      <span></span>
      <div>
        <span></span>
        <div></div>
      </div>
    </div>
  `;
  const child_1_0 = node.children[0];
  const child_1_1 = node.children[1];
  const child_2_0 = child_1_1.children[0];
  const child_2_1 = child_1_1.children[1];
  const expect = [node, child_1_0, child_1_1, child_2_0, child_2_1];
  const list = [];
  childrenTransformUtil.makeList(list, [node], 2);
  assert.sameMembers(list, expect);
});

test('"makeList" by mininum lists the input node itself', () => {
  const node = bel`<div></div>`;
  const list = [];
  childrenTransformUtil.makeList(list, [node], 2);
  assert.lengthOf(list, 1);
  assert.sameMembers(list, [node]);
});

test('"makeList" does not list children over the "maxDepth"', () => {
  const node = bel`
    <div>
      <span></span>
      <div>
        <span></span>
      </div>
    </div>
  `;
  const child_2_0 = node.children[1].children[0];
  const list = [];
  childrenTransformUtil.makeList(list, [node], 1);
  assert.lengthOf(list, 3);
  assert.notInclude(list, child_2_0);
});

test('"addClasses" adds classes defined in "parameters" to nodes', () => {
  const nodes = [bel`<span></span>`, bel`<a></a>`];
  const parameters = {
    'SPAN': 'span_class',
    'A': 'a_class'
  };
  const test = [bel`<span class="span_class"></span>`, bel`<a class="a_class"></a>`];
  childrenTransformUtil.addClasses(nodes, parameters);
  expect(virtualize(nodes[0])).to.look.exactly.like(virtualize(test[0]));
  expect(virtualize(nodes[1])).to.look.exactly.like(virtualize(test[1]));
});

test('"addClasses" ignores nodes that are not specified in "parameters"', () => {
  const node = bel`<span></span>`;
  const parameters = {};
  const test = bel`<span></span>`;
  childrenTransformUtil.addClasses([node], parameters);
  expect(virtualize(node)).to.look.exactly.like(virtualize(test));
});

test('"replaceAttrs" replaces attributes with classes as specified in "parameters"', () => {
  const node = bel`<span title></span>`;
  const parameters = {title: 'title_class'};
  const test = bel`<span class="title_class"></span>`;
  childrenTransformUtil.replaceAttrs([node], parameters);
  expect(virtualize(node)).to.look.exactly.like(virtualize(test));
});

test('"replaceAttrs" ignores attributes that are not specified in "parameters"', () => {
  const node = bel`<span title></span>`;
  const parameters = {};
  const test = bel`<span title="title"></span>`;
  childrenTransformUtil.replaceAttrs([node], parameters);
  expect(virtualize(node)).to.look.exactly.like(virtualize(test));
});

test('"replaceAttrs" ignores text nodes', () => {
  const node = document.createTextNode('text');
  const parameters = {};
  const test = document.createTextNode('text');
  childrenTransformUtil.replaceAttrs([node], parameters);
  expect(virtualize(node)).to.look.exactly.like(virtualize(test));
});

test('"output" uses ko.virtualElements.prepend to output children', () => {
  const prepend = td.function('prepend');
  const element = bel`<span></span>`;
  const child = bel`<div></div>`;
  childrenTransformUtil.output({virtualElements: {prepend: prepend}}, [child], element);
  td.verify(prepend(element, child))
});

test('"output" prepends children in reverse', () => {
  const prepended = [];
  const prepend = (element, child) => {
    prepended.push(child);
  };
  childrenTransformUtil.output({virtualElements: {prepend: prepend}}, [1, 2, 3]);
  assert.deepEqual(prepended, [3, 2, 1]);
});

test('"init" calls util.transform when the "childrenTransform" is available', () => {
  const invoked = td.function('invoked transform');
  const binding = new childrenTransformBinding(koMock(), {
    transform: () => {
      invoked();
      return [];
    }
  });
  invokeInit(binding, {childrenTransform: () => ([])});
  td.verify(invoked());
});

test('"init" calls util.makeList', () => {
  const invoked = td.function('invoked makeList');
  const binding = new childrenTransformBinding(koMock(), {
    makeList: () => invoked()
  });
  invokeInit(binding, null, {depth: 1});
  td.verify(invoked());
});

test('"init" calls util.addClasses', () => {
  const invoked = td.function('invoked addClasses');
  const binding = new childrenTransformBinding(koMock(), {
    makeList: () => {},
    addClasses: () => invoked()
  });
  invokeInit(binding, null, {depth: 1, node: {}});
  td.verify(invoked());
});

test('"init" calls util.replaceAttrs', () => {
  const invoked = td.function('invoked replaceAttrs');
  const binding = new childrenTransformBinding(koMock(), {
    makeList: () => {},
    replaceAttrs: () => invoked()
  });
  invokeInit(binding, null, {depth: 1, attr: {}});
  td.verify(invoked());
});

test('"init" calls util.output', () => {
  const invoked = td.function('invoked output');
  const binding = new childrenTransformBinding(koMock(), {
    output: () => invoked()
  });
  invokeInit(binding, null, null, [1]);
  td.verify(invoked());
});
