import React, { useCallback, useState } from "react";
import { AnchorButton, Button, Icon, Menu, MenuDivider, MenuItem, Popover } from "@blueprintjs/core";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import { DragAndDropTypes } from "../shared/DragAndDropTypes.js";
import ReorderableList from "../ui/ReorderableList.jsx";
import LabelEditor from "../ui/LabelEditor.jsx";
import "./ScriptList.css";

const ScriptListItem = ({ scriptKey, dispatch }) => {
    const [confirmPopoverOpen, setConfirmPopoverOpen] = useState();

    const onClick = useCallback(() => {
        dispatch("OpenEditor", { type: "script", params: { scriptKey } });
    }, []);

    const onScriptKeyChanged = useCallback((newScriptKey) => {
        dispatch("UpdateScriptKey", { scriptKey, newScriptKey });
    }, [scriptKey]);

    const onDelete = useCallback(() => {
        dispatch("DeleteScript", scriptKey);
    }, []);

    let icon;
    switch (scriptKey) {
        case "main.js": icon = "document-open"; break;
        case "settings.json": icon = "cog"; break;
        default: icon = "document"; break;
    }

    let deleteButton = <Button icon="trash" minimal={true} title="Delete" onClick={() => setConfirmPopoverOpen(last => !last)} />;
    if (confirmPopoverOpen) {
        deleteButton = (
            <Popover isOpen={true} position="left" boundary="window">
                {deleteButton}
                <div className="delete-popover-body">
                    Deleting this script is permanent and cannot be undone.  Continue?
                    <div className="buttons">
                        <Button icon="cross" onClick={() => setConfirmPopoverOpen(false)}>No, cancel</Button>
                        <Button icon="tick" intent="danger" onClick={onDelete}>Yes, Delete</Button>
                    </div>
                </div>
            </Popover>
        );
    }
    
    return (
        <div className="script-list-item">
            <Icon icon={icon} />
            <div className="label" onClick={onClick}>
                <LabelEditor value={scriptKey} onChange={onScriptKeyChanged} selectAllOnFocus={true} />
            </div>
            {deleteButton}
        </div>
    );
};

const ScriptList = () => {
    const [[scripts], dispatch] = useOverlayEditorContext(state => state.overlay.scripts);
    
    const onReorderItem = useCallback((scriptKey, newIndex) => {
        dispatch("ReorderScript", { scriptKey, newIndex });
    }, []);

    const onDragOver = useCallback((evt) => {
        if (DragAndDropTypes.EventHasType(evt, "Files")) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.dataTransfer.dropEffect = "copy";
        }
    }, []);

    const onDrop = useCallback((evt) => {
        if (DragAndDropTypes.EventHasType(evt, "Files")) {
            evt.preventDefault();
            evt.stopPropagation();
            dispatch("HandleFileUpload", { files: evt.dataTransfer.files, autoCreateLayers: true });
        }
    }, []);

    const scriptsEntries = (scripts ? Object.keys(scripts) : []);

    return (
        <div className="main-list script-list" onDragOver={onDragOver} onDrop={onDrop}>
            <div className="list-items">
                <ReorderableList itemType={DragAndDropTypes.SCRIPT} onReorderItem={onReorderItem}>
                    {scriptsEntries.map(scriptKey => (
                        <ScriptListItem key={scriptKey} scriptKey={scriptKey} dispatch={dispatch} />
                    ))}
                </ReorderableList>
            </div>
        </div>
    );
}

export default ScriptList;