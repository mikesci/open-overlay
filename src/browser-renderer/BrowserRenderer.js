import { mergeDOM } from "./utilities.js";
import ScriptingContext from "./ScriptingContext.js";

/* import the overlay renderer element and overlay */
import "./OpenOverlayRenderer.js";
import "./OpenOverlayOverlay.js";

/* import elements */
import defaultElements from "./elements";

class BrowserRenderer {

    _executeScriptsOnLoad = true;
    _rendererDOM;
    _elements = {};

    get elements() { return this._elements; }

    constructor(options) {

        if (options) {
            if (options.executeScriptsOnLoad !== undefined)
                this._executeScriptsOnLoad = options.executeScriptsOnLoad;
        }

        this.render = this.render.bind(this);
        this.renderOverlay = this.renderOverlay.bind(this);
        this.renderLayer = this.renderLayer.bind(this);
        this.registerElement = this.registerElement.bind(this);
        this.unregisterElement = this.unregisterElement.bind(this);
        this.unregisterAllElements = this.unregisterAllElements.bind(this);
        this.executeScripts = this.executeScripts.bind(this);

        // start with default elements
        this._elements = {...defaultElements};
    }

    createDomElement() {
        
    }

    registerElement(elementName, elementDef) {
        this._elements[elementName] = elementDef;
    }

    unregisterElement(elementName) {
        delete this._elements[elementName];
    }

    unregisterAllElements() {
        this._elements = {};
    }

    render(targetDOM, overlayArray) {
        //console.log("got render call: ", targetDOM, overlayArray);
        let children = targetDOM.children;
        if (children.length > 1) {
            console.error("Cannot render to an element containing children.");
            return;
        }

        if (children.length == 0) {
            // auto-create the renderer element
            this._rendererDOM = document.createElement("openoverlay-renderer");
            window.customElements.upgrade(this._rendererDOM);
            targetDOM.appendChild(this._rendererDOM);
        }
        else if (children[0] != this._rendererDOM) {
            console.error("Cannot render to an element containing children.")
            return;
        }
        
        mergeDOM(this._rendererDOM.rootElement, overlayArray, this.renderOverlay);
    }

    renderOverlay(overlay, overlayDOM) {
    
        if (!overlayDOM) {
            overlayDOM = document.createElement("openoverlay-overlay");
            window.customElements.upgrade(overlayDOM);
            overlayDOM.renderer = this;

            if (this._executeScriptsOnLoad)
                overlayDOM.addEventListener("load", this.executeScripts);
        }

        // if overlayDOM's srcObject matches this overlay, skip it - no need to update
        if (overlayDOM.srcObject != overlay) {
            overlayDOM.renderLayer = this.renderLayer;
            overlayDOM.id = overlay.id;
            overlayDOM.assets = overlay.assets;
            overlayDOM.scripts = overlay.scripts;
            overlayDOM.settings = overlay.settings;
            overlayDOM.hidden = overlay.hidden;

            // merge the dom with the object model for layers
            mergeDOM(overlayDOM, overlay.layers, this.renderLayer);
        }

        return overlayDOM;
    }

    renderLayer(layer, layerDOM) {

        if (!layer.elementName) {
            console.error("Layer has no elementName specified.");
            return;
        }

        if (!layerDOM) {
            const element = this._elements[layer.elementName];

            if (!element) {
                console.error("Unable to create layer - unsupported element: " + layer.elementName);
                return;
            }

            layerDOM = element.createDOM();
            window.customElements.upgrade(layerDOM);
        }

        // apply all properties that have changed, except the special ones
        for(const [propName, propValue] of Object.entries(layer)) {
            switch (propName) {
                case "id":
                case "elementName":
                case "label":
                    // ignored properties
                    break;
                default:
                    if (layerDOM[propName] != propValue)
                        layerDOM[propName] = propValue;
                    break;
            }
        }

        return layerDOM;
    }

    executeScripts() {
        for(const overlay of this._rendererDOM.rootElement.children) {
            if (overlay.scriptingContext) {
                console.error("You must call resetScripts() before executing scripts again.");
                return;
            }

            overlay.scriptingContext = new ScriptingContext(overlay, overlay.scripts, overlay.assets, overlay.settings, this.renderLayer);
        }
    }

    resetScripts() {
        for(const overlay of this._rendererDOM.rootElement.children) {
            if (!overlay.scriptingContext) {
                console.error("No current scripting context to reset.");
                return;
            }

            overlay.scriptingContext.destroy();
            overlay.scriptingContext = null;
        }
    }

    sendCommand(command, commandArg, overlayid, layerid) {
        if (!this._rendererDOM) {
            console.error("Could not send command - renderer not yet initialized.");
            return;
        }
        this._rendererDOM.sendCommand(command, commandArg, overlayid, layerid);
    }

    getOverlay(overlayid) {
        if (!this._rendererDOM) {
            console.error("Could not get overlay - renderer not yet initialized.");
            return;
        }
        return this._rendererDOM.getOverlay(overlayid);
    }
}

export default BrowserRenderer;

