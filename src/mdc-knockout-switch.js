import {PlainViewModel} from './mdc-knockout-base';
import SwitchTemplate from './templates/switch.html';

class SwitchViewModel extends PlainViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('switch-auto-id');
    }
  }

  get defaultParams () {
    return {
      label: ''
    }
  }

  get forceBindings () {
    return {
      disable: () => ('disabled' in this.attrs),
      checked: () => ('checked' in this.attrs)
    }
  }
}

export {SwitchTemplate, SwitchViewModel};
