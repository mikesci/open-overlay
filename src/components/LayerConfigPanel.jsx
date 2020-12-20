import React, { useCallback, useMemo } from "react";
import { Button, Tab, Tabs } from "@blueprintjs/core";
import ConfigurationForm from "../ui/ConfigurationForm/ConfigurationForm.jsx";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import CollapsiblePanel from "../ui/CollapsiblePanel.jsx";
import { useAnimationSelectionContext } from "../shared/AnimationSelectionContext.js";
import { useLayerSelectionContext } from "../shared/LayerSelectionContext.js";
import AnimationPresets from "../shared/AnimationPresets.js";
import { MERGE_CONFLICT } from "../shared/mergeHelper.js";
import styleEditors from "../shared/styleEditors.js";
import { effects } from "./Effects.jsx";
import "./LayerConfigPanel.css";

const ANIMATION_PARAMETERS = [
    { type: "group", items: [
        { name: "delay", displayName: "Delay", type: "number", tag: "ms", width: 35 },
        { name: "duration", displayName: "Duration", type: "number", tag: "ms", width: 35 },
        { name: "easing", displayName: "Easing", type: "select", width: 30, options: [
            { label: "Linear", value: "linear" },
            { label: "Ease", value: "ease" },
            { label: "Ease In", value: "ease-in" },
            { label: "Ease Out", value: "ease-out" },
            { label: "Ease In/Out", value: "ease-in-out" }
        ] }
    ]},
    { name: "preset", displayName: "Type", type: "select", inline: true, options: Object.entries(AnimationPresets).map(([presetName, presetDef]) => ({
        label: presetDef.displayName,
        value: presetName
    })) }
];

const StylePanel = ({ styleName, style, onStyleChanged }) => {
    const styleEditor = styleEditors[styleName];

    // build the monitored prop list and 
    const monitoredProps = [];
    for(const propName of styleEditor.properties)
        monitoredProps.push(style[propName]);

    const { hasData, parameterValues } = useMemo(() => {
        const hasData = Object.keys(style).some(cssProp => styleEditor.properties.includes(cssProp));
        return {
            hasData,
            parameterValues: (hasData ? styleEditor.extract(style) : styleEditor.initialConfig)
        };
    }, monitoredProps);

    const onParameterValuesChanged = useCallback((config, createUndoHistory) => {
        onStyleChanged(styleEditor.apply({...parameterValues, ...config}), createUndoHistory);
    }, [ hasData, parameterValues ]); // only re-runs when mergedStyle.config changes from null to not null

    const onDeleteClick = useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        // delete all managed properties
        const newStyle = {};
        for(const propName of styleEditor.properties) { newStyle[propName] = "DELETE"; }

        onStyleChanged(newStyle, true);
    }, [ styleEditor ]);

    let deleteButton;
    if (!styleEditor.permanent && hasData)
        deleteButton = <Button icon="trash" minimal={true} onClick={onDeleteClick} />;

    return (
        <CollapsiblePanel label={styleEditor.displayName} defaultIsOpen={hasData} rightElement={deleteButton}>
            {() => (
                <ConfigurationForm
                    parameters={styleEditor.parameters}
                    parameterValues={parameterValues}
                    onParameterValuesChanged={onParameterValuesChanged}
                    reportAllValues={false} />
            )}
        </CollapsiblePanel>
    );
};

const EffectPanel = ({ effectName, effectConfig, onEffectChanged }) => {
    const effect = effects[effectName];

    const onParameterValuesChanged = useCallback((config, createUndoHistory) => {
        onEffectChanged(effectName, config, createUndoHistory);
    }, [ effectName ]);

    const onDeleteClick = useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        onEffectChanged(effectName, null, true);
    }, [ effectName ]);

    return (
        <CollapsiblePanel label={effect.displayName} defaultIsOpen={true} rightElement={<Button icon="trash" minimal={true} onClick={onDeleteClick} />}>
            {() => (
                <ConfigurationForm
                    parameters={effect.parameters}
                    parameterValues={effectConfig}
                    onParameterValuesChanged={onParameterValuesChanged}
                    reportAllValues={true} />
            )}
        </CollapsiblePanel>
    );
};

const LayerSelectionEditor = ({ onHandleUpload, onElementConfigChanged, onStyleChanged, onEffectChanged }) => {
    const layerSelectionContext = useLayerSelectionContext();

    if (!layerSelectionContext)
        return null;

    const { allowedStyles, mergedElement, mergedEffects, mergedStyle } = layerSelectionContext;

    let elementPanel = null;
    if (mergedElement && mergedElement.element.manifest.parameters && mergedElement.element.manifest.parameters.length > 0) {
        elementPanel = (
            <CollapsiblePanel label={mergedElement.element.manifest.name} defaultIsOpen={true}>
                <div className="layer-config-panel">
                    <ConfigurationForm
                        parameters={mergedElement.element.manifest.parameters}
                        parameterValues={mergedElement.config}
                        reportAllValues={true}
                        onParameterValuesChanged={onElementConfigChanged}
                        onHandleUpload={onHandleUpload} />
                </div>
            </CollapsiblePanel>
        );
    }

    // effects
    let effectsPanels;
    if (mergedEffects) {
        effectsPanels = Object.entries(mergedEffects).map(([effectName, effectConfig]) => (
            <EffectPanel key={effectName} effectName={effectName} effectConfig={effectConfig} onEffectChanged={onEffectChanged} />
        ));
    }

    let stylePanels;
    if (allowedStyles && allowedStyles.length > 0) {
        stylePanels = allowedStyles.map(styleName => {
            return (
                <StylePanel key={styleName} styleName={styleName} style={mergedStyle} onStyleChanged={onStyleChanged} />
            );
        });
    }

    // styles
    /*
    let stylePanels;
    if (mergedStyles) {
        stylePanels = mergedStyles.map(mergedStyle => (
            <StylePanel key={mergedStyle.name} mergedStyle={mergedStyle} onStyleChanged={onStyleChanged} />
        ));
    }
    */

    return <>
        {elementPanel}
        {effectsPanels}
        {stylePanels}
    </>;
}

const AnimationSelectionEditor = ({ onAnimationChanged }) => {
    const { mergedAnimation } = useAnimationSelectionContext();

    const onAnimationChangedInternal = useCallback((config, trackUndo) => {
        onAnimationChanged(config);
    }, []);

    const onPresetConfigChanged = useCallback((config) => {
        onAnimationChanged({ config });
    }, []);

    // show nothing if no animation is selected
    if (!mergedAnimation)
        return null;

    let animationForm;
    if (mergedAnimation) {
        animationForm = <ConfigurationForm
            parameters={ANIMATION_PARAMETERS}
            parameterValues={mergedAnimation}
            onParameterValuesChanged={onAnimationChangedInternal}
            reportAllValues={true} />;
    }

    let presetForm;
    if (mergedAnimation && mergedAnimation.preset && mergedAnimation.preset != MERGE_CONFLICT) {
        const preset = AnimationPresets[mergedAnimation.preset];
        presetForm = <ConfigurationForm
            parameters={preset.parameters}
            parameterValues={mergedAnimation.config}
            onParameterValuesChanged={onPresetConfigChanged}
            reportAllValues={true} />;
    }

    return (
        <CollapsiblePanel label="Animation" defaultIsOpen={true}>
            {animationForm}
            {presetForm}
        </CollapsiblePanel>
    );
};

const LayerConfigPanel = () => {
    const [[selectedPropertyTab, selectedLayerIds, selectedAnimations], dispatch] = useOverlayEditorContext(state => state.selectedPropertyTab, state => state.selectedLayerIds, state => state.selectedAnimations);
    
    const setSelectedPropertyTab = useCallback((tabId) => {
        dispatch("SelectPropertyTab", tabId);
    }, []);

    const onHandleUpload = useCallback((files, onComplete) => {
        dispatch("HandleFileUpload", { files, onComplete, autoCreateLayers: false });
    }, []);

    const onElementConfigChanged = useCallback((config, trackUndo) => {
        dispatch("UpdateSelectedLayersConfig", { config }, trackUndo);
    }, []);

    const onEffectChanged = useCallback((effectName, config, trackUndo) => {
        dispatch("UpdateSelectedLayersEffect", { effectName, config }, trackUndo);
    }, []);

    const onStyleChanged = useCallback((style, trackUndo) => {
        dispatch("UpdateSelectionStyle", style, trackUndo);
    }, []);

    const onAnimationChanged = useCallback((newProps) => {
        dispatch("UpdateSelectedAnimations", newProps);
    }, []);

    let layerPanel;
    if (selectedLayerIds.length > 0) {
        layerPanel = <LayerSelectionEditor
            onHandleUpload={onHandleUpload}
            onElementConfigChanged={onElementConfigChanged}
            onStyleChanged={onStyleChanged}
            onEffectChanged={onEffectChanged} />;
    }


    let animationPanel;
    if (selectedAnimations.length > 0) {
        animationPanel = <AnimationSelectionEditor
            onHandleUpload={onHandleUpload}
            onAnimationChanged={onAnimationChanged} />;
    }

    return (
        <Tabs id="property-tabs" onChange={setSelectedPropertyTab} selectedTabId={selectedPropertyTab} animate={false} className="normal-tabs">
            <Tab id="layer" disabled={layerPanel == null} panel={layerPanel}><div className="title">Layer</div></Tab>
            <Tab id="animation" disabled={animationPanel == null} panel={animationPanel}><div className="title">Animation</div></Tab>
        </Tabs>
    );

    
}

export default LayerConfigPanel;
