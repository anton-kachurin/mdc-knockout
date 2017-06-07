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
