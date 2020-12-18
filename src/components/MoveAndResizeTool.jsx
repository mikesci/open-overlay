import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext";
import { stageToContainerCoordinates, containerToStageCoordinates } from "../shared/utilities";
import { HotkeySets, useHotkeys } from "../shared/useHotkeys";
import { parseFloatOrDefault } from "../shared/utilities.js";
import "./MoveAndResizeTool.css";

const GUTTER_STATE_MOVE = { top: true, left: true, bottom: true, right: true };
const GUTTER_STATE_BOXSELECT = { top: false, left: false, bottom: false, right: false };

const getSelectableRects = (layers, layerDomElements, animationContext) => {

    if (!layers)
        return [];

    // get the style handler for rects
    //const rectStyle = styles.rect;

    return layers.reduce((p, layer) => {
        // skip layers with no style
        if (!layer.style)
            return p;

        // skip layers with no width or height
        if (layer.style.width == undefined || layer.style.height == undefined)
            return p;

        // could pull in the style from the domElement's computedStyleMap here, but keyframe animating is on hold
        // TODO

        let rect = {
            layerid: layer.id,
            top: parseFloatOrDefault(layer.style.top),
            left: parseFloatOrDefault(layer.style.left),
            height: parseFloatOrDefault(layer.style.height),
            width: parseFloatOrDefault(layer.style.width)
        };
        rect.bottom = rect.top + rect.height;
        rect.right = rect.left + rect.width;
        p.push(rect);
        return p;
    }, []);
};

const getSelection = (selectableRects, selectedLayerIds) => {
    let selection = selectableRects.reduce((selection, rect) => {
        if (selectedLayerIds.includes(rect.layerid)) {
            selection.rects.push(rect);
            if (rect.top < selection.boundingBox.top) { selection.boundingBox.top = rect.top; }
            if (rect.left < selection.boundingBox.left) { selection.boundingBox.left = rect.left; }
            if (rect.bottom > selection.boundingBox.bottom) { selection.boundingBox.bottom = rect.bottom; }
            if (rect.right > selection.boundingBox.right) { selection.boundingBox.right = rect.right; }
        }
        return selection;
    }, {
        selectedLayerIds,
        rects: [],
        boundingBox: {
            top: Number.MAX_SAFE_INTEGER,
            left: Number.MAX_SAFE_INTEGER,
            bottom: Number.MIN_SAFE_INTEGER,
            right: Number.MIN_SAFE_INTEGER
        }
    });

    if (selection.rects.length > 0) {
        selection.boundingBox.width = selection.boundingBox.right - selection.boundingBox.left;
        selection.boundingBox.height = selection.boundingBox.bottom - selection.boundingBox.top;
    }
    
    return selection;
};

const MoveAndResizeToolInner = ({ containerElement }) => {
    const [[layers, layerDomElements, animationContext, selectedLayerIds, stageTransform], dispatch] = useOverlayEditorContext(
        state => state.overlay.layers,
        state => state.layerDomElements,
        state => state.animationContext,
        state => state.selectedLayerIds,
        state => state.stageTransform
    );

    const [boxSelectRect, setBoxSelectRect] = useState();

    const selectableRects = useMemo(() => {
        return getSelectableRects(layers, layerDomElements, animationContext);
    }, [layers, layerDomElements, animationContext]);

    const selection = useMemo(() => {
        return getSelection(selectableRects, selectedLayerIds)
    }, [selectableRects, selectedLayerIds]);

    // to avoid redefining onMouseDown every time one of it's dependencies changes (it's a big function)
    // instead, we use a ref.  onMouseDown will grab the last value set here when a click occurs
    const stateRef = useRef();
    useEffect(() => {
        stateRef.current = { selectableRects, selection, stageTransform };
    }, [selectableRects, selection, stageTransform]);

    // keep a ref just for the selection, for hotkeys
    const selectionRef = useRef();
    useEffect(() => { selectionRef.current = selection; }, [selection]);
    useHotkeys(HotkeySets.MOVE_AND_RESIZE, selectionRef);

    const getLayersInRect = useCallback((rect, multiSelect) => {
        const { selectableRects, selection } = stateRef.current;
        
        const x = rect.left;
        const y = rect.top;
        const width = rect.width;
        const height = rect.height;
        const right = rect.left + rect.width;
        const bottom = rect.top + rect.height;

        if (width == 0 || height == 0) {
            // if this is a point select, pick all the layers that contain the point
            const possibleLayerIds = selectableRects.reduce((p,rect) => {
                if (y > rect.top &&
                    x > rect.left &&
                    y < rect.bottom &&
                    x < rect.right) {
                    p.push(rect.layerid);
                }
                return p;
            }, []);

            // no layer matches the selection, so deselect
            if (possibleLayerIds.length == 0)
                return [];

            // at least one layer could be selected.  if there is no selection already, select the first possible layer
            if (selection.selectedLayerIds.length == 0)
                return [ possibleLayerIds[0] ];

            // handle multiSelects
            if (multiSelect) {
                // we only ever reference the first possible layer for multiselects
                if (!selectedLayerIds.includes(possibleLayerIds[0])) // handle selecting
                    return [...selection.selectedLayerIds, possibleLayerIds[0]];
                else // handle deselecting
                    return selectedLayerIds.filter(r => r != possibleLayerIds[0]);
            }

            // at this point we know we're not multiselecting

            // of the possible layers, if none are already selected, select the first layer
            let index = possibleLayerIds.findIndex(r => selection.selectedLayerIds.includes(r));
            if (index == -1)
                return[ possibleLayerIds[0] ];

            // if we're here, then:
            // - we're not multiSelecting
            // - we have at least one possible layer at the selection point
            // - at least one of those possible layers is already selected
            // -- so, we'll round-robin the possible layers.  index holds the 
            index = (index + 1) % possibleLayerIds.length;
            return [ possibleLayerIds[index] ];

        } else {
            // this is a box select, so pick all the layers that fall completely within the box
            const possibleLayerIds = selectableRects.reduce((p,rect) => {
                if (y < rect.top &&
                    x < rect.left &&
                    bottom > rect.bottom &&
                    right > rect.right) {
                    p.push(rect.layerid);
                }
                return p;
            }, []);

            if (multiSelect) {
                // if multiSelecting, add the new possible layers to the selection
                let newSelectedLayerIds = [...selection.selectedLayerIds];
                for(const possibleLayerId of possibleLayerIds) {
                    if (!newSelectedLayerIds.contains(possibleLayerId))
                        newSelectedLayerIds.push(possibleLayerId);
                }
                return newSelectedLayerIds;
            }

            // otherwise, replace the selected layers with the possible layers
            return possibleLayerIds;
        }
    }, []);

    const onMouseDown = useCallback((evt) => {
        // only handle left mouse button clicks
        if (evt.buttons != 1) { return; }

        const edge = evt.target.getAttribute("data-edge");

        let gs; // gs = gutterState
        if (!edge) {
            gs = GUTTER_STATE_BOXSELECT;
        } else if (edge == "center") {
            gs = GUTTER_STATE_MOVE;
        } else {
            gs = {
                top: (edge == "nw" || edge == "n" || edge == "ne"),
                left: (edge == "nw" || edge == "w" || edge == "sw"),
                right: (edge == "ne" || edge == "e" || edge == "se"),
                bottom: (edge == "sw" || edge == "s" || edge == "se")
            };
        }

        // if we didn't assign a gutter state, then the operation is not allowed
        if (!gs)
            return;

        const context = stateRef.current;
        const containerRect = containerElement.getBoundingClientRect();
        const originalBoundingBox = context.selection.boundingBox;
        const originalSelectedRects = context.selection.rects;

        // define functions that depend on the context
        const applyStageTransform = (rect) => containerToStageCoordinates(containerRect, context.stageTransform, rect);

        const onBoundingBoxChanged = (newRect, trackUndo) => {
            const scaleWidth = newRect.width / originalBoundingBox.width;
            const scaleHeight = newRect.height / originalBoundingBox.height;
            dispatch("UpdateSelectionStyle", (layer) => {
                const originalSelectedRect = originalSelectedRects.find(r => r.layerid == layer.id);
                return {
                    top: newRect.top + ((originalSelectedRect.top - originalBoundingBox.top) * scaleHeight) + "px",
                    left: newRect.left + ((originalSelectedRect.left - originalBoundingBox.left) * scaleWidth) + "px",
                    width: originalSelectedRect.width * scaleWidth,
                    height: originalSelectedRect.height * scaleHeight
                };
            }, trackUndo);
        };

        // set the cursor to the cursor specified by the target
        containerElement.style["cursor"] = evt.target.getAttribute("data-cursor");

        const mouseDownContainerCoordinates = {
            top: evt.clientY - containerRect.top,
            left: evt.clientX - containerRect.left,
            height: 0,
            width: 0
        };

        let originalRect;
        if (edge) {
            // if we're not doing a box select, start with the bounding box as the starting rect
            originalRect = stageToContainerCoordinates(containerRect, context.stageTransform, {
                top: originalBoundingBox.top,
                left: originalBoundingBox.left,
                height: originalBoundingBox.height,
                width: originalBoundingBox.width
            });
        } else {
            // otherwise, use the stage coords of where the user clicked
            originalRect = {
                top: mouseDownContainerCoordinates.top,
                left: mouseDownContainerCoordinates.left,
                height: 0,
                width: 0
            };
        }

        // lastRect will be updated every time we move the mouse
        let lastRect = originalRect;

        const onMouseMove = (evt) => {
            const mouseMoveContainerCoords = {
                top: evt.clientY - containerRect.top,
                left: evt.clientX - containerRect.left
            };

            // set our original deltas
            let deltaX = mouseMoveContainerCoords.left - mouseDownContainerCoordinates.left;
            let deltaY = mouseMoveContainerCoords.top - mouseDownContainerCoordinates.top;

            // take a copy of the origin rect to modify
            const rect = {...originalRect};
    
            if (gs == GUTTER_STATE_BOXSELECT) {
                if (deltaY < 0) {
                    rect.top = mouseDownContainerCoordinates.top + deltaY;
                    deltaY *= -1;
                }
                if (deltaX < 0) {
                    rect.left = mouseDownContainerCoordinates.left + deltaX;
                    deltaX *= -1;
                }
                rect.height = deltaY;
                rect.width = deltaX;
            } else if (gs == GUTTER_STATE_MOVE) {
                if (evt.ctrlKey) { // lock to vertical/horizontal
                    if (Math.abs(deltaX / deltaY) > 1)
                        rect.left += deltaX;
                    else
                        rect.top += deltaY
                } else {
                    rect.left += deltaX;
                    rect.top += deltaY;
                }
            } else if (gs) {
                const aspectRatio = -rect.height / rect.width;
                 // flip preserveAspect if ctrl is held
                //const preserveAspect = (evt.ctrlKey ? !context.boundingBox.preserveAspect : context.boundingBox.preserveAspect);
                const preserveAspect = evt.ctrlKey;
                        
                // constrain proportions if resizing on a corner, but don't if the control key is pressed
                if ((gs.top || gs.bottom) && (gs.left || gs.right) && preserveAspect)
                {
                    let dSlope;
                    if (gs.bottom) {
                        if (gs.left)
                            dSlope = ((-rect.height - deltaY) / (rect.width - deltaX));
                        else
                            dSlope = ((-rect.height - deltaY) / (-rect.width - deltaX));
                    } else {
                        if (gs.left)
                            dSlope = ((rect.height - deltaY) / (rect.width - deltaX));
                        else
                            dSlope = ((rect.height - deltaY) / (-rect.width - deltaX));
                    }
    
                    if ((gs.top && gs.left) || (gs.bottom && gs.right)) {
                        if (dSlope < -aspectRatio)
                            deltaY = deltaX * -aspectRatio;
                        else
                            deltaX = deltaY / -aspectRatio;
                    } else {
                        if (dSlope > aspectRatio)
                            deltaY = deltaX * aspectRatio;
                        else
                            deltaX = deltaY / aspectRatio;
                    }
                }
    
                if (gs.top) {
                    if (rect.height - deltaY < 0) {
                        rect.top = rect.top + rect.height - 1;
                        rect.height = 1;
                    } else {
                        rect.top += deltaY;
                        rect.height = rect.height - deltaY;
                    }
                }
                if (gs.bottom) {
                    rect.height = Math.max(1, rect.height + deltaY);
                }
                if (gs.left) {
                    if (rect.width - deltaX < 0) {
                        rect.left = rect.left + rect.width;
                        rect.width = 1;
                    } else {
                        rect.left += deltaX;
                        rect.width = rect.width - deltaX;
                    }
                }
                if (gs.right) {
                    rect.width = Math.max(1, rect.width + deltaX);
                }
            }

            lastRect = rect;
    
            // emit change events after each move if we're not box selecting
            if (gs != GUTTER_STATE_BOXSELECT) {
                const newBoundingBoxRect = applyStageTransform(rect);
                onBoundingBoxChanged(newBoundingBoxRect, false);
            } else {
                // update the selector
                setBoxSelectRect(rect);
            }
        }

        const onMouseUp = (evt) => {
            // revert the cursor
            containerElement.style["cursor"] = "";

            // remove the mouse event handlers
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);

            if (lastRect == originalRect) {
                // if we never called mouseMove (and in doing so change lastRect), then it's a point select
                const layerIds = getLayersInRect(applyStageTransform(mouseDownContainerCoordinates), evt.ctrlKey);
                dispatch("SelectLayers", layerIds);
            } else if (gs == GUTTER_STATE_BOXSELECT) {
                // if we have moved and are box selecting, send the box select command
                const layerIds = getLayersInRect(applyStageTransform(lastRect), evt.ctrlKey);
                dispatch("SelectLayers", layerIds);
                setBoxSelectRect(null);
            } else {
                // otherwise, emit a final resize/move event
                onBoundingBoxChanged(applyStageTransform(lastRect), true);
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }, []);

    // bind onMouseDown to the containerElement
    useEffect(() => {
        containerElement.addEventListener("mousedown", onMouseDown);
        return () => containerElement.removeEventListener("mousedown", onMouseDown);
    }, []);
    
    let selectorBoxes = [];

    const containerRect = containerElement.getBoundingClientRect();

    // render the bounding box if we have one and we let the user make changes
    if (selection.boundingBox) {
        // the bounding box is in stage coordinates, but we need container coordinates
        const boundingBoxStageCoords = stageToContainerCoordinates(containerRect, stageTransform, selection.boundingBox);
        const boundingBoxStyle = {
            top: boundingBoxStageCoords.top + "px",
            left: boundingBoxStageCoords.left + "px",
            width: boundingBoxStageCoords.width + "px",
            height: boundingBoxStageCoords.height + "px"
        };
        selectorBoxes.push(
            <div className="resizer-selector" style={boundingBoxStyle} key="-1">
                <div className="resize-handle resize-handle-nw" data-edge="nw" />
                <div className="resize-handle resize-handle-n" data-edge="n" />
                <div className="resize-handle resize-handle-ne" data-edge="ne" />
                <div className="resize-handle resize-handle-e" data-edge="e" />
                <div className="resize-handle resize-handle-se" data-edge="se" />
                <div className="resize-handle resize-handle-s" data-edge="s" />
                <div className="resize-handle resize-handle-sw" data-edge="sw" />
                <div className="resize-handle resize-handle-w" data-edge="w" />
                <div className="resize-handle resize-handle-center" data-edge="center" />
            </div>
        );
    }

    // render each selected rect
    for(const selectedRect of selection.rects) {
        const selectedRectStageCoords = stageToContainerCoordinates(containerRect, stageTransform, selectedRect);
        const selectedRectStyle = {
            top: selectedRectStageCoords.top + "px",
            left: selectedRectStageCoords.left + "px",
            width: selectedRectStageCoords.width + "px",
            height: selectedRectStageCoords.height + "px"
        };
        selectorBoxes.push(<div className="resizer-subrect" style={selectedRectStyle} key={selectedRect.layerid} />);
    }

    return <>
        {boxSelectRect ? <div className="resizer-selector-box" key="selector-box" style={boxSelectRect} /> : null}
        {selectorBoxes}
    </>;
}

const MoveAndResizeTool = (props) => {
    const containerRef = useRef();
    const [containerElement, setContainerElement] = useState();
    useEffect(() => { setContainerElement(containerRef.current); },[]);
    return (
        <div className="move-and-resize-tool" ref={containerRef}>
            {containerRef.current ? <MoveAndResizeToolInner containerElement={containerElement} {...props} /> : null}
        </div>
    );
}

export default MoveAndResizeTool;