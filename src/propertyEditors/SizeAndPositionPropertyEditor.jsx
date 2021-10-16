import React, { useCallback } from "react";
import { ControlGroup, FormGroup } from "@blueprintjs/core";
import CollapsiblePanel from "../ui/CollapsiblePanel.jsx";
import DraggableNumberInput from "../ui/DraggableNumberInput.jsx";

const updateWhenRelevantPropertiesChange = (prevProps, nextProps) => {
    if (prevProps.onPropertiesChanged != nextProps.onPropertiesChanged) { return false; }
    if (!prevProps.layer || !nextProps.layer) { return false; }

    if (prevProps.layer.top != nextProps.layer.top) { return false };
    if (prevProps.layer.left != nextProps.layer.left) { return false };
    if (prevProps.layer.width != nextProps.layer.width) { return false };
    if (prevProps.layer.height != nextProps.layer.height) { return false };

    return true;
};

const SizeAndPositionPropertyEditor = ({ onPropertiesChanged, layer }) => {
    const { top, left, width, height } = layer;
    const onLeftChanged = useCallback((left, commit) => { onPropertiesChanged({ left }, commit); }, []);
    const onTopChanged = useCallback((top, commit) => { onPropertiesChanged({ top }, commit); }, []);
    const onWidthChanged = useCallback((width, commit) => { onPropertiesChanged({ width }, commit); }, []);
    const onHeightChanged = useCallback((height, commit) => { onPropertiesChanged({ height }, commit); }, []);
    return (
        <CollapsiblePanel label="Size &amp; Position" defaultIsOpen={true}>
            <div className="size-and-position">
                <ControlGroup fill={true}>
                    <FormGroup label="Left" inline={true}>
                        <DraggableNumberInput value={left} onChange={onLeftChanged} className="top" unit="px" />
                    </FormGroup>
                    <FormGroup label="Top" inline={true}>
                        <DraggableNumberInput value={top} onChange={onTopChanged} className="left" unit="px" />
                    </FormGroup>
                </ControlGroup>
                <ControlGroup fill={true}>
                    <FormGroup label="Width" inline={true}>
                        <DraggableNumberInput value={width} onChange={onWidthChanged} className="top" unit="px" min={0} />
                    </FormGroup>
                    <FormGroup label="Height" inline={true}>
                        <DraggableNumberInput value={height} onChange={onHeightChanged} className="left" unit="px" min={0} />
                    </FormGroup>
                </ControlGroup>
            </div>
        </CollapsiblePanel>
    );
};

export default React.memo(SizeAndPositionPropertyEditor, updateWhenRelevantPropertiesChange);