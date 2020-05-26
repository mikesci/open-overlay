// quick reference for scripting functions

// listen for "event-name" on a layer titled "layer 1"
// A: on("event-name", "layer 1", (eventArgs) => { ... })

// listen for "event-name" on any layer
// A: on("event-name", (eventArgs) => { ... })

// set the props on "layer 1" - props are position (top, left, width, height, rotation)
// A: setLayerProps("layer 1", { top: 10 })

// set the config on a layer - config are element-specific fields
// A: setLayerConfig("layer 1", { text: "new text here" })


/* 
// emit a custom event "custom-event"
// A: emit("custom-event", { arg1, arg2 });
// B: self().emit("custom-event", args)
*/

export default class ScriptingContext {

    _onLayersUpdated;
    _hasModifiedLayers = false;
    _layers;

    _eventHandlers = {};

    _interceptedTimeouts = [];
    _interceptedIntervals = [];

    constructor(opts) {
        this._onLayersUpdated = opts.onLayersUpdated;
    }

    emitToOtherLayers = (eventName, eventArgs, sourceLayer) => {
        let handlers = this._eventHandlers[eventName];
        if (!handlers) { return; }

        for(let handler of handlers) {
            // skip any handler that has a layer filter specified, but doesn't match
            if (handler.layerFilter && sourceLayer.label != handler.layerFilter) 
                continue;
            
            // invoke the callback
            handler.callback(eventArgs, sourceLayer);
        }
    }

    hasModifiedLayers = () => {
        return this._hasModifiedLayers;
    }

    getLayers = () => {
        return this._layers || [];
    }

    getLastExecutionError = () => {
        return this._lastExecutionError;
    }

    findLayerIndexByLabel = (label) => {
        return this._layers.findIndex(r => r.label == label);
    }

    matchLayerObject = (layer, layerFilterObject) => {
        for(let [prop, val] of Object.entries(layerFilterObject)) {
            if (layer[prop] != val) { return false; }
        }
        return true;
    }

    matchLayerLabel = (layer, layerFilterString) => {
        return (layer.label == layerFilterString);
    }

    matchLayerAll = () => { return true; }

    reset = () => {
        
        // remove all event handlers
        this._eventHandlers = [];

        // clear all timeouts
        for(let timeout of this._interceptedTimeouts) { clearTimeout(timeout); }
        this._interceptedTimeouts = [];

        // clear all intervals
        for(let interval of this._interceptedIntervals) { clearInterval(interval); }
        this._interceptedIntervals = [];

        this._hasModifiedLayers = false;

        this._layers = [];

        this._onLayersUpdated(this._layers);
    }

    /*
    setLayerProps = (layerTitle, props) => {
        let layerIndex = this.findLayerIndexByLabel(layerTitle);
        if (layerIndex == -1) { return; }
        let layers = [...this._layers];
        layers[layerIndex] = {...layers[layerIndex], ...props}
        this._layers = layers;
        this._hasModifiedLayers = true;
        this._onLayersUpdated(layers);
    }

    setLayerConfig = (layerTitle, config) => {
        let layerIndex = this.findLayerIndexByLabel(layerTitle);
        if (layerIndex == -1) { return; }
        let layers = [...this._layers];
        let layer = {...layers[layerIndex]};
        layer.config = {...layer.config, ...config};
        layers[layerIndex] = layer;
        this._layers = layers;
        this._hasModifiedLayers = true;
        this._onLayersUpdated(layers);
    }
    */

    validateScript = (script) => {
        try {
            window.Function(`return function(on, setLayerProps, setLayerConfig) { ${script} }`)();
            return null;
        }
        catch (ex) {
            return ex;
        }
    }

    // WITH LAYER FILTER: on("event-name", "layer 1", (args) => {})
    // WITHOUT:           on("event-name", null,      (args) => {})
    on = (eventName, layerFilter, callback) => {
        let handlers = this._eventHandlers[eventName];
        if (!handlers) {
            handlers = [];
            this._eventHandlers[eventName] = handlers;
        }

        handlers.push({ layerFilter, callback });
    }

    set = (layerFilter, callbackFnOrObject) => {
        // if we have no layers, get outta here
        if (!this._layers) { return; }

        // determine our layer match function
        let matchFn = (typeof layerFilter === "object" ? this.matchLayerObject : (layerFilter == "*" ? this.matchLayerAll : this.matchLayerLabel));

        // find out if our parameter is a callback or a function
        let isCallback = (typeof callbackFnOrObject === "function" ? true : false);

        // iterate
        for(let i = 0; i < this._layers.length; i++) {
            
            // skip layers that don't match
            if (!matchFn(this._layers[i], layerFilter)) { continue; }

            let layer = {...this._layers[i]};

            let result = (isCallback ? callbackFnOrObject(layer) : callbackFnOrObject);
            
            // apply the changes to the layer if we had a return value
            if (result) {
                for(let [prop, val] of Object.entries(result)) {
                    if (prop == "config")
                        Object.assign(layer.config, val);
                    else
                        layer[prop] = val;
                }
            }

            this._layers[i] = layer;
        }

        this._hasModifiedLayers = true;
        this._onLayersUpdated(this._layers);
    }

    setTimeoutOverride = (callback, delay) => {
        let timeout = setTimeout(callback, delay);
        this._interceptedTimeouts.push(timeout);
        return timeout;
    }

    setIntervalOverride = (callback, period) => {
        let interval = setInterval(callback, period);
        this._interceptedIntervals.push(interval);
        return interval;
    }

    execute = (layers, script) => {
        
        this._layers = layers;

        this._lastExecutionError = null;

        try
        {
            window.Function(`return function(on, set, setTimeout, setInterval) { ${script} }`)()(
                this.on,
                this.set,
                this.setTimeoutOverride,
                this.setIntervalOverride
            );
            return true;
        }
        catch (ex) {
            this._lastExecutionError = ex;
            return false;
        }
    }
};