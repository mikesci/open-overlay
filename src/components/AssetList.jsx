import React from "react";
import { Button, ButtonGroup, Icon } from "@blueprintjs/core";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import "./AssetList.css";

const AssetListItem = ({ assetKey, asset, dispatch }) => {

    let icon;
    switch (asset.type) {
        case "image": icon = "media"; break;
        case "video": icon = "video"; break;
        case "script": icon = "code-block"; break;
        case "html": icon = "code"; break;
        default: icon = "blank"; break;
    }

    let rightIcon;
    if (!asset.inline)
        rightIcon = <Icon icon="document-share" />

    return (
        <div className="asset-list-item">
            <ButtonGroup fill={true} minimal={true}>
                <Button text={asset.name} alignText="left" fill={true} icon={icon} rightIcon={rightIcon} />
                <Button icon="trash" title="Delete" onClick={() => dispatch("DeleteAsset", assetKey)} />
            </ButtonGroup>
        </div>
    );

};

const AssetList = (props) => {
    const [[assets], dispatch] = useOverlayEditorContext(state => state.overlay.assets);

    let items;
    if (assets) {
        items = Object.entries(assets).map(([assetKey, asset]) => (
            <AssetListItem key={assetKey} assetKey={assetKey} asset={asset} dispatch={dispatch} />
        ));
    }

    return (
        <div className="asset-list-wrapper">
            <div className="asset-list">
                {items}
            </div>
        </div>
    );
}

export default AssetList;