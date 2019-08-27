import React from "react";
import { Button, ButtonGroup, InputGroup, ControlGroup, Popover, HTMLSelect } from "@blueprintjs/core";
import { SketchPicker } from 'react-color'
import builtinFonts from '../shared/fonts-builtin.js';
import googleFonts from '../shared/fonts-google.js';
import './FontStyleEditor.css';

export default class FontStyleEditor extends React.Component {

    static RGBA_COLOR_REGEX = /^rgba\((\d+),(\d+),(\d+),(\d*(?:\.\d+)?)\)$/i;

    _fontOptions;

    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(this.props.value);

        this._fontOptions = [];
        for(let font of builtinFonts) { this._fontOptions.push({ label: font, value: font }); }
        for(let font of googleFonts) { this._fontOptions.push({ label: font, value: font }); }
    }

    componentDidUpdate() {
        if (this.state.initialValue != this.props.value) {
            this.setState(this.getStateFromProps(this.props.value));
        }
    }

    getStateFromProps(value) {
        let sourceValue = value || {};
        return {
            initialValue: value,
            value: {
                "fontFamily": sourceValue["fontFamily"] || "",
                "fontSize": sourceValue["fontSize"] || "",
                "color": sourceValue["color"] || "",
                "fontWeight": sourceValue["fontWeight"] || "",
                "fontStyle": sourceValue["fontStyle"] || "",
                "textDecoration": sourceValue["textDecoration"] || "",
                "textAlign": sourceValue["textAlign"] || ""
            }
        };
    }

    onFontFamilyChanged = evt => {
        this.onValueChanged({
            "fontFamily": evt.target.value
        }, true, true);
    }

    onFontSizeChanged = evt => {
        this.onValueChanged({
            "fontSize": evt.target.value
        }, false, false);
    }

    onFontSizeBlurred = evt => {
        let value = evt.target.value;
        if (!value.match(/[0-9]+(pt|px|em)/)) {
            // extract numbers and assume they mean points
            value = value.replace(/^[0-9]\./g, '') + "pt";
        }
        this.onValueChanged({
            "fontSize": value
        }, true, true);
    }

    onFontColorChanged = color => {
        this.onValueChanged({
            "color": `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
        }, true, false);
    }

    onFontColorCommitted = color => {
        this.onValueChanged({
            "color": `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
        }, true, true);
    }

    onBoldToggled = evt => {
        this.onValueChanged({
            "fontWeight": (this.state.value["fontWeight"] != "bold" ? "bold" : "")
        }, true, true);
    }

    onItalicToggled = evt => {
        this.onValueChanged({
            "fontStyle": (this.state.value["fontStyle"] != "italic" ? "italic" : "")
        }, true, true);
    }

    onUnderlineToggled = evt => {
        this.onValueChanged({
            "textDecoration": (this.state.value["textDecoration"] != "underline" ? "underline" : "")
        }, true, true);
    }

    onTextAlignToggled = (evt) => {
        let alignValue = evt.target.getAttribute("alignvalue");
        this.onValueChanged({
            "textAlign": (this.state.value["textAlign"] != alignValue ? alignValue : "")
        }, true, true);
    }

    onValueChanged(newValues, emitChange, createUndoEntry) {
        this.setState(prevState => {
            let newValue = Object.assign({}, prevState.value, newValues);
            return { value: newValue };
        },
        () => {
            if (emitChange)
                this.props.onChange(this.props.param, this.state.value, createUndoEntry);
        });
    }

    onTextKeyDown = evt => {
        if (evt.key == "Enter") {
            evt.preventDefault();
            evt.target.blur();
        }
    }

    parseColor = colorString => {
        
        let match = colorString.match(FontStyleEditor.RGBA_COLOR_REGEX);
        if (!match)
            return "";

        return { 
            r: match[1],
            g: match[2],
            b: match[3],
            a: match[4]
        };
    }

    render() {
        return (
            <div className="font-style-editor">
                <ControlGroup fill={true}>
                    <HTMLSelect value={this.state.value["fontFamily"]} onChange={this.onFontFamilyChanged} options={this._fontOptions} className="font-family" fill={true} />
                    <InputGroup type="text" value={this.state.value["fontSize"]} onChange={this.onFontSizeChanged} onBlur={this.onFontSizeBlurred} onKeyDown={this.onTextKeyDown} className="font-size" />
                    <Popover>
                        <Button className="font-color" style={{ "backgroundColor": this.state.value["color"] }} text="" />
                        <SketchPicker color={this.parseColor(this.state.value["color"])} onChange={this.onFontColorChanged} onChangeComplete={this.onFontColorCommitted} />
                    </Popover>
                </ControlGroup>
                <ButtonGroup fill={true}>
                    <Button className="toggle-bold" active={this.state.value["fontWeight"] == "bold"} onClick={this.onBoldToggled}>B</Button>
                    <Button className="toggle-italic" active={this.state.value["fontStyle"] == "italic"} onClick={this.onItalicToggled}>I</Button>
                    <Button className="toggle-underline" active={this.state.value["textDecoration"] == "underline"} onClick={this.onUnderlineToggled}>U</Button>
                    <Button className="toggle-align-left" active={this.state.value["textAlign"] == "left"} alignvalue="left" onClick={this.onTextAlignToggled}></Button>
                    <Button className="toggle-align-center" active={this.state.value["textAlign"] == "center"} alignvalue="center" onClick={this.onTextAlignToggled}></Button>
                    <Button className="toggle-align-right" active={this.state.value["textAlign"] == "right"} alignvalue="right" onClick={this.onTextAlignToggled}></Button>
                </ButtonGroup>
            </div>
        );

        //<InputGroup type="color" value={this.state.value["color"]} onChange={this.onFontColorChanged} />
    }
}