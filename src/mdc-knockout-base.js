class ComponentViewModel {
  randomPrefixed (prefix) {
    return prefix + '-' + Math.floor(Math.random() * 1000000)
  }

  constructor (root, params, attrs, MDCComponent, MDCFoundation) {
    this.root = root;
    this.foundation = MDCFoundation;
    this.attachTo = MDCComponent.attachTo;
    this.instance = ko.observable({});

    ko.utils.objectForEach(this.defaultParams(), (name, defaultValue) => {
      if (params.hasOwnProperty(name)) {
        this[name] = params[name];
        delete params[name];
      }
      else {
        this[name] = defaultValue;
      }
    });

    ko.utils.arrayForEach(this.unwrapParams(),
                          name => this[name] = ko.toJS(this[name]));

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

  initialize (parent) {

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

export default ComponentViewModel;

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
      }
      init(parent);
    }
  }
}

export { CheckableComponentViewModel };
