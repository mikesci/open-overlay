import React from "react";
import { Button, ButtonGroup, InputGroup, FormGroup, HTMLSelect } from "@blueprintjs/core";

export default class AnimationEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.getStateFromProps(props.value);
    }

    componentDidUpdate() {
        if (this.state.initialValue != this.props.value) {
            this.setState(this.getStateFromProps(this.props.value));
        }
    }

    getStateFromProps(value) {
        let sourceValue = value || {};

        let newValue = {
            "duration": sourceValue.duration,
            "timing": sourceValue.timing,
            "delay": sourceValue.delay,
            "iterations": sourceValue.iterations,
            "direction": sourceValue.direction,
            "fill": sourceValue.fill
        };

        if (newValue.duration == undefined) { newValue.duration = this.props.param.defaultValue.duration; }
        if (newValue.timing == undefined) { newValue.timing = this.props.param.defaultValue.timing; }
        if (newValue.delay == undefined) { newValue.delay = this.props.param.defaultValue.delay; }
        if (newValue.iterations == undefined) { newValue.iterations = this.props.param.defaultValue.iterations; }
        if (newValue.direction == undefined) { newValue.direction = this.props.param.defaultValue.direction; }
        if (newValue.fill == undefined) { newValue.fill = this.props.param.defaultValue.fill; }

        return {
            initialValue: value,
            value: newValue
        };
    }

    onValueChanged(newValues, emitChange, createUndoEntry) {
        this.setState(
            ps => ({ value: {...ps.value, ...newValues}}),
            () => {
                if (emitChange) {
                    let emittedValue = {...this.state.value};
                    for(let [key, value] of Object.entries(this.state.value)) {
                        if (value == "") { delete emittedValue[key]; }
                    }
                    this.props.onChange(this.props.param, emittedValue, createUndoEntry);
                }
        });
    }

    onTextChanged = (name, value) => {
        let values = {};
        values[name] = value;
        this.onValueChanged(values, false, false);
    }

    render() {
        return (
            <div className="animation-editor">
                <FormGroup label="Duration">
                    <InputGroup value={this.state.value.duration || ""} onChange={evt => this.onTextChanged("duration", evt.target.value)} onBlur={evt => this.onValueChanged({ duration: evt.target.value }, true, true )} />
                </FormGroup>
                <FormGroup label="Timing">
                    <HTMLSelect value={this.state.value.timing || ""} onChange={evt => this.onValueChanged({ timing: evt.target.value }, true, true )}>
                        <option value="">Ease</option>
                        <option value="ease-in">Ease In</option>
                        <option value="ease-out">Ease Out</option>
                        <option value="linear">Linear</option>
                    </HTMLSelect>
                </FormGroup>
                <FormGroup label="Delay">
                    <InputGroup value={this.state.value.delay || ""} onChange={evt => this.onTextChanged("delay", evt.target.value)} onBlur={evt => this.onValueChanged({ delay: evt.target.value }, true, true )} />
                </FormGroup>
                <FormGroup label="Loop">
                    <HTMLSelect value={this.state.value.iterations || ""} onChange={evt => this.onValueChanged({ iterations: evt.target.value }, true, true )}>
                        <option value="">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="infinite">Infinite</option>
                    </HTMLSelect>
                </FormGroup>
                <FormGroup label="Direction">
                    <HTMLSelect value={this.state.value.direction || ""} onChange={evt => this.onValueChanged({ direction: evt.target.value }, true, true )}>
                        <option value="">Forward</option>
                        <option value="reverse">Reverse</option>
                        <option value="alternate">Alternate</option>
                        <option value="alternate-reverse">Reverse Alternate</option>
                    </HTMLSelect>
                </FormGroup>
            </div>
        );
    }
}