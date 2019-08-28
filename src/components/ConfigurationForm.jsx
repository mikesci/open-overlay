import React from "react";
import { FormGroup, InputGroup, TextArea, Switch, HTMLSelect, RadioGroup, Radio, Slider, Collapse, Button, Popover } from "@blueprintjs/core";
import FontStyleEditor from "./FontStyleEditor.jsx";
import CollapsableGroup from "./CollapsableGroup.jsx";
import StyleInput from "./StyleInput.jsx";
import { SketchPicker } from 'react-color'
import "./ConfigurationForm.css";
import { CONSOLE } from "@blueprintjs/icons/lib/esm/generated/iconContents";
import Popper from "popper.js";


export default class ConfigurationForm extends React.Component {

  constructor(props) {
    super(props);

    // props.id
    // props.manifest
    // props.parameterValues
    // props.onParameterValuesChanged
  }

  onStyleChanged = (param, value) => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[param.name] = value;
      this.props.onParameterValuesChanged(obj);
    }
  }

  onStyleCommitted = (param, value) => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[param.name] = value;
      this.props.onParameterValuesChanged(obj, true);
    }
  }

  onFontChanged = (param, value, createUndoEntry) => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[param.name] = value;
      this.props.onParameterValuesChanged(obj, createUndoEntry);
    }
  }

  onColorChanged = (param, color) => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[param.name] = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
      this.props.onParameterValuesChanged(obj, false);
    }
  }

  onColorCommitted = (param, color) => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[param.name] = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
      this.props.onParameterValuesChanged(obj, true);
    }
  }

  onFieldChanged = evt => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[evt.target.getAttribute("data-param")] = evt.target.value;
      this.props.onParameterValuesChanged(obj);
    }
  }

  onTextboxFocus = evt => {
    if (this.props.onParameterValuesChanged) {
      evt.target.setAttribute("original-value", evt.target.value);
    }
  }

  onTextboxBlur = evt => {
    if (this.props.onParameterValuesChanged) {
      let originalValue = evt.target.getAttribute("original-value");
      if (evt.target.value != originalValue) {
        let obj = {};
        obj[evt.target.getAttribute("data-param")] = evt.target.value;
        this.props.onParameterValuesChanged(obj, true);
      }
    }
  }

  onRadioGroupChanged = evt => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[evt.target.getAttribute("data-param")] = evt.target.value;
      this.props.onParameterValuesChanged(obj, true); // always store the undo history
    }
  }

  onSelectChanged = evt => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[evt.target.getAttribute("data-param")] = evt.target.value;
      this.props.onParameterValuesChanged(obj, true); // always store the undo history
    }
  }

  onCheckboxChanged = evt => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[evt.target.getAttribute("data-param")] = evt.target.checked;
      this.props.onParameterValuesChanged(obj, true); // always store the undo history
    }
  }

  getOnSliderChangedCallback = parameterName => {
    let fn = function(newValue) {
      if (this.props.onParameterValuesChanged) {
        let obj = {};
        obj[parameterName] = newValue;
        this.props.onParameterValuesChanged(obj, false); // this should be OK?
      }
    }

    fn = fn.bind(this);
    return fn;
  }

  getOnSliderReleasedCallback = parameterName => {
    let fn = function(newValue) {
      if (this.props.onParameterValuesChanged) {
        let obj = {};
        obj[parameterName] = newValue;
        this.props.onParameterValuesChanged(obj, true); // this should be OK?
      }
    }

    fn = fn.bind(this);
    return fn;
  }

  onGroupToggle = evt => {
    let target = evt.target.closest("button");
    if (target) {
      let group = target.getAttribute("data-group");
      this.setState(prevState => {
        let index = prevState.openGroups.indexOf(group);
        if (index > -1) {
          prevState.openGroups.splice(index, 1);
        } else {
          prevState.openGroups.push(group);
        }
        return { openGroups: prevState.openGroups };
      });
    }
  }

  renderInputGroup = (parameter, value) => {
    if (value == undefined) {
      if (parameter.defaultValue) { value = parameter.defaultValue; }
      else if (parameter.type == "slider") { value = parameter.min; }
      else if (parameter.type == "text") { value = ""; }
      else if (parameter.type == "select" && parameter.options && parameter.options.length > 0) { value = (parameter.options[0].value ? parameter.options[0].value : parameter.options[0]); }
      else { value = ""; }
    }

    switch (parameter.type) {
      case "style":
        return (<StyleInput value={value} onChange={this.onStyleChanged} onCommit={this.onStyleCommitted} param={parameter} />)
      case "font":
        return (<FontStyleEditor value={value} onChange={this.onFontChanged} param={parameter} />)
      case "color":
        return (
          <Popover boundary="window">
            <Button style={{ "backgroundColor": value }} text="" />
            <SketchPicker color={value} onChange={color => this.onColorChanged(parameter, color)} onChangeComplete={color => this.onColorCommitted(parameter, color)} />
          </Popover>
        );
      case "checkbox":
        return (<Switch checked={value} onChange={this.onCheckboxChanged} data-param={parameter.name} label={parameter.displayName} />);
      case "select":
        return (<HTMLSelect value={value} onChange={this.onSelectChanged} data-param={parameter.name} options={parameter.options} />);
      case "radiogroup":
        return (
          <RadioGroup selectedValue={value} onChange={this.onRadioGroupChanged}>
            {parameter.options.map(option => (<Radio label={option.label} value={option.value} data-param={parameter.name} key={option.value} />))}
          </RadioGroup>
        );
      case "slider":
        return (<Slider value={value} onChange={this.getOnSliderChangedCallback(parameter.name)} onRelease={this.getOnSliderReleasedCallback(parameter.name)} min={parameter.min || 0} max={parameter.max || 100} labelStepSize={parameter.labelStepSize || ((parameter.max || 100) / 2)} />);
      case "textarea":
        return (<TextArea value={value} onChange={this.onFieldChanged} onFocus={this.onTextboxFocus} onBlur={this.onTextboxBlur} data-param={parameter.name} fill={true} growVertically={true} />);
      case "text":
      default:
        return (<InputGroup value={value} onChange={this.onFieldChanged} onFocus={this.onTextboxFocus} onBlur={this.onTextboxBlur} data-param={parameter.name} fill={true} />);
        break;
    }
  }

  renderFormGroup = parameter => {
    return (
      <FormGroup key={parameter.name} label={(parameter.type == "checkbox" || parameter.type == "style" ? null : parameter.displayName)} label-for={parameter.name} className={"formgroup-" + parameter.type}>
        {this.renderInputGroup(parameter, this.props.parameterValues[parameter.name])}
      </FormGroup>
    );
  }

  render() {

    let formGroups = this.props.manifest.parameters.map(parameter => {
      if (parameter.group) {
        return (
          <FormGroup key={parameter.group}>
            <CollapsableGroup label={parameter.group}>
              {parameter.items.map(item => this.renderFormGroup(item))}
            </CollapsableGroup>
          </FormGroup>
        );
      }

      return this.renderFormGroup(parameter);
    });

    return (
      <div className="configuration-form">
        {formGroups}
      </div>
    );
  }
}