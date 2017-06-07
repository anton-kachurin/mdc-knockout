## Checkbox
The MDC Checkbox component is a spec-aligned checkbox component adhering to the
[Material Design checkbox requirements](https://material.google.com/components/selection-controls.html#selection-controls-checkbox).

The component fully resembles the native checkbox element. You can add standard
attributes to it, such as `name` or `required`, to use in HTML forms.

The mdc-checkbox can by used in conjunction with [mdc-form-field](#form-field)
to easily position checkboxes and their labels.

#### Parameters

| Name          | Type     | Description                                  |
| --------------|--------- | -------------------------------------------- |
| indeterminate | ko, bool | Whether or not the input is indeterminate.   |


### HTML-only

Checked:
```HTML
<mdc-checkbox checked></mdc-checkbox>
```

Disabled:
```HTML
<mdc-checkbox disabled></mdc-checkbox>
```

Indeterminate:
```HTML
<mdc-checkbox params="indeterminate: true"></mdc-checkbox>
```

As a form element:
```HTML
<mdc-form-field>
  <mdc-checkbox name="notifications" checked></mdc-checkbox>
  I'd like to receive notifications
</mdc-form-field>
```

#### MDCComponent API

There is a `MDCCheckbox` instance attached to the `<mdc-checkbox>` element.
You can use it to change the native input's properties programmatically,
for example:
```HTML
<mdc-checkbox class="some-unique-class-name"></mdc-checkbox>
<button onclick="toggleDisabled()">Toggle disabled</button>
<button onclick="toggleIndeterminate()">Toggle indeterminate</button>

<script>
  function toggleDisabled () {
    var MDCCheckbox = document.getElementsByClassName('some-unique-class-name')[0].MDCCheckbox;
    MDCCheckbox.disabled = !MDCCheckbox.disabled;
  }
  function toggleIndeterminate() {
    var MDCCheckbox = document.getElementsByClassName('some-unique-class-name')[0].MDCCheckbox;
    MDCCheckbox.indeterminate = !MDCCheckbox.indeterminate;
  }
</script>
```

Keep in mind that if you add `id` attribute to the `<mdc-checkbox>` element, it
will be passed to the native input element along with all other attributes during
the initialization, so adding some unique class name to the `<mdc-checkbox>`
element is a more reliable way to get access to it.

For full API please refer to the [original component's documentation](https://github.com/material-components/material-components-web/blob/master/packages/mdc-checkbox/README.md#mdccheckbox-api).


### Fully featured

In addition to the `indeterminate` parameter, any standard or third-party
binding can be used, such as `checked`, `checkedValue`, `disabled`, etc:
```HTML
<mdc-checkbox params="
  checked: checkboxIsChecked,
  indeterminate: checkboxIsIndeterminate">
</mdc-checkbox>
<span data-bind="if: checkboxIsIndeterminate">
  Please make choice by clicking the checkbox
</span>
<span data-bind="if: !checkboxIsIndeterminate() && checkboxIsChecked()">
  You agreed to receive our emails
</span>
```

Also, keep in mind that the state of the `indeterminate` does not affect the
state of the `checked`, so such thing is possible:
`( checkboxIsIndeterminate() && checkboxIsChecked() ) == true`.
