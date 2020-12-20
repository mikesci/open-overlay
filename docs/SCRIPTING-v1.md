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
