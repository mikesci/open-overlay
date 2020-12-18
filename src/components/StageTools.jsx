import MoveAndResizeTool from "../components/MoveAndResizeTool.jsx";
import SizeAndPositionCaptureTool from "./SizeAndPositionCaptureTool.jsx";

const stageTools = {
    moveAndResize: {
        displayName: "Move And Resize",
        icon: "select",
        component: MoveAndResizeTool
    },
    text: {
        displayName: "Text",
        icon: "new-text-box",
        component: (props) => {
            return <SizeAndPositionCaptureTool {...props} elementName="text" />
        }
    },
    rectangle: {
        displayName: "Rectangle",
        icon: "square",
        component: (props) => {
            return <SizeAndPositionCaptureTool {...props} elementName="rectangle" />
        }
    },
    image: {
        displayName: "Image",
        icon: "media",
        component: (props) => {
            return <SizeAndPositionCaptureTool {...props} elementName="image" />
        }
    },
    video: {
        displayName: "Video",
        icon: "video",
        component: (props) => {
            return <SizeAndPositionCaptureTool {...props} elementName="video" />
        }
    },
    iframe: {
        displayName: "Iframe",
        icon: "globe-network",
        component: (props) => {
            return <SizeAndPositionCaptureTool {...props} elementName="iframe" />
        }
    },
    knockout: {
        displayName: "Knockout",
        icon: "heat-grid",
        component: (props) => {
            return <SizeAndPositionCaptureTool {...props} elementName="knockout" />
        }
    }
};

const stageToolCategories = {
    element: [
        stageTools.text,
        stageTools.rectangle,
        stageTools.image,
        stageTools.video,
        stageTools.iframe,
        stageTools.knockout
    ]
}

export {
    stageTools,
    stageToolCategories
};