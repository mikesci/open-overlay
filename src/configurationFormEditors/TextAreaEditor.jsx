import React, { useCallback, useState } from "react";
import { useConfigurationFormContext } from "../shared/ConfigurationFormContext.js";
import { TextArea } from "@blueprintjs/core";

const TextAreaEditor = ({ parameter, valueOverride }) => {
    const [value, context] = useConfigurationFormContext(parameter);
    const [localTextValue, setLocalTextValue] = useState();

    const onFocus = useCallback((evt) => {
        setLocalTextValue(evt.target.value);
    }, []);

    const onChange = useCallback((evt) => {
        setLocalTextValue(evt.target.value);
        if (parameter.immediate)
            context.onParameterValueChanged(parameter, evt.target.value, false);
    }, []);

    const onBlur = useCallback((evt) => {
        context.onParameterValueChanged(parameter, evt.target.value, true);
        setLocalTextValue(null);
    }, []);

    let textValue;
    if (localTextValue != null) { textValue = localTextValue; }
    else if (valueOverride != null) { textValue = valueOverride; }
    else if (value != null) { textValue = value; }
    else { textValue = ""; } // force controlled mode
    
    return (
        <TextArea
            value={textValue}
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
            fill={true}
            growVertically={true}
            />
    );
};

export default TextAreaEditor;