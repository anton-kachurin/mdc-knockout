if (!ko.getBindingHandler('mdc-instance')) {
  ko.bindingHandlers['mdc-instance'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      var root = bindingContext.$component.root;
      var instance = bindingContext.$component.attachTo(root);
      bindingContext.$component.instance(instance);
      bindingContext.$component.initialize(bindingContext['mdc-parent'])
    }
  };
  ko.virtualElements.allowedBindings['mdc-instance'] = true;
}

if (!ko.getBindingHandler('mdc-child')) {
  ko.bindingHandlers['mdc-child'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

      var child = valueAccessor()[1];
      var newBindingContext = bindingContext.$parentContext.extend(function () {
        return {'mdc-parent': bindingContext.$component}
      });

      ko.virtualElements.prepend(element, child)
      ko.applyBindingsToDescendants(newBindingContext, element);

      return { controlsDescendantBindings: true }
    }
  }
  ko.virtualElements.allowedBindings['mdc-child'] = true;
}

if (!ko.getBindingHandler('mdc-bindings')) {
  ko.bindingHandlers['mdc-bindings'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      ko.applyBindingsToNode(element, valueAccessor(), bindingContext);
    }
  };
}

if (!ko.getBindingHandler('mdc-css')) {
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
}

if (!ko.getBindingHandler('mdc-attr')) {
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
}

window.register = window.register || function (name, viewModelConstructor, template) {
  ko.components.register(name, {
      viewModel: {
        createViewModel: function(params, componentInfo) {
          var element = componentInfo.element;
          var root = element.children[0];
          var attributes = element.attributes;
          var attrs = {}
          var names = [];
          ko.utils.arrayForEach(attributes, function (attr) {
            var attrName = attr.name.toLowerCase();
            if (attrName != 'params'
             && attrName != 'class'
             && attrName != 'data-bind') {
              attrs[attr.name] = attr.value;
              names.push(attr.name);
            }
          });
          ko.utils.arrayForEach(names, function (name) {
            element.removeAttribute(name);
          });
          return new viewModelConstructor(root, params, attrs);
        }
      },
      template: template
  });
};
