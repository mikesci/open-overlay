const IMPORT_REGEX = /(import (.+ from )?["'])(\.\/)(.+)(["'])/g;

const compileScript = (scriptingContextId, scriptName, scripts, assets, scriptUrls) => {

    let scriptText;
    let requiresCompile;
    if (scriptName.startsWith("#")) {
        const asset = assets[scriptName];
        if (asset) {
            scriptText = atob(asset.src.substring(28));
            console.log({ asset, scriptText });
            requiresCompile = false;
        }
    } else {
        scriptText = scripts[scriptName];
        requiresCompile = true;
    }

    if (!scriptText)
        throw "Could not find script or asset: " + scriptName;

    let blob;
    if (!requiresCompile) {
        blob = new Blob([`//# sourceURL=${scriptingContextId}/openoverlay/${scriptName}\n${scriptText}`], { type: "text/javascript"});
    }
    else {
        const compiledScript = scriptText.replace(IMPORT_REGEX, (match, pre, pre2, dotSlash, importedScriptName, post) => {
            // check to see if we've already compiled this script, and if so, return it's url
            // otherwise, compile the imported script
            const dependencyUrl = scriptUrls[importedScriptName] || compileScript(scriptingContextId, importedScriptName, scripts, assets, scriptUrls);
            return pre + dependencyUrl + post;
        });
        blob = new Blob([`//# sourceURL=${scriptingContextId}/openoverlay/${scriptName}\nconst context = window._openoverlayscriptingengine.contexts[${scriptingContextId}];\nconst { setTimeout, setInterval } = context;\n${compiledScript}`], { type: "text/javascript"});
    }

    // now that we have a fully compiled script, create the blob and return a url
    const scriptUrl = URL.createObjectURL(blob);
    scriptUrls[scriptName] = scriptUrl;
    return scriptUrl;
};

class ScriptingContext extends EventTarget {

    _id;
    _overlayDOM;
    _scripts;
    _assets;
    _settings;
    _timeouts = [];
    _intervals = [];
    _scriptUrls = {};

    get assets() { return this._assets; }
    get settings() { return this._settings; }
    get overlay() { return this._overlayDOM; }

    constructor(overlayDOM, scripts, assets, settings, renderLayer) {
        super();
        this.setTimeout = this.setTimeout.bind(this);
        this.setInterval = this.setInterval.bind(this);
        this.updateSettings = this.updateSettings.bind(this);

        if (!window._openoverlayscriptingengine)
            throw "Could not find window._openoverlayscriptingengine";

        this._id = window._openoverlayscriptingengine.lastContextId++;
        this._overlayDOM = overlayDOM;
        this._scripts = scripts;
        this._assets = assets;
        this._settings = settings || {}; // default settings to an empty object

        // expose renderLayer on the context
        this.renderLayer = renderLayer;

        // save this scripting context to the global scope
        window._openoverlayscriptingengine.contexts[this._id] = this;

        // compile scripts
        let compiledMainJs;
        try {
            compiledMainJs = compileScript(this._id, "main.js", scripts, assets, this._scriptUrls);

            // compileScript returns a blob: url - to execute it, we just import it.
            // webpackIgnore prevents webpack from trying to parse this
            import(/* webpackIgnore: true */compiledMainJs).catch(err => {
                console.log(`Error executing script:\n${err.stack}`, { t: (typeof err), lineNumber: err.lineNumber });
            });
        }
        catch (err) {
            console.log(`Error compiling script:\n${err}`);
        }
    }

    setTimeout(callback, delay) {
        // call JS's builtin function
        const timeoutId = setTimeout(callback, delay);
        this._timeouts.push(timeoutId);
    };

    setInterval(callback, period) {
        // call JS's builtin function
        const intervalId = setInterval(callback, period);
        this._intervals.push(intervalId);
    }

    updateSettings(settings) {
        this._settings = settings;
        this.dispatchEvent(new CustomEvent("settings-changed"));
    }

    destroy() {
        // emit an event for scripts to clean themselves up
        this.dispatchEvent(new CustomEvent("destroy"));

        // clear timeouts/intervals
        for(const timeout of this._timeouts)
            clearTimeout(timeout);

        for(const interval of this._intervals)
            clearInterval(interval);

        // release any scriptUrls
        for(const scriptUrl of Object.values(this._scriptUrls))
            URL.revokeObjectURL(scriptUrl);

        // delete the script context from global state
        delete window._openoverlayscriptingengine.contexts[this._id];
    }
}

if (!window._openoverlayscriptingengine) {
    window._openoverlayscriptingengine = {
        lastContextId: 1,
        contexts: {}
    };
}

export default ScriptingContext;