import { Button, InputGroup } from "@blueprintjs/core";
import React, { useCallback, useState } from "react";
import { useConfigurationFormContext } from "./ConfigurationFormContext.jsx";

const AssetUrlEditor = ({ parameter }) => {
    const [value, onValueChanged, onHandleUpload] = useConfigurationFormContext(parameter);
    const [localTextValue, setLocalTextValue] = useState();

    const onFocus = useCallback((evt) => {
        setLocalTextValue(evt.target.value);
    }, []);

    const onChange = useCallback((evt) => {
        setLocalTextValue(evt.target.value);
    }, []);

    const onBlur = useCallback((evt) => {
        onValueChanged(parameter, evt.target.value, true);
        setLocalTextValue(null);
    }, []);

    const onUploadClick = useCallback(evt => {
        const input = document.createElement("input");
        input.type = "file";
        input.style = "display: none";
        input.accept = parameter.accept;
        input.addEventListener("change", (evt) => {
            if (input.files.length > 0) {
                onHandleUpload(input.files, (url) => {
                    onValueChanged(parameter, url, true);
                });
            }
        });
        input.click();
    }, []);

    const onAssetUrlDrop = useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        onHandleUpload(evt.dataTransfer.files, (url) => {
            onValueChanged(parameter, url, true);
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