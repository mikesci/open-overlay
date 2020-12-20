import React, { useCallback } from "react";
import { Button, Popover } from "@blueprintjs/core";
import { SketchPicker } from 'react-color'
import { useConfigurationFormContext } from "./ConfigurationFormContext.jsx";

const toHex = (val) => {
    const rval = val.toString(16);
    return (rval.length == 1 ? "0" + rval : rval);
}

const rgbaObjectToHexString = (rgba) => {
    return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}${toHex(Math.floor(rgba.a * 255))}`;
}

const ColorEditor = ({ parameter }) => {
    const [value, onValueChanged] = useConfigurationFormContext(parameter);

    const onChange = useCallback((color) => {
        onValueChanged(parameter, rgbaObjectToHexString(color.rgb), false);
    }, []);

    const onChangeComplete = useCallback((color) => {
        onValueChanged(parameter, rgbaObjectToHexString(color.rgb), true);
    }, []);

    return (
        <Popover boundary="window">
            <Button style={{ "backgroundColor": value }} text="" />
            <SketchPicker color={value} onChange={onChange} onChangeComplete={onChangeComplete} />
        </Popover>
    );
};


export default ColorEditor;