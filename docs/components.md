# MDC-Knockout Components

- [mdc-button](#button)
- [mdc-checkbox](#checkbox)
- [mdc-elevation](#elevation)
- [mdc-form-field](#form-field)
- [mdc-radio](#radio)
- [mdc-switch](#switch)


## Button
The MDC Button component is a spec-aligned button component adhering to the
[Material Design button requirements](https://material.google.com/components/buttons.html).

`<mdc-button>` can be rendered as either `<button>` or `<a>` element.

The `<button>` option is default and most flexible. You can add standard
attributes to the component such as `type="submit"` or `onclick="buttonClick()"`
and it will act exactly like a normal `<button>` HTML element.

The `<a>` element will be used when you add the `href="/any/non/empty/value"`
attribute (not the parameter) to the component. Note that the `disable`
parameter will be ignored in this case because standard `<a>` HTML elements
cannot really be disabled.

#### Parameters

| Name    | Type     | Description                                               |
| --------|--------- | --------------------------------------------------------- |
| primary | ko, bool | Colors the button with the primary color.                 |
| accent  | ko, bool | Colors the button with the accent color.                  |
| raised  | ko, bool | Elevates the button and creates a colored background.     |
| dense   | ko, bool | Compresses the button text to make it slightly smaller.   |
| compact | ko, bool | Reduces the amount of horizontal padding in the button.   |
| disable | ko, bool | Disables the button. Ignored if there's "href" attribute. |
| href    | ko, str  | Changes the value of the "href" attribute if one was set at initialization. |


### HTML-only

Flat:
```HTML
<mdc-button>flat</mdc-button>
<mdc-button params="dense: true">flat dense</mdc-button>
<mdc-button params="compact: true">flat compact</mdc-button>
```

Colored:
```HTML
<mdc-button params="primary: true">flat primary</mdc-button>
<mdc-button params="accent: true, compact: true">flat accent compact</mdc-button>
```

Raised:
```HTML
<mdc-button params="raised: true">raised</mdc-button>
<mdc-button params="raised: true, accent: true">raised accent</mdc-button>
```

Disabled:
```HTML
<mdc-button params="disable: true, raised: true">disabled</mdc-button>
```

Links with Button Style:
```HTML
<mdc-button href="#">Link styled as button</mdc-button>
```

#### MDCComponent API

The original MDC-Web component is CSS-only, so there's no `MDCComponent`
instance attached to the `<mdc-button>` element. If you need to access the
native element directly (e.g to set/unset disabled state or change the caption),
do:
```HTML
<mdc-button id="button"
            params="accent: true, raised: true"
            onclick="disableButton()">
  click me
</mdc-button>

<script>
  function disableButton() {
    document.getElementById('button').disabled = true;
    document.getElementById('button').textContent = 'do not try to click me';
  }
</script>
```


### Fully featured

All parameters accept observable values, and it may be used to make the
appearance of the buttons more interactive:
```HTML
<mdc-button params="disable: !(firstName() && lastName())">
  Register
</mdc-button>
```
```HTML
<mdc-button params="primary: AccountBalanceIsPositive, raised: true">
  Extend subscription
</mdc-button>
<mdc-button params="primary: !AccountBalanceIsPositive(), raised: true">
  Refill balance
</mdc-button>
```

Although it's currently not advisable to change the button's width (because
of the glitchy ink ripple effect implementation), the caption can be set via
the `text` binding:
```HTML
<mdc-button params="text: buttonCaption() || 'submit'"></mdc-button>
```

The `href` parameter can be used to overwrite the component's `href` attribute's
value. If the value of the parameter is an empty string (or casts to it), the
initial value of the `href` attribute will be used:
```HTML
<!-- if nextPage() == 1, href="/page/1"
     if nextPage() == 2, href="/page/2"
     if nextPage() == 0, href="/main"
-->
<mdc-button href="/main" params="href: nextPage() ? '/page/' + nextPage() : ''">
  Next page
</mdc-button>
```

This parameter will be ignored if the component didn't have a non-empty
`href` attribute during its initialization:
```HTML
<!-- will be rendered as <button> element, not <a> -->
<mdc-button params="href: 'https://google.com/search?q=' + searchString()">
  Will do nothing
</mdc-button>
```


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
| checked       | ko, bool | Whether or not the input is checked.         |
| indeterminate | ko, bool | Whether or not the input is indeterminate.   |
| disable       | ko, bool | Wheter or not the input is disabled.         |


### HTML-only

Checked:
```HTML
<mdc-checkbox checked></mdc-checkbox>
<mdc-checkbox params="checked: true"></mdc-checkbox>
```

Disabled:
```HTML
<mdc-checkbox disabled></mdc-checkbox>
<mdc-checkbox params="disable: true"></mdc-checkbox>
```

Indeterminate:
```HTML
<mdc-checkbox params="indeterminate: true"></mdc-checkbox>
```

Although using `checked` and `disabled` attributes looks prettier, there are
reasons why sometimes it's better to stick to the `params=""` syntax,
[this one](http://stackoverflow.com/questions/299811/why-does-the-checkbox-stay-checked-when-reloading-the-page) for example.

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
will be passed to the native element along with all other attributes during
the initialization, so the only reliable way to access `<mdc-checkbox>` element
itself is to add some unique class name to it.

For full API please refer to the [original component's documentation](https://github.com/material-components/material-components-web/blob/master/packages/mdc-checkbox/README.md#mdccheckbox-api).


### Fully featured

The component uses the standard Knockout binding for `checked` and accepts an  
observable for `indeterminate`, and `indeterminate` will automatically be set
to `false` when `checked` is updated. Thus, if you use an observable for the
`indeterminate` parameter, you have to use an observable for the `checked` too,
not a plain value or an attribute:
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


## Elevation
The MDC Elevation component allows to add
[shadows and elevation](https://material.google.com/what-is-material/elevation-shadows.html)
to the material components.

Elevation is the relative depth, or distance, between two surfaces along the z-axis, and it ranges from `0` to `24`.

This component only adds shadows to the HTML element, all other styles
including `display: block`, or margins, or paddings must be defined separately.

Unlike for other components, `id` and other attributes added to the
`<mdc-elevation>` element will not be moved anywhere, which can be used to
add some style or behavior to the element.

#### Parameters

| Name | Type     | Description                                     |
| -----|--------- | ----------------------------------------------- |
| z    | ko, bool | How far away the surface is from the background |


### HTML-only

Create a surface whose elevation will not change:
```HTML
<style>
  .surface {
    display: block;
    margin: 20px auto;
    padding: 20px;
  }
</style>
<mdc-elevation class="surface" params="z: 2">
  Any content may go here
</mdc-elevation>
```

#### MDCComponent API

The original MDC-Web component is CSS-only, so there's no MDCComponent instance attached to the `<mdc-elevation>` element.


### Fully featured

If you plan to change the elevation of the surface, provide an observable as
a parameter:
```HTML
<style>
.surface {
  display: block;
  margin: 20px auto;
  padding: 20px;
}
</style>
<mdc-elevation class="surface" params="z: elevation, event: {
  'mouseover': function () { elevation(8) },
  'mouseout': function () { elevation(2) }
}">
  Tap or hover
</mdc-elevation>
```


## Form Field
The MDC Form Field component provides an easy way for making
form control + label combos.

It will autofill `id` and `for` attributes for the HTML elements when
necessary.

#### Parameters

| Name     | Type     | Description                                           |
| ---------|--------- | ----------------------------------------------------- |
| alignEnd | ko, bool | Whether or not the label should go before the control |


### HTML-only

Label text may be placed at the arbitrary location, it won't affect how it's
rendered:
```HTML
<mdc-form-field>
  <mdc-checkbox></mdc-checkbox>
  Label goes after checkbox
</mdc-form-field>
<mdc-form-field>
  Label goes after checkbox anyways
  <mdc-checkbox></mdc-checkbox>
</mdc-form-field>
```

Use `alignEnd` to place the label before the control:
```HTML
<mdc-form-field params="alignEnd: true">
  <mdc-checkbox></mdc-checkbox>
  This one goes first now
</mdc-form-field>
```

The component allows to omit `id` and `for` attributes as shown in the previous
examples. They will be set automatically if both are missing. If an `id` was
defined for the `<mdc-checkbox>`, matching `for` will be added to the label:
```HTML
<mdc-form-field>
  <mdc-checkbox id="check-me"></mdc-checkbox>
  This label is clickable because 'for="check-me"' was automatically added
</mdc-form-field>
```


#### MDCComponent API

There is a `MDCFormField` instance attached to the `<mdc-form-field>` element.
You can use it to set a valid instance of an MDC-Web input element which
exposes a ripple getter, although it's done automatically on initialization.

For full API please refer to the [original component's documentation](https://github.com/material-components/material-components-web/tree/master/packages/mdc-form-field#mdcformfield-api).


### Fully featured

Use `text` binding if you want to set label's text dynamically:
```HTML
<mdc-form-field
  params="text: 'Checkbox now is ' + (checked() ? 'checked' : 'unchecked')">
  <mdc-checkbox params="checked: checked"></mdc-checkbox>
</mdc-form-field>
```


## Radio
The MDC Radio component is a spec-aligned radio button adhering to the
[Material Design radio button requirements](https://material.google.com/components/selection-controls.html#selection-controls-radio-button).

The component fully resembles the native radio element. You can add standard attributes to it, such as `name`, `value`, or `required`, to use in HTML forms.

The mdc-radio can be used in conjunction with [mdc-form-field](#form-field)
to easily position radio buttons and their labels.

#### Parameters

| Name      | Type     | Description                          |
| ----------|--------- | ------------------------------------ |
| isChecked | ko, bool | Whether or not the radio is checked  |
| disable   | ko, bool | Whether or not the radio is disabled |


### HTML-only

Checked:
```HTML
<mdc-radio name="radios-1" value="yes"></mdc-radio>
<mdc-radio name="radios-1" value="no" checked></mdc-radio>

<mdc-radio name="radios-2" value="yes" params="isChecked: true"></mdc-radio>
<mdc-radio name="radios-2" value="no"></mdc-radio>
```

Disabled:
```HTML
<mdc-radio name="radios-1" value="yes"></mdc-radio>
<mdc-radio name="radios-1" value="no"></mdc-radio>
<mdc-radio name="radios-1" value="maybe" checked disabled></mdc-radio>

<mdc-radio name="radios-2" value="yes"></mdc-radio>
<mdc-radio name="radios-2" value="no"></mdc-radio>
<mdc-radio name="radios-2" value="maybe" params="isChecked: true, disable: true">
</mdc-radio>
```

Although using `checked` and `disabled` attributes looks prettier,
there are reasons why sometimes it's better to stick to the `params="..."` syntax,
[this one](http://stackoverflow.com/questions/299811/why-does-the-checkbox-stay-checked-when-reloading-the-page) for example.

#### MDCComponent API

There is a `MDCRadio` instance attached to the `<mdc-radio>` element.
You can use it to change the native input's properties programmatically,
for example:
```HTML
<mdc-radio name="radios-1" value="yes"></mdc-radio>
<mdc-radio name="radios-1" value="no" checked></mdc-radio>
<mdc-radio class="radio-maybe" name="radios-1" value="maybe" disabled>
</mdc-radio>
<button onclick="checkDefault()">Check disabled</button>

<script>
  function checkDefault () {
    var MDCRadio = document.getElementsByClassName('radio-maybe')[0].MDCRadio;
    MDCRadio.checked = true;
  }
</script>
```

Keep in mind that if you add `id` attribute to the `<mdc-radio>` element, it
will be passed to the native element along with all other attributes during
the initialization, so the only reliable way to access `<mdc-radio>` element
itself is to add some unique class name to it.

For full API please refer to the
[original component's documentation](https://github.com/material-components/material-components-web/tree/master/packages/mdc-radio#mdcradio-api).


### Fully featured

The component allows to use the standard `checked` binding to associate
`<mdc-radio value="...">` with some observable value. Please use only
observables, not plain values, for `checked` and `isChecked` when
both are present.

```HTML
<div>Would you like to receive emails from us?</div>
<mdc-radio value="yes" params="checked: radio1"></mdc-radio> yes
<mdc-radio value="no"  params="checked: radio1"></mdc-radio> no
<div data-bind="if: radio1() == 'yes'">Thank you</div>
<div data-bind="if: radio1() == 'no'">We promise not to spam</div>

<div>Would you like to receive emails from us?</div>
<mdc-radio value="yes"
           params="checked: radio2, isChecked: checkedYes"></mdc-radio> yes
<mdc-radio value="no"  
           params="checked: radio2, isChecked: checkedNo"></mdc-radio> no
<div data-bind="if: checkedYes">Thank you</div>
<div data-bind="if: checkedNo">We promise not to spam</div>
```


## Switch
The MDC Switch component is a spec-aligned switch component adhering to the
[Material Design Switch requirements](https://material.io/guidelines/components/selection-controls.html#selection-controls-switch).

The component resembles the native checkbox element. You can add standard
attributes to it, such as `name` or `required`, to use in HTML forms.

#### Parameters

| Name    | Type     | Description                           |
| --------|--------- | --------------------------------------|
| checked | ko, bool | Whether or not the switch is on.      |
| disable | ko, bool | Wheter or not the switch is disabled. |
| label   | ko, str  | The text of the corresponding label.  |


### HTML-only

Checked:
```HTML
<mdc-switch checked>on/off</mdc-switch>
<mdc-switch params="checked: true">on/off</mdc-switch>
```

Disabled:
```HTML
<mdc-switch disabled>on/off</mdc-switch>
<mdc-switch params="disable: true">on/off</mdc-switch>
```

Although using `checked` and `disabled` attributes looks prettier, there are
reasons why sometimes it's better to stick to the `params="..."` syntax,
[this one](http://stackoverflow.com/questions/299811/why-does-the-checkbox-stay-checked-when-reloading-the-page)
for example.

#### MDCComponent API

The original MDC-Web component is CSS-only, so there's no MDCComponent instance
attached to the `<mdc-switch>` element. If you need to access the native element
directly (e.g to set/unset disabled state), do:

```HTML
<mdc-switch id="switch" disabled>on/off</mdc-switch>
<button onclick="enableSwitch()">Enable switch</button>

<script>
  function enableSwitch () {
    var switchElem = document.getElementById('switch');
    switchElem.disabled = false;
    switchElem.parentNode.classList.remove('mdc-switch--disabled');
  }
</script>
```

Please refer to the
[original component's documentation](https://github.com/material-components/material-components-web/tree/master/packages/mdc-switch)
for full details.


### Fully featured

Use `label` parameter if you want to set label's text dynamically:
```HTML
<mdc-switch params="
  checked: switchIsOn,
  label: 'Switch is now ' + (switchIsOn() ? 'on' : 'off')"
></mdc-switch>
```
