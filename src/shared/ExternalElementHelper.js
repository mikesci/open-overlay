import React from "react";

export default new class ExternalElementHelper {

    SetManifestDefaults(manifest) {
        if (!manifest.name) { manifest.name = "(no name)"; }
        if (!manifest.author) { manifest.author = "Unknown"; }
        if (!manifest.description) { manifest.description = ""; }
        if (!manifest.nonVisual && !manifest.width) { manifest.width = 1920; }
        if (!manifest.nonVisual && !manifest.height) { manifest.width = 1080; }
        if (manifest.nonVisual && manifest.width) { manifest.width = null; }
        if (manifest.nonVisual && manifest.height) { manifest.height = null; }
        if (!manifest.parameters) { manifest.parameters = []; }
        return manifest;
    }

    LoadFromUrl(url) {
        if (this._isModuleUrl(url))
            return this.LoadAsModule(url);
        else
            return this.LoadAsIframe(url);
    }

    LoadAsModule(url) {
        return this._importFromUrl(url).catch(err => { console.log("fetch prob:" + url); })
        .then(moduleObject => {
            console.log(moduleObject);
            if (moduleObject) {
                let component = moduleObject.default;
                if (!component.manifest) {
                    throw "The component specified does not contain a manifest.";
                    return;
                }
                return {
                    url: url,
                    manifest: component.manifest
                };
            }
        });
    }

    LoadAsIframe(url) {
        return new Promise((resolve, reject) => {

            let hasCleanedUp = false;
            let iframe = document.createElement("iframe");
            iframe.style["display"] = "none";
            document.body.appendChild(iframe);

            function cleanUp() {
                if (hasCleanedUp) { return; }
                hasCleanedUp = true;
                window.removeEventListener("message", processIframeMessage);
                document.body.removeChild(iframe);
            }

            function processIframeMessage(evt) {
                if (evt.data && evt.data.manifest) {
                    cleanUp();
                    resolve({
                        url: url,
                        manifest: evt.data.manifest
                    });
                }
            }

            window.addEventListener("message", processIframeMessage, false);

            // set a 5 second timeout
            setTimeout(() => {
                cleanUp();
                reject("Installation timed out.");
            }, 5000);

            // set the iframe src to start
            iframe.src = url;
        });
    }

    MakeComponent(externalElement) {

        if (this._isModuleUrl(externalElement.url)) {
            return this._importFromUrl(externalElement.url).then(moduleObject => {
                moduleObject.default.isExternal = true;
                return moduleObject.default;
            });
        }

        return new Promise((resolve, reject) => {

            let iframeElementComponent = class extends React.Component {
                static isExternal = true;
                static manifest = externalElement.manifest;
                
                _lastSrc;
        
                constructor(props) {
                    super(props);
                    this._lastSrc = this.buildIframeSrc(props);
                }
        
                buildIframeSrc(props) {
                   let serializedProps = JSON.stringify(props);
                   return externalElement.url + "?showMode=1#" + serializedProps;
                }
        
                shouldComponentUpdate(nextProps, nextState) {
                    let nextSrc = this.buildIframeSrc(nextProps);
                    if (this._lastSrc == nextSrc) { return false; }
                    this._lastSrc = nextSrc;
                    return true;
                }
        
                render() {
                    return (
                        <>
                            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}></div>
                            <iframe src={this._lastSrc} style={{ width: "100%", height: "100%", border: "0" }}></iframe>
                        </>
                    );
                }
            }

            resolve(iframeElementComponent);
        });
    }

    _isModuleUrl(url) { return url.endsWith(".js"); }

    _importFromUrl(url) { return fetch(url).then(r => r.text()).then(r => eval(r)); }
}