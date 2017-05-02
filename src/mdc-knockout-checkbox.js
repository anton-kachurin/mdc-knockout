import {CheckableComponentViewModel} from './mdc-knockout-base';
import CheckboxTemplate from './templates/checkbox.html';

class CheckboxViewModel extends CheckableComponentViewModel {
  initialize () {
    const checked = this.bindings.checked;
    const instance = this.instance();
    instance.indeterminate = ko.unwrap(this.indeterminate);
    if (ko.isSubscribable(this.indeterminate)) {
      this.track = this.indeterminate.subscribe(
        value => { if (value) instance.indeterminate = true }
      );
      if (ko.isSubscribable(checked)) {
        this.track = checked.subscribe(value => {
          this.indeterminate(false);
          if (instance.indeterminate) {
             instance.indeterminate = false;
          }
        });
      }
    }
  }

  defaultParams () {
    return {
      indeterminate: false
    }
  }
}

export {CheckboxTemplate, CheckboxViewModel};
