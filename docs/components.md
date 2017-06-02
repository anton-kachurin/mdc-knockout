# MDC-Knockout Components

- [Overview](#overview)
- [mdc-button](#button)
- [mdc-checkbox](#checkbox)
- [mdc-elevation](#elevation)
- [mdc-form-field](#form-field)
- [mdc-radio](#radio)
- [mdc-switch](#switch)
- [mdc-textfield](#textfield)

## Overview

Knockout Material Components allow for a very modern,
[WebComponents](http://www.w3.org/TR/components-intro/)-like way to execute
Material Design, optionally spiced up with Knockout bindings.

```HTML
<mdc-form-field>
  <mdc-checkbox id="checkbox" checked></mdc-checkbox>
  This is awesome
</mdc-form-field>

<script>
  ko.applyBindings();
</script>
```

> You must write `<mdc-some-component></mdc-some-component>`, and not `<mdc-some-component />`.
> Otherwise, your custom element is not closed and subsequent elements will be
> parsed as child elements.

> This is a limitation of the HTML specification and is outside the scope of what
> this library can control. HTML parsers, following the HTML specification,
> ignore any self-closing slashes (except on a small number of special
> "foreign elements", which are hardcoded into the parser).

One of the ways to use Knockout Material Components is called HTML-only,
when Knockout is used only to generate MDC-Web compatible HTML structure.

HTML-only components do not require an extensive knowledge of Knockout.
There are just a few things to keep in mind for those not familiar with it:
1. `ko.applyBindings()`: Components will not render until this method is called.
Make sure to call it in the closing `<script>` or inside `$( document ).ready()`,
for example.
2. `params="parameter1: value1, parameter2: value2"`: The value of the `params`
attribute is a JSON-formatted object, therefore `value1` can be any valid Javascript
literal, such as `1`, `'some string'`, `false`, and so on. Normally, JSON objects
start and end with curly braces, but for Knockout they are optional.
3. Do not delete parts of the page containing Knockout Material Components with
native Javascript methods like `element.removeChild(child);` or similar.
Only `ko.utils` methods must be used to remove such nodes, otherwise all
component-related data will hang in the memory.

> Note for the developers familiar with the original MDC-Web project:

> HTML-only of MDC-Knockout is not the same as CSS-only of MDC-Web.
> MDC-Knockout always uses fully featured versions of the MDC-Web components
> whenever possible. "HTML-only" means that no usage of Knockout observables is
> involved, and the whole page can be generated without creating any ViewModels.

HTML-only components are designed to be as close as possible to their native equivalents.
For example, you are using the following template to create an input with a
prefilled value:
```HTML
<input type="text" maxlength="20" value="{{name}}" required />
```

To rewrite this as a MDC-Knockout component, you only need to change the tag name:
```HTML
<mdc-textfield type="text" maxlength="20" value="{{name}}" required></mdc-textfield>
```

The component after initialization will generate a proper HTML structure and
pass all attributes (`type`, `value`, `required`, and so on) to the native
input element within that structure.

In general, all attributes except `class` and `params` will be removed from the
container element (e.g. `<mdc-textfield>`) and will be reused inside the generated
HTML. This includes `id` attributes too, therefore it is highly inconvenient to
rely on `id` for styling or querying of the components.

If you have to use `id` for CSS, consider wrapping components with some
native HTML elements, such as `<div>`.

If you need to access the component with Javascript, add a unique class to it
and use `document.querySelector()`.

Some of the components have a `MDCComponent` instance attached to the container
element. The instance can be used to programmatically access the component's state
and tweak its behavior, all without using Knockout. Please refer to the
MDCComponent API section of each component for details.


## Button
The MDC Button component is a spec-aligned button component adhering to the
[Material Design button requirements](https://material.google.com/components/buttons.html).

`<mdc-button>` can be rendered as either `<button>` or `<a>` element.

The `<button>` option is default and most flexible. You can add standard
attributes to the component such as `type="submit"` or `onclick="buttonClick()"`
and it will act exactly like a normal `<button>` HTML element.

The `<a>` element will be used when you add the `href` attribute (or the parameter)
to the component. Note that standard `<a>` HTML elements cannot be disabled.

#### Parameters

| Name    | Type     | Description                                               |
| --------|--------- | --------------------------------------------------------- |
| primary | ko, bool | Colors the button with the primary color.                 |
| accent  | ko, bool | Colors the button with the accent color.                  |
| raised  | ko, bool | Elevates the button and creates a colored background.     |
| dense   | ko, bool | Compresses the button text to make it slightly smaller.   |
| compact | ko, bool | Reduces the amount of horizontal padding in the button.   |
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
<mdc-button disabled params="raised: true">disabled</mdc-button>
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

Although it's currently not advisable to affect the button's width (because
of the glitchy ink ripple effect implementation), the caption can be set via
the `text` binding:
```HTML
<mdc-button params="text: buttonCaption() || 'submit'"></mdc-button>
```

The `href` parameter gives dynamic control over the button styled link's
destination:
```HTML
<!-- if nextPage() == 1, href="/page/1"
     if nextPage() == 2, href="/page/2"
     if nextPage() == 0, href="/main"
-->
<mdc-button params="href: nextPage() ? '/page/' + nextPage() : '/main'">
  Next page
</mdc-button>
```

It is important to have either `href` attribute or `href` param set on the
component to have it rendered as `<a>`. If you prefer to use some third-party
binding to control link's destination, you can do so, just leave a hint for
the component by adding at least an empty `href` attribute to the element:
```HTML
<!-- will be rendered as <button> element, not <a> -->
<mdc-button params="thirdPartyHref: 'https://google.com/search?q=' + searchString()">
  Will do nothing
</mdc-button>

<!-- will do fine -->
<mdc-button href params="thirdPartyHref: 'https://google.com/search?q=' + searchString()">
  Search with Google
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


## Elevation
The MDC Elevation component allows to add
[shadows and elevation](https://material.google.com/what-is-material/elevation-shadows.html)
to the material components.

Elevation is the relative depth, or distance, between two surfaces along the
z-axis, and it ranges from `0` to `24`.

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

The original MDC-Web component is CSS-only, so there's no MDCComponent instance
attached to the `<mdc-elevation>` element.


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
| label    | ko, str  | The text of the corresponding label.                  |


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

Use `alignEnd` to visually place the label before the control:
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

Use `label` parameter to set label's text dynamically:
```HTML
<mdc-form-field
  params="label: 'Checkbox now is ' + (checked() ? 'checked' : 'unchecked')">
  <mdc-checkbox params="checked: checked"></mdc-checkbox>
</mdc-form-field>
```


## Radio
The MDC Radio component is a spec-aligned radio button adhering to the
[Material Design radio button requirements](https://material.google.com/components/selection-controls.html#selection-controls-radio-button).

The component fully resembles the native radio element. You can add standard
attributes to it, such as `name`, `value`, or `required`, to use in HTML forms.

The mdc-radio can be used in conjunction with [mdc-form-field](#form-field)
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


## Switch
The MDC Switch component is a spec-aligned switch component adhering to the
[Material Design switch requirements](https://material.io/guidelines/components/selection-controls.html#selection-controls-switch).

The component resembles the native checkbox element. You can add standard
attributes to it, such as `name` or `required`, to use in HTML forms.

#### Parameters

| Name    | Type     | Description                           |
| --------|--------- | --------------------------------------|
| label   | ko, str  | The text of the corresponding label.  |


### HTML-only

Checked:
```HTML
<mdc-switch checked>on/off</mdc-switch>
```

Disabled:
```HTML
<mdc-switch disabled>on/off</mdc-switch>
```

As a form element:
```HTML
<mdc-switch name="billing">
  Enable Billing
</mdc-switch>
```

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

Any standard or third-party binding that are normally used for checkboxes, such
as `checked`, `checkedValue`, `disabled`, etc, are applicable to MDC Switch:
```HTML
<mdc-switch value="news" params="checked: options">
  Get newsletters about service
</mdc-switch>
<mdc-switch value="promotions" params="checked: options">
  Get info about promotions
</mdc-switch>
```

Use `label` parameter if you want to set label's text dynamically:
```HTML
<mdc-switch params="
  checked: switchIsOn,
  label: 'Switch is now ' + (switchIsOn() ? 'on' : 'off')"
></mdc-switch>
```


## Textfield
The MDC Textfield component provides a textual input field adhering to the
[Material Design Specification](https://material.google.com/components/text-fields.html).

By default, the textfield is rendered via `<input>` element, but a multiline
version is available too, which is rendered via the `<textarea>`.
You can add standard attributes to it, such as `type`, `name`, `required`,
`pattern`, `minlength`, `autofocus`, to use in HTML forms.

HTML5 validation is supported by using the `:invalid` and `:required` CSS
attributes, and input's validity is checked via checkValidity() on blur.

#### Parameters

| Name       | Type     | Description                                                   |
| -----------|--------- | --------------------------------------------------------------|
| label      | ko, str  | The text of the floating label.                               |
| help       | ko, str  | The help text on the bottom.                                  |
| persistent | ko, bool | Whether to keep the help text on the screen all time.         |
| validation | ko, bool | Whether to use help text area to show validation errors.      |
| invalid    | bool     | Applies on initialization only, will render the textfield as if it didn't pass validation. |
| multiline  | bool     | If it needs to be multiline, checked once on initialization.  |
| fullwidth  | bool     | If it needs to be full-width, checked once on initialization. |
| disable    | ko, bool | Whether or not the textfield must be disabled.                |


### HTML-only

Basic single-line text field with a label:
```HTML
<mdc-textfield>
  Label text (placeholder)
</mdc-textfield>
```

Disabled:
```HTML
<mdc-textfield disabled>
  Label text (placeholder)
</mdc-textfield>
<mdc-textfield params="disable: true">
  Label text (placeholder)
</mdc-textfield>
```

Although using `disabled` attributes looks prettier, there are
reasons why sometimes it's better to stick to the `params="..."` syntax,
[this one](http://stackoverflow.com/questions/299811/why-does-the-checkbox-stay-checked-when-reloading-the-page)
for example.

With help text:
```HTML
<mdc-textfield>
  Label text (placeholder)
  <p>Hint text, shows up on input focus</p>
</mdc-textfield>
```

Persistent help:
```HTML
<mdc-textfield>
  Label text (placeholder)
  <p persistent>Hint text, will always be here</p>
</mdc-textfield>
```

Validated password input:
```HTML
<mdc-textfield type="password" required pattern=".{8,}">
  Focus-unfocus me
  <p validation>Must be at least 8 characters long</p>
</mdc-textfield>
```

Validation is triggered on input's blur, so that the user won't be distracted
by false positive validation fails when the page loads. Nevertheless, there are
cases when the component needs to be rendered in invalid state, for example
when the textfield on initialization is known to be invalid (has been already
validated on the back-end). Use `invalid` property for that:
```HTML
<mdc-textfield type="password" required pattern=".{8,}" params="invalid: true">
  Password
  <p persistent validation>Must contain letters, digits, and special characters</p>
</mdc-textfield>
```

Multiline textfield:
```HTML
<mdc-textfield params="multiline: true">
  Comment
</mdc-textfield>
```

Full-width:
```HTML
<mdc-textfield params="fullwidth: true">
  Subject
</mdc-textfield>
<mdc-textfield rows="5" params="fullwidth: true, multiline: true">
  Message
</mdc-textfield>
```

#### MDCComponent API

There is a `MDCTextfield` instance attached to the `<mdc-textfield>` element:
```HTML
<mdc-textfield class="disabable-textfield" disabled>
  Label text (placeholder)
</mdc-textfield>
<button onclick="enableTextfield()">Enable</button>

<script>
  function enableTextfield () {
    var textfield = document.getElementsByClassName('disabable-textfield')[0];
    textfield.MDCTextfield.disabled = false;
  }
</script>
```

Keep in mind that if you add `id` attribute to the `<mdc-textfield>` element,
it will be passed to the native element along with all other attributes
during the initialization, so the only reliable way to access `<mdc-textfield>`
element itself is to add some unique class name to it.

For full API please refer to the
[original component's documentation](https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield#mdctextfield-api).


### Fully featured

Only `fullwidth`, `multiline`, and `invalid` parameters are evaluated as plain
boolean values on initialization, all other ones could be observables:
```HTML
<mdc-textfield pattern="[a-zA-Z0-9-]{0,10}" params="
  value: username,
  help: helptext,
  persistent: hasError,
  validation: hasError,
  invalid: invalid
">Username</mdc-textfield>

<script>
  function NewPasswordViewModel (username) {
    var self = this;

    self.username = ko.observable(username);
    self.isTooLong = ko.pureComputed(function () {
      return self.username().length > 10;
    });
    self.hasWrongCharacters = ko.pureComputed(function () {
      return self.username().match(/[^a-zA-Z0-9-]/);
    });
    self.hasError = ko.pureComputed(function () {
      return self.isTooLong() || self.hasWrongCharacters();
    });
    self.helptext = ko.pureComputed(function () {
      if (self.isTooLong()) {
        return 'The value is too long';
      }
      if (self.hasWrongCharacters()) {
        return 'Can contain only letters, digits and dashes';
      }
      return '';
    });
    self.invalid = self.hasError();
  }

  ko.applyBindings(new NewPasswordViewModel('qwerty_2135'));
</script>
```
