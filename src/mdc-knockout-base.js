import {toJS as ko_toJS} from 'knockout';

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

    this.unwrapParams().forEach(name => this[name] = ko_toJS(this[name]));

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
      if (parent && ko.isSubscribable(parent.for)) {
        parent.instance.input = this.instance;
        parent.for(this.attrs['id']);
      }
      init(parent);
    }
  }
}

export default ComponentViewModel;
export { DisposableViewModel, PlainViewModel, ComponentViewModel, CheckableComponentViewModel };
