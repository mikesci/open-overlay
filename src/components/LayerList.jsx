import React from "react";
import { Button, Popover, Position, Intent, PopoverInteractionKind, Menu, MenuItem, MenuDivider, ContextMenu, AnchorButton } from "@blueprintjs/core";
import CollapsableGroup from "./CollapsableGroup.jsx";
import ConfigurationForm from "./ConfigurationForm.jsx";
import AddExternalElementForm from "./AddExternalElementForm.jsx";
import LabelEditor from "./LabelEditor.jsx";
import { DragAndDropTypes } from "../shared/DragAndDropTypes.js";
import "./LayerList.css";

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
    this.props.dispatcher.Dispatch("UPDATE_LAYER_CONFIG", this.props.layer.id, { label: value });
  }

  onToggleVisibility = value => {
    this.props.dispatcher.Dispatch("UPDATE_LAYER_CONFIG", this.props.layer.id, { hidden: !this.props.layer.hidden });
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
          <div className="buttons">
            <AnchorButton minimal={true} icon={this.props.layer.hidden ? "eye-off" : "eye-open"} title="Toggle Visibility" onClick={evt => { evt.stopPropagation(); this.onToggleVisibility(); }} />
            <AnchorButton minimal={true} icon="edit" title="Edit Label" onClick={evt => { evt.stopPropagation(); this.setState({ isEditingLabel: true })}} />
            <AnchorButton minimal={true} icon="trash" title="Delete" onClick={evt => { evt.stopPropagation(); this.onDelete(); }} />
          </div>
    </span>;

    let configForm = null;
    if (this.props.element.manifest.parameters != null && this.props.element.manifest.parameters.length > 0) {
      configForm = <ConfigurationForm
      manifest={this.props.element.manifest}
      parameterValues={this.props.layer.config}
      onParameterValuesChanged={this.onConfigFormParameterValuesChanged} />;
    }

    return (
      <div className={"layer " + (this.props.isDragging ? "is-dragging" : null)} data-index={this.props.index}>
        <CollapsableGroup
          label={editableTextLabel}
          onToggle={this.onCollapsableToggled}
          islocked={this.state.isEditingLabel}
          intent={this.props.isSelected ? Intent.PRIMARY : null}
          disabled={this.props.layer.hidden}
          active={this.props.isDragging}
          draggable={true}
          onDragStart={this.onDragStart}
          collapsed={this.props.collapsed}>
          {configForm}
        </CollapsableGroup>
      </div>
    );
  }
}

class ElementMenuPopover extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuLockedOpen: false
    };
  }

  onRemoveExternalElement = element => {
    this.props.dispatcher.Dispatch("REMOVE_EXTERNAL_ELEMENT", element);
  }

  onElementMenuItemClick = (evt, elementName) => {
    this.props.dispatcher.Dispatch("CREATE_LAYER", elementName);
  }

  onElementMenuItemContextMenu = (evt, elementName) => {
    evt.preventDefault();
    let element = this.props.elements[elementName];
    if (!element.isExternal) { return; }
    let contents = (
      <Menu>
        <MenuItem key="desc" disabled={true} text={element.manifest.description} />
        <MenuItem key="author" disabled={true} text="Author" label={element.manifest.author} />
        <MenuItem key="dimensions" disabled={true} text="Dimensions" label={`${element.manifest.width}x${element.manifest.height}px`} />
        <MenuDivider />
        <MenuItem icon="delete" text="Remove" intent={Intent.DANGER} onClick={() => this.onRemoveExternalElement(elementName)} />
      </Menu>
    );

    ContextMenu.show(contents, { left: evt.clientX, top: evt.clientY });
  }

  render() {
    return (
      <Popover position={Position.RIGHT_BOTTOM} interactionKind={PopoverInteractionKind.CLICK} boundary={"window"} isOpen={this.state.isMenuLockedOpen ? true : undefined}>
        {this.props.children}
        <Menu>
          {Object.entries(this.props.elements).map(pair => (
            <MenuItem
              key={pair[0]}
              text={pair[1].manifest.name}
              onContextMenu={evt => this.onElementMenuItemContextMenu(evt, pair[0])}
              onClick={evt => this.onElementMenuItemClick(evt, pair[0])}
            />
          ))}
          <MenuDivider />
          <MenuItem icon="add" text="Add external element..." popoverProps={{ openOnTargetFocus: false, isOpen: (this.state.isMenuLockedOpen ? true : undefined) }}>
            <AddExternalElementForm dispatcher={this.props.dispatcher} onSetLock={locked => this.setState({ isMenuLockedOpen: locked })} />
          </MenuItem>
        </Menu>
      </Popover>
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
          isSelected={this.props.selectedLayerIds.includes(layer.id)}
          onDragStart={this.onLayerDragStart}
          onDragEnd={this.onLayerDragEnd}
          collapsed={this.state.draggedLayerId == null ? undefined : true}
          />);
      }
    });

    if (this.state.draggedLayerIndex == this.props.layers.length) { layerList.push(this.renderDraggedLayer()); }

    return (
      <div className="layer-list">
        <div className="layer-list-header">
          <div className="left">Layers</div>
          <div className="right">
            <ElementMenuPopover dispatcher={this.props.dispatcher} elements={this.props.elements}>
              <Button icon="plus" intent={Intent.PRIMARY} />
            </ElementMenuPopover>
          </div>
        </div>
        <div className="layer-list-layers" onDragOver={this.onDragOver} onDrop={this.onDrop}>
          {layerList}
        </div>
      </div>
    );
  }
}