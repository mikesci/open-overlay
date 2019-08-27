export default new class AssetLoader {

    ShowMode;

    _scriptUrl;

    constructor() {
        window._loadedAssets = [];
        this._scriptUrl = document.currentScript.src;
        this.ShowMode = (window.location.search.match(/showMode=1/i) || window.obsstudio);
    }

    LoadScript(url) {
        // only allow the url to be loaded once
        if (window._loadedAssets.includes(url)) { return Promise.resolve(); }
        window._loadedAssets.push(url);

        // if the url is relative, make it relative to this script
        let lastIndex = this._scriptUrl.lastIndexOf('/');
        if (lastIndex > -1) { url = this._scriptUrl.substring(0, lastIndex + 1) + url; }

        return new Promise((resolve, reject) => {
            let script = document.createElement("script");
            script.addEventListener("load", resolve);
            script.addEventListener("error", reject);
            script.addEventListener("abort", reject);
            script.type = "text/javascript";
            script.src = url;
            document.head.appendChild(script);
        });
    }

    LoadStylesheet(url) {
        // only allow the url to be loaded once
        if (window._loadedAssets.includes(url)) { return Promise.resolve(); }
        window._loadedAssets.push(url);

        return new Promise((resolve, reject) => {
            let link = document.createElement("link");
            link.addEventListener("load", resolve);
            link.addEventListener("error", reject);
            link.addEventListener("abort", reject);
            link.rel = "stylesheet";
            link.href = url;
            document.head.appendChild(link);
        });
    }

    ParseHash() {
        if (window.location.hash.length > 1) {
            try {
                return JSON.parse(decodeURIComponent(window.location.hash.substr(1)));
            } catch {
                return null;
            }
        }
        return null;
    }

    LoadManifest(providedOptions) {
        let options = Object.assign({}, providedOptions);
        if (options.manifest) { return new Promise(resolve => resolve(options)); }

        // get the url from the manifest from a meta element
        const $link = document.querySelector("link[rel='manifest']");
        let url = ($link ? $link.getAttribute("href") : "manifest.json");
        
        return fetch(url)
            .then(response => response.json())
            .then(manifest => {
                // ensure default values
                if (manifest.name === undefined) { manifest.name = "Unknown"; }
                if (manifest.author === undefined) { manifest.author = "Unknown"; }
                if (manifest.width === undefined) { manifest.width = 1920; }
                if (manifest.height === undefined) { manifest.height = 1080; }
                if (manifest.parameters === undefined) { manifest.parameters = []; }
                return manifest;
            })
            .catch(err => {
                throw "No manifest found: " + err;
            });
    }
}
