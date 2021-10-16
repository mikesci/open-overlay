import React, { useCallback, useMemo } from "react";
import { Button } from "@blueprintjs/core";
import ConfigurationForm from "../ui/ConfigurationForm.jsx";
import CollapsiblePanel from "../ui/CollapsiblePanel.jsx";

const useCustomPropertyEditorComponent = ({ label, permanent, configFormParameters, canDelete, mapPropsFromLayer, mapPropsToLayer }) => {

    return useMemo(() => {
        const updateWhenMappedPropertiesChange = (prevProps, nextProps) => {
            if (prevProps.onHandleUpload != nextProps.onHandleUpload) { return false; }
            if (prevProps.onCommand != nextProps.onCommand) { return false; }
            if (prevProps.onPropertiesChanged != nextProps.onPropertiesChanged) { return false; }
            if (!prevProps.layer || !nextProps.layer) { return false; }

            const lastLayerValues = mapPropsFromLayer(prevProps.layer);
            const nextLayerValyes = mapPropsFromLayer(nextProps.layer);
            for(const [propKey, propValue] of Object.entries(lastLayerValues)) {
                if (nextLayerValyes[propKey] != propValue) {
                    return false;
                }
            }
            return true;
        };

        const propertyEditorComponent = ({ onHandleUpload, onCommand, onPropertiesChanged, layer }) => {

            const onConfigFormParameterValuesChanged = useCallback((values, commit) => {
                const layerProps = mapPropsToLayer(values);
                onPropertiesChanged(layerProps, commit);
            }, [mapPropsToLayer, onPropertiesChanged]);
    
            const onDeleteClick = useCallback((evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                // delete all managed properties
                const layerProps = mapPropsToLayer({});
                onPropertiesChanged(layerProps, true);
            }, [configFormParameters, onPropertiesChanged]);
    
            const configFormParameterValues = mapPropsFromLayer(layer);
    
            let deleteButton;
            const deletable = (canDelete ? canDelete(layer) : false);
            if (deletable)
                deleteButton = <Button icon="trash" minimal={true} onClick={onDeleteClick} />;
    
            return (
                <div className="element-config-editor">
                    <CollapsiblePanel label={label || "Custom"} defaultIsOpen={permanent || deletable} rightElement={deleteButton}>
                        <ConfigurationForm
                            parameters={configFormParameters}
                            parameterValues={configFormParameterValues}
                            onParameterValuesChanged={onConfigFormParameterValuesChanged}
                            onCommand={onCommand}
                            onHandleUpload={onHandleUpload}
                            reportAllValues={true} />
                    </CollapsiblePanel>
                </div>
            )
        }

        return React.memo(propertyEditorComponent, updateWhenMappedPropertiesChange);

    }, [ label, permanent, configFormParameters, mapPropsFromLayer, mapPropsToLayer ]);
};

export default useCustomPropertyEditorComponent;