import {PlainViewModel} from './mdc-knockout-base';
import FABTemplate from './templates/fab.html';

class FABViewModel extends PlainViewModel {

  nodeFilter (child) {
    if (!this.icon && child.nodeType == 3) {
      let text = child.textContent;

      // ignore empty text nodes
      if (text.match(/[^\s]/)) {
        this.icon = text;
      }
    }
    return false;
  }

  get defaultParams () {
    return {
      mini: false,
      plain: false,
      icon: ''
    }
  }
}

export {FABTemplate, FABViewModel};
