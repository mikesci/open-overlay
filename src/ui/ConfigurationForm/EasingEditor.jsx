import { HTMLSelect, Popover, Button, ButtonGroup } from "@blueprintjs/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useConfigurationFormContext } from "./ConfigurationFormContext.jsx";

const EASING_OPTIONS = [
    { label: "Linear", value: "linear", points: [0,0,1,1] },
    { label: "Ease", value: "ease", points: [0.25, 0.1, 0.25, 1] },
    { label: "Ease In", value: "ease-in", points: [0.42, 0, 1, 1] },
    { label: "Ease Out", value: "ease-out", points: [0, 0, 0.58, 1] },
    { label: "Ease In/Out", value: "ease-in-out", points: [0.42, 0, 0.58, 1] },
    { label: "Custom", value: "custom" }
];

const TIMING_REGEX = /cubic\-bezier\(\s*(-?[\d\.]+)\s*,\s*(-?[\d\.]+)\s*,\s*(-?[\d\.]+)\s*,\s*(-?[\d\.]+)\s*\)/;

// takes normalized control point coordinates and makes them relative to our SVG editor canvas
const denormalize = (coords) => {
    return [
        30 + (coords[0] * 40),
        70 - (coords[1] * 40),
        30 + (coords[2] * 40),
        70 - (coords[3] * 40)
    ];
};

const normalize = (coords) => {
    return [
        (coords[0] - 30) / 40,
        (70 - coords[1]) / 40,
        (coords[2] - 30) / 40,
        (70 - coords[3]) / 40
    ];
};

const pointsToParameterValue = (points) => {
    return `cubic-bezier(${points[0]},${points[1]},${points[2]},${points[3]})`;
};

const bindHandleMonitor = (evt, onChanged) => {
    const svgRect = evt.target.closest("svg").getBoundingClientRect();
    const scaleX = (svgRect.width / 100);
    const scaleY = (svgRect.height / 100);
    const originalMouseX = evt.clientX;
    const originalMouseY = evt.clientY;
    const originalPointX = parseFloat(evt.target.getAttribute("x"));
    const originalPointY = parseFloat(evt.target.getAttribute("y"));
    let lastX = originalPointX;
    let lastY = originalPointY;

    const onMouseMove = (moveEvt) => {
        const deltaX = (moveEvt.clientX - originalMouseX) / scaleX;
        const deltaY = (moveEvt.clientY - originalMouseY) / scaleY;
        lastX = Math.min(70, Math.max(30, originalPointX + deltaX));
        lastY = originalPointY + deltaY;
        onChanged(lastX, lastY, false);
    };
    const onMouseUp = (evt) => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        onChanged(lastX, lastY, true);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
};

const CustomEasingEditor = ({ value, onChange }) => {
    const [controlPointsOverride, setControlPointsOverride] = useState();

    const denormalizedPoints = useMemo(() => {
        let normalizedPoints;
        let easingOption = EASING_OPTIONS.find(r => r.value == value);
        if (easingOption) {
            normalizedPoints = easingOption.points;
        }
        else {
            const matches = value.match(TIMING_REGEX);

            // if the regex fails for some reason, default to linear
            if (!matches) { return [0,0,1,1]; }
            
            normalizedPoints = [
                parseFloat(matches[1]), // x1
                parseFloat(matches[2]), // y1
                parseFloat(matches[3]), // x2
                parseFloat(matches[4])  // y2
            ];
        }

        return denormalize(normalizedPoints);
    }, [ value ]);

    const onMouseDownHandleA = useCallback((evt) => {
        bindHandleMonitor(evt, (x, y, complete) => {
            if (!complete) {
                setControlPointsOverride([x, y, denormalizedPoints[2], denormalizedPoints[3]]);
            } else {
                setControlPointsOverride(null);
                const normalizedControlPoints = normalize([x, y, denormalizedPoints[2], denormalizedPoints[3] ]);
                onChange(pointsToParameterValue(normalizedControlPoints));
            }
        });
    }, [denormalizedPoints]);

    const onMouseDownHandleB = useCallback((evt) => {
        bindHandleMonitor(evt, (x, y, complete) => {
            if (!complete) {
                setControlPointsOverride([denormalizedPoints[0], denormalizedPoints[1], x, y]);
            } else {
                setControlPointsOverride(null);
                const normalizedControlPoints = normalize([denormalizedPoints[0], denormalizedPoints[1], x, y]);
                onChange(pointsToParameterValue(normalizedControlPoints));
            }
        });
    }, [denormalizedPoints]);

    const points = (controlPointsOverride || denormalizedPoints);

    return (
        <div className="custom-easing-editor">
            <svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="30" width="40" height="40" fill="#fff" stroke="#000" strokeWidth="1" />
                <path d={`M 30 70 C ${points[0]} ${points[1]}, ${points[2]} ${points[3]}, 70 30`} stroke="#000" strokeWidth="1" fillOpacity="0" />
                <line x1="30" y1="70" x2={points[0]} y2={points[1]} stroke="red" strokeWidth="1" />
                <line x1="70" y1="30" x2={points[2]} y2={points[3]} stroke="red" strokeWidth="1" />
                <rect x={points[0] - 3} y={points[1] - 3} width="6" height="6" fill="#000" className="handle" onMouseDown={onMouseDownHandleA} />
                <rect x={points[2] - 3} y={points[3] - 3} width="6" height="6" fill="#000" className="handle" onMouseDown={onMouseDownHandleB} />
            </svg>
        </div>
    );
}

const EasingEditor = ({ parameter }) => {
    const [value, onValueChanged] = useConfigurationFormContext(parameter);
    const [customPopoverOpen, setCustomPopoverOpen] = useState(false);
    
    const onChangeSelect = useCallback((evt) => {
        const value = evt.target.value;
        if (value == "custom") {
            // do something else
            onValueChanged(parameter, "cubic-bezier(0.50, -0.5, 0.5, 1.5)", true);
            setCustomPopoverOpen(true);
        } else {
            onValueChanged(parameter, evt.target.value, true);
        }
    }, []);

    const onChangeCustom = useCallback((value) => {
        onValueChanged(parameter, value, true);
    }, []);

    let customPopover;
    if (customPopoverOpen)
        customPopover = <CustomEasingEditor value={value} onChange={onChangeCustom} />

    const selectValue = (value && value.indexOf("cubic-bezier") > -1 ? "custom" : value);

    return (
        <div className="easing-input">
            <ButtonGroup fill={true}>
                <HTMLSelect value={selectValue} onChange={onChangeSelect} fill={true} options={EASING_OPTIONS} />
                <Popover position="right" boundary="window" isOpen={customPopoverOpen} onInteraction={setCustomPopoverOpen}>
                    <Button icon="caret-right" />
                    <div className="popover-body">
                        {customPopover}
                    </div>
                </Popover>
            </ButtonGroup>
        </div>
    );
};

export default EasingEditor;