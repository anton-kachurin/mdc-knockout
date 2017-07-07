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

test('"getHookableParameters" extracts "defaultParams" keys of the component', () => {
  const result = rippleUtil.getHookableParameters({
    $component: { defaultParams: { p1: 1, p2: 2, p3: 3} }
  });

  assert.deepEqual(result, ['p1', 'p2', 'p3']);
});

test('"hookParameters" subscribes to each observable parameter of the component and returns subscriptions', () => {
  const subscribe = td.function('subscribe');
  td.when(subscribe('handler')).thenReturn('subscription');
  const s1 = () => {};
  s1.notifySubscribers = () => {};
  s1.subscribe = subscribe;
  const s2 = s1;
  const handler = 'handler';

  const result = rippleUtil.hookParameters({
    $component: {
      p1: s1,
      p2: s2
    }
  }, ['p1', 'p2'], 'handler');

  assert.deepEqual(result, ['subscription', 'subscription']);
});

test('"hookParameters" ignores non-observable parameters', () => {
  const result = rippleUtil.hookParameters({
    $component: {p1: 'plain'}
  }, ['p1']);

  assert.deepEqual(result, []);
});

test('"disposeHooks" disposes every subscription in the provided list', () => {
  const dispose = td.function('dispose');
  const subscription1 = {dispose: dispose};
  const subscription2 = subscription1;

  rippleUtil.disposeHooks([subscription1, subscription2]);

  td.verify(dispose(), {times: 2});
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

test('"init" calls util.getHookableParameters', () => {
  const getHookableParameters = td.function('getHookableParameters');
  const binding = new rippleBinding(koMock(), {
    getHookableParameters: getHookableParameters,
    hookParameters: () => {},
    instantiate: () => 'instance'
  });

  binding.init({}, null, null, null, 'bindingContext');

  td.verify(getHookableParameters('bindingContext'));
});

test('"init" calls util.hookParameters and passes to it the return of util.getHookableParameters', () => {
  const hookParameters = td.function('hookParameters');
  const binding = new rippleBinding(koMock(), {
    getHookableParameters: () => ['parameter'],
    hookParameters: hookParameters,
    instantiate: () => 'instance'
  });

  binding.init({}, null, null, null, 'bindingContext');

  td.verify(hookParameters('bindingContext', ['parameter'], td.matchers.isA(Function)));
});

test('"init" passes to util.hookParameters a callback which invokes "apply" method of ripple', () => {
  const layout = td.function('layout');
  let hook;
  const binding = new rippleBinding(koMock(), {
    getHookableParameters: () => [],
    hookParameters: (context, parameters, callback) => {
      hook = callback;
    },
    instantiate: () => {
      return {layout: layout}
    }
  });

  binding.init({}, null, null, null, 'bindingContext');
  hook();

  td.verify(layout());
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

test('dispose callback calls util.disposeHooks', () => {
  const disposeHooks = td.function('disposeHooks');
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
    hookParameters: () => ['subscription'],
    disposeHooks: disposeHooks,
    instantiate: () => {
      return {destroy: () => {}}
    }
  });
  const element = {};

  binding.init(element);
  disposeCallback();

  td.verify(disposeHooks(['subscription']));
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
