import React from "react";
import { Alert } from "@blueprintjs/core";

import ClipboardHelper from "./shared/ClipboardHelper.js";
import Dispatcher from "./shared/dispatcher.js";
import UndoManager from "./shared/UndoManager.js";

import LayerList from "./components/LayerList.jsx";
import StageManager from "./components/StageManager.jsx";
import LayerRenderer from "./components/LayerRenderer.jsx";
import { AppToaster } from "./components/AppToaster.jsx";
import ActiveLayerEditor from "./components/ActiveLayerEditor.jsx";

import "./OverlayEditor.scss";
import FontLoader from "./shared/FontLoader.js";

export default class OverlayEditor extends React.Component {

  _undoManager;
  _dispatcher;
  _fontLoader;

  constructor(props) {
    super(props);

    this._dispatcher = new Dispatcher();
    this._undoManager = new UndoManager();
    this._fontLoader = new FontLoader(props.fontSources);

    let maxLayerId = 0;
    if (this.props.layers && this.props.layers.length > 0) {
      maxLayerId = this.props.layers.map(r => r.id).reduce((p,c) => (c > p ? c : p)) + 1;
    }

    this.state = {
      alertText: null,
      maxLayerId: maxLayerId, // get maximum id and add one
      selectedLayerIds: [],
      elements: this.props.elements,
      layers: this.props.layers || [],
      addExternalElementDialogIsOpen: false
    };

    this.registerDispatcherCallbacks();

    this._undoManager.createUndoPoint(this.state.layers);
  }

  onLayersChanged(layers) {
    let entry = this._undoManager.createUndoPoint(layers);
    if (this.props.onLayersChanged) { this.props.onLayersChanged(layers, entry); }
  }

  onRestoreUndo(redo) {
    let undoData = this._undoManager.restoreUndoPoint(redo);
    if (this.props.onLayersChanged) { this.props.onLayersChanged(undoData.layers, undoData.entry); }
    this.setState({ layers: undoData.layers });
  }

  registerDispatcherCallbacks() {
    this._dispatcher.Register("SELECT_LAYER", (id, multiSelect) => {
      this.setState(prevState => {
        let selectedLayerIds = prevState.selectedLayerIds;
        if (id == null) {
          selectedLayerIds = [];
        } else if (!multiSelect) {
          if (selectedLayerIds.length != 1 || selectedLayerIds[0].id != id) {
            selectedLayerIds = [ id ];
          }
        } else {
          selectedLayerIds = [...prevState.selectedLayerIds];
          let index = selectedLayerIds.indexOf(id);
          if (index != -1)
            selectedLayerIds.splice(index, 1);
          else
            selectedLayerIds.push(id);
        }
        return { selectedLayerIds: selectedLayerIds };
      });
    });

    this._dispatcher.Register("CREATE_LAYER", (elementName, elementConfig) => {
      this.setState(prevState => {
        let layers = [...prevState.layers];
        
        let element = this.state.elements[elementName];
        elementConfig = elementConfig || {};

        // ensure the element is not unique
        if (element.manifest.unique && layers.findIndex(r => r.elementName == elementName) > -1) {
          AppToaster.show({ message: "Cannot create more than one layer with the specified element."});
          return null;
        }

        // generate a unique label
        let baseLabel = (elementConfig.label || element.manifest.name);
        // chop off the "#NUMBER" if it's there
        if (baseLabel.match(/\#\d+$/)) { baseLabel = baseLabel.substr(0, baseLabel.lastIndexOf("#") - 1); }
        let label = baseLabel;
        for(let i = 2; layers.findIndex(r => r.label == label) > -1; i++) {
          label = baseLabel + " #" + i;
        }

        let newLayerId = ++prevState.maxLayerId;

        let newLayer = {
          id: newLayerId,
          elementName: elementName,
          label: label,
          top: (elementConfig.top || 0),
          left: (elementConfig.left || 0),
          width: (elementConfig.width || element.manifest.width),
          height: (elementConfig.height || element.manifest.height)
        };

        if (elementConfig.config) {
          newLayer.config = elementConfig.config;
        } else {
          let config = {};
          for(let parameter of element.manifest.parameters) {
            if (parameter.defaultValue) {
              config[parameter.name] = parameter.defaultValue;
            }
          }
          newLayer.config = config;
        }

        layers.unshift(newLayer); // prepend new layer
        this.onLayersChanged(layers);
        return {
          maxLayerId: newLayerId,
          selectedLayerIds: [ newLayerId ],
          layers: layers
        };
      });
    });

    this._dispatcher.Register("UPDATE_LAYER_CONFIG", (id, newValues, commit) => {
      this.setState(prevState => {
        let layers = [...prevState.layers];
        let layer = layers.find(r => r.id == id);
        if (layer) {
          for(let [key, value] of Object.entries(newValues)) {
            if (key == "config") // special case for .config
              layer.config = Object.assign(layer.config, value);
            else
              layer[key] = value;
          }
        }
        if (commit) { this.onLayersChanged(layers); }
        return { layers: layers };
      });
    });

    this._dispatcher.Register("MOVE_LAYER", (id, index) => {
      this.setState(prevState => {
        let layers = [...prevState.layers];
        // find the index we're pulling from
        let sourceIndex = layers.findIndex(r => r.id == id);
        // pluck the layer from the array
        let layer = layers.splice(sourceIndex, 1)[0];
        // correct the indexbased on it's position
        if (index > sourceIndex) { index--; }
        // add the layer back in
        layers.splice(index, 0, layer);
        this.onLayersChanged(layers);
        return { layers: layers };
      });
    });

    this._dispatcher.Register("DELETE_LAYERS", ids => {
      this.setState(prevState => {
        let layers = [...prevState.layers];
        // delete the layers from the array
        for(var id of ids) {
          let sourceIndex = layers.findIndex(r => r.id == id);
          layers.splice(sourceIndex, 1);
        }
        this.onLayersChanged(layers);

        // delete from selected layers if selected
        let selectedLayerIds = [...prevState.selectedLayerIds];
        for(var id of ids) {
          let selectedIndex = selectedLayerIds.indexOf(id);
          if (selectedIndex > -1) { selectedLayerIds.splice(selectedIndex, 1); }
        }

        return {
          layers: layers,
          selectedLayerIds: selectedLayerIds
        };
      });
    });

    this._dispatcher.Register("COPY_LAYERS", layers => {
      let copyData = {
        objectType: "layers",
        data: layers
      };
      ClipboardHelper.CopyToClipboard(JSON.stringify(copyData));
    });

    this._dispatcher.Register("SHOW_TOAST", (config, key, callback) => {
      key = AppToaster.show(config, key);
      if (callback) { callback(key); }
    });

    if (this.props.onAddExternalElement) {
      this._dispatcher.Register("ADD_EXTERNAL_ELEMENT", (elementName, onSuccess, onError) => {
        this.props.onAddExternalElement(elementName).then(onSuccess).catch(onError);
      });
    }

    if (this.props.onRemoveExternalElement) {
      this._dispatcher.Register("REMOVE_EXTERNAL_ELEMENT", elementName => {
        this.props.onRemoveExternalElement(elementName);
      });
    }
  }

  componentDidMount() {
    // assign global handlers
    window.addEventListener("keydown", this.onWindowKeyDown);
    // disable browser zooming
    window.addEventListener("wheel", evt => { if (evt.ctrlKey) { evt.preventDefault(); evt.stopPropagation(); } }, { passive: false });
    document.addEventListener("paste", this.onPaste);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onWindowKeyDown);
    document.removeEventListener("paste", this.onPaste);
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
    if (evt.key == "z" && evt.ctrlKey && this._undoManager.canUndo()) { this.onRestoreUndo(false); return; }
    else if (evt.key == "y" && evt.ctrlKey && this._undoManager.canRedo()) { this.onRestoreUndo(true); return; }

    // handle layer-specific keys
    if (this.state.selectedLayerIds.length > 0) { // when multiple layers are selected
      let selectedLayers = this.state.layers.filter(r => this.state.selectedLayerIds.includes(r.id));

      if (evt.key == "F2") {
        evt.preventDefault();
        this._dispatcher.Dispatch("EDIT_LAYER_NAME", selectedLayers[0].id);
      } else if (evt.key == "Delete") {
        evt.preventDefault();
        this._dispatcher.Dispatch("DELETE_LAYERS", this.state.selectedLayerIds);
      } else if (evt.key == "c" && evt.ctrlKey) {
        evt.preventDefault();
        this._dispatcher.Dispatch("COPY_LAYERS", selectedLayers);
      } else if (evt.key == "c") { // center all
        evt.preventDefault();
        for(let layer of selectedLayers) {
          let newValues = { top: (this.props.height - layer.height) / 2, left: (this.props.width - layer.width) / 2 };
          this._dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, true);
        }
      } else if (evt.key == "f") {
        evt.preventDefault();
        for(let layer of selectedLayers) {
          let newValues = { top: 0, left: 0, height: this.props.height, width: this.props.width };
          this._dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, true);
        }
      } else if (evt.key == "[") {
        evt.preventDefault();

        // index and sort layers, ascending
        let indexedLayers = selectedLayers.map(layer => ({
          index: this.state.layers.indexOf(layer),
          layer: layer
        })).sort((a,b) => a.index - b.index);

        // find the bottom-most index
        let bottomMostIndex = indexedLayers.map(layer => layer.index).reduce((max, curr) => Math.max(max, curr), 0);

        // if any layer is already at the bottom, immediately return and do nothing
        if (bottomMostIndex == this.state.layers.length - 1) { return; }

        // if holding control, move all the way to the bottom
        if (evt.ctrlKey) { bottomMostIndex = this.state.layers.length - 2; }

        indexedLayers.forEach((indexedLayer, i) => {
          let newIndex = bottomMostIndex + 2 - i;
          this._dispatcher.Dispatch("MOVE_LAYER", indexedLayers[indexedLayers.length - 1 - i].layer.id, newIndex);
        });

      } else if (evt.key == "]") {
        evt.preventDefault();

        // index and sort layers, ascending
        let indexedLayers = selectedLayers.map(layer => ({
          index: this.state.layers.indexOf(layer),
          layer: layer
        })).sort((a,b) => a.index - b.index);

        // find the bottom-most index
        let topMostIndex = indexedLayers.map(layer => layer.index).reduce((max, curr) => Math.min(max, curr), 10000);
        
        // if any layer is already at the top, immediately return and do nothing
        if (topMostIndex == 0) { return; }

        // if holding control, move all the way to the top
        if (evt.ctrlKey) { topMostIndex = 1; }

        indexedLayers.forEach((indexedLayer, i) => {
          let newIndex = topMostIndex - 1 + i;
          this._dispatcher.Dispatch("MOVE_LAYER", indexedLayers[i].layer.id, newIndex);
        });
      } else if (evt.key == "+") {
        evt.preventDefault();
        let magnitude = (evt.shiftKey ? 1.2 : 1.1);
        for(let layer of selectedLayers) {
          let newValues = { height: layer.height * magnitude, width: layer.width * magnitude };
          this._dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, true);
        }
      } else if (evt.key == "-") {
        evt.preventDefault();
        let magnitude = (evt.shiftKey ? 1.2 : 1.1);
        for(let layer of selectedLayers) {
          let newValues = { height: layer.height / magnitude, width: layer.width / magnitude };
          this._dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, true);
        }
      } else if (evt.key == "ArrowRight") {
        evt.preventDefault();
        for(let layer of selectedLayers) {
          let newValues = (evt.ctrlKey ? { left: 1920 - layer.width } : { left: layer.left + (evt.shiftKey ? 1 : 5) });
          this._dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, true);
        }
      } else if (evt.key == "ArrowLeft") {
        evt.preventDefault();
        for(let layer of selectedLayers) {
          let newValues = (evt.ctrlKey ? { left: 0 } : { left: layer.left - (evt.shiftKey ? 1 : 5) });
          this._dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, true);
        }
      } else if (evt.key == "ArrowDown") {
        evt.preventDefault();
        for(let layer of selectedLayers) {
          let newValues = (evt.ctrlKey ? { top: 1080 - layer.height } : { top: layer.top + (evt.shiftKey ? 1 : 5) });
          this._dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, true);
        }
      } else if (evt.key == "ArrowUp") {
        evt.preventDefault();
        for(let layer of selectedLayers) {
          let newValues = (evt.ctrlKey ? { top: 0 } : { top: layer.top - (evt.shiftKey ? 1 : 5) });
          this._dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, true);
        }
      }
    } 

    if (evt.key == "Tab") {
      let newSelectedLayerId = null;

      if (this.state.selectedLayerIds.length == 0) {
        if (this.state.layers.length > 0) {
          newSelectedLayerId = this.state.layers[0].id;
        }
      } else {
        let firstSelectedIndex = this.state.layers.findIndex(r => r.id == this.state.selectedLayerIds[0]);
        let newIndex = (firstSelectedIndex + this.state.layers.length + (evt.shiftKey ? -1 : 1)) % this.state.layers.length;
        newSelectedLayerId = this.state.layers[newIndex].id;
      }

      if (newSelectedLayerId != null) {
        evt.preventDefault();
        this._dispatcher.Dispatch("SELECT_LAYER", newSelectedLayerId, false);
      }
    }
  }

  onPaste = evt => {
    // pass through input elements
    if (evt.target.tagName == "INPUT" || evt.target.tagName == "SELECT" || evt.target.tagName == "TEXTAREA") { return; }
    evt.preventDefault();
    if (this.props.onDataTransfer) {
      this.props.onDataTransfer(evt.clipboardData, this._dispatcher);
    }
  }

  onDragOver = evt => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "copy";
  }

  onDrop = evt => {
    evt.preventDefault();
    if (this.props.onDataTransfer) {
      this.props.onDataTransfer(evt.dataTransfer, this._dispatcher);
    }
  }

  render() {
    return (
      <div className="app-container" onDragOver={this.onDragOver} onDrop={this.onDrop}>
        <Alert isOpen={this.state.alertText != null} onClose={() => this.setState({ alertText: null })} icon="error">
          <p>{this.state.alertText}</p>
        </Alert>
        <div className="app-wrapper">
          {this.props.appHeader ? <div className="app-header">{this.props.appHeader}</div> : null}
          <div className="layer-list-container">
            <LayerList layers={this.state.layers} elements={this.state.elements} fontLoader={this._fontLoader} canAddExternalElements={this.props.onAddExternalElement != null} selectedLayerIds={this.state.selectedLayerIds} dispatcher={this._dispatcher} />
          </div>
          <div className="active-layer-editor-container">
            <ActiveLayerEditor layers={this.state.layers} elements={this.state.elements} selectedLayerIds={this.state.selectedLayerIds} dispatcher={this._dispatcher} />
          </div>
        </div>
        <div className="stage-wrapper">
          <StageManager stageWidth={this.props.width} stageHeight={this.props.height} layers={this.state.layers} elements={this.state.elements} selectedLayerIds={this.state.selectedLayerIds} dispatcher={this._dispatcher}>
            <LayerRenderer elements={this.state.elements} layers={this.state.layers} fontLoader={this._fontLoader} />
          </StageManager>
        </div>
      </div>
    );
  }
}