import React from "react";
import "./Resizer.css";

export default class Resizer extends React.Component {

    static GUTTER_STATE_MOVE = { top: true, left: true, bottom: true, right: true };
    static GUTTER_STATE_BOXSELECT = { top: false, left: false, bottom: false, right: false };

    _containerRef;
    _stageContainer;
    _stage;
    _container;

    constructor(props) {
        super(props);
        this._containerRef = React.createRef();
        // props.handleSize
        // props.selectedRects
        // props.onRectChanged
        // props.onSetCursor
        // props.zoom
        // props.panning

        this.state = {
            hasMoved: false,
            dragOrigin: null,
            lastRect: null
        };
    }
    
    screenToStageCoordinates = rect => {
        let stageRect = this._stage.getBoundingClientRect();
        return {
            top: (rect.top - stageRect.top) / this.props.zoom,
            left: (rect.left - stageRect.left) / this.props.zoom,
            height: (rect.height ? (rect.height / this.props.zoom) : 0),
            width: (rect.width ? (rect.width / this.props.zoom) : 0)
        };
    }

    stageToScreenCoordinates = rect => {
        let containerRect = this._stage.parentNode.getBoundingClientRect();
        return {
            top: ((rect.top - (this.props.stageHeight / 2) + this.props.panning.y) * this.props.zoom) + (containerRect.height / 2),
            left: ((rect.left - (this.props.stageWidth / 2) + this.props.panning.x) * this.props.zoom) + (containerRect.width / 2),
            height: (rect.height ? (rect.height * this.props.zoom) : 0),
            width: (rect.width ? (rect.width * this.props.zoom) : 0),
            transform: (rect.rotation ? `rotate(${rect.rotation}deg)` : null)
        };
    }
    
    componentDidMount() {
        this._stage = this._containerRef.current.parentNode.querySelector(".stage");
        this._containerRef.current.addEventListener("mousedown", this.onContainerMouseDown);
    }

    onContainerMouseDown = evt => {

        if (evt.buttons != 1)
            return;

        let stageCoordinates = this.screenToStageCoordinates({ top: evt.clientY, left: evt.clientX });
        let edge = evt.target.getAttribute("data-edge");

        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("mouseup", this.onMouseUp);

        // set the container to our chosen cursor so it's static
        let cursor = evt.target.getAttribute("data-cursor");
        this._containerRef.current.style["cursor"] = cursor;
        let gutterState;
        if (!edge) {
            gutterState = Resizer.GUTTER_STATE_BOXSELECT;
        } else if (edge == "center") {
            gutterState = Resizer.GUTTER_STATE_MOVE;
        } else {
            gutterState = {};
            gutterState.top = (edge == "nw" || edge == "n" || edge == "ne");
            gutterState.left = (edge == "nw" || edge == "w" || edge == "sw");
            gutterState.right = (edge == "ne" || edge == "e" || edge == "se");
            gutterState.bottom = (edge == "sw" || edge == "s" || edge == "se");
        }

        let originalRect;
        if (edge) {
            originalRect = {
                top: this.props.boundingBox.top,
                left: this.props.boundingBox.left,
                height: this.props.boundingBox.height,
                width: this.props.boundingBox.width
            };
        } else {
            originalRect = {
                top: stageCoordinates.top,
                left: stageCoordinates.left,
                height: 0,
                width: 0
            };
        }

        this.setState({
            hasMoved: false,
            dragOrigin: {
                gutterState: gutterState,
                left: stageCoordinates.left,
                top: stageCoordinates.top,
                rect: originalRect,
                originalSelectedRects: [...this.props.selectedRects]
            },
            lastRect: originalRect
        });
    }

    onMouseMove = evt => {

        let mouseStagePosition = this.screenToStageCoordinates({ top: evt.clientY, left: evt.clientX });
        let deltaX = mouseStagePosition.left - this.state.dragOrigin.left;
        let deltaY = mouseStagePosition.top - this.state.dragOrigin.top;
        let rect = Object.assign({}, this.state.dragOrigin.rect);
        let gs = this.state.dragOrigin.gutterState;

        if (gs == Resizer.GUTTER_STATE_BOXSELECT) {
            if (deltaY < 0) {
                rect.top = this.state.dragOrigin.top + deltaY;
                deltaY *= -1;
            }
            if (deltaX < 0) {
                rect.left = this.state.dragOrigin.left + deltaX;
                deltaX *= -1;
            }

            rect.height = deltaY;
            rect.width = deltaX;
        } else if (gs == Resizer.GUTTER_STATE_MOVE) {
            if (evt.ctrlKey) { // lock to vertical/horizontal
                if (Math.abs(deltaX / deltaY) > 1)
                    rect.left += deltaX;
                else
                    rect.top += deltaY
            } else {
                rect.left += deltaX;
                rect.top += deltaY;
            }
        } else {
            let aspectRatio = -rect.height / rect.width;
            let preserveAspect = this.props.preserveAspect;
            if (evt.ctrlKey) { preserveAspect = !preserveAspect; } // flip preserve if ctrl is held
                    
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

                let invert = false;
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

        this.setState({
             hasMoved: (deltaX != 0 || deltaY != 0),
             lastRect: rect
        });

        // emit change events if we're not box selecting
        if (gs != Resizer.GUTTER_STATE_BOXSELECT) {
            this.emitChangeEvents(rect, false);
        }
    }

    emitChangeEvents(newRect, createUndo) {
        if (this.props.selectedRects.length == 1) {
            this.props.onSelectedRectChanged(this.props.selectedRects[0].id, newRect, createUndo);
        } else {
            let startingRect = this.state.dragOrigin.rect;
            let scale = {
                top: newRect.top / startingRect.top,
                left: newRect.left / startingRect.left,
                width: newRect.width / startingRect.width,
                height: newRect.height / startingRect.height
            };
            for(let rect of this.state.dragOrigin.originalSelectedRects) {

                // scale each inner rect
                let scaledRect = {
                    top: newRect.top + ((rect.top - startingRect.top) * scale.height),
                    left: newRect.left + ((rect.left - startingRect.left) * scale.width),
                    width: rect.width * scale.width,
                    height: rect.height * scale.height
                };
                this.props.onSelectedRectChanged(rect.id, scaledRect, createUndo);
            }
        }
    }

    onMouseUp = evt => {

        if (!this.state.hasMoved) {
            this.props.onSelectAtCoords(this.state.dragOrigin.left, this.state.dragOrigin.top, this.state.dragOrigin.left, this.state.dragOrigin.top, evt.ctrlKey);
        } else {
            let gs = this.state.dragOrigin.gutterState;
            if (gs == Resizer.GUTTER_STATE_BOXSELECT) {
                this.props.onSelectAtCoords(this.state.lastRect.left, this.state.lastRect.top, this.state.lastRect.left + this.state.lastRect.width, this.state.lastRect.top + this.state.lastRect.height, evt.ctrlKey);
            } else {
                this.emitChangeEvents(this.state.lastRect, true);
            }
        }

        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("mouseup", this.onMouseUp);
        this._containerRef.current.style["cursor"] = "";
        this.setState({
            hasMoved: false,
            boxSelectRect: null,
            dragOrigin: null,
            lastRect: null
        });
    }

    renderSelectorBoxes() {

        let selectorBoxes = [];

        // render the selector box if we have one
        if (this.state.dragOrigin != null && this.state.dragOrigin.gutterState == Resizer.GUTTER_STATE_BOXSELECT) {
            selectorBoxes.push(
                <div className="resizer-selector-box" style={this.stageToScreenCoordinates(this.state.lastRect)} key="-2"></div>
            );
        }

        // render the bounding box if we have one
        if (this.props.boundingBox) {
            selectorBoxes.push(
                <div className="resizer-selector" style={this.stageToScreenCoordinates(this.props.boundingBox)} key="-1">
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
        if (this.props.selectedRects.length > 0) {
            for(var selectedRect of this.props.selectedRects) {
                selectorBoxes.push(<div className="resizer-subrect" style={this.stageToScreenCoordinates(selectedRect)} key={selectedRect.id} />);
            }
        }

        return selectorBoxes;
    }

    render() {
        return (
            <div className="resizer-container" ref={this._containerRef}>
                {this.renderSelectorBoxes()}
            </div>
        );
    }
}