import {rippleBinding, rippleUtil} from '../../../src/bindings/ripple';
import {koMock} from '../../helpers/knockout';
import td from 'testdouble';
import {assert} from 'chai';

suite('rippleBinding binding factory');

test('"instantiate" invokes "attachTo" method with the given element', () => {
  const attachTo = td.function('attachTo');
  td.when(attachTo('element')).thenReturn('instance');
  const result = rippleUtil.instantiate({attachTo: attachTo}, 'element');
  assert.equal(result, 'instance');
});

test('"init" calls util.instantiate and add its return value as a property to the element', () => {
  const element = {};
  const binding = new rippleBinding(koMock(), {
    getHookableParameters: () => [],
    hookParameters: () => {},
    instantiate: () => 'instance'
  });
  binding.init(element);
  assert.property(element, 'MDCRipple');
  assert.equal(element.MDCRipple, 'instance');
});

test('"init" adds a dispose callback to the element', () => {
  const addDisposeCallback = td.function('addDisposeCallback');
  const binding = new rippleBinding({
    utils: {
      domNodeDisposal: {
        addDisposeCallback: addDisposeCallback
      }
    }
  }, {
    getHookableParameters: () => [],
    hookParameters: () => {},
    instantiate: () => {}
  });
  const element = {};
  binding.init(element);
  td.verify(addDisposeCallback(element, td.matchers.isA(Function)));
});

test('dispose callback destroys the instance', () => {
  const destroy = td.function('destroy');
  let disposeCallback;
  const binding = new rippleBinding({
    utils: {
      domNodeDisposal: {
        addDisposeCallback: (element, callback) => {
          disposeCallback = callback;
        }
      }
    }
  }, {
    getHookableParameters: () => [],
    hookParameters: () => {},
    disposeHooks: () => {},
    instantiate: () => {
      return {destroy: destroy}
    }
  });
  const element = {};
  binding.init(element);
  disposeCallback();
  td.verify(destroy());
});
