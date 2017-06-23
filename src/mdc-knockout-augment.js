import {MDCRipple} from '@material/ripple';
import {initializeBinding, initializeUtil} from './bindings/initialize';
import {childrenBinding, childrenUtil} from './bindings/children';
import {childrenTransformBinding, childrenTransformUtil} from './bindings/children-transform';
import {childrenFilterBinding, childrenFilterUtil} from './bindings/children-filter';
import {applyBindingsBinding} from './bindings/apply-bindings';
import {applyAttributesBinding} from './bindings/apply-attributes';
import {rippleBinding, rippleUtil} from './bindings/ripple';

function registerBindings (ko) {
  ko.bindingHandlers['mdc-initialize'] = new initializeBinding(ko, initializeUtil);
  ko.virtualElements.allowedBindings['mdc-initialize'] = true;

  ko.bindingHandlers['mdc-children'] = new childrenBinding(ko, childrenUtil);
  ko.virtualElements.allowedBindings['mdc-children'] = true;

  ko.bindingHandlers['mdc-children-transform'] = new childrenTransformBinding(ko, childrenTransformUtil);
  ko.virtualElements.allowedBindings['mdc-children-transform'] = true;

  ko.bindingHandlers['mdc-children-filter'] = new childrenFilterBinding(ko, childrenFilterUtil);
  ko.virtualElements.allowedBindings['mdc-children-filter'] = true;

  ko.bindingHandlers['mdc-bindings'] = new applyBindingsBinding(ko, element => element, true);

  ko.bindingHandlers['mdc-container-bindings'] = new applyBindingsBinding(ko, element => element.parentNode);
  ko.virtualElements.allowedBindings['mdc-container-bindings'] = true;

  ko.bindingHandlers['mdc-attrs'] = new applyAttributesBinding(ko, element => element, true);

  ko.bindingHandlers['mdc-container-attrs'] = new applyAttributesBinding(ko, element => element.parentNode);
  ko.virtualElements.allowedBindings['mdc-container-attrs'] = true;

  ko.bindingHandlers['mdc-ripple'] = new rippleBinding(ko, rippleUtil);
}

function registerComponent (ko, name, template, viewModelConstructor, MDCComponent) {
  if (MDCComponent) {
    template += '<!-- ko mdc-initialize --><!-- /ko -->';
  }

  ko.components.register(name, {
    template: template,
    viewModel: {
      createViewModel: function(params, componentInfo) {
        var element = componentInfo.element;
        var root = element;
        var attributes = element.attributes;
        var attrs = {}
        var names = [];

        [].map.call(attributes, function (attr) {
          var attrName = attr.name.toLowerCase();
          if (attrName != 'params'
           && attrName != 'class'
           && attrName != 'data-bind') {
            attrs[attr.name] = attr.value;
            names.push(attr.name);
          }
          return attr;
        });
        names.forEach(function (name) {
          element.removeAttribute(name);
        });

        return new viewModelConstructor(root, params, attrs, MDCComponent);
      }
    }
  });
};

export default {registerBindings, registerComponent};
