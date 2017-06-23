const constants = {
  PARENT_VIEW_MODEL: 'mdc-parent'
};

class childrenUtil {
  static output (ko, children, element) {
    children.reverse().forEach(child => {
      ko.virtualElements.prepend(element, child);
    });
  }

  static apply (ko, bindingContext, element) {
    const newBindingContext = bindingContext.$parentContext.extend(() => {
      const result = {};
      result[constants.PARENT_VIEW_MODEL] = bindingContext.$component;

      return result;
    });

    ko.applyBindingsToDescendants(newBindingContext, element);
  }
}

class childrenBinding {
  constructor (ko, util) {
    this.ko = ko;
    this.util = util;
    this.init = this.init.bind(this);
  }

  init (element, valueAccessor, allBindings, viewModel, bindingContext) {
    let children = bindingContext.$componentTemplateNodes;

    this.util.output(this.ko, children, element);
    this.util.apply(this.ko, bindingContext, element);

    return { controlsDescendantBindings: true }
  }
}

export {childrenBinding, childrenUtil, constants};
