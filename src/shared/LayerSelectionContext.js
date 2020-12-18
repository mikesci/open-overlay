import React, { useContext } from "react";
import { useOverlayEditorContext } from "./OverlayEditorContext.js";

const LayerSelectionContext = React.createContext();

const EMPTY = {};

function recalculate() {
    const [[layers, selectedLayerIds, elements], dispatch] = useOverlayEditorContext(
        state => state.overlay.layers,
        state => state.selectedLayerIds,
        state => state.elements);

    if (!layers)
        return {};

    return layers.reduce((mergedLayer, layer) => {
        if (selectedLayerIds.includes(layer.id)) {
            const element = elements[layer.elementName];

            if (!mergedLayer) {
                return {
                    mergedElement: { element, elementName: layer.elementName, config: layer.config },
                    mergedEffects: (layer.effects ? {...layer.effects} : EMPTY),
                    allowedStyles: (element.manifest.allowedStyles ? [...element.manifest.allowedStyles] : []),
                    mergedStyle: {...layer.style}
                };
            }

            // element
            if (mergedLayer.mergedElement && mergedLayer.mergedElement.elementName != layer.elementName) {
                mergedLayer.mergedElement = null;
            }

            // effects
            if (mergedLayer.mergedEffects != EMPTY) {
                if (!layer.effects || layer.effects.length == 0)
                    mergedLayer.mergedEffects = EMPTY;
                else {
                    for (const effectName of Object.keys(mergedLayer.mergedEffects)) {
                        if (!layer.effects[effectName])
                            delete mergedLayer.mergedEffects[effectName];
                    }
                }
            }

            // allowed styles
            if (mergedLayer.allowedStyles.length > 0) {
                const allowedStyles = element.manifest.allowedStyles;
                if (!allowedStyles || allowedStyles.length == 0)
                    mergedLayer.allowedStyles = [];
                else
                    mergedLayer.allowedStyles = mergedLayer.allowedStyles.filter(styleName => allowedStyles.includes(styleName));
            }

            // merge style
            if (mergedLayer.mergedStyle && layer.style) {
                for (const [styleName, styleValue] of Object.entries(layer.style)) {
                    if (mergedLayer.mergedStyle[styleName] != styleValue)
                        delete mergedLayer.mergedStyle[styleName];
                }
            }
        }
        return mergedLayer;
    }, null);
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
