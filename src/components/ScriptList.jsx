import React, { useCallback, useState } from "react";
import { AnchorButton, Button, Icon, Menu, MenuDivider, MenuItem, Popover } from "@blueprintjs/core";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import { DragAndDropTypes } from "../shared/DragAndDropTypes.js";
import ReorderableList from "../ui/ReorderableList.jsx";
import LabelEditor from "../ui/LabelEditor.jsx";
import "./ScriptList.css";

const ScriptListItem = ({ scriptKey, dispatch }) => {
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
    
    return (
        <div className="script-list-item">
            <Icon icon={icon} />
            <div className="label" onClick={onClick}>
                <LabelEditor value={scriptKey} onChange={onScriptKeyChanged} selectAllOnFocus={true} />
            </div>
            <Button icon="trash" minimal={true} title="Delete" onClick={onDelete} />
        </div>
    );
};

const ScriptList = () => {
    const [[scripts], dispatch] = useOverlayEditorContext(state => state.overlay.scripts);
    const [newPopoverOpen, setNewPopoverOpen] = useState(false);

    const onReorderItem = useCallback((scriptKey, newIndex) => {
        dispatch("ReorderScript", { scriptKey, newIndex });
    }, []);

    let newPopoverItems;
    if (newPopoverOpen) {
        newPopoverItems = [];
        let renderedConvenienceItems = false;
        if (!scripts || scripts["main.js"] == null) {
            newPopoverItems.push(<MenuItem key="main.js" icon="document-share" text="main.js" intent="success" onClick={() => dispatch("CreateScript", "main.js")} />);
            renderedConvenienceItems = true;
        }

        if (!scripts || scripts["settings.json"] == null) {
            newPopoverItems.push(<MenuItem key="settings.json" icon="cog" text="settings.json" intent="success" onClick={() => dispatch("CreateScript", "settings.json")} />);
            renderedConvenienceItems = true;
        }

        if (renderedConvenienceItems)
            newPopoverItems.push(<MenuDivider key="sep" />);

        newPopoverItems.push(<MenuItem key="new" icon="document" text="New Script" onClick={() => dispatch("CreateScript")} />);
    }

    const scriptsEntries = (scripts ? Object.keys(scripts) : []);

    return (
        <div className="main-list script-list">
            <div className="actions">
                <AnchorButton text="Reference" small={true} minimal={true} icon="manual" target="openoverlay-reference" href="https://github.com/mikesci/open-overlay/docs/#/scripting-v1" />
                <div className="right">
                    <Popover position="right-top" isOpen={newPopoverOpen} onInteraction={setNewPopoverOpen}>
                        <Button small={true} icon="plus" title="New Script" intent="primary" rightIcon="caret-right" />
                        <Menu>
                            {newPopoverItems}
                        </Menu>
                    </Popover>
                </div>
            </div>
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