import {childrenFilterBinding, childrenFilterUtil} from '../../../src/bindings/children-filter';
import {koMock} from '../../helpers/knockout';
import td from 'testdouble';
import {assert} from 'chai';

function textNodeAsParameter () {
  return {nodeType: 3};
}

function textNodeAsChild (text) {
  return {
    nodeType: 3,
    textContent: text
  }
}

function invokeInit (binding, parameter, children) {
  const bindingContext = { $componentTemplateNodes: [] };

  if (children) {
    bindingContext.$componentTemplateNodes = children;
  }

  const valueAccessor = () => parameter || {};

  return binding.init([], valueAccessor, null, null, bindingContext);
}

suite('childrenFilter binding factory');

test('"test" compares "nodeType" parameters of the arguments', () => {
  const result1 = childrenFilterUtil.test(textNodeAsChild(), textNodeAsParameter());
  assert.isOk(result1);
  const result2 = childrenFilterUtil.test(textNodeAsChild(), {});
  assert.isNotOk(result2);
});

test('"init" disables automatic binding on descendant elements', () => {
  const binding = new childrenFilterBinding(koMock());
  const result = invokeInit(binding);
  assert.deepEqual(result, { controlsDescendantBindings: true });
});

test('"init" runs util.test for every child node', () => {
  const invoked = td.function('invoked test');
  const binding = new childrenFilterBinding(koMock(), {
    test: (...args) => invoked(...args)
  });
  const child1 = textNodeAsChild('child1');
  const child2 = textNodeAsChild('child2');
  invokeInit(binding, 'parameterStub', [child1, child2]);
  td.verify(invoked(child1, 'parameterStub'));
  td.verify(invoked(child2, 'parameterStub'));
});

test('"init" calls util.output when there are results to output', () => {
  const invoked = td.function('invoked output');
  const binding = new childrenFilterBinding(koMock(), {
    test: () => true,
    output: () => invoked(),
    apply: () => {}
  });
  invokeInit(binding, null, [textNodeAsChild()]);
  td.verify(invoked());
});

test('"init" calls util.apply when there are results to output', () => {
  const invoked = td.function('invoked apply');
  const binding = new childrenFilterBinding(koMock(), {
    test: () => true,
    output: () => {},
    apply: () => invoked()
  });
  invokeInit(binding, null, [textNodeAsChild()]);
  td.verify(invoked());
});
