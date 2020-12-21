import { parseFloatOrDefault } from "./utilities";

const TEXT_SHADOW_REGEXP = /(rgba?\([\. ,0-9]+\)|(?:#[0-9A-Fa-f]{3,8})) (\-?[\.0-9]+)px (\-?[\.0-9]+)px \-?([\.0-9]+)px/;
const BOX_SHADOW_REGEXP = /(rgba?\([\. ,0-9]+\)|(?:#[0-9A-Fa-f]{3,8})) (\-?[\.0-9]+)px (\-?[\.0-9]+)px (\-?[\.0-9]+)px(?: (\-?[\.0-9]+)px)?/;
const CORNER_CLIP_REGEXP = /polygon\(([0-9\.]+)px 0px, calc\(100% - ([0-9\.]+)px\) 0px, 100% ([0-9\.]+)px, 100% calc\(100% - ([0-9\.]+)px\), calc\(100% - ([0-9\.]+)px\) 100%, ([0-9\.]+)px 100%, 0px calc\(100% - ([0-9\.]+)px\), 0px ([0-9\.]+)px, ([0-9\.]+)px 0px\)/;
const BLUR_REGEX = /blur\(([0-9\.]+)px\)/;
const BRIGHTNESS_REGEX = /brightness\(([0-9\.]+)\)/;
const CONTRAST_REGEX = /contrast\(([0-9\.]+)\)/;
const SATURATION_REGEX = /saturate\(([0-9\.]+)\)/;
const HUE_REGEX = /hue-rotate\(([0-9\.]+)deg\)/;
const INVERT_REGEX = /invert\(([0-9\.]+)\)/;
const SEPIA_REGEX = /sepia\(([0-9\.]+)\)/;
const TRANSFORM_REGEX = /perspective\(([0-9\.]+)px\) translate3d\((\-?[0-9\.]+)px, (\-?[0-9\.]+)px, (\-?[0-9\.]+)px\) rotate3d\(1, 0, 0, (\-?[0-9\.]+)deg\) rotate3d\(0, 1, 0, (\-?[0-9\.]+)deg\) rotate\((\-?[0-9\.]+)deg\) scale3d\(([0-9\.]+), ([0-9\.]+), ([0-9\.]+)\)/;

const styleEditors = {
    "rect": {
        displayName: "Size & Position",
        properties: ["left", "top", "height", "width"],
        permanent: true,
        parameters: [
            { type: "group", className: "size-and-position", items: [
                { name: "left", displayName: "Left", type: "number", width: 50, inline: true, tag: "px" },
                { name: "top", displayName: "Top", type: "number", width: 50, inline: true, tag: "px" }
            ]},
            { type: "group", className: "size-and-position", items: [
                { name: "width", displayName: "Width", type: "number", width: 50, inline: true, tag: "px" },
                { name: "height", displayName: "Height", type: "number", width: 50, inline: true, tag: "px" }
            ]}
        ],
        initialConfig: {
            left: 0,
            top: 0,
            height: 400,
            width: 400
        },
        extract: (styleMap) => {
            if (!styleMap.width && !styleMap.height) { return null; }
            return {
                left: parseFloatOrDefault(styleMap.left),
                top: parseFloatOrDefault(styleMap.top),
                width: parseFloatOrDefault(styleMap.width),
                height: parseFloatOrDefault(styleMap.height)
            };
        },
        // can't be deleted
        //delete: () => {},
        apply: ({ left, top, width, height }) => {
            let style = {};
            if (left !== undefined) { style.left = left + "px"; }
            if (top !== undefined) { style.top = top + "px"; }
            if (width !== undefined) { style.width = width + "px"; }
            if (height !== undefined) { style.height = height + "px"; }
            return style;
        }
    },
    "font": {
        displayName: "Font",
        properties: ["fontFamily", "fontStyle", "fontSize", "color", "fontWeight", "fontSize", "textDecoration", "justifyContent", "alignItems", "whiteSpace", "textAlign"],
        permanent: true,
        parameters: [
            { name: "font", displayName: null, type: "font" }
        ],
        initialConfig: {
            font: { fontFamily: "Arial", fontSize: "60px", color: "rgba(255,255,255,1)" }
        },
        extract: (styleMap) => {
            return {
                font: {
                    fontFamily: styleMap.fontFamily,
                    fontSize: parseFloat(styleMap.fontSize),
                    color: styleMap.color,
                    fontWeight: styleMap.fontWeight,
                    fontStyle: styleMap.fontStyle,
                    textDecoration: styleMap.textDecoration,
                    justifyContent: styleMap.justifyContent,
                    alignItems: styleMap.alignItems,
                    whiteSpace: styleMap.whiteSpace
                }
            };
        },
        apply: ({ font }) => {
            return font;
        }
    },
    "letterSpacing": {
        displayName: "Letter Spacing",
        properties: ["letterSpacing"],
        parameters: [
            { name: "amount", type: "slider", displayName: null, min: -100, max: 100 }
        ],
        initialConfig: {
            amount: 0
        },
        extract: (styleMap) => {
            if (!styleMap.letterSpacing) { return null; }
            return {
                amount: parseFloat(styleMap.letterSpacing)
            };
        },
        apply: ({ amount = 0 }) => {
            return {
                letterSpacing: `${amount}px`
            };
        }
    },
    "lineHeight": {
        displayName: "Line Height",
        properties: ["lineHeight"],
        parameters: [
            { name: "amount", type: "slider", displayName: null, min: 0, max: 200, "labelStepSize": 50 }
        ],
        initialConfig: {
            amount: 0
        },
        extract: (styleMap) => {
            if (!styleMap.lineHeight) { return null; }
            return {
                amount: parseInt(styleMap.lineHeight)
            };
        },
        apply: ({ amount = 0 }) => {
            return {
                lineHeight: `${amount}px`
            };
        }
    },
    "textStroke": {
        displayName: "Text Stroke",
        properties: ["WebkitTextStrokeWidth", "WebkitTextStrokeColor"],
        parameters: [
            { type: "group", items: [
                { name: "width", type: "number", tag: "Width", width: 85, min: 0, step: 0.1 },
                { name: "color", type: "color", width: 15 }
            ] }
        ],
        initialConfig: {
            width: 0,
            color: "#FFFFFF"
        },
        extract: (styleMap) => {
            const width = styleMap.WebkitTextStrokeWidth || styleMap["-webkit-text-stroke-width"];
            const color = styleMap.WebkitTextStrokeColor || styleMap["-webkit-text-stroke-color"];
            if (!width && !color) { return null; }
            return {
                width: parseFloat(width),
                color: color
            };
        },
        apply: ({ width, color }) => {
            return {
                WebkitTextStrokeWidth: (width ? width + "px" : null),
                WebkitTextStrokeColor: color
            };
        }
    },
    "textShadow": {
        displayName: "Text Shadow",
        properties: ["textShadow"],
        parameters: [
            { type: "group", items: [
                { name: "offsetx", type: "number", tag: "X", width: 25 },
                { name: "offsety", type: "number", tag: "Y", width: 25 },
                { name: "size", type: "number", tag: "Size", width: 35, min: 0 },
                { name: "color", type: "color", width: 15 }
            ]}
        ],
        initialConfig: {
            offsetx: 0,
            offsety: 0,
            size: 5,
            color: "#000000"
        },
        extract: (styleMap) => {
            const textShadowString = styleMap.textShadow;
            if (!textShadowString) { return null; }
            const matches = textShadowString.match(TEXT_SHADOW_REGEXP);
            if (!matches) { return null; }
            return {
                color: matches[1],
                offsetx: parseFloat(matches[2]),
                offsety: parseFloat(matches[3]),
                size: parseFloat(matches[4])
            };
        },
        apply: ({ offsetx = 0, offsety = 0, size = 5, color = "#000000"}) => {
            return {
                textShadow: `${color} ${offsetx}px ${offsety}px ${size}px`
            };
        }
    },
    "backgroundColor": {
        displayName: "Background Color",
        properties: ["backgroundColor"],
        parameters: [
            { name: "color", type: "color", displayName: null }
        ],
        initialConfig: {
            color: "#FFFFFF"
        },
        extract: (styleMap) => {
            if (!styleMap.backgroundColor) { return null; }
            return {
                color: styleMap.backgroundColor
            };
        },
        apply: ({ color = "#FFFFFF" }) => {
            return {
                backgroundColor: color
            };
        }
    },
    "opacity": {
        displayName: "Opacity",
        properties: ["opacity"],
        parameters: [
            { name: "amount", type: "slider", min: 0, max: 100 }
        ],
        initialConfig: {
            amount: 100
        },
        extract: (styleMap) => {
            if (styleMap.opacity === undefined) { return null; }
            return {
                amount: parseFloat(styleMap.opacity) * 100
            };
        },
        apply: ({ amount = 100 }) => {
            return {
                opacity: `${amount/100}`
            };
        }
    },
    "border": {
        displayName: "Border",
        properties: ["borderWidth", "borderStyle", "borderColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
        parameters: [
            { type: "group", displayName: "Style", items: [
                { name: "width", type: "number", tag: "Width", width: 55, min: 0 },
                { name: "style", type: "select", width: 30, options: [
                    { label: "Solid", value: "solid" },
                    { label: "Dotted", value: "dotted" },
                    { label: "Dashed", value: "dashed" },
                    { label: "Double", value: "double" },
                    { label: "Groove", value: "groove" },
                    { label: "Ridge", value: "ridge" },
                    { label: "Inset", value: "inset" },
                    { label: "Outset", value: "outset" }
                ] },
                { name: "color", type: "color", width: 15}
            ]},
            { type: "group", displayName: "Corner Radius", items: [
                { name: "tl", type: "number", width: 25, tag: "TL", min: 0 },
                { name: "tr", type: "number", width: 25, tag: "TR", min: 0 },
                { name: "br", type: "number", width: 25, tag: "BR", min: 0 },
                { name: "bl", type: "number", width: 25, tag: "BL", min: 0 }
            ]}
        ],
        initialConfig: {
            width: 0,
            style: "solid",
            color: "#FFFFFF",
            tl: 0,
            tr: 0,
            br: 0,
            bl: 0
        },
        extract: (styleMap) => {
            if (!styleMap.borderStyle) { return null; }
            return {
                width: parseFloat(styleMap.borderWidth),
                style: styleMap.borderStyle,
                color: styleMap.borderColor,
                tl: parseFloat(styleMap.borderTopLeftRadius),
                tr: parseFloat(styleMap.borderTopRightRadius),
                br: parseFloat(styleMap.borderBottomRightRadius),
                bl: parseFloat(styleMap.borderBottomLeftRadius)
            };
        },
        apply: ({ width, style, color, tl, tr, br, bl }) => {
            let newStyle = {};
            newStyle.borderWidth = (width != undefined ? width + "px" : null);
            newStyle.borderStyle = (style != undefined ? style : null);
            newStyle.borderColor = (color != undefined ? color : null);
            newStyle.borderTopLeftRadius = (tl != undefined ? tl + "px" : null);
            newStyle.borderTopRightRadius = (tr != undefined ? tr + "px" : null);
            newStyle.borderBottomRightRadius = (br != undefined ? br + "px" : null);
            newStyle.borderBottomLeftRadius = (bl != undefined ? bl + "px" : null);
            return newStyle;
        }
    },
    "shadow": {
        displayName: "Shadow",
        properties: ["boxShadow"],
        parameters: [
            { type: "group", items: [
                { name: "offsetx", type: "number", tag: "X", width: 25 },
                { name: "offsety", type: "number", tag: "Y", width: 25 },
                { name: "size", type: "number", tag: "Size", width: 35, min: 0, step: 0.5 },
                { name: "color", type: "color", width: 15 }
            ]}
        ],
        initialConfig: {
            color: "#000000FF",
            offsetx: 0,
            offsety: 0,
            size: 0
        },
        extract: (styleMap) => {
            if (!styleMap.boxShadow) { return null };
            const matches = styleMap.boxShadow.match(BOX_SHADOW_REGEXP);
            if (!matches) return null;
            return {
                color: matches[1],
                offsetx: parseFloat(matches[2]),
                offsety: parseFloat(matches[3]),
                size: parseFloat(matches[4])
            };
        },
        apply: ({ offsetx = 0, offsety = 0, size = 0, color = "#000000"}) => {
            return { 
                boxShadow: `${color} ${offsetx}px ${offsety}px ${size}px`
            };
        }
    },
    "cornerClip": {
        displayName: "Corner Clip",
        properties: ["clipPath"],
        parameters: [
            { type: "group", items: [
                { name: "tl", type: "number", width: 25, tag: "TL", min: 0 },
                { name: "tr", type: "number", width: 25, tag: "TR", min: 0 },
                { name: "br", type: "number", width: 25, tag: "BR", min: 0 },
                { name: "bl", type: "number", width: 25, tag: "BL", min: 0 }
            ]}
        ],
        initialConfig: {
            tl: 0,
            tr: 0,
            br: 0,
            bl: 0
        },
        extract: (styleMap) => {
            const clipPathString = styleMap.clipPath;
            if (!clipPathString) { return null; }
            const matches = clipPathString.match(CORNER_CLIP_REGEXP);
            if (!matches) return null;
            return {
                tl: parseFloat(matches[1]),
                tr: parseFloat(matches[2]),
                br: parseFloat(matches[4]),
                bl: parseFloat(matches[6])
            };
        },
        apply: ({ tl = 0, tr = 0, br = 0, bl = 0 }) => {
            return {
                clipPath: `polygon(${tl}px 0px, calc(100% - ${tr}px) 0px, 100% ${tr}px, 100% calc(100% - ${br}px), calc(100% - ${br}px) 100%, ${bl}px 100%, 0px calc(100% - ${bl}px), 0px ${tl}px, ${tl}px 0px)`
            };
        }
    },
    "padding": {
        displayName: "Padding",
        properties: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
        parameters: [
            { type: "group", items: [
                { name: "t", type: "number", width: 25, tag: "T", min: 0 },
                { name: "r", type: "number", width: 25, tag: "R", min: 0 },
                { name: "b", type: "number", width: 25, tag: "B", min: 0 },
                { name: "l", type: "number", width: 25, tag: "L", min: 0 }
            ]}
        ],
        initialConfig: {
            t: 0,
            r: 0,
            b: 0,
            l: 0
        },
        extract: (styleMap) => {
            if (!styleMap.paddingTop && !styleMap.paddingRight && !styleMap.paddingBottom && !styleMap.paddingLeft) { return null; }
            return {
                t: parseFloat(styleMap.paddingTop),
                r: parseFloat(styleMap.paddingRight),
                b: parseFloat(styleMap.paddingBottom),
                l: parseFloat(styleMap.paddingLeft)
            };
        },
        apply: ({ t, r, b, l }) => {
            return {
                paddingTop: (t != undefined ? t + "px" : null),
                paddingRight: (r != undefined ? r + "px" : null),
                paddingBottom: (b != undefined ? b + "px" : null),
                paddingLeft: (l != undefined ? l + "px" : null)
            };
        }
    },
    "filters": {
        displayName: "Filters",
        properties: ["filter"],
        parameters: [
            { name: "blur", displayName: "Blur", type: "slider", inline: true },
            { name: "brightness", displayName: "Brightness", type: "slider", inline: true },
            { name: "contrast", displayName: "Contrast", type: "slider", inline: true },
            { name: "saturation", displayName: "Saturation", type: "slider", inline: true },
            { name: "hue", displayName: "Hue", type: "slider", inline: true },
            { name: "invert", displayName: "Invert", type: "slider", inline: true },
            { name: "sepia", displayName: "Sepia", type: "slider", inline: true },
        ],
        initialConfig: {
            blur: 0,
            brightness: 50,
            contrast: 50,
            saturation: 50,
            hue: 0,
            invert: 0,
            sepia: 0
        },
        extract: (styleMap) => {
            const filterString = styleMap.filter;
            if (!filterString) { return null; }
            const blurMatch = filterString.match(BLUR_REGEX);
            const brightnessMatch = filterString.match(BRIGHTNESS_REGEX);
            const contrastMatch = filterString.match(CONTRAST_REGEX);
            const saturationMatch = filterString.match(SATURATION_REGEX);
            const hueMatch = filterString.match(HUE_REGEX);
            const invertMatch = filterString.match(INVERT_REGEX);
            const sepiaMatch = filterString.match(SEPIA_REGEX);
            return {
                blur: (blurMatch ? parseFloat(blurMatch[1]) : 0),
                brightness: (brightnessMatch ? (parseFloat(brightnessMatch[1]) * 50) : 50),
                contrast: (contrastMatch ? (parseFloat(contrastMatch[1]) * 50) : 50),
                saturation: (saturationMatch ? (parseFloat(saturationMatch[1]) * 50) : 50),
                hue: (hueMatch ? (parseFloat(hueMatch[1]) / 3.6) : 0),
                invert: (invertMatch ? parseFloat(invertMatch[1]) : 0),
                sepia: (sepiaMatch ? parseFloat(sepiaMatch[1]) : 0)
            };
        },
        apply: ({ blur = 0, brightness = 50, contrast = 50, saturation = 50, hue = 0, invert = 0, sepia = 0 }) => {
            let filter = "";
            if (blur != 0) { filter += ` blur(${blur}px)`; }
            if (brightness != 50) { filter += ` brightness(${brightness/50})`; }
            if (contrast != 50) { filter += ` contrast(${contrast/50})`; }
            if (saturation != 50) { filter += ` saturate(${saturation/50})`; }
            if (hue != 0) { filter += ` hue-rotate(${hue * 3.6}deg)`; }
            if (invert != 0) { filter += ` invert(${invert})`; }
            if (sepia != 0) { filter += ` sepia(${sepia})`; }
            if (filter)
                return { filter };
        }
    },
    "autoFit": {
        displayName: "Auto Fit",
        properties: ["objectFit", "objectPosition"],
        parameters: [
            { type: "group", items: [
                { name: "fit", type: "select", defaultValue: "fill", width: 30, options: [
                    { label: "Fill", value: "fill" },
                    { label: "Contain", value: "contain" },
                    { label: "Cover", value: "cover" }
                ]},
                { name: "position", tag: "Pos.", type: "text", width: 70 }
            ]}
        ],
        initialConfig: {
            fit: "fill",
            position: "center center"
        },
        extract: (styleMap) => {
            return {
                fit: styleMap.objectFit,
                position: styleMap.objectPosition
            };
        },
        apply: ({ fit = "fill", position = "center center" }) => {
            return {
                objectFit: fit,
                objectPosition: position
            };
        }
    },
    "3dtransform": {
        displayName: "3D Transform",
        properties: ["transform"],
        parameters: [
            { type: "group", displayName: "Transform", items: [
                { name: "tx", type: "number", width: 33.333, tag: "X" },
                { name: "ty", type: "number", width: 33.333, tag: "Y" },
                { name: "tz", type: "number", width: 33.333, tag: "Z" }
            ]},
            { type: "group", displayName: "Rotate", items: [
                { name: "rx", type: "number", width: 33.333, tag: "X" },
                { name: "ry", type: "number", width: 33.333, tag: "Y" },
                { name: "rz", type: "number", width: 33.333, tag: "Z" }
            ]},
            { type: "group", displayName: "Scale", items: [
                { name: "sx", type: "number", width: 33.333, tag: "X", min: 0, step: 0.05 },
                { name: "sy", type: "number", width: 33.333, tag: "Y", min: 0, step: 0.05 },
                { name: "sz", type: "number", width: 33.333, tag: "Z", min: 0, step: 0.05 }
            ]},
            { name: "perspective", displayName: "Perspective", type: "number", defaultValue: "1000", inline: true, tag: "px", min: 1 }
        ],
        initialConfig: {
            perspective: 1000,
            tx: 0,
            ty: 0,
            tz: 0,
            rx: 0,
            ry: 0,
            rz: 0,
            sx: 1,
            sy: 1,
            sz: 1
        },
        extract: (styleMap) => {
            const transformString = styleMap.transform;
            if (!transformString) { return null; }
            const matches = transformString.match(TRANSFORM_REGEX);
            if (!matches) { return null; }
            return {
                perspective: parseFloat(matches[1]),
                tx: parseFloat(matches[2]),
                ty: parseFloat(matches[3]),
                tz: parseFloat(matches[4]),
                rx: parseFloat(matches[5]),
                ry: parseFloat(matches[6]),
                rz: parseFloat(matches[7]),
                sx: parseFloat(matches[8]),
                sy: parseFloat(matches[9]),
                sz: parseFloat(matches[10])
            };
        },
        apply: ({ perspective, tx = 0, ty = 0, tz = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1 }) => {
            return {
                transform: `perspective(${perspective}px) translate3d(${tx}px, ${ty}px, ${tz}px) rotate3d(1, 0, 0, ${rx}deg) rotate3d(0, 1, 0, ${ry}deg) rotate(${rz}deg) scale3d(${sx}, ${sy}, ${sz})`
            };
        }
    },
}

export default styleEditors;