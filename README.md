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

MDC-Knockout doesn't come bundled with `Knockout` itself, so make sure to
include `v3.2+` in your pages.

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
  <link rel="stylesheet"
        href="https://unpkg.com/material-components-web@latest/dist/material-components-web.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.1/knockout-min.js"></script>
  <script src="/static/js/mdc-knockout.min.js"></script>
  <body>

    <mdc-form-field>
      <mdc-checkbox id="checkbox" checked></mdc-checkbox>
      This is awesome
    </mdc-form-field>

    <script type="text/javascript">
      ko.applyBindings();
    </script>
  </body>
</html>
```

Please refer to [documentation](./docs/components.md) for a comprehensive list
of the components and usage examples.

## Building from source

`dist` folder usually contains the latest version of the components. In case
you need to make some adjustments to the code, take the following steps:

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

  The dev server will automatically reload component's demo page whenever
  files in the `src` folder have been edited, but it will not take any action
  if only `demo/*.html` was changed.

3. Build and update files in the `dist` folder:

  ```shell
  npm run dist
  ```

Note: Demo pages refer to `<script src="../dist/mdc-knockout.js"></script>`.
If you're running the dev server, this script is stored in the memory
and updated on the fly every time when any file from `src` folder is edited.
You also can open `demo/*.html` from the file system, without running a
dev server, in this case the actual `dist/mdc-knockout.js` will be used, and
no on the fly updates will be available.

## Testing

```shell
npm run test
npm run test:watch
```

Karma will run tests using a headless Chrome. In the watch mode, a webserver
will run on `localhost:9876` allowing to use any other additional browser.
