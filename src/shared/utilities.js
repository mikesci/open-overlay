const parsePropsOrFn = (propsOrFn) => {
    if (!propsOrFn)
        return null;
    else if (typeof propsOrFn === "function")
        return propsOrFn;
    else
        return () => propsOrFn;
}

const parseIntOrDefault = (str, def = 0) => {
    const result = parseInt(str);
    return (isNaN(result) ? def : result);
}

const parseFloatOrDefault = (str, def = 0) => {
    const result = parseFloat(str);
    return (isNaN(result) ? def : result);
}

const getSimpleReducer = (reducerMethods) => {
    return (ps, action) => {
        const reducer = reducerMethods[action.type];
        if (!reducer) { return ps; }
        const props = reducer(ps, action);
        if (!props) { return ps; }
        return {...ps, ...props };
    };
}

const maxValue = (p, c) => { return c > p ? c : p; }

// extracts a list of unique values from an array, provided by an extraction function
const extractUnique = (array, extractFn) => {
    return array.reduce((p,c) => {
        const extractValue = extractFn(c);
        if (!p.includes(extractValue)) { p.push(extractValue); }
        return p;
    }, []);
}

const findLayers = (layers, layerFilters) => {
    // optimize for the common case, a single filter
    if (layerFilters.length == 1) {
        const matchFn = layerFilterToFunction(layerFilters[0]);
        return [layers.find(matchFn)];
    } else {
        // otherwise, add the filters together
        const matchFns = layerFilters.map(layerFilterToFunction);
        return layers.reduce((layers, layer) => {
            for(const matchFn of matchFns) {
                if (matchFn(layer)) {
                    layers.push(layer);
                    break;
                }
            }
            return layers;
        }, []);
    }
}

const findLayerIndexes = (layers, layerFilters) => {
    // optimize for the common case, a single filter
    if (layerFilters.length == 1) {
        const matchFn = layerFilterToFunction(layerFilters[0]);
        return layers.reduce((indexes, layer, index) => { 
            if (matchFn(layer)) {
                indexes.push(index);
            }
            return indexes;
        }, []);
    } else {
        // otherwise, add the filters together
        const matchFns = layerFilters.map(layerFilterToFunction);
        return layers.reduce((indexes, layer, index) => {
            for(const matchFn of matchFns) {
                if (matchFn(layer)) {
                    indexes.push(index);
                    break;
                }
            }
            return indexes;
        }, []);
    }
}

const layerFilterToFunction = (layerFilter) => {
    if (!layerFilter)
        return (layer) => true;

    switch (typeof(layerFilter))
    {
        case "object":
            return (layer) => {
                for(const [prop, propValue] of Object.entries(layerFilter)) {
                    if (layer[prop] != propValue) { return false; }
                }
                return true;
            };
        case "string":
            return (layer) => (layer.label == layerFilter);
        case "number":
            return (layer) => (layer.id == layerFilter);
        default:
            return layerFilter;
    }
}

const propsOrCallbackToFunction = (propsOrCallback) => {
    if (typeof(propsOrCallback) == "function")
        return propsOrCallback;
    else
        return (layer) => propsOrCallback;
}

function transformsListToString(list) {
    let finalTransform = {};
    for (const transform of list) {
        for (const [key, value] of Object.entries(transform)) {
            switch (key) {
                case "rotate":
                case "translate": // rotate and translate are 3d vectors that get added
                    if (!finalTransform[key]) { finalTransform[key] = [0, 0, 0]; }
                    finalTransform[key][0] += value[0];
                    finalTransform[key][1] += value[1];
                    finalTransform[key][2] += value[2];
                    break;
                default:
                    finalTransform[key] = value; // overwrite as the default
            }
        }
    }

    let returnVal = "";
    if (finalTransform.perspective != undefined)
        returnVal += ` perspective(${finalTransform.perspective}px)`;
    if (finalTransform.rotate)
        returnVal += ` rotateX(${finalTransform.rotate[0]}deg) rotateY(${finalTransform.rotate[1]}deg) rotateZ(${finalTransform.rotate[2]}deg)`;
    if (finalTransform.translate)
        returnVal += ` translate3d(${finalTransform.translate[0]}px,${finalTransform.translate[1]}px,${finalTransform.translate[2]}px)`;
    if (finalTransform.translateZ != undefined)
        returnVal += ` translateZ(${finalTransform.translateZ}px)`;
    return returnVal;
}


async function getExternalScriptsStringAsync(externalScripts) {
    const externalScriptPairs = Object.entries(externalScripts);
    if (externalScriptPairs.length == 0) { return ""; }

    let sources = [];
    for(let [url, source] of externalScriptPairs) {
        // add the sourceUrl before each script to help with debugging
        sources.push(`//# sourceURL=${url}`);
        sources.push(await source);
    }
    return sources.join("\r\n");
}

const copyToClipboard = (dataString) => {
    let textarea = document.createElement("textarea");
    textarea.style["position"] = "absolute";
    textarea.style["top"] = "-99999px";
    textarea.value = dataString;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    setTimeout(() => {
        document.body.removeChild(textarea);
    }, 100);
}

const stageToContainerCoordinates = (containerRect, stageTransform, rect) => {
    let top = rect.top;
    let left = rect.left;
    let height = 0;
    let width = 0;
    // step 1: unapply centering in the stage's context
    top -= (stageTransform.height / 2);
    left -= (stageTransform.width / 2);
    // step 2: apply panning
    top += stageTransform.panning[1];
    left += stageTransform.panning[0];
    // step 3: apply zoom
    top *= stageTransform.zoom;
    left *= stageTransform.zoom;
    // step 4: make top/left relative to the center of the container
    top += (containerRect.height / 2);
    left += (containerRect.width / 2);
    // step 5: handle width/height,bottom/right
    
    if (rect.bottom)
        height = (rect.bottom - rect.top) * stageTransform.zoom;
    else if (rect.height)
        height = rect.height * stageTransform.zoom;

    if (rect.right)
        width = (rect.right - rect.left) * stageTransform.zoom;
    else if (rect.width)
        width = rect.width * stageTransform.zoom;

    return {
        top,
        left,
        height,
        width
    };
}

const containerToStageCoordinates = (containerRect, stageTransform, rect) => {
    let top = rect.top;
    let left = rect.left;
    // step 1: make top/left relative to the center of the container
    top -= (containerRect.height / 2);
    left -= (containerRect.width / 2);
    // step 2: apply zoom
    top /= stageTransform.zoom;
    left /= stageTransform.zoom;
    // step 3: apply panning
    top -= stageTransform.panning[1];
    left -= stageTransform.panning[0];
    // step 4: unapply centering in the stage's context
    top += (stageTransform.height / 2);
    left += (stageTransform.width / 2);
    return {
        top: top,
        left: left,
        height: (rect.height ? (rect.height / stageTransform.zoom) : 0),
        width: (rect.width ? (rect.width / stageTransform.zoom) : 0)
    };
}

const showUploadDialogAsync = (accept) => {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.style = "display: none";
        input.accept = accept;
        input.addEventListener("change", (evt) => {
            if (input.files.length == 0) { reject(); return; }
            resolve(input.files);
        });
        input.click();
    });
}

const exportFile = async (name, dataUri) => {
    const blob = await fetch(dataUri).then(r => r.blob());
    const a = document.createElement("a");
    a.style.display = "none";
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

export {
    parsePropsOrFn,
    parseIntOrDefault,
    parseFloatOrDefault,
    getSimpleReducer,
    maxValue,
    extractUnique,
    findLayers,
    findLayerIndexes,
    layerFilterToFunction,
    propsOrCallbackToFunction,
    transformsListToString,
    getExternalScriptsStringAsync,
    copyToClipboard,
    stageToContainerCoordinates,
    containerToStageCoordinates,
    showUploadDialogAsync,
    exportFile
};