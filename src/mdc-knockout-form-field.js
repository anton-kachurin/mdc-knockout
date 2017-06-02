import ComponentViewModel from './mdc-knockout-base';
import FormFieldTemplate from './templates/form-field.html';

class FormFieldViewModel extends ComponentViewModel {
  extend () {
    this.nodeFilter = (child) => {
      if (!this.label && child.nodeType == 3) {
        let text = child.textContent;
        if (text.match(/[^\s]/)) {
          this.label = text;
        }
        return false;
      }
      return true;
    }
  }

  get labelElement_ () {
    return this.root.querySelector('label');
  }

  attrFor (value) {
    if (!this.attrs['for']) {
      this.labelElement_.setAttribute('for', value);
    }
  }

  get defaultParams () {
    return {
      alignEnd: false,
      label: ''
    }
  }
}

export {FormFieldTemplate, FormFieldViewModel};
