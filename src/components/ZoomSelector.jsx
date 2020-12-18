import React, { useCallback } from "react";
import { Button, ControlGroup, HTMLSelect } from "@blueprintjs/core";

const ZoomPresets = [
    { value: 1.0, label: "100%" },
    { value: 0.666666667, label: "67%" },
    { value: 0.5, label: "50%" },
    { value: 0.25, label: "25%" }
];

// onChanged(zoom, isAuto)
const ZoomSelector = ({ zoomSelection, onZoomSelectionChanged, ...props }) => {

    const onDropdownChanged = useCallback(evt => {
        if (!onZoomSelectionChanged)
            return;
        if (evt.target.value == "auto")
            onZoomSelectionChanged({ ...zoomSelection, isAuto: true });
        else
            onZoomSelectionChanged({ ...zoomSelection, zoom: parseFloat(evt.target.value), isAuto: false });
    }, [ zoomSelection ]);
    
    // show and select the custom option if the zoom isn't elsewhere in the option list
    let zoomOptions = [];

    // if zoom isn't auto and doesn't match one of the presets, then add the "Custom" option
    if (!zoomSelection.isAuto) {
        const matchesPreset = (ZoomPresets.findIndex(r => r.value == zoomSelection.zoom) != -1);
        if (!matchesPreset) {
            zoomOptions.push({
                label: `${Math.round(zoomSelection.zoom * 100)}%`,
                value: zoomSelection.zoom
            });
        }
    }

    // add autofit
    zoomOptions.push({
        label: `Auto (${Math.round(zoomSelection.autoFitZoom * 100)}%)`,
        value: "auto"
    });

    // add presets
    for(const zoomPreset of ZoomPresets)
        zoomOptions.push(zoomPreset);

    return (
        <HTMLSelect {...props} onChange={onDropdownChanged} options={zoomOptions} value={zoomSelection.isAuto ? "auto" : zoomSelection.zoom} />
    );
}

export default ZoomSelector;