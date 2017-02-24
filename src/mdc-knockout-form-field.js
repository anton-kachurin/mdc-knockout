var MDCFormField = mdc.formField.MDCFormField;
var foundation = mdc.formField.MDCFormFieldFoundation;

FormFieldViewModel.prototype = Object.create(ComponentViewModel.prototype);
FormFieldViewModel.prototype.constructor = FormFieldViewModel;

function FormFieldViewModel (root, params, attrs) {
  ComponentViewModel.call(this, root, params, attrs, foundation, MDCFormField);
}

FormFieldViewModel.prototype.defaultParams = function () {
  return {
    alignEnd: false
  }
};

var template = `
<div class="mdc-form-field" data-bind="
  css: { 'mdc-form-field--align-end': alignEnd }
">
  <!-- ko mdc-child: $componentTemplateNodes --><!-- /ko -->
  <label data-bind="mdc-bindings: bindings, attr: attrs">Input Label</label>
</div>
<span data-bind="mdc-instance: $component.instance"></span>
`;

register('mdc-form-field', FormFieldViewModel, template);
