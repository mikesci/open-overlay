import { getDeepUnequalKeyValues } from "@blueprintjs/core/lib/esm/common/utils";

function toHex(val) {
    let rval = val.toString(16);
    return (rval.length == 1 ? "0" + rval : rval);
}

function fromHex(val) {
    switch(val) {
        case "0": return 0;
        case "1": return 1;
        case "2": return 2;
        case "3": return 3;
        case "4": return 4;
        case "5": return 5;
        case "6": return 6;
        case "7": return 7;
        case "8": return 8;
        case "9": return 9;
        case "a": case "A": return 10;
        case "b": case "B": return 11;
        case "c": case "C": return 12;
        case "d": case "D": return 13;
        case "e": case "E": return 14;
        case "f": case "F": return 15;
        default: return null;
    }
}

function hexStringToRGBA(hexString) {
    if (hexString.length != 9) { return null; }
    let rgba = { r: 0, g: 0, b: 0, a: 0 };
    for(let i = 1; i < hexString.length; i++) {
        switch(i) {
            case 1: rgba.r = fromHex(hexString[i]) * 16; break;
            case 2: rgba.r += fromHex(hexString[i]); break;
            case 3: rgba.g = fromHex(hexString[i]) * 16; break;
            case 4: rgba.g += fromHex(hexString[i]); break;
            case 5: rgba.b = fromHex(hexString[i]) * 16; break;
            case 6: rgba.b += fromHex(hexString[i]); break;
            case 7: rgba.a = fromHex(hexString[i]) * 16; break;
            case 8: rgba.a += fromHex(hexString[i]); break;
        }
    }
    rgba.a /= 255;
    return rgba;
}

function rgbaObjectToHexString(rgba) {
    return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}${toHex(Math.floor(rgba.a * 255))}`;
}

function interpolate(fromHexString, toHexString, amount) {
    if (amount == null) { return null; }
    let f = hexStringToRGBA(fromHexString) || { r: 0, g: 0, b: 0, a: 0 };
    let t = hexStringToRGBA(toHexString) || { r: 0, g: 0, b: 0, a: 0 };
    return rgbaObjectToHexString({
        r: Math.floor(f.r + ((t.r - f.r) * amount)),
        g: Math.floor(f.g + ((t.g - f.g) * amount)),
        b: Math.floor(f.b + ((t.b - f.b) * amount)),
        a: f.a + ((t.a - f.a) * amount)
    });
}

export default {
    rgbaObjectToHexString: rgbaObjectToHexString,
    interpolate: interpolate
}