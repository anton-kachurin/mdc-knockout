# MDC-Knockout Components

- [mdc-button](#button)
- [mdc-checkbox](#checkbox)


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
