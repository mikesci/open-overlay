import React, { useEffect } from "react";

const usePasteHandler = (dispatch) => {
    useEffect(() => {
        function onPaste(evt) {
            // pass through input DOMelements
            if (evt.target.tagName == "INPUT" || evt.target.tagName == "SELECT" || evt.target.tagName == "TEXTAREA") { return; }
            evt.preventDefault();

            if (evt.clipboardData.items)
                dispatch("HandlePaste", evt.clipboardData.items);
            
            if (evt.clipboardData.files)
                dispatch("HandleFileUpload", { files: evt.clipboardData.files, autoCreateLayers: true });
        }
        document.addEventListener("paste", onPaste);
        () => document.removeEventListener("paste", onPaste);
    }, []);
}

export default usePasteHandler;