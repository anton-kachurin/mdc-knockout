class applyBindingsBinding {
  constructor (ko, nodeAccessor, forceBindings=false) {
    this.ko = ko;
    this.nodeAccessor = nodeAccessor;
    this.forceBindings = forceBindings;
    this.init = this.init.bind(this);
  }

  preprocess (value, name, addBindingCallback) {
    return value || 'bindings';
  }

  init (element, valueAccessor, allBindings, viewModel, bindingContext) {
    const bindings = valueAccessor();

    if (this.forceBindings) {
      Object.keys(bindings).forEach(name => {
        if (!this.ko.isSubscribable(bindings[name])) {
          bindings[name] = this.ko.observable(bindings[name]);
        }
      });
    }

    this.ko.applyBindingsToNode(this.nodeAccessor(element), bindings, bindingContext);
  }
}

export {applyBindingsBinding};
