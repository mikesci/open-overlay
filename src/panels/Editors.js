import AnimationPanel from "./AnimationPanel.jsx";
import ConsoleEditorPanel from "./ConsoleEditorPanel.jsx";
import ScriptEditorPanel from "./ScriptEditorPanel.jsx";

export default {
    "animation": {
        key: () => "animation",
        icon: () => "walk",
        title: () => "Animation",
        component: AnimationPanel
    },
    "console": {
        key: () => "console",
        icon: () => "console",
        title: () => "Console",
        component: ConsoleEditorPanel
    },
    "script": {
        key: (params) => params.scriptKey,
        icon: (params) => {
            switch (params.scriptKey) {
                case "main.js":
                    return "document-share";
                case "settings.json":
                    return "cog";
                default:
                    return "document";
            }
        },
        title: (params) => params.scriptKey,
        component: ScriptEditorPanel
    }
}