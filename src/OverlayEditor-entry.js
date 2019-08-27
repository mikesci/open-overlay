import React from "react";
import ReactDOM from "react-dom";
import OverlayEditor from "./components/OverlayEditor.jsx";
import Elements from "./components/Elements.jsx";
import ExternalElementHelper from "./shared/ExternalElementHelper.js";

window.OverlayEditor = new class {
    
    _loadElements = (storage, layers) => {
        return new Promise((resolve, reject) => {
            // construct the elements list
            let elements = Object.assign({}, Elements.Builtin);

            // load from storage
            let externalElements = storage.ListExternalElements();
            for(let externalElement of externalElements) {
                elements[externalElement.url] = Elements.MakeExternal(externalElement);
            }

            // load from layers
            let externalLoadPromises = [];
            for(let layer of layers) {
                if (layer.elementName && layer.elementName.startsWith("http") && !elements[layer.elementName]) {

                    // put a placeholder "null" element in? 

                    // should show a loading overlay or something?

                    externalLoadPromises.push(ExternalElementHelper.LoadFromUrl(layer.elementName)
                        .catch(err => {
                            console.log(`Could not load element '${layer.elementName}': ${err}`);
                            return null;
                        })
                        .then(externalElement => {
                            if (externalElement) {
                                elements[layer.elementName] = Elements.MakeExternal(externalElement);
                            }
                            return true;
                        }));
                }
            }

            if (externalLoadPromises.length == 0) {
                resolve(elements);
            } else {
                Promise.all(externalLoadPromises).then(() => resolve(elements));
            }
        });
    }

    mount(options) {

        let target = options.target || document.body;
        let layers = options.layers || [];

        // inject a root element
        let appElement = document.createElement("div");
        appElement.id = "app";
        appElement.className = "bp3-dark"; // dark mode
        target.appendChild(appElement);

        let elements = this._loadElements(options.storage, layers).then(elements => {
            ReactDOM.render(<OverlayEditor
                width={1920}
                height={1080}
                storage={options.storage}
                onUpload={options.onUpload}
                elements={elements}
                layers={layers}
                onLayersChanged={options.onLayersChanged} />, appElement);
        });
    }
}