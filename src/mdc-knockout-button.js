import {PlainViewModel} from './mdc-knockout-base';
import ButtonTemplate from './templates/button.html';

class ButtonViewModel extends PlainViewModel {
  extend () {
    if (this.href) {
      this.attrs.href = this.href;
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
}

export {ButtonTemplate, ButtonViewModel};
