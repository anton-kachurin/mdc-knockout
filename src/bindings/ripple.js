import {MDCRipple} from '@material/ripple';

class rippleUtil {
  static instantiate (rippleClass, element) {
    return rippleClass.attachTo(element);
  }
}

class rippleBinding {
  constructor (ko, util) {
    this.ko = ko;
    this.util = util;
    this.init = this.init.bind(this);
  }

  init (element, valueAccessor, allBindings, viewModel, bindingContext) {
    const ripple = this.util.instantiate(MDCRipple, element);
    element['MDCRipple'] = ripple;

    this.ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
      element['MDCRipple'].destroy();
    });
  }
}

export {rippleBinding, rippleUtil};
