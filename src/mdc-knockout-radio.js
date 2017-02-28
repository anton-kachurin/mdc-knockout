import ComponentViewModel from './mdc-knockout-base';

export default class RadioViewModel extends ComponentViewModel {
  initialize (parent) {
    const isChecked = this.isChecked;

    if (ko.unwrap(isChecked)) {
      this.setChecked();
    }

    if (ko.isSubscribable(isChecked)) {
      isChecked.subscribe(value => {
        if (value) {
          this.setChecked();
        }
        else if (this.attrs.value == ko.unwrap(this.bindings.checked)) {
          this.bindings.checked(undefined);
        }
      });

      if (ko.isSubscribable(this.bindings.checked)) {
        this.bindings.checked.subscribe(value => {
          if (value == this.attrs.value) {
            isChecked(true);
          }
          else {
            isChecked(false);
          }
        });
      }
    }

    if (parent) {
      parent.instance().input = this.instance();
    }
  }

  setChecked () {
    // check radio input knockout-way
    if (ko.isObservable(this.bindings.checked)) {
      this.bindings.checked(this.attrs.value);
    }
  }

  defaultParams () {
    return {
      isChecked: false,
      disable: false
    }
  }

  static template () {
    return template;
  }
}

const template = `
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
