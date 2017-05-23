import {assert} from 'chai';
import td from 'testdouble';
import bel from 'bel';
import {DisposableViewModel,
        PlainViewModel,
        ComponentViewModel,
        HookableComponentViewModel} from '../../src/mdc-knockout-base';

import ko from 'knockout';

suite('base classes');

test('base exports DisposableViewModel, PlainViewModel, and ComponentViewModel', () => {
  assert.isFunction(DisposableViewModel);
  assert.isFunction(PlainViewModel);
  assert.isFunction(ComponentViewModel);
});

test('DisposableViewModel has a method "dispose"', () => {
  const vm = new DisposableViewModel();
  assert.isFunction(vm.dispose);
});

test('DisposableViewModel has a property-setter "track"', () => {
  const vm = new DisposableViewModel();
  assert.property(vm, 'track');
  assert.isUndefined(vm.track);
});

test('DisposableViewModel disposes all tracked observables', () => {
  const vm = new DisposableViewModel();
  const disposeObservable = td.function();
  vm.track = {dispose: disposeObservable};
  vm.dispose();
  td.verify(disposeObservable());
});

test('PlainViewModel extends DisposableViewModel', () => {
  const vm = new PlainViewModel();
  assert.instanceOf(vm, DisposableViewModel);
});

test('PlainViewModel instance has "root", "bindings", and "attrs" properties', () => {
  const vm = new PlainViewModel();
  assert.property(vm, 'root');
  assert.property(vm, 'bindings');
  assert.property(vm, 'attrs');
});

test('PlainViewModel has "defaultParams", "unwrapParams", and "forceBindings" property-getters', () => {
  const vm = new PlainViewModel();
  assert.property(vm, 'defaultParams');
  assert.deepEqual(vm.defaultParams, {});
  assert.property(vm, 'unwrapParams');
  assert.deepEqual(vm.unwrapParams, []);
  assert.property(vm, 'forceBindings');
  assert.deepEqual(vm.forceBindings, {});
});

test('PlainViewModel has "extend" method', () => {
  const vm = new PlainViewModel();
  assert.isFunction(vm.extend);
});

test('PlainViewModel constructor calls extend method', () => {
  const extender = td.function();
  class TestVM extends PlainViewModel {
    constructor () {
      super();

    }
    extend () {
      extender();
    }
  }
  const vm = new TestVM();
  td.verify(extender());
});

test('PlainViewModel constructor assigns "root" and "attrs" arguments to corresponding instance properties', () => {
  const vm = new PlainViewModel('root', null, 'attrs');
  assert.strictEqual(vm.root, 'root');
  assert.strictEqual(vm.attrs, 'attrs');
});

test('PlainViewModel constructor assigns "params" argument to "bindings" instance property ' +
     'when "defaultParams", "unwrapParams", and "forceBindings" have default values', () => {
  const params = {
    a: 1,
    b: 'b',
    c: () => {}
  };
  const vm = new PlainViewModel('', params, '');
  assert.strictEqual(vm.bindings, params);
});

test('PlainViewModel constructor adds bindings based on "forceBindings" value', () => {
  class TestVM extends PlainViewModel {
    get forceBindings () {
      return {
        a: () => 1,
        b: () => 2,
      }
    }
  }
  const vm = new TestVM('', {});
  assert.property(vm.bindings, 'a');
  assert.property(vm.bindings, 'b');
  assert.strictEqual(vm.bindings.a, 1);
  assert.strictEqual(vm.bindings.b, 2);
});

test('PlainViewModel constructor does not force bindings if they are already present', () => {
  class TestVM extends PlainViewModel {
    get forceBindings () {
      return {
        a: () => 1,
        b: () => 2,
      }
    }
  }
  const vm = new TestVM('', {a: 3});
  assert.property(vm.bindings, 'a');
  assert.property(vm.bindings, 'b');
  assert.strictEqual(vm.bindings.a, 3);
  assert.strictEqual(vm.bindings.b, 2);
});

test('PlainViewModel constructor adds properties to instance based on "defaultParams" value', () => {
  const observable = ko.observable();
  class TestVM extends PlainViewModel {
    get defaultParams () {
      return {
        a: '',
        b: 1,
        c: observable
      }
    }
  }
  const vm = new TestVM('', {});
  assert.property(vm, 'a');
  assert.property(vm, 'b');
  assert.property(vm, 'c');
  assert.strictEqual(vm.a, '');
  assert.strictEqual(vm.b, 1);
  assert.equal(vm.c, observable);
});

test('PlainViewModel constructor overwrites default param value when it is present in "params" argument', () => {
  class TestVM extends PlainViewModel {
    get defaultParams () {
      return {
        a: '',
        b: 2
      }
    }
  }
  const vm = new TestVM('', {a: 1, c:3});
  assert.property(vm, 'a');
  assert.property(vm, 'b');
  assert.property(vm.bindings, 'c');
  assert.strictEqual(vm.a, 1);
  assert.strictEqual(vm.b, 2);
  assert.strictEqual(vm.bindings.c, 3);
});

test('PlainViewModel constructor converts properties to non-observables based on "unwrapParams" value', () => {
  const observableA = ko.observable(1);
  const computed = ko.computed(() => observableA() + 1);
  const wrapped = ko.observable(observableA);
  class TestVM extends PlainViewModel {
    get defaultParams () {
      return {
        a: observableA,
        computed: computed,
        wrapped: wrapped,
        b: 3
      }
    }
    get unwrapParams () {
      return ['a', 'computed', 'wrapped', 'b']
    }
  }
  const vm = new TestVM('', {});
  assert.property(vm, 'a');
  assert.property(vm, 'computed');
  assert.property(vm, 'wrapped');
  assert.property(vm, 'b');
  assert.strictEqual(vm.a, 1);
  assert.strictEqual(vm.computed, 2);
  assert.strictEqual(vm.wrapped, 1);
  assert.strictEqual(vm.b, 3);
});

test('ComponentViewModel extends PlainViewModel', () => {
  const vm = new ComponentViewModel();
  assert.instanceOf(vm, PlainViewModel);
});

test('ComponentViewModel constructor assigns "MDCFoundation" and "MDCComponent" arguments ' +
     'to corresponding instance properties', () => {
  const vm = new ComponentViewModel(null, null, null, 'MDCComponent', 'MDCFoundation');
  assert.strictEqual(vm.MDCComponent, 'MDCComponent');
  assert.strictEqual(vm.MDCFoundation, 'MDCFoundation');
});

test('ComponentViewModel instance has "instance" property and "initialize" method', () => {
  const vm = new ComponentViewModel();
  assert.strictEqual(vm.instance, null);
  assert.isFunction(vm.initialize);
});

test('ComponentViewModel instance destroys its "instance" property on disposal', () => {
  const vm = new ComponentViewModel();
  const destroy = td.function();
  vm.instance = {destroy: destroy};

  vm.dispose();
  td.verify(destroy());
});

test('HookableComponentViewModel extends ComponentViewModel', () => {
  const vm = new HookableComponentViewModel();
  assert.instanceOf(vm, ComponentViewModel);
});

test('HookableComponentViewModel has stub property-getters "hookedElement" and "hookedProperties"', () => {
  const vm = new HookableComponentViewModel();
  const getHookedElement = () => vm.hookedElement;
  const getHookedProperties = () => vm.hookedProperties;
  assert.isOk('hookedElement' in vm);
  assert.isOk('hookedProperties' in vm);
  assert.throws(getHookedElement);
  assert.throws(getHookedProperties);
});

test('HookableComponentViewModel installs hooks on initialization', () => {
  const hook = td.function();
  const element = bel`<input>`;
  class TestClass extends HookableComponentViewModel {
    get hookedElement () {
      return element;
    }

    get hookedProperties () {
      return {disabled: hook}
    }
  }
  const vm = new TestClass(null, null, null, 'MDCComponentStub');
  vm.initialize();

  element.disabled = true;
  td.verify(hook(true));
});

test('HookableComponentViewModel does not require extending classes to use "super()" ' +
     'inside "initialize" method', () => {
  const hook = td.function();
  const init = td.function();
  const element = bel`<input>`;
  class TestClass extends HookableComponentViewModel {
    initialize () {
      init();
    }

    get hookedElement () {
      return element;
    }

    get hookedProperties () {
      return {disabled: hook}
    }
  }
  const vm = new TestClass(null, null, null, 'MDCComponentStub');

  vm.initialize();
  td.verify(init());

  element.disabled = true;
  td.verify(hook(true));
});

test('HookableComponentViewModel uninstalls hooks on disposal', () => {
  const hook = td.function();
  const element = bel`<input>`;
  class TestClass extends HookableComponentViewModel {
    get hookedElement () {
      return element
    }

    get hookedProperties () {
      return {disabled: hook}
    }
  }
  const vm = new TestClass(null, null, null, 'MDCComponentStub');
  vm.initialize();

  element.disabled = true;
  vm.dispose();
  element.disabled = false;
  td.verify(hook(td.matchers.anything()), {times: 1});
});
