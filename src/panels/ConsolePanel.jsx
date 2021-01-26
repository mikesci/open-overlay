import React, { useCallback, useMemo, useState } from "react";
import { Button } from "@blueprintjs/core";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext";
import "./ConsolePanel.css";

const renderLogItem = (logItem, index) => {
    if (!logItem)
        return <span key={index}>null</span>;
    return <span key={index}>{logItem.toString ? logItem.toString() : "[" + typeof logItem + "]"}</span>;
}

const ConsolePanel = () => {
    const [[isExecutingScript, scriptState], dispatch] = useOverlayEditorContext(
        state => state.isExecutingScript,
        state => state.scriptState
    );

    const logs = (scriptState && scriptState.logs ? scriptState.logs : []);

    return (
        <div className="console-panel">
            <div className="console-header">
                <div className="title">Console</div>
                <Button icon={isExecutingScript ? "pause" : "play"} intent={isExecutingScript ? "warning": "success"} title="Execute (Ctrl+e)" minimal={true} onClick={() => dispatch("ExecuteScript")} />
            </div>
            <div className="console-window">
                {logs.map((logItems, index) => (
                    <div key={index} className="log-row">
                        {logItems.map(renderLogItem)}
                    </div>
                ))}
            </div>
        </div>
    );
  }

  export default ConsolePanel;