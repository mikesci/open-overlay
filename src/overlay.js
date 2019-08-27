import "./shared/baseline.css";
import AssetLoader from "./shared/assetLoader.js";

window._loadedAssets = [];

window.OverlayJS = {
    Overlay: function(options) {
        options.target = options.target || document.body;
        options.layers = AssetLoader.ParseHash();
        options.onLayersChanged = function(layers, serializedLayers) {
            window.location.hash = serializedLayers;
        };

        if (AssetLoader.ShowMode) {
            Promise.all([
                AssetLoader.LoadScript("react.js"),
                AssetLoader.LoadScript("react-dom.js")
            ])
            .then(() => AssetLoader.LoadScript("OverlayRenderer.js"))
            .then(() => {
                OverlayRenderer.mount(options);
                window.addEventListener("hashchange", function() {
                    options.layers = AssetLoader.ParseHash() || options.layers;
                    OverlayRenderer.mount(options);
                });
            });
        } else {
            // set the background to black to prevent unsightly white flashing
            window.document.styleSheets[0].insertRule("body { background: #000; }");
            
            Promise.all([
                AssetLoader.LoadStylesheet("https://unpkg.com/@blueprintjs/core@3.18.0/lib/css/blueprint.css"),
                AssetLoader.LoadStylesheet("https://unpkg.com/@blueprintjs/icons@3.10.0/lib/css/blueprint-icons.css"),
                AssetLoader.LoadScript("react.js"),
                AssetLoader.LoadScript("react-dom.js")
            ]).then(() => AssetLoader.LoadScript("OverlayEditor.js"))
            .then(() => {
                OverlayEditor.mount(options);
            });
        }
    }
};