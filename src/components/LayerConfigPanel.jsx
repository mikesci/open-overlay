import React, { useCallback, useMemo } from "react";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import { useLayerSelectionContext } from "../shared/LayerSelectionContext.js";
import SizeAndPositionPropertyEditor from "../propertyEditors/SizeAndPositionPropertyEditor.jsx";
import BackgroundColorEditor from "../propertyEditors/BackgroundColorEditor.jsx";
import OpacityEditor from "../propertyEditors/OpacityEditor.jsx";
import BorderEditor from "../propertyEditors/BorderEditor.jsx";
import ShadowEditor from "../propertyEditors/ShadowEditor.jsx";
import FilterEditor from "../propertyEditors/FilterEditor.jsx";
import AutoFitEditor from "../propertyEditors/AutoFitEditor.jsx";
import TransformEditor from "../propertyEditors/TransformEditor.jsx";
import ConfigurationFormEditor from "../propertyEditors/ConfigurationFormEditor.jsx";
import FontPropertyEditor from "../propertyEditors/FontPropertyEditor.jsx";
import MediaControlsPropertyEditor from "../propertyEditors/MediaControlsPropertyEditor.jsx";
import CustomComponentEditor from "../propertyEditors/CustomComponentEditor.jsx";
import "./LayerConfigPanel.css";

const applyDefaultLayerValues = (layer, elementDefs) => {
    if (!layer)
        return {};
    
    // if there's no elementName set, don't load defaults
    if (!layer.elementName)
        return layer;
    
    const elementDef = elementDefs[layer.elementName];

    // if we can't find the elementDef, show an error and don't load defaults
    if (!elementDef) {
        console.error("Could not locate element:" + layer.elementName);
        return layer;
    }

    return {...elementDef.defaults, ...layer};
}

const LayerConfigPanel = () => {
    const [[elementEditors, renderer, overlayid], dispatch] = useOverlayEditorContext(
        state => state.elementEditors,
        state => state.renderer,
        state => state.overlay.id
    );
    const layerSelectionContext = useLayerSelectionContext();

    const onHandleUpload = useCallback((files, onComplete) => {
        dispatch("HandleFileUpload", { files, onComplete, autoCreateLayers: false });
    }, []);

    const onPropertiesChanged = useCallback((newProps, trackUndo) => {
        dispatch("UpdateSelectedLayersProps", () => newProps, trackUndo);
    }, []);

    const layer = (layerSelectionContext ? layerSelectionContext.layer : null);
    const layerid = (layer ? layer.id : null);
    const layerDOM = useMemo(() => {
        if (!layerid) { return null; }
        const overlay = renderer.getOverlay();
        if (!overlay) { return null; }
        return overlay.getLayer(layerid);
    }, [renderer, overlayid, layerid]);

    // apply the defaults for the element, if we have one in the selection
    const propertyValues = useMemo(() => {
        if (!layer) { return {}; }
        return applyDefaultLayerValues(layerSelectionContext.layer, renderer.elements);
    }, [ layer, renderer.elements ]);

    if (!layerSelectionContext)
        return <div className="no-content">No layers are selected</div>;

    let elementEditorPanels = [];
    if (layerSelectionContext.layer && layerSelectionContext.layer.elementName) {
        const element = renderer.elements[layerSelectionContext.layer.elementName];

        if (element.usesMediaControls)
        elementEditorPanels.push(<MediaControlsPropertyEditor key="media" layerDOM={layerDOM} />);
        
        if (element && element.editors) {
            Object.entries(element.editors).forEach(([editorKey, options]) => {
                switch (options.type) {
                    case "config-form":
                        elementEditorPanels.push(<ConfigurationFormEditor
                            key={editorKey}
                            options={options}
                            layer={propertyValues}
                            onHandleUpload={onHandleUpload}
                            onPropertiesChanged={onPropertiesChanged}
                            layerDOM={layerDOM}
                        />);
                        return;
                    case "component":
                        elementEditorPanels.push(<CustomComponentEditor
                            key={editorKey}
                            options={options}
                            layer={propertyValues}
                            onHandleUpload={onHandleUpload}
                            onPropertiesChanged={onPropertiesChanged}
                            layerDOM={layerDOM}
                            elementEditors={elementEditors}
                        />);
                        return;
                    default:
                        console.log("Unknown editor: " + options.type);
                        return;
                }
            });
        }

        if (element.usesFont)
        elementEditorPanels.push(<FontPropertyEditor key="font" onPropertiesChanged={onPropertiesChanged} layer={propertyValues} />);
    }

    return (
        <div className="layer-config-panel">
            <SizeAndPositionPropertyEditor onPropertiesChanged={onPropertiesChanged} layer={propertyValues} />
            {elementEditorPanels}
            <BackgroundColorEditor onPropertiesChanged={onPropertiesChanged} layer={propertyValues} />
            <OpacityEditor onPropertiesChanged={onPropertiesChanged} layer={propertyValues} />
            <BorderEditor onPropertiesChanged={onPropertiesChanged} layer={propertyValues} />
            <ShadowEditor onPropertiesChanged={onPropertiesChanged} layer={propertyValues} />
            <FilterEditor onPropertiesChanged={onPropertiesChanged} layer={propertyValues} />
            <AutoFitEditor onPropertiesChanged={onPropertiesChanged} layer={propertyValues} />
            <TransformEditor onPropertiesChanged={onPropertiesChanged} layer={propertyValues} />
        </div>
    );
}

export default LayerConfigPanel;
