import "./shared/baseline.css";
import AssetLoader from "./shared/assetLoader.js";

window.OverlayJS = {
    Element: function(providedOptions) {
        // options.manifest
        // options.onConfigure
        AssetLoader.LoadManifest(providedOptions)
            .catch(err => console.log(err))
            .then(options => {

                // if this window has a parent, emit the manifest as a message
                if (window.parent)
                    window.parent.postMessage({ "manifest": options.manifest }, "*");

                options.configValues = AssetLoader.ParseHash();

                if (this.ShowMode) {
                    
                    // call the initial onConfigure
                    if (options.onConfigure)
                        options.onConfigure(options.configValues, options.manifest.parameters);

                    // monitor for hash changes
                    window.addEventListener("hashchange", function() {
                        if (options.onConfigure) // call onConfigure each time the hash changes
                            options.onConfigure(AssetLoader.ParseHash(), options.manifest.parameters);
                    });

                } else {

                    // each time the config values change, update the hash
                    options.onConfigValuesChanged = function(configValues, serializedConfigValues) {
                        window.location.hash = serializedConfigValues;
                    };

                    // set the background to black to prevent unsightly white flashing
                    window.document.styleSheets[0].insertRule("body { background: #000; }");

                    // the editor depends on react, so bring that in now
                    Promise.all([
                        AssetLoader.LoadStylesheet("https://unpkg.com/@blueprintjs/core@3.18.0/lib/css/blueprint.css"),
                        AssetLoader.LoadStylesheet("https://unpkg.com/@blueprintjs/icons@3.10.0/lib/css/blueprint-icons.css"),
                        AssetLoader.LoadScript("react.js"),
                        AssetLoader.LoadScript("react-dom.js")
                    ]).then(() => AssetLoader.LoadScript("ElementEditor.js")).then(() => {
                        ElementEditor.mount(options);
                    });
                }
            });
    }
};