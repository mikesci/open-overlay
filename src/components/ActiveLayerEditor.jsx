import React from "react";
import { FormGroup, ControlGroup, InputGroup } from "@blueprintjs/core";
import './ActiveLayerEditor.css';

export default class ActiveLayerEditor extends React.Component {

    constructor(props) {
        super(props);

        let layer = (props.selectedLayerIds.length == 1 ? props.layers.find(r => r.id == props.selectedLayerIds[0]) : {}) || {};
        this.state = {
            disabled: (props.selectedLayerIds.length != 1 || layer.nonVisual),
            selectedLayerId: layer.id,
            top: layer.top,
            left: layer.left,
            width: layer.width,
            height: layer.height,
            rotation: layer.rotation
        };
    }

    static getDerivedStateFromProps(props, state) {
        // if we have exactly one layer selected
        if (props.selectedLayerIds.length == 1) {
            let selectedLayerId = props.selectedLayerIds[0];
            let layer = props.layers.find(r => r.id == selectedLayerId);
            if (layer)
            {
                let element = props.elements[layer.elementName];
                if (element) {
                    // if we have a visual element...
                    if (!element.manifest.nonVisual) {
                        let needsUpdate = false;
                        let newState = {};
                        if (state.disabled == true) { newState.disabled = false; needsUpdate = true; }
                        if (selectedLayerId !== state.selectedLayerId) { newState.selectedLayerId = selectedLayerId; needsUpdate = true; }
                        if (layer.top !== state.top) { newState.top = layer.top; needsUpdate = true; }
                        if (layer.left !== state.left) { newState.left = layer.left; needsUpdate = true; }
                        if (layer.width !== state.width) { newState.width = layer.width; needsUpdate = true; }
                        if (layer.height !== state.height) { newState.height = layer.height; needsUpdate = true; }
                        if (layer.rotation !== state.rotation) { newState.rotation = layer.rotation; needsUpdate = true; }
                
                        if (!needsUpdate) { return null; }
                        return newState;
                    }
                }
            }
        }

        // if we got here, we need to disable
        return {
            disabled: true,
            selectedLayerId: null,
            top: "",
            left: "",
            width: "",
            height: "",
            rotation: ""
        };
    }

    onFieldChanged = evt => {
        let param = evt.target.getAttribute("data-param");
        let val = evt.target.value;
        this.updateParameter(param, val, false);
    }

    onFieldFocused = evt => {
        this.setState({ isChanging: true });
        evt.target.setAttribute("last-value", evt.target.value);
    }

    onFieldBlurred = evt => {
        this.setState({ isChanging: false });
        let param = evt.target.getAttribute("data-param");
        let val = evt.target.value;
        let lastValue = evt.target.getAttribute("last-value");

        // verify we have a legit value, otherwise reapply the last value
        const isValid = val.match(/^\-?\d+\.?\d*$/);
        this.updateParameter(param, (isValid ? parseFloat(val) : lastValue), true);
    }

    updateParameter(name, value, createUndo) {
        let obj = {};
        obj[name] = value;
        //obj[name] = parseFloat(value);
        this.props.dispatcher.Dispatch("UPDATE_LAYER_CONFIG", this.state.selectedLayerId, obj, createUndo);
        return true;
    }

    render() {
        return (
            <div className="active-layer-editor">
                <ControlGroup fill={true}>
                    <FormGroup label="X">
                        <InputGroup value={this.state.left} onChange={this.onFieldChanged} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} data-param="left" disabled={this.state.disabled} />
                    </FormGroup>
                    <FormGroup label="Y">
                        <InputGroup value={this.state.top} onChange={this.onFieldChanged} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} data-param="top" disabled={this.state.disabled} />
                    </FormGroup>
                    <FormGroup label="Width">
                        <InputGroup value={this.state.width} onChange={this.onFieldChanged} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} data-param="width" disabled={this.state.disabled} />
                    </FormGroup>
                    <FormGroup label="Height">
                        <InputGroup value={this.state.height} onChange={this.onFieldChanged} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} data-param="height" disabled={this.state.disabled} />
                    </FormGroup>
                    <FormGroup label="Rotation">
                        <InputGroup value={this.state.rotation} onChange={this.onFieldChanged} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} data-param="rotation" disabled={this.state.disabled} />
                    </FormGroup>
                </ControlGroup>
            </div>
        );
    }
}