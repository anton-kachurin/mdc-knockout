# Textfield
The MDC Textfield component provides a textual input field adhering to the
[Material Design Specification](https://material.google.com/components/text-fields.html).

By default, the textfield is rendered via `<input>` element, but a multiline
version is available too, which is rendered via the `<textarea>`.
You can add standard attributes to it, such as `value`, `type`, `name`,
`required`, `pattern`, `minlength`, `autofocus`, to use in HTML forms.

HTML5 validation is supported by using the `:invalid` and `:required` CSS
attributes, and input's validity is checked via checkValidity() on blur.

## Design & Additional Documentation

- [Material Design guidelines: Text Fields](https://material.io/guidelines/components/text-fields.html)
- [MDC-Web Textfield component](https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/README.md)
- [Demo](https://anton-kachurin.github.io/mdc-knockout/demo/textfield.html)

## Parameters

| Name       | Type     | Description                                                   |
| -----------|--------- | --------------------------------------------------------------|
| label      | ko, str  | The text of the floating label.                               |
| invalid    | bool     | Applies on initialization only, will render the textfield as if it didn't pass validation. |
| multiline  | bool     | If it needs to be multiline, checked once on initialization.  |
| fullwidth  | bool     | If it needs to be full-width, checked once on initialization. |
| box        | bool     | If it needs to be styled as a box, checked once on initialization. |


## HTML-only

### Basic single-line text field with a label

```HTML
<mdc-textfield>
  Label text (placeholder)
</mdc-textfield>
```

### Disabled

```HTML
<mdc-textfield disabled>
  Label text (placeholder)
</mdc-textfield>
```

### With help text

```HTML
<mdc-textfield>
  Label text (placeholder)
  <p>Hint text, shows up on input focus</p>
</mdc-textfield>
```

### Persistent help

```HTML
<mdc-textfield>
  Label text (placeholder)
  <p persistent>Hint text, will always be here</p>
</mdc-textfield>
```

### Validated password input

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

### Textfield box

```HTML
<mdc-textfield params="box: true">
  Label text (placeholder)
  <p>Help text</p>
</mdc-textfield>
```

### Multiline textfield

```HTML
<mdc-textfield params="multiline: true">
  Comment
</mdc-textfield>
```

### Full-width

```HTML
<mdc-textfield params="fullwidth: true">
  Subject
</mdc-textfield>
<mdc-textfield rows="5" params="fullwidth: true, multiline: true">
  Message
</mdc-textfield>
```


## Fully featured

In addition to `label` parameter which accepts observables, help text may be
dynamic too:
```HTML
<mdc-textfield params="label: labelText">
  <p data-bind="text: hintText"></p>
</mdc-textfield>
```
