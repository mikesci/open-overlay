import { parseFloatOrDefault } from "./utilities";

const RAD = (Math.PI / 180);

const getInferredKeyframe = (offset, layer, ...styleProperties) => {
    let inferredKeyframe = { offset };
    if (layer.style) {
        for(const styleProperty of styleProperties) {
            inferredKeyframe[styleProperty] = layer.style[styleProperty] || "initial";
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
        keyframes: ({ fromOpacity = 0 }, layer) => ([
            { offset: 0, opacity: (fromOpacity/100) },
            getInferredKeyframe(1, layer, "opacity")
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
        keyframes: ({ angle = 0, distance = 2000 }, layer) => {
            const layerTop = (layer.style && layer.style.top ? parseFloat(layer.style.top) : 0);
            const layerLeft = (layer.style && layer.style.left ? parseFloat(layer.style.left) : 0);
            const top = layerTop - (Math.cos(angle * RAD) * distance);
            const left = layerLeft + (Math.sin(angle * RAD) * distance);
            return [
                { offset: 0, top: top + "px", left: left + "px" },
                getInferredKeyframe(1, layer, "top", "left")
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
        keyframes: ({ fromRotation = 0, fromScale = 100 }, layer) => {
            const layerTransform = (layer.style ? layer.style.transform : null) || "";
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
        keyframes: ({ delay, duration, easing, ...style}, layer) => {
            return [
                { offset: 0, ...style },
                getInferredKeyframe(1, layer, ...Object.keys(style))
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
        keyframes: ({ toOpacity = 0 }, layer) => ([
            getInferredKeyframe(0, layer, "opacity"),
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
        keyframes: ({ angle = 0, distance = 2000 }, layer) => {
            const layerTop = (layer.style && layer.style.top ? parseFloat(layer.style.top) : 0);
            const layerLeft = (layer.style && layer.style.left ? parseFloat(layer.style.left) : 0);
            const top = layerTop - (Math.cos(angle * RAD) * distance);
            const left = layerLeft + (Math.sin(angle * RAD) * distance);
            return [
                getInferredKeyframe(0, layer, "top", "left"),
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
        keyframes: ({ toRotation = 0, toScale = 100 }, layer) => {
            const layerTransform = (layer.style ? layer.style.transform : null) || "";
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
        keyframes: ({ delay, duration, easing, ...style }, layer) => {
            return [
                getInferredKeyframe(0, layer, ...Object.keys(style)),
                { offset: 1, ...style }
            ];
        }
    }
};

export default Transitions;