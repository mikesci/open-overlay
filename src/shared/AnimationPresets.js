import { parseFloatOrDefault } from "./utilities";

const AnimationPresets = {
    "fade": {
        displayName: "Fade",
        parameters: [
            { type: "group", items: [
                { name: "from", type: "number", displayName: "From", tag: "%", min: 0, max: 100, width: 50 },
                { name: "to", type: "number", displayName: "To", tag: "%", min: 0, max: 100, width: 50 }
            ]}
        ],
        keyframes: ({ from, to }) => [
            { offset: 0, opacity: from/100 },
            { offset: 1, opacity: to/100 }
        ]
    },
    "slide": {
        displayName: "Slide",
        parameters: [
            { type: "group", items: [
                { name: "fromTop", type: "number", displayName: "From Top", tag: "px", width: 35 },
                { name: "fromLeft", type: "number", displayName: "From Left", tag: "px", width: 35 },
                { name: "fromRelative", type: "select", displayName: "Relative To", width: 30, options: [
                    { label: "Stage", value: "stage" },
                    { label: "Self", value: "self" },
                ] },
            ]},
            { type: "group", items: [
                { name: "toTop", type: "number", displayName: "To Top", tag: "px", width: 35 },
                { name: "toLeft", type: "number", displayName: "To Left", tag: "px", width: 35 },
                { name: "toRelative", type: "select", displayName: "Relative To", width: 30, options: [
                    { label: "Stage", value: "stage" },
                    { label: "Self", value: "self" },
                ] },
            ]},
        ],
        keyframes: ({ fromTop = 0, fromLeft = 0, fromRelative, toTop = 0, toLeft = 0, toRelative }, layer) => {
            const fromAbsolute = (fromRelative == "stage");
            const toAbsolute = (toRelative == "stage");

            let fromTopInt = parseFloatOrDefault(fromTop);
            let fromLeftInt = parseFloatOrDefault(fromLeft);
            let toTopInt = parseFloatOrDefault(toTop);
            let toLeftInt = parseFloatOrDefault(toLeft);
            
            if (!fromAbsolute) {
                if (layer.style.top) { fromTopInt += parseFloatOrDefault(layer.style.top); }
                if (layer.style.left) { fromLeftInt += parseFloatOrDefault(layer.style.left); }
            }

            if (!toAbsolute) {
                if (layer.style.top) { toTopInt += parseFloatOrDefault(layer.style.top); }
                if (layer.style.left) { toLeftInt += parseFloatOrDefault(layer.style.left); }
            }

            return [
                { offset: 0, top: fromTopInt + "px", left: fromLeftInt + "px" },
                { offset: 1, top: toTopInt + "px", left: toLeftInt + "px" }
            ];        
        }
    }
};

export default AnimationPresets;