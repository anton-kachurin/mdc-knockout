import {ComponentViewModel} from './mdc-knockout-base';
import RadioTemplate from './templates/radio.html';
import {isSubscribable} from './util.js';

class RadioViewModel extends ComponentViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('checkable-auto-id');
    }
  }

  initialize (parent) {
    if (parent && isSubscribable(parent.for)) {
      parent.instance.input = this.instance;
      parent.for(this.attrs['id']);
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
