import React, { useState, useCallback, useRef } from "react";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext";
import { containerToStageCoordinates } from "../shared/utilities";
import "./SizeAndPositionCaptureTool.css";
import { stageTools } from "./StageTools.jsx";

const SizeAndPositionCaptureTool = ({ elementName }) => {
    const [[stageTransform], dispatch] = useOverlayEditorContext(state => state.stageTransform);
    const containerRef = useRef();
    const [boxSelectRect, setBoxSelectRect] = useState();

    const onCapture = useCallback((rect) => {
        dispatch("CreateLayers", [{
            elementName: elementName,
            style: {
                top: rect.top + "px",
                left: rect.left + "px",
                height: rect.height + "px",
                width: rect.width + "px"
            }
        }]);
        dispatch("SetStageTool", stageTools.moveAndResize);
    }, []);

    const handleMouseDown = useCallback((evt, stageTransform) => {
        // left mouse button only
        if (evt.buttons != 1) { return; }

        const containerRect = containerRef.current.getBoundingClientRect();

        // define functions that depend on the context
        const applyStageTransform = (rect) => containerToStageCoordinates(containerRect, stageTransform, rect);

        const originalRect = {
            top: evt.clientY - containerRect.top,
            left: evt.clientX - containerRect.left,
            height: 0,
            width: 0
        };

        // lastRect will be updated every time we move the mouse
        let lastRect = originalRect;

        const onMouseMove = (evt) => {
            // set our deltas
            const deltaX = (evt.clientX - containerRect.left) - originalRect.left;
            const deltaY = (evt.clientY - containerRect.top) - originalRect.top;
            lastRect = {
                top: (deltaY < 0 ? originalRect.top + deltaY : originalRect.top),
                left: (deltaX < 0 ? originalRect.left + deltaX : originalRect.left),
                height: Math.abs(deltaY),
                width: Math.abs(deltaX)
            };
            setBoxSelectRect(lastRect);
        }

        const onMouseUp = (evt) => {
            // clear the box select
            setBoxSelectRect(null);

            // remove the mouse event handlers
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);

            if (lastRect.height > 0 && lastRect.width > 0)
                onCapture(applyStageTransform(lastRect));
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }, []);

    const onMouseDown = useCallback((evt) => {
        handleMouseDown(evt, stageTransform);
    }, [stageTransform]);

    let selectorBox;
    if (boxSelectRect)
        selectorBox = <div className="selector-box" style={boxSelectRect} />;

    return (
        <div className="size-and-position-capture-tool" onMouseDown={onMouseDown} ref={containerRef}>
            {selectorBox}
        </div>
    );
}

export default SizeAndPositionCaptureTool;