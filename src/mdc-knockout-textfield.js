import ComponentViewModel from './mdc-knockout-base';
import TextfieldTemplate from './templates/textfield.html';

class TextfieldViewModel extends ComponentViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('textfield-auto-id');
    }

    this.attrs['aria-controls'] = this.randomPrefixed('textfield-helptext');

    if (this.fullwidth) {
      this.attrs['aria-label'] = this.label;
      this.attrs['placeholder'] = this.label;
    }
  }

  nodeFilter (child) {
    if (!this.label && child.nodeType == 3) {
      let text = child.textContent;

      // ignore empty text nodes
      if (text.match(/[^\s]/)) {
        this.label = text;
        if (this.fullwidth) {
          this.attrs['aria-label'] = text;
          this.attrs['placeholder'] = text;
        }
      }
    }

    if (!this.help && child.nodeType == 1 && child.tagName == 'P') {
      let text = child.textContent;
      this.help = text;
      for (let attr of child.attributes) {
        if (attr.name == 'persistent') {
          this.persistent = true;
        }

        if (attr.name == 'validation') {
          this.validation = true;
        }
      }
    }

    return false;
  }

  get forceBindings () {
    return {
      disable: () => ('disabled' in this.attrs)
    }
  }

  get defaultParams () {
    return {
      label: '',
      help: '',
      persistent: false,
      validation: false,
      invalid: false,
      multiline: false,
      fullwidth: false
    }
  }

  get unwrapParams () {
    return ['multiline', 'fullwidth', 'invalid']
  }
}

export {TextfieldTemplate, TextfieldViewModel};
