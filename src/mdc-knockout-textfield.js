import ComponentViewModel from './mdc-knockout-base';
import template from './templates/textfield.html';

export default class TextfieldViewModel extends ComponentViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('textfield-auto-id');
    }

    this.ariaControls = this.randomPrefixed('textfield-helptext');
    this.attrs['aria-controls'] = ko.unwrap(this.help) && this.ariaControls;

    this.updateLabel(this.label);

    this.nodeFilter = (child) => {
      function textNotEmpty (text) {
        return text.match(/[^\s]/);
      }

      if (!this.label && child.nodeType == 3) {
        let text = child.textContent;
        if (textNotEmpty(text)) {
          this.updateLabel(text);
        }
      }
      if (!this.help && child.nodeType == 1 && child.tagName == 'P') {
        let text = child.textContent;
        if (textNotEmpty(text)) {
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
      }
      return false;
    }
  }

  updateLabel (label) {
    label = ko.unwrap(label);
    if (this.fullwidth) {
      if (!this.attrs['aria-label']) {
        this.attrs['aria-label'] = ko.observable();
      }
      this.attrs['aria-label'](label);
    }

    if (ko.isSubscribable(this.label)) {
      this.label(label);
    }
    else {
      this.label = label;
    }
  }

  initialize () {
    if ('disabled' in this.attrs) {
      this.disable = true;
    }

    this.instance().disabled = ko.unwrap(this.disable);
    if (ko.isSubscribable(this.disable)) {
      this.track = this.disable.subscribe( value => {
        this.instance().disabled = value;
      });
    }
  }

  defaultParams () {
    return {
      label: '',
      help: '',
      persistent: false,
      validation: false,
      invalid: false,
      multiline: false,
      fullwidth: false,
      disable: false
    }
  }

  unwrapParams () {
    return ['multiline', 'fullwidth', 'invalid']
  }

  static get TEMPLATE () {
    return template();
  }
}
