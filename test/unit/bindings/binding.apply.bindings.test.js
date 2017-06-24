import {applyBindingsBinding} from '../../../src/bindings/apply-bindings';
import {koMock} from '../../helpers/knockout';
import td from 'testdouble';
import {assert} from 'chai';

suite('applyBindingsBinding binding factory');

test('"preprocess" provides a default value "bindings"', () => {
  const binding = new applyBindingsBinding();
  assert.equal(binding.preprocess('non default'), 'non default');
  assert.equal(binding.preprocess(), 'bindings');
});

test('"init" calls "nodeAccessor" and passes own first argument in it', () => {
  const nodeAccessor = td.function('nodeAccessor');
  const binding = new applyBindingsBinding(koMock(), nodeAccessor);
  binding.init('element', () => {});
  td.verify(nodeAccessor('element'));
});

test('"init" retrieves parameters from valueAccessor', () => {
  const valueAccessor = td.function('valueAccessor');
  const binding = new applyBindingsBinding(koMock(), () => {});
  binding.init(null, valueAccessor);
  td.verify(valueAccessor());
});

test('"init" applies "attrs" binding to node', () => {
  const apply = td.function('applyBindingsToNode');
  const binding = new applyBindingsBinding({applyBindingsToNode: apply}, () => 'element');
  binding.init(null, () => 'parameters', null, null, 'context');
  td.verify(apply('element', 'parameters', 'context'));
});

test('"init" wraps parameters as observables when forcing bindings', () => {
  const isSubscribable = td.function('isSubscribable');
  td.when(isSubscribable(1)).thenReturn(true);
  td.when(isSubscribable(2)).thenReturn(false);
  const observable = td.function('observable');
  td.when(observable(2)).thenReturn(() => 2);
  const parameters = {a: 1, b: 2};
  const ko = koMock();
  ko.isSubscribable = isSubscribable;
  ko.observable = observable;
  const binding = new applyBindingsBinding(ko, () => {}, true);
  binding.init(null, () => parameters);
  assert.equal(parameters.a, 1);
  assert.equal(parameters.b(), 2);
});
