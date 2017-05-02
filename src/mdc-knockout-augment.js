import {MDCRipple} from '@material/ripple';

const WAS_BIND = 'mdc-bindings-already-added';

function registerBindings (ko) {
  if (ko[WAS_BIND]) {
    return undefined;
  }

  ko.bindingHandlers['mdc-bindings'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      ko.applyBindingsToNode(element, valueAccessor(), bindingContext);
    },
    preprocess: function (value, name, addBindingCallback) {
      return value || 'bindings';
    }
  };

  ko.bindingHandlers['mdc-attrs'] = {
    preprocess: function (value, name, addBindingCallback) {
      value = value || 'attrs';
      addBindingCallback('attr', value);
      return value;
    }
  };

  ko.bindingHandlers['mdc-parent-bindings'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      ko.applyBindingsToNode(element.parentNode, valueAccessor(), bindingContext);
    },
    preprocess: function (value, name, addBindingCallback) {
      return value || 'bindings';
    }
  }
  ko.virtualElements.allowedBindings['mdc-parent-bindings'] = true;

  ko.bindingHandlers['mdc-parent-attrs'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      ko.applyBindingsToNode(element.parentNode, {attr: valueAccessor()}, bindingContext);
    },
    preprocess: function (value, name, addBindingCallback) {
      return value || 'attrs';
    }
  }
  ko.virtualElements.allowedBindings['mdc-parent-attrs'] = true;

  ko.bindingHandlers['mdc-child'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

      var newBindingContext = bindingContext.$parentContext.extend(function () {
        return { 'mdc-parent': bindingContext.$component };
      });

      var filterFunction = valueAccessor();

      var children = bindingContext.$componentTemplateNodes;
      ko.utils.arrayForEach(children.reverse(), function (child) {
        if (!filterFunction || (filterFunction && filterFunction(child))) {
          ko.virtualElements.prepend(element, child);
        }
      });

      ko.applyBindingsToDescendants(newBindingContext, element);

      return { controlsDescendantBindings: true }
    }
  }
  ko.virtualElements.allowedBindings['mdc-child'] = true;

  ko.bindingHandlers['mdc-ripple'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      var ripple = MDCRipple.attachTo(element);
      element['MDCRipple'] = ripple;

      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        ripple.destroy();
      });
    }
  };

  ko.bindingHandlers['mdc-css'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      function toggleClass(className, value) {
        ko.utils.toggleDomNodeCssClass(element, className, value);
      }

      var subscriptions_ = [];
      var classList = ko.unwrap(valueAccessor());

      ko.utils.objectForEach(classList, function (key, value) {
        var className = bindingContext.$component.MDCFoundation.cssClasses[key];
        if (ko.unwrap(value)) {
          toggleClass(className, true);
        }
        if (ko.isSubscribable(value)) {
          subscriptions_.push(
            value.subscribe( function (value) {
              toggleClass(className, value)
            })
          );
        }
      });

      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        ko.utils.arrayForEach(subscriptions_, function (subscription) {
          subscription.dispose()
        });
      });
    }
  };

  ko.bindingHandlers['mdc-attr'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      var attrList = ko.unwrap(valueAccessor());

      ko.utils.objectForEach(attrList, function (key, value) {
        var attrName = bindingContext.$component.MDCFoundation.strings[key];
        if (ko.unwrap(value)) {
          element.setAttribute(attrName, true);
        }
      });
    }
  };

  ko.bindingHandlers['mdc-instance'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      var root = bindingContext.$component.root;
      var MDCComponent = bindingContext.$component.MDCComponent;
      var instance = MDCComponent.attachTo(root.children[0]);
      root[MDCComponent.name] = instance;
      bindingContext.$component.instance(instance);
      bindingContext.$component.initialize(bindingContext['mdc-parent'])
    }
  };
  ko.virtualElements.allowedBindings['mdc-instance'] = true;

  ko[WAS_BIND] = true;
}

function registerComponent (ko, name, template, viewModelConstructor, MDCComponent, MDCFoundation) {
  ko.components.register(name, {
    template: template,
    viewModel: {
      createViewModel: function(params, componentInfo) {
        var element = componentInfo.element;
        var root = element;
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

        return new viewModelConstructor(
          root, params, attrs, MDCComponent, MDCFoundation
        );
      }
    }
  });
};

export default {registerBindings, registerComponent};
