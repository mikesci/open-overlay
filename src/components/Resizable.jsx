import React, { useCallback, useState } from "react";
import "./Resizable.css";

const Resizable = ({ edge, defaultSize, minimum, maximum, onSizeChanged, ...props }) => {

    const [sizeOverride, setSizeOverride] = useState();
    const isVertical = (edge == "top" || edge == "bottom");

    const onMouseDown = useCallback((evt) => {
        const origin = (isVertical ? evt.clientY : evt.clientX);
        let lastSize = defaultSize;

        const onMouseMove = (evt) => {
            const newSize = defaultSize + (isVertical ? (edge == "top" ? origin - evt.clientY : evt.clientY - origin) : (edge == "right" ? evt.clientX - origin : origin - evt.clientX));
            if (newSize > minimum && newSize <= maximum) {
                lastSize = newSize;
                setSizeOverride(newSize);
            }
        };

        const onMouseUp = (evt) => {
            onSizeChanged(lastSize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }, [defaultSize]);

    const resizeHandle = <div className={"resize-bar " + edge}><div className="inner" onMouseDown={onMouseDown} /></div>;

    const size = sizeOverride || defaultSize;

    switch (edge) {
        case "top":
            return <>{resizeHandle}<div className="resizable" style={{ height: size + "px" }}><div {...props} /></div></>;
        case "bottom":
            return <><div className="resizable" style={{ height: size + "px" }}><div {...props} /></div>{resizeHandle}</>;
        case "left":
            return <>{resizeHandle}<div className="resizable" style={{ width: size + "px" }}><div {...props} /></div></>;
        case "right":
            return <><div className="resizable" style={{ width: size + "px" }}><div {...props} /></div>{resizeHandle}</>;
        default:
            return null;
    }
};

export default Resizable;