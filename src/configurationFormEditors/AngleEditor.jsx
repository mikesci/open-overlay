import React, { useCallback, useState } from "react";
import { useConfigurationFormContext } from "../shared/ConfigurationFormContext.js";
import TextBoxEditor from "./TextBoxEditor.jsx";

const AngleEditor = ({ parameter }) => {
    const [value, context] = useConfigurationFormContext(parameter);
    const [angleOverride, setAngleOverride] = useState();

    const onMouseDown = useCallback((evt) => {
        const target = evt.target;
        const originalY = evt.clientY;

        // set appearance
        target.classList.add("changing");

        // grab the original value
        let originalValue = parseFloat(target.getAttribute("data-value"));

        // default the original value to 0
        if (isNaN(originalValue) || !originalValue)
            originalValue = 0;

        // lastAngle will get changed every time the mouse moves
        // and emitted on mouse up
        let lastAngle = originalValue;

        const onMouseMove = (evt) => {
            lastAngle = originalValue + (evt.clientY - originalY);

            // snap to 15 degree increments unless ctrl is held
            if (!evt.ctrlKey) {
                if (lastAngle > 0)
                    lastAngle = (parseInt(lastAngle / 15) * 15) + (lastAngle % 15 >= 7.5 ? 15 : 0);
                else
                    lastAngle = (parseInt(lastAngle / 15) * 15) - (lastAngle % 15 <= 7.5 ? 15 : 0);
            }
            
            // update locally
            setAngleOverride(lastAngle);

            // emit immediate updates if necessary
            if (parameter.immediate)
                context.onParameterValueChanged(parameter, lastAngle, false);
        };

        const onMouseUp = (evt) => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);

            // revert appearance
            target.classList.remove("changing");

            // clear local state
            setAngleOverride(null);

            // emit a change event
            context.onParameterValueChanged(parameter, lastAngle, true);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }, []);
   
    const angle = (angleOverride != null ? angleOverride : value) || 0;
    
    return (
        <div className="angle-input">
            <svg className="widget" onMouseDown={onMouseDown} data-value={angle} style={{ transform: "rotate(" + angle + "deg)" }} version="1.1" viewBox="0 0 133.05 133.05" xmlns="http://www.w3.org/2000/svg">
                <path d="m66.524 0a66.524 66.524 0 0 0-66.524 66.524 66.524 66.524 0 0 0 66.524 66.524 66.524 66.524 0 0 0 66.524-66.524 66.524 66.524 0 0 0-66.524-66.524zm-7.1815 13.777v52.747c3e-6 2.5657 1.369 4.9364 3.591 6.2193 2.222 1.2829 4.9595 1.2829 7.1815 0 2.222-1.2829 3.591-3.6535 3.591-6.2193v-52.747a53.295 53.295 0 0 1 46.113 52.747 53.295 53.295 0 0 1-53.295 53.294 53.295 53.295 0 0 1-53.294-53.294 53.295 53.295 0 0 1 46.113-52.747z" style={{ paintOrder: "normal" }} />
            </svg>
            <TextBoxEditor parameter={{ ...parameter, type: "number" }} valueOverride={angle} />
        </div>
    );
};

export default AngleEditor;