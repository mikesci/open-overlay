import styleCategories from "./styleCategories.js";

const RectangleElement = {
    manifest: {
        name: "Rectangle",
        icon: "square",
        preserveAspect: false,
        primative: true,
        parameters: [ ],
        allowedStyles: [
            ...styleCategories.POSITIONABLE,
            ...styleCategories.STANDARD
        ],
        defaultStyle: { top: 0, left: 0, width: 640, height: 360, backgroundColor: "#FF0000" }
    },
    component: (props) => {
        return null;
    }
}

export default RectangleElement;