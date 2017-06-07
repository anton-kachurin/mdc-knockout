import {HookableComponentViewModel} from './mdc-knockout-base';
import CheckboxTemplate from './templates/checkbox.html';
import {isSubscribable, unwrap} from './util.js';

class CheckboxViewModel extends HookableComponentViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('checkbox-auto-id');
    }
  }

  initialize (parent) {
    if (parent && parent.attrFor) {
      parent.attrFor(this.attrs['id']);
    }
    if (parent && parent.instance && ('input' in parent.instance)) {
      parent.instance.input = this.instance;
    }

    this.instance.indeterminate = unwrap(this.indeterminate);
    if (isSubscribable(this.indeterminate)) {
      this.track = this.indeterminate.subscribe(value => {
        this.instance.indeterminate = value;
      });
    }
  }

  get defaultParams () {
    return {
      indeterminate: false
    }
  }

  get forceBindings () {
    return {
      checked: () => ('checked' in this.attrs),
      disable: () => ('disabled' in this.attrs),
    }
  }

  get hookedElement () {
    return this.root.querySelector('input')
  }

  get hookedProperties () {
    return {
      checked: state => this.hookedElement.indeterminate = false,
      indeterminate: state => {
        if (isSubscribable(this.indeterminate)) {
          this.indeterminate(state);
        }
      }
    }
  }
}

export {CheckboxTemplate, CheckboxViewModel};
