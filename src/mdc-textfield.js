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
}

ko.bindingHandlers['mdc-css'] = {
  init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    function toggleClass(classname, value) {
      ko.utils.toggleDomNodeCssClass(element, classname, value);
    }

    var classList = ko.unwrap(valueAccessor());

    ko.utils.objectForEach(classList, function (key, value) {
      var classname = bindingContext.$component.foundation.cssClasses[key];
      if (ko.unwrap(value)) {
        toggleClass(classname, true);
      }
      if (ko.isSubscribable(value)) {
        value.subscribe( function (value) {
          toggleClass(classname, value)
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

function TextfieldViewModel (params, root) {
  var self = this;
  self.foundation = foundation;
  self.constructor = MDCTextfield;
  self.root = root;
  self.instance = ko.observable({});

  self.ariaControls = randomStr('textfield-helptext');

  self.value = params.value;
  self.label = params.label;
  self.help = params.help;
  self.persistant = params.persistant;
  self.disabled = params.disabled;
}

TextfieldViewModel.prototype.initialize = function () {
  var self = this;
  self.instance().disabled = ko.unwrap(self.disabled);
  if (ko.isSubscribable(self.disabled)) {
    self.disabled.subscribe( function (value) {
      self.instance().disabled = value;
    });
  }
}

var template = `
<label class="mdc-textfield">
  <input type="text" class="mdc-textfield__input" data-bind="
    value: value,
    attr: { 'aria-controls': ko.unwrap(help) && ariaControls}
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
      mdc-css: { HELPTEXT_PERSISTENT: persistant },
      mdc-attr: { ARIA_HIDDEN: !ko.unwrap(persistant) }
     ">
  </p>
<!-- /ko -->
<span data-bind="mdc-instance: $component.instance"></span>
`;

ko.components.register('mdc-textfield', {
    viewModel: {
      createViewModel: function(params, componentInfo) {
        var root = componentInfo.element.children[0];
        return new TextfieldViewModel(params, root);
      }
    },
    template: template
});
