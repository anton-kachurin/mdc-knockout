# Floating Action Button

The MDC FAB component is a spec-aligned floating button component adhering to the
[Material Design FAB requirements](https://material.io/guidelines/components/buttons-floating-action-button.html).

FABs are rendered as `<button>` elements. You can add standard attributes to the
component such as `type="submit"`, `tabindex="0"`, or `onclick="buttonClick()"`
and it will act exactly like a normal `<button>` HTML element.

## Design & Additional Documentation

- [Material Design guidelines: Floating Action Button](https://material.io/guidelines/components/buttons-floating-action-button.html)
- [MDC-Web FAB Component](https://github.com/material-components/material-components-web/blob/master/packages/mdc-fab/README.md)
- [Demo](https://anton-kachurin.github.io/mdc-knockout/demo/fab.html)


## Parameters

| Name  | Type        | Description                            |
| ------|------------ | ---------------------------------------|
| mini  | ko, boolean | Makes the FAB smaller.                 |
| plain | ko, boolean | Makes the FAB have a white background. |
| icon  | ko, string  | Textual name of the icon.              |


## HTML-only

MDC-Knockout doesn't come bundled with any icon font, so you may need to include
one manually to use this component. The demonstrations use the
[Material Design Icon Font](https://design.google.com/icons/).
You may include this to use them as shown or use any other icon method you wish.

### Default

```HTML
<mdc-fab class="material-icons">favorite</mdc-fab>
```

### Mini

```HTML
<mdc-fab class="material-icons" params="mini: true">favorite</mdc-fab>
```

### Plain

```HTML
<mdc-fab class="material-icons" params="plain: true">favorite</mdc-fab>
```

### Usage with no icon font

```HTML
<mdc-fab>
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
</mdc-fab>
```

### Positioning of the element

By default the FAB rests in the page where it sits in the content flow.
Developers must position it as-needed within their applications designs.

```HTML
<style>
  .fab-fixed {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }
</style>

<mdc-fab class="fab-fixed material-icons">add</mdc-fab>
```


## Fully featured

`icon` parameter is helpful when using icon fonts supporting
[ligatures](http://alistapart.com/article/the-era-of-symbol-fonts).
Pass an observable containing the textual name of the icon as the value of the
`icon` parameter to control the look of the FAB.

```HTML
<mdc-fab class="material-icons" params="icon: editMode() ? 'save' : 'add'"></mdc-fab>
```

`mini` and `plain` parameters accept observable values, and it may be used to
make the appearance of the FAB more interactive:

```HTML
<mdc-fab class="material-icons" params="mini: showCompact">favorite</mdc-fab>
```
