import { Button } from "@blueprintjs/core";
import React, { useCallback } from "react";
import { useConfigurationFormContext } from "../shared/ConfigurationFormContext.js";

const ButtonEditor = ({ parameter }) => {
    const [value, context] = useConfigurationFormContext(parameter);

    const onClick = useCallback((evt) => {
        context.onCommandRequested(parameter.command, parameter.commandArg);
    }, [parameter.command, parameter.commandArg]);
    
    return (
        <Button icon={parameter.icon} text={parameter.label} onClick={onClick} />
    );
};

export default ButtonEditor;