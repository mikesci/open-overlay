import { transformsListToString } from "../shared/utilities.js";

const categories = {
    "Effects": [
        "duplicator",
        //"theaterProjection"
    ]
};

const effects = {
    "duplicator": {
        type: "wrapper",
        displayName: "Duplicator",
        parameters: [
            { name: "copies", type: "number", tag: "copies", defaultValue: 5, inline: true },
            { type: "group", items: [
                { name: "sx", type: "number", tag: "\u0394 x", defaultValue: 5, width: 33.3333 },
                { name: "sy", type: "number", tag: "\u0394 y", defaultValue: 5, width: 33.3333 },
                { name: "sz", type: "number", tag: "\u0394 z", defaultValue: 5, width: 33.3333 }
            ]}
        ],
        component: ({ sx = 5, sy = 5, sz = 5, copies = 5, children }) => {

            let duplicates = [];
            for(let i = 0; i < copies; i++) {
                const multiplier = (sz < 0 ? (copies - i) - 1 : i);
                duplicates.push(<div key={i} style={{ position: "absolute", transformStyle: "preserve-3d", transform: `perspective(1000px) translate3d(${sx * multiplier}px, ${sy * multiplier}px, ${sz * multiplier}px`, width: "100%", height: "100%"}}>{children}</div>);
            }

            return (
                <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    {duplicates}
                </div>
            );
        }
    },
    /*
    "theaterProjection": {
        type: "style",
        displayName: "Theater Projection",
        parameters: [
            { "name": "amount", "type": "slider", "displayName": "Amount", "defaultValue": 25, "width": 50 },
            { "name": "mode", "type": "select", "displayName": "Direction", "defaultValue": "both", "width": 40, options: [
                { value: "horizontal", label: "Horizontal" },
                { value: "vertical", label: "Vertical" },
                { value: "both", label: "Both" }
            ] }
        ],
        apply: (layer, style, config) => {
            const amount = config.amount || 0;
            const mode = config.mode || "both";

            let { transform, ...styleProps } = style;

            let yAngle = 0;
            let xAngle = 0;
            if (mode == "horizontal" || mode == "both") {
                let distanceToCenter = 960 - (layer.left + (layer.width / 2));
                yAngle = (distanceToCenter / 1920) * (180 * (amount / 50));
            }
            if (mode == "vertical" || mode == "both") {
                let distanceToCenter = (layer.top + (layer.height / 2)) - 540;
                xAngle = (distanceToCenter / 1080) * (180 * (amount / 50));
            }

            if (!transform)
                transform = "perspective(1000px)";

            transform += ` rotateX(${xAngle}deg) rotateY(${yAngle}deg)`;

            return { ...styleProps, transform };
        }
    }
    */
};

export {
    categories,
    effects
};