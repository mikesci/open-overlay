import React, { useCallback, useState } from "react";
import { useConfigurationFormContext } from "./ConfigurationFormContext.jsx";
import { TextArea } from "@blueprintjs/core";

const TextAreaEditor = ({ parameter }) => {
    const [value, onValueChanged] = useConfigurationFormContext(parameter);
    const [localTextValue, setLocalTextValue] = useState();

    const onFocus = useCallback((evt) => {
        setLocalTextValue(evt.target.value);
    }, []);

    const onChange = useCallback((evt) => {
        setLocalTextValue(evt.target.value);
    }, []);

    const onBlur = useCallback((evt) => {
        onValueChanged(parameter, evt.target.value, true);
        setLocalTextValue(null);
    }, []);
    
    return (
        <TextArea
            value={localTextValue != null ? localTextValue : value}
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
            fill={true}
            growVertically={true}
            />
    );
};

export default TextAreaEditor;