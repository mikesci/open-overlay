import React, { useCallback, useMemo, useState } from "react";
import { Button } from "@blueprintjs/core";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext";
import "./ConsolePanel.css";

const ConsolePanel = () => {
    const [[isExecutingScript, scriptingContext], dispatch] = useOverlayEditorContext(
        state => state.isExecutingScript,
        state => state.scriptingContext
    );

    const [logItems, setLogItems] = useState([]);

    useMemo(() => {
        if (scriptingContext) {
            // enroll the console in the logging functions
            console.log("set scripting context onLog");
            scriptingContext.onLog = (...args) => {
                setLogItems(prev => [...prev, args]);
            };
        }
    }, [scriptingContext]);

    return (
        <div className="console-panel">
            <div className="console-header">
                <div className="title">Console</div>
                <Button icon={isExecutingScript ? "pause" : "play"} intent={isExecutingScript ? "warning": "success"} title="Execute (Ctrl+e)" minimal={true} onClick={() => dispatch("ExecuteScript")} />
            </div>
            <div className="console-window">
                {logItems.map(logItem => (
                    <div className="log-row">
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