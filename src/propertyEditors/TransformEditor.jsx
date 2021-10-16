import React from "react";
import useCustomPropertyEditorComponent from "./useCustomPropertyEditorComponent.js";

const TRANSFORM_REGEXP = /(perspective|translate3d|rotate3d|scale)\(([^,\)]+)(?:,\s*([^,\)]+))?(?:,\s*([^,\)]+))?(?:,\s*([^,\)]+))?\)/g;

const config = {
    label: "3D Transform",
    configFormParameters: [
        { type: "group", displayName: "Transform", items: [
            { name: "tx", type: "number", width: 33.333, tag: "X", immediate: true },
            { name: "ty", type: "number", width: 33.333, tag: "Y", immediate: true },
            { name: "tz", type: "number", width: 33.333, tag: "Z", immediate: true }
        ]},
        { type: "group", displayName: "Rotate", items: [
            { name: "rx", type: "angle", width: 33.333, tag: "X \u00B0", immediate: true },
            { name: "ry", type: "angle", width: 33.333, tag: "Y \u00B0", immediate: true },
            { name: "rz", type: "angle", width: 33.333, tag: "Z \u00B0", immediate: true }
        ]},
        { type: "group",  items: [
            { name: "sx", type: "number", displayName: "Scale X", width: 33.333, tag: "%", min: 0, step: 5, immediate: true },
            { name: "sy", type: "number", displayName: "Scale Y", width: 33.333, tag: "%", min: 0, step: 5, immediate: true },
            { name: "perspective", type: "number", displayName: "Perspective", width: 33.333, tag: "px", min: 0, immediate: true }
        ]}
    ],
    canDelete: ({ transform }) => {
        return (transform != undefined);
    },
    mapPropsFromLayer: ({ transform }) => {
        let transformObj = {
            perspective: 0,
            tx: 0,
            ty: 0,
            tz: 0,
            rx: 0,
            ry: 0,
            rz: 0,
            sx: 100,
            sy: 100
        };
        const matches = (transform ? transform.matchAll(TRANSFORM_REGEXP) : null);
        if (!matches)
            return transformObj;

        for(const match of matches) {
            switch (match[1]) {
                case "perspective": transformObj.perspective = parseFloat(match[2]); break;
                case "translate3d":
                    transformObj.tx = parseFloat(match[2]);
                    transformObj.ty = parseFloat(match[3]);
                    transformObj.tz = parseFloat(match[4]);
                    break;
                case "rotate3d":
                    if (match[2] == "1" && match[3] == "0" && match[4] == "0") { transformObj.rx = parseFloat(match[5]); }
                    if (match[2] == "0" && match[3] == "1" && match[4] == "0") { transformObj.ry = parseFloat(match[5]); }
                    if (match[2] == "0" && match[3] == "0" && match[4] == "1") { transformObj.rz = parseFloat(match[5]); }
                    break;
                case "scale":
                    transformObj.sx = parseFloat(match[2]) * 100;
                    transformObj.sy = parseFloat(match[3]) * 100;
                    break;
                default:
                    break;
            }
        }

        return transformObj;
    },
    mapPropsToLayer: ({ perspective, tx, ty, tz, rx, ry, rz, sx, sy }) => {
        if (perspective === undefined && tx === undefined && ty === undefined && tz === undefined && ry === undefined && rz === undefined && sx === undefined && sy === undefined)
            return { transform: undefined };

        let transformString = "";
        if (perspective != 0) { transformString += `perspective(${perspective}px) `; }
        if (tx != 0 || ty != 0 || tz != 0) { transformString += `translate3d(${tx}px, ${ty}px, ${tz}px) `; }
        if (rx != 0) { transformString += `rotate3d(1, 0, 0, ${rx}deg) `; }
        if (ry != 0) { transformString += `rotate3d(0, 1, 0, ${ry}deg) `; }
        if (rz != 0) { transformString += `rotate3d(0, 0, 1, ${rz}deg) `; }
        if (sx != 100 || sy != 100) { transformString += `scale(${sx/100}, ${sy/100})`; }
        return { transform: transformString };
    }
}

const TransformEditor = (props) => {
    const EditorComponent = useCustomPropertyEditorComponent(config);
    return <EditorComponent {...props} />;
};

export default TransformEditor;