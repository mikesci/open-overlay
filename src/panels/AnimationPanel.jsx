import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Button, Icon, Tag, ButtonGroup, Popover, Tooltip, Menu, MenuItem } from "@blueprintjs/core";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext";
import AnimationPhase from "../shared/AnimationPhase.js";
import AnimationCreators from "../shared/AnimationCreators.js";
import AnimationPresets from "../shared/AnimationPresets";
import { HotkeySets, useHotkeys } from "../shared/useHotkeys";
import "./AnimationPanel.css";

const KEYFRAME_START = { isStartEnd: true, offset: 0 };
const KEYFRAME_END = { isStartEnd: true, offset: 1 };

const KeyframeHandle = ({ keyframe, offset, prevOffset, onMouseDown }) => {

    const onMouseDownInternal = useCallback(evt => {
        if ((evt.buttons & 1) == 1 && onMouseDown) {
            const targetIsSegment = evt.target.classList.contains("keyframe-handle");
            onMouseDown(evt, keyframe, targetIsSegment);
        }
    }, [onMouseDown, keyframe]);

    return (
        <div className="keyframe-handle" style={{ left: (prevOffset * 100) + "%", width: ((offset - prevOffset) * 100) + "%" }} onMouseDown={onMouseDownInternal}>
            <Icon icon={keyframe.isStartEnd ? "symbol-square" : "symbol-diamond"} />
        </div>
    );
}

const Scrubber = ({ animationContext, timelineDuration, onChangeOffset, onGetClipOffsets, showCaret = false }) => {

    const scrubberRef = useRef();
    const caretRef = useRef();

    const onMouseDown = useCallback(mouseDownEvt => {
        const scrubberRect = scrubberRef.current.getBoundingClientRect();
        const clipOffsets = onGetClipOffsets();
        const clipSize = timelineDuration * 0.01; // clip size is 1% of duration
        const getOffsetFromMouseEvent = (evt) => Math.max(0, Math.min(1, ((evt.clientX - scrubberRect.left) / scrubberRect.width))) * animationContext.duration;

        // immediately change the offset to the click
        onChangeOffset(getOffsetFromMouseEvent(mouseDownEvt));

        // and then also change whenever the mouse is moved
        const onMouseMove = (moveEvt) => {
            let newOffset = getOffsetFromMouseEvent(moveEvt);
            // clipping is disabled by ctrlKey
            if (!moveEvt.ctrlKey) {
                for(const clipOffset of clipOffsets) {
                    if (Math.abs(clipOffset - newOffset) < clipSize) {
                        newOffset = clipOffset;
                        break;
                    }
                }
            }
            onChangeOffset(newOffset);
        };

        const onMouseUp = (evt) => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

    }, [ animationContext, timelineDuration, onGetClipOffsets ]);

    useEffect(() => {
        if (!showCaret)
            return;

        if (animationContext.phase == AnimationPhase.STATIC)
            return;
            
        // handle animation changes
        for(const animation of caretRef.current.getAnimations())
            animation.cancel();

        const animation = caretRef.current.animate([
            { offset: 0, left: 0 },
            { offset: 1, left: "100%" }
        ], {
            delay: (animationContext.playing ? 0 : 1 - animationContext.offset), // we have to set the animation to be off by 1ms to keep it from finishing and being cleaned up
            duration: timelineDuration
        });

        if (animationContext.playing) {
            animation.play();
        } else {
            animation.pause();
        }
    }, [showCaret, animationContext, timelineDuration]);

    // render the labels
    const labels = useMemo(() => {
        const duration = timelineDuration;
        const ms = Math.pow(10, parseInt(Math.log10(duration)));
        let labelElements = [];
        let i = 0;
        while (i < duration) {
            //const stepLength = (i > duration ? i - duration : ms);
            const stepLength = (i + ms > duration ? duration - i : ms); // add either a full step or whatever is left to the end
            i += stepLength;
            const stepPercent = (stepLength / duration) * 100;
            labelElements.push(<label key={i} style={{ width: stepPercent + "%" }}>{i}ms</label>)
        }
        return labelElements;
    }, [ timelineDuration ]);

    let caret;
    if (showCaret) {
        caret = (
            <div className="caret" ref={caretRef}>
                <Icon icon="caret-down" />
            </div>
        );
    }

    return (
        <div className="scrubber" onMouseDown={onMouseDown} ref={scrubberRef}>
            {caret}
            {labels}
        </div>
    );
}

const AnimationRow = ({ animation, selected, timelineDuration, dispatch }) => {

    const [animationOverride, setAnimationOverride] = useState();

    const onClick = useCallback(evt => {
        dispatch("SelectAnimation", { id: animation.id, additive: evt.ctrlKey });
    }, [animation.id]);

    const onDeleteClick = useCallback(() => {
        dispatch("DeleteAnimation", animation.id);
    }, [ animation ]);

    const onKeyframeHandleMouseDown = useCallback((evt, keyframe, targetIsSegment) => {
        // get the width of the phase-layer element to get it's rect
        const ctrlKey = evt.ctrlKey;
        const containerRect = evt.target.closest(".timeline").getBoundingClientRect();
        const startMouseX = evt.clientX;
        let lastAnimation = animation;
        //let lastOffset = keyframe.offset;

        const onMouseMove = (moveEvt) => {
            // get the difference in Ms that we've moved
            const deltaOffset = (moveEvt.clientX - startMouseX) / containerRect.width;
            const deltaMs = deltaOffset * timelineDuration;

            let delay;
            let duration;
            //let keyframes;

            if (targetIsSegment) {
                // if target is a segment, then we move the whole animation - only changing delay
                delay = Math.min((timelineDuration - animation.duration), Math.max(0, animation.delay + deltaMs));
            } else if (keyframe.offset == 0 && !ctrlKey) { // handle resizing start
                delay = Math.min((animation.delay + animation.duration - 1), Math.max(0, animation.delay + deltaMs));
                duration = animation.duration - (delay - animation.delay);
            } else if (keyframe.offset == 1 && !ctrlKey) { // handle resizing end
                duration = Math.min(timelineDuration - animation.delay, Math.max(1, animation.duration + deltaMs));
            }

            /*
            if (targetIsSegment) {
                // if target is a segment, then we move the whole animation - only changing delay
                delay = Math.min((phaseDuration - animation.duration), Math.max(0, animation.delay + deltaMs));
            } else if (keyframe.offset == 0 && !ctrlKey) { // handle resizing start
                delay = Math.min((animation.delay + animation.duration - 1), Math.max(0, animation.delay + deltaMs));
                duration = animation.duration - (delay - animation.delay);
            } else if (keyframe.offset == 1 && !ctrlKey) { // handle resizing end
                duration = Math.min(phaseDuration - animation.delay, Math.max(1, animation.duration + deltaMs));
            } else {
                const newOffset = Math.min(1, Math.max(0, keyframe.offset + (deltaOffset / (animation.duration / phaseDuration))));
                lastOffset = newOffset;
                let needsSort;
                keyframes = animation.keyframes.map((existingKeyframe, index) => {
                    if (existingKeyframe != keyframe)
                        return existingKeyframe;

                    if (index > 0 && animation.keyframes[index-1].offset > newOffset)
                        needsSort = true;
                    else if (index < (animation.keyframes.length - 1) && animation.keyframes[index + 1].offset < newOffset)
                        needsSort = true;

                    return {
                        ...existingKeyframe,
                        offset: newOffset
                    };
                });
                if (needsSort)
                    keyframes = keyframes.sort((a, b) => a.offset - b.offset);
            }
            */

            lastAnimation = {
                ...animation,
                delay: (delay != null ? delay : animation.delay),
                duration: (duration != null ? duration : animation.duration),
                //keyframes: (keyframes != null ? keyframes : animation.keyframes)
            };

            setAnimationOverride(lastAnimation);
        };

        const onMouseUp = (upEvt) => {

            // if we didn't change the animation, then treat this as a selection
            // otherwise, update it
            if (animation == lastAnimation)
                dispatch("SelectAnimation", { id: animation.id, additive: upEvt.ctrlKey });
            else (lastAnimation)
                dispatch("UpdateAnimation", lastAnimation);
            
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            setAnimationOverride(null);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }, [timelineDuration, animation]);

    // override the animation if we have it set
    if (animationOverride)
        animation = animationOverride;

    let keyframeHandles = [];
    if (animation.preset) {
        const startOffset = animation.delay / timelineDuration;
        const endOffset = (animation.delay + animation.duration) / timelineDuration;
        keyframeHandles.push(
            <KeyframeHandle
                key="start"
                keyframe={KEYFRAME_START}
                offset={startOffset}
                prevOffset={startOffset}
                onMouseDown={onKeyframeHandleMouseDown} />
        );
        keyframeHandles.push(<KeyframeHandle
            key="end"
            keyframe={KEYFRAME_END}
            offset={endOffset}
            prevOffset={startOffset}
            onMouseDown={onKeyframeHandleMouseDown} />
        );
    } else {

    }

    const presetDisplayName = (animation.preset ? AnimationPresets[animation.preset].displayName : null);

    return (
        <div className="animation-row" isselected={selected.toString()} onClick={onClick}>
            <div className="animation-name label-width">
                <Button minimal={true} icon="trash" onClick={onDeleteClick} />
                <Tag>{presetDisplayName}</Tag>
            </div>
            <div className="timeline">
                {keyframeHandles}
            </div>
        </div>
    );
}

const NewAnimationPopover = ({ phaseKey, layer, dispatch, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const onInteraction = useCallback((nextOpenState) => {
        setIsOpen(nextOpenState);
    }, []);

    const onCreateAnimation = useCallback((creator) => {
        const animation = creator.create(layer);
        dispatch("CreateAnimation", { layerid: layer.id, animation });
    }, [ layer ]);

    let content;
    if (isOpen) {
        content = (
            <Menu>
                {AnimationCreators[phaseKey].map(creator => (
                    <MenuItem key={creator.displayName} text={creator.displayName} onClick={() => onCreateAnimation(creator)} />
                ))}
            </Menu>
        );
    }

    return (
        <Popover position="top" boundary="window" isOpen={isOpen} onInteraction={onInteraction}>
            {children}
            {content}
        </Popover>
    );
}

const AnimationPhaseLayer = ({ phaseKey, timelineDuration, layer, animations, selectedAnimations, dispatch }) => {
    let layerAnimations;

    // filter down to animations for just this phase and layer
    if (layer.animations && animations) {
        layerAnimations = animations.filter(r => r.phase == phaseKey && layer.animations.includes(r.id)).map(animation => (
            <AnimationRow
                key={animation.id}
                animation={animation}
                selected={selectedAnimations.includes(animation.id)}
                timelineDuration={timelineDuration}
                dispatch={dispatch} />
        ));
    }

    // NOTE: this needs to be collapsable
    return (
        <div className="phase-layer">
            <div className="layer-name-row">
                <div className="label-width">
                    <label>{layer.label}</label>
                    <NewAnimationPopover phaseKey={phaseKey} layer={layer} dispatch={dispatch}>
                        <Tooltip position="top" content="New Animation">
                            <Button icon="plus" small={true} minimal={true} />
                        </Tooltip>
                    </NewAnimationPopover>
                </div>
            </div>
            {layerAnimations}
        </div>
    );
}

const AnimationPanel = () => {
    const [[selectedLayerIds, selectedAnimations, layers, animations, animationContext], dispatch] = useOverlayEditorContext(state => state.selectedLayerIds, state => state.selectedAnimations, state => state.overlay.layers, state => state.overlay.animations, state => state.animationContext);
    const [currentPhase, setCurrentPhase] = useState(AnimationPhase.ENTRY);
    const [timelineDuration, setTimelineDuration] = useState(500);

    useHotkeys(HotkeySets.ANIMATION);

    const [showAllLayers, setShowAllLayers] = useState(true);

    const onWheel = useCallback(({ ctrlKey, deltaY }) => {
        if (ctrlKey)
            setTimelineDuration(old => Math.max(0, old + deltaY));
    }, []);

    const onPlayPauseClick = useCallback(() => {
        dispatch("ToggleAnimationPlaying", { phase: currentPhase, duration: timelineDuration });
    }, [currentPhase, timelineDuration]);

    const onPlayPauseKeyDown = useCallback(evt => {
        // kill spacebar/enter on play pause button (handled by global hotkeys)
        console.log(" pp key down", { key: evt.key });
        if (evt.key == " " || evt.key == "Enter") { evt.stopPropagation(); evt.preventDefault(); }
    }, []);

    const onChangeScrubberOffset = useCallback((offset) => {
        // only allow scrubbing to whole ms positions
        offset = parseInt(Math.round(offset));
        dispatch("SetAnimationContext", { offset });
    }, []);

    const onGetClipOffsets = useCallback(() => {
        let clipOffsets = [];
        /*
        for(const layer of layers) {
            if (!layer.animations) { continue; }

            const phaseAnimation = layer.animations[animationContext.phase.key];
            if (!phaseAnimation) { continue; }

            if (!clipOffsets.includes(phaseAnimation.delay))
                clipOffsets.push(phaseAnimation.delay);

            const end = phaseAnimation.delay + phaseAnimation.duration;
            if (!clipOffsets.includes(end))
                clipOffsets.push(end);

            for(const keyframe of phaseAnimation.keyframes) {
                const keyframeOffset = phaseAnimation.delay + (keyframe.offset * phaseAnimation.duration);
                if (!clipOffsets.includes(keyframeOffset))
                    clipOffsets.push(keyframeOffset);
            }
        }
        */
        return clipOffsets;
    }, [layers, animationContext.phase.key]);

    const targetLayers = (showAllLayers ? layers : layers.filter(r => selectedLayerIds.includes(r.id))) || [];
    
    return (
        <div className="animation-panel" onWheel={onWheel}>
            <div className="phase-layers">
                <div className="phase-header">
                    <ButtonGroup>
                        <Button key="entry" text={AnimationPhase.ENTRY.displayName} active={currentPhase == AnimationPhase.ENTRY} onClick={() => setCurrentPhase(AnimationPhase.ENTRY)} />
                        <Button key="exit" text={AnimationPhase.EXIT.displayName} active={currentPhase == AnimationPhase.EXIT} onClick={() => setCurrentPhase(AnimationPhase.EXIT)} />
                    </ButtonGroup>
                    <div className="timing">
                        <Button minimal={true} tabIndex={-1} icon={animationContext.playing ? "pause" : "play"} onClick={onPlayPauseClick} onKeyDown={onPlayPauseKeyDown} />
                    </div>
                    <Tooltip content={showAllLayers ? "Showing selected & unselected layers" : "Showing selected layers only"}>
                        <Button icon="eye-open" active={showAllLayers} onClick={evt => setShowAllLayers(!showAllLayers)} />
                    </Tooltip>
                </div>
                <div className="scrubber-row">
                    <div className="label-width"></div>
                    <Scrubber
                        showCaret={animationContext.playing}
                        timelineDuration={timelineDuration}
                        animationContext={animationContext}
                        onChangeOffset={onChangeScrubberOffset}
                        onGetClipOffsets={onGetClipOffsets} />
                </div>
                <div className="scroll-body">
                    {targetLayers.map(layer => (
                        <AnimationPhaseLayer
                            key={layer.id}
                            phaseKey={currentPhase.key}
                            animationContext={animationContext}
                            timelineDuration={timelineDuration}
                            layer={layer}
                            animations={animations}
                            selectedAnimations={selectedAnimations}
                            dispatch={dispatch} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AnimationPanel;