import React from "react";
import ContentTypeHandlers from "../shared/ContentTypeHandlers.js";
import { Toaster, Toast, Icon, Position, ProgressBar, Classes, Intent } from "@blueprintjs/core";

export default class DataTransferManager extends React.Component {

    _toasterRef;

    constructor(props) {
        super(props);
        // props.uploadUrl
        // props.onCreateLayer
        this._toasterRef = React.createRef();

        this.state = {
            uploads: []
        };
    }

    getContentTypeHandler = (contentType, data) => {
        return ContentTypeHandlers.find(handler => handler.match(contentType, data));
    }

    // tries to fetch HEAD for the URL to ask the remote server what the content type is
    // failure results in assuming it's a webpage.
    getContentTypeForData = async (url) => {
        if (!url.startsWith("http"))
            return "text/plain";

        try
        {
            let response = await fetch(val, { method: "HEAD", cache: "no-cache" });
            return resp.headers.get("Content-Type");
        } catch {
            return "text/html";
        }
    }

    // called externally via ref
    handleDataTransfer = async (dataTransfer) => {
        // 1 add the strings from dataTransfer.items directly to our processing list
        // 2 then upload files and add their resulting public URLs to the processing list
        // 3 process the list

        // if there are plain text items, extract them
        let items = [];
        if (dataTransfer.items.length > 0) {
            for(let item of dataTransfer.items) {
                if (item.type == "text/plain") {
                    let data = await new Promise((resolve) => item.getAsString(resolve));
                    let contentType = await this.getContentTypeForData(data);
                    let contentTypeHandler = await this.getContentTypeHandler(contentType, data);
                    items.push({
                        data: data,
                        contentTypeHandler: contentTypeHandler
                    });
                }
            }
        }

        // if there are files to be uploaded, upload them in parallel
        let uploadPromises = [];
        if (dataTransfer.files.length > 0) {
            // ensure we have an upload URL
            if (!this.props.uploadUrl) {
                this._toasterRef.current.show({ message: "Uploading files is not enabled.  Sorry." });
                return;
            }

            for(let file of dataTransfer.files) {

                // ensure we recognize the file type
                let contentTypeHandler = this.getContentTypeHandler(file.type, null);

                // if we don't recognize the content type of the file, show a toast and skip
                if (!contentTypeHandler) {
                    this._toasterRef.current.show({ message: `${file.name}: Unsupported file type '${file.type}'.` });
                    continue;
                }

                let p = this.handleUploadAsync(file)
                    .then(url => {
                        items.push({ data: url, contentTypeHandler: contentTypeHandler })
                    })
                    .catch(() => {});

                // squelch errors
                uploadPromises.push(p);
            }
        }

        // wait for all uploads to finish and add their results to items
        await Promise.all(uploadPromises);

        // now process all of the items
        for(let item of items) {
            let layers = await item.contentTypeHandler.getLayers(item.data);
            let addToSelection = false;
            for(let layer of layers) {
                this.props.onCreateLayer(layer.elementName, layer.elementConfig, addToSelection);
                if (!addToSelection) { addToSelection = true; }
            }
        }
    }

    handleUploadAsync = async (file) => {
        let self = this;
        return new Promise((resolve, reject) => {

            // create a new upload object to hold state
            let upload = {
                filename: file.name,
                size: file.size,
                loaded: 0,
                complete: false
            };

            // and add it to state
            self.setState(ps => ({ uploads: [...ps.uploads, upload]}));

            // use XMLHttpRequest to get progress events
            var formData = new FormData();
            formData.append("f", file, file.name);

            var oReq = new XMLHttpRequest();
            upload.req = oReq;

            oReq.open("POST", self.props.uploadUrl, true);

            oReq.upload.onprogress = evt => {
                if (evt.lengthComputable) {
                    // update the progress on the upload
                    // yes, i know i'm doing this the wrong way by changing state
                    // it's fast and until it breaks, i shall continue to do it.
                    upload.loaded = evt.loaded;
                    self.forceUpdate();
                }
            };

            oReq.onload = evt => {
                upload.complete = true;
                if (oReq.status == 200) {
                    // set a timeout to remove the element from uploads after 2s
                    setTimeout(() => {
                        self.setState(ps => {
                            let uploads = [...ps.uploads];
                            let index = uploads.indexOf(upload);
                            if (index > -1) { uploads.splice(index, 1); }
                            return { uploads };
                        });
                    }, 2000);
                    resolve(oReq.responseText);
                    return;
                }   

                // if we get here, something went wrong
                upload.error = oReq.status + ": " + oReq.statusText;
                self.forceUpdate();
                reject();
            };

            oReq.onerror = evt => {
                upload.error = oReq.status + ": " + oReq.statusText;
                self.forceUpdate();
                reject();
            }

            oReq.setRequestHeader('X-Requested-With','XMLHttpRequest');

            oReq.send(formData);
        });
    }

    onDismissUpload = (upload) => {
        if (!upload.complete) { upload.req.abort(); }
        this.setState(ps => {
            let uploads = [...ps.uploads];
            let index = uploads.indexOf(upload);
            if (index > -1) { uploads.splice(index, 1); }
            return { uploads };
        });
    }

    renderProgressBar = (upload) => {
        if (upload.error)
            return <><ProgressBar intent={Intent.DANGER} stripes={false} value={1} /><div>{upload.error}</div></>;

        let progress = (upload.loaded / upload.size);
        if (progress < 1)
            return <><ProgressBar intent={Intent.PRIMARY} stripes={true} value={progress} /><div>{upload.filename}</div></>;

        return <><ProgressBar intent={Intent.SUCCESS} stripes={false} value={progress} text /><div>{upload.filename}</div></>;
    }

    render() {
        return (
            <Toaster position={Position.BOTTOM} ref={this._toasterRef}>
                {this.state.uploads.map(upload => (
                    <Toast
                        key={upload.filename}
                        icon="cloud"
                        message={this.renderProgressBar(upload)}
                        onDismiss={() => this.onDismissUpload(upload)}
                        timeout={0} />
                ))}
            </Toaster>
        );
    }
}