import React, { useContext } from "react";
import { useOverlayEditorContext } from "./OverlayEditorContext.js";

const LayerSelectionContext = React.createContext();

const EMPTY = {};

function recalculate() {
    const [[layers, selectedLayerIds, elements], dispatch] = useOverlayEditorContext(
        state => state.overlay.layers,
        state => state.selectedLayerIds,
        state => state.elements);

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


    /*
    // extract a selected layer list
    const selectedLayers = layers.reduce((selectedLayers,layer) => {
        if (selectedLayerIds.includes(layer.id)) { selectedLayers.push(layer); }
        return selectedLayers;
    }, []);

    let mergedElement;
    let mergedEffects;
    let mergedStyles;
    let isFirstSelectedLayer = true;

    for(const layer of selectedLayers) {
        const element = Elements[layer.elementName];

        if (isFirstSelectedLayer) {
            mergedElement = { element, elementName: layer.elementName, config: layer.config };

            // start with allowed styles
            if (element.manifest.allowedStyles) {
                mergedStyles = element.manifest.allowedStyles.reduce((p, allowedStyle) => {
                    p[allowedStyle] = null;
                    return p;
                }, {});
            } else {
                mergedStyles = {};
            }

            // now replace with configured styles
            for(const [styleName, config] of Object.entries(layer.styles))
                mergedStyles[styleName] = config;

            // effects is easier, just start with the first layer's effects
            mergedEffects = (layer.effects ? {...layer.effects} : {});
        } else {

            // if we don't have a consistent element between all selected layers, disable element config
            if (mergedElement && mergedElement.elementName != layer.elementName)
                mergedElement = null;

            // disable any styles not allowed by this layer
            const allowedStyles = Object.keys(mergedStyles);
            for(const allowedStyle of allowedStyles) {
                if (!element.manifest.allowedStyles.includes(allowedStyle)) {
                    delete mergedStyles[allowedStyle];
                } else {
                    // otherwise, if it is allowed... maybe merge in the future, but for now do nothing
                    // this will make the configured value equal to ONLY the first selected layer
                    // -- which is ok for now.
                }
            }

            // disable any effects not shared between all layers
            const allowedEffects = Object.keys(mergedEffects);
            for(const allowedEffect of allowedEffects) {
                if (!layer.effects || !layer.effects[allowedEffect]) {
                    delete mergedEffects[allowedEffect]
                }
            }
        }

        if (isFirstSelectedLayer)
            isFirstSelectedLayer = false;
    }

    // convert styles to array for easier rendering
    mergedStyles = (mergedStyles ? Object.entries(mergedStyles).map(([name, config]) => ({
        name,
        config,
        style: styles[name]
    })) : []);

    // convert effects to array for easier rendering
    mergedEffects = (mergedEffects ? Object.entries(mergedEffects).map(([name, config]) => ({
        name,
        config,
        effect: effects[name]
    })) : []);

    return {
        target: "layer",
        selectedLayers,
        mergedElement,
        mergedEffects,
        mergedStyles
    };
    */
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
