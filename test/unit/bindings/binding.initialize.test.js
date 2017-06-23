import {initializeBinding, initializeUtil} from '../../../src/bindings/initialize';
import {constants} from '../../../src/bindings/children';
import {koMock} from '../../helpers/knockout';
import td from 'testdouble';
import {assert} from 'chai';

suite('initializeBinding binding factory');

test('"getWrapper" returns the first child of the given node', () => {
  const element = {
    children: [
      'wrapper'
    ]
  }
  const result = initializeUtil.getWrapper(element);
  assert.equal(result, 'wrapper');
});

test('"instantiate" invokes "attachTo" method with the given element', () => {
  const attachTo = td.function('attachTo');
  td.when(attachTo('element')).thenReturn('instance');
  const result = initializeUtil.instantiate({attachTo: attachTo}, 'element');
  assert.equal(result, 'instance');
});

test('"initialize" adds "instance" property to the viewModel', () => {
  const vm = {
    initialize: () => {}
  };
  initializeUtil.initialize('instance', vm, {});
  assert.property(vm, 'instance');
  assert.equal(vm.instance, 'instance');
});

test('"initialize" invokes "initialize" method of the viewModel', () => {
  const initialize = td.function('initialize');
  const vm = {initialize: initialize};
  const context = {};
  context[constants.PARENT_VIEW_MODEL] = 'parent';
  initializeUtil.initialize(null, vm, context);
  td.verify(initialize('parent'));
});

test('"init" instantiates the component, and initializes the viewModel', () => {
  const getWrapper = td.function('getWrapper');
  const instantiate = td.function('instantiate');
  const initialize = td.function('initialize');

  const root = {};
  const vm = {
    root: root,
    MDCComponent: 'class'
  };
  const context = {
    $component: vm
  };

  td.when(getWrapper(root)).thenReturn('wrapper');
  td.when(instantiate('class', 'wrapper')).thenReturn('instance');

  const binding = new initializeBinding(koMock(), {
    getWrapper: getWrapper,
    instantiate: instantiate,
    initialize: initialize
  });
  binding.init(null, null, null, null, context);
  td.verify(initialize('instance', vm, context));
});
