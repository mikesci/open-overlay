const categories = {
    "General": [
        "backgroundColor",
        "cornerRadius",
        "shadow",
        "blur",
        "opacity"
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
        "textShadow",
        "letterSpacing"
    ]
};

const effects = {
    "backgroundColor": {
        displayName: "Background Color",
        parameters: [
            { "name": "color", "type": "color", "displayName": null, "defaultValue": "rgba(0,0,0,0.5)" }
        ],
        apply: (style, config) => {
            style.backgroundColor = config.color;
        }
    },
    "cornerRadius": {
        displayName: "Corner Radius",
        parameters: [
            { "name": "radius", "type": "text" }
        ],
        apply: (style, config) => {
            if (config.radius) {
                style.borderRadius = config.radius;
            }
        }
    },
    "shadow": {
        displayName: "Shadow",
        parameters: [
            { "name": "offsetx", "type": "number", "displayName": "X", "defaultValue": 0, "inline": 20 },
            { "name": "offsety", "type": "number", "displayName": "Y", "defaultValue": 0, "inline": 20 },
            { "name": "size", "type": "number", "displayName": "Radius", "defaultValue": 5, "inline": 45 },
            { "name": "color", "type": "color", "displayName": "Color", "defaultValue": "rgba(0,0,0,0.5)", "inline": 15 }
        ],
        apply: (style, config) => {
            style.boxShadow = `${config.offsetx}px ${config.offsety}px ${config.size}px ${config.color}`;
        }
    },
    "textShadow": {
        displayName: "Text Shadow",
        parameters: [
            { "name": "offsetx", "type": "number", "displayName": "X", "defaultValue": 0, "inline": 20 },
            { "name": "offsety", "type": "number", "displayName": "Y", "defaultValue": 0, "inline": 20 },
            { "name": "size", "type": "number", "displayName": "Radius", "defaultValue": 5, "inline": 45 },
            { "name": "color", "type": "color", "displayName": "Color", "defaultValue": "rgba(0,0,0,0.5)", "inline": 15 }
        ],
        apply: (style, config) => {
            style.textShadow = `${config.offsetx}px ${config.offsety}px ${config.size}px ${config.color}`;
        }
    },
    "blur": {
        displayName: "Blur",
        parameters: [
            { "name": "radius", "type": "slider", "displayName": null, "defaultValue": 10 }
        ],
        apply: (style, config) => {
            if (style.filter == null) { style.filter = ""; }
            style.filter += ` blur(${config.radius}px)`;
        }
    },
    "brightness": {
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
        displayName: "Opacity",
        parameters: [
            { "name": "opacity", "type": "slider", "displayName": null, "defaultValue": 100 }
        ],
        apply: (style, config) => {
            style.opacity = `${config.opacity/100}`;
        }
    },
    "letterSpacing": {
        displayName: "Letter Spacing",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 0, "min": -100, "max": 100 }
        ],
        apply: (style, config) => {
            style.letterSpacing = `${config.amount}px`;
        }
    }
};

export {
    categories,
    effects
};