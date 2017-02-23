var MDCTextfield = mdc.textfield.MDCTextfield;
var foundation = mdc.textfield.MDCTextfieldFoundation;

var randomStr = function (prefix) {
  return prefix + '-' + Math.floor(Math.random() * 1000000)
}

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

ComponentViewModel.prototype.initialize = function () {};

function TextfieldViewModel (root, params, attrs) {
  ComponentViewModel.call(this, root, params, attrs, foundation, MDCTextfield)
  var self = this;

  self.ariaControls = randomStr('textfield-helptext');
  self.attrs['aria-controls']= ko.unwrap(self.help) && self.ariaControls;

  if (params.hasOwnProperty('value') || params.hasOwnProperty('textInput')) {
    self.float = ko.unwrap(params.value) || ko.unwrap(params.textInput);
  }
}

TextfieldViewModel.prototype.defaultParams = function () {
  return {
    label: '',
    help: '',
    persist: false,
    disable: false,
    validate: false,
    float: false,
    multiline: false,
    fullwidth: false
  }
};

TextfieldViewModel.prototype.initialize = function () {
  var self = this;
  self.instance().disabled = ko.unwrap(self.disable);
  if (ko.isSubscribable(self.disable)) {
    self.disable.subscribe( function (value) {
      self.instance().disabled = value;
    });
  }
};

var template = `
<label class="mdc-textfield" data-bind="
  css: {
    'mdc-textfield--multiline': ko.unwrap(multiline),
    'mdc-textfield--fullwidth': ko.unwrap(fullwidth)
  }
">
  <!-- ko ifnot: ko.unwrap(multiline) -->
    <input class="mdc-textfield__input" data-bind="
      mdc-bindings: bindings,
      attr: attrs
    ">
  <!-- /ko -->
  <!-- ko if: ko.unwrap(multiline) -->
    <textarea class="mdc-textfield__input" data-bind="
      mdc-bindings: bindings,
      attr: attrs
    "></textarea>
  <!-- /ko -->
  <!-- ko ifnot: ko.unwrap(fullwidth) -->
    <span class="mdc-textfield__label" data-bind="
      text: label,
      mdc-css: { LABEL_FLOAT_ABOVE: float }
    "></span>
  <!-- /ko -->
</label>
<!-- ko if: help -->
<!-- ko ifnot: ko.unwrap(multiline) -->
<!-- ko ifnot: ko.unwrap(fullwidth) -->
  <p class="mdc-textfield-helptext"
     data-bind="
      text: help,
      attr: { id: ariaControls },
      mdc-css: {
        HELPTEXT_PERSISTENT: persist,
        HELPTEXT_VALIDATION_MSG: validate
      },
      mdc-attr: { ARIA_HIDDEN: !ko.unwrap(persist) }
     ">
  </p>
<!-- /ko -->
<!-- /ko -->
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
        return new TextfieldViewModel(root, params, attrs);
      }
    },
    template: template
});
