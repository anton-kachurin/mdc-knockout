import {assert} from 'chai';
import td from 'testdouble';
import bel from 'bel';
import {DisposableViewModel, PlainViewModel, ComponentViewModel} from '../../src/mdc-knockout-base';

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
