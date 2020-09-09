import React from "react";
import { FormGroup, InputGroup, TextArea, Switch, HTMLSelect, RadioGroup, Radio, Slider, Collapse, Button, Popover, ButtonGroup } from "@blueprintjs/core";
import FontStyleEditor from "./FontStyleEditor.jsx";
import AnimationEditor from "./AnimationEditor.jsx";
import CollapsableGroup from "./CollapsableGroup.jsx";
import VerticalAlignEditor from "./VerticalAlignEditor.jsx";
import { SketchPicker } from 'react-color'
import ColorHelper from "../shared/ColorHelper.js";
import "./ConfigurationForm.css";

export default class ConfigurationForm extends React.Component {

  constructor(props) {
    super(props);
    // props.parameters
    // props.parameterValues
    // props.onParameterValuesChanged

    this.state = {
      optionsLists: {}
    };
  }

  componentDidMount() {
    // load options lists from any parameters with a functional options element
    for(let parameter of this.props.parameters) {
      if (parameter.options && typeof parameter.options === "function") {
        Promise.resolve(parameter.options()).then(options => {
          this.setState(ps => ({ optionsLists: { ...ps.optionsLists, [parameter.name]: options } }));
        });
      }
    }
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
      obj[param.name] = ColorHelper.rgbaObjectToHexString(color.rgb);
      this.props.onParameterValuesChanged(obj, false);
    }
  }

  onColorCommitted = (param, color) => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[param.name] = ColorHelper.rgbaObjectToHexString(color.rgb);
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

  onVerticalAlignChanged = (param, value) => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[param.name] = value;
      this.props.onParameterValuesChanged(obj);
    }
  }

  onAnimationChanged = (param, value, createUndoEntry) => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[param.name] = value;
      this.props.onParameterValuesChanged(obj, createUndoEntry);
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

  onButtonGroupChanged = (parameterName, value) => {
    if (this.props.onParameterValuesChanged) {
      let obj = {};
      obj[parameterName] = value;
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
      case "font":
        return (<FontStyleEditor value={value} onChange={this.onFontChanged} param={parameter} />);
      case "valign":
        return (<VerticalAlignEditor value={value} param={parameter} onChange={this.onVerticalAlignChanged} />);
      case "color":
        return (
          <Popover boundary="window">
            <Button style={{ "backgroundColor": value }} text="" />
            <SketchPicker color={value} onChange={color => this.onColorChanged(parameter, color)} onChangeComplete={color => this.onColorCommitted(parameter, color)} />
          </Popover>
        );
      case "checkbox":
        return (<Switch checked={value} onChange={this.onCheckboxChanged} data-param={parameter.name} label={parameter.compact != false ? parameter.displayName : null} />);
      case "select":
        let options = parameter.options;
        if (typeof options === "function") { options = this.state.optionsLists[parameter.name] || []; }
        return (<HTMLSelect value={value} onChange={this.onSelectChanged} data-param={parameter.name} options={options} />);
      case "radiogroup":
        return (
          <RadioGroup selectedValue={value} onChange={this.onRadioGroupChanged}>
            {parameter.options.map(option => (<Radio label={option.label} value={option.value} data-param={parameter.name} key={option.value} />))}
          </RadioGroup>
        );
        case "buttongroup":
          return (
            <ButtonGroup>
              {parameter.options.map(option => (
                <Button text={option.label} key={option.value} active={value == option.value} onClick={() => this.onButtonGroupChanged(parameter.name, option.value)} />
              ))}
            </ButtonGroup>
          );
      case "slider":
        return (<Slider value={value} onChange={this.getOnSliderChangedCallback(parameter.name)} onRelease={this.getOnSliderReleasedCallback(parameter.name)} min={parameter.min || 0} max={parameter.max || 100} stepSize={parameter.step} labelStepSize={parameter.labelStepSize || ((parameter.max || 100) / 2)} />);
      case "animation":
        return (<AnimationEditor value={value} param={parameter} onChange={this.onAnimationChanged} />);
      case "textarea":
        return (<TextArea value={value} onChange={this.onFieldChanged} onFocus={this.onTextboxFocus} onBlur={this.onTextboxBlur} data-param={parameter.name} fill={true} growVertically={true} />);
      case "text":
      default:
        return (<InputGroup value={value} type={parameter.type} onChange={this.onFieldChanged} onFocus={this.onTextboxFocus} onBlur={this.onTextboxBlur} data-param={parameter.name} fill={true} />);
        break;
    }
  }

  renderFormGroup = parameter => {
    let style = null;
    if (parameter.inline) {
      style = { flexShrink: 0, flexGrow: 0, flexBasis: parameter.inline + "%" };
    }
    let label = (parameter.type == "checkbox" && parameter.compact != false ? null : parameter.displayName)
    return (
      <FormGroup key={parameter.name} label={label} label-for={parameter.name} className={"formgroup-" + parameter.type} style={style}>
        {this.renderInputGroup(parameter, this.props.parameterValues[parameter.name])}
      </FormGroup>
    );
  }

  render() {

    let formGroups = (this.props.parameters || []).map(parameter => {
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