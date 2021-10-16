import React from "react";
import useCustomPropertyEditorComponent from "./useCustomPropertyEditorComponent.js";

const ConfigurationFormEditor = ({ options, onHandleUpload, onPropertiesChanged, onCommand, layerDOM, layer }) => {
    const CustomComponent = useCustomPropertyEditorComponent(options);
    return <CustomComponent onHandleUpload={onHandleUpload} onPropertiesChanged={onPropertiesChanged} onCommand={onCommand} layerDOM={layerDOM} layer={layer} />;
};

export default ConfigurationFormEditor;