import React from "react";
import useCustomPropertyEditorComponent from "./useCustomPropertyEditorComponent.js";

const config = {
    label: "Auto Fit",
    configFormParameters: [
        { type: "group", items: [
            { name: "fit", type: "select", defaultValue: "fill", width: 30, options: [
                { label: "Fill", value: "fill" },
                { label: "Contain", value: "contain" },
                { label: "Cover", value: "cover" }
            ]},
            { name: "position", tag: "Pos.", type: "text", width: 70 }
        ]}
    ],
    canDelete: ({ objectFit, objectPosition }) => {
        return (objectFit != undefined || objectPosition != undefined);
    },
    mapPropsFromLayer: ({ objectFit, objectPosition }) => {
        return {
            fit: objectFit || "fill",
            position: objectPosition || "center center"
        };
    },
    mapPropsToLayer: ({ fit, position }) => {
        return {
            objectFit: fit,
            objectPosition: position
        };
    }
};

const AutoFitEditor = (props) => {
    const EditorComponent = useCustomPropertyEditorComponent(config);
    return <EditorComponent {...props} />;
};

export default AutoFitEditor;