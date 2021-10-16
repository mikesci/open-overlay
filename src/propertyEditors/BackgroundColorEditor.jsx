import React from "react";
import useCustomPropertyEditorComponent from "./useCustomPropertyEditorComponent.js";

const config = {
    label: "Background",
    permanent: false,
    configFormParameters: [
        { name: "backgroundColor", type: "color", displayName: null }
    ],
    canDelete: ({ backgroundColor }) => {
        return (backgroundColor != undefined);
    },
    mapPropsFromLayer: ({ backgroundColor }) => ({ backgroundColor }),
    mapPropsToLayer: ({ backgroundColor }) => ({ backgroundColor })
};

const BackgroundColorEditor = (props) => {
    const EditorComponent = useCustomPropertyEditorComponent(config);
    return <EditorComponent {...props} />;
};

export default BackgroundColorEditor;