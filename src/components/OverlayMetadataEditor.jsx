import React, { useState, useCallback } from "react";
import { InputGroup, Button, AnchorButton, Tag } from "@blueprintjs/core";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import "./OverlayMetadataEditor.css";

const OverlayNameEditor = (props) => {
    const [[name, author], dispatch] = useOverlayEditorContext(state => state.overlay.name, state => state.overlay.author);
    const [isEditing, setIsEditing] = useState(false);
    const [nameOverride, setNameOverride] = useState();
    const [authorOverride, setAuthorOverride] = useState();

    const onEditClick = useCallback(() => {
        setIsEditing(prev => !prev);
        setNameOverride(name || "");
        setAuthorOverride(author || "");
    }, []);

    const onNameChanged = useCallback((evt) => {
        setNameOverride(evt.target.value);
    }, []);

    const onAuthorChanged = useCallback((evt) => {
        setAuthorOverride(evt.target.value);
    }, []);

    const onAccept = useCallback(() => {
        dispatch("SetOverlayMetadata", { name: nameOverride, author: authorOverride });
        setIsEditing(false);
        setNameOverride(null);
        setAuthorOverride(null);
    }, [nameOverride, authorOverride]);

    const onCancel = useCallback(() => {
        setIsEditing(false);
        setNameOverride(null);
        setAuthorOverride(null);
    }, []);

    const acceptOnEnter = useCallback((evt) => {
        if (evt.key == "Enter") {
            evt.preventDefault();
            onAccept();
        }
    }, [ onAccept ]);

    return (
        <div className="overlay-metadata-editor">
            <div className="left">
                <div className="overlay-name">
                    {!isEditing ? name : (
                        <InputGroup value={nameOverride} onKeyDown={acceptOnEnter} onChange={onNameChanged} placeholder="Name" />
                    )}
                </div>
                <div className="overlay-author">
                    {!isEditing ? author : (
                        <InputGroup value={authorOverride} onKeyDown={acceptOnEnter} onChange={onAuthorChanged} placeholder="Author" />
                    )}
                </div>
            </div>
            <div className="right">
                {!isEditing ? (
                    <Button minimal={true} icon="edit" title="Edit" onClick={onEditClick} />
                ) : (
                    <>
                        <Button minimal={true} intent="success" icon="tick" title="Accept" onClick={onAccept} />
                        <Button minimal={true} intent="danger" icon="reset" title="Cancel" onClick={onCancel} />
                    </>
                )}
            </div>
        </div>
    );
}

export default OverlayNameEditor;