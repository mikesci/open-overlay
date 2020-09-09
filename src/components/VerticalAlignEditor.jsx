import React from "react";
import { Button, ButtonGroup } from "@blueprintjs/core";

export default class VerticalAlignEditor extends React.Component {

    constructor(props) {
        super(props);
    }

    onChangeValue = (value) => {
        this.props.onChange(this.props.param, value);
    }

    render() {
        return (
            <div className="vertical-align-editor">
                <ButtonGroup>
                    <Button icon="alignment-top" active={this.props.value == "top"} onClick={() => this.onChangeValue("top")}></Button>
                    <Button icon="alignment-horizontal-center" active={this.props.value == "center"} onClick={() => this.onChangeValue("center")}></Button>
                    <Button icon="alignment-bottom" active={this.props.value == "bottom"} onClick={() => this.onChangeValue("bottom")}></Button>
                </ButtonGroup>
            </div>
        );
    }
}