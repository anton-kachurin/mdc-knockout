import {CheckableComponentViewModel} from './mdc-knockout-base';
import RadioTemplate from './templates/radio.html';

class RadioViewModel extends CheckableComponentViewModel {
  initialize () {
    // make sure that --disabled class is set if necessary
    if (!('disable' in this.bindings)) {
      this.instance.disabled = this.instance.disabled;
    }

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
    if (ko.isObservable(this.bindings.checked)) {
      // check radio input knockout-way
      this.bindings.checked(this.attrs.value);
    }
    else {
      // check radio via MDCComponent
      this.instance.checked = true;
    }
  }

  get defaultParams () {
    return {
      isChecked: false
    }
  }
}

export {RadioTemplate, RadioViewModel};
