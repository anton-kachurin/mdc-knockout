import ComponentViewModel from './mdc-knockout-base'
import {MDCFormField, MDCFormFieldFoundation} from '@material/form-field';

FormFieldViewModel.prototype = Object.create(ComponentViewModel.prototype);
FormFieldViewModel.prototype.constructor = FormFieldViewModel;

function FormFieldViewModel (root, params, attrs) {
  ComponentViewModel.call(this, root, params, attrs,
                          MDCFormFieldFoundation, MDCFormField);
}

FormFieldViewModel.prototype.defaultParams = function () {
  return {
    alignEnd: false
  }
};

FormFieldViewModel.template = function () {
  return `
<div class="mdc-form-field" data-bind="
  css: { 'mdc-form-field--align-end': alignEnd }
">
  <!-- ko mdc-child: true --><!-- /ko -->
  <label data-bind="mdc-bindings: bindings, attr: attrs"></label>
</div>
<!-- ko mdc-instance: true --><!-- /ko -->
`;
};

export default FormFieldViewModel;
