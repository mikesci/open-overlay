export default class ScriptingContext {

    _layerScriptingContexts = {};
    _onLayersUpdated;
    _hasModifiedLayers;
    _layers;

    constructor(opts) {
        this._onLayersUpdated = opts.onLayersUpdated;
    }

    createLayerContext = (layer) => {
        if (!layer.id) { throw "Layer must have an id."; }
        let layerScriptingContext = this._layerScriptingContexts[layer.id];
        if (!layerScriptingContext) {
            layerScriptingContext = new LayerScriptingContext(this, layer);
            this._layerScriptingContexts[layer.id] = layerScriptingContext;
        }
        return layerScriptingContext;
    }

    clearLayerContext = (layerId) => {
        if (this._layerScriptingContexts[layerId])
            delete this._layerScriptingContexts[id];
    }

    emitToOtherLayers = (eventName, data, sourceLayer) => {
        console.log(`Emitting ${eventName} from ${sourceLayer.id}`);
        for(let [id, context] of Object.entries(this._layerScriptingContexts)) {
            if (id != sourceLayer.id) {
                context.handleEvent(eventName, data, sourceLayer);
            }
        }
    }

    hasModifiedLayers = () => {
        return this._hasModifiedLayers;
    }

    getLayers = () => {
        return this._layers;
    }

    setLayers = (layers) => {
        this._hasModifiedLayers = false;
        this._layers = layers;
    }

    findLayerIndexByLabel = (label) => {
        return this._layers.findIndex(r => r.label == label);
    }

    setLayerProps = (layerTitle, props) => {
        let layerIndex = this.findLayerIndexByLabel(layerTitle);
        if (layerIndex == -1) { return; }
        let layers = [...this._layers];
        layers[layerIndex] = {...layers[layerIndex], ...props}
        this._layers = layers;
        this._hasModifiedLayers = true;
        this._onLayersUpdated();
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
        this._onLayersUpdated();
    }
};

class LayerScriptingContext {
    
    _layer;
    _overlayScriptingContext;
    _callbacks = {};
    
    constructor(overlayScriptingContext, layer) {
        this._overlayScriptingContext = overlayScriptingContext;
        this._layer = layer;
    }

    on = (eventName, callback) => {
        this._callbacks[eventName] = callback;
    }

    off = (eventName) => {
        if (this._callbacks[eventName]) { delete this._callbacks[eventName]; }
    }

    reset = () => {
        this._callbacks = {};
    }

    emit = (eventName, data) => {
        this._overlayScriptingContext.emitToOtherLayers(eventName, data, this._layer);
    }

    handleEvent = (eventName, data, sourceLayer) => {
        let callback = this._callbacks[eventName];
        if (callback) {
            callback(data, sourceLayer);
        }
    }

    setLayerProps = (layerTitle, props) => {
        this._overlayScriptingContext.setLayerProps(layerTitle, props);
    }

    setLayerConfig = (layerTitle, config) => {
        this._overlayScriptingContext.setLayerConfig(layerTitle, config);
    }
}