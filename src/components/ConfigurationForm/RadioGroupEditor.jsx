import { Radio, RadioGroup } from "@blueprintjs/core";
import React, { useCallback, useState } from "react";
import { useConfigurationFormContext } from "./ConfigurationFormContext.jsx";

const RadioGroupEditor = ({ parameter }) => {
    const [value, onValueChanged] = useConfigurationFormContext(parameter);
    const optionsAreDynamic = (typeof parameter.options === "function");
    const [dynamicOptions, setDynamicOptions] = useState(() => optionsAreDynamic ? [] : null);

    if (optionsAreDynamic)
        Promise.resolve(parameter.options()).then(setDynamicOptions);

    const onChange = useCallback((evt) => {
        onValueChanged(parameter, evt.target.value, true);
    }, []);

    const options = dynamicOptions || parameter.options || [];
    
    return (
        <RadioGroup selectedValue={value} onChange={onChange}>
            {options.map(option => (<Radio key={option.value} label={option.label} value={option.value}  />))}
        </RadioGroup>
    );
};

export default RadioGroupEditor;