import {PlainViewModel} from './mdc-knockout-base';
import template from './templates/elevation.html';

const Z_PREFIX = 'mdc-elevation--z';

export default class ElevationViewModel extends PlainViewModel {
  extend () {
    const css = {};
    if (ko.isSubscribable(this.z)) {
      css['mdc-elevation-transition'] = true;
      for (let i=0; i<=24; i++) {
        css[Z_PREFIX + i] = ko.observable(false);
      }

      let prev = ko.unwrap(this.z);
      this.track = this.z.subscribe((value) => {
        css[Z_PREFIX + prev](false);
        css[Z_PREFIX + value](true);
        prev = value;
      });

      css[Z_PREFIX + prev](true);
    }
    else{
      css[Z_PREFIX + this.z] = true;
    }

    this.bindings.css = Object.assign({}, this.bindings.css, css);
  }

  defaultParams () {
    return {
      z: 0
    }
  }

  static get TEMPLATE () {
    return template();
  }
}
