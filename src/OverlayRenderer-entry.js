import React from "react";
import ReactDOM from "react-dom";
import LayerRenderer from "./components/LayerRenderer.jsx";
import Elements from "./components/Elements.jsx";

window.OverlayRenderer = new class {

    _lastOptions;
    _appElement;
    _elements;

    _loadElements(layers) {
        let elements = this._elements || Object.assign({}, Elements.Builtin);

        for(let layer of layers) {
            if (layer.elementName && layer.elementName.startsWith("http") && !elements[layer.elementName]) {
                elements[layer.elementName] = Elements.MakeExternal({
                    url: layer.elementName,
                    manifest: {}
                });
            }
        }

        this._elements = elements;
    }

    mount(options) {

        // save options to _lastOptions to allow for mount() to be called later without a parameter
        if (!options) {
            if (!this._lastOptions) {
                console.log("No options provided.");
                return;
            }
            options = this._lastOptions;
        } else {
            this._lastOptions = options;
        }

        // inject a root element
        if (!this._appElement) {

            options.target["style"] 

            this._appElement = document.createElement("div");
            this._appElement.id = "app";
            options.target.appendChild(this._appElement);
        }

        this._loadElements(options.layers);

        ReactDOM.render(<LayerRenderer
            layers={options.layers}
            elements={this._elements} />, this._appElement);
    }
}