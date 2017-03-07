import {PlainViewModel} from './mdc-knockout-base';
import template from './templates/switch.html';

export default class SwitchViewModel extends PlainViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('switch-auto-id');
    }
  }

  defaultParams () {
    return {
      label: '',
      disable: false
    }
  }

  static get TEMPLATE () {
    return template();
  }
}
