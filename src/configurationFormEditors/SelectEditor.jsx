import React, { useCallback, useEffect, useState } from "react";
import { useConfigurationFormContext } from "../shared/ConfigurationFormContext.js";
import { HTMLSelect } from "@blueprintjs/core";
import useDynamicOptions from "./useDynamicOptions.js";

const SelectEditor = ({ parameter }) => {
    const [value, context] = useConfigurationFormContext(parameter);
    const options = useDynamicOptions(parameter.options);

    const onChange = useCallback((evt) => {
        context.onParameterValueChanged(parameter, evt.target.value, true);
    }, []);

    return (<HTMLSelect value={value} onChange={onChange} fill={true} options={options} />);
};


export default SelectEditor;