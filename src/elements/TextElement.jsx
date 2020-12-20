import styleCategories from "./styleCategories.js";

const TextElement = {
    manifest: {
        name: "Text",
        icon: "new-text-box",
        preserveAspect: false,
        primative: true,
        parameters: [
            { "name": "text", "displayName": null, "type": "textarea", "defaultValue": "text" }
        ],
        allowedStyles: [
            ...styleCategories.POSITIONABLE,
            ...styleCategories.TEXT,
            ...styleCategories.STANDARD
        ],
        defaultStyle: { top: 0, left: 0, width: 400, height: 400, fontFamily: "Arial", fontSize: "60px", color: "rgba(255,255,255,1)", whiteSpace: "pre" }
    },
    component: ({ text }) => {
        return <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "inherit", justifyContent: "inherit", whiteSpace: "inherit" }}>{text}</div>;
    }
}

export default TextElement;