import {ComponentViewModel} from './mdc-knockout-base';
import RadioTemplate from './templates/radio.html';

class RadioViewModel extends ComponentViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('checkable-auto-id');
    }
  }

  initialize (parent) {
    if (parent && parent.attrFor) {
      parent.instance.input = this.instance;
      parent.attrFor(this.attrs['id']);
    }
  }

  get forceBindings () {
    return {
      disable: () => ('disabled' in this.attrs),
      checked: () => {
        if ('checked' in this.attrs) {
          return this.attrs.value;
        }
      }
    }
  }
}

export {RadioTemplate, RadioViewModel};
