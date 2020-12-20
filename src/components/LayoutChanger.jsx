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
import { ButtonGroup, Button, Tabs, Tab, Icon, Popover, Menu, MenuItem, Tooltip } from "@blueprintjs/core";
import AssetList from "./AssetList.jsx";
import ScriptList from "./ScriptList.jsx";
import ScriptSettingsPanel from "./ScriptSettingsPanel.jsx";
import Editors from "../panels/Editors.js";
import ConsolePanel from "../panels/ConsolePanel.jsx";
import "./LayoutChanger.css";

const LayoutChanger = ({  }) => {
    const [[settingsJson, preferences, editors, selectedEditorTab], dispatch] = useOverlayEditorContext(state => (state.overlay.scripts ? state.overlay.scripts["settings.json"] : null), state => state.preferences, state => state.editors, state => state.selectedEditorTab);
    const [topTabId, setTopTabId] = useState("layers");

    // handle paste events the same, regardless of task
    usePasteHandler(dispatch);

    // handle global hotkeys
    useHotkeys(HotkeySets.GLOBAL);

    // handle layer selection hotkeys globally
    useHotkeys(HotkeySets.LAYERS);

    const onSavePreference = useCallback((preferences) => { dispatch("SavePreferences", preferences); }, []);

    let editorTabsPanel;
    let consolePanel;
    if (editors.length > 0) {
        let selectedEditorIsScript;
        editorTabsPanel = (
            <Tabs id="editor-tabs" onChange={key => dispatch("SelectEditor", key)} selectedTabId={selectedEditorTab} animate={false} className="editor-tabs normal-tabs">
                <Button className="btn-minimize-bottom" icon={preferences.bottomPanelMinimized ? "double-chevron-up" : "double-chevron-down"} minimal={true} onClick={() => onSavePreference({ bottomPanelMinimized: !preferences.bottomPanelMinimized })} />
                {editors.map(editor => {
                    const editorType = Editors[editor.type];
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
            <Tooltip content="Settings">
                <Button active={topTabId == "settings"} text={"Settings"} alignText="left" icon="settings" onClick={() => setTopTabId("settings")} />
            </Tooltip>
        );
    }

    return (
        <div className="layout-changer">
            <AppToaster />
            <Resizable edge="right" defaultSize={preferences.leftPanelWidth} minimum={350} maximum={500} onSizeChanged={size => onSavePreference({ leftPanelWidth: size })} className="leftpanel-wrapper panel-bg">
                <Resizable edge="bottom" defaultSize={preferences.layerListSize || 300} minimum={100} maximum={800} onSizeChanged={size => onSavePreference({ layerListSize: size })} className="lists-wrapper">
                    <ButtonGroup fill={true} className="toolbar">
                        {settingsTab}
                        <Tooltip content="Layers">
                            <Button active={topTabId == "layers"} text={"Layers"} alignText="left" icon="layers" onClick={() => setTopTabId("layers")} />
                        </Tooltip>
                        <Tooltip content="Assets">
                            <Button active={topTabId == "assets"} text={"Assets"} alignText="left" icon="archive" onClick={() => setTopTabId("assets")} />
                        </Tooltip>
                        <Tooltip content="Scripts">
                            <Button active={topTabId == "scripts"} text={"Scripts"} alignText="left" icon="manually-entered-data" onClick={() => setTopTabId("scripts")} />
                        </Tooltip>
                    </ButtonGroup>
                    <div className="lists-panel">
                        {topTabId == "settings" ? <ScriptSettingsPanel settingsJson={settingsJson} /> : null}
                        {topTabId == "layers" ? <LayerList /> : null}
                        {topTabId == "assets" ? <AssetList /> : null}
                        {topTabId == "scripts" ? <ScriptList /> : null}
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