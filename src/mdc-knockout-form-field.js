import ComponentViewModel from './mdc-knockout-base';
import FormFieldTemplate from './templates/form-field.html';

class FormFieldViewModel extends ComponentViewModel {
  extend () {
    this.for = ko.observable('');
    if (!this.attrs['for']) {
      this.attrs['for'] = this.for;
    }

    this.nodeFilter = (child) => {
      if (!('text' in this.bindings) && child.nodeType == 3) {
        let text = child.textContent;
        if (text.match(/[^\s]/)) {
          this.bindings.text = text;
        }
        return false;
      }
      return true;
    }
  }

  defaultParams () {
    return {
      alignEnd: false
    }
  }
}

export {FormFieldTemplate, FormFieldViewModel};
