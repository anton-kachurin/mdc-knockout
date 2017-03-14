# Knockout Material Components

Knockout Material Components (MDC-Knockout) help Knockout developers execute
[Material Design](https://www.material.io/).
This project is built on top of the Google's
[MDC-Web](https://github.com/material-components/material-components-web)
components and allows to use them on the Knockout enabled websites in
a pretty, concise manner.

There are two different ways to use Knockout Material Components:
- HTML-only, when Knockout is used only to generate MDC-Web compatible HTML
structure
- Fully featured, when Knockout bindings are used to link data to the UI

Either way, the development will be faster (as required markup is shorter)
and free of error-prone copy pasting. Besides, the bindings that can be used
with MDC-Knockout are not limited only to the standard ones, so it's easy to
plug these components in any existing Knockout project.

## Quick start

Component library doesn't come bundled with `Knockout` itself, so make sure to
include `v3.0+` in your pages.

Also,
[MDC-Web CSS](https://github.com/material-components/material-components-web#css)
is required.

Finally, from this repository download `/dist/mdc-knockout.min.js` and place it
on your server, e.g in `/static/js/mdc-knockout.min.js`.

Then write some HTML and don't forget to run `ko.applyBindings()`
at the closing `<script>` tag.

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Knockout Material Components Demo</title>
  </head>
  <link rel="stylesheet" href="https://unpkg.com/material-components-web@latest/dist/material-components-web.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.1/knockout-min.js"></script>
  <script src="/static/js/mdc-knockout.min.js"></script>
  <body>

    <mdc-form-field params="text: 'This is awesome'">
      <mdc-checkbox id="checkbox"></mdc-checkbox>
    </mdc-form-field>

    <script type="text/javascript">
      ko.applyBindings();
    </script>
  </body>
</html>
```

Please refer to [documentation](./docs/components.md) for comprehensive list of
components and their usage examples.

## Building from source

`dist` usually contains the latest version of the components. In case you need
to make some adjustments to the code, take the following steps:
1. Setup this repo:

  ```shell
  git clone https://github.com/anton-kachurin/mdc-knockout.git && cd mdc-knockout
  npm i
  ```

2. Run the dev server with demos:

  ```shell
  npm run dev
  ```

  Open http://localhost:8080/demo/ in a browser to see a list of demos.

3. Build and update files in `dist` folder:

  ```shell
  npm run dist
  ```

Note: demo pages refer to `<script src="../dist/mdc-knockout.js"></script>`.
If you're running the dev server, `mdc-knockout.js` is stored in the memory
and updated on the fly every time when any file from `src` folder is edited.
You also can open `demo/*.html` from file system, in this case the actual
`dist/mdc-knockout.js` will be used.
