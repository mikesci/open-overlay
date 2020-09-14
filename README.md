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
    elementName: "image", // the name of the Element
    top: 0,
    left: 0,
    width: 640,
    height: 480, // the position and dimensions of the layer, relative to the top left of the stage
    config: { // an object containing element-specific configuration values
      url: "asset:image.png"
      assetKey: "image.png"
    }
  }],
  script: "-- script here",
  assets: { // optional
    "image.png": "data:image/png;base64,..."
  }
}
```

## Elements
Elements are react components that control the rendering of each layer.  They must contain a static field named "manifest".  A built-in rectangle element is below.

```
class RectangleElement extends React.Component {
    static manifest = {
        name: "Rectangle",  // REQUIRED - the display name of the element
        author: "SCI",      // REQUIRED - the author of the element
        description: "A customizable rectangle.", // REQUIRED - a SHORT description of the element's purpose and capabilities
        width: 400, // REQUIRED - the default width of the element. may be omitted for elements with nonVisual: true.
        height: 400, // REQUIRED - the default height of the element. may be omitted for elements with nonVisual: true.
        // nonVisual: false, // OPTIONAL - specifies that the element has no visual rendering.  defaults to false
        // preserveAspect: false, // OPTIONAL - preserve aspect ratio by default when resizing.  defaults to false
        parameters: [ // REQUIRED (may be empty) - a list of parameters that will be used to configure the element
        {
          "name": "style", // REQUIRED - the name of the field.  this name will be used as the prop key during onConfigure.
          "displayName": "Style", // REQUIRED - the display name of the field
          "type": "style", // REQUIRED - the type of the field.  may be style, font, color, checkbox, select, radiogroup, slider, textarea, or text
          
          // for "style" types:
          // "grouped": false, // OPTIONAL - specifies that the style properties should not be grouped in a collapser.  Defaults to true.
          
          // for "select" types
          // "options": [ // REQUIRED - a list of the options in the dropdown
          // { label: "Label", value: "value" },
          // ...
          // ]
          
          // for "slider" types
          // "min": 0 // OPTIONAL - the minimum value for the slider.  Defaults to 0.
          // "max": 100 // OPTIONAL - the maximum value for the slider.  Defaults to 100.
          // "labelStepSize": 50 // OPTIONAL - the step size for the labels.  Defaults to "max" divided by 2.
          "defaultValue": { // default configuration values.  these will be applied to the "style" parameter.
            "backgroundColor": "#8247cf",
            "borderRadius": "20px"
          }
        }
        ]
    };
  
    render() {
        let style = Object.assign({}, this.props.style, { flex: "1 1 auto" });
        return (
            <div style={style}></div>
        );
    }
}
```

The OverlayEditor expects an object like the one below when being provided elements.  The "elementName" fields in each Layer correspond to the keys in the object.
```
elements = {
  "rectangle": RectangleElement,
  "image": ImageElement,
  ...
}
```

## Scripting
Open Overlay supports limited scripting at the overlay level. These scripts will be executed when the overlay becomes visible, and can be used to perform basic manipulations on layers and elements. Currently, the scripting environment exposes one variable, `overlay`, which exposes these manipulation functions:

**Function**|**Description**|**Example**|**Explanation**
-----|-----|-----|-----
`on(name, handler)`|Subscribes to an event emitted by any layer.|`overlay.on("twitch-chat", event => { console.log("<" + event.user.display-name + "> " + event.message); });`|Logs twitch chat messages
`on(name, layerName, handler)`|Subscribes to an event emitted by the layer named *layerName*.|`overlay.on("twitch-chat", "Twitch Chat Listener 1", event => { console.log("<" + event.user.display-name + "> " + event.message); });`| 
`setLayer(layerName, props)`|Sets layer properties such as position or any user-specified data|`overlay.setLayer("Text 1", { top: 20 });`|Moves the `Text 1` layer 20 pixels from the top of the frame
`clone(layerName)`|Makes a deep copy of the specified layer|`overlay.addLayer(overlay.clone("Text 1"));`|Copies the `Text 1` layer and inserts it into the overlay
`addLayer(layer)`|Inserts the given layer object (not name) into the overlay|See above| 
`removeLayer(layerName)`|Removes the given layer from the overlay|`overlay.removeLayer("Text 1");`|Removes the `Text 1` layer from the overlay
`update()`|Updates any properties modified with `setLayer`| | 
`emit(eventName, args, sourceLayer)`|Emits an event to the overlay's event bus from a specified layer. Will be ignored on the layer specified by `sourceLayer`. |`overlay.emit("test-event", argumentObject, testLayer);`|Emits a "test-event" with the argument `argumentObject` from the layer stored in the variable `testLayer`.
`layers()`|Gets an array of all layers currently in the overlay|`overlay.layers()[0]`|Gets the first layer in the overlay.
`hasModifiedLayers()`|Check if there are updates to layers in this overlay which have not been committed with a call to `update()`| | 
`lastUpdated()`|Gets the unix timestamp of the last time `update()` was called or the layer was updated by the user.| | 
