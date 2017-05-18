import {HookableComponentViewModel} from './mdc-knockout-base';
import CheckboxTemplate from './templates/checkbox.html';

class CheckboxViewModel extends HookableComponentViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('checkable-auto-id');
    }
  }

  initialize (parent) {
    if (parent && ko.isSubscribable(parent.for)) {
      parent.instance.input = this.instance;
      parent.for(this.attrs['id']);
    }

    this.instance.indeterminate = ko.unwrap(this.indeterminate);
    if (ko.isSubscribable(this.indeterminate)) {
      this.track = this.indeterminate.subscribe(value => {
        this.instance.indeterminate = value;
      })
    }
  }

  defaultParams () {
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
    return this.root.querySelector('input');
  }

  get hookedProperties () {
    return {
      checked: state => this.hookedElement.indeterminate = false,
      indeterminate: state => {
        if (ko.isSubscribable(this.indeterminate)) {
          this.indeterminate(state);
        }
      }
    }
  }
}

export {CheckboxTemplate, CheckboxViewModel};
