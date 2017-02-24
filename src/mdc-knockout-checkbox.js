var MDCCheckbox = mdc.checkbox.MDCCheckbox;
var foundation = mdc.checkbox.MDCCheckboxFoundation;

CheckboxViewModel.prototype = Object.create(ComponentViewModel.prototype);
CheckboxViewModel.prototype.constructor = CheckboxViewModel;

function CheckboxViewModel (root, params, attrs) {
  ComponentViewModel.call(this, root, params, attrs, foundation, MDCCheckbox);
}

CheckboxViewModel.prototype.defaultParams = function () {
  return {
    indeterminate: true
  };
}

CheckboxViewModel.prototype.initialize = function () {
  var self = this;
  var checked = self.bindings.checked;
  var instance = self.instance();
  instance.indeterminate = ko.unwrap(self.indeterminate);
  if (ko.isSubscribable(self.indeterminate)) {
    self.indeterminate.subscribe(function (value) {
      if (value) {
        instance.indeterminate = true;
      }
    });
    if (ko.isSubscribable(checked)) {
      checked.subscribe(function (value) {
        self.indeterminate(false);
        if (instance.indeterminate) {
           instance.indeterminate = false;
        }
      });
    }
  }
}

var template = `
<div class="mdc-checkbox">
  <input type="checkbox"
         class="mdc-checkbox__native-control"
         data-bind="mdc-bindings: bindings, attr: attrs"/>
  <div class="mdc-checkbox__background">
    <svg version="1.1"
         class="mdc-checkbox__checkmark"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"
         xml:space="preserve">
      <path class="mdc-checkbox__checkmark__path"
            fill="none"
            stroke="white"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
    </svg>
    <div class="mdc-checkbox__mixedmark"></div>
  </div>
</div>
<span data-bind="mdc-instance: $component.instance"></span>
`;

register('mdc-checkbox', CheckboxViewModel, template);
