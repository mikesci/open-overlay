import React, { useCallback } from "react";
import { Button, Popover, Menu, MenuItem } from "@blueprintjs/core";
import LabelEditor from "../ui/LabelEditor.jsx";
import ReorderableList from "../ui/ReorderableList.jsx";
import { DragAndDropTypes } from "../shared/DragAndDropTypes.js";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import EffectMenuPopover from "./EffectMenuPopover.jsx"
import { effects } from "./Effects.jsx";
import "./LayerList.css";

const EffectItem = ({ layer, effect, effectName, config, dispatch }) => {

    const onDeleteClick = useCallback(() => {
        dispatch("DeleteLayerEffect", { id: layer.id, effectName });
    }, []);

    const onToggleVisibility = useCallback(() => {
        dispatch("UpdateLayerEffect", { id: layer.id, effectName, config: { hidden: !config.hidden }});
    }, [ layer.id, effectName, config.hidden ]);

    const onDelete = useCallback(() => {
        dispatch("DeleteLayerEffect", { id: layer.id, effectName });
    }, [ layer.id, effectName ]);

    return (
        <div className="effect">
            <Button icon="eye-open" minimal={true} intent={config.hidden ? "danger" : "success"} title="Show/Hide" onClick={onToggleVisibility} />
            <div className="label" style={{ opacity: (config.hidden ? 0.5 : 1)}}>{effect.displayName}</div>
            <Button icon="trash" minimal={true} title="Delete" onClick={onDeleteClick} />
        </div>
    );
};

const Layer = ({ layer, element, isSelected, dispatch }) => {
    const onLabelChanged = useCallback((label) => {
        dispatch("UpdateLayers", { layers: [ { id: layer.id, label } ] });
    }, [ layer.id ]);

    const onToggleVisibility = useCallback(() => {
        dispatch("UpdateLayers", { layers: [ { id: layer.id, hidden: !layer.hidden } ] });
    }, [ layer.id, layer.hidden ]);

    const onClick = useCallback((evt) => {
        dispatch("SelectLayer", { id: layer.id, append: (evt.ctrlKey || evt.metaKey), selectBetween: evt.shiftKey });
    }, [ layer.id ]);


    let addEffectButton;
    if (element.manifest.effectsAllowed != false && !element.manifest.nonVisual) {
        addEffectButton = (
            <EffectMenuPopover layer={layer}>
                <Button icon="plus" minimal={true} title="Add Effect" />
            </EffectMenuPopover>
        );
    }

    let effectsForms;
    if (element.manifest.effectsAllowed != false && layer.effects) {
        effectsForms = [];
        for (const [effectName, effectConfig] of Object.entries(layer.effects)) {
            const effect = effects[effectName];
            effectsForms.push(<EffectItem
                key={effectName}
                layer={layer}
                effectName={effectName}
                effect={effect}
                config={effectConfig}
                dispatch={dispatch} />);
        }
    }

    return (
        <>
            <div className="layer-header" isselected={isSelected ? "true" : null} style={layer.hidden ? { opacity: 0.5 } : null}>
                <Button icon="eye-open" minimal={true} intent={layer.hidden ? "danger" : "success"} title="Toggle Visibility" onClick={onToggleVisibility} />
                <div className="label" onClick={onClick}>
                    <LabelEditor value={layer.label} onChange={onLabelChanged} selectAllOnFocus={true} />
                </div>
                {addEffectButton}
                <Button icon="trash" title="Delete" minimal={true} onClick={() => dispatch("DeleteLayers", [layer.id])} />
            </div>
            {effectsForms}
        </>
    );
};

const LayerList = () => {
    const [[elements, layers, selectedLayerIds, editors], dispatch] = useOverlayEditorContext(state => state.elements, state => state.overlay.layers, state => state.selectedLayerIds, state => state.editors);

    const onReorderItem = useCallback((key, newIndex) => {
        dispatch("ReorderLayer", { id: parseInt(key), newIndex });
    }, []);

   return (
    <div className="main-list layer-list">
        <div className="list-items">
            <ReorderableList itemType={DragAndDropTypes.LAYER} onReorderItem={onReorderItem}>
                {(layers || []).map(layer => (
                    <Layer
                        key={layer.id}
                        layer={layer}
                        element={elements[layer.elementName]}
                        isSelected={selectedLayerIds.includes(layer.id)}
                        dispatch={dispatch}
                    />
                ))}
            </ReorderableList>
        </div>
    </div>
);
}

export default LayerList;