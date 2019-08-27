import React from "react";
import StageManager from "./StageManager.jsx";
import Dispatcher from "../shared/dispatcher.js";
import ConfigurationForm from "./ConfigurationForm.jsx";
import "./ElementEditor.scss";
import { Card } from "@blueprintjs/core";

export default class ElementEditor extends React.Component {

  static UNDO_HISTORY_SIZE = 40;

  _dispatcher;
  _undoPointer = 0;
  _undoHistory = [];

  constructor(props) {
    super(props);

    // props.element
    // props.configValues
    // props.onConfigValuesChanged

    this._dispatcher = new Dispatcher();

    this.state = {
      alertText: null,
      configValues: this.props.configValues || {}
    };

    this.createUndoPoint(this.state.configValues, true);
  }

  componentDidMount() {
    // assign global handlers
    window.addEventListener("keydown", this.onWindowKeyDown);

    // disable browser zooming
    window.addEventListener("wheel", evt => { if (evt.ctrlKey) { evt.preventDefault(); evt.stopPropagation(); } }, { passive: false });

    this.refs.stageRootContainer.appendChild(this.props.stageRoot);

    /*
    while (this.props.stageRoot.children.length > 0) {
      this.refs.stageRootContainer.appendChild(this.props.stageRoot.firstChild);
    }
    */

    // finally call configure
    if (this.props.onConfigure) {
      this.props.onConfigure(this.state.configValues, this.props.element.MANIFEST.parameters);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onWindowKeyDown);
  }

  createUndoPoint(configValues, skipEmitChange) {
    // clear out undo history if we have a non-zero undo pointer
    if (this._undoPointer > 0) {
      let truncateIndex = this._undoHistory.length - this._undoPointer;
      this._undoHistory.splice(truncateIndex, this._undoPointer);
      this._undoPointer = 0;
    }

    // deep copy layer data
    let entry = JSON.stringify(configValues);

    // trim the history to keep it in size
    if (this._undoHistory.length > ElementEditor.UNDO_HISTORY_SIZE) {
      this._undoHistory.splice(0, 1); // delete the oldest element
    }

    if (!skipEmitChange && this.props.onConfigValuesChanged) {
      this.props.onConfigValuesChanged(configValues, entry);
    }

    this._undoHistory.push(entry);
  }

  restoreUndoPoint(redo) {
    if (this._undoHistory.length == 0) { return; }
    let newUndoPointer = this._undoPointer + (redo ? -1 : 1);
    if (newUndoPointer > this._undoHistory.length - 1 || newUndoPointer < 0) { return; } // don't allow the pointer to go past the beginning or end of the history
    this._undoPointer = newUndoPointer;
    let undoIndex = this._undoHistory.length - 1 - this._undoPointer;
    if (undoIndex < 0 || undoIndex > this._undoHistory.length - 1) { return; }
    let entry = this._undoHistory[undoIndex];
    let configValues = JSON.parse(entry);
    this.setState({ configValues: configValues });
    if (this.props.onConfigValuesChanged) {
      this.props.onConfigValuesChanged(configValues, entry);
    }
  }

  onWindowKeyDown = evt => {

    // disable browser zooming
    if (evt.ctrlKey && (evt.key == "+" || evt.key == "-" || evt.key == "0")) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    // pass through input elements
    if (evt.target.tagName == "INPUT" || evt.target.tagName == "SELECT" || evt.target.tagName == "TEXTAREA") { return; }

    // if we're not in a field that has it's own undo, provide undo support
    if (this._undoHistory.length > 0) {
      if (evt.key == "z" && evt.ctrlKey) { this.restoreUndoPoint(false); }
      else if (evt.key == "y" && evt.ctrlKey) { this.restoreUndoPoint(true); }
    }
  }

  onConfigValuesChanged = (configValues, createUndoHistory) => {
    this.setState(prevState => {
      let newConfigValues = Object.assign(prevState.configValues, configValues);

      // call onConfigure if we have it
      if (this.props.onConfigure) {this.props.onConfigure(newConfigValues, this.props.element.MANIFEST.parameters); }

      // create an undo point
      if (createUndoHistory) { this.createUndoPoint(newConfigValues, false); }

      return { configValues: newConfigValues };
    });
  }

  render() {
    let manifest = this.props.element.MANIFEST;
    return (
      <div className="app-container">
        <div className="app-wrapper">
          <Card className="app-header">
            <div className="element-name">{manifest.name} <span className="element-author">by {manifest.author}</span></div>
            <div className="element-description">{manifest.description}</div>
            <div className="element-dimensions">{manifest.width}x{manifest.height} pixels</div>
          </Card>
          <div className="element-config-form">
            <ConfigurationForm
              manifest={this.props.element.MANIFEST}
              parameterValues={this.state.configValues}
              onParameterValuesChanged={this.onConfigValuesChanged} />
          </div>
        </div>
        <div className="stage-wrapper">
          <StageManager stageWidth={this.props.element.MANIFEST.width} stageHeight={this.props.element.MANIFEST.height} selectedLayerIds={[]} dispatcher={this._dispatcher} hideResizer={true}>
            <div ref="stageRootContainer" />
          </StageManager>
        </div>
      </div>
    );
  }
}