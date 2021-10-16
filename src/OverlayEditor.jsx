import React, { useEffect } from "react";
import { OverlayEditorContextProvider } from "./shared/OverlayEditorContext.js";
import { LayerSelectionContextProvider } from "./shared/LayerSelectionContext.js";
import LayoutChanger from "./components/LayoutChanger.jsx";
import "./OverlayEditor.css";

const OverlayEditor = (props) => {

    useEffect(() => {
        const onWheel = (evt) => { if (evt.ctrlKey) { evt.stopPropagation(); evt.preventDefault(); } };
        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel, { passive: false });
    }, []);

    return (
        <OverlayEditorContextProvider {...props}>
            <LayerSelectionContextProvider>
                <LayoutChanger />
            </LayerSelectionContextProvider>
        </OverlayEditorContextProvider>
    );
}

export default OverlayEditor;