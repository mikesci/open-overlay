import React from "react";
import { Collapse, Button } from "@blueprintjs/core";
import "./CollapsableGroup.css";

export default class CollapsableGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen || false
        };
    }

    onToggle = evt => {
        if (!this.props.islocked) {
            this.setState(prevState => {
                let isOpen = !prevState.isOpen;
                if (this.props.onToggle) { this.props.onToggle(isOpen); }
                return { isOpen: isOpen };
            });
        }
    }

    render() {
        let {intent, label, islocked, active, disabled, draggable, onDragStart, onDragEnd, collapsed, ...passThroughProps} = this.props;

        let collapse = null;
        if (this.props.children) {
            collapse = (
                <Collapse isOpen={collapsed != undefined ? !collapsed : this.state.isOpen}>
                    <div className="group-inner">
                        {this.props.children}
                    </div>
                </Collapse>
            );
        }

        let icon = "blank";
        if (this.props.children) {
            icon = (this.state.isOpen ? "caret-down" : "caret-right");
        }

        let style = {};
        if (disabled) { style.opacity = 0.5; }

        return (
            <div className="group" {...passThroughProps}>
                <Button icon={icon} onClick={this.onToggle} alignText="left" style={style} fill={true} intent={intent} active={active} draggable={draggable} onDragStart={onDragStart} onDragEnd={onDragEnd}>{label}</Button>
                {collapse}
            </div>
        );
    }
}