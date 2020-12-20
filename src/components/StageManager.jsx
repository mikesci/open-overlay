import React, { useEffect, useRef, useMemo, useCallback } from "react";
import OverlayRenderer from "../OverlayRenderer.jsx";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import AnimationState from "../shared/AnimationState.js";
import "./StageManager.css";
import TaskMode from "../shared/TaskMode.js";

const getAutoFitZoom = (stageDOM, height, width) => {
    if (!stageDOM) { return; }

    const rect = stageDOM.getBoundingClientRect();

    // this shouldn't happen, but we'll return with a full scale just to be safe
    if (rect.height <= 0 || rect.width <= 0)
        return 1;

    if ((rect.height / rect.width) < (height / width))
        return rect.height / height;
    else
        return rect.width / width;
}

const StageManager = (props) => {
    const [[elements, overlay, animationContext, isExecutingScript, stageTool, stageTransform], dispatch] = useOverlayEditorContext(
        state => state.elements,
        state => state.overlay,
        state => state.animationContext,
        state => state.isExecutingScript,
        state => state.stageTool,
        state => state.stageTransform);

    const stageContainerRef = useRef();

    // handle auto-fit monitoring
    useEffect(() => {
        const stageContainer = stageContainerRef.current;
        const onWindowResized = (evt) => { dispatch("SetStageAutoFitZoom", getAutoFitZoom(stageContainer, stageTransform.height, stageTransform.width)); }
        // immediately set auto-fit upon load
        dispatch("SetStageAutoFitZoom", getAutoFitZoom(stageContainer, stageTransform.height, stageTransform.width));
        window.addEventListener("resize", onWindowResized);
        return () => { window.removeEventListener("resize", onWindowResized); };
    }, []);

    const handleMouseDown = useCallback((evt, stageTransform) => {
        // right mouse only
        if ((evt.buttons & 2) != 2)
            return;

        const dragOrigin = {
            x: evt.clientX,
            y: evt.clientY,
            panning: stageTransform.panning
        };

        // handle mouse move
        const onMouseMove = (evt) => {
            const panning = [
                dragOrigin.panning[0] + ((evt.clientX - dragOrigin.x) / stageTransform.zoom),
                dragOrigin.panning[1] + ((evt.clientY - dragOrigin.y) / stageTransform.zoom)
            ];
            dispatch("SetStageTransform", { ...stageTransform, panning });
        };

        // handle mouse up
        const onMouseUp = (evt) => {
            document.body.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseup", onMouseUp);
        };

        // add document-wide listeners
        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp);
    }, []);

    // handle body dragging
    const onMouseDown = useCallback((evt) => {
        handleMouseDown(evt, stageTransform);
    }, [stageTransform]);

    // disable right clicks, so we can drag with the rmb
    const onContextMenu = useCallback((evt) => {
        evt.preventDefault();
    }, []);

    const onDragOver = useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        evt.dataTransfer.dropEffect = "copy";
    }, []);

    const onDrop = useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        dispatch("HandleFileUpload", { files: evt.dataTransfer.files, autoCreateLayers: true });
    }, []);

    const onWheel = useCallback(evt => {
        if (!evt.nativeEvent.intercepted)
            dispatch("StepZoom", (-evt.deltaY / 100));
    }, []);

    const onOverlayDomReady = useCallback((overlayDomElement) => {
        dispatch("SetOverlayDomElement", overlayDomElement);
        //dispatch("SetLayerDomElement", { id: layer.id, domElement });
    }, []);

    const onScriptStateChanged = useCallback((scriptState) => {
        dispatch("SetScriptState", scriptState);
    }, []);

    // get the memoized the stage style
    const stageStyle = useMemo(() => ({
        width: stageTransform.width + "px",
        height: stageTransform.height + "px",
        transform: `scale(${stageTransform.zoom}) translate(${stageTransform.panning[0]}px, ${stageTransform.panning[1]}px)`
    }), [stageTransform]);

    return (
        <div className="stage-container" onWheel={onWheel} onDragOver={onDragOver} onDrop={onDrop} onMouseDown={onMouseDown} onContextMenu={onContextMenu} ref={stageContainerRef}>
            <div className="stage" style={stageStyle}>
                <OverlayRenderer
                    overlay={overlay}
                    disableBuiltinElements={true}
                    elements={elements}
                    animationContext={animationContext}
                    executeScripts={isExecutingScript}
                    onOverlayDomReady={onOverlayDomReady}
                    onScriptStateChanged={onScriptStateChanged} />
            </div>
            {stageTool ? <stageTool.component /> : null}
        </div>
    );
}

export default StageManager;