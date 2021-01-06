import { useMemo } from "react";

const RAD = (Math.PI / 180);

const getInferredKeyframe = (offset, style, ...styleProperties) => {
    let inferredKeyframe = { offset };
    if (style) {
        for(const styleProperty of styleProperties) {
            inferredKeyframe[styleProperty] = style[styleProperty] || "initial";
        }
    }
    return inferredKeyframe;
}

const Transitions = {
    "fade-in": {
        displayName: "Fade In",
        phase: "entry",
        parameters: [
            { name: "fromOpacity", type: "number", displayName: "From", tag: "%", min: 0, max: 100, immediate: false }
        ],
        initialConfig: { delay: 0, duration: 500, easing: "linear", fromOpacity: 0 },
        keyframes: ({ fromOpacity = 0 }, layerStyle) => ([
            { offset: 0, opacity: (fromOpacity/100) },
            getInferredKeyframe(1, layerStyle, "opacity")
        ])
    },
    "slide-in": {
        displayName: "Slide In",
        phase: "entry",
        parameters: [
            { type: "group", items: [
                { name: "angle", type: "angle", displayName: "From", tag: "\u00b0", width: 50, inline: true },
                { name: "distance", type: "number", displayName: "\u00A0Distance", tag: "px", min: 0, step: 25, width: 50, inline: true }
            ]}
        ],
        initialConfig: { delay: 0, duration: 500, easing: "ease-out", angle: 90, distance: 2000 },
        keyframes: ({ angle = 0, distance = 2000 }, layerStyle) => {
            const layerTop = (layerStyle && layerStyle.top ? parseFloat(layerStyle.top) : 0);
            const layerLeft = (layerStyle && layerStyle.left ? parseFloat(layerStyle.left) : 0);
            const top = layerTop - (Math.cos(angle * RAD) * distance);
            const left = layerLeft + (Math.sin(angle * RAD) * distance);
            return [
                { offset: 0, top: top + "px", left: left + "px" },
                getInferredKeyframe(1, layerStyle, "top", "left")
            ];
        }
    },
    "transform-in": {
        displayName: "Transform In",
        phase: "entry",
        parameters: [
            { type: "group", items: [
                { name: "fromRotation", type: "angle", displayName: "Rotate", immediate: false, width: 50 },
                { name: "fromScale", type: "number", displayName: "Scale", min: 0, immediate: false, width: 50, tag: "%" }
            ]}
        ],
        initialConfig: { delay: 0, duration: 500, easing: "linear", fromRotation: 0, fromScale: 100 },
        keyframes: ({ fromRotation = 0, fromScale = 100 }, layerStyle) => {
            const layerTransform = (layerStyle ? layerStyle.transform : null) || "";
            return [
                { offset: 0, transform: `${layerTransform} rotate(${fromRotation}deg) scale(${fromScale/100})` },
                { offset: 1, transform: `${layerTransform} rotate(0) scale(1)` }
            ];
        }
    },
    "custom-in": {
        displayName: "Custom",
        phase: "entry",
        isCustom: true,
        initialConfig: { delay: 0, duration: 500, easing: "linear" },
        keyframes: ({ delay, duration, easing, ...style}, layerStyle) => {
            return [
                { offset: 0, ...style },
                getInferredKeyframe(1, layerStyle, ...Object.keys(style))
            ];
        }
    },
    "fade-out": {
        displayName: "Fade Out",
        phase: "exit",
        parameters: [
            { name: "toOpacity", type: "number", displayName: "To", tag: "%", min: 0, max: 100, immediate: false }
        ],
        initialConfig: { delay: 0, duration: 500, easing: "linear", toOpacity: 0 },
        keyframes: ({ toOpacity = 0 }, layerStyle) => ([
            getInferredKeyframe(0, layerStyle, "opacity"),
            { offset: 1, opacity: (toOpacity/100) }
        ])
    },
    "slide-out": {
        displayName: "Slide Out",
        phase: "exit",
        parameters: [
            { type: "group", items: [
                { name: "angle", type: "angle", displayName: "To", tag: "\u00b0", width: 50, inline: true },
                { name: "distance", type: "number", displayName: "\u00A0Distance", tag: "px", min: 0, step: 25, width: 50, inline: true }
            ]}
        ],
        initialConfig: { delay: 0, duration: 500, easing: "ease-in", angle: 90, distance: 2000 },
        keyframes: ({ angle = 0, distance = 2000 }, layerStyle) => {
            const layerTop = (layerStyle && layerStyle.top ? parseFloat(layerStyle.top) : 0);
            const layerLeft = (layerStyle && layerStyle.left ? parseFloat(layerStyle.left) : 0);
            const top = layerTop - (Math.cos(angle * RAD) * distance);
            const left = layerLeft + (Math.sin(angle * RAD) * distance);
            return [
                getInferredKeyframe(0, layerStyle, "top", "left"),
                { offset: 1, top: top + "px", left: left + "px" }
            ];
        }
    },
    "transform-out": {
        displayName: "Transform Out",
        phase: "exit",
        parameters: [
            { type: "group", items: [
                { name: "toRotation", type: "angle", displayName: "Rotate", immediate: false, width: 50 },
                { name: "toScale", type: "number", displayName: "Scale", min: 0, immediate: false, width: 50, tag: "%" }
            ]}
        ],
        initialConfig: { delay: 0, duration: 500, easing: "linear", toRotation: 0, toScale: 100 },
        keyframes: ({ toRotation = 0, toScale = 100 }, layerStyle) => {
            const layerTransform = (layerStyle ? layerStyle.transform : null) || "";
            return [
                { offset: 0, transform: `${layerTransform} rotate(0) scale(1)` },
                { offset: 1, transform: `${layerTransform} rotate(${toRotation}deg) scale(${toScale/100})` }
            ];
        }
    },
    "custom-out": {
        displayName: "Custom",
        phase: "exit",
        isCustom: true,
        initialConfig: { delay: 0, duration: 500, easing: "linear" },
        keyframes: ({ delay, duration, easing, ...style }, layerStyle) => {
            return [
                getInferredKeyframe(0, layerStyle, ...Object.keys(style)),
                { offset: 1, ...style }
            ];
        }
    }
};

const useTransitions = (layer) => {
    return useMemo(() => {
        if (!layer.transitions)
            return {};

        return Object.entries(layer.transitions).reduce((computedAnimations, [transitionKey, transitionConfig]) => {

            const transition = Transitions[transitionKey];
    
            if (!transition) {
                console.log("Unknown transition.", transitionKey);
                return computedAnimations;
            }
    
            let phaseAnimations = computedAnimations[transition.phase];
            if (!phaseAnimations)
                phaseAnimations = computedAnimations[transition.phase] = [];
    
            // get keyframes
            const keyframes = transition.keyframes(transitionConfig, layer.style);
    
            // store the animation
            phaseAnimations.push({
                delay: transitionConfig.delay,
                duration: transitionConfig.duration,
                easing: transitionConfig.easing,
                keyframes: keyframes
            });
    
            return computedAnimations;
        }, {});
    }, [layer.transitions, layer.style]);
}

export {
    Transitions,
    useTransitions
};