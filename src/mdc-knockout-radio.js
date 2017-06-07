import {ComponentViewModel} from './mdc-knockout-base';
import RadioTemplate from './templates/radio.html';

class RadioViewModel extends ComponentViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('radio-auto-id');
    }
  }

  initialize (parent) {
    if (parent && parent.attrFor) {
      parent.attrFor(this.attrs['id']);
    }
    if (parent && parent.instance && ('input' in parent.instance)) {
      parent.instance.input = this.instance;
    }
  }

  get forceBindings () {
    return {
      disable: () => ('disabled' in this.attrs),
      checked: () => {
        if ('checked' in this.attrs) {
          return this.attrs.value;
        }
        return false
      }
    }
  }
}

export {RadioTemplate, RadioViewModel};
