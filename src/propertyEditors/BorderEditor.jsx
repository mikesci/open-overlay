import React from "react";
import useCustomPropertyEditorComponent from "./useCustomPropertyEditorComponent.js";

const BORDER_REGEXP = /(\-?[\.0-9]+)px (\w+) (rgba?\([\. ,0-9]+\)|(?:#[0-9A-Fa-f]{3,8}))/;
const BORDER_RADIUS_REGEXP = /(\-?[\.0-9]+)px (\-?[\.0-9]+)px (\-?[\.0-9]+)px (\-?[\.0-9]+)px/;

const config = {
    label: "Border",
    configFormParameters: [
        { type: "group", displayName: "Style", items: [
            { name: "width", type: "number", tag: "Width", width: 30, min: 0, immediate: true },
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
            { name: "all", type: "number", width: 20, tag: "All", min: 0, immediate: true },
            { name: "tl", type: "number", width: 20, tag: "TL", min: 0, immediate: true },
            { name: "tr", type: "number", width: 20, tag: "TR", min: 0, immediate: true },
            { name: "br", type: "number", width: 20, tag: "BR", min: 0, immediate: true },
            { name: "bl", type: "number", width: 20, tag: "BL", min: 0, immediate: true }
        ]}
    ],
    canDelete: ({ border, borderRadius }) => {
        return (border != undefined || borderRadius != undefined);
    },
    mapPropsFromLayer: ({ border, borderRadius }) => {
        let result = {};

        // match the border prop
        const borderMatch = (border ? border.match(BORDER_REGEXP) : null);
        if (!borderMatch) {
            result.width = 0;
            result.style = "solid";
            result.color = "#000000";
        } else {
            result.width = parseFloat(borderMatch[1]);
            result.style = borderMatch[2];
            result.color = borderMatch[3];
        }

        // match the radius prop
        const radiusMatch = (borderRadius ? borderRadius.match(BORDER_RADIUS_REGEXP) : null);
        if (!radiusMatch) {
            result.all = 0;
            result.tl = 0;
            result.tr = 0;
            result.br = 0;
            result.bl = 0;
        } else {
            result.all = 0;
            result.tl = parseFloat(radiusMatch[1]);
            result.tr = parseFloat(radiusMatch[2]);
            result.br = parseFloat(radiusMatch[3]);
            result.bl = parseFloat(radiusMatch[4]);
            if (result.tl == result.tr && result.tl == result.br && result.tl == result.bl) {
                result.all = result.tl;
                result.tl = 0;
                result.tr = 0;
                result.br = 0;
                result.bl = 0;
            }
        }
        return result;
    },
    mapPropsToLayer: ({ width, style, color, all, tl, tr, br, bl }) => {
        let newStyle = {};

        if (width || style || color)
            newStyle.border = `${width || 0}px ${style || "solid"} ${color || "#000000"}`;
        else
            newStyle.border = undefined;
            
        if (all && !tl && !tr && !br && !bl)
            newStyle.borderRadius = `${all}px ${all}px ${all}px ${all}px`;
        else if (all == 0 && tl || tr || br || bl)
            newStyle.borderRadius = `${tl || 0}px ${tr || 0}px ${br || 0}px ${bl || 0}px`;
        else
            newStyle.borderRadius = undefined;

        console.log({ newStyle, width, style, color, all, tr, tl, br, bl });

        return newStyle;
    }
};

const BorderEditor = (props) => {
    const EditorComponent = useCustomPropertyEditorComponent(config);
    return <EditorComponent {...props} />;
};

export default BorderEditor;