import React from "react";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext";
import "./ConsoleEditorPanel.css";

const ConsoleEditorPanel = () => {
    const dispatch = useOverlayEditorContext();
    //const [scriptText, setScriptText] = useState("");

    return (
        <div className="console-wrapper">
            console 
        </div>
    );
  }

  export default ConsoleEditorPanel;