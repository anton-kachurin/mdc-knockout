ko.bindingHandlers['mdc-instance'] = {
  init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    var root = bindingContext.$component.root;
    var instance = bindingContext.$component.attachTo(root);
    valueAccessor()(instance);
    bindingContext.$component.initialize()
  }
};

ko.bindingHandlers['mdc-bindings'] = {
  init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    ko.applyBindingsToNode(element, valueAccessor(), bindingContext);
  }
}

ko.bindingHandlers['mdc-css'] = {
  init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    function toggleClass(className, value) {
      ko.utils.toggleDomNodeCssClass(element, className, value);
    }

    var classList = ko.unwrap(valueAccessor());

    ko.utils.objectForEach(classList, function (key, value) {
      var className = bindingContext.$component.foundation.cssClasses[key];
      if (ko.unwrap(value)) {
        toggleClass(className, true);
      }
      if (ko.isSubscribable(value)) {
        value.subscribe( function (value) {
          toggleClass(className, value)
        });
      }
    });
  }
};

ko.bindingHandlers['mdc-attr'] = {
  init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    var attrList = ko.unwrap(valueAccessor());

    ko.utils.objectForEach(attrList, function (key, value) {
      var attrName = bindingContext.$component.foundation.strings[key];
      if (ko.unwrap(value)) {
        element.setAttribute(attrName, true);
      }
    });
  }
};

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

ComponentViewModel.prototype.initialize = function () {};
