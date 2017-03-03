import ComponentViewModel from './mdc-knockout-base';

export default class TextfieldViewModel extends ComponentViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomStr('textfield-auto-id');
    }

    this.ariaControls = this.randomStr('textfield-helptext');
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
      this.disable.subscribe( value => {
        this.instance().disabled = value;
      });
    }
  }

  randomStr (prefix) {
    return prefix + '-' + Math.floor(Math.random() * 1000000)
  }

  defaultParams () {
    return {
      label: '',
      help: '',
      persist: false,
      disable: false,
      validate: false,
      float: false,
      multiline: false,
      fullwidth: false
    }
  }

  unwrapParams () {
    return ['multiline', 'fullwidth', 'float']
  }

  static template () {
    return template;
  }
}

const template = `
<div class="mdc-textfield" data-bind="
  css: {
    'mdc-textfield--multiline': multiline,
    'mdc-textfield--fullwidth': fullwidth
  }
">
  <!-- ko ifnot: multiline -->
    <input class="mdc-textfield__input" data-bind="
      mdc-bindings: bindings,
      attr: attrs
    ">
  <!-- /ko -->
  <!-- ko if: multiline -->
    <textarea class="mdc-textfield__input" data-bind="
      mdc-bindings: bindings,
      attr: attrs
    "></textarea>
  <!-- /ko -->
  <!-- ko ifnot: fullwidth -->
    <label class="mdc-textfield__label" data-bind="
      text: label,
      mdc-css: { LABEL_FLOAT_ABOVE: float },
      attr: {
        for: attrs.id
      }
    "></label>
  <!-- /ko -->
</div>
<!-- ko if: help -->
<!-- ko ifnot: multiline -->
<!-- ko ifnot: fullwidth -->
  <p class="mdc-textfield-helptext"
     data-bind="
      text: help,
      attr: { id: ariaControls },
      mdc-css: {
        HELPTEXT_PERSISTENT: persist,
        HELPTEXT_VALIDATION_MSG: validate
      },
      mdc-attr: { ARIA_HIDDEN: persist }
     ">
  </p>
<!-- /ko -->
<!-- /ko -->
<!-- /ko -->
<!-- ko mdc-instance: true --><!-- /ko -->
`;
