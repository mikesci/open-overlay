import React from "react";
import "./ScriptPanel.css";
import { TextArea, Button, Intent } from "@blueprintjs/core";

let VALIDATION_STATES = {
    NONE: 1,
    INVALID: 2,
    VALID: 3
};

export default class ScriptPanel extends React.Component {

    Editor;

    constructor(props) {
        super(props);
        // props.isOpen
        // props.layers
        // props.scriptingContext
        // props.script
        // props.onScriptChanged
        // props.onExecutingChanged

        this.state = {
            validationState: VALIDATION_STATES.NONE,
            validationError: null,
            isExecuting: false,
            executionError: null
        };
    }

    onScriptTextChanged = (evt) => {
        let script = evt.target.value;

        // reset the validation state
        if (this.state.validationState != VALIDATION_STATES.NONE)
            this.setState({ validationState: VALIDATION_STATES.NONE })

        // for now, we'll send everything through
        if (this.props.onScriptChanged)
            this.props.onScriptChanged(script);
    }

    onValidate = () => {
        let validationError = this.props.scriptingContext.validateScript(this.props.script);
        let isValid = (validationError == null);
        this.setState({
            validationState: (isValid ? VALIDATION_STATES.VALID : VALIDATION_STATES.INVALID),
            validationError
        });
        return isValid;
    }

    onExecute = () => {
        // check if valid
        let isValid = this.onValidate();

        // if not valid, do not execute
        if (!isValid) { return; }
        
        this.setState(ps => {
            let isExecuting = !ps.isExecuting;
            this.props.onExecutingChanged(isExecuting);
            return { isExecuting, executionError: null };
        });
    }

    getValidationDisplay = () => {
        switch (this.state.validationState) {
            case VALIDATION_STATES.NONE: return { intent: Intent.NONE, icon: null, text: "Validate" };
            case VALIDATION_STATES.VALID: return { intent: Intent.SUCCESS, icon: "tick", text: "Validated" };
            case VALIDATION_STATES.INVALID: return { intent: Intent.DANGER, icon: "cross", text: "Invalid" };
            default: return Intent.NONE;
        }
    }

    getExecutionDisplay = () => {
        if (this.state.isExecuting)
            return { intent: Intent.WARNING, icon: "stop", text: "Stop" };

        if (this.props.scriptingContext.lastExecutionError)
            return { intent: Intent.DANGER, icon: "cross", text: "Error" };

        return { intent: Intent.NONE, icon: "play", text: "Execute" };
    }

    render() {
        if (!this.props.isOpen) { return null; }

        let validationDisplay = this.getValidationDisplay();
        let executionDisplay = this.getExecutionDisplay();

        return (
            <div className="script-wrapper">
                <TextArea value={this.props.script} className="editor" onChange={this.onScriptTextChanged} />
                <div className="button-bar">
                    <Button icon={validationDisplay.icon} onClick={this.onValidate} intent={validationDisplay.intent} title={this.state.validationError}>{validationDisplay.text}</Button>
                    <Button icon={executionDisplay.icon} onClick={this.onExecute} intent={executionDisplay.intent} title={this.state.executionError}>{executionDisplay.text}</Button>
                </div>
            </div>
        );
    }
  }