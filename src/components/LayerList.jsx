import React, { useCallback } from "react";
import { Button, Popover, Menu, MenuItem, Icon } from "@blueprintjs/core";
import LabelEditor from "../ui/LabelEditor.jsx";
import ReorderableList from "../ui/ReorderableList.jsx";
import { DragAndDropTypes } from "../shared/DragAndDropTypes.js";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import "./LayerList.css";

const Layer = ({ layer, isSelected, dispatch }) => {
    const onLabelChanged = useCallback((label) => {
        dispatch("UpdateLayers", { layers: [ { id: layer.id, label } ] });
    }, [ layer.id ]);

    const onToggleVisibility = useCallback(() => {
        dispatch("UpdateLayers", { layers: [ { id: layer.id, hidden: !layer.hidden } ] });
    }, [ layer.id, layer.hidden ]);

    const onClick = useCallback((evt) => {
        dispatch("SelectLayer", { id: layer.id, append: (evt.ctrlKey || evt.metaKey), selectBetween: evt.shiftKey });
    }, [ layer.id ]);

    return (
        <>
            <div className="layer-header" isselected={isSelected ? "true" : null} style={layer.hidden ? { opacity: 0.5 } : null}>
                <Button icon="eye-open" minimal={true} intent={layer.hidden ? "danger" : "success"} title="Toggle Visibility" onClick={onToggleVisibility} />
                <div className="label" onClick={onClick}>
                    <LabelEditor value={layer.label} onChange={onLabelChanged} selectAllOnFocus={true} />
                </div>
                <Button icon="trash" title="Delete" minimal={true} onClick={() => dispatch("DeleteLayers", [layer.id])} />
            </div>
        </>
    );
};

const LayerList = () => {
    const [[layers, selectedLayerIds], dispatch] = useOverlayEditorContext(state => state.overlay.layers, state => state.selectedLayerIds);

    const layerCount = (layers ? layers.length : 0);
    const onReorderItem = useCallback((key, newIndex) => {
        // reverse newIndex
        newIndex = layerCount - newIndex;
        dispatch("ReorderLayer", { id: parseInt(key), newIndex });
    }, [layerCount]);

    // render layers in reverse order
    let layerComponents = [];
    if (layerCount > 0) {
        for(let i = layers.length - 1; i >= 0; i--) {
            const layer = layers[i];
            layerComponents.push(
                <Layer key={layer.id} layer={layer} isSelected={selectedLayerIds.includes(layer.id)} dispatch={dispatch} />
            );
        }
    }

    return (
        <div className="main-list layer-list">
            <div className="list-items">
                <ReorderableList itemType={DragAndDropTypes.LAYER} onReorderItem={onReorderItem}>
                    {layerComponents}
                </ReorderableList>
            </div>
        </div>
    );
}

export default LayerList;