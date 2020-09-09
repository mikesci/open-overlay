import ContentTypeHandlers from "../shared/ContentTypeHandlers.js";
import { EventEmitter } from "events";
import AssetManager from "./AssetManager.js";
import LabelEditor from "../components/LabelEditor.jsx";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

export default new class DataTransferManager extends EventEmitter {

    _currentUploadId = 1;
    _uploads = [];

    get uploads() { return this._uploads; }

    handleDataTransfer = async (dataTransfer, onUpload) => {
        console.log("handling", { dataTransfer, onUpload, items: dataTransfer.items.length, files: dataTransfer.files.length });
        // an array to hold the promises each item/file will create
        let assets = [];
        let transferPromises = [];

        // handle text/plain items
        for(const item of dataTransfer.items) {
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

        // handle file uploads
        for(const file of dataTransfer.files) {

            // ensure we recognize the file type
            let contentTypeHandler = this.getContentTypeHandler(file.type, null);

            // if we don't recognize the content type of the file, emit an error and skip
            if (!contentTypeHandler) {
                this.emit("upload-error", file, `${file.name}: Unsupported file type '${file.type}'.`);
                continue;
            }

            // upload through external function if provided
            let transferPromise;
            if (onUpload) {
                this.emit("upload-started", file);
                transferPromise = onUpload(file, this.onUploadProgress).then(async (url) => {
                    if (!url) { return []; }
                    this.emit("upload-finished", file);
                    let layer = contentTypeHandler.getLayer(url, file.name);
                    if (contentTypeHandler.getDimensions) {
                        const dimensions = await contentTypeHandler.getDimensions(url);
                        layer.width = dimensions.width;
                        layer.height = dimensions.height;
                    }
                    return layer;
                }).catch(error => {
                    this.emit("upload-error", file, error);
                });
            } else {
                // otherwise, upload as inline asset
                this.emit("upload-started", file);
                transferPromise = this.toBase64(file).then(async (data) => {
                    this.emit("upload-finished", file);
                    const assetKey = file.name;
                    // save to asset list
                    assets[assetKey] = data;
                    // generate an asset url
                    const assetUrl = "asset:" + assetKey;
                    let layer = contentTypeHandler.getLayer(assetUrl, file.name);
                    layer.assetKey = assetKey;
                    if (contentTypeHandler.getDimensions) {
                        const dimensions = await contentTypeHandler.getDimensions(data);
                        layer.width = dimensions.width;
                        layer.height = dimensions.height;
                    }
                    return layer;
                });
            }
            
            transferPromises.push(transferPromise);
        }

        // wait for all promises to finish.
        // results should contain [layer, layer, layer]
        let layers = await Promise.all(transferPromises);

        // return layers and any inline assets
        return { layers, assets };
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
        console.log({ contentType, data });
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