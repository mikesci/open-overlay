import React from "react";
import { FormGroup } from "@blueprintjs/core";
import { ConfigurationFormContextProvider } from "../shared/ConfigurationFormContext.js";
import { getEditorComponentByKey } from "../configurationFormEditors";
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

    const EditorComponent = getEditorComponentByKey(parameter.type);
    const editor = <EditorComponent parameter={parameter} />

    const label = (parameter.type == "checkbox" && parameter.compact != false ? null : parameter.displayName);
    return (
        <FormGroup key={parameter.name} label={label} label-for={parameter.name} inline={parameter.inline}>
            {editor}
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

const ConfigurationForm = ({ parameters, parameterValues, onParameterValuesChanged, onHandleUpload, onCommand, reportAllValues}) => {

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
        <ConfigurationFormContextProvider parameterValues={parameterValues} onParameterValuesChanged={onParameterValuesChanged} onHandleUpload={onHandleUpload} onCommand={onCommand} reportAllValues={reportAllValues}>
            <div className="configuration-form">
                {formGroups}
            </div>
        </ConfigurationFormContextProvider>
    );
};

export default ConfigurationForm;