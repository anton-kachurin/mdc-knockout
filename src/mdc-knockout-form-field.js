import ComponentViewModel from './mdc-knockout-base'

export default class FormFieldViewModel extends ComponentViewModel {
  defaultParams () {
    return {
      alignEnd: false
    }
  }

  static template () {
    return template;
  }
}

const template = `
<div class="mdc-form-field" data-bind="
  css: { 'mdc-form-field--align-end': alignEnd }
">
<!-- ko mdc-child: true --><!-- /ko -->
<label data-bind="mdc-bindings: bindings, attr: attrs"></label>
</div>
<!-- ko mdc-instance: true --><!-- /ko -->
`;
