import { Button } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { useCallback, useMemo } from "react";
import { SketchPicker } from "react-color";

const RGBA_COLOR_REGEX = /^rgba\((\d+),(\d+),(\d+),(\d*(?:\.\d+)?)\)$/i;

const cssColorStringToObject = (cssColorString) => {
    const match = cssColorString.match(RGBA_COLOR_REGEX);
    if (!match)
        return { r: 0, g: 0, b: 0, a: 0 };
    return {  r: match[1], g: match[2], b: match[3], a: match[4] };
}

const objectToCssString = (colorObject) => {
    return `rgba(${colorObject.rgb.r},${colorObject.rgb.g},${colorObject.rgb.b},${colorObject.rgb.a})`;
}

const FontColorInput = ({ value, onChanged, ...props }) => {

    const colorObject = useMemo(() => cssColorStringToObject(value), [value]);

    const onFontColorChanged = useCallback(color => {
        onChanged(objectToCssString(color), false); // (value, commit)
    }, [onChanged]);

    const onFontColorCommitted = useCallback(color => {
        onChanged(objectToCssString(color), true); // (value, commit)
    }, [onChanged]);

    const colorPicker = (
        <SketchPicker color={colorObject} onChange={onFontColorChanged} onChangeComplete={onFontColorCommitted} />
    );

    return (
        <Popover2 boundary="window" {...props} content={colorPicker}>
            <Button fill={true} style={{ "backgroundColor": value }} text="" />
        </Popover2>
    );

};

export default FontColorInput;