import {PlainViewModel} from './mdc-knockout-base';
import ElevationTemplate from './templates/elevation.html';
import {isSubscribable, unwrap} from './util';

const Z_PREFIX = 'mdc-elevation--z';

class ElevationViewModel extends PlainViewModel {
  extend () {
    const css = {};
    const z = unwrap(this.z);
    if (isSubscribable(this.z)) {
      this.root.classList.add('mdc-elevation-transition');
      let prev = z;
      this.track = this.z.subscribe((value) => {
        this.root.classList.remove(Z_PREFIX + prev);
        this.root.classList.add(Z_PREFIX + value);
        prev = value;
      });
    }
    this.root.classList.add(Z_PREFIX + z);
  }

  get defaultParams () {
    return {
      z: 0
    }
  }
}

export {ElevationTemplate, ElevationViewModel};
