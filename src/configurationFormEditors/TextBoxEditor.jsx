import React, { useCallback, useState } from "react";
import { useConfigurationFormContext } from "../shared/ConfigurationFormContext.js";
import { InputGroup, Tag } from "@blueprintjs/core";

const TextBoxEditor = ({ parameter, valueOverride }) => {
    const [value, context] = useConfigurationFormContext(parameter);
    const [localTextValue, setLocalTextValue] = useState();

    const onFocus = useCallback((evt) => {
        setLocalTextValue(evt.target.value);
    }, []);

    const onChange = useCallback((evt) => {
        setLocalTextValue(evt.target.value);

        if (parameter.immediate)
            context.onParameterValueChanged(parameter, evt.target.value, false);
    }, []);

    const onBlur = useCallback((evt) => {
        setLocalTextValue(null);

        let value = evt.target.value;
        if (parameter.type == "number") {
            // parse as float
            value = parseFloat(value);
            if (isNaN(value)) { return; }
        }

        context.onParameterValueChanged(parameter, value, true);
    }, []);

    const onNumberMouseDown = useCallback(evt => {
        const target = evt.target.closest(".bp3-input-group").querySelector("input");
        const originY = evt.clientY;
        const originalValue = parseFloat(target.value);
        const step = parameter.step || 1;

        const calcNewValue = (evt) => {
            let newValue = originalValue + ((originY - evt.clientY) * (evt.ctrlKey ? 5 : 1) * step);

            // clamp to min/max if provided
            if (parameter.min !== undefined)
                newValue = Math.max(parameter.min, newValue);

            if (parameter.max !== undefined)
                newValue = Math.min(parameter.max, newValue);

            return newValue;
        };

        const onMouseMove = evt => {
            const newValue = calcNewValue(evt);
            setLocalTextValue(newValue);
            if (parameter.immediate)
                context.onParameterValueChanged(parameter, newValue, false);
        };

        const onMouseUp = evt => {
            setLocalTextValue(null);
            context.onParameterValueChanged(parameter, calcNewValue(evt), true);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }, []);

    let rightElement;
    if (parameter.tag)
        rightElement = <Tag minimal={true} onMouseDown={parameter.type == "number" ? onNumberMouseDown : null}>{parameter.tag}</Tag>;
        
    let textValue;
    if (localTextValue != null) { textValue = localTextValue; }
    else if (valueOverride != null) { textValue = valueOverride; }
    else if (value != null) { textValue = value; }
    else { textValue = ""; } // force controlled mode

    return (
        <InputGroup
            value={textValue}
            type={parameter.type}
            min={parameter.min}
            max={parameter.max}
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
            fill={true}
            rightElement={rightElement} />);
};

export default TextBoxEditor;