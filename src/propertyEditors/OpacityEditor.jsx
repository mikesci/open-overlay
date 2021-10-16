import React from "react";
import useCustomPropertyEditorComponent from "./useCustomPropertyEditorComponent.js";

const config = {
    label: "Opacity",
    configFormParameters: [
        { name: "amount", type: "slider", min: 0, max: 100, immediate: true }
    ],
    canDelete: ({ opacity }) => {
        return (opacity != undefined);
    },
    mapPropsFromLayer: ({ opacity }) => {
        if (opacity === undefined)
            return { amount: 100 };
        else
            return { amount: parseFloat(opacity) * 100 };
    },
    mapPropsToLayer: ({ amount }) => {
        if (amount == undefined)
            return { opacity: undefined };
        else
            return { opacity: `${amount/100}` };
    }
};

const OpacityEditor = (props) => {
    const EditorComponent = useCustomPropertyEditorComponent(config);
    return <EditorComponent {...props} />;
};

export default OpacityEditor;