import React, { useCallback, useState } from "react";
import { Button, Popover } from "@blueprintjs/core";
import { SketchPicker } from 'react-color'
import { useConfigurationFormContext } from "../shared/ConfigurationFormContext.js";

const toHex = (val) => {
    const rval = val.toString(16);
    return (rval.length == 1 ? "0" + rval : rval);
}

const rgbaObjectToHexString = (rgba) => {
    return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}${toHex(Math.floor(rgba.a * 255))}`;
}

const ColorEditor = ({ parameter }) => {
    const [value, context] = useConfigurationFormContext(parameter);
    const [localValue, setLocalValue] = useState(null);

    const onChange = useCallback((color) => {
        const newVal = rgbaObjectToHexString(color.rgb);
        setLocalValue(newVal);
        if (parameter.immediate)
            context.onParameterValueChanged(parameter, newVal, false);
    }, []);

    const onChangeComplete = useCallback((color) => {
        setLocalValue(null);
        context.onParameterValueChanged(parameter, rgbaObjectToHexString(color.rgb), true);
    }, []);

    const renderValue = (localValue !== null ? localValue : value);

    return (
        <Popover boundary="window">
            <Button style={{ "backgroundColor": renderValue }} text="" />
            <SketchPicker color={renderValue} onChange={onChange} onChangeComplete={onChangeComplete} />
        </Popover>
    );
};


export default ColorEditor;