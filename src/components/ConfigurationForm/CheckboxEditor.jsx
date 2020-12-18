import React, { useCallback } from "react";
import { useConfigurationFormContext } from "./ConfigurationFormContext.jsx";
import { Switch } from "@blueprintjs/core";

const CheckboxEditor = ({ parameter }) => {
    const [value, onValueChanged] = useConfigurationFormContext(parameter);

    const onChange = useCallback((evt) => {
        onValueChanged(parameter, evt.target.checked, true);
    }, []);
    
    return (
        <Switch checked={value} onChange={onChange} label={parameter.compact != false ? parameter.displayName : null} />
    );
};

export default CheckboxEditor;