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
