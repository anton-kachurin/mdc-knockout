## Radio
The MDC Radio component is a spec-aligned radio button adhering to the
[Material Design radio button requirements](https://material.google.com/components/selection-controls.html#selection-controls-radio-button).

The component fully resembles the native radio element. You can add standard
attributes to it, such as `name`, `value`, or `required`, to use in HTML forms.

The mdc-radio can be used in conjunction with [mdc-form-field](./mdc-form-field.md)
to easily position radio buttons and their labels.

#### Parameters

This component doesn't have any special parameters.

### HTML-only

Checked:
```HTML
<mdc-radio name="radios" value="yes"></mdc-radio>
<mdc-radio name="radios" value="no" checked></mdc-radio>
```

Disabled:
```HTML
<mdc-radio name="radios" value="yes"></mdc-radio>
<mdc-radio name="radios" value="no"></mdc-radio>
<mdc-radio name="radios" value="maybe" checked disabled></mdc-radio>
```

As a form element:
```HTML
<mdc-form-field>
  <mdc-radio name="plan" value="basic"></mdc-radio>
  Basic
</mdc-form-field>
<mdc-form-field>
  <mdc-radio name="plan" value="advanced" checked></mdc-radio>
  Advanced
</mdc-form-field>
```

#### MDCComponent API

There is a `MDCRadio` instance attached to the `<mdc-radio>` element.
You can use it to change the native input's properties programmatically,
for example:
```HTML
<mdc-radio name="radios-1" value="yes"></mdc-radio>
<mdc-radio name="radios-1" value="no" checked></mdc-radio>
<mdc-radio class="radio-maybe" name="radios-1" value="maybe" disabled></mdc-radio>
<button onclick="checkDefault()">Check disabled</button>

<script>
  function checkDefault () {
    var MDCRadio = document.getElementsByClassName('radio-maybe')[0].MDCRadio;
    MDCRadio.checked = true;
  }
</script>
```

Keep in mind that if you add `id` attribute to the `<mdc-radio>` element, it
will be passed to the native input element along with all other attributes during
the initialization, so adding some unique class name to the `<mdc-radio>`
element is a more reliable way to get access to it.

For full API please refer to the
[original component's documentation](https://github.com/material-components/material-components-web/tree/master/packages/mdc-radio#mdcradio-api).


### Fully featured

Any standard or third-party bindings that are normally used with radio inputs,
such as `checked`, `checkedValue`, `disabled`, etc, are applicable to MDC Radio:

```HTML
<div>Would you like to receive emails from us?</div>
<mdc-radio value="yes" params="checked: emails"></mdc-radio> yes
<mdc-radio value="no"  params="checked: emails"></mdc-radio> no
<div data-bind="if: emails() == 'yes'">Thank you</div>
<div data-bind="if: emails() == 'no'">We promise not to spam</div>
```
