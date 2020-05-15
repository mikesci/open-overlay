import React from "react";
import { Button, Intent, AnchorButton } from "@blueprintjs/core";
import CollapsableLayer from "./CollapsableLayer.jsx";
import ConfigurationForm from "./ConfigurationForm.jsx";
import LabelEditor from "./LabelEditor.jsx";
import { DragAndDropTypes } from "../shared/DragAndDropTypes.js";
import EffectMenuPopover from "./EffectMenuPopover.jsx";
import { effects } from "../shared/effects.js";
import "./LayerList.css";

class EffectItem extends React.PureComponent {

  constructor(props) {
    super(props);
    // props.dispatcher
    // props.effectName
    // props.effect
    // props.config
    // props.onConfigChanged
  }

  onParameterValuesChanged = (values, createUndoHistory) => {
    this.props.dispatcher.Dispatch("UPDATE_EFFECT", this.props.layer.id, this.props.effectName, values, createUndoHistory);
  }

  onDeleteClick = () => {
    this.props.dispatcher.Dispatch("DELETE_EFFECT", this.props.layer.id, this.props.effectName);
  }

  render() {
    // interpolate config form values based on animationTime

    return (
        <div className="effect-item">
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

class Layer extends React.Component {

  constructor(props) {
    super(props);
    // props.isSelected
    this.state = {
      isEditingLabel: false
    };
  }

  componentDidMount() {
    this.props.dispatcher.Register("EDIT_LAYER_NAME", this.onEditLayerName);
  }

  componentWillUnmount() {
    this.props.dispatcher.Unregister("EDIT_LAYER_NAME", this.onEditLayerName)
  }

  onEditLayerName = id => {
    if (id == this.props.layer.id) {
      this.setState({ isEditingLabel: true });
    }
  }

  onConfigFormParameterValuesChanged = (values, createUndoHistory) => {
    this.props.dispatcher.Dispatch("UPDATE_LAYER_CONFIG", this.props.layer.id, { config: values }, createUndoHistory);
  }

  onLayerLabelChanged = value => {
    this.props.dispatcher.Dispatch("UPDATE_LAYER_CONFIG", this.props.layer.id, { label: value }, true);
  }

  onToggleVisibility = value => {
    this.props.dispatcher.Dispatch("UPDATE_LAYER_CONFIG", this.props.layer.id, { hidden: !this.props.layer.hidden }, true);
  }

  onDelete = () => {
    this.props.dispatcher.Dispatch("DELETE_LAYERS", [ this.props.layer.id ]);
  }

  onCollapsableToggled = isOpen => {
    // emit a select event whenever the collapsable is toggled?
    this.props.dispatcher.Dispatch("SELECT_LAYER", this.props.layer.id);
  }

  onDragStart = evt => {
    if (!this.props.onDragStart) { evt.preventDefault(); return; }
    this.props.onDragStart(evt, this.props.layer.id);
  }

  render() {

    let editableTextLabel =
      <span className="layer-label">
        <LabelEditor
          selectAllOnFocus={true}
          value={this.props.layer.label}
          onChange={this.onLayerLabelChanged}
          isEditing={this.state.isEditingLabel}
          onConfirm={() => this.setState({ isEditingLabel: false })}
          onCancel={() => this.setState({ isEditingLabel: false })} />
    </span>;

    let leftButtons = <Button icon="eye-open" intent={this.props.layer.hidden ? Intent.DANGER : Intent.SUCCESS} title="Toggle Visibility" onClick={this.onToggleVisibility} />;

    let rightButtons = <>
      <Button icon="edit" title="Edit Label" onClick={evt => { this.setState({ isEditingLabel: true })}} />
      <Button icon="trash" title="Delete" onClick={this.onDelete} />
    </>;

    let configForm = null;
    if (this.props.element.manifest.parameters != null && this.props.element.manifest.parameters.length > 0) {
      configForm = (<ConfigurationForm
        fontLoader={this.props.fontLoader}
        parameters={this.props.element.manifest.parameters}
        parameterValues={this.props.layer.config}
        onParameterValuesChanged={this.onConfigFormParameterValuesChanged} />);
    }

    let effectsForms = [];
    if (this.props.layer.effects) {
      for(let [effectName, effectConfig] of Object.entries(this.props.layer.effects)) {
        let effect = effects[effectName];
        if (effect.type != "animation") {
          effectsForms.push(<EffectItem
            key={effectName}
            dispatcher={this.props.dispatcher}
            layer={this.props.layer}
            effectName={effectName}
            effect={effect}
            config={effectConfig} />);
        }
      }
    }

    return (
      <div className={"layer " + (this.props.isDragging ? "is-dragging" : null)} data-index={this.props.index}>
        <CollapsableLayer
          label={editableTextLabel}
          leftButtons={leftButtons}
          rightButtons={rightButtons}
          onToggle={this.onCollapsableToggled}
          islocked={this.state.isEditingLabel}
          intent={this.props.isSelected ? Intent.PRIMARY : null}
          disabled={this.props.layer.hidden}
          active={this.props.isDragging}
          draggable={true}
          onDragStart={this.onDragStart}
          collapsed={this.props.collapsed}>
          {configForm}
          {effectsForms}
          <EffectMenuPopover dispatcher={this.props.dispatcher} layer={this.props.layer}>
            <Button minimal={true} fill={true} alignText="left" icon="plus" className="btn-add-effect" text="Add Property" />
          </EffectMenuPopover>
        </CollapsableLayer>
      </div>
    );
  }
}

export default class LayerList extends React.Component {

  constructor(props) {
    super(props);
    // props.layers
    this.state = {
      draggedLayerIndex: null,
      draggedLayerId: null
    };
  }

  onLayerDragStart = (evt, id) => {
    if (evt.target.name == "INPUT") {
      evt.preventDefault();
      return;
    }

    // listen for drag end events in the whole window
    window.addEventListener("dragend", this.onLayerDragEnd);

    evt.dataTransfer.setData(DragAndDropTypes.LAYER, id);
    let layerIndex = this.props.layers.findIndex(r => r.id == id);
    this.setState({ draggedLayerIndex: layerIndex, draggedLayerId: id });
  }

  onLayerDragEnd = (evt, id) => {
    window.removeEventListener("dragend", this.onLayerDragEnd);
    this.setState({ draggedLayerIndex: null, draggedLayerId: null });
  }

  onDragOver = evt => {
    // only handle layer data
    if (!DragAndDropTypes.EventHasType(evt, DragAndDropTypes.LAYER)) { return; }

    // tell the browser we're handling it
    evt.preventDefault();

    // set the drop effect
    evt.dataTransfer.dropEffect = "move";

    if (evt.target.matches(".layer-list-layers")) {
      // if we're over the container, and not any layer, then set the positioner index to the end of the list
      if (this.state.draggedLayerIndex != this.props.layers.length) {
        this.setState({ draggedLayerIndex: this.props.layers.length });
      }
      return;
    }

    // all other cases, we should be over a layer
    let target = evt.target.closest(".layer");
    if (target) {

      if (target.matches(".is-dragging")) {
        // don't do anything if over the dragged layer
        return;
      } 

      // grab the index attribute
      let index = parseInt(target.getAttribute("data-index"));

      // calculate if we're over the top or bottom of this layer
      let rect = target.getBoundingClientRect();
      let isOverBottom = (evt.nativeEvent.clientY > (rect.top + (rect.height / 2)));

      // set the positioner
      let newIndex = (isOverBottom ? index + 1 : index);
      if (this.state.draggedLayerIndex != newIndex) {
        this.setState({ draggedLayerIndex: newIndex });
      }
    }
  }

  onDrop = evt => {
    evt.preventDefault();

    // only handle layers
    if (!DragAndDropTypes.EventHasType(evt, DragAndDropTypes.LAYER)) { return; }

    // pull the layer id from the drag data
    let id = parseInt(evt.dataTransfer.getData(DragAndDropTypes.LAYER));

    // dispatch the move message
    this.props.dispatcher.Dispatch("MOVE_LAYER", id, this.state.draggedLayerIndex);

    // clear the positioner
    this.setState({ draggedLayerIndex: null, draggedLayerId: null });
  }

  renderDraggedLayer() {
    if (this.state.draggedLayerId == null) { return null; }

    let layer = this.props.layers.find(r => r.id == this.state.draggedLayerId);
    let element = this.props.elements[layer.elementName];
    return (<Layer
      key={layer.id}
      index={this.state.draggedLayerIndex}
      dispatcher={this.props.dispatcher}
      layer={layer}
      element={element}
      isSelected={false}
      isDragging={true}
      collapsed={true}
      />);
  }

  render() {

    let layerList = [];
    this.props.layers.forEach((layer, index) => {

      // pull the element for this layer
      let element = this.props.elements[layer.elementName];

      // don't render anything if we can't find the element (maybe fix this later)
      if (!element) { return null; }

      // render the dragged layer if necessary
      if (index == this.state.draggedLayerIndex) { layerList.push(this.renderDraggedLayer()); }

      // don't render the layer being dragged
      if (layer.id != this.state.draggedLayerId) {
        // render to the stack
        layerList.push(<Layer
          key={layer.id}
          index={index}
          dispatcher={this.props.dispatcher}
          layer={layer}
          element={element}
          fontLoader={this.props.fontLoader}
          isSelected={this.props.selectedLayerIds.includes(layer.id)}
          onDragStart={this.onLayerDragStart}
          onDragEnd={this.onLayerDragEnd}
          collapsed={this.state.draggedLayerId == null ? undefined : true}
          animationTime={this.props.animationTime}
          />);
      }
    });

    if (this.state.draggedLayerIndex == this.props.layers.length) { layerList.push(this.renderDraggedLayer()); }

    return (
      <div className="layer-list-layers" onDragOver={this.onDragOver} onDrop={this.onDrop}>
        {layerList}
      </div>
    );
  }
}