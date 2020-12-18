import React, { useCallback, useState } from "react";
import { Button } from "@blueprintjs/core";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { HotkeySets, useHotkeys } from "../shared/useHotkeys";
import "./ScriptEditorPanel.css";

const ScriptEditorPanel = ({ editorKey, scriptKey }) => {
    const [[script], dispatch] = useOverlayEditorContext(state => (state.overlay.scripts ? state.overlay.scripts[scriptKey] : null));
    //const [scriptText, setScriptText] = useState("");

    const onEditorChanged = useCallback((content) => {
        /*dispatch("SetOpenScriptContent", { openScript, content });*/
        dispatch("UpdateScript", { scriptKey, content });
    }, []);

    // ctrl+e to execute needs to be registered here, since global hotkeys don't work in textareas
    const onKeyDown = useCallback(evt => {
        // if you hit enter, be sure to scroll back to the left (browser doesn't do this automatically for some reason)
        if (evt.key == "Enter") {
            evt.target.closest(".script-wrapper").scrollLeft = 0;
        }
        if (evt.key == "e" && evt.ctrlKey) {
            // TODO: save script?
            dispatch("ExecuteScript");
            evt.preventDefault();
        }
    }, []);

    useHotkeys(HotkeySets.SCRIPT);

    if (script == null)
        return null;

    return (
        <div className="script-wrapper">
            <Editor value={script}
                onValueChange={onEditorChanged}
                onKeyDown={onKeyDown}
                highlight={code => highlight(code, languages.javascript)}
                padding={5}
                className="editor-wrapper"
            />
        </div>
    );
  }

  export default ScriptEditorPanel;