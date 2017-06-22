import {childrenUtil} from './children-util';

class childrenFilterUtil extends childrenUtil {
  static test (element, condition) {
    if (condition.nodeType) {
      return element.nodeType === condition.nodeType;
    }

    return false;
  }
}

class childrenFilterBinding {
  constructor (ko, util) {
    this.ko = ko;
    this.util = util;
    this.init = this.init.bind(this);
  }

  init (element, valueAccessor, allBindings, viewModel, bindingContext) {
    const condition = valueAccessor();
    const children = bindingContext.$componentTemplateNodes;
    const result = [];

    if (children.length) {
      children.forEach(child => {
        if (this.util.test(child, condition)) {
          result.push(child);
        }
      });
    }

    if (result.length) {
      this.util.output(this.ko, result, element);
      this.util.apply(this.ko, bindingContext, element);
    }

    return { controlsDescendantBindings: true }
  }
}

export {childrenFilterBinding, childrenFilterUtil};
