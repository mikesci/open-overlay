import React, { useCallback } from "react";
import { useConfigurationFormContext } from "../shared/ConfigurationFormContext.js";
import { Switch } from "@blueprintjs/core";

const CheckboxEditor = ({ parameter }) => {
    const [value, context] = useConfigurationFormContext(parameter);

    const onChange = useCallback((evt) => {
        context.onParameterValueChanged(parameter, evt.target.checked, true);
    }, []);
    
    return (
        <Switch checked={value} onChange={onChange} label={parameter.compact != false ? parameter.displayName : null} />
    );
};

export default CheckboxEditor;