# <img src="https://openoverlay.org/apple-touch-icon.png" align="left" height="48" width="48" /> Open Overlay 3.x.x
An open source, React-based overlay builder for livestreaming.

The public implementation of this package is available at https://openoverlay.org.

## What's this then?

This project contains the core component used for the tool above.

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

## Scripting

Available at https://openoverlay.org/releases/2.0/docs/
or in docs/
