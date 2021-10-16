import React from "react";
import useCustomPropertyEditorComponent from "./useCustomPropertyEditorComponent.js";

const BOX_SHADOW_REGEXP = /(rgba?\([\. ,0-9]+\)|(?:#[0-9A-Fa-f]{3,8})) (\-?[\.0-9]+)px (\-?[\.0-9]+)px (\-?[\.0-9]+)px(?: (\-?[\.0-9]+)px)?/;

const config = {
    label: "Shadow",
    configFormParameters: [
        { type: "group", items: [
            { name: "offsetx", type: "number", tag: "X", width: 25 },
            { name: "offsety", type: "number", tag: "Y", width: 25 },
            { name: "size", type: "number", tag: "Size", width: 35, min: 0, step: 0.5 },
            { name: "color", type: "color", width: 15 }
        ]}
    ],
    canDelete: ({ boxShadow }) => {
        return (boxShadow != undefined);
    },
    mapPropsFromLayer: ({ boxShadow }) => {
        const matches = (boxShadow ? boxShadow.match(BOX_SHADOW_REGEXP) : null);
        if (!matches)
            return { color: "#000000", offsetx: 0, offsety: 0, size: 0 };
        return {
            color: matches[1],
            offsetx: parseFloat(matches[2]),
            offsety: parseFloat(matches[3]),
            size: parseFloat(matches[4])
        };
    },
    mapPropsToLayer: ({ color, offsetx, offsety, size }) => {
        if (!color && !offsetx && !offsety && !size)
            return { boxShadow: undefined };
            
        return {  boxShadow: `${color} ${offsetx}px ${offsety}px ${size}px` };
    }
};

const ShadowEditor = (props) => {
    const EditorComponent = useCustomPropertyEditorComponent(config);
    return <EditorComponent {...props} />;
};

export default ShadowEditor;