import React, { useCallback, useState } from "react";
import { useConfigurationFormContext } from "./ConfigurationFormContext.jsx";
import { InputGroup, Tag } from "@blueprintjs/core";

const TextBoxEditor = ({ parameter }) => {
    const [value, onValueChanged] = useConfigurationFormContext(parameter);
    const [localTextValue, setLocalTextValue] = useState();

    const onFocus = useCallback((evt) => {
        setLocalTextValue(evt.target.value);
    }, []);

    const onChange = useCallback((evt) => {
        setLocalTextValue(evt.target.value);
    }, []);

    const onBlur = useCallback((evt) => {
        setLocalTextValue(null);

        let value = evt.target.value;
        if (parameter.type == "number") {
            // parse as float
            value = parseFloat(value);
            if (isNaN(value)) { return; }
        }

        onValueChanged(parameter, value, true);
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
            onValueChanged(parameter, calcNewValue(evt), false);
        };

        const onMouseUp = evt => {
            onValueChanged(parameter, calcNewValue(evt), true);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }, []);

    let rightElement;
    if (parameter.tag)
        rightElement = <Tag minimal={true} onMouseDown={parameter.type == "number" ? onNumberMouseDown : null}>{parameter.tag}</Tag>;
        
    return (
        <InputGroup
            value={localTextValue != null ? localTextValue : value}
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