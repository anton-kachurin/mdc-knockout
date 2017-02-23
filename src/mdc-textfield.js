var MDCTextfield = mdc.textfield.MDCTextfield;
var foundation = mdc.textfield.MDCTextfieldFoundation;

var randomStr = function (prefix) {
  return prefix + '-' + Math.floor(Math.random() * 1000000)
}

ko.bindingHandlers['mdc-instance'] = {
  init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    var root = bindingContext.$component.root;
    var instance = bindingContext.$component.constructor.attachTo(root);
    valueAccessor()(instance);
    bindingContext.$component.initialize()
  }
};

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

function TextfieldViewModel (params, root, attrs) {
  console.log(attrs)
  var self = this;
  self.foundation = foundation;
  self.constructor = MDCTextfield;
  self.root = root;
  self.instance = ko.observable({});

  self.ariaControls = randomStr('textfield-helptext');
  attrs['aria-controls']= ko.unwrap(params.help) && self.ariaControls;
  self.attrs = attrs

  self.value = params.value;
  self.label = params.label;
  self.help = params.help;
  self.persistent = params.persistent;
  self.disabled = params.disabled;
  self.validate = params.validate;
}

TextfieldViewModel.prototype.initialize = function () {
  var self = this;
  self.instance().disabled = ko.unwrap(self.disabled);
  if (ko.isSubscribable(self.disabled)) {
    self.disabled.subscribe( function (value) {
      self.instance().disabled = value;
    });
  }
};

var template = `
<label class="mdc-textfield">
  <input class="mdc-textfield__input" data-bind="
    value: value,
    attr: attrs
    ">
  <span class="mdc-textfield__label" data-bind="
    text: label,
    mdc-css: { LABEL_FLOAT_ABOVE: value }"
  ></span>
</label>
<!-- ko if: help -->
  <p class="mdc-textfield-helptext"
     data-bind="
      text: help,
      attr: { id: ariaControls },
      mdc-css: {
        HELPTEXT_PERSISTENT: persistent,
        HELPTEXT_VALIDATION_MSG: validate
      },
      mdc-attr: { ARIA_HIDDEN: !ko.unwrap(persistent) }
     ">
  </p>
<!-- /ko -->
<span data-bind="mdc-instance: $component.instance"></span>
`;

ko.components.register('mdc-textfield', {
    viewModel: {
      createViewModel: function(params, componentInfo) {
        var element = componentInfo.element;
        var root = element.children[0];
        var attributes = element.attributes;
        var attrs = {}
        var names = [];
        ko.utils.arrayForEach(attributes, function (attr) {
          if (attr.name.toLowerCase() != 'params'
           && attr.name.toLowerCase() != 'class') {
            attrs[attr.name] = attr.value;
            names.push(attr.name);
          }
        });
        ko.utils.arrayForEach(names, function (name) {
          element.removeAttribute(name);
        });
        return new TextfieldViewModel(params, root, attrs);
      }
    },
    template: template
});
