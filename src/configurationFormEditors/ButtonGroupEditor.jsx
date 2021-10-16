import { Button, ButtonGroup } from "@blueprintjs/core";
import React, { useCallback } from "react";
import { useConfigurationFormContext } from "../shared/ConfigurationFormContext.js";
import useDynamicOptions from "./useDynamicOptions.js";

const ButtonGroupEditor = ({ parameter }) => {
    const [value, context] = useConfigurationFormContext(parameter);
    const options = useDynamicOptions(parameter.options);

    const onChange = useCallback((value) => {
        context.onParameterValueChanged(parameter, value, true);
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