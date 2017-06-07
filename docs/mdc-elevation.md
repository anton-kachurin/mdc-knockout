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
