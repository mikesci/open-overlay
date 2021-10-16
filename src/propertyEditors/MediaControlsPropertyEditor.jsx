import React, { useCallback, useEffect, useState } from "react";
import { Button, ButtonGroup, ControlGroup, Slider } from "@blueprintjs/core";
import CollapsiblePanel from "../ui/CollapsiblePanel.jsx";
import "./MediaControlsPropertyEditor.css";

const updateWhenRelevantPropertiesChange = (prevProps, nextProps) => {
    if (prevProps.layerDOM != nextProps.layerDOM) { return false; }
    return true;
};

const MediaControlsPropertyEditor = ({ layerDOM }) => {
    const [scrubber, setScrubber] = useState({ duration: 1, currentTime: 0, disabled: true });

    const onPlayClick = useCallback(() => layerDOM.play(), [ layerDOM ]);
    const onPauseClick = useCallback(() => layerDOM.pause(), [ layerDOM ]);
    const onStopClick = useCallback(() => { layerDOM.stop(); setScrubber(prev => ({...prev, currentTime: 0})); } , [ layerDOM ]);
    const onPositionChange = useCallback((value) => {
        if (!layerDOM) { return null; }
        layerDOM.currentTime = value;
        setScrubber(prev => ({...prev, currentTime: value}));
    }, [ layerDOM ]);

    useEffect(() => {
        if (!layerDOM) { return; }
        // poll the media layer every 500ms for status updates
        const updateStatusInterval = setInterval(() => {
            const duration = layerDOM.duration;
            const currentTime = layerDOM.currentTime;
            setScrubber({ duration, currentTime, disabled: false });
        }, 500);
        return () => clearInterval(updateStatusInterval);
    }, [layerDOM]);

    const sliderMax = Math.max(scrubber.duration, 1);

    return (
        <CollapsiblePanel label="Media Controls" defaultIsOpen={true}>
            <ControlGroup fill={true}>
                <div className="media-controls-scrubber-container">
                    <Slider
                        value={scrubber.currentTime}
                        showTrackFill={true}
                        min={0}
                        max={sliderMax}
                        stepSize={0.1}
                        labelStepSize={sliderMax}
                        disabled={scrubber.disabled}
                        onRelease={onPositionChange} />
                </div>
                <ButtonGroup>
                    <Button icon="play" onClick={onPlayClick} disabled={layerDOM == null} />
                    <Button icon="pause" onClick={onPauseClick} disabled={layerDOM == null} />
                    <Button icon="stop" onClick={onStopClick} disabled={layerDOM == null} />
                </ButtonGroup>
            </ControlGroup>
        </CollapsiblePanel>
    );
};

export default React.memo(MediaControlsPropertyEditor, updateWhenRelevantPropertiesChange);