import React, { useContext } from "react";
import { useOverlayEditorContext } from "./OverlayEditorContext.js";

const LayerSelectionContext = React.createContext();

// merges the props from offer into target if and only if they match
// non-matching or missing props from either object will be set to nonMatchingPropValue
function mergeProps(target, offer, nonMatchingPropValue) {
    // check props, first from target to offer
    for(const propKey of Object.keys(target)) {
        if (target[propKey] != offer[propKey]) {
            if (nonMatchingPropValue === undefined)
                delete target[propKey];
            else
                target[propKey] = nonMatchingPropValue;
        }
    }

    // then from offer to target
    for(const propKey of Object.keys(offer)) {
        if (target[propKey] != offer[propKey]) {
            if (nonMatchingPropValue === undefined)
                delete target[propKey];
            else
                target[propKey] = nonMatchingPropValue;
        }
    }
}

function recalculate() {
    const [[layers, renderer, selectedLayerIds], dispatch] = useOverlayEditorContext(
        state => state.overlay.layers,
        state => state.renderer,
        state => state.selectedLayerIds);

    if (!layers)
        return null;

    const mergedContext = layers.reduce((mergedContext, layer) => {
        if (selectedLayerIds.includes(layer.id)) {
            const elementDef = renderer.elements[layer.elementName];

            if (!elementDef) {
                console.error("Could not find elementName: " + layer.elementName);
                return mergedContext;
            }

            if (!mergedContext) {
                mergedContext = {
                    selectedLayerIds,
                    layer: {...layer}
                };
            }
            else {
                // merge in the layer props
                mergeProps(mergedContext.layer, layer);
            }
        }
        return mergedContext;
    }, null);

    return mergedContext;
}

const LayerSelectionContextProvider = function(props) {
    return <LayerSelectionContext.Provider value={recalculate()} {...props} />
}

const useLayerSelectionContext = function() {
    return useContext(LayerSelectionContext);
}

export {
    LayerSelectionContextProvider,
    useLayerSelectionContext
};
