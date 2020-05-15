import React from "react";
import "./ScriptPanel.css";
import { TextArea, Button } from "@blueprintjs/core";

export default class ScriptPanel extends React.Component {
  
    constructor(props) {
        super(props);
        // props.isOpen
        // props.scriptingContext
        // props.initialScript
        // props.onScriptChanged

        this.state = {
            script: this.props.initialScript
        };
    }

    onScriptChanged = (evt) => {
        let script = evt.target.value;
        this.setState({ script });
        // try to automatically validate?
    }
  
    render() {
        if (!this.props.isOpen) { return null; }

        return (
            <div className="script-wrapper">
                <TextArea value={this.props.script} className="editor" onChange={this.onScriptChanged} />
                <div className="button-bar">
                    <Button icon="tick">Validate</Button>
                    <Button icon="play">Execute</Button>
                </div>
            </div>
        );
    }
  }