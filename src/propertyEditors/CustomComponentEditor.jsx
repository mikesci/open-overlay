import React from "react";
import CollapsiblePanel from "../ui/CollapsiblePanel.jsx";

const CustomComponentEditor = ({ elementEditors, options, onHandleUpload, onPropertiesChanged, onCommand, layerDOM, layer }) => {

    // look up the component in elementEditors
    const ElementEditor = elementEditors[options.elementEditor];

    if (!ElementEditor) {
        console.error("No such elementEditor: " + options.elementEditor);
        return null;
    }


    return (
        <CollapsiblePanel label={options.label} defaultIsOpen={true}>
            <ElementEditor options={options} onHandleUpload={onHandleUpload} onPropertiesChanged={onPropertiesChanged} onCommand={onCommand} layerDOM={layerDOM} layer={layer} />
        </CollapsiblePanel>
    );
};

export default CustomComponentEditor;