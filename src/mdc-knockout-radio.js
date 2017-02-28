import ComponentViewModel from './mdc-knockout-base';
import {MDCRadio, MDCRadioFoundation} from '@material/radio';

RadioViewModel.prototype = Object.create(ComponentViewModel.prototype);
RadioViewModel.prototype.constructor = RadioViewModel;

function RadioViewModel (root, params, attrs) {
  ComponentViewModel.call(this, root, params, attrs,
                          MDCRadioFoundation, MDCRadio);
}

RadioViewModel.prototype.defaultParams = function () {
  return {
    isChecked: false,
    disable: false
  }
}

RadioViewModel.prototype.initialize = function (parent) {
  var self = this;
  function setChecked () {
    // check radio input knockout-way
    if (self.bindings.hasOwnProperty('checked')
    && ko.isObservable(self.bindings.checked)) {
      self.bindings.checked(self.attrs.value);
    }
  }

  var isChecked = self.isChecked;

  if (ko.unwrap(isChecked)) {
    setChecked();
  }

  if (ko.isSubscribable(isChecked)) {
    isChecked.subscribe(function (value) {
      if (value) {
        setChecked();
      }
      else if (self.attrs.value == ko.unwrap(self.bindings.checked)) {
        self.bindings.checked(undefined);
      }
    });

    if (self.bindings.hasOwnProperty('checked')
    && ko.isSubscribable(self.bindings.checked)) {
      self.bindings.checked.subscribe(function (value) {
        if (value == self.attrs.value) {
          isChecked(true);
        }
        else {
          isChecked(false);
        }
      });
    }
  }

  if (parent) {
    parent.instance().input = self.instance();
  }
}

RadioViewModel.template = function () {
  return `
<div class="mdc-radio" data-bind="mdc-css: { DISABLED: disable }">
  <input class="mdc-radio__native-control"
         type="radio"
         data-bind="attr: attrs, mdc-bindings: bindings, disable: disable">
  <div class="mdc-radio__background">
    <div class="mdc-radio__outer-circle"></div>
    <div class="mdc-radio__inner-circle"></div>
  </div>
</div>
<!-- ko mdc-instance: true --><!-- /ko -->
`;
};

export default RadioViewModel;
