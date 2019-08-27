import React from "react";

export default new class ExternalElementHelper {

    LoadFromUrl(url) {
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
                    resolve({ url: url, manifest: evt.data.manifest });
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
        return class extends React.Component {
            static MANIFEST = {
                isExternal: true,
                name: externalElement.manifest.name,
                description: externalElement.manifest.description,
                author: externalElement.manifest.author,
                width: externalElement.manifest.width,
                height: externalElement.manifest.height,
                preserveAspect: externalElement.manifest.preserveAspect,
                parameters: externalElement.manifest.parameters
            };
            
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
                        <iframe src={this._lastSrc} style={{ "flex": "1 1 auto", "border": "0" }}></iframe>
                    </>
                );
            }
        }
    }
}