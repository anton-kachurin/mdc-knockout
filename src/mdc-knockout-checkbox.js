import {HookableComponentViewModel} from './mdc-knockout-base';
import CheckboxTemplate from './templates/checkbox.html';
import {isSubscribable, unwrap} from './util.js';

class CheckboxViewModel extends HookableComponentViewModel {
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
