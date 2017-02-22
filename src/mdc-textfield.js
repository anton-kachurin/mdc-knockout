var MDCTextfield = mdc.textfield.MDCTextfield;
var foundation = mdc.textfield.MDCTextfieldFoundation;

ko.bindingHandlers['mdc-css'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      console.log(bindingContext)
      var value = ko.unwrap(valueAccessor());
      ko.utils.objectForEach(value, function (key, value) {
        if (ko.unwrap(value)) {
          var classname = bindingContext.$component.foundation.cssClasses[key];
          ko.utils.toggleDomNodeCssClass(element, classname, true);
        }
      });
    }
};

function TextfieldViewModel (params, instance) {
  var self = this;
  self.foundation = foundation;
  self.instance = instance;

  self.value = params.value;
  self.label = params.label;

  self.disabled = params.disabled;
  self.instance.disabled = ko.unwrap(self.disabled);
  if (ko.isSubscribable(self.disabled)) {
    self.disabled.subscribe( function (value) {
      self.instance.disabled = value;
    });
  }
}

TextfieldViewModel.prototype.fn = function () {
  console.log('fn called')
}

var template = `
<label class="mdc-textfield" data-bind="mdc-css: { UPGRADED: value }">
  <input type="text" class="mdc-textfield__input" data-bind="value: value">
  <span class="mdc-textfield__label" data-bind="
    text: label,
    mdc-css: { LABEL_FLOAT_ABOVE: value }"
  ></span>
</label>
`;

ko.components.register('mdc-textfield', {
    viewModel: {
      createViewModel: function(params, componentInfo) {
        var root = componentInfo.element.children[0];
        var instance = MDCTextfield.attachTo(root);
        return new TextfieldViewModel(params, instance);
      }
    },
    template: template
});
