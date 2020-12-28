import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Icon, Popover } from "@blueprintjs/core";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import { DragAndDropTypes } from "../shared/DragAndDropTypes.js";
import ReorderableList from "../ui/ReorderableList.jsx";
import "./AssetList.css";
import { exportFile } from "../shared/utilities.js";

const LazyLoader = ({ HtmlTag, asset }) => {
    const [loaded, setLoaded] = useState(false);
    const playerRef = useRef();

    if (!loaded)
        return <Icon icon="play" iconSize={100} onClick={() => setLoaded(true)} />;

    return (
        <HtmlTag ref={playerRef} autoPlay={true} controls={true}><source src={asset.src} /></HtmlTag>
    );
}

const AssetPopover = ({ assetKey, asset, dispatch }) => {

    // -- rename

    const onExportClick = useCallback(() => {
        exportFile(asset.name, asset.src);
    }, []);

    let previewElement;
    switch (asset.type) {
        case "image":
            previewElement = (<img src={asset.src} />);
            break;
        case "video":
            previewElement = (<LazyLoader HtmlTag={"video"} asset={asset} />);
            break;
        case "audio":
            previewElement = (<LazyLoader HtmlTag={"audio"} asset={asset} />);
            break;
        case "html":
            previewElement = (<Icon icon="code" iconSize={100} />);
            break;
        case "script":
            previewElement = (<Icon icon="code-block" iconSize={100} />);
            break;
        default:
            break;
    }

    return (
        <div className="asset-popover">
            <div className="preview-wrapper">
                {previewElement}
            </div>
            <div className="preview-actions">
                <Button icon="trash" text="Delete" intent="danger" onClick={() => dispatch("DeleteAsset", assetKey)} />
                <Button icon="export" text="Export" onClick={onExportClick} />
            </div>
        </div>
    );
}

const AssetListItem = ({ assetKey, asset, previewing, onPreview, dispatch }) => {

    let icon;
    switch (asset.type) {
        case "image": icon = "media"; break;
        case "video": icon = "video"; break;
        case "audio": icon = "volume-up"; break;
        case "script": icon = "code-block"; break;
        case "html": icon = "code"; break;
        default: icon = "blank"; break;
    }

    // add double-click to rename below

    let mainButton = <Button text={asset.name} alignText="left" fill={true} icon={icon} minimal={true} active={previewing} rightIcon="caret-right" onClick={() => onPreview(assetKey)} />;
    if (previewing) {
        mainButton = (
            <Popover position="right" isOpen={true} fill={true} minimal={true} onInteraction={() => onPreview(null)} boundary="window">
                {mainButton}
                <AssetPopover assetKey={assetKey} asset={asset} dispatch={dispatch} />
            </Popover>
        );
    }

    return (
        <div className="asset-list-item">
            {mainButton}
        </div>
    );

};

const AssetList = (props) => {
    const [[assets], dispatch] = useOverlayEditorContext(state => state.overlay.assets);
    const [previewAssetKey, setPreviewAssetKey] = useState();

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
            dispatch("HandleFileUpload", { files: evt.dataTransfer.files, autoCreateLayers: false });
        }
    }, []);

    const onReorderItem = useCallback((assetKey, newIndex) => {
        dispatch("ReorderAsset", { assetKey, newIndex });
    }, []);

    let items;
    if (assets) {
        items = Object.entries(assets).map(([assetKey, asset]) => (
            <AssetListItem key={assetKey} assetKey={assetKey} asset={asset} previewing={previewAssetKey == assetKey} onPreview={setPreviewAssetKey} dispatch={dispatch} />
        ));
    }
    
    if (items && items.length > 0) {
        items = (
            <ReorderableList itemType={DragAndDropTypes.ASSET} onReorderItem={onReorderItem}>
                {items}
            </ReorderableList>
        );
    } else {
        items = (
            <div className="no-asset-message">
                <div>
                    <div className="icon">
                        <Icon icon="cloud-upload" iconSize={50} />
                    </div>
                    Drop files here to upload
                </div>
            </div>
        );
    }

    return (
        <div className="asset-list-wrapper">
            <div className="asset-list" onDragOver={onDragOver} onDrop={onDrop}>
                {items}
            </div>
        </div>
    );
}

export default AssetList;