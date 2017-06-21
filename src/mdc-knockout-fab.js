import {PlainViewModel} from './mdc-knockout-base';
import FABTemplate from './templates/fab.html';

class FABViewModel extends PlainViewModel {
  get defaultParams () {
    return {
      mini: false,
      plain: false,
      icon: ''
    }
  }
}

export {FABTemplate, FABViewModel};
