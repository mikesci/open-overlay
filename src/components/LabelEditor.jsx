import React, { useCallback, useState } from "react";
import { InputGroup } from "@blueprintjs/core";

const LabelEditorInput = ({ value, onConfirm, onCancel }) => {
    const [valueOverride, setValueOverride] = useState(value);

    const onChange = useCallback((evt) => {
        if (evt.target) // evt.target can be null if this component has been unmounted
            setValueOverride(evt.target.value);
    }, []);

    const onKeyDown = useCallback((evt) => {
        evt.stopPropagation();
        if (evt.key == "Enter") {
            onConfirm(evt.target.value);
            return;
        }

        if (evt.key == "Escape") {
            onCancel();
            return;
        }
    }, []);

    const onBlur = useCallback((evt) => {
        onConfirm(evt.target.value);
    }, []);

    const onFocus = useCallback((evt) => {
        evt.target.select();
    }, []);

    const onDragStart = useCallback((evt) => {
        console.log("got drag start");
        evt.stopPropagation();
        evt.preventDefault();
    }, []);

    return (
        <InputGroup value={valueOverride} onChange={onChange} onKeyDown={onKeyDown} onBlur={onBlur} onFocus={onFocus} onDragStart={onDragStart} autoFocus={true} />
    );
}

const LabelEditor = ({ value, onChange, ...props }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    const onDoubleClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    const onConfirm = useCallback((value) => {
        onChange(value);
        setIsEditing(false);
    }, []);

    const onCancel = useCallback(() => {
        setIsEditing(false);
    }, []);

    // if not editing, pass through the text
    let content;
    if (!isEditing)
        content = value;
    else
        content = <LabelEditorInput value={value} onConfirm={onConfirm} onCancel={onCancel} />
    
    return (
        <span className="label-editor" onDoubleClick={onDoubleClick}>
            {content}
        </span>
    );
};

export default LabelEditor;
