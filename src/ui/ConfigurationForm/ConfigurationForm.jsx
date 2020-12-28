import React from "react";
import { FormGroup } from "@blueprintjs/core";
import FontStyleEditor from "./FontStyleEditor.jsx";
import { ConfigurationFormContextProvider } from "./ConfigurationFormContext.jsx";
import ColorEditor from "./ColorEditor.jsx";
import CheckboxEditor from "./CheckboxEditor.jsx";
import SelectEditor from "./SelectEditor.jsx";
import RadioGroupEditor from "./RadioGroupEditor.jsx";
import ButtonGroupEditor from "./ButtonGroupEditor.jsx";
import SliderEditor from "./SliderEditor.jsx";
import AssetUrlEditor from "./AssetUrlEditor.jsx";
import TextAreaEditor from "./TextAreaEditor.jsx";
import TextBoxEditor from "./TextBoxEditor.jsx";
import AngleEditor from "./AngleEditor.jsx";
import EasingEditor from "./EasingEditor.jsx";
import "./ConfigurationForm.css";

const FieldAndLabel = ({ parameter }) => {

    // type checking
    if (parameter.min !== undefined && typeof(parameter.min) !== "number") {
        console.log("min must be a number", parameter);
        return null;
    }

    if (parameter.max !== undefined && typeof(parameter.max) !== "number") {
        console.log("max must be a number", parameter);
        return null;
    }

    if (parameter.step !== undefined && typeof(parameter.step) !== "number") {
        console.log("step must be a number", parameter);
        return null;
    }

    let field;
    switch (parameter.type) {
        case "font":
            field = (<FontStyleEditor parameter={parameter} />);
            break;
        case "color":
            field = (<ColorEditor parameter={parameter} />);
            break;
        case "checkbox":
            field = (<CheckboxEditor parameter={parameter} />);
            break;
        case "select":
            field = (<SelectEditor parameter={parameter} />);
            break;
        case "radiogroup":
            field = (<RadioGroupEditor parameter={parameter} />);
            break;
        case "buttongroup":
            field = (<ButtonGroupEditor parameter={parameter} />);
            break;
        case "slider":
            field = (<SliderEditor parameter={parameter} />);
            break;
        case "assetUrl":
            field = (<AssetUrlEditor parameter={parameter} />);
            break;
        case "textarea":
            field = (<TextAreaEditor parameter={parameter} />);
            break;
        case "angle":
            field = (<AngleEditor parameter={parameter} />);
            break;
        case "easing":
            field = (<EasingEditor parameter={parameter} />);
            break;
        case "text":
        default:
            field = (<TextBoxEditor parameter={parameter} />);
            break;
    }

    const label = (parameter.type == "checkbox" && parameter.compact != false ? null : parameter.displayName);
    return (
        <FormGroup key={parameter.name} label={label} label-for={parameter.name} inline={parameter.inline}>
            {field}
        </FormGroup>
    );
}

const Grouping = ({ parameter }) => {
    const label = (parameter.displayName ? <label className="bp3-label">{parameter.displayName}</label> : null);
    const childFields = parameter.items.map(item => {
        const style = (item.width ? { flexShrink: 0, flexGrow: 0, flexBasis: item.width + "%", width: item.width + "%" } : null);
        return (
            <div key={item.name} className="group-item" style={style}>
                <FieldAndLabel parameter={item} />
            </div>
        );
    });

    return (
        <div className={"group " + (parameter.className || "")}>
            {label}
            <div className="group-items">
                {childFields}
            </div>
        </div>
    );
}

const ConfigurationForm = ({ parameters, parameterValues, onParameterValuesChanged, onHandleUpload, reportAllValues}) => {

    let formGroups;
    if (parameters) {
        formGroups = parameters.map((parameter, index) => {
            if (parameter.type == "group")
                return <Grouping key={index} parameter={parameter} />;
            else
                return <FieldAndLabel key={index} parameter={parameter} />
        });
    }

    return (
        <ConfigurationFormContextProvider parameterValues={parameterValues} onParameterValuesChanged={onParameterValuesChanged} onHandleUpload={onHandleUpload} reportAllValues={reportAllValues}>
            <div className="configuration-form">
                {formGroups}
            </div>
        </ConfigurationFormContextProvider>
    );
};

export default ConfigurationForm;