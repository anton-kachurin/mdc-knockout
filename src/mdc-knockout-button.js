import {PlainViewModel} from './mdc-knockout-base';
import ButtonTemplate from './templates/button.html';

class ButtonViewModel extends PlainViewModel {
  extend () {
    if (this.attrs.href && this.href) {
      const defaultHref = this.attrs.href;
      this.attrs.href = ko.pureComputed(() => {
        return ko.unwrap(this.href) || defaultHref;
      });
    }
  }

  get defaultParams () {
    return {
      href: '',
      dense: false,
      raised: false,
      compact: false,
      primary: false,
      accent: false,
    }
  }

  get unwrapParams () {
    return ['submit'];
  }
}

export {ButtonTemplate, ButtonViewModel};
