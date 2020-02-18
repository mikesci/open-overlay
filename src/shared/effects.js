import ColorHelper from "./ColorHelper.js";

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
        "letterSpacing",
        "lineHeight"
    ]
};

function interpolateNumber(a, b, amount) {
    return a + ((b - a) * amount);
}

const effects = {
    "backgroundColor": {
        displayName: "Background Color",
        parameters: [
            { "name": "color", "type": "color", "displayName": null, "defaultValue": "#00000080" }
        ],
        apply: (style, config) => {
            style.backgroundColor = config.color;
        },
        interpolate: (f, t, amount) => {
            return {
                color: ColorHelper.interpolate(f.color, t.color, amount)
            }
        }
    },
    "cornerRadius": {
        displayName: "Corner Radius",
        parameters: [
            { "name": "tl", "type": "number", "defaultValue": 15, inline: 25 },
            { "name": "tr", "type": "number", "defaultValue": 15, inline: 25 },
            { "name": "br", "type": "number", "defaultValue": 15, inline: 25 },
            { "name": "bl", "type": "number", "defaultValue": 15, inline: 25 }
        ],
        apply: (style, config) => {
            style.borderRadius = `${config.tl ? config.tl : "0"}px ${config.tr ? config.tr : "0"}px ${config.br ? config.br : "0"}px ${config.bl ? config.bl : 0}px`;
        },
        interpolate: (f, t, amount) => {
            return {
                tl: interpolateNumber(f.tl, t.tl, amount),
                tr: interpolateNumber(f.tr, t.tr, amount),
                br: interpolateNumber(f.br, t.br, amount),
                bl: interpolateNumber(f.bl, t.bl, amount)
            };
        }
    },
    "shadow": {
        displayName: "Shadow",
        parameters: [
            { "name": "offsetx", "type": "number", "displayName": "X", "defaultValue": 0, "inline": 20 },
            { "name": "offsety", "type": "number", "displayName": "Y", "defaultValue": 0, "inline": 20 },
            { "name": "size", "type": "number", "displayName": "Radius", "defaultValue": 5, "inline": 45 },
            { "name": "color", "type": "color", "displayName": "Color", "defaultValue": "#00000080", "inline": 15 }
        ],
        apply: (style, config) => {
            style.boxShadow = `${config.offsetx}px ${config.offsety}px ${config.size}px ${config.color}`;
        },
        interpolate: (f, t, amount) => {
            return {
                offsetx: interpolateNumber(f.offsetx, t.offsetx, amount),
                offsety: interpolateNumber(f.offsety, t.offsety, amount),
                size: interpolateNumber(f.size, t.size, amount),
                color: ColorHelper.interpolate(f.color, t.color, amount)
            };
        }
    },
    "textShadow": {
        displayName: "Text Shadow",
        parameters: [
            { "name": "offsetx", "type": "number", "displayName": "X", "defaultValue": 0, "inline": 20 },
            { "name": "offsety", "type": "number", "displayName": "Y", "defaultValue": 0, "inline": 20 },
            { "name": "size", "type": "number", "displayName": "Radius", "defaultValue": 5, "inline": 45 },
            { "name": "color", "type": "color", "displayName": "Color", "defaultValue": "#00000080", "inline": 15 }
        ],
        apply: (style, config) => {
            style.textShadow = `${config.offsetx}px ${config.offsety}px ${config.size}px ${config.color}`;
        },
        interpolate: (f, t, amount) => {
            return {
                offsetx: interpolateNumber(f.offsetx, t.offsetx, amount),
                offsety: interpolateNumber(f.offsety, t.offsety, amount),
                size: interpolateNumber(f.size, t.size, amount),
                color: ColorHelper.interpolate(f.color, t.color, amount)
            };
        }
    },
    "blur": {
        displayName: "Blur",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 10 }
        ],
        apply: (style, config) => {
            if (style.filter == null) { style.filter = ""; }
            style.filter += ` blur(${config.amount}px)`;
        },
        interpolate: (f, t, amount) => {
            return {
                amount: interpolateNumber(f.amount, t.amount, amount),
            };
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
        },
        interpolate: (f, t, amount) => {
            return {
                amount: interpolateNumber(f.amount, t.amount, amount),
            };
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
        },
        interpolate: (f, t, amount) => {
            return {
                amount: interpolateNumber(f.amount, t.amount, amount),
            };
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
        },
        interpolate: (f, t, amount) => {
            return {
                amount: interpolateNumber(f.amount, t.amount, amount),
            };
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
        },
        interpolate: (f, t, amount) => {
            return {
                amount: interpolateNumber(f.amount, t.amount, amount),
            };
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
        },
        interpolate: (f, t, amount) => {
            return {
                amount: interpolateNumber(f.amount, t.amount, amount),
            };
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
        },
        interpolate: (f, t, amount) => {
            return {
                amount: interpolateNumber(f.amount, t.amount, amount),
            };
        }
    },
    "opacity": {
        displayName: "Opacity",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 100 }
        ],
        apply: (style, config) => {
            style.opacity = `${config.amount/100}`;
        },
        interpolate: (f, t, amount) => {
            return {
                amount: interpolateNumber(f.amount, t.amount, amount),
            };
        }
    },
    "letterSpacing": {
        displayName: "Letter Spacing",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 0, "min": -100, "max": 100 }
        ],
        apply: (style, config) => {
            style.letterSpacing = `${config.amount}px`;
        },
        interpolate: (f, t, amount) => {
            return {
                amount: interpolateNumber(f.amount, t.amount, amount),
            };
        }
    },
    "lineHeight": {
        displayName: "Line Height",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": null, "defaultValue": 0, "min": 0, "max": 200, "labelStepSize": 50 }
        ],
        apply: (style, config) => {
            style.lineHeight = `${config.amount}px`;
        },
        interpolate: (f, t, amount) => {
            return {
                amount: interpolateNumber(f.amount, t.amount, amount),
            };
        }
    }
};

export {
    categories,
    effects
};