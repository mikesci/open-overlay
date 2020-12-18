import React, { useRef, useEffect } from "react";

const MoveAndResizeHotkeyManager = ({ selection, dispatch }) => {

    // use a ref for selection so we don't have to redefine onWindowKeyDown over and over
    const selectionRef = useRef();
    useEffect(() => {
        selectionRef.current = selection;
    }, [selection]);

    useEffect(() => {
        function onWindowKeyDown(evt) {
            if (evt.target.tagName == "INPUT" || evt.target.tagName == "SELECT" || evt.target.tagName == "TEXTAREA") { return; }
            const ctrlKey = (evt.ctrlKey || evt.metaKey);
            const shiftKey = evt.shiftKey;

            const selection = selectionRef.current;

            switch (evt.key) {
                case "c":
                    evt.preventDefault();
                    if (!ctrlKey)
                        dispatch("CenterSelectedLayers", selection);
                    else
                        dispatch("CopySelectedLayersToClipboard", selection);
                    break;
                case "f":
                    if (ctrlKey) { break; }
                    evt.preventDefault();
                    dispatch("FullscreenSelectedLayers", selection);
                    break;
                case "+":
                    evt.preventDefault();
                    dispatch("ScaleSelectedLayers", { ...selection, direction: "up", precise: shiftKey });
                    break;
                case "-":
                    evt.preventDefault();
                    dispatch("ScaleSelectedLayers", { ...selection, direction: "down", precise: shiftKey });
                    break;
                case "ArrowRight":
                    evt.preventDefault();
                    dispatch("NudgeSelectedLayers", { ...selection, direction: "right", precise: shiftKey, toEdge: ctrlKey });
                    break;
                case "ArrowLeft":
                    evt.preventDefault();
                    dispatch("NudgeSelectedLayers", { ...selection, direction: "left", precise: shiftKey, toEdge: ctrlKey });
                    break;
                case "ArrowDown":
                    evt.preventDefault();
                    dispatch("NudgeSelectedLayers", { ...selection, direction: "down", precise: shiftKey, toEdge: ctrlKey });
                    break;
                case "ArrowUp":
                    evt.preventDefault();
                    dispatch("NudgeSelectedLayers", { ...selection, direction: "up", precise: shiftKey, toEdge: ctrlKey });
                    break;
                default:
                    break;
            }
        }

        window.addEventListener("keydown", onWindowKeyDown);
        return () => window.removeEventListener("keydown", onWindowKeyDown);
    }, []);

    return null;
}

export default MoveAndResizeHotkeyManager;