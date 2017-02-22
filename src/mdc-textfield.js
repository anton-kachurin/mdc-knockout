var MDCTextfield = mdc.textfield.MDCTextfield;

ko.bindingHandlers['mdc-css'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      var value = ko.unwrap(valueAccessor());
      ko.utils.objectForEach(value, function (key, value) {
        if (ko.unwrap(value)) {
          ko.utils.toggleDomNodeCssClass(element, key, true);
        }
      });
    }
};

function TextfieldViewModel (params) {
  this.value = params.value;
  this.hint = params.hint;
}

TextfieldViewModel.prototype.fn = function () {
  console.log('fn called')
}

var template = `
<label class="mdc-textfield" data-bind="mdc-css: {
  'mdc-textfield--upgraded': value
}">
  <input type="text" class="mdc-textfield__input" data-bind="value: value">
  <span class="mdc-textfield__label" data-bind="
    text: hint,
    mdc-css: {
      'mdc-textfield__label--float-above': value
    }"
  ></span>
</label>
`;

ko.components.register('mdc-textfield', {
    viewModel: {
      createViewModel: function(params, componentInfo) {
        var root = componentInfo.element.children[0];
        MDCTextfield.attachTo(root);
        return new TextfieldViewModel(params);
      }
    },
    template: template
});
