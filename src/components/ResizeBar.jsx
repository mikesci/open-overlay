import React from "react";

export default class ResizeBar extends React.Component {

    _vertical;

    constructor(props) {
        super(props);
        // props.onResized
        // props.width
        // OR
        // props.height
        this._vertical = (this.props.width != null);
        this.state = {
            resizing: false,
            originalX: null,
            originalY: null,
            deltaX: null,
            deltaY: null,
            rect: null,
            ghostElement: null
        };
    }

    onPositionChanged = () => {
        this.setState(ps => ({ collapsed: !ps.collapsed }));
    }

    onMouseDown = evt => {
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("mouseup", this.onMouseUp);

        let rect = evt.target.getBoundingClientRect();

        // create the ghost element that mirrors the rect
        let ghostElement = document.createElement("div");
        ghostElement.style.position = "absolute";
        ghostElement.style.top = rect.top + "px";
        ghostElement.style.left = rect.left + "px";
        ghostElement.style.height = rect.height + "px";
        ghostElement.style.width = rect.width + "px";
        ghostElement.style.background = "rgba(255,255,255,0.5)";
        ghostElement.style.zIndex = 1000001;
        ghostElement.style.cursor = (this._vertical ? "ew-resize" : "ns-resize");
        document.body.appendChild(ghostElement);

        this.setState({
            resizing: true,
            originalX: evt.clientX,
            originalY: evt.clientY,
            rect: {
                top: rect.top,
                left: rect.left,
                height: rect.height,
                width: rect.width
            },
            ghostElement: ghostElement
        });
    }

    onMouseMove = evt => {
        if (!this.state.resizing) { return; } // just in case
        if (this._vertical)
            this.state.ghostElement.style.left = (this.state.rect.left - this.state.originalX + evt.clientX) + "px";
        else
            this.state.ghostElement.style.top = (this.state.rect.top - this.state.originalY + evt.clientY) + "px";
        /*
        this.setState(ps => ({
            deltaX: ps.originalX - evt.clientX,
            deltaY: ps.originalY - evt.clientY
        }));
        */
    }

    onMouseUp = evt => {
        if (!this.state.resizing) { return; } // just in case
        if (this.props.onResized) {
            // calculate the delta
            let delta = (this._vertical ? this.state.originalX - evt.clientX : this.state.originalY - evt.clientY);
            this.props.onResized(delta);
        }
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("mouseup", this.onMouseUp);
        this.state.ghostElement.parentNode.removeChild(this.state.ghostElement);
        this.setState({ resizing: false, ghostElement: null });
    }
    
    render() {
        let style = {
            width: this.props.width,
            height: this.props.height,
            cursor: (this._vertical ? "ew-resize" : "ns-resize")
        };
        return (
            <div className="resize-bar" style={style} onMouseDown={this.onMouseDown}></div>
        );
    }
}