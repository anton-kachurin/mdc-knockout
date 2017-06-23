class applyAttributesBinding {
  constructor (ko, nodeAccessor) {
    this.ko = ko;
    this.nodeAccessor = nodeAccessor;
    this.init = this.init.bind(this);
  }

  preprocess (value, name, addBindingCallback) {
    return value || 'attrs';
  }

  init (element, valueAccessor, allBindings, viewModel, bindingContext) {
    this.ko.applyBindingsToNode(this.nodeAccessor(element), {attr: valueAccessor()}, bindingContext);
  }
}

export {applyAttributesBinding};
