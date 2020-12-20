import React, { useCallback, useMemo, useState } from "react";
import { Button } from "@blueprintjs/core";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext";
import "./ConsolePanel.css";

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
                {logs.map((logItem, index) => (
                    <div key={index} className="log-row">
                        {logItem.map(entry => (
                            entry.toString()
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
  }

  export default ConsolePanel;