var MDCTextfield = mdc.textfield.MDCTextfield;
var foundation = mdc.textfield.MDCTextfieldFoundation;

var randomStr = function (prefix) {
  return prefix + '-' + Math.floor(Math.random() * 1000000)
}

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
  self.ariaControls = randomStr('textfield-helptext');

  self.value = params.value;
  self.label = params.label;
  self.help = params.help;
  self.persistant = params.persistant;
  var persistant = ko.unwrap(self.persistant);


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
  <!-- ko ifnot: persistant -->
    <p class="mdc-textfield-helptext"
       data-bind="
        text: help,
        attr: { id: ariaControls }
       ">
    </p>
  <!-- /ko -->
  <!-- ko if: persistant -->
    <p class="mdc-textfield-helptext mdc-textfield-helptext--persistent"
       data-bind="
        text: help,
        attr: { id: ariaControls }
       ">
    </p>
  <!-- /ko -->
<!-- /ko -->
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
