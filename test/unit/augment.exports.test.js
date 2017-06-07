import {assert} from 'chai';
import td from 'testdouble';
import bel from 'bel';
import augment from '../../src/mdc-knockout-augment';

import {koMock} from '../helpers/knockout';

suite('augment exports');

test('augment exports registerBindings and registerComponent', () => {
  assert.equal(typeof augment.registerBindings, 'function');
  assert.equal(typeof augment.registerComponent, 'function');
});

test('registerBindings requires knockout as a parameter', () => {
  const ko = koMock();
  assert.throws(augment.registerBindings);
  assert.throws(() => augment.registerBindings({}));
  assert.doesNotThrow(() => augment.registerBindings(ko));
});

test('registerBindings bounces multiple calls', () => {
  const ko = koMock();
  const handlers = ko.bindingHandlers;

  augment.registerBindings(ko);
  Object.keys(handlers).forEach(binding => handlers[binding] = 1);
  augment.registerBindings(ko);

  const overwritten = [];
  Object.keys(handlers).forEach(binding => {
    if (handlers[binding] !== 1) {
      overwritten.push(binding);
    }
  });

  assert.deepEqual(overwritten, []);
});

test('registerComponent requires knockout as the first parameter', () => {
  const ko = koMock();
  assert.throws(augment.registerComponent);
  assert.throws (() => augment.registerComponent({}));
  assert.doesNotThrow(() => augment.registerComponent(ko));
});

test('registerComponent registers a component with a name passed as the second argument', () => {
  const ko = koMock();
  const register = td.function();
  ko.components.register = register;

  augment.registerComponent(ko, 'component_name');
  td.verify(register('component_name', td.matchers.anything()));
});

test('registerComponent uses the third argument as the component template', () => {
  const ko = koMock();
  const register = td.function();
  ko.components.register = register;

  const templateText = 'template text';
  augment.registerComponent(ko, '', templateText);
  td.verify(register('', td.matchers.contains({template: templateText})));
});

test('registerComponent uses a createViewModel factory for the component', () => {
  const ko = koMock();
  const register = td.function();
  ko.components.register = register;

  augment.registerComponent(ko, '');
  td.verify(register('', td.matchers.argThat(obj => {
    if (obj !== null && typeof obj === 'object'){
      if ('viewModel' in obj) {
        if ('createViewModel' in obj.viewModel) {
          if (typeof obj.viewModel.createViewModel == 'function') {
            return true;
          }
        }
      }
    }
    return false;
  })));
});

test('createViewModel instantiates a viewmodel class passed as the fourth argument ' +
     'and returns the instance', () => {
  const ko = koMock();
  const ViewModelConstructor = td.function();

  ko.components.register = (name, obj) => {
    const element = bel`<div></div>`;
    const vm = obj.viewModel.createViewModel('params', {element: element});
    assert.instanceOf(vm, ViewModelConstructor);
  };

  augment.registerComponent(ko, '', '', ViewModelConstructor);
  td.verify(ViewModelConstructor(), {ignoreExtraArgs: true});
});

test('registerComponent processes attributes properly', () => {
  const ko = koMock();
  const ViewModelConstructor = td.function();
  const element = bel`
    <div id="el_1" attr1 attr2="something"
         class="many class names"
         params="param1: val1, param2: val2"
         data-bind="visible: true">
    </div>
  `;

  ko.components.register = (name, obj) => {
    obj.viewModel.createViewModel('paramsStub', {element: element});
  };

  augment.registerComponent(ko, '', '', ViewModelConstructor);
  assert.equal(element.attributes.length, 3);
  assert.equal(element.attributes.getNamedItem('class').value, 'many class names');
  assert.equal(element.attributes.getNamedItem('params').value, 'param1: val1, param2: val2');
  assert.equal(element.attributes.getNamedItem('data-bind').value, 'visible: true');
});

test('registerComponent passes right arguments to the viewmodel constructor', () => {
  const ko = koMock();
  const ViewModelConstructor = td.function();
  const element = bel`<div id="el_1" attr1 attr2="something"></div>`;

  ko.components.register = (name, obj) => {
    obj.viewModel.createViewModel('paramsStub', {element: element});
  };

  augment.registerComponent(ko, '', '', ViewModelConstructor, 'MDCComponentStub');
  td.verify(ViewModelConstructor(element,
                                'paramsStub',
                                {id: 'el_1', attr1: 'attr1', attr2: 'something'},
                                'MDCComponentStub'));
});

test('registerComponent triggers mdc-instance binding if the fifth argument (MDCComponent) is passed', () => {
  const ko = koMock();

  ko.components.register = (name, obj) => {
    assert.strictEqual(obj.template, '<!-- ko mdc-instance --><!-- /ko -->');
  }

  augment.registerComponent(ko, '', '', {}, 'MDCComponentStub')
});
