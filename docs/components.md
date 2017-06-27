# MDC-Knockout Components

- [Overview](#overview)
- [mdc-button](./mdc-button.md)
- [mdc-checkbox](./mdc-checkbox.md)
- [mdc-elevation](./mdc-elevation.md)
- [mdc-fab](./mdc-fab.md)
- [mdc-form-field](./mdc-form-field.md)
- [mdc-radio](./mdc-radio.md)
- [mdc-switch](./mdc-switch.md)
- [mdc-textfield](./mdc-textfield.md)
- [mdc-toolbar](./mdc-toolbar.md)

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
