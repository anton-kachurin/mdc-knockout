import {PlainViewModel} from './mdc-knockout-base'

export default class SwitchViewModel extends PlainViewModel {
  extend () {
    if (!this.attrs['id']) {
      this.attrs['id'] = this.randomPrefixed('switch-auto-id');
    }
  }

  defaultParams () {
    return {
      label: '',
      disable: false
    }
  }

  static template () {
    return template;
  }
}

const template =
`<div class="mdc-switch" data-bind="
  css: {
    'mdc-switch--disabled': disable
  }
">
  <input type="checkbox" class="mdc-switch__native-control" data-bind="
    mdc-bindings: bindings,
    attr: attrs,
    disable: disable
  " />
  <div class="mdc-switch__background">
    <div class="mdc-switch__knob"></div>
  </div>
</div>
<label class="mdc-switch-label" data-bind="
  attr: {
    for: attrs.id
  },
  text: label
"></label>
`;
