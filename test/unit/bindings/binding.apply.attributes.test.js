import {applyAttributesBinding} from '../../../src/bindings/apply-attributes';
import {koMock} from '../../helpers/knockout';
import td from 'testdouble';
import {assert} from 'chai';

suite('applyAttributesBinding binding factory');

test('"preprocess" provides a default value "attrs"', () => {
  const binding = new applyAttributesBinding();
  assert.equal(binding.preprocess('non default'), 'non default');
  assert.equal(binding.preprocess(), 'attrs');
});

test('"init" calls "nodeAccessor" and passes own first argument in it', () => {
  const nodeAccessor = td.function('nodeAccessor');
  const binding = new applyAttributesBinding(koMock(), nodeAccessor);
  binding.init('element', () => {});
  td.verify(nodeAccessor('element'));
});

test('"init" retrieves parameters from valueAccessor', () => {
  const valueAccessor = td.function('valueAccessor');
  const binding = new applyAttributesBinding(koMock(), () => {});
  binding.init(null, valueAccessor);
  td.verify(valueAccessor());
});

test('"init" applies "attrs" binding to node', () => {
  const apply = td.function('applyBindingsToNode');
  const binding = new applyAttributesBinding({applyBindingsToNode: apply}, () => 'element');
  binding.init(null, () => 'parameters', null, null, 'context');
  td.verify(apply('element', {attr: 'parameters'}, 'context'));
});
