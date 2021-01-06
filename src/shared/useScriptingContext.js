import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import AnimationPhase from "./AnimationPhase";
import { findLayerIndexes } from "./utilities";

const MAX_LOG_ENTRIES = 200;
const IMPORT_REGEX = /(import (.+ from )?["'])(\.\/)?(.+)(["'])/g;

const compileScript = (scriptingContextId, scriptName, scripts, assets, scriptUrls) => {

    let scriptText;
    let requiresCompile;
    if (scriptName.startsWith("asset:")) {
        const asset = assets[scriptName];
        if (asset) {
            scriptText = atob(asset.src.substring(28));
            requiresCompile = false;
        }
    } else {
        scriptText = scripts[scriptName];
        requiresCompile = true;
    }

    if (!scriptText)
        throw "Could not find script or asset: " + scriptName;

    let blob;
    if (!requiresCompile) {
        blob = new Blob([`//# sourceURL=${scriptingContextId}/openoverlay/${scriptName}\n${scriptText}`], { type: "text/javascript"});
    }
    else {
        const compiledScript = scriptText.replace(IMPORT_REGEX, (match, pre, pre2, dotSlash, importedScriptName, post) => {
            // check to see if we've already compiled this script, and if so, return it's url
            // otherwise, compile the imported script
            const dependencyUrl = scriptUrls[importedScriptName] || compileScript(scriptingContextId, importedScriptName, scripts, assets, scriptUrls);
            return pre + dependencyUrl + post;
        });
        blob = new Blob([`//# sourceURL=${scriptingContextId}/openoverlay/${scriptName}\nconst { console, settings, on, off, addLayer, layer, bulkUpdate, setTimeout, setInterval } = window._scriptingContexts[${scriptingContextId}];\n${compiledScript}`], { type: "text/javascript"});
    }

    // now that we have a fully compiled script, create the blob and return a url
    const scriptUrl = URL.createObjectURL(blob);
    scriptUrls[scriptName] = scriptUrl;
    return scriptUrl;
};

const useScriptingContext = (overlay, overlayDomRef, onScriptStateChanged, execute) => {
    const [scriptState, setScriptState] = useState(null);

    useEffect(() => {
         // if we're not executing, do nothing and return nothing
        if (!execute) { return; }

        // ensure we have scripts
        if (!overlay.scripts) { return; }

        // ensure we have a main.js defined
        if (!overlay.scripts["main.js"]) { return; }

        if (!window._scriptingContexts)
            window._scriptingContexts = {};

        const scriptId = (window._lastScriptId ? window._lastScriptId + 1 : 1);
        window._lastScriptId = scriptId;

        let workingLayers = (overlay.layers ? [...overlay.layers] : []);

        let workingScriptState = {
            layers: workingLayers,
            maxLayerId: workingLayers.map(r => r.id).reduce((a,c) => (c.id > a ? c.id : a), 0),
            eventHandlers: {},
            timeouts: [],
            intervals: [],
            scriptUrls: {},
            isBulkUpdating: false,
            logs: []
        };

        const commitWorkingState = () => {
            if (workingScriptState.isBulkUpdating)
                return;

            setScriptState({...workingScriptState});
            if (onScriptStateChanged)
                onScriptStateChanged(workingScriptState);
        };

        const log = (...args) => {
            // pass through console logging
            console.log(...args);

            // and append to logs, and trim to max length
            workingScriptState.logs.push(args);

            if (workingScriptState.logs.length > MAX_LOG_ENTRIES)
                workingScriptState.logs.splice(0, 1);

            if (onScriptStateChanged)
                onScriptStateChanged(workingScriptState);
        };

        let settings;
        try
        {
            const settingsJsonText = (overlay.scripts ? overlay.scripts["settings.json"] : null);
            const settingsJson = (settingsJsonText ? JSON.parse(settingsJsonText) : null);
            if (settingsJson && settingsJson.initial)
                settings = {...settingsJson.initial};
        }
        catch {}

        if (!settings)
            settings = {};

        if (overlay.settings)
            Object.apply(settings, overlay.settings);

        const scriptingContext = {
            settings,
            console: {
                ...console,
                // intercept console.log
                log
            },
            on: (eventName, callback) => {
                let callbackList = workingScriptState.eventHandlers[eventName];
                if (!callbackList)
                    callbackList = workingScriptState.eventHandlers[eventName] = [];
                callbackList.push(callback);
                commitWorkingState();
            },
            off: (eventName, callback) => {
                const callbackList = workingScriptState.eventHandlers[eventName];
                if (!callbackList) { return; }
                const index = callbackList.indexOf(callback);
                if (index == -1) { return; }
                callbackList.splice(index, 1);
                commitWorkingState();
            },
            addLayer: (layerObjOrElementName, config, style) => {
                // if the user provides an object, take it as a complete layer
                let layer;
                if (typeof layerObjOrElementName === "object") {
                    layer = layerObjOrElementName;
                } else {
                    // otherwise, treat it as an element name and bring in config and style
                    layer = {
                        elementName: layerObjOrElementName,
                        config,
                        style
                    };
                }

                layer.id = ++workingScriptState.maxLayerId;
                workingScriptState.layers.splice(0, 0, layer);
                commitWorkingState();
                return layer.id;
            },
            layer: (...layerFilters) => {
                let indexes = findLayerIndexes(workingScriptState.layers, layerFilters);
                const stateObj = {
                    length: indexes.length,
                    config: (config) => {
                        if (!config)
                            return (indexes.length == 0 ? null : workingScriptState.layers[indexes[0]].config);

                        for(const index of indexes) {
                            let layer = { ...workingScriptState.layers[index] };
                            layer.config = {...layer.config, ...config};
                            workingScriptState.layers[index] = layer;
                        }
                        commitWorkingState();
                        return stateObj;
                    },
                    style: (style) => {
                        if (!style)
                            return (indexes.length == 0 ? null : workingScriptState.layers[indexes[0]].style);

                        for(const index of indexes) {
                            let layer = { ...workingScriptState.layers[index] };
                            layer.style = {...layer.style, ...style};
                            workingScriptState.layers[index] = layer;
                        }
                        commitWorkingState();
                        return stateObj;
                    },
                    show: () => {
                        for(const index of indexes) {
                            const layer = workingScriptState.layers[index];
                            workingScriptState.layers[index] = {
                                ...layer,
                                hidden: false
                            };
                        }
                        commitWorkingState();
                        return stateObj;
                    },
                    hide: () => {
                        for(const index of indexes) {
                            const layer = workingScriptState.layers[index];
                            workingScriptState.layers[index] = {
                                ...layer,
                                hidden: true
                            };
                        }
                        commitWorkingState();
                        return stateObj;
                    },
                    moveUp: (toTop) => {
                        if (indexes.length == 0) { return stateObj; }
                        // do nothing if the highest selected layer is at the top already
                        console.log({ indexes, layers: workingScriptState.layers });
                        if (indexes[0] == 0) { return stateObj; }
                        const targetIndex = (toTop ? 0 : indexes[0] - 1);

                        // pluck the selected layers out
                        let pluckedLayers = [];
                        workingScriptState.layers = workingScriptState.layers.reduce((layers, layer, index) => {
                            if (indexes.includes(index))
                                pluckedLayers.push(layer);
                            else
                                layers.push(layer);
                            return layers;
                        }, []);

                        // then re-add at the target index
                        workingScriptState.layers.splice(targetIndex, null, ...pluckedLayers);

                        commitWorkingState();

                        // since our indexes probably changed, we should re-run the find
                        indexes = findLayerIndexes(workingScriptState.layers, layerFilters);

                        return stateObj;
                    },
                    moveDown: (toBottom) => {
                        if (indexes.length == 0) { return stateObj; }
                        // do nothing if the lowest selected layer is at the bottom already
                        if (indexes[indexes.length - 1] == (workingScriptState.layers.length - 1)) { return stateObj; }
                        const targetIndex = (toBottom ? workingScriptState.layers.length - 1 : indexes[0] + 1);

                        // pluck the selected layers out
                        let pluckedLayers = [];
                        workingScriptState.layers = workingScriptState.layers.reduce((layers, layer, index) => {
                            if (indexes.includes(index))
                                pluckedLayers.push(layer);
                            else
                                layers.push(layer);
                            return layers;
                        }, []);

                        // then re-add at the target index
                        workingScriptState.layers.splice(targetIndex, null, ...pluckedLayers);

                        commitWorkingState();

                        // since our indexes probably changed, we should re-run the find
                        indexes = findLayerIndexes(workingScriptState.layers, layerFilters);

                        return stateObj;
                    },
                    remove: () => {
                        workingScriptState.layers = workingScriptState.layers.filter((layer, index) => !indexes.includes(index));
                        commitWorkingState();
                    },
                    clone: () => {
                        if (indexes.length == 1)
                            return cloneDeep(workingScriptState.layers[indexes[0]]);
                        
                        return indexes.map(index => cloneDeep(workingScriptState.layers[index]));
                    },
                    dom: () => {
                        if (!overlayDomRef.current)
                            return null;
                        
                        if (indexes.length == 0)
                            return null;
                        
                        const id = workingScriptState.layers[indexes[0]].id;
                        return overlayDomRef.current.querySelector(`[data-id='${id}']`);
                    },
                    collect: () => {
                        return workingScriptState.layers.filter((layer, index) => indexes.includes(index));
                    }
                };
                return stateObj;
            },
            bulkUpdate: (callback) => {
                workingScriptState.isBulkUpdating = true;
                callback();
                workingScriptState.isBulkUpdating = false;
                commitWorkingState();
            },
            setTimeout: (callback, delay) => {
                const timeoutId = setTimeout(callback, delay);
                workingScriptState.timeouts.push(timeoutId);
            },
            setInterval: (callback, period) => {
                const intervalId = setInterval(callback, period);
                workingScriptState.intervals.push(intervalId);
            }
        };

        // call the initial onScriptStateChanged callback, if we have one
        if (onScriptStateChanged)
            onScriptStateChanged(workingScriptState);

        window._scriptingContexts[scriptId] = scriptingContext;

        // compile main.js
        let compiledMainJs;
        try {
            compiledMainJs = compileScript(scriptId, "main.js", overlay.scripts, overlay.assets, workingScriptState.scriptUrls);
        }
        catch (err) {
            console.log(`Error compiling script:\n${err}`);
        }

        // and import the compiled file
        if (compiledMainJs) {
            // webpackIgnore prevents webpack from unrolling this
            import(/* webpackIgnore: true */compiledMainJs).catch(err => {
                Object.keys(err).map(console.log);
                console.log(`Error executing script:\n${err.stack}`, { t: (typeof err), lineNumber: err.lineNumber });
            });
        }

        // reset the script state when changing
        return () => {
            // clear timeouts/intervals
            for(const timeout of workingScriptState.timeouts)
                clearTimeout(timeout);
            for(const interval of workingScriptState.intervals)
                clearInterval(interval);
            // release any scriptUrls
            for(const scriptUrl of Object.values(workingScriptState.scriptUrls))
                URL.revokeObjectURL(scriptUrl);

            // delete the script context from global state
            delete window._scriptingContexts[scriptId];
            
            setScriptState(null);
        };
     }, [execute]);

     return scriptState;
};

export default useScriptingContext;