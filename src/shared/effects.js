
const categories = {
    "General": [
        "backgroundColor",
        "border",
        "cornerRadius",
        "shadow",
        "blur",
        "opacity",
        "cornerClip"
    ],
    "Color": [
        "brightness",
        "contrast",
        "saturation",
        "hue",
        "invert",
        "sepia"
    ],
    "Text": [
        "textStroke",
        "textShadow",
        "letterSpacing",
        "lineHeight"
    ],
    "3D": [
        "theaterProjection"
    ]
};

const entryAnimations = [
    "animSlideUp",
    "animSlideDown",
    "animSlideLeft",
    "animSlideRight",
    "animFadeIn",
    "animScaleIn",
    "animBlurIn",
    "animCustomEntry"
];

const exitAnimations = [
    "animSlideUpExit",
    "animSlideDownExit",
    "animSlideLeftExit",
    "animSlideRightExit",
    "animScaleOutExit",
    "animFadeOutExit",
    "animBlurOutExit",
    "animCustomExit"
];

const standardAnimations = [
    "animCustomStandard",
    "animRotateStandard"
];


const effects = {
    "backgroundColor": {
        type: "style",
        displayName: "Background Color",
        parameters: [
            { "name": "color", "type": "color", "displayName": null, "defaultValue": "#00000080" }
        ],
        apply: (style, config) => {
            style.backgroundColor = config.color;
        }
    },
    "border": {
        type: "style",
        displayName: "Border",
        parameters: [
            { "name": "width", "type": "number", "displayName": "Thickness", "defaultValue": 5, inline: 30 },
            { "name": "style", "type": "select", "displayName": "Type", "defaultValue": "solid", inline: 40, options: [
                { label: "Solid", value: "solid" },
                { label: "Dotted", value: "dotted" },
                { label: "Dashed", value: "dashed" },
                { label: "Double", value: "double" },
                { label: "Groove", value: "groove" },
                { label: "Ridge", value: "ridge" },
                { label: "Inset", value: "inset" },
                { label: "Outset", value: "outset" }
            ] },
            { "name": "color", "type": "color", "displayName": "Color", "defaultValue": "#FFFFFF", inline: 30}
        ],
        apply: (style, config) => {
            style.borderWidth = config.width + "px";
            style.borderColor = config.color;
            style.borderStyle = config.style;
        }
    },
    "cornerRadius": {
        type: "style",
        displayName: "Corner Radius",
        parameters: [
            { "name": "tl", "type": "number", "defaultValue": 15, inline: 25 },
            { "name": "tr", "type": "number", "defaultValue": 15, inline: 25 },
            { "name": "br", "type": "number", "defaultValue": 15, inline: 25 },
            { "name": "bl", "type": "number", "defaultValue": 15, inline: 25 }
        ],
        apply: (style, config) => {
            style.borderRadius = `${config.tl ? config.tl : "0"}px ${config.tr ? config.tr : "0"}px ${config.br ? config.br : "0"}px ${config.bl ? config.bl : 0}px`;
        }
    },
    "shadow": {
        type: "style",
        displayName: "Shadow",
        parameters: [
            { "name": "offsetx", "type": "number", "displayName": "X", "defaultValue": 0, "inline": 20 },
            { "name": "offsety", "type": "number", "displayName": "Y", "defaultValue": 0, "inline": 20 },
            { "name": "size", "type": "number", "displayName": "Radius", "defaultValue": 5, "inline": 45 },
            { "name": "color", "type": "color", "displayName": "Color", "defaultValue": "#00000080", "inline": 15 }
        ],
        apply: (style, config) => {
            style.boxShadow = `${config.offsetx}px ${config.offsety}px ${config.size}px ${config.color}`;
        }
    },
    "textStroke": {
        type: "style",
        displayName: "Text Stroke",
        parameters: [
            { "name": "width", "type": "number", "displayName": "Width", "defaultValue": 5, "inline": 45 },
            { "name": "color", "type": "color", "displayName": "Color", "defaultValue": "#000000", "inline": 15 }
        ],
        apply: (style, config) => {
            style.webkitTextStroke = `${config.width}px ${config.color}`;
        }
    },
    "textShadow": {
        type: "style",
        displayName: "Text Shadow",
        parameters: [
            { "name": "offsetx", "type": "number", "displayName": "X", "defaultValue": 0, "inline": 20 },
            { "name": "offsety", "type": "number", "displayName": "Y", "defaultValue": 0, "inline": 20 },
            { "name": "size", "type": "number", "displayName": "Radius", "defaultValue": 5, "inline": 45 },
            { "name": "color", "type": "color", "displayName": "Color", "defaultValue": "#00000080", "inline": 15 }
        ],
        apply: (style, config) => {
            style.textShadow = `${config.offsetx}px ${config.offsety}px ${config.size}px ${config.color}`;
        }
    },
    "blur": {
        type: "style",
        displayName: "Blur",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 10 }
        ],
        apply: (style, config) => {
            if (style.filter == null) { style.filter = ""; }
            style.filter += ` blur(${config.amount}px)`;
        }
    },
    "brightness": {
        type: "style",
        displayName: "Brightness",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 50 }
        ],
        apply: (style, config) => {
            if (style.filter == null) { style.filter = ""; }
            style.filter += ` brightness(${config.amount*2}%)`;
        }
    },
    "contrast": {
        type: "style",
        displayName: "Contrast",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 50 }
        ],
        apply: (style, config) => {
            if (style.filter == null) { style.filter = ""; }
            style.filter += ` contrast(${config.amount*2}%)`;
        }
    },
    "saturation": {
        type: "style",
        displayName: "Saturation",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 50 }
        ],
        apply: (style, config) => {
            if (style.filter == null) { style.filter = ""; }
            style.filter += ` saturate(${config.amount*2}%)`;
        }
    },
    "hue": {
        type: "style",
        displayName: "Hue Shift",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 0 }
        ],
        apply: (style, config) => {
            if (style.filter == null) { style.filter = ""; }
            style.filter += ` hue-rotate(${config.amount * 3.6}deg)`;
        }
    },
    "invert": {
        type: "style",
        displayName: "Invert",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 0 }
        ],
        apply: (style, config) => {
            if (style.filter == null) { style.filter = ""; }
            style.filter += ` invert(${config.amount}%)`;
        }
    },
    "sepia": {
        type: "style",
        displayName: "Sepia",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 0 }
        ],
        apply: (style, config) => {
            if (style.filter == null) { style.filter = ""; }
            style.filter += ` sepia(${config.amount}%)`;
        }
    },
    "opacity": {
        type: "style",
        displayName: "Opacity",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 100 }
        ],
        apply: (style, config) => {
            style.opacity = `${config.amount/100}`;
        }
    },
    "cornerClip": {
        type: "style",
        displayName: "Corner Clip",
        parameters: [
            { "name": "tl", "type": "number", "displayName": "Top Left", "defaultValue": 10, "inline": 25 },
            { "name": "tr", "type": "number", "displayName": "Top Right", "defaultValue": 0, "inline": 25 },
            { "name": "br", "type": "number", "displayName": "Bot. Right", "defaultValue": 0, "inline": 25 },
            { "name": "bl", "type": "number", "displayName": "Bot. Left", "defaultValue": 0, "inline": 25 },
        ],
        apply: (style, config) => {
            let clipPath = `polygon(${config.tl}px 0, calc(100% - ${config.tr}px) 0, 100% ${config.tr}px, 100% calc(100% - ${config.br}px), calc(100% - ${config.br}px) 100%, ${config.bl}px 100%, 0 calc(100% - ${config.bl}px), 0 ${config.tl}px, ${config.tl}px 0)`;
            style.clipPath = clipPath;
        }
    },
    "letterSpacing": {
        type: "style",
        displayName: "Letter Spacing",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 0, "min": -100, "max": 100 }
        ],
        apply: (style, config) => {
            style.letterSpacing = `${config.amount}px`;
        }
    },
    "lineHeight": {
        type: "style",
        displayName: "Line Height",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 0, "min": 0, "max": 200, "labelStepSize": 50 }
        ],
        apply: (style, config) => {
            style.lineHeight = `${config.amount}px`;
        }
    },
    "theaterProjection": {
        type: "transform",
        displayName: "Theater Projection",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": "Amount", "defaultValue": 25, inline: 50 },
            { "name": "mode", "type": "select", "displayName": "Direction", "defaultValue": "both", inline: 40, options: [
                { value: "horizontal", label: "Horizontal" },
                { value: "vertical", label: "Vertical" },
                { value: "both", label: "Both" }
            ] },
        ],
        apply: (transforms, config, layer) => {
            let yAngle = 0;
            let xAngle = 0;
            if (config.mode == "horizontal" || config.mode == "both") {
                let distanceToCenter = 960 - (layer.left + (layer.width / 2));
                yAngle = (distanceToCenter / 1920) * (180 * (config.amount / 50));
            }
            if (config.mode == "vertical" || config.mode == "both") {
                let distanceToCenter = (layer.top + (layer.height / 2)) - 540;
                xAngle = (distanceToCenter / 1080) * (180 * (config.amount / 50));
            }
            transforms.push({ perspective: 1000 });
            transforms.push({ rotate: [xAngle, yAngle, 0] });
        }
    },
    "animSlideUp": {
        type: "animation",
        animationType: "entrance",
        displayName: "Slide Up",
        parameters: [
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            animations.push({
                name: "openoverlay-anim-slide-up",
                keyframes: "@keyframes openoverlay-anim-slide-up { from { margin-top: 150vh; } to { margin-top: 0; } }",
                ...config.animation
            });
        }
    },
    "animSlideDown": {
        type: "animation",
        animationType: "entrance",
        displayName: "Slide Down",
        parameters: [
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            animations.push({
                name: "openoverlay-anim-slide-down",
                keyframes: "@keyframes openoverlay-anim-slide-down { from { margin-top: -150vh; } to { margin-top: 0; } }",
                ...config.animation
            });
        }
    },
    "animSlideLeft": {
        type: "animation",
        animationType: "entrance",
        displayName: "Slide Left",
        parameters: [
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            animations.push({
                name: "openoverlay-anim-slide-left",
                keyframes: "@keyframes openoverlay-anim-slide-left { from { margin-left: 150vw; } to { margin-left: 0; } }",
                ...config.animation
            });
        }
    },
    "animSlideRight": {
        type: "animation",
        animationType: "entrance",
        displayName: "Slide Right",
        parameters: [
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            animations.push({
                name: "openoverlay-anim-slide-right",
                keyframes: "@keyframes openoverlay-anim-slide-right { from { margin-left: -150vw; } to { margin-left: 0; } }",
                ...config.animation
            });
        }
    },
    "animFadeIn": {
        type: "animation",
        animationType: "entrance",
        displayName: "Fade In",
        parameters: [
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            animations.push({
                name: "openoverlay-anim-fade-in",
                keyframes: "@keyframes openoverlay-anim-fade-in { from { opacity: 0; } to { opacity: 1; } }",
                ...config.animation
            });
        }
    },
    "animScaleIn": {
        type: "animation",
        animationType: "entrance",
        displayName: "Scale In",
        parameters: [
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            animations.push({
                name: "openoverlay-anim-scale-in",
                keyframes: "@keyframes openoverlay-anim-scale-in { from { transform: scale(10); } to { transform: scale(1); } }",
                ...config.animation
            });
        }
    },
    "animBlurIn": {
        type: "animation",
        animationType: "entrance",
        displayName: "Blur In",
        parameters: [
            { "name": "amount", "type": "number", "displayName": "Amount", "defaultValue": 10 },
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            let amount = config.amount || 10;
            animations.push({
                name: "openoverlay-anim-blur-in-" + amount,
                keyframes: `@keyframes openoverlay-anim-blur-in-${amount} { from { filter: blur(${amount}px); } to { filter: blur(0); } }`,
                ...config.animation
            });
        }
    },
    "animCustomEntry": {
        type: "animation",
        animationType: "entrance",
        displayName: "Custom Entry",
        parameters: [
            { "name": "keyframes", "type": "textarea", "displayName": "Keyframes", "defaultValue": "@keyframes my-animation-name {\n0% {}\n100% {}\n}" },
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            let m = config.keyframes.match(/^@keyframes ([^ ]+)/i);
            if (!m) { console.log(`Could not parse keyframes string: ${config.keyframes}`); return; }
            let name = m[1];
            animations.push({
                overwrite: true,
                name: name,
                keyframes: config.keyframes,
                ...config.animation
            });
        }
    },
    "animSlideUpExit": {
        type: "animation",
        animationType: "exit",
        displayName: "Slide Up",
        parameters: [
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            animations.push({
                name: "openoverlay-anim-slide-up-exit",
                keyframes: "@keyframes openoverlay-anim-slide-up-exit { from { margin-top: 0; } to { margin-top: -150vh; } }",
                ...config.animation
            });
        }
    },
    "animSlideDownExit": {
        type: "animation",
        animationType: "exit",
        displayName: "Slide Down",
        parameters: [
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            animations.push({
                name: "openoverlay-anim-slide-down-exit",
                keyframes: "@keyframes openoverlay-anim-slide-down-exit { from { margin-top: 0; } to { margin-top: 150vh; } }",
                ...config.animation
            });
        }
    },
    "animSlideLeftExit": {
        type: "animation",
        animationType: "exit",
        displayName: "Slide Left",
        parameters: [
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            animations.push({
                name: "openoverlay-anim-slide-left-exit",
                keyframes: "@keyframes openoverlay-anim-slide-left-exit { from { margin-left: 0; } to { margin-left: -150vh; } }",
                ...config.animation
            });
        }
    },
    "animSlideRightExit": {
        type: "animation",
        animationType: "exit",
        displayName: "Slide Right",
        parameters: [
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            animations.push({
                name: "openoverlay-anim-slide-right-exit",
                keyframes: "@keyframes openoverlay-anim-slide-right-exit { from { margin-left: 0; } to { margin-left: 150vh; } }",
                ...config.animation
            });
        }
    },
    "animScaleOutExit": {
        type: "animation",
        animationType: "exit",
        displayName: "Scale Out",
        parameters: [
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            animations.push({
                name: "openoverlay-anim-scale-out-exit",
                keyframes: "@keyframes openoverlay-anim-scale-out-exit { from { transform: scale(1); opacity: 1; } to { transform: scale(10); opacity: 0; } }",
                ...config.animation
            });
        }
    },
    "animFadeOutExit": {
        type: "animation",
        animationType: "exit",
        displayName: "Fade Out",
        parameters: [
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            animations.push({
                name: "openoverlay-anim-fade-out-exit",
                keyframes: "@keyframes openoverlay-anim-fade-out-exit { from { opacity: 1; } to { opacity: 0; } }",
                ...config.animation
            });
        }
    },
    "animBlurOutExit": {
        type: "animation",
        animationType: "exit",
        displayName: "Blur Out",
        parameters: [
            { "name": "amount", "type": "number", "displayName": "Amount", "defaultValue": 10 },
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {
            let amount = config.amount || 10;
            animations.push({
                name: "openoverlay-anim-blur-out-" + amount,
                keyframes: `@keyframes openoverlay-anim-blur-out-${amount} { from { filter: blur(0); } to { filter:  blur(${amount}px); } }`,
                ...config.animation
            });
        }
    },
    "animCustomExit": {
        type: "animation",
        animationType: "exit",
        displayName: "Custom Exit",
        parameters: [
            { "name": "keyframes", "type": "textarea", "displayName": "Keyframes", "defaultValue": "@keyframes my-animation-name {\n0% {}\n100% {}\n}" },
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {

            let m = config.keyframes.match(/^@keyframes ([^ ]+)/i);
            if (!m) { console.log(`Could not parse keyframes string: ${config.keyframes}`); return; }
            let name = m[1];
            animations.push({
                overwrite: true,
                name: name,
                keyframes: config.keyframes,
                ...config.animation
            });
        }
    },
    "animCustomStandard": {
        type: "animation",
        animationType: "standard",
        displayName: "Custom",
        parameters: [
            { "name": "keyframes", "type": "textarea", "displayName": "Keyframes", "defaultValue": "@keyframes my-animation-name {\n0% {}\n100% {}\n}" },
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "500", delay: "0" } }
        ],
        apply: (animations, config) => {

            let m = config.keyframes.match(/^@keyframes ([^ ]+)/i);
            if (!m) { console.log(`Could not parse keyframes string: ${config.keyframes}`); return; }
            let name = m[1];
            animations.push({
                overwrite: true,
                name: name,
                keyframes: config.keyframes,
                ...config.animation
            });
        }
    },
    "animRotateStandard": {
        type: "animation",
        animationType: "standard",
        displayName: "Rotate",
        parameters: [
            { "name": "degrees", "type": "number", "displayName": "Degrees", "defaultValue": 360 },
            { "name": "animation", "type": "animation", "displayName": null, "defaultValue": { duration: "2000", delay: "0", iterations: "infinite" } }
        ],
        apply: (animations, config) => {
            let degrees = config.degrees || 15;
            animations.push({
                name: "openoverlay-anim-rotate-standard-" + degrees,
                keyframes: `@keyframes openoverlay-anim-rotate-standard-${degrees} { from { transform: rotate(0); } to { transform: rotate(${degrees}deg); } }`,
                ...config.animation
            });
        }
    },
};

export {
    categories,
    entryAnimations,
    exitAnimations,
    standardAnimations,
    effects
};