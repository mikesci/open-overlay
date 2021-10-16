import React from "react";
import useCustomPropertyEditorComponent from "./useCustomPropertyEditorComponent.js";

const FILTER_REGEXP = /(blur|brightness|contrast|saturate|hue\-rotate|invert|sepia)\(([^\)]+)\)/g;

const config = {
    label: "Filters",
    configFormParameters: [
        { name: "blur", displayName: "Blur", type: "slider", inline: true, immediate: false },
        { name: "brightness", displayName: "Brightness", type: "slider", inline: true, immediate: false },
        { name: "contrast", displayName: "Contrast", type: "slider", inline: true, immediate: false },
        { name: "saturation", displayName: "Saturation", type: "slider", inline: true, immediate: false },
        { name: "hue", displayName: "Hue", type: "slider", inline: true, immediate: false },
        { name: "invert", displayName: "Invert", type: "slider", inline: true, immediate: false },
        { name: "sepia", displayName: "Sepia", type: "slider", inline: true, immediate: false },
    ],
    canDelete: ({ filter }) => {
        return (filter != undefined);
    },
    mapPropsFromLayer: ({ filter }) => {
        const filterObj = { blur: 0, brightness: 50, contrast: 50, saturation: 50, hue: 0, invert: 0, sepia: 0 };
        const matches = (filter ? filter.matchAll(FILTER_REGEXP) : null);
        if (!matches)
            return filterObj;
        for(const match of matches) {
            switch (match[1]) {
                case "blur": filterObj.blur = parseFloat(match[2]); break;
                case "brightness": filterObj.brightness = parseFloat(match[2]) * 50; break;
                case "contrast": filterObj.contrast = parseFloat(match[2]) * 50; break;
                case "saturate": filterObj.saturation = parseFloat(match[2]) * 50; break;
                case "hue-rotate": filterObj.hue = parseFloat(match[2]) / 3.6; break;
                case "invert": filterObj.invert = parseFloat(match[2]); break;
                case "sepia": filterObj.sepia = parseFloat(match[2]); break;
                default: break;
            }
        }
        return filterObj;
    },
    mapPropsToLayer: ({ blur, brightness, contrast, saturation, hue, invert, sepia }) => {
        if (blur === undefined && brightness === undefined && contrast === undefined && saturation === undefined && hue === undefined && invert === undefined && sepia === undefined)
            return { filter: undefined };

        let filter = "";
        if (blur != 0) { filter += ` blur(${blur}px)`; }
        if (brightness != 50) { filter += ` brightness(${brightness/50})`; }
        if (contrast != 50) { filter += ` contrast(${contrast/50})`; }
        if (saturation != 50) { filter += ` saturate(${saturation/50})`; }
        if (hue != 0) { filter += ` hue-rotate(${hue * 3.6}deg)`; }
        if (invert != 0) { filter += ` invert(${invert})`; }
        if (sepia != 0) { filter += ` sepia(${sepia})`; }
        return { filter };
    }
};

const FilterEditor = (props) => {
    const EditorComponent = useCustomPropertyEditorComponent(config);
    return <EditorComponent {...props} />;
};

export default FilterEditor;