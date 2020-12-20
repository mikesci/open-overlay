import React, { useEffect, useRef, useContext, useState, useMemo } from "react";
import ContentTypeHandlers from "../shared/ContentTypeHandlers.js";
import { createStore } from "./reduxLite.js";
import { effects } from "../components/Effects.jsx";
import { maxValue, copyToClipboard, parsePropsOrFn } from "./utilities.js";
import AnimationPhase from "./AnimationPhase.js";
import AnimationState from "./AnimationState.js";
import Elements from "../elements/_All.jsx";
import { stageTools } from "../components/StageTools.jsx";
import Editors from "../panels/Editors.js";

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

function updateSelectionStyle(ps, propsOrFn) {
    const getNewProps = parsePropsOrFn(propsOrFn);

    return updateLayers(ps, ps.selectedLayerIds, (layer) => {
        const newProps = getNewProps(layer);

        if (!newProps)
            return null;

        let style = {...layer.style};

        // allow "undefined" values to delete style props
        for(const [styleName, styleValue] of Object.entries(newProps)) {
            if (styleValue === "DELETE")
                delete style[styleName];
            else if (styleValue)
                style[styleName] = styleValue;
        }

        return { style };
    });
}

function moveLayer(layers, id, newIndex) {
    let sourceIndex = layers.findIndex(r => r.id == id);
    let layer = layers.splice(sourceIndex, 1)[0];
    if (newIndex > sourceIndex) { newIndex--; }
    layers.splice(newIndex, 0, layer);
}

/*
function getInterpolatedStyle(styleName, layer, animationContext, layerDomElement) {

    // if not animating, we'll just return the base style
    if (animationContext.phase == AnimationPhase.STATIC || !layerDomElement)
        return layer.styles[styleName];

    return styles[styleName].extract(getComputedStyle(layerDomElement.domElement));
}
*/

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

function getContentTypeHandler(contentType, data) {
    return ContentTypeHandlers.find(handler => handler.match(contentType, data));
}

function onUploadInlineAsset(file, onProgress) {
    // string lengths max out in most browsers at ~128MB, so we'll error if the file is larger
    if (file.size > 134217728)
        return Promise.reject("File sizes greater than 128MB are not supported.");

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result));
        reader.addEventListener("progress", (evt) => onProgress(file, evt.loaded));
        reader.addEventListener("error", reject);
        reader.readAsDataURL(file);
    });
}

const Reducers = {
    SetOptions: (ps, { width, height, onOverlayChanged, onUpload, elements }) => {
        return {
            width: width || 1920,
            height: height || 1080,
            onOverlayChanged: onOverlayChanged,
            onUpload: onUpload,
            elements: elements || Elements
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
    SetStageTool: (ps, stageTool) => {
        return { stageTool, animationContext: { phase: AnimationPhase.STATIC, offset: 0, state: AnimationState.PAUSED } };
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
    SetAnimationContext: (ps, { phase, offset, duration, state, timeout }) => {
        let newState = {
            animationContext: {
                ...ps.animationContext,
                phase: (phase === undefined ? ps.animationContext.phase : phase),
                offset: (offset === undefined ? ps.animationContext.offset : offset),
                duration: (duration === undefined ? ps.animationContext.duration : duration),
                state: (state === undefined ? ps.animationContext.state : state),
                timeout: (timeout === undefined ? ps.animationContext.timeout : timeout)
            }
        };

        // if we're playing, cancel the pause timeout
        if (ps.animationContext.timeout) {
            newState.animationContext.timeout = null;
            clearTimeout(ps.animationContext.timeout);
        }

        // if phase is changing, deselect all animations
        if (phase && phase != ps.animationContext.phase) {
            newState.selectedAnimations = [];
        }

        return newState;
    },
    ToggleAnimationPlaying: (ps, { phase, duration }) => {
        return (dispatch) => {
            // if we're playing, then cancel the timeout and revert to the static phase
            if (ps.animationContext.state == AnimationState.PLAYING) {
                if (ps.animationContext.timeout)
                    clearTimeout(ps.animationContext.timeout);

                dispatch("SetAnimationContext", { phase: AnimationPhase.STATIC, state: AnimationState.PAUSED, timeout: null });
            } else {
                // if changing the state to playing, set a timeout to flip back to paused after the phase ends
                //const timeoutLength = duration - initialAnimationOffset;
                let timeout = setTimeout(() => {
                    dispatch("SetAnimationContext", { phase: AnimationPhase.STATIC, state: AnimationState.PAUSED, timeout: null });
                }, duration);
    
                dispatch("SetAnimationContext", { phase, offset: 0, state: AnimationState.PLAYING, timeout });
            }
        };
    },
    UpdateAnimationContextDuration: (ps, deltaMs) => {
        if (!ps.animationContext.duration) { return; }
        const duration = Math.max(500, ps.animationContext.duration + deltaMs);
        return { animationContext: { ...ps.animationContext, duration }};
    },
    SavePreferences: (ps, preferences) => {
        return { preferences: { ...ps.preferences, ...preferences } };
    },
    ToggleEditor: (ps, { type, params }) => {
        let newState = {};
        const editorType = Editors[type];
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
        const editorType = Editors[type];
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
    SelectPropertyTab: (ps, selectedPropertyTab) => {
        return { selectedPropertyTab };
    },

    // assets
    CreateAsset: (ps, { asset, onCreated }) => {
        // asset = { name, src, inline }
        return updateOverlay(ps, overlay => {
            // generate an asset key from the name
            let assetKey = "asset:" + asset.name;
            // ensure the key is unique
            if (overlay.assets)
                for(let i = 1; overlay.assets[assetKey] != null; i++)
                    assetKey = "asset:" + asset.name + "-" + i++;

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

                dispatch("CreateScriptInternal", name);
            }

            // now open the script in the editor even if we didn't create it
            dispatch("OpenEditor", { type: "script", params: { scriptKey: name } });
        };
    },
    CreateScriptInternal: (ps, name) => {
        return updateOverlay(ps, (overlay) => {
            const scripts = {...overlay.scripts, [name]: "" };
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

    // layers
    CreateLayers: (ps, requestedLayers) => {
        // find the max layer id
        let selectedLayerIds = [];
        let newState = updateOverlay(ps, (overlay) => {
            let layers = (overlay.layers ? [...overlay.layers] : []);
            let maxLayerId = layers.map(r => r.id).reduce(maxValue, 1);
    
            for(const requestedLayer of requestedLayers) {
                // get the element for the layer.  if we can't find it, skip
                let element = ps.elements[requestedLayer.elementName];
                if (!element) { continue; }
    
                // assemble a config object
                let requestedConfig = requestedLayer.config || {};
                let config = { ...requestedConfig }; // start with the requested config
    
                // get default config values from the manifest parameters
                for (const parameter of element.manifest.parameters) {
                    if (config[parameter.name] !== undefined) { continue; }
                    if (parameter.defaultValue === undefined) { continue; }
                    config[parameter.name] = parameter.defaultValue;
                }
    
                // create the layer with the props requested
                const layer = {
                    id: ++maxLayerId,
                    elementName: requestedLayer.elementName,
                    label: requestedLayer.label || element.manifest.name,
                    config: config,
                    effects: requestedLayer.effects || (element.manifest.defaultEffects ? { ...element.manifest.defaultEffects } : null),
                    style: { ...element.manifest.defaultStyle, ...requestedLayer.style }
                };

                console.log({ layer });
    
                if (requestedLayer.animations)
                    layer.animations = requestedLayer.animations;
    
                // ensure a unique label
                // chop off the "#NUMBER" if it's there
                let baseLabel = layer.label;
                if (baseLabel.match(/\#\d+$/)) { baseLabel = baseLabel.substr(0, baseLabel.lastIndexOf("#") - 1); }
                for (let i = 2; layers.findIndex(r => r.label == layer.label) > -1; i++)
                    layer.label = baseLabel + " #" + i;
    
                // add the layer with the new id
                layers.unshift(layer);
    
                // append the new id to selected ids
                selectedLayerIds.push(layer.id);
            }

            return { layers };
        }, true);

        // select the newly created layers
        newState.selectedLayerIds = selectedLayerIds;
        newState.selectedPropertyTab = "layer";

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
            selectedLayerIds,
            selectedPropertyTab: "layer",
        };
    },
    SelectLayers: (ps, selectedLayerIds) => {
        return {
            selectedLayerIds,
            selectedPropertyTab: "layer"
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

        return updateSelectionStyle(ps, (layer) => {
            const selectedRect = rects.find(r => r.layerid == layer.id);
            if (!selectedRect) { return; }
            return {
                top: selectedRect.top + diffY + "px",
                left: selectedRect.left + diffX + "px",
                height: selectedRect.height + "px",
                width: selectedRect.width + "px"
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

        return updateSelectionStyle(ps, (layer) => {
            const selectedRect = rects.find(r => r.layerid == layer.id);
            if (!selectedRect) { return; }
            return {
                top: ((selectedRect.top + diffY) * scaleY) + "px",
                left: ((selectedRect.left + diffX) * scaleX) + "px",
                width: (selectedRect.width * scaleX) + "px",
                height: (selectedRect.height * scaleY) + "px"
            };
        }, true, true);
    },
    ResetSelectedLayers: (ps) => {
        if (ps.selectedLayerIds.length == 0) { return; }

        return async (dispatch) => {
            const dimensionData = await Promise.all(ps.selectedLayerIds.map(layerId => {
                const layer = ps.overlay.layers.find(r => r.id == layerId);
                const element = ps.elements[layer.elementName];
                // elements that don't have a getDimensions method cannot be reset
                if (!element.manifest.getNaturalDimensions)
                    return Promise.resolve({});

                return element.manifest.getNaturalDimensions(layer.config, ps.overlay.assets).then(dimensions => ({ id: layer.id, ...dimensions }));                    
            }));
            dispatch("ResetSelectedLayers_Complete", dimensionData);
        };
    },
    ResetSelectedLayers_Complete: (ps, layerDimensions) => {
        return updateSelectionStyle(ps, (style, layer) => {
            const layerDimension = layerDimensions.find(r => r.id == layer.id);
            if (!layerDimension) { return; }
            return {
                top: 0,
                left: 0,
                width: layerDimension.width + "px",
                height: layerDimension.height + "px"
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

        return updateSelectionStyle(ps, (layer) => {
            const selectedRect = rects.find(r => r.layerid == layer.id);
            if (!selectedRect) { return; }
            const topDelta = (selectedRect.top - boundingBox.top);
            const leftDelta = (selectedRect.left - boundingBox.left);
            return {
                top: (selectedRect.top + (topDelta * (magnitude - 1))) + "px",
                left: (selectedRect.left + (leftDelta * (magnitude - 1))) + "px",
                width: (selectedRect.width * magnitude) + "px",
                height: (selectedRect.height * magnitude) + "px"
            };
        }, true, true);
    },
    NudgeSelectedLayers: (ps, { rects, boundingBox, direction, precise, toEdge }) => {
        if (rects.length == 0) { return; }

        const magnitude = (precise ? 1 : 5);
        return updateSelectionStyle(ps, (layer) => {
            const selectedRect = rects.find(r => r.layerid == layer.id);
            if (!selectedRect) { return; }
            switch (direction) {
                case "left":
                    return { left: (toEdge ? selectedRect.left - boundingBox.left : selectedRect.left - magnitude) + "px" };
                case "right":
                    return { left: (toEdge ? selectedRect.left + (ps.width - boundingBox.right) : selectedRect.left + magnitude) + "px" };
                case "up":
                    return { top: (toEdge ? selectedRect.top - boundingBox.top : selectedRect.top - magnitude) + "px" };
                case "down":
                    return { top: (toEdge ? selectedRect.top + (ps.height - boundingBox.bottom) : selectedRect.top + magnitude) + "px" };
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
    CreateLayerEffect: (ps, { id, effectName }) => {
        // ensure the effect is valid
        let effect = effects[effectName];
        if (!effect) { return; }

        // create the effect definition, loading in defaults
        let effectConfig = {};
        for (let parameter of effect.parameters) {
            if (parameter.defaultValue == null) { continue; }
            effectConfig[parameter.name] = parameter.defaultValue;
        }

        return updateLayer(ps, id, (layer) => {
            if (layer.effects && layer.effects[effectName]) { return; } // disallow re-adding an effect.  the UI should prevent this, but lets be safe.
            return { effects: { ...layer.effects, [effectName]: effectConfig } };
        }, true);
    },
    UpdateLayerEffect: (ps, { id, effectName, config }) => {
        return updateLayer(ps, id, (layer) => {
            if (!layer.effects) { return; }
            if (!layer.effects[effectName]) { return; }
            let effect = { ...layer.effects[effectName], ...config };
            let effects = { ...layer.effects, [effectName]: effect };
            return { effects };
        });
    },
    DeleteLayerEffect: (ps, { id, effectName }) => {
        return updateLayer(ps, id, (layer) => {
            let effects = { ...layer.effects };
            delete effects[effectName];
            return { effects };
        }, true);
    },
    UpdateSelectedLayersConfig: (ps, { config }) => {
        if (ps.selectedLayerIds.length == 0) { return; }
        return updateLayers(ps, ps.selectedLayerIds, (layer) => {
            return { config: {...layer.config, ...config }};
        });
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
    UpdateSelectionStyle: (ps, propsOrFn) => {
        return updateSelectionStyle(ps, propsOrFn);
    },
    CreateAnimation: (ps, { layerid, animation }) => {
        // find the max animation id
        let maxAnimationId;
        if (!ps.overlay.animations) {
            maxAnimationId = 0;
        }
        else {
            maxAnimationId = ps.overlay.animations.reduce((maxAnimationId, item) => {
                if (item.id > maxAnimationId) { maxAnimationId = item.id; }
                return maxAnimationId;
            }, 1);
        }

        // fill out the default fields (id, delay, duration)
        animation = {
            id: maxAnimationId + 1,
            delay: 0,
            duration: 500,
            ...animation
        };

        return updateOverlay(ps, (overlay) => {
            // add to the overlay's animation array
            let animations = (overlay.animations ? [...overlay.animations] : []);
            animations.push(animation);

            // add to the target layer
            let layers = overlay.layers.map(layer => {
                if (layer.id == layerid) {
                    layer = {...layer};
                    layer.animations = (layer.animations ? [...layer.animations] : []);
                    layer.animations.push(animation.id);
                }
                return layer;
            });
            return { animations, layers };
        }, true);
    },
    UpdateAnimation: (ps, updatedAnimation) => {
        return updateOverlay(ps, (overlay) => {
            return {
                animations: overlay.animations.map(animation => (animation.id == updatedAnimation.id ? updatedAnimation : animation))
            };
        }, true);
    },
    DeleteAnimation: (ps, id) => {
        return updateOverlay(ps, (overlay) => {
            // delete from the overlay's animations array
            let animations = overlay.animations.filter(r => r.id != id);

            // delete from any layers that reference it
            let layers = overlay.layers.map(layer => {
                let animationIndex = (layer.animations ? layer.animations.findIndex(r => r.id == id) : -1);
                if (animationIndex > 0) {
                    layer = {...layer};
                    layer.animations = [...layer.animations];
                    layer.animations.splice(animationIndex, 1);
                }
                return layer;
            });
            return { animations, layers };
        }, true);
    },
    SelectAnimation: (ps, { id, additive }) => {
        let selectedAnimations;
        if (!additive) {
            selectedAnimations = [ id ];
        } else {
            selectedAnimations = [...ps.selectedAnimations];
            const existingIndex = selectedAnimations.findIndex(r => r == id);
            if (existingIndex > -1) // remove if already selected
                selectedAnimations.splice(existingIndex, 1);
            else // otherwise add
                selectedAnimations.push(id);
        }
        return {
            selectedAnimations,
            selectedPropertyTab: "animation"
        };
    },
    UpdateSelectedAnimations: (ps, newProps) => {
        return updateOverlay(ps, (overlay) => {
            const animations = overlay.animations.map(animation => {
                if (ps.selectedAnimations.includes(animation.id))
                    animation = { ...animation, ...newProps };
                return animation;
            });
            return { animations };
        }, true);
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
                        let layer = contentTypeHandler.getLayer(data);
                        const element = ps.elements[layer.elementName];
                        if (element) {
                            if (element.manifest.getDimensions) {
                                const dimensions = await element.manifest.getDimensions(layer.config, {});
                                layer.width = dimensions.width;
                                layer.height = dimensions.height;    
                            } else {
                                layer.width = element.manifest.width;
                                layer.height = element.manifest.height;
                            }
                        }

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
                if (ps.onUpload) // upload as a url
                    return ps.onUpload(file, onProgress).then(src => ({ name: file.name, src }));
                else // upload as an inline asset
                    return onUploadInlineAsset(file, onProgress).then(src => ({ name: file.name, src, inline: true }));
            };

            const createLayer = async (contentTypeHandler, layerName, assetKey, asset) => {

                // if the contentTypeHandler doesn't support creating layers, bail out
                if (!contentTypeHandler.getLayer)
                    return;

                // get the layer from the content type handler based on the url, which is just the assetKey
                let layer = contentTypeHandler.getLayer(assetKey);

                // it's possible that the built-in element we need won't be supported by the consuming
                // application.  check here.
                const element = ps.elements[layer.elementName];
                if (!element) {
                    console.log("Tried to create layer for unknown element:" + layer.elementName);
                    return;
                }

                // set the layer's name to be the filename
                layer.name = layerName;

                // if the element has natural dimensions, get those to store with the layer
                let dimensions;
                if (element.manifest.getNaturalDimensions)
                    dimensions = await element.manifest.getNaturalDimensions(layer.config, { [assetKey]: asset });
                else if (element.manifest.width && element.manifest.height)
                    dimensions = { width: element.manifest.width, height: element.manifest.height };

                if (dimensions)
                    layer.style = { ...layer.style, top: "0px", left: "0px", width: dimensions.width + "px", height: dimensions.height + "px"};

                dispatch("CreateLayers", [ layer ]);
            };

            // if we don't have an onComplete function
            // then we want to create layers

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
                upload(file, onUploadProgress).then(asset => {
                    if (!asset || !asset.src) {
                        onError(file, "Upload failed: asset or asset.src is null.");
                        return;
                    }

                    onUploadFinished(file);

                    asset.type = contentTypeHandler.assetType;

                    new Promise((resolve) => {
                        dispatch("CreateAsset", { asset, onCreated: resolve }, false);
                    }).then(assetKey => {
                        // if we're creating layers, do it
                        if (autoCreateLayers)
                            createLayer(contentTypeHandler, file.name, assetKey, asset);

                        // if we have an onComplete callback, call it
                        if (onComplete)
                            onComplete(assetKey);
                    });
                }).catch(error => {
                    onError(file, error);
                });
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
    elements: Elements,
    overlay: {
        layers: [],
        assets: [],
        scripts: []
    },

    // modes/selections/contexts
    stageTool: stageTools.moveAndResize,
    stageZoomSelection: { zoom: 1, autoFitZoom: 1, isAuto: true },
    stageTransform: { zoom: 1, panning: [0,0], width: 1920, height: 1080 },
    animationContext: { phase: AnimationPhase.STATIC },
    isExecutingScript: false,
    selectedLayerIds: [],
    selectedAnimations: [],
    overlayDomElement: null,
    scriptState: null,

    // ui
    preferences: { leftPanelWidth: 380, bottomPanelSize: 300, consolePanelSize: 500, bottomPanelMinimized: false },
    editors: [],
    selectedPropertyTab: null,
    selectedEditorTab: null,
    toasts: []
};

const OverlayEditorContextProvider = ({ overlay, width, height, onOverlayChanged, onUpload, elements, children, ...props }) => {
    const storeRef = useRef();

    if (!storeRef.current) {
        const extractUndoEntry = (prevState, newPartialState) => {
            // the only things we track for undo are LAYERS

            // if overlay was not specified in the new state
            // or if the overlay was specified but didn't change, do nothing
            if (!newPartialState.overlay || prevState.overlay == newPartialState.overlay)
                return null;

            // if layers are not specified or didn't change, do nothing
            if (!newPartialState.overlay.layers || prevState.overlay.layers != newPartialState.overlay.layers)
                return null;

            return {
                layers: newPartialState.overlay.layers
            };
        };
        
        const applyUndoEntry = (state, entry) => {
            state.overlay.layers = entry.layers;
        };

        storeRef.current = createStore(INITIAL_STATE, Reducers, extractUndoEntry, applyUndoEntry);
    }

    // if one of the options changes (except overlay), directly update the store's state
    useMemo(() => {
        storeRef.current.dispatch("SetOptions", { width, height, onOverlayChanged, onUpload, elements });
    }, [ width, height, onOverlayChanged, onUpload, elements ]);

    useMemo(() => {
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
