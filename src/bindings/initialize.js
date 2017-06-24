import {constants} from './children';

class initializeUtil {
  static getWrapper (root) {
    return root.children[0];
  }

  static instantiate (componentClass, element) {
    return componentClass.attachTo(element);;
  }

  static initialize (instance, viewModel, bindingContext) {
    viewModel.instance = instance;
    viewModel.initialize(bindingContext[constants.PARENT_VIEW_MODEL]);
  }
}

class initializeBinding {
  constructor (ko, util) {
    this.ko = ko;
    this.util = util;
    this.init = this.init.bind(this);
  }

  init (element, valueAccessor, allBindings, viewModel, bindingContext) {
    const vm = bindingContext.$component;
    const root = vm.root;
    const MDCComponent = vm.MDCComponent;

    const wrapper = this.util.getWrapper(root);
    const instance = this.util.instantiate(MDCComponent, wrapper);

    this.util.initialize(instance, vm, bindingContext);

    root[MDCComponent.name] = instance;
  }
}

export {initializeBinding, initializeUtil};
