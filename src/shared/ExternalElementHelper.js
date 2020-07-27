import React from "react";

export default new class ExternalElementHelper {

    LoadFromUrl(url) {
        if (this._isModuleUrl(url))
            return this.LoadAsModule(url);
        else
            return this.LoadAsIframe(url);
    }

    LoadAsModule(url) {
        return this._importFromUrl(url).catch(err => { console.log("fetch prob:" + url + ":" + err); })
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

    LoadAsIframe = async (url) => {
        let element = await new Promise((resolve, reject) => {

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

        return element;
    }

    MakeComponent = async (externalElement) => {

        if (this._isModuleUrl(externalElement.url)) {
            let moduleObject = await this._importFromUrl(externalElement.url);
            moduleObject.default.isExternal = true;
            return moduleObject.default;
        }

        return class extends React.Component {
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
    }

    LoadFromLayers = async (layers, knownElements) => {
        let elements = {};
        for(let layer of layers) {
            if (layer.elementName && layer.elementName.startsWith("http") && !knownElements[layer.elementName] && !elements[layer.elementName]) {
                try
                {
                    elements[layer.elementName] = await this.MakeComponent({ url: layer.elementName, manifest: {} });
                }
                catch (err)
                {
                    elements[layer.elementName] = this._createErrorComponent(layer.elementName, err.toString());
                }
            }
        }    

        return elements;
    }

    _createErrorComponent = (elementName, errorMessage) => {
        return class extends React.Component {
            static isExternal = true;
            static manifest = {
                name: elementName,
                author: "",
                description: errorMessage,
                nonVisual: true,
                parameters: []
            };
            render() { return null; }
        }
    }

    _isModuleUrl(url) { return url.endsWith(".js"); }

    _importFromUrl(url) { return fetch(url).then(r => r.text()).then(r => eval(r)); }
}