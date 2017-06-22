import {childrenUtil} from '../../../src/bindings/children-util';
import td from 'testdouble';
import bel from 'bel';
import {assert} from 'chai';

suite('childrenUtil binding factory helper');

test('"output" uses ko.virtualElements.prepend to output children', () => {
  const prepend = td.function('prepend');
  const element = bel`<span></span>`;
  const child = bel`<div></div>`;
  childrenUtil.output({virtualElements: {prepend: prepend}}, [child], element);
  td.verify(prepend(element, child))
});

test('"output" prepends children in reverse', () => {
  const prepended = [];
  const prepend = (element, child) => {
    prepended.push(child);
  };
  childrenUtil.output({virtualElements: {prepend: prepend}}, [1, 2, 3]);
  assert.deepEqual(prepended, [3, 2, 1]);
});

test('"apply" applies $parentContext via "applyBindingsToDescendants"', () => {
  const apply = td.function();
  const bindingContext = {
    $parentContext: 'parentContext'
  }
  childrenUtil.apply({applyBindingsToDescendants: apply}, bindingContext, 'element');
  td.verify(apply('parentContext', 'element'));
});
