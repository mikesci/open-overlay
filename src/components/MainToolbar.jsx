import { Button, ButtonGroup, Tooltip } from "@blueprintjs/core";
import React, { useCallback } from "react";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import ZoomSelector from "./ZoomSelector.jsx";
import "./MainToolbar.css";

const MainToolbar = ({ }) => {
    const [[stageZoomSelection], dispatch] = useOverlayEditorContext(state => state.stageZoomSelection);

    const onZoomSelectionChanged = useCallback(zoomSelection => {
        dispatch("SetStageZoomSelection", zoomSelection);
    }, []);

    const onClickResetZoom = useCallback(() => {
        dispatch("ResetStageZoom");
    }, []);

    return (
        <div className="main-toolbar">
            <ButtonGroup minimal={true}>
                <Tooltip content="Reset Zoom"><Button icon="search" onClick={onClickResetZoom} /></Tooltip>
                <div className="bp3-button" style={{ padding: 0 }}>
                    <ZoomSelector minimal={true} large={false} zoomSelection={stageZoomSelection} onZoomSelectionChanged={onZoomSelectionChanged} />
                </div>
            </ButtonGroup>
        </div>
    );
}

export default MainToolbar;