import { Card } from "@blueprintjs/core";
import React, { useMemo } from "react";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext";
import ConfigurationForm from "./ConfigurationForm/ConfigurationForm.jsx";
import "./ScriptSettingsPanel.css";

const ScriptSettingsPanel = ({ settingsJson }) => {
    // subscribe to get and set settings values
    const [[settings], dispatch] = useOverlayEditorContext(state => state.overlay.settings);

    const onParameterValuesChanged = (values) => { dispatch("UpdateScriptSettings", values, false); };

    const settingsObj = useMemo(() => {
        try { return JSON.parse(settingsJson); }
        catch { return null; }
    }, [settingsJson]);

    if (!settingsObj)
        return (<div className="error">Error parsing settings.json.</div>);

    let infoBox;
    if (settingsObj.info)
        infoBox = <Card>{settingsObj.info}</Card>;

    const parameterValues = {...settingsObj.initial, ...settings};

    return (
        <div className="script-settings-panel">
            {infoBox}
            <ConfigurationForm parameters={settingsObj.parameters || []} parameterValues={parameterValues} onParameterValuesChanged={onParameterValuesChanged} />
        </div>
    );
}

export default ScriptSettingsPanel;