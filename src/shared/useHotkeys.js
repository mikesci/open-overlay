import { useEffect } from "react";
import { useOverlayEditorContext } from "./OverlayEditorContext";
import { storeActions } from "../shared/reduxLite.js";

const HotkeySets = {
    GLOBAL: [
        { key: "z", ctrl: true, action: (dispatch) => dispatch(storeActions.UNDO) },
        { key: "y", ctrl: true, action: (dispatch) => dispatch(storeActions.REDO) },
        { key: "0", ctrl: true, action: (dispatch) => dispatch("ResetStageZoom") },
    ],
    LAYERS: [
        { key: "a", ctrl: true, action: (dispatch) => dispatch("SelectAllLayers") },
        { key: "r", ctrl: false, action: (dispatch) => dispatch("ResetSelectedLayers") },
        { key: "[", ctrl: false, action: (dispatch) => dispatch("RaiseSelectedLayers", false) },
        { key: "[", ctrl: true, action: (dispatch) => dispatch("RaiseSelectedLayers", true) },
        { key: "]", ctrl: false, action: (dispatch) => dispatch("LowerSelectedLayers", false) },
        { key: "]", ctrl: true, action: (dispatch) => dispatch("LowerSelectedLayers", true) },
        { key: "Tab", shift: false, action: (dispatch) => dispatch("SelectNextLayer", false) },
        { key: "Tab", shift: true, action: (dispatch) => dispatch("SelectNextLayer", true) },
        { key: "Delete", action: (dispatch) => dispatch("DeleteSelection") },
        { key: "c", ctrl: true, action: (dispatch) => dispatch("CopySelectedLayersToClipboard") },
        { key: "Escape", action: (dispatch) => dispatch("SelectLayers", [])}
    ],
    MOVE_AND_RESIZE: [
        { key: "c", ctrl: false, action: (dispatch, context) => dispatch("CenterSelectedLayers", context.current) },
        { key: "f", ctrl: false, action: (dispatch, context) => dispatch("FullscreenSelectedLayers", context.current) },
        { key: "+", shift: false, action: (dispatch, context) => dispatch("ScaleSelectedLayers", { ...context.current, direction: "up", precise: false }) },
        { key: "+", shift: true, action: (dispatch, context) => dispatch("ScaleSelectedLayers", { ...context.current, direction: "up", precise: true }) },
        { key: "-", shift: false, action: (dispatch, context) => dispatch("ScaleSelectedLayers", { ...context.current, direction: "down", precise: false }) },
        { key: "-", shift: true, action: (dispatch, context) => dispatch("ScaleSelectedLayers", { ...context.current, direction: "down", precise: true }) },
        { key: "ArrowRight", ctrl: true, action: (dispatch, context) => dispatch("NudgeSelectedLayers", { ...context.current, direction: "right", toEdge: true, precise: false }) },
        { key: "ArrowRight", shift: true, action: (dispatch, context) => dispatch("NudgeSelectedLayers", { ...context.current, direction: "right", toEdge: false, precise: true }) },
        { key: "ArrowRight", action: (dispatch, context) => dispatch("NudgeSelectedLayers", { ...context.current, direction: "right", toEdge: false, precise: false }) },
        { key: "ArrowLeft", ctrl: true, action: (dispatch, context) => dispatch("NudgeSelectedLayers", { ...context.current, direction: "left", toEdge: true, precise: false }) },
        { key: "ArrowLeft", shift: true, action: (dispatch, context) => dispatch("NudgeSelectedLayers", { ...context.current, direction: "left", toEdge: false, precise: true }) },
        { key: "ArrowLeft", action: (dispatch, context) => dispatch("NudgeSelectedLayers", { ...context.current, direction: "left", toEdge: false, precise: false }) },
        { key: "ArrowUp", ctrl: true, action: (dispatch, context) => dispatch("NudgeSelectedLayers", { ...context.current, direction: "up", toEdge: true, precise: false }) },
        { key: "ArrowUp", shift: true, action: (dispatch, context) => dispatch("NudgeSelectedLayers", { ...context.current, direction: "up", toEdge: false, precise: true }) },
        { key: "ArrowUp", action: (dispatch, context) => dispatch("NudgeSelectedLayers", { ...context.current, direction: "up", toEdge: false, precise: false }) },
        { key: "ArrowDown", ctrl: true, action: (dispatch, context) => dispatch("NudgeSelectedLayers", { ...context.current, direction: "down", toEdge: true, precise: false }) },
        { key: "ArrowDown", shift: true, action: (dispatch, context) => dispatch("NudgeSelectedLayers", { ...context.current, direction: "down", toEdge: false, precise: true }) },
        { key: "ArrowDown", action: (dispatch, context) => dispatch("NudgeSelectedLayers", { ...context.current, direction: "down", toEdge: false, precise: false }) }
    ],
    ANIMATION: [
        { key: " ", action: (dispatch) => dispatch("ToggleAnimationPlaying") },
    ],
    SCRIPT: [
        { key: "e", ctrl: true, action: (dispatch) => dispatch("ExecuteScript") }
    ]
};

class HotKeyManager {
    _dispatch;
    _registrations = [];
    
    constructor(dispatch) {
        this._dispatch = dispatch;
    }

    register = (hotkeySet, context) => {
        this._registrations.push({ hotkeySet, context });
    }

    unregister = (hotkeySet) => {
        this._registrations = this._registrations.filter(r => r.hotkeySet != hotkeySet);
    }

    handleKeydown = (evt) => {
        const ctrlKey = (evt.ctrlKey || evt.metaKey);
        const shiftKey = evt.shiftKey;

        // disable hotkeys on input fields
        if (evt.target.tagName == "INPUT" || evt.target.tagName == "SELECT" || evt.target.tagName == "TEXTAREA") { return; }

        let matched = false;
        for(const registration of this._registrations) {
            if (matched) { break; }
            for(const hotkey of registration.hotkeySet) {
                if (evt.key != hotkey.key) continue;
                if (ctrlKey != !!hotkey.ctrl) continue;
                if (shiftKey != !!hotkey.shift) continue;
                evt.preventDefault();
                hotkey.action(this._dispatch, registration.context);
                matched = true;
                break;
            }
        }
    }

    canCleanUp = () => {
        return (this._registrations.length == 0);
    }
};

const useHotkeys = (hotkeys, context) => {
    const dispatch = useOverlayEditorContext();

    useEffect(() => {
        // lazy load event handler in the window context
        if (!window.hotkeyManager) {
            window.hotkeyManager = new HotKeyManager(dispatch);
            window.addEventListener("keydown", window.hotkeyManager.handleKeydown);
        }

        window.hotkeyManager.register(hotkeys, context);

        return () => {
            window.hotkeyManager.unregister(hotkeys);

            // clean up if possible
            if (window.hotkeyManager.canCleanUp()) {
                window.removeEventListener("keydown", window.hotkeyManager.handleKeydown);
                window.hotkeyManager = null;
            }
        };
    }, []);
};

export {
    HotkeySets,
    useHotkeys
};
