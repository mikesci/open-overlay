import React, { useEffect, useState } from "react";
import { Button, Collapse, Icon } from "@blueprintjs/core";
import "./CollapsiblePanel.css";

const CollapsiblePanel = ({ label, defaultIsOpen, rightElement, disabled, title, children }) => {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);

    useEffect(() => {
        setIsOpen(defaultIsOpen);
    }, [ defaultIsOpen ]);

    // allow there to be a lazy-loaded functional child element
    // that only renders if the panel is open
    if (children && typeof children === "function") {
        children = (isOpen ? children() : null);
    }

    let icon;
    if (disabled)
        icon = "minus";
    else if (isOpen)
        icon = "caret-down";
    else
        icon = "caret-right";

    return (
        <div className="collapsible-panel">
            <div className="panel-header" onClick={() => setIsOpen(!isOpen)} title={title}>
                <Icon icon={icon} iconSize="16" />
                <label>{label}</label>
                {rightElement}
            </div>
            <Collapse isOpen={isOpen}>
                {children}
            </Collapse>
        </div>
    );
}

export default CollapsiblePanel;