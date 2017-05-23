import {PlainViewModel} from './mdc-knockout-base';
import SwitchTemplate from './templates/switch.html';

class SwitchViewModel extends PlainViewModel {
  extend () {
    // make sure that --disabled class is set if necessary
    if (!('disable' in this.bindings)) {
      if ('disabled' in this.attrs) {
        this.bindings.disable = true;
      }
    }

    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('switch-auto-id');
    }

    this.nodeFilter = (child) => {
      if (!this.label && child.nodeType == 3) {
        let text = child.textContent;
        if (text.match(/[^\s]/)) {
          this.label = text;
        }
      }
      return false;
    }
  }

  get defaultParams () {
    return {
      label: ''
    }
  }
}

export {SwitchTemplate, SwitchViewModel};
