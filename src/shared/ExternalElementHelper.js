
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

}