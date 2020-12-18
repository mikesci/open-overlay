import React, { useCallback, useState } from "react";
import { useConfigurationFormContext } from "./ConfigurationFormContext.jsx";
import { HTMLSelect } from "@blueprintjs/core";

const SelectEditor = ({ parameter }) => {
    const [value, onValueChanged] = useConfigurationFormContext(parameter);
    const optionsAreDynamic = (typeof parameter.options === "function");
    const [dynamicOptions, setDynamicOptions] = useState(() => optionsAreDynamic ? [] : null);

    if (optionsAreDynamic)
        Promise.resolve(parameter.options()).then(setDynamicOptions);

    const onChange = useCallback((evt) => {
        onValueChanged(parameter, evt.target.value, true);
    }, []);

    return (<HTMLSelect value={value} onChange={onChange} fill={true} options={dynamicOptions || parameter.options} />);
};


export default SelectEditor;