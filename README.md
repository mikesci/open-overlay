# Open Overlay
An open source, react-based overlay builder for livestreaming.

The public implementation of this package is available at https://openoverlay.org and the corresponding GitHub page can be found [here](https://github.com/mikesci/open-overlay-web).

## What's this then?

This package contains the core designer components used in the system above.  There are two main components:

- OverlayEditor.jsx
  - Handles building an entire overlay.  Expects the following props:
    - width - the width of the output stage
    - height - the height of the output stage
    - layers - an array of Layers (more below)
    - elements - an object containing the Elements to be made available in the editor (more below)
    - storage - a class containing storage methods (more below)
    - onDataTransfer - a method called whenever a data transfer event happens (more below)
    - onLayersChanged - a method called whenever layer data changes permanently

- ElementEditor.jsx
  - Handles configuring an element.  This is intended to replace the content on an element webpage.  Expects the following props:
    - stageRoot - the DOM element that contains the rendering stage
    - element - an element class returned from ExternalElement.MakeComponent
    - configValues - an object containing the current configuration values for the specified element
    - onConfigure - called whenever the editor changes configValues
    - onConfigValuesChanged - called whenever the editor changes configValues *permanently*  
  
## Layers
An overlay is not much more than a collection of layers.  Each layer references a single element.  More about elements below.

The structure for a layer is as follows:
```
layer = {
  id: 1, // A unique numeric id for each layer.  The editor will determine the maximum id in use and increment it for new layers.
  elementName: "image", // the name of the Element
  top: 0, //
  left: 0, //
  width: 640, //
  height: 480, // the position and dimensions of the layer, relative to the top left of the stage
  config: { // an object containing element-specific configuration values
    url: "http://path/to/image.png"
  }
}
```

## Elements
Elements are react components that control the rendering of each layer.  They must contain a static field named "MANIFEST".  A simple rectangle element is below.  Many builtin elements are available at https://github.com/mikesci/open-overlay-web/

```
class RectangleElement extends React.Component {
    static MANIFEST = {
        name: "Rectangle",  // REQUIRED - the display name of the element. required.
        author: "SCI",      // REQUIRED - the author of the element. required.
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
          "defaultValue": {
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
