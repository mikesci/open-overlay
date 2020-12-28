import React, { useCallback, useMemo, useState } from "react";
import { Button, ButtonGroup, Popover, Tab, Tabs } from "@blueprintjs/core";
import ConfigurationForm from "../ui/ConfigurationForm/ConfigurationForm.jsx";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";
import CollapsiblePanel from "../ui/CollapsiblePanel.jsx";
import { useLayerSelectionContext } from "../shared/LayerSelectionContext.js";
import styleEditors from "../shared/styleEditors.js";
import { effects } from "./Effects.jsx";
import "./LayerConfigPanel.css";
import AnimationPhase from "../shared/AnimationPhase.js";
import Transitions from "../shared/Transitions.js";
import AnimationState from "../shared/AnimationState.js";

const TRANSITION_PARAMETERS = [
    { type: "group", items: [
        { name: "delay", displayName: "Delay", type: "number", tag: "ms", width: 25, step: 10, immediate: false },
        { name: "duration", displayName: "Duration", type: "number", tag: "ms", width: 25, step: 10, min: 0, immediate: false },
        { name: "easing", displayName: "Easing", type: "easing", width: 50 }
    ]}
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

const ElementConfigEditor = ({ element, config, onHandleUpload, onChanged }) => {
    return (
        <div className="element-config-editor">
            <ConfigurationForm
                parameters={element.manifest.parameters}
                parameterValues={config}
                onParameterValuesChanged={onChanged}
                onHandleUpload={onHandleUpload}
                reportAllValues={true} />
        </div>
    );
}

const LayerStyleEditor = ({ style, onHandleUpload, onStyleChanged }) => {
    const { allowedStyles } = useLayerSelectionContext();

    if (!allowedStyles || allowedStyles.length == 0) {
        return (
            <div>The selection has no common style properties.</div>
        );
    }

    return allowedStyles.map(styleName => (
        <StylePanel key={styleName} styleName={styleName} style={style} onStyleChanged={onStyleChanged} onHandleUpload={onHandleUpload} />
    ));
}

const TransitionEditor = ({ transitionName, transition, transitionConfig, onUpdate, isPlaying, onTogglePlaying }) => {
    // transitionName, transition, onUpdate, onTogglePlaying are all constants
    //if (transitionName == "custom")

    const onTransitionConfigChanged = useCallback((props) => {
        onUpdate(transitionName, props);
    }, []);

    let transitionSpecificConfigForm;
    if (transition.isCustom) {
        transitionSpecificConfigForm = (
            <div className="custom-transition-form">
                <LayerStyleEditor style={transitionConfig} onStyleChanged={onTransitionConfigChanged} />
            </div>
        );
    } else if (transition.parameters) {
        transitionSpecificConfigForm = (
            <div className="transition-config-form">
                <ConfigurationForm
                    parameters={transition.parameters}
                    parameterValues={transitionConfig}
                    onParameterValuesChanged={onTransitionConfigChanged}
                    reportAllValues={false} />
            </div>
        );
    }

    return (
        <div className="transition-editor">
            <h5 className="bp3-heading">
                {transition.displayName}
                <Button icon={isPlaying ? "pause" : "play"} intent={isPlaying ? "warning" : "success"} minimal={true} onClick={onTogglePlaying} />
            </h5>
            {transitionSpecificConfigForm}
            <div className="timing-form">
                <ConfigurationForm
                    parameters={TRANSITION_PARAMETERS}
                    parameterValues={transitionConfig}
                    onParameterValuesChanged={onTransitionConfigChanged}
                    reportAllValues={false} />
            </div>
        </div>
    );
}

const TransitionItem = ({ transitionName, transition, transitionConfig, isEditing, onEdit, onAdd, onDelete, onUpdate, isPlaying, onTogglePlaying }) => {

    const intent = (transitionConfig ? "primary" : null);

    const onAddDeleteClick = (evt) => {
        if (transitionConfig)
            onDelete(transitionName);
        else
            onAdd(transitionName, !evt.ctrlKey);
            
        onTogglePlaying();
    };

    const addDeleteButton = (
        <Button small={true} icon={transitionConfig ? "trash" : "plus"} intent={intent} onClick={onAddDeleteClick} />
    );

    let mainButton = (<Button small={true} fill={true} alignText="left" text={transition.displayName} disabled={!transitionConfig} rightIcon={transitionConfig ? "cog" : null} intent={intent} onClick={() => onEdit(transition)} />);
    if (isEditing) {
        mainButton = (
            <Popover position="right" boundary="window" fill={true} isOpen={true} onInteraction={nextOpenState => onEdit(null)}>
                {mainButton}
                <TransitionEditor transitionName={transitionName} transition={transition} transitionConfig={transitionConfig || transition.initialConfig} onUpdate={onUpdate} isPlaying={isPlaying} onTogglePlaying={onTogglePlaying} />
            </Popover>
        );
    }

    return (
        <div className="transition-item">
            <ButtonGroup fill={true}>
                {addDeleteButton}
                {mainButton}
            </ButtonGroup>
        </div>
    );
};

const TransitionPhasePanel = ({ phase, transitionConfigs, transitionBeingEdited, animationContext, onEdit, onAdd, onDelete, onUpdate, onTogglePlaying }) => {

    const onUpdateInternal = useCallback((transitionName, transitionConfig) => {
        onUpdate(transitionName, transitionConfig);
        // every time an update is made, also toggle the animation playing for preview purposes
        onTogglePlaying(phase);
    }, [phase]);

    const onTogglePlayingForPhase = useCallback(() => {
        onTogglePlaying(phase);
    }, [phase]);

    const isPlaying = (animationContext.state == AnimationState.PLAYING && animationContext.phase == phase);

    // find all transitions that match the phase, and combine with the transition configs we have
    const items = Object.entries(Transitions).reduce((items, [transitionName, transition]) => {
        // only handle transitions for this phase
        if (transition.phase == phase.key) {
            const transitionConfig = transitionConfigs[transitionName];
            const isEditing = (transitionBeingEdited == transition);
            items.push(
                <TransitionItem
                    key={transitionName}
                    transitionName={transitionName}
                    transition={transition}
                    transitionConfig={transitionConfig}
                    isEditing={isEditing}
                    onEdit={onEdit}
                    onAdd={onAdd}
                    onDelete={onDelete}
                    onUpdate={onUpdateInternal}
                    isPlaying={isPlaying}
                    onTogglePlaying={onTogglePlayingForPhase} />
            );
        }
        return items;
    }, []);

    return (
        <div className="phase">
            <div className="header">
                {phase.displayName}
                <Button minimal={true} small={true} icon={isPlaying ? "pause" : "play"} intent={isPlaying ? "warning" : "success"} onClick={onTogglePlayingForPhase} />
            </div>
            <div className="item-list">
                {items}
            </div>
        </div>
    );
}

const TransitionsPanel = ({ animationContext, dispatch }) => {
    const visiblePhases = [AnimationPhase.ENTRY, AnimationPhase.EXIT];

    const { allowedStyles, mergedTransitions } = useLayerSelectionContext();

    if (!allowedStyles || allowedStyles.length == 0) {
        return (
            <div>The selection contains one or more layers that do not support transitions.</div>
        );
    }

    const [transitionBeingEdited, setTransitionBeingEdited] = useState();

    const onAdd = useCallback((transitionName, immediatelyEdit) => {
        dispatch("AddTransition", transitionName);
        if (immediatelyEdit)
            setTransitionBeingEdited(Transitions[transitionName]);
    }, [ ]);

    const onDelete = useCallback(transitionName => {
        dispatch("DeleteTransition", transitionName);
    }, [ ]);

    const onUpdate = useCallback((transitionName, transitionConfig) => {
        dispatch("UpdateTransition", { transitionName, transitionConfig });
    }, [ ]);

    const onTogglePlaying = useCallback((phase, duration) => {
        dispatch("ToggleAnimationPlaying", { phase, duration });
    }, [ ]);

    return (
        <div className="transitions-panel">
            <div className="phases-wrapper">
                {visiblePhases.map(phase => (
                    <TransitionPhasePanel
                        key={phase.key}
                        phase={phase}
                        transitionConfigs={mergedTransitions}
                        transitionBeingEdited={transitionBeingEdited}
                        animationContext={animationContext}
                        onEdit={setTransitionBeingEdited}
                        onAdd={onAdd}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onTogglePlaying={onTogglePlaying} />
                ))}
            </div>
        </div>
    );
};

const LayerConfigPanel = () => {
    const [[selectedPropertyTab, selectedLayerIds, animationContext], dispatch] = useOverlayEditorContext(
        state => state.selectedPropertyTab,
        state => state.selectedLayerIds,
        state => state.animationContext
    );

    const layerSelectionContext = useLayerSelectionContext();
    
    const setSelectedPropertyTab = useCallback((tabId) => {
        dispatch("SelectPropertyTab", tabId);
    }, []);

    const onHandleUpload = useCallback((files, onComplete) => {
        dispatch("HandleFileUpload", { files, onComplete, autoCreateLayers: false });
    }, []);

    const onElementConfigChanged = useCallback((config, trackUndo) => {
        dispatch("UpdateSelectedLayersConfig", { config }, trackUndo);
    }, []);

    const onStyleChanged = useCallback((style, trackUndo) => {
        dispatch("UpdateSelectionStyle", style, trackUndo);
    }, []);

    // layerSelectionContext may be null right at the very beginning
    if (!layerSelectionContext) {
        return (
            <div className="no-content">No layers are selected</div>
        );
    }

    let elementConfigPanel;
    let elementName = "Config";
    if (layerSelectionContext.mergedElement &&
        layerSelectionContext.mergedElement.element.manifest.parameters &&
        layerSelectionContext.mergedElement.element.manifest.parameters.length > 0) {
        elementConfigPanel = (
            <ElementConfigEditor
                element={layerSelectionContext.mergedElement.element}
                config={layerSelectionContext.mergedElement.config}
                onHandleUpload={onHandleUpload}
                onChanged={onElementConfigChanged} />
        );
        elementName = layerSelectionContext.mergedElement.element.manifest.name;
    }

    let layerStylePanel;
    let transitionsPanel;
    if (selectedLayerIds.length > 0) {
        layerStylePanel = (
            <LayerStyleEditor style={layerSelectionContext.mergedStyle} onHandleUpload={onHandleUpload} onStyleChanged={onStyleChanged} />
        );

        transitionsPanel = (
            <TransitionsPanel animationContext={animationContext} onHandleUpload={onHandleUpload} dispatch={dispatch} />
        );
    }

    // if we have neither transitions nor layers selected, render a special message
    if (!elementConfigPanel && !layerStylePanel && !transitionsPanel) {
        return (
            <div className="no-content">No layers are selected</div>
        );
    }

    // if a disabled tab is selected, move to the next one over
    let selectedTabId = selectedPropertyTab || "element";
    if (selectedTabId == "element" && !elementConfigPanel)
        selectedTabId = "style";    
    if (selectedTabId == "style" && !layerStylePanel)
        selectedTabId = "transitions";

    return (
        <Tabs id="property-tabs" onChange={setSelectedPropertyTab} selectedTabId={selectedTabId} animate={false} className="normal-tabs">
            <Tab id="element" panel={elementConfigPanel} disabled={!elementConfigPanel}><div className="title" title={!elementConfigPanel ? "Not Available" : null}>{elementName}</div></Tab>
            <Tab id="style" panel={layerStylePanel} disabled={!layerStylePanel}><div className="title" title={!layerStylePanel ? "Not Available" : null}>Style</div></Tab>
            <Tab id="transitions" panel={transitionsPanel} disabled={!transitionsPanel}><div className="title" title={!transitionsPanel ? "Not Available" : null}>Transitions</div></Tab>
        </Tabs>
    );
}

export default LayerConfigPanel;
