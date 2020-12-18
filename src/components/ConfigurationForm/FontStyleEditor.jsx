import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button, ButtonGroup, InputGroup, ControlGroup, Popover, HTMLSelect, Switch, Tag } from "@blueprintjs/core";
import { SketchPicker } from 'react-color';
import FontLoader from "../../shared/FontLoader.js";
import { useConfigurationFormContext } from "./ConfigurationFormContext.jsx";
import './FontStyleEditor.css';

const justifyContentToTextAlign = (justifyContent) => {
    switch (justifyContent) {
        case "flex-start": return "left";
        case "flex-end": return "right";
        case "center": return "center";
        default: return null;
    }
}

const RGBA_COLOR_REGEX = /^rgba\((\d+),(\d+),(\d+),(\d*(?:\.\d+)?)\)$/i;
const parseColor = (colorString) => {
    const match = colorString.match(RGBA_COLOR_REGEX);
    if (!match)
        return "";
    else
        return {  r: match[1], g: match[2], b: match[3], a: match[4] };
}

const FontStyleEditor = ({ parameter }) => {
    const [value, onValueChanged] = useConfigurationFormContext(parameter);
    const [fontSizeTextOverride, setFontSizeTextOverride] = useState();

    // use a ref for value to keep from redefining all the callbacks
    const valueRef = useRef(value);
    useEffect(() => { valueRef.current = value; }, [value]);

    const onFontFamilyChanged = useCallback(evt => {
        onValueChanged(parameter, { ...valueRef.current, "fontFamily": evt.target.value }, true);
    }, []);

    const onFontSizeChanged = useCallback(evt => {
        setFontSizeTextOverride(evt.target.value);
    }, []);

    const onFontSizeBlurred = useCallback(evt => {
        let value = evt.target.value;
        // extract numbers and assume they mean points
        if (!value.match(/[0-9]+(pt|px|em)/))
            value = value.replace(/^[0-9]\./g, '') + "pt";
        onValueChanged(parameter, { ...valueRef.current, "fontSize": value }, true);
        setFontSizeTextOverride(null);
    }, []);

    const onFontSizeKeyDown = useCallback(evt => {
        if (evt.key == "Enter") {
            evt.preventDefault();
            evt.target.blur();
        }
    }, []);

    const onFontSizeMouseDown = useCallback(evt => {
        const inputText = evt.target.closest(".font-size").querySelector("input").value;
        const originY = evt.clientY;
        const originalValue = parseInt(inputText);
        if (isNaN(originalValue))
            return;

        let lastValue = inputText;

        const onFontSizeMouseMove = evt => {
            const invertedDeltaY = originY - evt.clientY;
            const newSize = Math.max(1, originalValue + invertedDeltaY);
            lastValue = newSize.toString() + "px";
            onValueChanged(parameter, { ...valueRef.current, "fontSize": lastValue }, false);
        };

        const onFontSizeMouseUp = evt => {
            onValueChanged(parameter, { ...valueRef.current, "fontSize": lastValue }, true);
            window.removeEventListener("mousemove", onFontSizeMouseMove);
            window.removeEventListener("mouseup", onFontSizeMouseUp);
        };

        window.addEventListener("mousemove", onFontSizeMouseMove);
        window.addEventListener("mouseup", onFontSizeMouseUp);
    }, []);

    const onFontColorChanged = useCallback(color => {
        onValueChanged(parameter, { ...valueRef.current, "color": `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})` }, false);
    }, []);

    const onFontColorCommitted = useCallback(color => {
        onValueChanged(parameter, { ...valueRef.current, "color": `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})` }, true);
    }, []);

    const onSetValue = useCallback((paramName, newValue) => {
        // justifyContent is special, also needs to set textAlign
        if (paramName == "justifyContent")
            onValueChanged(parameter, { ...valueRef.current, "justifyContent": newValue, "textAlign": justifyContentToTextAlign(newValue) }, true);
        else
            onValueChanged(parameter, { ...valueRef.current, [paramName]: newValue }, true);
    }, []);

    return (
        <div className="font-style-editor">
            <ControlGroup fill={true}>
                <HTMLSelect value={value["fontFamily"] || ""} onChange={onFontFamilyChanged} options={FontLoader.GetFontNames()} className="font-family" fill={true} />
                <InputGroup fill={true} type="text" value={fontSizeTextOverride || value["fontSize"] || ""} rightElement={<Tag minimal={true} onMouseDown={onFontSizeMouseDown}>px</Tag>} onChange={onFontSizeChanged} onBlur={onFontSizeBlurred} onKeyDown={onFontSizeKeyDown} className="font-size" />
                <Popover boundary="window" className="font-color">
                    <Button className="font-color" style={{ "backgroundColor":value["color"] }} text="" />
                    <SketchPicker color={parseColor(value["color"])} onChange={onFontColorChanged} onChangeComplete={onFontColorCommitted} />
                </Popover>
            </ControlGroup>
            <ButtonGroup fill={true} className="button-row-2">
                <Button icon="bold" active={value["fontWeight"] == "bold"} onClick={() => onSetValue("fontWeight", value["fontWeight"] == "bold" ? "DELETE" : "bold")}></Button>
                <Button icon="italic" active={value["fontStyle"] == "italic"} onClick={() => onSetValue("fontStyle", value["fontStyle"] == "italic" ? "DELETE" : "italic")}></Button>
                <Button icon="underline" active={value["textDecoration"] == "underline"} onClick={() => onSetValue("textDecoration", value["textDecoration"] == "underline" ? "DELETE" : "underline")}></Button>
                <Button icon="align-left" active={value["justifyContent"] == "flex-start"} onClick={() => onSetValue("justifyContent", value["justifyContent"] == "flex-start" ? "DELETE" : "flex-start")}></Button>
                <Button icon="align-center" active={value["justifyContent"] == "center"} onClick={() => onSetValue("justifyContent", value["justifyContent"] == "center" ? "DELETE" : "center")}></Button>
                <Button icon="align-right" active={value["justifyContent"] == "flex-end"} onClick={() => onSetValue("justifyContent", value["justifyContent"] == "flex-end" ? "DELETE" : "flex-end")}></Button>
            </ButtonGroup>
            <ButtonGroup fill={true}>
                <Switch checked={value["whiteSpace"] == "pre-wrap"} label="Text Wrap" onChange={() => onSetValue("whiteSpace", value["whiteSpace"] == "pre-wrap" ? "pre": "pre-wrap")} className="text-wrap" />
                <Button icon="alignment-top" active={value["alignItems"] == "flex-start"} onClick={() => onSetValue("alignItems", value["alignItems"] == "flex-start" ? "DELETE" : "flex-start")}></Button>
                <Button icon="alignment-horizontal-center" active={value["alignItems"] == "center"} onClick={() => onSetValue("alignItems", value["alignItems"] == "center" ? "DELETE" : "center")}></Button>
                <Button icon="alignment-bottom" active={value["alignItems"] == "flex-end"} onClick={() => onSetValue("alignItems", value["alignItems"] == "flex-end" ? "DELETE" : "flex-end")}></Button>
            </ButtonGroup>
        </div>
    );
}

export default FontStyleEditor;