import { Button, InputGroup } from "@blueprintjs/core";
import React, { useCallback, useState } from "react";
import { showUploadDialogAsync } from "../shared/utilities.js";
import { useConfigurationFormContext } from "../shared/ConfigurationFormContext.js";

const AssetUrlEditor = ({ parameter }) => {
    const [value, context] = useConfigurationFormContext(parameter);
    const [localTextValue, setLocalTextValue] = useState();

    const onFocus = useCallback((evt) => {
        setLocalTextValue(evt.target.value);
    }, []);

    const onChange = useCallback((evt) => {
        setLocalTextValue(evt.target.value);
    }, []);

    const onBlur = useCallback((evt) => {
        context.onParameterValueChanged(parameter, evt.target.value, true);
        setLocalTextValue(null);
    }, []);

    const onUploadClick = useCallback(async (evt) => {
        const files = await showUploadDialogAsync(parameter.accept);
        context.onHandleUpload(files, (url) => {
            context.onParameterValueChanged(parameter, url, true);
        });
    }, [parameter.accept]);

    const onAssetUrlDrop = useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        context.onHandleUpload(evt.dataTransfer.files, (url) => {
            context.onParameterValueChanged(parameter, url, true);
        });
    }, []);

    const uploadButton = (
        <Button icon="cloud-upload" minimal={true} onClick={onUploadClick} />
    );
    
    return (
        <InputGroup
            value={localTextValue != null ? localTextValue : value || ""}
            type="text"
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
            fill={true}
            onDrop={onAssetUrlDrop}
            dropeffect="copy"
            overridedrop="true"
            rightElement={uploadButton} />);
};

export default AssetUrlEditor;