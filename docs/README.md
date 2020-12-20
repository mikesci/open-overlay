# Open Overlay
An open source, react-based overlay builder for livestreaming.

The public implementation of this package is available at https://openoverlay.org.

## What's this then?

This package contains the core designer component used in the system above.

- OverlayEditor.jsx
  - Handles building an entire overlay.  Expects the following props:
    - width - the width of the output stage
    - height - the height of the output stage
    - overlay - the overlay object (more below)
    - elements - an object containing additional Elements to be made available in the editor (more below)
    - disableBuiltinElements - disables the default, built-in Elements
    - onOverlayChanged - called when the overlay object changes
    - onUpload - called when a file is going to be uploaded.  providing this value disables the inline uploader.
  
## Overlay Object

The structure for an overlay is as follows:
```
overlay = {
  layers: [{
    id: 1, // A unique numeric id for each layer.  The editor will determine the maximum id in use and increment it for new layers.
    elementName: "image", // contains the name of the Element that will render the layer
    label: "Image Name", // contains the UI label for the layer
    style: { top: "0px", left: "0px", width: "640px", height: "480px" }, // contains the react-compatible style definition
    config: { url: "asset:image.png" } // contains element-specific configuration values
  }],
  scripts: { "main.js": "//script here" },
  assets: {  "image.png": "data:image/png;base64,..." }
}
```
