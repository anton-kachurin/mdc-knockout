import {CheckableComponentViewModel} from './mdc-knockout-base';
import template from './templates/radio.html';

export default class RadioViewModel extends CheckableComponentViewModel {
  initialize () {
    const isChecked = this.isChecked;

    if (ko.unwrap(isChecked)) {
      this.setChecked();
    }

    if (ko.isSubscribable(isChecked)) {
      this.track = isChecked.subscribe(value => {
        if (value) {
          this.setChecked();
        }
        else if (this.attrs.value == ko.unwrap(this.bindings.checked)) {
          this.bindings.checked(undefined);
        }
      });

      if (ko.isSubscribable(this.bindings.checked)) {
        this.track = this.bindings.checked.subscribe(value => {
          if (value == this.attrs.value) {
            isChecked(true);
          }
          else {
            isChecked(false);
          }
        });
      }
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

  static get TEMPLATE () {
    return template();
  }
}
