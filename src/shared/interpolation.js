const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}(?:[A-Fa-f0-9]{2})?)$/;
const UNIT_REGEX = /^(\-?\d*\.?\d*)(.+)$/;

const cssColorToArray = (cssColor) => {
    // handle empty strings and nulls
    if (cssColor == null || cssColor.length == 0)
        return [0, 0, 0, 1];

    // we only currently support colors in the form of #RRGGBB and #RRBBGGAA
    const hexMatch = cssColor.match(HEX_COLOR_REGEX);

    // return black if no match could be made
    if (!hexMatch) { return [0, 0, 0, 1]; }

    const hexVal = "0x" + (hexMatch[1].length == 6 ? hexMatch[1] + "FF" : hexMatch[1]);

    return [
        (hexVal >> 24) & 255,
        (hexVal >> 16) & 255,
        (hexVal >> 8) & 255,
        (hexVal) & 255
    ];
}

const arrayToCssColor = (rgba) => {
    return "#" + (BigInt((1 << 24) | (rgba[0] << 16) | (rgba[1] << 8) | rgba[2]) << 8n | BigInt(rgba[3])).toString(16).substr(1);
};

function interpolateNumber(from, to, ratio) {
    if (from == null && to == null) { return null; }
    if (from == null) { return to; }
    if (to == null) { return from; }
    return from + ((to - from) * ratio);
}

function interpolateUnitNumber(from, to, ratio) {
    if (from == null && to == null) { return null; }
    if (from == null) { return to; }
    if (to == null) { return from; }
    const fromParts = from.match(UNIT_REGEX);
    if (!fromParts) { return null; }
    const toParts = to.match(UNIT_REGEX);
    if (!toParts) { return null; }
    if (fromParts[2] != toParts[2]) { return null; } // ensure units are the same
    const fromF = parseFloat(fromParts[1]);
    const toF = parseFloat(toParts[1]);
    return (fromF + ((toF - fromF) * ratio)).toString() + fromParts[2];
}

function interpolateColor(from, to, ratio) {
    if (from == null && to == null) { return null; }
    if (from == null) { return to; }
    if (to == null) { return from; }
    const fromR = cssColorToArray(from);
    const toR = cssColorToArray(to);
    const interpolatedArray = [
        Math.round(fromR[0] + ((toR[0] - fromR[0]) * ratio)),
        Math.round(fromR[1] + ((toR[1] - fromR[1]) * ratio)),
        Math.round(fromR[2] + ((toR[2] - fromR[2]) * ratio)),
        Math.round(fromR[3] + ((toR[3] - fromR[3]) * ratio))
    ];
    return arrayToCssColor(interpolatedArray);
}

function nonInterpolated(from, to) {
    if (from == null && to == null) return undefined;
    if (from == null) return to;
    if (to == null) return from;
    return to;
}

window.interpolation = {
    interpolateColor,
    interpolateNumber,
    interpolateUnitNumber,
    nonInterpolated
};

export {
    interpolateColor,
    interpolateNumber,
    interpolateUnitNumber,
    nonInterpolated
};