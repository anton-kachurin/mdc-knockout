import ComponentViewModel from './mdc-knockout-base';
import template from './templates/textfield.html';

export default class TextfieldViewModel extends ComponentViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('textfield-auto-id');
    }

    this.ariaControls = this.randomPrefixed('textfield-helptext');
    this.attrs['aria-controls'] = ko.unwrap(this.help) && this.ariaControls;

    const params = this.bindings;
    if (params.hasOwnProperty('value') || params.hasOwnProperty('textInput')) {
      this.float = ko.unwrap(params.value) || ko.unwrap(params.textInput);
    }

    if (this.fullwidth) {
      this.attrs['aria-label'] = this.label;
    }
  }

  initialize () {
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
      persist: false,
      disable: false,
      validate: false,
      float: false,
      invalid: false,
      multiline: false,
      fullwidth: false
    }
  }

  unwrapParams () {
    return ['multiline', 'fullwidth', 'float', 'invalid']
  }

  static get TEMPLATE () {
    return template();
  }
}
