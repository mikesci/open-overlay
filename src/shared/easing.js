import BezierEasing from "./BezierEasing.js";

const EASING_LINEAR = time => time;
const EASING_EASE = BezierEasing(0.25, 0.1, 0.25, 1);
const EASING_EASE_OUT = BezierEasing(0, 0, 0.58, 1);
const EASING_EASE_IN = BezierEasing(0.42, 0, 1, 1);
const EASING_EASE_IN_OUT = BezierEasing(0.42, 0, 0.58, 1);

const getEasingFunction = (easing) => {
    switch (easing) {
        case "linear": return EASING_LINEAR;
        case "ease-in": return EASING_EASE_IN;
        case "ease-out": return EASING_EASE_OUT;
        case "ease": return EASING_EASE;
        case "ease-in-out": return EASING_EASE_IN_OUT;
        default:
            // handle nulls/banks
            if (!easing) return EASING_EASE_IN_OUT;

            // cubic test
            const matchValues = easing.match(/cubic\-bezier\(([0-9]*\.?(?:[0-9]*)),([0-9]*\.?(?:[0-9]*)),([0-9]*\.?(?:[0-9]*)),([0-9]*\.?(?:[0-9]*))\)/i);
            if (matchValues)
                return BezierEasing(parseFloat(matchValues[1]),parseFloat(matchValues[2]),parseFloat(matchValues[3]),parseFloat(matchValues[4]));

            return null;
    }
}

export {
    getEasingFunction
};