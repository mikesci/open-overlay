import React, { useCallback } from "react";
import { Slider } from "@blueprintjs/core";
import { useConfigurationFormContext } from "./ConfigurationFormContext.jsx";

const SliderEditor = ({ parameter }) => {
    const [value, onValueChanged] = useConfigurationFormContext(parameter);

    const onChange = useCallback((sliderValue) => {
        onValueChanged(parameter, sliderValue, false);
    }, []);

    const onRelease = useCallback((sliderValue) => {
        onValueChanged(parameter, sliderValue, true);
    }, []);

    return (
        <Slider value={value}
            onChange={onChange}
            onRelease={onRelease}
            min={parameter.min || 0}
            max={parameter.max || 100}
            stepSize={parameter.step}
            labelStepSize={parameter.labelStepSize || ((parameter.max || 100) / 2)} />
    );
};


export default SliderEditor;