import {toJS, isSubscribable} from './util.js';

class DisposableViewModel {
  constructor () {
    this.subscriptions_ = [];
  }

  /***
  Keep track of the external dependencies.
  Use for every ko.computed or subscription created inside a ViewModel:

  Usage:
    this.track = someObservable.subscribe( () => void );

  or:
    this.track = ko.computed( () => someObservable1() + someObservable2() )

  Note: ko.pureComputed do not require any tracking
  */
  set track (subscription) {
    this.subscriptions_.push(subscription);
  }

  dispose () {
    this.subscriptions_.forEach(item => item.dispose());
  }
}

class PlainViewModel extends DisposableViewModel {
  randomPrefixed (prefix) {
    return prefix + '-' + Math.floor(Math.random() * 1000000)
  }

  constructor (root, params, attrs) {
    super();
    this.root = root;
    this.attrs = attrs;

    const defaultParams = this.defaultParams();
    Object.keys(defaultParams).forEach( name => {
      const defaultValue = defaultParams[name];
      if (params.hasOwnProperty(name)) {
        this[name] = params[name];
        delete params[name];
      }
      else {
        this[name] = defaultValue;
      }
    });

    this.unwrapParams().forEach(name => {
      this[name] = toJS(this[name]);
    });

    if (params && params.hasOwnProperty('$raw')) {
      delete params.$raw;
    }

    if (params && params.hasOwnProperty('')) {
      delete params[''];
    }

    this.bindings = params;

    this.extend();
  }

  extend () {

  }

  defaultParams () {
    return {}
  }

  unwrapParams () {
    return []
  }
}

class ComponentViewModel extends PlainViewModel {
  constructor (root, params, attrs, MDCComponent, MDCFoundation) {
    super(root, params, attrs);

    this.MDCFoundation = MDCFoundation;
    this.MDCComponent = MDCComponent;
    this.instance = null;
  }

  initialize (parent) {

  }

  dispose () {
    super.dispose();
    this.instance && this.instance.destroy();
  }
}

class HookableComponentViewModel extends ComponentViewModel {
  constructor (...args) {
    super(...args);

    // don't have to use super() in the extending class method
    let init = this.initialize.bind(this);
    this.initialize = parent => {
      init(parent);
      this.installHooks_();
    }
  }

  get forceBindings () {
    // e.g return ['disable']
    throw new Error('Define "forceBindings" property in your class')
  }

  get hookedElement () {
    // e.g return this.root.querySelector('input')
    throw new Error('Define "hookedElement" property in your class')
  }

  get hookedProperties () {
    // e.g return {'disabled': state => {}}
    throw new Error('Define "hookedProperties" property in your class')
  }

  installHooks_ () {
    const element = this.hookedElement;
    const elementProto = Object.getPrototypeOf(element);

    Object.keys(this.hookedProperties).forEach(propertyName => {
      let desc = Object.getOwnPropertyDescriptor(element, propertyName);
      if (!desc) {
        desc = Object.getOwnPropertyDescriptor(elementProto, propertyName);
      }
      // We have to check for this descriptor, since some browsers (Safari) don't support its return.
      // See: https://bugs.webkit.org/show_bug.cgi?id=49739
      if (validDescriptor(desc)) {
        Object.defineProperty(element, propertyName, {
          get: desc.get,
          set: (state) => {
            desc.set.call(element, state);
            this.hookedProperties[propertyName](state);
          },
          configurable: desc.configurable,
          enumerable: desc.enumerable,
        });
      }
    });
  }

  uninstallHooks_ () {

  }

  dispose () {
    this.uninstallHooks_();
    super.dispose();
  }
}

function validDescriptor(elementPropDesc) {
  return elementPropDesc && typeof elementPropDesc.set === 'function';
}

class CheckableComponentViewModel extends ComponentViewModel {
  constructor (...args) {
    super(...args);
    this.verifyId();
  }

  verifyId () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('checkable-auto-id');
    }

    let init = this.initialize.bind(this);
    this.initialize = parent => {
      if (parent && isSubscribable(parent.for)) {
        parent.instance.input = this.instance;
        parent.for(this.attrs['id']);
      }
      init(parent);
    }
  }
}

export default ComponentViewModel;
export { DisposableViewModel, PlainViewModel, ComponentViewModel, HookableComponentViewModel, CheckableComponentViewModel };
