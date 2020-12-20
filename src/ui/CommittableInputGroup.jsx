import React, { useState, useCallback } from "react";
import { InputGroup } from "@blueprintjs/core";

const CommittableInputGroup = ({ value, onCommit, ...props }) => {
    const [valueOverride, setValueOverride] = useState();

    const onChange = useCallback(evt => {
        setValueOverride(evt.target.value);
    }, []);

    const onCommitInternal = useCallback((newValue) => {
        onCommit(newValue);
        setValueOverride(null);
    }, [onCommit]);

    const onKeyDown = useCallback(evt => {
        if (evt.key == "Enter") {
            evt.preventDefault();
            onCommitInternal(evt.target.value);
        }
    }, []);

    const onBlur = useCallback(evt => {
        onCommitInternal(evt.target.value);
    }, []);

    return (
        <InputGroup value={valueOverride || value} onChange={onChange} onKeyDown={onKeyDown} onBlur={onBlur} {...props} />
    );
};

export default CommittableInputGroup;
