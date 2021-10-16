import React, { useEffect, useRef, useContext, useState, useMemo } from "react";
import { getContentTypeHandler } from "../contentTypeHandlers";
import { createStore } from "./reduxLite.js";
import { maxValue, copyToClipboard } from "./utilities.js";
import stageTools from "../stageTools";
import Panels from "../panels";
import { Transitions } from "./Transitions.js";
import initialScriptContent from "./initialScriptContent.js";
import BrowserRenderer from "../browser-renderer/BrowserRenderer.js";

const OverlayEditorContext = React.createContext();

// #region helper methods
function updateOverlay(state, getNewPropsFn) {
    if (!getNewPropsFn) { return null; }
    const newProps = getNewPropsFn(state.overlay);
    if (!newProps) { return null; }
    const overlay = {...state.overlay, ...newProps };

    if (state.onOverlayChanged)
        state.onOverlayChanged(overlay, state.overlay);

    return { overlay };
}

function updateLayer(state, id, getNewPropsFn) {
    return updateOverlay(state, (overlay) => {
        const layers = overlay.layers.map(layer => {
            if (layer.id != id) { return layer; }
            const newProps = getNewPropsFn(layer);
            if (!newProps) { return layer; }
            return { ...layer, ...newProps };
        });
        return { layers };
    });
}

function updateLayers(state, ids, getNewPropsFn) {
    return updateOverlay(state, (overlay) => {
        const layers = overlay.layers.map(layer => {
            // return the original layer for anything not in our id list
            if (!ids.includes(layer.id)) { return layer; }

            const newProps = getNewPropsFn(layer);
            if (!newProps) { return layer; }

            return { ...layer, ...newProps };
        });
        return { layers };
    });
}

function moveLayer(layers, id, newIndex) {
    let sourceIndex = layers.findIndex(r => r.id == id);
    let layer = layers.splice(sourceIndex, 1)[0];
    if (newIndex > sourceIndex) { newIndex--; }
    layers.splice(newIndex, 0, layer);
}

async function fetchContentType(url) {
    if (!url.startsWith("http"))
        return "text/plain";

    // try to get the content type from the extension
    if (/\.png/.test(url)) { return "image/png"; }
    else if (/\.jpe?g$/i.test(url)) { return "image/jpeg"; }
    else if (/\.gif$/i.test(url)) { return "image/gif"; }
    else if (/\.mp4$/i.test(url)) { return "video/mp4"; }
    else if (/\.mov$/i.test(url)) { return "video/mov"; }
    else if (/\.mkv$/i.test(url)) { return "video/mkv"; }
    else if (/\.3gp$/i.test(url)) { return "video/3gpp"; }
    else if (/\.ogv$/i.test(url)) { return "video/ogv"; }
    else if (/\.mp3$/i.test(url)) { return "audio/mpeg"; }
    else if (/\.wav$/i.test(url)) { return "audio/wav"; }
    else if (/\.ogg$/i.test(url)) { return "audio/ogg"; }
    else if (/\.js$/i.test(url)) { return "text/javascript"; }

    // otherwise try to fetch the content type from the server
    // chances are this will fail because of CORS.  if it does NBD, return an iframe
    try
    {
        let response = await fetch(url, { method: "HEAD", cache: "no-cache" });
        return response.headers.get("Content-Type");
    } catch (ex) {
        return "text/html";
    }
}

const defaultRenderer = new BrowserRenderer({ executeScriptsOnLoad: false });

const Reducers = {
    SetOptions: (ps, { width, height, onOverlayChanged, onUpload, renderer, elementEditors }) => {
        return {
            width: width || 1920,
            height: height || 1080,
            renderer: renderer || defaultRenderer,
            onOverlayChanged: onOverlayChanged,
            onUpload: onUpload,
            elementEditors: elementEditors
        };
    },
    SetOverlay: (ps, overlay) => {
        // this line is very important.  it keeps us from looping infinitely when the overlay is changed externally
        if (ps.overlay == overlay) { return; }
        return { overlay };
    },
    SetOverlayDomElement: (ps, overlayDomElement) => {
        return { overlayDomElement };
    },
    SetStageAutoFitZoom: (ps, autoFitZoom) => {
        return {
            stageZoomSelection: { ...ps.stageZoomSelection, autoFitZoom },
            stageTransform: {
                ...ps.stageTransform,
                zoom: (ps.stageZoomSelection.isAuto ? autoFitZoom : ps.stageTransform.zoom)
            }
        };
    },
    SetStageZoomSelection: (ps, stageZoomSelection) => {
        return {
            stageZoomSelection,
            stageTransform: {
                ...ps.stageTransform,
                zoom: (stageZoomSelection.isAuto ? stageZoomSelection.autoFitZoom : stageZoomSelection.zoom)
            }
        };
    },
    ResetStageZoom: (ps) => {
        return {
            stageZoomSelection: {...ps.stageZoomSelection, isAuto: true},
            stageTransform: { ...ps.stageTransform, zoom: ps.stageZoomSelection.autoFitZoom, panning: [0,0] }
        };
    },
    StepZoom: (ps, steps) => {
        const zoom = (steps < 0 ? ps.stageTransform.zoom / (1 + (-steps * 0.1)) : ps.stageTransform.zoom * (1 + (steps * 0.1)))
        return {
            stageZoomSelection: { ...ps.stageZoomSelection, zoom: zoom, isAuto: false },
            stageTransform: { ...ps.stageTransform, zoom: zoom }
        };
    },
    SetStageTransform: (ps, stageTransform) => {
        return { stageTransform };
    },
    SavePreferences: (ps, preferences) => {
        return { preferences: { ...ps.preferences, ...preferences } };
    },
    ToggleEditor: (ps, { type, params }) => {
        let newState = {};
        const editorType = Panels[type];
        const key = editorType.key(params);

        const index = ps.editors.findIndex(r => r.key == key);
        if (index == -1) {
            newState.editors = [...ps.editors, {key, type, params}];
            newState.selectedEditorTab = key;
        }
        else {
            newState.editors = [...ps.editors]
            newState.editors.splice(index, 1);

            if (ps.selectedEditorTab == key) {
                if (newState.editors.length > index)
                    ps.selectedEditorTab = newState.editors[index].key;
                else if (index > 0)
                    ps.selectedEditorTab = newState.editors[index - 1].key;
                else
                    ps.selectedEditorTab = null;
            }
        }

        return newState;
    },
    OpenEditor: (ps, { type, params }) => {
        let newState = {};
        const editorType = Panels[type];
        const key = editorType.key(params);
        // don't open if already open
        const index = ps.editors.findIndex(r => r.key == key);
        if (index == -1)
            newState.editors = [...ps.editors, { key, type, params }];
        newState.selectedEditorTab = key;
        newState.preferences = {...ps.preferences, bottomPanelMinimized: false };
        return newState;
    },
    CloseEditor: (ps, key) => {
        const index = ps.editors.findIndex(r => r.key == key);
        if (index == -1) { return; }

        let newState = {};
        newState.editors = [...ps.editors]
        newState.editors.splice(index, 1);

        // if the selected editor was closed, select the one at it's old index if possible
        // if not, then select the one in the prior index, if possible
        // if not, select nothing
        if (ps.selectedEditorTab == key) {
            if (newState.editors.length > index)
                ps.selectedEditorTab = newState.editors[index].key;
            else if (index > 0)
                ps.selectedEditorTab = newState.editors[index - 1].key;
            else
                ps.selectedEditorTab = null;
        }

        return newState;
    },
    SelectEditor: (ps, selectedEditorTab) => {
        return {
            selectedEditorTab,
            preferences: {...ps.preferences, bottomPanelMinimized: false }
        };
    },
    SelectListTab: (ps, selectedListTab) => {
        return { selectedListTab };
    },
    SelectPropertyTab: (ps, selectedPropertyTab) => {
        return { selectedPropertyTab };
    },

    // assets
    CreateAsset: (ps, { asset, onCreated }) => {
        // asset = { name, src, inline }
        return updateOverlay(ps, overlay => {
            // generate an asset key from the name
            let assetKey = asset.name;
            // ensure the key is unique
            if (overlay.assets)
                for(let i = 1; overlay.assets[assetKey] != null; i++)
                    assetKey = asset.name + "-" + i++;

            // call onCreated to inform the caller what the new asset will be called
            onCreated(assetKey);
            
            // and update assets finally
            const assets = {...overlay.assets, [assetKey]: asset };
            return { assets };
        });
    },
    DeleteAsset: (ps, assetKey) => {
        return updateOverlay(ps, overlay => {
            let assets = {...overlay.assets};
            delete assets[assetKey];
            return { assets };
        });
    },
    ReorderAsset: (ps, { assetKey, newIndex }) => {
        if (!ps.overlay.assets) { return; }
        return updateOverlay(ps, (overlay) => {
            const asset = overlay.assets[assetKey];
            const assetEntries = Object.entries(overlay.assets);
            const assets = assetEntries.reduce((assets, [iteratorAssetKey, iteratorAsset], index) => {
                if (index == newIndex)
                    assets[assetKey] = asset;

                if (assetKey != iteratorAssetKey)
                    assets[iteratorAssetKey] = iteratorAsset;

                if (index == assetEntries.length - 1 && newIndex > index)
                    assets[assetKey] = asset;

                return assets;
            }, {});
            return { assets };
        });
    },

    // scripts
    CreateScript: (ps, name) => {
        return (dispatch) => {

            // check if we need to create a script at all - specially named scripts are singletons
            const shouldCreate = !ps.overlay.scripts || !(name && ps.overlay.scripts[name]);

            if (shouldCreate) {
                if (!name) { name = "script.js"; }

                // generate a unique name if one wasn't provided
                if (ps.overlay.scripts) {
                    let uniqueName = name;
                    for(let i = 1; ps.overlay.scripts[uniqueName] != null; i++)
                        uniqueName = `(${i}) ${name}`;

                    name = uniqueName;
                }

                // if this file matches one of the initialScriptContent strings, use it.  otherwise, use ""
                const content = initialScriptContent[name] || "";
                dispatch("CreateScriptInternal", { name, content });
            }

            dispatch("SelectListTab", "scripts");

            // now open the script in the editor even if we didn't create it
            dispatch("OpenEditor", { type: "script", params: { scriptKey: name } });
        };
    },
    CreateScriptInternal: (ps, { name, content }) => {
        return updateOverlay(ps, (overlay) => {
            const scripts = {...overlay.scripts, [name]: content };
            return { scripts };
        });
    },
    DeleteScript: (ps, scriptKey) => {
        let newState = updateOverlay(ps, (overlay) => {
            const scripts = {...overlay.scripts};
            delete scripts[scriptKey];
            return { scripts };
        });

        // if the script is open in an editor, close it
        //const editorKey = Editors.script.key({ scriptKey });
        const index = ps.editors.findIndex(r => r.type == "script" && r.params.scriptKey == scriptKey);
        if (index > -1)
            newState.editors = ps.editors.filter((r, i) => i != index);

        return newState;
    },
    UpdateScript: (ps, {scriptKey, content}) => {
        if (!ps.overlay.scripts) { return; }

        return updateOverlay(ps, (overlay) => {
            const scripts = {...overlay.scripts, [scriptKey]: content };
            return { scripts };
        });
    },
    ReorderScript: (ps, { scriptKey, newIndex }) => {
        if (!ps.overlay.scripts) { return; }
        return updateOverlay(ps, (overlay) => {
            const scriptValue = overlay.scripts[scriptKey];
            const scriptEntries = Object.entries(overlay.scripts);
            const scripts = scriptEntries.reduce((scripts, [iteratorScriptKey, iteratorScriptValue], index) => {

                if (index == newIndex)
                    scripts[scriptKey] = scriptValue;

                if (scriptKey != iteratorScriptKey)
                    scripts[iteratorScriptKey] = iteratorScriptValue;

                if (index == scriptEntries.length - 1 && newIndex > index)
                    scripts[scriptKey] = scriptValue;

                return scripts;
            }, {});
            return { scripts };
        });
    },
    UpdateScriptKey: (ps, { scriptKey, newScriptKey }) => {
        if (!ps.overlay.scripts)
            return;

        // if the new key didn't change, do nothing
        if (scriptKey == newScriptKey)
            return;

        // if we already have a script with the new name, show a toast but don't save
        if (ps.overlay.scripts[newScriptKey]) {
            return (dispatch) => {
                dispatch("ShowToast", { id: Math.random(), icon: "error", intent: "danger", message: "The specified script name is already in use.", timeout: 5000 });
            };
        }

        const newState = updateOverlay(ps, (overlay) => {
            const scripts = Object.entries(overlay.scripts).reduce((scripts, [iteratorScriptKey, iteratorScriptValue]) => {
                if (iteratorScriptKey == scriptKey)
                    scripts[newScriptKey] = iteratorScriptValue;
                else
                    scripts[iteratorScriptKey] = iteratorScriptValue;
                return scripts;
            }, {});
            return { scripts };
        });

        // if there are any open editors with the old name, update them
        const editorIndex = ps.editors.findIndex(r => r.key == scriptKey && r.type == "script")
        if (editorIndex > -1) {
            newState.editors = [...ps.editors];
            const updatedEditor = {...newState.editors[editorIndex]};
            updatedEditor.key = newScriptKey;
            updatedEditor.params = {...updatedEditor.params, scriptKey: newScriptKey};
            newState.editors[editorIndex] = updatedEditor;
        }

        if (ps.selectedEditorTab == scriptKey)
            newState.selectedEditorTab = newScriptKey;

        return newState;
    },
    ExecuteScript: (ps) => {
        if (ps.isExecutingScript)
            return { isExecutingScript: false };
        else
            return { isExecutingScript: true };
    },
    SetScriptState: (ps, scriptState) => {
        // this seems slow, and inefficient.  maybe fix later?

        return { scriptState: {...scriptState} };
    },
    UpdateScriptSettings: (ps, partialSettings) => {
        return updateOverlay(ps, overlay => {
            const settings = {...overlay.settings, ...partialSettings};
            return { settings };
        });
    },
    SendRendererCommand: (ps, { command, commandArg, layerid }) => {
        ps.renderer.sendCommand(command, commandArg, ps.overlay.id, layerid);
    },

    // layers
    CreateLayers: (ps, requestedLayers) => {
        // find the max layer id
        let selectedLayerIds = [];
        let newState = updateOverlay(ps, (overlay) => {
            let layers = (overlay.layers ? [...overlay.layers] : []);
            let maxLayerId = layers.map(r => r.id).reduce(maxValue, 1);
    
            for(const requestedLayer of requestedLayers) {
                // get the element def for the layer.  if we can't find it, skip
                let elementDef = ps.renderer.elements[requestedLayer.elementName];

                if (!elementDef) { 
                    console.log("Skipping layer - could not find elementDef for " + requestedLayer.elementName);
                    continue;
                }

                // merge together a bunch of stuff to create the new layer:
                // id from ++maxLayerId
                // the elementDef's default config
                // the requested config from requestedLayer
                const layer = {
                    ...elementDef.defaults, // the elementDef's default config properties
                    ...requestedLayer, // will contain elementName, but can also override anything
                    id: ++maxLayerId // set the layer's id
                };
    
                // ensure a unique label
                // chop off the "#NUMBER" if it's there
                let baseLabel = (requestedLayer.label || elementDef.name);

                // if the baseLabel has any numbers on the end, chop them off
                if (baseLabel.match(/\#\d+$/)) { baseLabel = baseLabel.substr(0, baseLabel.lastIndexOf("#") - 1); }

                // iterate to create a unique label
                let uniqueLabel = baseLabel;
                for (let i = 2; layers.findIndex(r => r.label == uniqueLabel) > -1; i++)
                    uniqueLabel = baseLabel + " #" + i;
                layer.label = uniqueLabel;
    
                // add the layer with the new id
                layers.push(layer);
    
                // append the new id to selected ids
                selectedLayerIds.push(layer.id);
            }

            return { layers };
        }, true);

        // select the newly created layers
        newState.selectedLayerIds = selectedLayerIds;
        // select the layers list
        newState.selectedListTab = "layers";
        // and force the property tab to show the element config
        newState.selectedPropertyTab = "element";

        return newState;
    },
    SelectLayer: (ps, { id, append, selectBetween }) => {
        // optimization for deselecting when nothing is selected
        if (id == null && ps.selectedLayerIds.length == 0) { return; }

        let selectedLayerIds;

        if (!id) {
            selectedLayerIds = [];
        } else if (!append && !selectBetween) {
            selectedLayerIds = [id];
        } else if (!selectBetween) {
            // append selection logic
            selectedLayerIds = [...ps.selectedLayerIds];

            // remove if already selected, otherwise, append
            if (selectedLayerIds.includes(id))
                selectedLayerIds = selectedLayerIds.filter(r => r != id);
            else
                selectedLayerIds.push(id);
        } else {
            // select between logic
            if (ps.selectedLayerIds.length == 0) {
                // if no layer is already selected, select the target
                selectedLayerIds = [id];
            } else {
                // select all layers between the first in the list and the id
                let fromIndex = ps.overlay.layers.findIndex(r => r.id == ps.selectedLayerIds[0]);
                let toIndex = ps.overlay.layers.findIndex(r => r.id == id);

                // if the indexes are inverted, swap
                if (fromIndex > toIndex) {
                    const swap = toIndex;
                    toIndex = fromIndex;
                    fromIndex = swap;
                }

                selectedLayerIds = [];
                for(let i = fromIndex; i <= toIndex; i++) {
                    const layer = ps.overlay.layers[i];
                    selectedLayerIds.push(layer.id);
                }
            }
        }

        return {
            selectedLayerIds
        };
    },
    SelectLayers: (ps, selectedLayerIds) => {
        return {
            selectedLayerIds
        };
    },
    UpdateLayers: (ps, { layers }) => {
        return updateOverlay(ps, overlay => {
            let overlayLayers = [...overlay.layers];
            for(const layer of layers) {
                const index = overlayLayers.findIndex(r => r.id == layer.id);
                if (index == -1) { continue; }

                overlayLayers[index] = { ...overlayLayers[index], ...layer };
            }
            return { layers: overlayLayers };
        });
    },
    DeleteLayers: (ps, ids) => {
        let newState = updateOverlay(ps, overlay => {
            let layers = overlay.layers.filter(r => !ids.includes(r.id));
            return { layers };
        }, true);

        // remove the deleted ids from the selected list
        newState.selectedLayerIds = ps.selectedLayerIds.filter(r => !ids.includes(r));

        return newState;
    },
    ReorderLayer: (ps, { id, newIndex }) => {
        return updateOverlay(ps, overlay => {
            let layers = [...overlay.layers];
            moveLayer(layers, id, newIndex);
            return { layers };
        }, true);
    },
    DeleteSelection: (ps) => {
        if (ps.selectedLayerIds.length == 0) { return; }
        let newState = updateOverlay(ps, overlay => {
            const layers = overlay.layers.filter(r => !ps.selectedLayerIds.includes(r.id));
            return { layers };
        }, true);
        // update selection - (deselect all layers)
        newState.selectedLayerIds = [];
        return newState;
    },
    CopySelectedLayersToClipboard: (ps) => {
        // grab selected layer data
        if (ps.selectedLayerIds.length == 0 ) { return; }
        const selectedLayers = ps.overlay.layers.filter(r => ps.selectedLayerIds.includes(r.id));
        copyToClipboard(JSON.stringify({ objectType: "layers", data: selectedLayers }));
    },
    CenterSelectedLayers: (ps, { rects, boundingBox }) => {
        if (rects.length == 0) { return; }

        // calculate the difference to the canvas center
        // (canvas center) - (selection center)
        const diffX = (ps.width / 2) - (boundingBox.left + (boundingBox.width / 2));
        const diffY = (ps.height / 2) - (boundingBox.top + (boundingBox.height / 2));

        return updateLayers(ps, rects.map(r => r.layerid), (layer) => {
            const selectedRect = rects.find(r => r.layerid == layer.id);
            if (!selectedRect) { return; }
            return {
                top: selectedRect.top + diffY,
                left: selectedRect.left + diffX,
                height: selectedRect.height,
                width: selectedRect.width
            };
        }, true, true);
    },
    FullscreenSelectedLayers: (ps, { rects, boundingBox }) => {
        if (rects.length == 0) { return; }
        
        // calculate the difference to the canvas center
        // (canvas center) - (bounding box center)
        const diffX = -boundingBox.left;
        const diffY = -boundingBox.top;
        const scaleX = ps.width / boundingBox.width;
        const scaleY = ps.height / boundingBox.height;

        return updateLayers(ps, rects.map(r => r.layerid), (layer) => {
            const selectedRect = rects.find(r => r.layerid == layer.id);
            if (!selectedRect) { return; }
            return {
                top: ((selectedRect.top + diffY) * scaleY),
                left: ((selectedRect.left + diffX) * scaleX),
                width: (selectedRect.width * scaleX),
                height: (selectedRect.height * scaleY)
            };
        });
    },
    ResetSelectedLayers: (ps) => {
        if (ps.selectedLayerIds.length == 0) { return; }
        
        return async (dispatch) => {
            const dimensionData = await Promise.all(ps.selectedLayerIds.map(layerId => {
                const layer = ps.overlay.layers.find(r => r.id == layerId);
                const elementDef = ps.renderer.elements[layer.elementName];

                // elementDefs that don't have a getDimensions method cannot be reset
                if (!elementDef.getNaturalDimensions)
                    return Promise.resolve({});

                return elementDef.getNaturalDimensions(layer.config, ps.overlay.assets).then(dimensions => ({ id: layer.id, ...dimensions }));                    
            }));
            dispatch("ResetSelectedLayers_Complete", dimensionData);
        };
    },
    ResetSelectedLayers_Complete: (ps, layerDimensions) => {
        return updateLayers(ps, layerDimensions.map(r => r.id), (layer) => {
            const layerDimension = layerDimensions.find(r => r.id == layer.id);
            if (!layerDimension) { return; }
            return {
                top: 0,
                left: 0,
                width: layerDimension.width,
                height: layerDimension.height
            };
        }, true, true);
    },
    RaiseSelectedLayers: (ps, ctrlKey) => {
        if (ps.selectedLayerIds.length == 0) { return; }

        // pull layer and index from selected layer ids
        let indexedLayers = [];
        ps.overlay.layers.forEach((layer, index) => {
            if (!ps.selectedLayerIds.includes(layer.id)) { return; }
            indexedLayers.push({ index, layer });
        });

        // no need to sort since we add these in indexed order

        // find the top-most index
        let topMostIndex = indexedLayers.map(layer => layer.index).reduce((max, curr) => Math.min(max, curr), 10000);

        // if any layer is already at the top, immediately return and do nothing
        if (topMostIndex == 0) { return; }

        // if holding control, move all the way to the top
        if (ctrlKey) { topMostIndex = 1; }

        return updateOverlay(ps, overlay => {
            let layers = [...overlay.layers];
            indexedLayers.forEach((indexedLayer, i) => {
                const newIndex = topMostIndex - 1 + i;
                moveLayer(layers, indexedLayers[i].layer.id, newIndex);
            });
            return { layers };
        }, true);
    },
    LowerSelectedLayers: (ps, ctrlKey) => {
        if (ps.selectedLayerIds.length == 0) { return; }
        
        // pull layer and index from selected layer ids
        // unshift to add the smallest indexes at the end (reversed)
        let indexedLayers = [];
        ps.overlay.layers.forEach((layer, index) => {
            if (!ps.selectedLayerIds.includes(layer.id)) { return; }
            indexedLayers.push({ index, layer });
        });

        // find the bottom-most index
        let bottomMostIndex = indexedLayers.map(layer => layer.index).reduce((max, curr) => Math.max(max, curr), 0);

        // if any layer is already at the bottom, immediately return and do nothing
        if (bottomMostIndex == ps.overlay.layers.length - 1) { return; }

        // if holding control, move all the way to the bottom
        if (ctrlKey) { bottomMostIndex = ps.overlay.layers.length - 2; }

        return updateOverlay(ps, overlay => {
            let layers = [...overlay.layers];
            indexedLayers.forEach((indexedLayer, i) => {
                const newIndex = bottomMostIndex + 2 - i;
                moveLayer(layers, indexedLayers[i].layer.id, newIndex);
            });
            return { layers };
        }, true);
    },
    ScaleSelectedLayers: (ps, { rects, boundingBox, direction, precise }) => {
        if (rects.length == 0) { return; }

        let magnitude = (precise ? 1.1 : 1.2);
        if (direction == "down")
            magnitude = 1 / magnitude;

        return updateLayers(ps, rects.map(r => r.layerid), (layer) => {
            const selectedRect = rects.find(r => r.layerid == layer.id);
            if (!selectedRect) { return; }
            const topDelta = (selectedRect.top - boundingBox.top);
            const leftDelta = (selectedRect.left - boundingBox.left);
            return {
                top: (selectedRect.top + (topDelta * (magnitude - 1))),
                left: (selectedRect.left + (leftDelta * (magnitude - 1))),
                width: (selectedRect.width * magnitude),
                height: (selectedRect.height * magnitude)
            };
        }, true, true);
    },
    NudgeSelectedLayers: (ps, { rects, boundingBox, direction, precise, toEdge }) => {
        if (rects.length == 0) { return; }

        const magnitude = (precise ? 1 : 5);
        return updateLayers(ps, rects.map(r => r.layerid), (layer) => {
            const selectedRect = rects.find(r => r.layerid == layer.id);
            if (!selectedRect) { return; }
            switch (direction) {
                case "left":
                    return { left: (toEdge ? selectedRect.left - boundingBox.left : selectedRect.left - magnitude) };
                case "right":
                    return { left: (toEdge ? selectedRect.left + (ps.width - boundingBox.right) : selectedRect.left + magnitude) };
                case "up":
                    return { top: (toEdge ? selectedRect.top - boundingBox.top : selectedRect.top - magnitude) };
                case "down":
                    return { top: (toEdge ? selectedRect.top + (ps.height - boundingBox.bottom) : selectedRect.top + magnitude) };
                default:
                    break;
            }
        }, true, true);
    },
    UpdateLayerConfig: (ps, { id, config }) => {
        return updateLayer(ps, id, (layer) => {
            return { config: {...layer.config, ...config }};
        });
    },
    UpdateSelectedLayersProps: (ps, getPropsFn) => {
        if (ps.selectedLayerIds.length == 0) { return; }
        return updateLayers(ps, ps.selectedLayerIds, getPropsFn);
    },
    UpdateSelectedLayersEffect: (ps, { effectName, config }) => {
        if (ps.selectedLayerIds.length == 0) { return; }
        return updateLayers(ps, ps.selectedLayerIds, (layer) => {
            if (!layer.effects) { return; }
            if (!layer.effects[effectName]) { return; }
            let effects = {...layer.effects};
            if (!config)
                delete effects[effectName];
            else
                effects[effectName] = { ...effects[effectName], ...config }
            return { effects };
        });
    },
    SelectNextLayer: (ps, reverse) => {
        let selectedLayerIds = [];
        
        if (ps.selectedLayerIds.length == 0) {
            if (ps.overlay.layers.length > 0)
                selectedLayerIds = [ ps.overlay.layers[0].id ];
        } else {
            const firstSelectedIndex = ps.overlay.layers.findIndex(r => r.id == ps.selectedLayerIds[0]);
            const newIndex = (firstSelectedIndex + ps.overlay.layers.length + (reverse ? -1 : 1)) % ps.overlay.layers.length;
            selectedLayerIds = [ ps.overlay.layers[newIndex].id ];
        }

        return {
            selectedLayerIds
        };
    },
    SelectAllLayers: (ps) => {
        const selectedLayerIds = ps.overlay.layers.map(r => r.id);
        return { selectedLayerIds };
    },

    /* transitions */
    AddTransition: (ps, transitionName) => {
        const transition = Transitions[transitionName];
        return updateLayers(ps, ps.selectedLayerIds, (layer) => {

            // skip layers that already have this transition
            if (layer.transitions && layer.transitions[transitionName])
                return;

            const transitions = {
                ...layer.transitions,
                [transitionName]: {
                    delay: 0,
                    duration: 500,
                    easing: "linear",
                    ...transition.initialConfig
                }
            };
            return { transitions };
        });
    },
    DeleteTransition: (ps, transitionName) => {
        return updateLayers(ps, ps.selectedLayerIds, (layer) => {

            // skip layers that don't have this transition
            if (!layer.transitions || !layer.transitions[transitionName])
                return;

            let transitions = {...layer.transitions};
            delete transitions[transitionName];
            return { transitions };
        });
    },
    UpdateTransition: (ps, { transitionName, transitionConfig }) => {
        const transition = Transitions[transitionName];
        return updateLayers(ps, ps.selectedLayerIds, (layer) => {
            let transitions = {...layer.transitions};

            // if layer doesn't have this transition, add it with default values
            if (!transitions[transitionName]) {
                transitions[transitionName] = {
                    delay: 0,
                    duration: 500,
                    easing: "linear",
                    ...transition.initialConfig
                };
            }
            else {
                let updatedTransition = { ...transitions[transitionName] };
                for(const [key, val] of Object.entries(transitionConfig)) {
                    if (val == "DELETE")
                        delete updatedTransition[key];
                    else
                        updatedTransition[key] = val;
                }
                transitions[transitionName] = updatedTransition;
            }
            return { transitions };
        });
    },

    // data import/export & file uploads
    HandlePaste: (ps, items) => {
        return async (dispatch) => {
            // items is dataTransfer.items from an onPaste event

            const onComplete = (layers) => {
                dispatch("CreateLayers", layers);
            };

            const onError = (message) => {
                dispatch("ShowToast", { id: Math.random(), icon: "error", intent: "danger", message, timeout: 5000 });
            };

            for(const item of items) {
                // we only process items of type text/plain
                if (item.type != "text/plain") { continue; }

                const data = await new Promise(resolve => item.getAsString(resolve));

                // handle JSON (breaks out of the entire handler)
                // the json holds layers or something.  gonna have to revisit this.
                if (data.startsWith("{"))
                {
                    // probably need to let this handle whole overlays in the future
                    let obj;
                    try { obj = JSON.parse(data); }
                    catch { }
                    if (obj) {
                        if (obj.objectType == "layers") {
                            onComplete(obj.data); // obj.data = [{layer},{layer},...]
                            continue;
                        }
                    }
                }

                // handle urls
                if (data.startsWith("http")) {
                    const contentType = await fetchContentType(data);
                    const contentTypeHandler = getContentTypeHandler(contentType, data);

                    if (!contentTypeHandler) {
                        onError(`Unsupported file type '${contentType}'.`);
                        continue;
                    }

                    if (contentTypeHandler.getLayer) {
                        let { type, obj } = contentTypeHandler.getLayer(data);
                        
                        const elementDef = ps.renderer.elements[layer.elementName];

                        if (!elementDef) {
                            console.error("Could not paste - unknown elementName:" + layer.elementName);
                            continue;
                        }

                        console.error("TODO: removed getNaturalDimensions from the elementDef - need to query DOM element directly to get size.");

                        /*
                        if (elementDef.getNaturalDimensions) {
                            const dimensions = await elementDef.getNaturalDimensions(layer, {});
                            layer.width = dimensions.width;
                            layer.height = dimensions.height;    
                        } else {
                            layer.width = elementDef.width;
                            layer.height = elementDef.height;
                        }
                        */

                        // file was loaded successfully
                        onComplete([layer]);
                    }
                    continue;
                }

                onError("Unsupported paste data format.");
                continue;
            }
        };
    },
    HandleFileUpload: (ps, { files, onComplete, autoCreateLayers }) => {
        // files is dataTransfer.files from a drop event or file upload

        return (dispatch) => {

            const onUploadStarted = (file) => {
                dispatch("ShowToast", { id: file.name, icon: "cloud-upload", message: file.name, progress: 0, timeout: 0, onCancel: () => { if (file.cancel) { file.cancel(); } } });
            };
    
            const onUploadProgress = (file, loaded) => {
                dispatch("ShowToast", { id: file.name, icon: "cloud-upload", message: file.name, progress: (loaded / file.size), timeout: 0 });
            };
    
            const onUploadFinished = (file) => {
                dispatch("ShowToast", { id: file.name, icon: "cloud-upload", message: file.name, progress: 1, timeout: 500 });
            };

            const onError = (file, error) => {
                dispatch("ShowToast", { id: file.name, icon: "error", intent: "danger", message: error.toString(), timeout: 5000 });
            };

            // get a function that does the upload for each file
            // and returns an asset object in the form of { name, src, inline }
            const upload = (file, onProgress) => {
                // if onUpload is not provided, throw an error
                if (!ps.onUpload)
                    return Promise.reject("Uploading disabled: onUpload has not been provided.");

                // otherwise, call it
                return ps.onUpload(file, onProgress).then(src => {
                    // if src is null, then the upload succeeded, but was handled externally.  we should do nothing.
                    if (!src)
                        return null;

                    return { name: file.name, src };
                });
                
            };

            // if we don't have an onComplete function
            // then we want to create layers
            let assetPromises = [];
            for(const file of files) {
                // ensure we recognize the file type
                const contentTypeHandler = getContentTypeHandler(file.type, null);

                // if we don't recognize the content type of the file, emit an error and skip
                if (!contentTypeHandler) {
                    onError(file, `${file.name}: Unsupported file type '${file.type}'.`);
                    continue;
                }

                onUploadStarted(file);

                // upload asynchronously
                const assetPromise = upload(file, onUploadProgress).then(asset => {
                    onUploadFinished(file);
                    // if asset is null, the upload was handled externally.  take no action.
                    if (!asset) { return null; }
                    if (!asset.src) {
                        onError(file, "Upload failed: asset.src is null.");
                        return null;
                    }
                    asset.type = contentTypeHandler.assetType;
                    return new Promise((resolve) => {
                        dispatch("CreateAsset", {
                            asset,
                            onCreated: resolve
                        }, false);
                    })
                }).catch(error => {
                    onError(file, error);
                });

                assetPromises.push(assetPromise);
            }

            Promise.all(assetPromises).then(assetKeys => {
                for(const assetKey of assetKeys) {
                    if (!assetKey) { continue; }

                    // if we're audo creating objects, do it
                    if (autoCreateLayers)
                        dispatch("CreateLayerFromAsset", assetKey);

                    // if we have an onComplete callback, call it
                    if (onComplete)
                        onComplete("#" + assetKey);
                }
            });
        };
    },
    CreateLayerFromAsset: (ps, assetKey) => {
        return (dispatch) => {
            // get the content type handler for this asset
            const asset = ps.overlay.assets[assetKey];
            if (!asset) {
                console.log("Could not find asset.", assetKey);
                return;
            }

            // everything else should create a layer
            const contentTypeHandler = getContentTypeHandler(asset.type, null);

            if (!contentTypeHandler) {
                console.log("Could not get contentTypeHandler for type:", asset.type);
                return;
            }

            // if the contentTypeHandler doesn't support creating layers, bail out
            if (!contentTypeHandler.getLayer)
                return;

            // get the layer from the content type handler based on the assetKey
            let layer = contentTypeHandler.getLayer("#" + assetKey);

            // set the layer's name to be the asset's name
            layer.name = asset.name;

            // pull the element def for the created layer
            const elementDef = ps.renderer.elements[layer.elementName];

            if (!elementDef)
            {
                console.log("Unknown elementName in layer.", layer);
                return;
            }

            // if the contentTypeHandler has a getDimensions method, use it - it's asynchronous
            if (contentTypeHandler.getDimensions) {
                contentTypeHandler.getDimensions(asset.src).then(dimensions => {
                    layer.height = dimensions.height;
                    layer.width = dimensions.width;
                    dispatch("CreateLayers", [ layer ]);
                });
            } else {
                dispatch("CreateLayers", [ layer ]);
            }
        };
    },

    // toasts
    ShowToast: (ps, toast) => {
        let updated = false;
        let toasts = ps.toasts.map(existingToast => {
            if (existingToast.id != toast.id) { return existingToast; }
            updated = true;
            return toast;
        });
        if (!updated)
            toasts.push(toast);
        return { toasts };
    },
    DismissToast: (ps, toast) => {
        // cancel the toast if possible
        if (toast.onCancel) { toast.onCancel(); }
        // filter out the target
        const toasts = ps.toasts.filter(r => r != toast);
        return { toasts };
    },
};

const INITIAL_STATE = {
    // external options
    width: 1920,
    height: 1080,
    onOverlayChanged: null,
    onUpload: null,
    overlay: {
        id: "default",
        layers: [],
        assets: [],
        scripts: []
    },
    elementEditors: {},

    // modes/selections/contexts
    stageTool: stageTools.moveAndResize,
    stageZoomSelection: { zoom: 1, autoFitZoom: 1, isAuto: true },
    stageTransform: { zoom: 1, panning: [0,0], width: 1920, height: 1080 },
    isExecutingScript: false,
    selectedLayerIds: [],
    overlayDomElement: null,
    scriptState: null,

    // ui
    preferences: {
        leftPanelWidth: 380,
        bottomPanelSize: 300,
        consolePanelSize: 500,
        bottomPanelMinimized: false,
        transitionEditorSize: 300
    },
    editors: [],
    selectedListTab: "layers",
    selectedPropertyTab: null,
    selectedEditorTab: null,
    toasts: [],

    renderer: defaultRenderer
};

const OverlayEditorContextProvider = ({ overlay, width, height, onOverlayChanged, onUpload, elementEditors, renderer, children }) => {
    const storeRef = useRef();

    if (!storeRef.current) {
        const extractUndoEntry = (prevState, newPartialState) => {
            // the only things we track for undo are LAYERS and ASSETS

            // if overlay was not specified in the new state
            // or if the overlay was specified but didn't change, do nothing
            if (!newPartialState.overlay || prevState.overlay == newPartialState.overlay)
                return null;

            // if nothing tracked changed, then do nothing
            let entry = {};
            let shouldSave = false;
            if (newPartialState.overlay.layers && prevState.overlay.layers != newPartialState.overlay.layers) {
                entry.layers = newPartialState.overlay.layers;
                shouldSave = true;
            }

            if (newPartialState.overlay.assets && prevState.overlay.assets != newPartialState.overlay.assets) {
                entry.assets = newPartialState.overlay.assets;
                shouldSave = true;
            }

            if (!shouldSave)
                return null;

            return entry;
        };
        
        const applyUndoEntry = (state, entry) => {
            state.overlay = { ...state.overlay, ...entry };
        };

        storeRef.current = createStore(INITIAL_STATE, Reducers, extractUndoEntry, applyUndoEntry);
    }

    // if one of the options changes (except overlay), directly update the store's state
    useMemo(() => {
        storeRef.current.dispatch("SetOptions", { width, height, onOverlayChanged, onUpload, elementEditors, renderer });
    }, [ width, height, onOverlayChanged, onUpload, elementEditors, renderer ]);

    useEffect(() => {
        storeRef.current.dispatch("SetOverlay", overlay);
    }, [ overlay ]);

    return <OverlayEditorContext.Provider value={storeRef.current}>{children}</OverlayEditorContext.Provider>
}

const useOverlayEditorContext = function(...selectors) {
    const context = useContext(OverlayEditorContext);

    // optimization for consumers that just want to dispatch and not monitor
    if (selectors.length == 0)
        return context.dispatch;

    const [payload, setPayload] = useState(() => context.select(selectors));
    
    useEffect(() => {
        function onStoreUpdated() {
            const payload = context.select(selectors);
            setPayload(prevPayload => {
                // compare each item in the new payload to the old payload
                // if anything changes, update state.
                for(let i = 0; i < prevPayload.length; i++)
                    if (prevPayload[i] != payload[i]) { return payload; }
                return prevPayload; // nothing changed, return old state which skips the rerender
            });
        }
        context.subscribe(onStoreUpdated);
        return () => context.unsubscribe(onStoreUpdated);
    }, []);

    return [payload, context.dispatch];
}

export {
    OverlayEditorContextProvider,
    useOverlayEditorContext
};
