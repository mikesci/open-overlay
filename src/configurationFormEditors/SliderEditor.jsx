import React, { useCallback, useState } from "react";
import { Slider } from "@blueprintjs/core";
import { useConfigurationFormContext } from "../shared/ConfigurationFormContext.js";

const parseFloatOrNull = (str) => {
    const float = parseFloat(str);
    return (isNaN(float) ? null : float);
}

const SliderEditor = ({ parameter }) => {
    const [value, context] = useConfigurationFormContext(parameter);
    const [localValue, setLocalValue] = useState(null);
    
    const onChange = useCallback((sliderValue) => {
        setLocalValue(sliderValue);
        if (parameter.immediate)
            context.onParameterValueChanged(parameter, sliderValue, false);
    }, []);

    const onRelease = useCallback((sliderValue) => {
        setLocalValue(null);
        context.onParameterValueChanged(parameter, sliderValue, true);
    }, []);

    const renderValue = (localValue !== null ? localValue : value);

    return (
        <Slider value={renderValue}
            onChange={onChange}
            onRelease={onRelease}
            min={parameter.min || 0}
            max={parameter.max || 100}
            stepSize={parameter.step}
            labelStepSize={parameter.labelStepSize || ((parameter.max || 100) / 2)} />
    );
};


export default SliderEditor;