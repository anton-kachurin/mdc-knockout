import ComponentViewModel from './mdc-knockout-base';

export default class CheckboxViewModel extends ComponentViewModel {
  initialize (parent) {
    var checked = this.bindings.checked;
    var instance = this.instance();
    instance.indeterminate = ko.unwrap(this.indeterminate);
    if (ko.isSubscribable(this.indeterminate)) {
      this.indeterminate.subscribe(
        value => { if (value) instance.indeterminate = true }
      );
      if (ko.isSubscribable(checked)) {
        checked.subscribe(value => {
          this.indeterminate(false);
          if (instance.indeterminate) {
             instance.indeterminate = false;
          }
        });
      }
    }
    if (parent) {
      parent.instance().input = instance;
    }
  }

  defaultParams () {
    return {
      indeterminate: true
    };
  }

  static template () {
    return template
  }
}

const template = `
<div class="mdc-checkbox">
  <input type="checkbox"
         class="mdc-checkbox__native-control"
         data-bind="mdc-bindings: bindings, attr: attrs"/>
  <div class="mdc-checkbox__background">
    <svg version="1.1"
         class="mdc-checkbox__checkmark"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"
         xml:space="preserve">
      <path class="mdc-checkbox__checkmark__path"
            fill="none"
            stroke="white"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
    </svg>
    <div class="mdc-checkbox__mixedmark"></div>
  </div>
</div>
<!-- ko mdc-instance: true --><!-- /ko -->
`;
