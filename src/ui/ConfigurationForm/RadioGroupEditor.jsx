import { Radio, RadioGroup } from "@blueprintjs/core";
import React, { useCallback, useEffect, useState } from "react";
import { useConfigurationFormContext } from "./ConfigurationFormContext.jsx";
import useDynamicOptions from "./useDynamicOptions.js";

const RadioGroupEditor = ({ parameter }) => {
    const [value, onValueChanged] = useConfigurationFormContext(parameter);
    const options = useDynamicOptions(parameter.options);

    const onChange = useCallback((evt) => {
        onValueChanged(parameter, evt.target.value, true);
    }, []);
    
    return (
        <RadioGroup selectedValue={value} onChange={onChange}>
            {options.map(option => (<Radio key={option.value} label={option.label} value={option.value}  />))}
        </RadioGroup>
    );
};

export default RadioGroupEditor;