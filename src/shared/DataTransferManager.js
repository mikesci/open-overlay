import ContentTypeHandlers from "../shared/ContentTypeHandlers.js";
import { EventEmitter } from "events";

export default new class DataTransferManager extends EventEmitter {

    _currentUploadId = 1;
    _uploads = [];

    get uploads() { return this._uploads; }

    handlePasteItems = async (items) => {
        let transferPromises = [];

        for(const item of items) {
            // we only process items of type text/plain
            if (item.type != "text/plain") { continue; }

            const data = await new Promise(resolve => item.getAsString(resolve));

            // handle JSON (breaks out of the entire handler)
            if (data.startsWith("{"))
                return { layers: this.parseJSON(data) };

            // handle urls
            if (data.startsWith("http")) {
                let transferPromise = this.fetchContentType(data).then(async (contentType) => {
                    const contentTypeHandler = this.getContentTypeHandler(contentType, data);
                    if (!contentTypeHandler) {
                        this.emit("upload-error", {}, `Unsupported file type '${contentType}'.`);
                        return;
                    }
                    let layer = contentTypeHandler.getLayer(data);
                    if (contentTypeHandler.getDimensions) {
                        const dimensions = await contentTypeHandler.getDimensions(data);
                        layer.width = dimensions.width;
                        layer.height = dimensions.height;
                    }
                    return layer;
                });
                transferPromises.push(transferPromise);
            }
        }

         // wait for all promises to finish.
        // results should contain [layer, layer, layer]
        let layers = await Promise.all(transferPromises);

        return layers;
    }

    handleFileUpload = async (files, onUpload) => {
        let transferPromises = [];
        for(const file of files) {
            // ensure we recognize the file type
            let contentTypeHandler = this.getContentTypeHandler(file.type, null);

            // if we don't recognize the content type of the file, emit an error and skip
            if (!contentTypeHandler) {
                this.emit("upload-error", file, `${file.name}: Unsupported file type '${file.type}'.`);
                continue;
            }

            this.emit("upload-started", file);
            const transferPromise = onUpload(file, this.onUploadProgress).then(async (result) => {
                this.emit("upload-finished", file);
                if (!result) { throw "Upload result was null."; }

                // onUpload can return a string (just a url) or an object ({ url, dataUri })
                let url, dataUri;
                if (typeof result === "string") {
                    url = result;
                    dataUri = null;
                } else {
                    url = result.url;
                    dataUri = result.dataUri;
                }

                // get the layer from the content type handler based on the url
                let layer = contentTypeHandler.getLayer(url);

                // set the layer's name to be the filename
                layer.name = file.name;
                
                // if the cth supports dimensions, get those
                if (contentTypeHandler.getDimensions) {
                    const dimensions = await contentTypeHandler.getDimensions(dataUri || url);
                    layer.width = dimensions.width;
                    layer.height = dimensions.height;
                }
                
                return layer;
            }).catch(error => {
                this.emit("upload-error", file, error);
            });

            transferPromises.push(transferPromise);
        }

        // wait for all promises to finish.
        // results should contain [layer, layer, layer]
        let layers = await Promise.all(transferPromises);

        // return layers and any inline assets
        return layers;
    }

    handleDataTransfer = async (dataTransfer, onUpload) => {
        let transferResults;

        if (dataTransfer.items.length > 0)
            transferResults = await this.handlePasteItems(dataTransfer.items);

        if (dataTransfer.files.length > 0)
            transferResults = await this.handleFileUpload(dataTransfer.files, onUpload);

        return transferResults;
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    parseJSON = (data) => {
        // probably need to let this handle whole overlays in the future
        let obj;
        try {
            obj = JSON.parse(data);
        }
        catch { }

        if (!obj || obj.objectType != "layers") { return []; }

        return obj.data;
    }

    getContentTypeHandler = (contentType, data) => {
        return ContentTypeHandlers.find(handler => handler.match(contentType, data));
    }

    // tries to fetch HEAD for the URL to ask the remote server what the content type is
    // failure results in assuming it's a webpage.
    fetchContentType = async (url) => {
        if (!url.startsWith("http"))
            return "text/plain";

        // try to get the content type from the extension
        if (/\.png/.test(url)) { return "image/png"; }
        else if (/\.jpe?g$/i.test(url)) { return "image/jpeg"; }
        else if (/\.gif$/i.test(url)) { return "image/gif"; }
        else if (/\.mp4$/i.test(url)) { return "video/mp4"; }
        else if (/\.mov$/i.test(url)) { return "video/mov"; }
        else if (/\.mkv$/i.test(url)) { return "video/mkv"; }
        else if (/\.3gp$/i.test(url)) { return "video/3gpp"; }
        else if (/\.ogv$/i.test(url)) { return "video/ogv"; }
        else if (/\.mp3$/i.test(url)) { return "audio/mpeg"; }
        else if (/\.wav$/i.test(url)) { return "audio/wav"; }
        else if (/\.ogg$/i.test(url)) { return "audio/ogg"; }
        else if (/\.js$/i.test(url)) { return "text/javascript"; }

        // otherwise try to fetch the content type from the server
        // chances are this will fail because of CORS.  if it does NBD, return an iframe
        try
        {
            let response = await fetch(url, { method: "HEAD", cache: "no-cache" });
            return response.headers.get("Content-Type");
        } catch (ex) {
            return "text/html";
        }
    }

    onUploadProgress = (file, loaded) => {
        this.emit("upload-progress", file, loaded);
    }
}