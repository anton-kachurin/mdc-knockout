import {PlainViewModel} from './mdc-knockout-base';
import template from './templates/elevation.html';

const Z_PREFIX = 'mdc-elevation--z';

export default class ElevationViewModel extends PlainViewModel {
  extend () {
    if (ko.isSubscribable(this.z)) {
      this.css['mdc-elevation-transition'] = true;
      for (let i=0; i<=24; i++) {
        this.css[Z_PREFIX + i] = ko.observable(false);
      }

      let prev = ko.unwrap(this.z);
      this.z.subscribe((value) => {
        this.css[Z_PREFIX + prev](false);
        this.css[Z_PREFIX + value](true);
        prev = value;
      });

      this.css[Z_PREFIX + prev](true);
    }
    else{
      this.css[Z_PREFIX + this.z] = true;
    }
  }

  defaultParams () {
    return {
      z: 0,
      css: {}
    }
  }

  static get TEMPLATE () {
    return template();
  }
}
