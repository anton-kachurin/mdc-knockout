var MDCTextfield = mdc.textfield.MDCTextfield;
var foundation = mdc.textfield.MDCTextfieldFoundation;

var randomStr = function (prefix) {
  return prefix + '-' + Math.floor(Math.random() * 1000000)
}

function TextfieldViewModel (root, params, attrs) {
  ComponentViewModel.call(this, root, params, attrs, foundation, MDCTextfield)
  var self = this;

  self.ariaControls = randomStr('textfield-helptext');
  self.attrs['aria-controls']= ko.unwrap(self.help) && self.ariaControls;

  if (params.hasOwnProperty('value') || params.hasOwnProperty('textInput')) {
    self.float = ko.unwrap(params.value) || ko.unwrap(params.textInput);
  }
}

TextfieldViewModel.prototype.defaultParams = function () {
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
};

TextfieldViewModel.prototype.unwrapParams = function () {
  return ['multiline', 'fullwidth', 'float']
}

TextfieldViewModel.prototype.initialize = function () {
  var self = this;
  self.instance().disabled = ko.unwrap(self.disable);
  if (ko.isSubscribable(self.disable)) {
    self.disable.subscribe( function (value) {
      self.instance().disabled = value;
    });
  }
};

var template = `
<label class="mdc-textfield" data-bind="
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
    <span class="mdc-textfield__label" data-bind="
      text: label,
      mdc-css: { LABEL_FLOAT_ABOVE: float }
    "></span>
  <!-- /ko -->
</label>
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

register('mdc-textfield', TextfieldViewModel, template);
