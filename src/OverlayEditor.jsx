import React from "react";
import { InputGroup, Button, ProgressBar } from "@blueprintjs/core";
import ClipboardHelper from "./shared/ClipboardHelper.js";
import Dispatcher from "./shared/dispatcher.js";
import UndoManager from "./shared/UndoManager.js";
import LayerList from "./components/LayerList.jsx";
import StageManager from "./components/StageManager.jsx";
import LayerRenderer from "./components/LayerRenderer.jsx";
import ActiveLayerEditor from "./components/ActiveLayerEditor.jsx";
import AppToaster from "./components/AppToaster.jsx";
import Elements from "./components/Elements.jsx";
import { effects } from "./shared/effects.js";
import ElementMenuPopover from "./components/ElementMenuPopover.jsx";
import ScriptPanel from "./components/ScriptPanel.jsx";
import ScriptingContext from "./shared/ScriptingContext.js";
import DataTransferManager from "./shared/DataTransferManager.js";
import "./OverlayEditor.css";

class OverlayEditor extends React.Component {

    _undoManager = new UndoManager();
    _scriptingContext = new ScriptingContext({ onUpdated: () => { this.forceUpdate(); } });

    constructor(props) {
        super(props);

        /* props.overlay = {
          name: "Overlay One",
          layers: [],
          script: "",
        }
        */
        // props.onOverlayChanged
        // props.disableBuiltinElements
        // props.elements
        // props.background
        // props.width
        // props.height
        // props.onUpload

        // set defaults for overlay
        let overlay = (this.props.overlay ? { ...this.props.overlay } : {});
        if (!overlay.name) { overlay.name = "New Overlay"; }
        if (!overlay.layers) { overlay.layers = []; }
        if (!overlay.script) { overlay.script = ""; }

        // assemble elements list
        let elements = (this.props.disableBuiltinElements ? {} : { ...Elements.Builtin });
        if (this.props.elements) { elements = { ...elements, ...this.props.elements }; }

        // create our starting undo point
        this._undoManager.createUndoPoint(overlay);

        // register callbacks
        this.registerDispatcherCallbacks();

        this.state = {
            elements,
            overlay,
            scriptPanelIsOpen: (overlay.script.length > 0 ? true : false), // open script panel if we have a script
            isScriptExecuting: false,
            rendererPhase: "static",
            selectedLayerIds: []
        };
    }

    updateOverlay = async (propsOrFn, emitChange) => {
        return new Promise((resolve) => {
            this.setState(ps => {
                let overlay = (typeof propsOrFn === "function" ? propsOrFn({ ...ps.overlay }) : { ...ps.overlay, ...propsOrFn });
                if (!overlay) { return; }
                return { overlay };
            }, () => {
                if (emitChange) {
                    this._undoManager.createUndoPoint(this.state.overlay);
                    if (this.props.onOverlayChanged) { this.props.onOverlayChanged(this.state.overlay); }
                }
                resolve();
            });
        });
    }

    updateLayer = async (id, propsOrFn, emitChange) => {
        this.updateOverlay(overlay => {
            let index = overlay.layers.findIndex(r => r.id == id);
            if (index == -1) { return; }
            let layer = (typeof propsOrFn === "function" ? propsOrFn({ ...overlay.layers[index] }) : { ...overlay.layers[index], ...propsOrFn });
            if (!layer) { return; }
            overlay.layers = [...overlay.layers];
            overlay.layers[index] = layer;
            return overlay;
        }, emitChange);
    }

    onRestoreUndo(redo) {
        let undoData = this._undoManager.restoreUndoPoint(redo);
        this.setState(ps => ({ overlay: undoData.overlay }), () => {
            if (this.props.onOverlayChanged) { this.props.onOverlayChanged(this.state.overlay); }
        });
    }

    registerDispatcherCallbacks() {
        Dispatcher.Register("SELECT_LAYER", (id, multiSelect) => {
            this.setState(prevState => {
                let selectedLayerIds = prevState.selectedLayerIds;
                if (id == null) {
                    selectedLayerIds = [];
                } else if (!multiSelect) {
                    if (selectedLayerIds.length != 1 || selectedLayerIds[0].id != id) {
                        selectedLayerIds = [id];
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

        Dispatcher.Register("CREATE_LAYERS", async (requestedLayers) => {
            console.log({ requestedLayers });
            let parsedLayers = requestedLayers.map(requestedLayer => {
                // get the element for the layer.  if we can't find it, skip
                let element = this.state.elements[requestedLayer.elementName];
                if (!element) { return null; }

                // assemble a config object
                let requestedConfig = requestedLayer.config || {};
                let config = { ...requestedConfig }; // start with the requested config

                // get default config values from the manifest parameters
                for (const parameter of element.manifest.parameters) {
                    if (config[parameter.name]) { continue; }
                    if (!parameter.defaultValue) { continue; }
                    config[parameter.name] = parameter.defaultValue;
                }

                // create the layer with the props requested
                return {
                    elementName: requestedLayer.elementName,
                    label: requestedLayer.label || element.manifest.name,
                    top: requestedLayer.top || 0,
                    left: requestedLayer.left || 0,
                    width: requestedLayer.width || element.manifest.width || 0,
                    height: requestedLayer.height || element.manifest.height || 0,
                    effects: requestedLayer.effects || (element.manifest.defaultEffects ? { ...element.manifest.defaultEffects } : null),
                    assetKey: requestedLayer.assetKey,
                    config: config
                };
            });

            let selectedLayerIds = [];
            await this.updateOverlay(overlay => {
                // find the highest layerid we have and add one
                let layerId = overlay.layers.map(r => r.id).reduce((p, c) => (c > p ? c : p), 1) + 1;
                for (let parsedLayer of parsedLayers) {
                    if (!parsedLayer) { return; } // skip null layers (probably unknown element)

                    // ensure a unique label
                    // chop off the "#NUMBER" if it's there
                    let baseLabel = parsedLayer.label;
                    if (baseLabel.match(/\#\d+$/)) { baseLabel = baseLabel.substr(0, baseLabel.lastIndexOf("#") - 1); }
                    let label = baseLabel;
                    for (let i = 2; overlay.layers.findIndex(r => r.label == label) > -1; i++) {
                        label = baseLabel + " #" + i;
                    }

                    // add the layer with the new id
                    overlay.layers.unshift({ ...parsedLayer, id: layerId, label: label });
                    // append the new id to selected ids
                    selectedLayerIds.push(layerId);
                    // increment the layer id
                    layerId++;
                }
                return overlay;
            }, true);

            // select all of the newly created layers
            this.setState(ps => ({ selectedLayerIds }));
        });

        Dispatcher.Register("UPDATE_LAYER_CONFIG", async (id, newValues, emitChange) => {
            await this.updateLayer(id, layer => {
                for (let [key, value] of Object.entries(newValues)) {
                    if (key == "config") // special case for .config - extend the object instead of replacing it
                        layer.config = Object.assign(layer.config, value);
                    else
                        layer[key] = value;
                }
                return layer;
            }, emitChange);

            /*
            this.setState(prevState => {
              let layers = [...prevState.layers];
              let layerIndex = layers.findIndex(r => r.id == id);
              if (layerIndex > -1) {
                let layer = {...layers[layerIndex]};
                for(let [key, value] of Object.entries(newValues)) {
                  if (key == "config") // special case for .config
                    layer.config = Object.assign(layer.config, value);
                  else
                    layer[key] = value;
                }
                layers[layerIndex] = layer;
              }
              if (commit) { this.onLayersChanged(layers); }
              return { layers };
            });
            */
        });

        Dispatcher.Register("MOVE_LAYER", async (id, index) => {
            await this.updateOverlay(overlay => {
                overlay.layers = [...overlay.layers];
                // find the index we're pulling from
                let sourceIndex = overlay.layers.findIndex(r => r.id == id);
                // pluck the layer from the array
                let layer = overlay.layers.splice(sourceIndex, 1)[0];
                // correct the indexbased on it's position
                if (index > sourceIndex) { index--; }
                // add the layer back in
                overlay.layers.splice(index, 0, layer);
                return overlay;
            }, true);
        });

        Dispatcher.Register("DELETE_LAYERS", async (ids) => {
            await this.updateOverlay(overlay => {
                overlay.layers = [...overlay.layers];
                for (const id of ids) {
                    let sourceIndex = overlay.layers.findIndex(r => r.id == id);
                    overlay.layers.splice(sourceIndex, 1);
                }
                if (overlay.assets) {
                    // count all the references to assets
                    // if any asset is at 0 references, delete it
                    let references = {};
                    for(const key of Object.keys(overlay.assets)) { references[key] = 0; }
                    for(const layer of overlay.layers) {
                        if (layer.assetKey) {
                            references[layer.assetKey]++;
                        }
                    }
                    // prune any assets that have zero references
                    for(const [assetKey, count] of Object.entries(references)) {
                        if (count == 0) {
                            delete overlay.assets[assetKey];
                        }
                    }
                }
                return overlay;
            }, true);
        });

        Dispatcher.Register("COPY_LAYERS", layers => {
            let copyData = {
                objectType: "layers",
                data: layers
            };
            ClipboardHelper.CopyToClipboard(JSON.stringify(copyData));
        });

        Dispatcher.Register("ADD_EFFECT", async (id, effectName) => {
            // ensure the effect is valid
            let effect = effects[effectName];
            if (!effect) { return; }

            // create the effect definition, loading in defaults
            let effectConfig = {};
            for (let parameter of effect.parameters) {
                if (parameter.defaultValue == null) { continue; }
                effectConfig[parameter.name] = parameter.defaultValue;
            }

            await this.updateLayer(id, layer => {
                if (layer.effects && layer.effects[effectName]) { return; } // disallow re-adding an effect.  the UI should prevent this, but lets be safe.
                layer.effects = { ...(layer.effects || []), [effectName]: effectConfig };
                return layer;
            }, true);
        });

        Dispatcher.Register("UPDATE_EFFECT", async (id, effectName, values, emitChange) => {
            await this.updateLayer(id, layer => {
                layer.effects = { ...layer.effects, [effectName]: { ...layer.effects[effectName], ...values } };
                return layer;
            }, emitChange);
        });

        Dispatcher.Register("DELETE_EFFECT", async (id, effectName) => {
            await this.updateLayer(id, layer => {
                layer.effects = { ...layer.effects };
                delete layer.effects[effectName];
                return layer;
            }, true);
        });

        Dispatcher.Register("CREATE_ASSETS", async (assets) => {
            await this.updateOverlay(overlay => {
                overlay.assets = {...(overlay.assets || {}), ...assets};
                return overlay;
            }, false);
        });;
    }

    componentDidMount() {
        // assign global handlers
        window.addEventListener("keydown", this.onWindowKeyDown);
        // disable browser zooming
        window.addEventListener("wheel", this.onWindowWheel);
        document.addEventListener("paste", this.onPaste);

        DataTransferManager.on("upload-started", (file) => {
            Dispatcher.Dispatch("SHOW_TOAST", {
                id: file.name,
                icon: "cloud-upload",
                message: this.renderUploadProgress(file, 0),
                timeout: 0,
                onCancel: () => { if (file.cancel) { file.cancel(); } }
            });
        });

        DataTransferManager.on("upload-progress", (file, loaded) => {
            Dispatcher.Dispatch("SHOW_TOAST", {
                id: file.name,
                icon: "cloud-upload",
                message: this.renderUploadProgress(file, loaded / file.size),
                timeout: 0
            });
        });

        DataTransferManager.on("upload-finished", (file) => {
            Dispatcher.Dispatch("SHOW_TOAST", {
                id: file.name,
                icon: "cloud-upload",
                message: this.renderUploadProgress(file, 1),
                timeout: 500
            });
        });

        DataTransferManager.on("upload-error", (file, error) => {
            Dispatcher.Dispatch("SHOW_TOAST", {
                id: file.name,
                icon: "error",
                intent: "danger",
                message: error,
                timeout: 5000
            });
        });
    }

    renderUploadProgress = (file, progress) => {
        if (progress < 1)
            return <><ProgressBar intent="primary" stripes={true} value={progress} /><div>{file.name}</div></>;

        return <><ProgressBar intent="success" stripes={false} value={progress} /><div>{file.name}</div></>;
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.onWindowKeyDown);
        window.removeEventListener("wheel", this.onWindowWheel);
        document.removeEventListener("paste", this.onPaste);
    }

    onWindowWheel = evt => {
        if (evt.ctrlKey) {
            evt.preventDefault();
            evt.stopPropagation();
        }
    }

    onWindowKeyDown = evt => {

        let ctrlKey = (evt.ctrlKey || evt.metaKey);

        // disable browser zooming (this doesn't work!)
        if (ctrlKey && (evt.key == "+" || evt.key == "-" || evt.key == "0")) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        // pass through input elements
        if (evt.target.tagName == "INPUT" || evt.target.tagName == "SELECT" || evt.target.tagName == "TEXTAREA") { return; }

        // if we're not in a field that has it's own undo, provide undo support
        if (evt.key == "z" && ctrlKey && this._undoManager.canUndo()) { this.onRestoreUndo(false); return; }
        else if (evt.key == "y" && ctrlKey && this._undoManager.canRedo()) { this.onRestoreUndo(true); return; }

        // handle layer-specific keys
        if (this.state.selectedLayerIds.length > 0) { // when multiple layers are selected
            let selectedLayers = this.state.overlay.layers.filter(r => this.state.selectedLayerIds.includes(r.id));

            if (evt.key == "F2") {
                evt.preventDefault();
                Dispatcher.Dispatch("EDIT_LAYER_NAME", selectedLayers[0].id);
            } else if (evt.key == "Delete") {
                evt.preventDefault();
                Dispatcher.Dispatch("DELETE_LAYERS", this.state.selectedLayerIds);
            } else if (evt.key == "c" && ctrlKey) {
                evt.preventDefault();
                Dispatcher.Dispatch("COPY_LAYERS", selectedLayers);
            } else if (evt.key == "c") { // center all
                evt.preventDefault();
                selectedLayers.forEach((layer, index) => {
                    let newValues = { top: (this.props.height - layer.height) / 2, left: (this.props.width - layer.width) / 2 };
                    Dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, (index == selectedLayers.length - 1)); // only commit on the last layer
                });
            } else if (evt.key == "f") {
                evt.preventDefault();
                selectedLayers.forEach((layer, index) => {
                    let newValues = { top: 0, left: 0, height: this.props.height, width: this.props.width };
                    Dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, (index == selectedLayers.length - 1)); // only commit on the last layer
                });
            } else if (evt.key == "[") {
                evt.preventDefault();

                // index and sort layers, ascending
                let indexedLayers = selectedLayers.map(layer => ({
                    index: this.state.overlay.layers.indexOf(layer),
                    layer: layer
                })).sort((a, b) => a.index - b.index);

                // find the bottom-most index
                let bottomMostIndex = indexedLayers.map(layer => layer.index).reduce((max, curr) => Math.max(max, curr), 0);

                // if any layer is already at the bottom, immediately return and do nothing
                if (bottomMostIndex == this.state.overlay.layers.length - 1) { return; }

                // if holding control, move all the way to the bottom
                if (evt.ctrlKey) { bottomMostIndex = this.state.overlay.layers.length - 2; }

                indexedLayers.forEach((indexedLayer, i) => {
                    let newIndex = bottomMostIndex + 2 - i;
                    Dispatcher.Dispatch("MOVE_LAYER", indexedLayers[indexedLayers.length - 1 - i].layer.id, newIndex);
                });

            } else if (evt.key == "]") {
                evt.preventDefault();

                // index and sort layers, ascending
                let indexedLayers = selectedLayers.map(layer => ({
                    index: this.state.overlay.layers.indexOf(layer),
                    layer: layer
                })).sort((a, b) => a.index - b.index);

                // find the bottom-most index
                let topMostIndex = indexedLayers.map(layer => layer.index).reduce((max, curr) => Math.min(max, curr), 10000);

                // if any layer is already at the top, immediately return and do nothing
                if (topMostIndex == 0) { return; }

                // if holding control, move all the way to the top
                if (evt.ctrlKey) { topMostIndex = 1; }

                indexedLayers.forEach((indexedLayer, i) => {
                    let newIndex = topMostIndex - 1 + i;
                    Dispatcher.Dispatch("MOVE_LAYER", indexedLayers[i].layer.id, newIndex);
                });
            } else if (evt.key == "+") {
                evt.preventDefault();
                let magnitude = (evt.shiftKey ? 1.2 : 1.1);
                selectedLayers.forEach((layer, index) => {
                    let newValues = { height: layer.height * magnitude, width: layer.width * magnitude };
                    Dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, (index == selectedLayers.length - 1));
                });
            } else if (evt.key == "-") {
                evt.preventDefault();
                let magnitude = (evt.shiftKey ? 1.2 : 1.1);
                selectedLayers.forEach((layer, index) => {
                    let newValues = { height: layer.height / magnitude, width: layer.width / magnitude };
                    Dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, (index == selectedLayers.length - 1));
                });
            } else if (evt.key == "ArrowRight") {
                evt.preventDefault();
                selectedLayers.forEach((layer, index) => {
                    let newValues = (ctrlKey ? { left: 1920 - layer.width } : { left: layer.left + (evt.shiftKey ? 1 : 5) });
                    Dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, (index == selectedLayers.length - 1));
                });
            } else if (evt.key == "ArrowLeft") {
                evt.preventDefault();
                selectedLayers.forEach((layer, index) => {
                    let newValues = (ctrlKey ? { left: 0 } : { left: layer.left - (evt.shiftKey ? 1 : 5) });
                    Dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, (index == selectedLayers.length - 1));
                });
            } else if (evt.key == "ArrowDown") {
                evt.preventDefault();
                selectedLayers.forEach((layer, index) => {
                    let newValues = (ctrlKey ? { top: 1080 - layer.height } : { top: layer.top + (evt.shiftKey ? 1 : 5) });
                    Dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, (index == selectedLayers.length - 1));
                });
            } else if (evt.key == "ArrowUp") {
                evt.preventDefault();
                selectedLayers.forEach((layer, index) => {
                    let newValues = (ctrlKey ? { top: 0 } : { top: layer.top - (evt.shiftKey ? 1 : 5) });
                    Dispatcher.Dispatch("UPDATE_LAYER_CONFIG", layer.id, newValues, (index == selectedLayers.length - 1));
                });
            }
        }

        if (evt.key == "Tab") {
            let newSelectedLayerId = null;

            if (this.state.selectedLayerIds.length == 0) {
                if (this.state.overlay.layers.length > 0) {
                    newSelectedLayerId = this.state.layers[0].id;
                }
            } else {
                let firstSelectedIndex = this.state.overlay.layers.findIndex(r => r.id == this.state.selectedLayerIds[0]);
                let newIndex = (firstSelectedIndex + this.state.overlay.layers.length + (evt.shiftKey ? -1 : 1)) % this.state.overlay.layers.length;
                newSelectedLayerId = this.state.overlay.layers[newIndex].id;
            }

            if (newSelectedLayerId != null) {
                evt.preventDefault();
                Dispatcher.Dispatch("SELECT_LAYER", newSelectedLayerId, false);
            }
        }
    }

    onPaste = evt => {
        // pass through input elements
        if (evt.target.tagName == "INPUT" || evt.target.tagName == "SELECT" || evt.target.tagName == "TEXTAREA") { return; }
        evt.preventDefault();

        this.handleDataTransfer(evt.clipboardData);
    }

    onDragOver = evt => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "copy";
    }

    onDrop = evt => {
        evt.preventDefault();
        this.handleDataTransfer(evt.dataTransfer, this.props.onUpload);
    }

    handleDataTransfer = async (dataTransfer) => {
        let result = await DataTransferManager.handleDataTransfer(dataTransfer, this.props.onUpload);

        if (result.assets)
            Dispatcher.Dispatch("CREATE_ASSETS", result.assets);

        if (result.layers)
            Dispatcher.Dispatch("CREATE_LAYERS", result.layers);
    }

    onNameChanged = (evt) => {
        let name = evt.target.value;
        this.updateOverlay({ name }, true);
    }

    onSetRendererPhase = (phase) => {
        // toggle renderer phase
        if (this.state.rendererPhase == phase) {
            this.setState({ rendererPhase: "static" }, () => {
                requestAnimationFrame(() => {
                    this.setState({ rendererPhase: phase });
                });
            });
        } else {
            this.setState({ rendererPhase: phase });
        }
    }

    onScriptPanelToggle = () => {
        this.setState(ps => ({ scriptPanelIsOpen: !ps.scriptPanelIsOpen }));
    }

    onScriptChanged = (script) => {
        this.updateOverlay({ script }, true);
    }

    onScriptExecutingChanged = (isScriptExecuting) => {
        if (!isScriptExecuting) {
            this._scriptingContext.reset(); // clear scripting context when no longer executing
            // reset() doesn't trigger an onUpdated, so force update to bring back the old layer context
            this.forceUpdate();
        }
        else
            this._scriptingContext.execute(this.state.overlay);

        this.setState({ isScriptExecuting });
    }

    render() {

        let rendererLayers = (this._scriptingContext.hasModifiedLayers ? this._scriptingContext.layers : this.state.overlay.layers);

        return (
            <div className="app-wrapper" onDragOver={this.onDragOver} onDrop={this.onDrop}>
                <AppToaster />
                <div className="sidepanel-wrapper" style={{ width: this.state.sidepanelWidth + "px" }}>
                    <div className="layer-list-wrapper">
                        <div className="layer-list">
                            <div className="layer-list-header">
                                <div className="left">
                                    <InputGroup value={this.state.overlay.name} onChange={this.onNameChanged} />
                                </div>
                                <div className="right">
                                    <Button icon="manually-entered-data" title="Toggle Script Panel" onClick={this.onScriptPanelToggle} active={this.state.scriptPanelIsOpen} />
                                </div>
                                <div className="right">
                                    <ElementMenuPopover elements={this.state.elements}>
                                        <Button icon="plus" intent="primary" />
                                    </ElementMenuPopover>
                                </div>
                            </div>
                            <LayerList
                                layers={this.state.overlay.layers}
                                elements={this.state.elements}
                                selectedLayerIds={this.state.selectedLayerIds} />
                        </div>
                    </div>
                </div>
                <ScriptPanel
                    isOpen={this.state.scriptPanelIsOpen}
                    layers={this.state.overlay.layers}
                    scriptingContext={this._scriptingContext}
                    script={this.props.overlay.script}
                    onScriptChanged={this.onScriptChanged}
                    onExecutingChanged={this.onScriptExecutingChanged} />
                <div className="rightside-wrapper">
                    <div className="top-toolbar">
                        <ActiveLayerEditor
                            layers={this.state.overlay.layers}
                            elements={this.state.elements}
                            selectedLayerIds={this.state.selectedLayerIds}
                            rendererPhase={this.state.rendererPhase}
                            onSetRendererPhase={this.onSetRendererPhase} />
                    </div>
                    <div className="stage-wrapper">
                        <StageManager
                            stageWidth={this.props.width}
                            stageHeight={this.props.height}
                            layers={rendererLayers}
                            elements={this.state.elements}
                            selectedLayerIds={this.state.selectedLayerIds}
                            backgroundImages={this.props.backgroundImages}>
                            <LayerRenderer
                                elements={this.state.elements}
                                elementProps={{ assets: this.state.overlay.assets }}
                                layers={rendererLayers}
                                zIndex={1000}
                                hidden={this.props.hidden}
                                forcePhase={this.state.rendererPhase}
                                scriptingContext={this._scriptingContext} />
                        </StageManager>
                    </div>
                </div>
            </div>
        );
    }
}

export default OverlayEditor;