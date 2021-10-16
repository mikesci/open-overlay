import React, { useCallback, useRef, useState } from "react";
import { InputGroup, Tag } from "@blueprintjs/core";

const DraggableNumberInput = ({ value, unit, immediate = true, step = 1, min, max, onChange, ...props }) => {
    const [localTextValue, setLocalTextValue] = useState();
    const inputRef = useRef();

    const onFocus = useCallback((evt) => {
        setLocalTextValue(evt.target.value);
    }, []);

    const onTextChanged = useCallback((evt) => {
        const value = evt.target.value;
        setLocalTextValue(value);
        if (immediate)
            onChange(value, false);
    }, [immediate, onChange]);

    const onBlur = useCallback((evt) => {
        setLocalTextValue(null);

        const value = parseFloat(evt.target.value);
        if (isNaN(value))
            return;

        onChange(value, true);
    }, [onChange]);

    const onUnitMouseDown = useCallback(evt => {
        
        const originY = evt.clientY;
        const target = inputRef.current;
        const originalValue = parseFloat(target.value);

        const calcNewValue = (evt) => {
            let newValue = originalValue + ((originY - evt.clientY) * (evt.ctrlKey ? 5 : 1) * step);
            // clamp to min/max if provided
            if (min !== undefined) { newValue = Math.max(min, newValue); }
            if (max !== undefined) { newValue = Math.min(max, newValue); }
            return newValue;
        };

        const onMouseMove = evt => {
            const newValue = calcNewValue(evt);
            setLocalTextValue(newValue);
            if (immediate)
                onChange(newValue, false);
        };

        const onMouseUp = evt => {
            setLocalTextValue(null);
            onChange(calcNewValue(evt), true);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }, [immediate, step, onChange]);

    const onFontSizeKeyDown = useCallback(evt => {
        if (evt.key == "Enter") {
            evt.preventDefault();
            evt.target.blur();
        }
    }, []);
        
    let textValue = (localTextValue != null ? localTextValue : value);
    if (textValue == null) { textValue = ""; }

    const rightElement = <Tag minimal={true} onMouseDown={onUnitMouseDown} style={{ cursor: "ns-resize" }}>{unit}</Tag>;

    return (
        <InputGroup
            {...props}
            value={textValue}
            inputRef={inputRef}
            type="number"
            onFocus={onFocus}
            onChange={onTextChanged}
            onBlur={onBlur}
            onKeyDown={onFontSizeKeyDown}
            rightElement={rightElement} />
    );
};

export default DraggableNumberInput;