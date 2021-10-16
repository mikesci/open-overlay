import React, { useCallback, useState } from "react";
import AppToaster from "./AppToaster.jsx";
import LayerConfigPanel from "./LayerConfigPanel.jsx";
import MainToolbar from "./MainToolbar.jsx";
import Resizable from "../ui/Resizable.jsx";
import LayerList from "./LayerList.jsx";
import StageManager from "./StageManager.jsx";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import usePasteHandler from "../shared/usePasteHandler.js";
import { HotkeySets, useHotkeys } from "../shared/useHotkeys.js";
import { ButtonGroup, Button, Tabs, Tab, Icon, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { Popover2, Tooltip2 } from "@blueprintjs/popover2";
import AssetList from "./AssetList.jsx";
import ScriptList from "./ScriptList.jsx";
import ScriptSettingsPanel from "./ScriptSettingsPanel.jsx";
import Panels from "../panels";
import ConsolePanel from "../panels/ConsolePanel.jsx";
import { showUploadDialogAsync } from "../shared/utilities.js";
import "./LayoutChanger.css";

const LayoutChanger = ({  }) => {
    const [[renderer, settingsJson, preferences, editors, selectedListTab, selectedEditorTab], dispatch] = useOverlayEditorContext(state => state.renderer, state => (state.overlay.scripts ? state.overlay.scripts["settings.json"] : null), state => state.preferences, state => state.editors, state => state.selectedListTab, state => state.selectedEditorTab);

    // handle paste events the same, regardless of task
    usePasteHandler(dispatch);

    // handle global hotkeys
    useHotkeys(HotkeySets.GLOBAL);

    // handle layer selection hotkeys globally
    useHotkeys(HotkeySets.LAYERS);

    const onSavePreference = useCallback((preferences) => { dispatch("SavePreferences", preferences); }, []);

    const onSelectListTab = useCallback(tabId => { dispatch("SelectListTab", tabId); }, []);

    const onCreateLayer = useCallback(elementName => {
        dispatch("CreateLayers", [{ elementName }]);
    }, []);

    const onUploadAssetClick = useCallback(async () => {
        try
        {
            const files = await showUploadDialogAsync();
            dispatch("HandleFileUpload", { files, autoCreateLayers: false });
            dispatch("SelectListTab", "assets");
        } catch {
            // do nothing if we select no files
        }
    }, []);

    const onCreateScript = useCallback((name) => {
        dispatch("CreateScript", name);
    }, []);

    let editorTabsPanel;
    let consolePanel;
    if (editors.length > 0) {
        let selectedEditorIsScript;
        editorTabsPanel = (
            <Tabs id="editor-tabs" onChange={key => dispatch("SelectEditor", key)} selectedTabId={selectedEditorTab} animate={false} className="editor-tabs normal-tabs">
                <Button className="btn-minimize-bottom" icon={preferences.bottomPanelMinimized ? "double-chevron-up" : "double-chevron-down"} minimal={true} onClick={() => onSavePreference({ bottomPanelMinimized: !preferences.bottomPanelMinimized })} />
                {editors.map(editor => {
                    const editorType = Panels[editor.type];
                    const key = editorType.key(editor.params);

                    if (selectedEditorTab == key && editor.type == "script")
                        selectedEditorIsScript = true;

                    return (
                        <Tab key={key} id={key} panel={<editorType.component editorKey={key} {...editor.params} />}>
                            <Icon icon={editorType.icon(editor.params)} />
                            <span className="title">{editorType.title(editor.params)}</span>
                            <Button minimal={true} icon="cross" title="Close" small={true} onClick={(evt) => { evt.stopPropagation(); dispatch("CloseEditor", editor.key); }} />
                        </Tab>
                    );
                })}
            </Tabs>
        );

        if (selectedEditorIsScript) {
            consolePanel = (
                <Resizable edge="left" defaultSize={preferences.consolePanelSize} minimum={100} onSizeChanged={size => onSavePreference({ consolePanelSize: size })} className="console-wrapper">
                    <ConsolePanel />
                </Resizable>
            );
        }
    }

    let settingsTab;
    if (settingsJson) {
        settingsTab = (
            <Tooltip2 content="Settings">
                <Button className="list-button" active={selectedListTab == "settings"} text={"Settings"} alignText="left" icon="settings" onClick={() => onSelectListTab("settings")} />
            </Tooltip2>
        );
    }

    const newItemMenu = (
        <Menu className="no-outline">
            <MenuDivider title="Layers" />
            {Object.values(renderer.elements).map(elementDef => (
                <MenuItem key={elementDef.elementName} icon={elementDef.icon} text={elementDef.name} onClick={() => onCreateLayer(elementDef.elementName)} />
            ))}
            <MenuDivider title="Scripts" />
            <MenuItem key="main.js" icon="document-share" text="main.js" intent="success" onClick={() => onCreateScript("main.js")} />
            <MenuItem key="settings.json" icon="cog" text="settings.json" intent="success" onClick={() => onCreateScript("settings.json")} />
            <MenuItem key="new" icon="document" text="Script File" onClick={() => onCreateScript()} />
            <MenuDivider />
            <MenuItem key="asset-upload" icon="cloud-upload" text="Upload asset..." onClick={onUploadAssetClick} />
        </Menu>
    );

    return (
        <div className="layout-changer">
            <AppToaster />
            <Resizable edge="right" defaultSize={preferences.leftPanelWidth} minimum={350} maximum={500} onSizeChanged={size => onSavePreference({ leftPanelWidth: size })} className="leftpanel-wrapper panel-bg">
                <Resizable edge="bottom" defaultSize={preferences.layerListSize || 300} minimum={100} maximum={800} onSizeChanged={size => onSavePreference({ layerListSize: size })} className="lists-wrapper">
                    <ButtonGroup fill={true} className="toolbar">
                        {settingsTab}
                        <Tooltip2 content="Layers">
                            <Button className="list-button" active={selectedListTab == "layers"} text={"Layers"} alignText="left" icon="layers" onClick={() => onSelectListTab("layers")} />
                        </Tooltip2>
                        <Tooltip2 content="Scripts">
                            <Button className="list-button" active={selectedListTab == "scripts"} text={"Scripts"} alignText="left" icon="manually-entered-data" onClick={() => onSelectListTab("scripts")} />
                        </Tooltip2>
                        <Tooltip2 content="Assets">
                            <Button className="list-button" active={selectedListTab == "assets"} text={"Assets"} alignText="left" icon="archive" onClick={() => onSelectListTab("assets")} />
                        </Tooltip2>
                        <Popover2 position="right" boundary="window" className="new-object" content={newItemMenu}>
                            <Tooltip2 content="New">
                                <Button icon="plus" intent="primary" />
                            </Tooltip2>
                        </Popover2>
                    </ButtonGroup>
                    <div className="lists-panel">
                        {selectedListTab == "settings" ? <ScriptSettingsPanel settingsJson={settingsJson} /> : null}
                        {selectedListTab == "layers" ? <LayerList /> : null}
                        {selectedListTab == "scripts" ? <ScriptList /> : null}
                        {selectedListTab == "assets" ? <AssetList /> : null}
                    </div>
                </Resizable>
                <LayerConfigPanel />
            </Resizable>
            <div className="center-wrapper">
                <div className="stage-wrapper" dropeffect="copy">
                    <div className="toolbar-wrapper"><MainToolbar /></div>
                    <StageManager />
                </div>
                {editorTabsPanel ? (
                    <Resizable edge="top" defaultSize={preferences.bottomPanelMinimized ? 29 : preferences.bottomPanelSize} canResize={!preferences.bottomPanelMinimized} minimum={100} maximum={500} onSizeChanged={size => onSavePreference({ bottomPanelSize: size })} className="bottom-panel-wrapper panel-bg">
                        {editorTabsPanel}
                        {consolePanel}
                    </Resizable>
                ) : null}
            </div>
        </div>
    );
};

export default LayoutChanger;