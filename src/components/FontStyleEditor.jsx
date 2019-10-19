import React from "react";
import { Button, ButtonGroup, InputGroup, ControlGroup, Popover, HTMLSelect } from "@blueprintjs/core";
import { SketchPicker } from 'react-color';
import './FontStyleEditor.css';

export default class FontStyleEditor extends React.Component {

    static RGBA_COLOR_REGEX = /^rgba\((\d+),(\d+),(\d+),(\d*(?:\.\d+)?)\)$/i;

    _fontSizeDragOrigin;

    constructor(props) {
        super(props);
        // props.fontLoader
        this.state = this.getStateFromProps(this.props.value);
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

    onFontSizeMouseDown = evt => {
        window.addEventListener("mousemove", this.onFontSizeMouseMove);
        window.addEventListener("mouseup", this.onFontSizeMouseUp);

        let originalValue, originalUnits;
        let matches = [...evt.target.value.matchAll(/([0-9]+)(pt|px|em)/)];
        if (matches.length == 0) {
            originalValue = 72;
            originalUnits = "pt";
        } else {
            originalValue = parseInt(matches[0][1]);
            originalUnits = matches[0][2];
        }

        this._fontSizeDragData = {
            originY: evt.clientY,
            originalValue: originalValue,
            originalUnits: originalUnits,
            value: evt.target.value
        };
    }

    onFontSizeMouseUp = evt => {
        if (this._fontSizeDragData)
            this.onValueChanged({ "fontSize": this._fontSizeDragData.value }, true, true);

        this._fontSizeDragData = null;
        window.removeEventListener("mousemove", this.onFontSizeMouseMove);
        window.removeEventListener("mouseup", this.onFontSizeMouseUp);
    }

    onFontSizeMouseMove = evt => {
        if (this._fontSizeDragData) {
            let invertedDeltaY = this._fontSizeDragData.originY - evt.clientY;
            let newSize = Math.max(0, this._fontSizeDragData.originalValue + invertedDeltaY);
            this._fontSizeDragData.value = newSize + this._fontSizeDragData.originalUnits;
            this.onValueChanged({
                "fontSize": this._fontSizeDragData.value
            }, true, false);
        }
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

    onTextAlignToggled = (align) => {
        this.onValueChanged({
            "textAlign": (this.state.value["textAlign"] != align ? align : "")
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

        let fontNames = (this.props.fontLoader ? this.props.fontLoader.GetFontNames() : []);

        return (
            <div className="font-style-editor">
                <ControlGroup fill={true}>
                    <HTMLSelect value={this.state.value["fontFamily"]} onChange={this.onFontFamilyChanged} options={fontNames} className="font-family" fill={true} />
                    <InputGroup type="text" value={this.state.value["fontSize"]} onChange={this.onFontSizeChanged} onBlur={this.onFontSizeBlurred} onKeyDown={this.onTextKeyDown} onMouseDown={this.onFontSizeMouseDown} className="font-size" />
                    <Popover boundary="window">
                        <Button className="font-color" style={{ "backgroundColor": this.state.value["color"] }} text="" />
                        <SketchPicker color={this.parseColor(this.state.value["color"])} onChange={this.onFontColorChanged} onChangeComplete={this.onFontColorCommitted} />
                    </Popover>
                </ControlGroup>
                <ButtonGroup fill={true}>
                    <Button icon="bold" active={this.state.value["fontWeight"] == "bold"} onClick={this.onBoldToggled}></Button>
                    <Button icon="italic" active={this.state.value["fontStyle"] == "italic"} onClick={this.onItalicToggled}></Button>
                    <Button icon="underline" active={this.state.value["textDecoration"] == "underline"} onClick={this.onUnderlineToggled}></Button>
                    <Button icon="align-left" active={this.state.value["textAlign"] == "left"} onClick={() => this.onTextAlignToggled("left")}></Button>
                    <Button icon="align-center" active={this.state.value["textAlign"] == "center"} onClick={() => this.onTextAlignToggled("center")}></Button>
                    <Button icon="align-right" active={this.state.value["textAlign"] == "right"} onClick={() => this.onTextAlignToggled("right")}></Button>
                </ButtonGroup>
            </div>
        );
    }
}