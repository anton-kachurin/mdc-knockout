import ComponentViewModel from './mdc-knockout-base';
import template from './templates/form-field.html';

export default class FormFieldViewModel extends ComponentViewModel {
  extend () {
    this.for = ko.observable('');
    if (!this.attrs['for']) {
      this.attrs['for'] = this.for;
    }
  }

  defaultParams () {
    return {
      alignEnd: false
    }
  }

  static get TEMPLATE () {
    return template();
  }
}
