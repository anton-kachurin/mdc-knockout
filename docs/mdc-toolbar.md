# Toolbar

MDC Toolbar acts as a container for multiple rows containing items such as
application title, navigation menu, and tabs, among other things.
Toolbars scroll with content by default, but support fixed behavior as well.

When using the fixed pattern, a persistent elevation is added to toolbar.
When using the waterfall pattern, a toolbar will have no elevation when the page
is scrolled to the top, and gain elevation when a user begins to scroll down the page.
Toolbars also support anchored only last row at the top behavior. For toolbars
with this modifier, only the last row will be anchored at the top, while the
rest of toolbar scrolls off.

Flexible behavior can be added to mdc-toolbar, where the height of the toolbar
changes as the user scrolls. This type of toolbars will have additional
height added to their first rows.

## Design & Additional Documentation

- [Material Design guidelines: Toolbars](https://material.io/guidelines/components/toolbars.html)
- [MDC-Web Toolbar Component](https://github.com/material-components/material-components-web/blob/master/packages/mdc-toolbar/README.md)
- [Demo](https://anton-kachurin.github.io/mdc-knockout/demo/toolbar.html)


## Parameters

| Name      | Type        | Description                                        |
| ----------|------------ | ---------------------------------------------------|
| fixed     | boolean     | Makes toolbar fixed on top and have persistent elevation |
| waterfall | boolean     | Makes toolbar to gain elevation when a user begins to scroll down the page |
| lastrow   | boolean     | Makes only last row of toolbar anchored on top     |
| flexible  | boolean     | Makes toolbar first row to have flexible space     |
| adjust    | HTMLElement | Element adjacent to the fixed, waterfall, or lastrow toolbar |
| ratio     | ko, float   | Writable observable, will be updated when scrolling flexible toolbars |


## Attributes

| Name   | Description                            |
|--------|----------------------------------------|
| start  | Section aligns to the start            |
| end    | Section aligns to the end              |
| shrink | Section takes the width of its content |
| title  | Style element text as title            |
| menu   | Style element as a menu icon           |
| icon   | Style element as a toolbar icon        |

## HTML-only

MDC-Knockout doesn't come bundled with any icon font, so you may need to include
one manually to use this component. The demonstrations use the
[Material Design Icon Font](https://design.google.com/icons/).
You may include this to use them as shown or use any other icon method you wish.

### Structure

MDC Toolbar acts as a container for one or multiple `rows` each containing one or
multiple `sections`. `<div>` elements that are direct descendants of `<mdc-toolbar>`
represent rows. `<section>` elements placed directly inside rows split the space
horizontally:
```HTML
<mdc-toolbar>
  <div>
    <section>
      <!-- This section takes 100% width of the row -->
    </section>
  </div>
  <div>
    <section>
      <!-- Row 2, Section 1 -->
    </section>
    <section>
      <!-- Row 2, section 2 -->
    </section>
  </div>
</mdc-toolbar>
```

By default, each section will take up an equal amount of space within the row
and its content will be aligned to the center. This behavior can be changed by
adding `start`, `end`, and `shrink` attributes to `<section>`:
```HTML
<mdc-toolbar>
  <div>
    <section start><!-- Content is aligned to the left --></section>
  </div>
  <div>
    <section end><!-- Content is aligned to the right --></section>
  </div>
  <div>
    <section shrink><!-- Content will take as few of horizontal space as possible --></section>
    <section>This section may contain very long text or any other kind of wide content now</section>
  </div>
</mdc-toolbar>
```

### Toolbar title

Use `title` attribute on some element to style toolbar text representing
a page's title, or an application name:
```HTML
<mdc-toolbar>
  <div>
    <section>
      <span title>Application Name</span>
    </section>
  </div>
</mdc-toolbar>
```

### Toolbar icons

Icons can be added as anchor tags, spans, or buttons. To represent the left most
icon (usually to the left of the title), add `menu` attribute to the element.
To represent any icons placed on the right side of a toolbar, use `icon` attribute:
```HTML
<mdc-toolbar>
  <div>
    <section start>
      <a href="#" class="material-icons" menu>menu</a>
    </section>
    <section>
      <span title>Title</span>
    </section>
    <section end>
      <a href="#" class="material-icons" icon>print</a>
      <a href="#" class="material-icons" icon>more_vert</a>
    </section>
  </div>
</mdc-toolbar>
```

### Shorthand form

MDC-Knockout allows for skipping some of the wrapping elements when defining
toolbar's structure.

First of all, one or more consecutive elements that are not `<div>` placed
directly inside `<mdc-toolbar>` will be automatically wrapped in a single `<div>`:
```HTML
<mdc-toolbar>
  <section></section>
  <section></section>
</mdc-toolbar>

<!-- Equivalent: -->
<mdc-toolbar>
  <div>
    <section></section>
    <section></section>
  </div>
</mdc-toolbar>
```

Every element that is not `<section>` placed directly inside `mdc-toolbar > div`
will be automatically wrapped in a separate `<section>`:
```HTML
<mdc-toolbar>
  <div>
    <span>1</span>
    <span>2</span>
  </div>
</mdc-toolbar>

<!-- Equivalent: -->
<mdc-toolbar>
  <div>
    <section>
      <span>1</span>
    </section>
    <section>
      <span>2</span>
    </section>
  </div>
</mdc-toolbar>
```

If wrapped element had any section-related attributes, those are transferred:
```HTML
<mdc-toolbar>
  <a start shrink href="#" class="material-icons" menu>menu</a>
  <span start title>Title</span>
</mdc-toolbar>

<!-- Equivalent: -->
<mdc-toolbar>
  <div>
    <section start shrink>
      <a href="#" class="material-icons" menu>menu</a>
    </section>
    <section start>
      <span title>Title</span>
    </section>
  </div>
</mdc-toolbar>
```

Additionally, any plain text placed directly inside `<section>` will be
automatically wrapped in `<span title>`:
```HTML
<mdc-toolbar>
  <div>
    <section>
      Application Name
    </section>
  </div>
</mdc-toolbar>

<!-- Equivalent: -->
<mdc-toolbar>
  <div>
    <section>
      <span title>Application Name</span>
    </section>
  </div>
</mdc-toolbar>
```

Ultimately, the minimal required structure for a toolbar is:
```HTML
<mdc-toolbar>
  Title
</mdc-toolbar>
```

### Fixed toolbars

To keep the toolbar fixed to the top of the screen, set `fixed: true` parameter.
Also, you need to set the margin of the content to prevent toolbar overlaying
your content. This could be done via CSS (by setting `margin-top` property)
or via `adjust` parameter like so:
```HTML
<mdc-toolbar params="fixed: true, adjust: document.querySelector('main')">
  Title
</mdc-toolbar>

<main>
  This content will not be overlapped
</main>
```

### Waterfall toolbars

Waterfall toolbar is initially static and has no elevation, and then when
the user starts scrolling becomes fixed and gains elevation:
```HTML
<mdc-toolbar params="waterfall: true, adjust: document.querySelector('main')">
  Title
</mdc-toolbar>

<main>
  Content
</main>
```

### Fixed Last Row toolbars

These toolbars will anchor only the last row to the top:
```HTML
<mdc-toolbar params="lastrow: true, adjust: document.querySelector('main')">
  <div>
    <!-- This row will scroll off screen -->
  </div>
  <div>
    <!-- This row will anchor on top of screen -->
  </div>
</mdc-toolbar>

<main>
  Content
</main>
```

### Flexible toolbars

Flexible behavior can be added to a toolbar whose height changes as the user
scrolls. Use `flexible: true; adjust: ...` parameters to enable it.

For detailed explanation of how flexible toolbars may be styled, please refer to
[original component's documentation](https://github.com/material-components/material-components-web/blob/master/packages/mdc-toolbar/README.md#flexible-toolbar-requires-javascript).


## Fully featured

You can use Knockout bindings with `<mdc-toolbar>` content to add some dynamic
behavior to the toolbar's content, such as binding title to an observable:
```HTML
<mdc-toolbar>
  <span title data-bind="text: currentPageTitle"></span>
</mdc-toolbar>
```

For flexible toolbars, you can provide a writable observable to `ratio` parameter,
which will update as the user scrolls with a number from 0-1 representing the
ratio of flexible space that has already been collapsed divided by the total
amount of flexible space. In other words, initially the value of `ratio` will be
`1` and after scrolling it will go down to `0`.

> Passing a value to the observable band to `ratio` parameter will do nothing.

> The intended application for this parameter is to either use a writable computed
> observable or a regular observable with a subscription.
