import {childrenBinding, childrenUtil, constants} from '../../../src/bindings/children';
import {koMock} from '../../helpers/knockout';
import td from 'testdouble';
import bel from 'bel';
import {assert} from 'chai';

const context = { $componentTemplateNodes: [] };

suite('childrenBinding binding factory');

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

test('"apply" extends bindingContext.$parentContext', () => {
  const extend = td.function();
  const bindingContext = {
    $parentContext: {
      extend: (func) => {
        extend(func());
      }
    },
    $component: 'component'
  };
  childrenUtil.apply(koMock(), bindingContext, 'element');
  const extendedBy = {};
  extendedBy[constants.PARENT_VIEW_MODEL] = 'component';
  td.verify(extend(extendedBy));
});

test('"apply" applies extended $parentContext via "applyBindingsToDescendants"', () => {
  const apply = td.function();
  const extend = td.function();
  td.when(extend(td.matchers.anything())).thenReturn('extendedContext');
  const bindingContext = {
    $parentContext: {
      extend : extend
    }
  };
  childrenUtil.apply({applyBindingsToDescendants: apply}, bindingContext, 'element');
  td.verify(apply('extendedContext', 'element'));
});

test('"init" disables automatic binding on descendant elements', () => {
  const binding = new childrenBinding(koMock(), {
    apply: () => {},
    output: () => {}
  });
  const result = binding.init(null, null, null, null, context);
  assert.deepEqual(result, { controlsDescendantBindings: true });
});

test('"init" calls util.output and util.apply', () => {
  const output = td.function('output');
  const apply = td.function('apply');
  const ko = koMock();
  const binding = new childrenBinding(ko, {
    output: output,
    apply: apply
  });
  binding.init('element', () => {}, null, null, context);
  td.verify(output(ko, [], 'element'));
  td.verify(apply(ko, context, 'element'));
});
