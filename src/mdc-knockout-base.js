class PlainViewModel {
  randomPrefixed (prefix) {
    return prefix + '-' + Math.floor(Math.random() * 1000000)
  }

  constructor (root, params, attrs) {
    this.root = root;

    ko.utils.objectForEach(this.defaultParams(), (name, defaultValue) => {
      if (params.hasOwnProperty(name)) {
        this[name] = params[name];
        delete params[name];
      }
      else {
        this[name] = defaultValue;
      }
    });

    ko.utils.arrayForEach(
      this.unwrapParams(),
      name => this[name] = ko.toJS(this[name])
    );

    delete params.$raw;

    if (params.hasOwnProperty('')) {
      delete params[''];
    }

    this.bindings = params;

    this.attrs = attrs;

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

  static template () {
    return '';
  }

}

class ComponentViewModel extends PlainViewModel {
  constructor (root, params, attrs, MDCComponent, MDCFoundation) {
    super(root, params, attrs);

    this.foundation = MDCFoundation;
    this.attachTo = MDCComponent.attachTo;
    this.instance = ko.observable({});
  }

  initialize (parent) {

  }

  dispose () {
    this.instance().destroy();
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
      if (parent) {
        parent.instance().input = this.instance();
        parent.for(this.attrs['id']);
      }
      init(parent);
    }
  }
}

export default ComponentViewModel;
export { PlainViewModel, ComponentViewModel, CheckableComponentViewModel };
