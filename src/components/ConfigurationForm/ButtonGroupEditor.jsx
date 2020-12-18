import { Button, ButtonGroup } from "@blueprintjs/core";
import React, { useCallback } from "react";
import { useConfigurationFormContext } from "./ConfigurationFormContext.jsx";
import useDynamicOptions from "./useDynamicOptions.js";

const ButtonGroupEditor = ({ parameter }) => {
    const [value, onValueChanged] = useConfigurationFormContext(parameter);
    const options = useDynamicOptions(parameter.options);

    const onChange = useCallback((evt) => {
        onValueChanged(parameter, evt.target.value, true);
    }, []);
    
    return (
        <ButtonGroup>
            {options.map(option => (
                <Button text={option.label} key={option.value} active={value == option.value} onClick={() => onChange(option.value)} />
            ))}
        </ButtonGroup>
    );
};

export default ButtonGroupEditor;