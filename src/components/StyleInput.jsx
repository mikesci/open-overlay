import React from "react";
import { FormGroup, InputGroup, TextArea, Switch, HTMLSelect, RadioGroup, Radio, Slider, Collapse, Button, ControlGroup, Popover } from "@blueprintjs/core";
import { SketchPicker } from 'react-color'
import CollapsableGroup from "./CollapsableGroup.jsx";
import "./StyleInput.css";

class FourValueInput extends React.Component {

  static DEFAULT_VALUE = { top: 0, right: 0, bottom: 0, left: 0 };

  onChange = evt => {
    let side = evt.target.getAttribute("data-side");
    let innerName = `${this.props.prefix}${side}`;
    let intValue = parseInt(evt.target.value);
    this.props.onChange(innerName, (isNaN(intValue) ? "" : intValue + "px"));
  }

  onInputBlur = evt => {
    let side = evt.target.getAttribute("data-side");
    let innerName = `${this.props.prefix}${side}`;
    let intValue = parseInt(evt.target.value);
    this.props.onCommit(innerName, (isNaN(intValue) ? "" : intValue + "px"));
  }

  _getIntegerValue(val) {
    if (!val) { return ""; }
    for (let match of val.matchAll(/(\d+)/)) {
      return match[0];
    }
    return "";
  }

  render() {
    let topValue = this._getIntegerValue(this.props.value[this.props.prefix + "Top"]);
    let rightValue = this._getIntegerValue(this.props.value[this.props.prefix + "Right"]);
    let bottomValue = this._getIntegerValue(this.props.value[this.props.prefix + "Bottom"]);
    let leftValue = this._getIntegerValue(this.props.value[this.props.prefix + "Left"]);

    return (
      <ControlGroup className="four-value-input">
        <InputGroup value={topValue} onChange={this.onChange} onBlur={this.onInputBlur} title="Top" data-side="Top" />
        <InputGroup value={rightValue} onChange={this.onChange} onBlur={this.onInputBlur} title="Right" data-side="Right" />
        <InputGroup value={bottomValue} onChange={this.onChange} onBlur={this.onInputBlur} title="Bottom" data-side="Bottom" />
        <InputGroup value={leftValue} onChange={this.onChange} onBlur={this.onInputBlur} title="Left" data-side="Left" />
      </ControlGroup>
    );
  }
}

export default class StyleInput extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  onFourInputChanged = (paramName, value) => {
    if (this.props.onChange) {
      let obj = Object.assign({}, this.props.value);
      if (value.length == 0)
        delete obj[paramName];
      else
        obj[paramName] = value;
      this.props.onChange(this.props.param, obj);
    }
  }

  onFourInputCommitted = (paramName, value) => {
    if (this.props.onCommit) {
      let obj = Object.assign({}, this.props.value);
      if (value.length == 0)
        delete obj[paramName];
      else
        obj[paramName] = value;
      this.props.onCommit(this.props.param, obj);
    }
  }

  onInputChanged = evt => {
    if (this.props.onChange) {
      let obj = Object.assign({}, this.props.value);
      obj[evt.target.getAttribute("data-param")] = evt.target.value;
      this.props.onChange(this.props.param, obj);
    }
  }

  onInputFocus = evt => {
    if (this.props.onChange) {
      evt.target.setAttribute("original-value", evt.target.value);
    }
  }

  onInputBlur = evt => {
    if (this.props.onChange) {
      let originalValue = evt.target.getAttribute("original-value");
      if (evt.target.value != originalValue) {
        let obj = {};
        obj[evt.target.getAttribute("data-param")] = evt.target.value;
        this.props.onCommit(obj, true);
      }
    }
  }

  onBackgroundColorChanged = color => {
    if (this.props.onChange) {
      let obj = Object.assign({}, this.props.value);
      obj["backgroundColor"] = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
      this.props.onChange(this.props.param, obj);
    }
  }

  onBackgroundColorCommitted = color => {
    if (this.props.onChange) {
      let obj = Object.assign({}, this.props.value);
      obj["backgroundColor"] = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
      this.props.onCommit(this.props.param, obj);
    }
  }

  renderContents() {
    let value = this.props.value || {};
    return (
      <div className="style-input">
        <FormGroup label="Padding" inline={true}>
          <FourValueInput value={value} onChange={this.onFourInputChanged} onCommit={this.onFourInputCommitted} prefix="padding" paramName="padding" />
        </FormGroup>
        <FormGroup label="Margin" inline={true}>
          <FourValueInput value={value} onChange={this.onFourInputChanged} onCommit={this.onFourInputCommitted} prefix="margin" paramName="margin" />
        </FormGroup>
        <FormGroup label="Background" inline={true}>
          <Popover>
            <Button className="font-color" style={{ "backgroundColor": value["backgroundColor"] }} text="" />
            <SketchPicker color={value["backgroundColor"] || ""} onChange={this.onBackgroundColorChanged} onChangeComplete={this.onBackgroundColorCommitted} />
          </Popover>
        </FormGroup>
        <FormGroup label="Border Radius" inline={true}>
          <InputGroup value={value["borderRadius"] || ""} onChange={this.onInputChanged} onFocus={this.onInputFocus} onBlur={this.onInputBlur} data-param="borderRadius" />
        </FormGroup>
      </div>
    );
  }

  render() {
    if (this.props.param.grouped == false)
      return this.renderContents();
    else
      return <CollapsableGroup label={this.props.param.displayName}>{this.renderContents()}</CollapsableGroup>;
  }
}