import {MDCRipple} from '@material/ripple';
import {isSubscribable} from '../util';

class rippleUtil {
  static instantiate (rippleClass, element) {
    return rippleClass.attachTo(element);
  }

  static getHookableParameters (bindingContext) {
    const component = bindingContext.$component;
    const parameters = Object.keys(component.defaultParams);

    return parameters;
  }

  static hookParameters (bindingContext, parameters, callback) {
    const component = bindingContext.$component;
    const subscriptions = [];

    parameters.forEach(name => {
      const param = component[name];

      if (isSubscribable(param)) {
        const subscription = param.subscribe(callback);
        subscriptions.push(subscription)
      }
    });

    return subscriptions;
  }

  static disposeHooks (subscriptions) {
    subscriptions.forEach(subscription => {
      subscription.dispose();
    });
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

    const parameters = this.util.getHookableParameters(bindingContext);
    const subscriptions = this.util.hookParameters(bindingContext, parameters, () => {
      ripple.layout();
    });

    this.ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
      ripple.destroy();
      this.util.disposeHooks(subscriptions);
    });
  }
}

export {rippleBinding, rippleUtil};
