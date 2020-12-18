import React from "react";
import { Collapse, Button, ButtonGroup } from "@blueprintjs/core";
import "./CollapsableLayer.css";

export default class CollapsableLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen || false
        };
    }

    onToggle = evt => {
        if (!this.props.islocked) {
            if (this.props.onToggle) {
                this.props.onToggle(!this.state.isOpen, evt);
            }
            
            this.setState(prevState => {
                let isOpen = !prevState.isOpen;
                return { isOpen: isOpen };
            });
        }
    }

    render() {
        let {intent, label, islocked, active, disabled, draggable, onDragStart, onDragEnd, collapsed, leftButtons, rightButtons, ...passThroughProps} = this.props;

        let collapse = null;
        if (this.props.children) {
            collapse = (
                <Collapse isOpen={collapsed != undefined ? !collapsed : this.state.isOpen}>
                    <div className="inner">
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
            <div className="collapsable-layer" {...passThroughProps}>
                <ButtonGroup fill={true}>
                    {leftButtons}
                    <Button icon={icon} onClick={this.onToggle} alignText="left" style={style} fill={true} intent={intent} active={active} draggable={draggable} onDragStart={onDragStart} onDragEnd={onDragEnd}>{label}</Button>
                    {rightButtons}
                </ButtonGroup>
                {collapse}
            </div>
        );
    }
}