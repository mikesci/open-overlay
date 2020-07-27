import React from "react";
import { FormGroup, ControlGroup, InputGroup, ButtonGroup, Button, Popover, Menu, MenuItem, AnchorButton, PopoverInteractionKind } from "@blueprintjs/core";
import ConfigurationForm from "./ConfigurationForm.jsx";
import { entryAnimations, exitAnimations, standardAnimations, effects } from "../shared/effects.js";
import './ActiveLayerEditor.css';

class LayerAnimationItem extends React.PureComponent {

    constructor(props) {
      super(props);
      // props.dispatcher
      // props.name
      // props.effect
      // props.config
      // props.onConfigChanged
      // props.onDelete
    }
  
    onParameterValuesChanged = (values, createUndoHistory) => {
        if (this.props.onConfigChanged)
            this.props.onConfigChanged(this.props.name, values, createUndoHistory);
    }
  
    onDeleteClick = () => {
        if (this.props.onDelete)
            this.props.onDelete(this.props.name);
    }
  
    render() {
      if (!this.props.effect) { return <div>Effect {this.props.name} not found</div>; }
  
      return (
          <div className="layer-animation-item">
            <div className="effect-name">
              {this.props.effect.displayName}
              <div className="buttons">
                <AnchorButton minimal={true} icon="trash" onClick={this.onDeleteClick} />
              </div>
            </div>
            <ConfigurationForm
              parameters={this.props.effect.parameters}
              parameterValues={this.props.config}
              onParameterValuesChanged={this.onParameterValuesChanged} />
          </div>
      );
    }
}

class EffectListEditor extends React.PureComponent {
    constructor(props) {
        super(props);
        // props.label
        // props.availableEffects
        // props.effectList
        // props.onEffectConfigChanged
        // props.onEffectDeleted
        // props.onEffectAdded
        // props.isOpen
        // props.onOpenToggled
        // props.isPlaying
    }

    getEffectName = () => {
        if (!this.props.effectList || this.props.effectList.length == 0)
            return " ";
        else if (this.props.effectList.length == 1)
            return this.props.effectList[0].effect.displayName;
        else
            return `(${this.props.effectList.length} effects)`;
    }

    onPopoverInteraction = nextOpenState => {
        if (this.props.onOpenToggled)
            this.props.onOpenToggled(nextOpenState);
    }

    render() {
        return (
            <FormGroup label={this.props.label} inline={true}>
                <ButtonGroup>
                    <Button icon={this.props.isPlaying ? "stop" : "play"} intent={this.props.isPlaying ? "danger" : "none"} onClick={this.props.isPlaying ? this.props.onPause : this.props.onPlay} />
                    <Popover disabled={this.props.disabled || !this.props.effectList || this.props.effectList.length == 0}
                        isOpen={this.props.isOpen}
                        onInteraction={this.onPopoverInteraction}
                        enforceFocus={false}
                        usePortal={false}
                        autoFocus={false}>
                        <Button disabled={this.props.disabled} className="effect-list-button">{this.getEffectName()}</Button>
                        <div className="layer-animation-list">
                            {this.props.disabled || !this.props.effectList ? null : (
                                this.props.effectList.map(item => 
                                    <LayerAnimationItem
                                        key={item.name}
                                        name={item.name}
                                        effect={item.effect}
                                        config={item.config}
                                        onConfigChanged={this.props.onEffectConfigChanged}
                                        onDelete={this.props.onEffectDeleted} />
                                )
                            )}
                        </div>
                    </Popover>
                    <Popover position="bottom" disabled={this.props.disabled} boundary={"window"}>
                        <Button disabled={this.props.disabled} icon="plus" />
                        <Menu>
                            {this.props.availableEffects.map(effectName => {
                                let effect = effects[effectName];
                                return (
                                    <MenuItem
                                        key={effectName}
                                        text={effect.displayName}
                                        onClick={evt => this.props.onEffectAdded(effectName)}
                                    />
                                );
                            })}
                        </Menu>
                    </Popover>
                </ButtonGroup>
            </FormGroup>
        );
    }
}

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
            rotation: layer.rotation,
            effects: layer.effects
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
                        if (layer.effects !== state.effects) {
                            newState.effects = layer.effects;
                            newState.entryEffects = [];
                            newState.exitEffects = [];
                            newState.standardEffects = [];
                            if (layer.effects) {
                                for(let [effectName, effectConfig] of Object.entries(layer.effects)) {
                                    let effect = effects[effectName];
                                    if (effect) {
                                        if (effect.animationType == "entrance")
                                            newState.entryEffects.push({ name: effectName, effect: effect, config: effectConfig });
                                        if (effect.animationType == "exit")
                                            newState.exitEffects.push({ name: effectName, effect: effect, config: effectConfig });
                                        if (effect.animationType == "standard")
                                            newState.standardEffects.push({ name: effectName, effect: effect, config: effectConfig });
                                    }
                                }
                            }
                            needsUpdate = true;
                        }
                
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
            rotation: "",
            effects: null,
            entryEffects: null,
            exitEffects: null,
            standardEffects: null,
            openEffectList: null
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

    onEffectConfigChanged = (effectName, effectConfig, createUndoHistory) => {
        this.props.dispatcher.Dispatch("UPDATE_EFFECT", this.state.selectedLayerId, effectName, effectConfig, createUndoHistory);
    }

    onEffectDeleted = (effectName) => {
        this.props.dispatcher.Dispatch("DELETE_EFFECT", this.state.selectedLayerId, effectName);
    }

    onEffectAdded = (effectName, effectListName) => {
        this.props.dispatcher.Dispatch("ADD_EFFECT", this.state.selectedLayerId, effectName);
        this.setState({ openEffectList: effectListName });
    }

    onEffectListOpenToggled = (effectListName, nextOpenState) => {
        if (!nextOpenState) {
            this.setState({ openEffectList: null });
            return;
        }

        this.setState({ openEffectList: effectListName });
    }

    render() {
        return (
            <div className="active-layer-editor">
                <EffectListEditor
                    label="Entry"
                    availableEffects={entryAnimations}
                    effectList={this.state.entryEffects}
                    disabled={this.state.disabled}
                    isOpen={this.state.openEffectList == "entry"}
                    isPlaying={this.props.rendererPhase == "entering"}
                    onOpenToggled={nextOpenState => this.onEffectListOpenToggled("entry", nextOpenState)}
                    onEffectConfigChanged={this.onEffectConfigChanged}
                    onEffectDeleted={this.onEffectDeleted}
                    onEffectAdded={effectName => this.onEffectAdded(effectName, "entry")}
                    onPlay={() => this.props.onSetRendererPhase("entering")}
                    onPause={() => this.props.onSetRendererPhase("static")} />
                <EffectListEditor
                    label="Exit"
                    availableEffects={exitAnimations}
                    effectList={this.state.exitEffects}
                    disabled={this.state.disabled}
                    isOpen={this.state.openEffectList == "exit"}
                    isPlaying={this.props.rendererPhase == "exiting"}
                    onOpenToggled={nextOpenState => this.onEffectListOpenToggled("exit", nextOpenState)}
                    onEffectConfigChanged={this.onEffectConfigChanged}
                    onEffectDeleted={this.onEffectDeleted}
                    onEffectAdded={effectName => this.onEffectAdded(effectName, "exit")}
                    onPlay={() => this.props.onSetRendererPhase("exiting")}
                    onPause={() => this.props.onSetRendererPhase("static")} />
                <EffectListEditor
                    label="Standard"
                    availableEffects={standardAnimations}
                    effectList={this.state.standardEffects}
                    disabled={this.state.disabled}
                    isOpen={this.state.openEffectList == "standard"}
                    isPlaying={this.props.rendererPhase == "visible"}
                    onOpenToggled={nextOpenState => this.onEffectListOpenToggled("standard", nextOpenState)}
                    onEffectConfigChanged={this.onEffectConfigChanged}
                    onEffectDeleted={this.onEffectDeleted}
                    onEffectAdded={effectName => this.onEffectAdded(effectName, "exit")}
                    onPlay={() => this.props.onSetRendererPhase("visible")}
                    onPause={() => this.props.onSetRendererPhase("static")} />
                <div className="layer-coordinate-inputs">
                    <ControlGroup>
                        <FormGroup label="X" inline={true}>
                            <InputGroup value={this.state.left} onChange={this.onFieldChanged} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} data-param="left" readOnly={this.state.disabled} />
                        </FormGroup>
                        <FormGroup label="Y" inline={true}>
                            <InputGroup value={this.state.top} onChange={this.onFieldChanged} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} data-param="top" readOnly={this.state.disabled} />
                        </FormGroup>
                        <FormGroup label="W" inline={true}>
                            <InputGroup value={this.state.width} onChange={this.onFieldChanged} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} data-param="width" readOnly={this.state.disabled} />
                        </FormGroup>
                        <FormGroup label="H" inline={true}>
                            <InputGroup value={this.state.height} onChange={this.onFieldChanged} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} data-param="height" readOnly={this.state.disabled} />
                        </FormGroup>
                        <FormGroup label="R" inline={true}>
                            <InputGroup value={this.state.rotation} onChange={this.onFieldChanged} onFocus={this.onFieldFocused} onBlur={this.onFieldBlurred} data-param="rotation" readOnly={this.state.disabled} />
                        </FormGroup>
                    </ControlGroup>
                </div>
            </div>
        );
    }
}