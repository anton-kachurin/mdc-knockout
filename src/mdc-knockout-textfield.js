import {ComponentViewModel} from './mdc-knockout-base';
import TextfieldTemplate from './templates/textfield.html';

class TextfieldViewModel extends ComponentViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('textfield-auto-id');
    }

    this.attrs['aria-controls'] = this.randomPrefixed('textfield-helptext');

    if (this.fullwidth && this.label) {
      this.attrs['aria-label'] = this.label;
      this.attrs['placeholder'] = this.label;
    }
  }

  get labelElement_ () {
    return this.root.querySelector('label');
  }

  get textElement_ () {
    return this.root.querySelector('input') || this.root.querySelector('textarea');
  }

  initialize () {
    if (this.fullwidth && !this.label) {
      const labelText = this.labelElement_.textContent;
      this.textElement_.setAttribute('aria-label', labelText);
      this.textElement_.setAttribute('placeholder', labelText);
    }
  }

  childrenTransform (children) {
    const result = [];

    children.forEach(child => {
      if (child.nodeType == 1 && child.tagName == 'P') {
        child.setAttribute('aria-hidden', true);
        child.setAttribute('id', this.attrs['aria-controls']);
        result.push(child);
      }
    });

    return result;
  }

  get forceBindings () {
    return {
      disable: () => ('disabled' in this.attrs)
    }
  }

  get defaultParams () {
    return {
      label: '',
      invalid: false,
      multiline: false,
      fullwidth: false,
      box: false
    }
  }

  get unwrapParams () {
    return ['multiline', 'fullwidth', 'invalid', 'box']
  }
}

export {TextfieldTemplate, TextfieldViewModel};
