function ComponentViewModel (root, params, attrs, MDCFoundation, MDCComponent) {
  var self = this;

  self.root = root;
  self.foundation = MDCFoundation;
  self.attachTo = MDCComponent.attachTo;
  self.instance = ko.observable({});

  ko.utils.objectForEach(this.defaultParams(), function (name, defaultValue) {
    if (params.hasOwnProperty(name)) {
      self[name] = params[name];
      delete params[name];
    }
    else {
      self[name] = defaultValue;
    }
  });

  ko.utils.arrayForEach(this.unwrapParams(), function (name) {
    self[name] = ko.toJS(self[name]);
  });

  delete params.$raw;

  if (params.hasOwnProperty('')) {
    delete params[''];
  }

  self.bindings = params;

  self.attrs = attrs;
}

ComponentViewModel.prototype.defaultParams = function () {
  return {}
};

ComponentViewModel.prototype.unwrapParams = function () {
  return []
};

ComponentViewModel.prototype.initialize = function (parent) {};
