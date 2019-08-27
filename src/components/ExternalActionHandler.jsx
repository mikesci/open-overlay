import React from "react";
import { AppToaster } from "./AppToaster.jsx";
import Elements from "./Elements.jsx";
import { Alert, Toaster, Toast, Position, ProgressBar, Intent, Classes } from "@blueprintjs/core";

export default new class ExternalActionHandler {

  _fileTypeHandlers = [
    { // image
      match: type => type.match(/image/i),
      createElementArgs: url => new Promise((resolve, reject) => {  
        // create the image and gets it's natural dimensions
        let img = new Image();
        img.addEventListener("load", () => {

          resolve({
            elementName: "image",
            elementConfig: {
              width: Math.min(img.naturalWidth, 1920),
              height: Math.min(img.naturalHeight, 1080),
              config: {
                url: url,
                fit: "cover"
              }
            }
          });

        });
        
        img.src = url;
        setTimeout(reject, 10000);
      })
    },
    { // video
      match: type => type.match(/video/i),
      createElementArgs: url => new Promise((resolve, reject) => {  
        // get the video's natural dimensions
        let vid = document.createElement("video");
        vid.addEventListener("loadeddata", () => {
          resolve({
            elementName: "video",
            elementConfig: {
              width: Math.min(vid.videoWidth, 1920),
              height: Math.min(vid.videoHeight, 1080),
              config: {
                url: url,
                fit: "cover"
              }
            }
          });
        });
        let source = document.createElement("source");
        source.src = url;
        vid.appendChild(source);
        setTimeout(reject, 10000);
      })
    },
    { // audio
      match: type => type.match(/audio/i),
      createElementArgs: url => new Promise((resolve, reject) => {  
        resolve({
          elementName: "audio",
          elementConfig: {
            width: 0,
            height: 0,
            config: {
              url: url
            }
          }
        });
      })
    },
    { // youtube
      match: (type, value) => type.match(/text\/html/i) && value.match(Elements.Builtin.youtube.URL_REGEX),
      createElementArgs: url => new Promise((resolve, reject) => {  
        console.log("here");
        // parse out the start parameter, if there is one
        let match = url.match(/(?:star)?t=(\d+)/i);
        let start = (match && match.length == 2 ? match[1] : null);

        resolve({
          elementName: "youtube",
          elementConfig: {
            width: 1280,
            height: 720,
            config: {
              url: url,
              start: start
            }
          }
        });
      })
    },
    { // catch-all urls / iframe
      match: type => type.match(/text\/html/i),
      createElementArgs: url => new Promise((resolve, reject) => {
        resolve({
          elementName: "iframe",
          elementConfig: {
            width: 1280,
            height: 720,
            config: {
              url: url
            }
          }
        });
      })
    },
  ];

  HandleDataTransfer = (dataTransfer, dispatcher, onUpload) => {

    if (dataTransfer.files.length > 0)
      this._handleUpload(dataTransfer.files, dispatcher, onUpload);

    if (dataTransfer.items.length > 0)
      this._handleItems(dataTransfer.items, dispatcher);
  }

  _handleUpload = (files, dispatcher, onUpload) => {
    if (!onUpload) {
      AppToaster.show({ message: "Uploading files is not enabled.  Sorry." });
      return;
    }

    let uploadJobs = [...files].map(file => {

      // ensure we can handle this file type
      let fileTypeHandler = this.getFileTypeHandler(file.type);
      if (!fileTypeHandler) {
        AppToaster.show({ message: "Unrecognized file type!" });
        return null;
      }

      // create the toast we'll be uploading
      let toastKey = AppToaster.show(this.renderUploadProgress(0));

      return {
        file: file,
        fileTypeHandler: fileTypeHandler,
        toastKey: toastKey,
        dispatcher: dispatcher
      };
    });

    let p = Promise.resolve();
    for(let uploadJob of uploadJobs) {
      if (uploadJob) {
        p = p.then(() => onUpload(uploadJob.file, uploadedBytes => {
          if (uploadJob.cancel) { return true; }
          AppToaster.show(this.renderUploadProgress(uploadJob, uploadedBytes / uploadJob.file.size), uploadJob.toastKey);
          return false;
        }))
        .catch(error => this.handleFailure(uploadJob))
        .then(url => this.handleSuccess(uploadJob, url));
      }
    }

  }

  _handleItems = (items, dispatcher) => {
    for(var item of items) {
      if (item.type == "text/plain") {
        item.getAsString(val => {

          // parse as URL
          if (val.startsWith("http")) {
            fetch(val, { method: "HEAD", cache: "no-cache" })
              .then(resp => {
                let contentType = resp.headers.get("Content-Type");
                this._handleUrl(val, contentType, dispatcher);
              })
              .catch(err => {
                this._handleUrl(val, "text/html", dispatcher);
              });
            return;
          }

          // parse as imported object
          if (val.startsWith("{")) {
            let obj;
            try {
              obj = JSON.parse(val);
            } catch {
              AppToaster.create({ message: "Failed to parse clipboard data: invalid format."});
              return;
            }

            switch(obj.objectType) {
              case "layers":
                this._handleLayers(obj.data, dispatcher);
                break;
              default:
                AppToaster.create({ message: "Failed to parse clipboard data: unknown object type." });
                break;
            }

            return;
          }
        });
      }
    }
  }

  handleFailure = (uploadJob) => {
    // iono do something
    AppToaster.show({ message: `Upload for ${uploadJob.file.name} failed!`, timeout: 2000 }, uploadJob.toastKey);
  }

  handleSuccess = (uploadJob, url) => {
    uploadJob.fileTypeHandler.createElementArgs(url).then(elementArgs => {
      uploadJob.dispatcher.Dispatch("CREATE_LAYER", elementArgs.elementName, elementArgs.elementConfig);
    });
  }

  getFileTypeHandler(contentType, url) {
    for(let handler of this._fileTypeHandlers) {
      if (handler.match(contentType, url)) {
        return handler;
      }
    }
    return null;
  }

  renderUploadProgress(uploadJob, amount) {
    return {
      icon: "cloud-upload",
      message: (
        <ProgressBar
            className={(amount >= 1 ? Classes.PROGRESS_NO_STRIPES : 0)}
            intent={amount < 1 ? Intent.PRIMARY : Intent.SUCCESS}
            value={amount}
        />
      ),
      onDismiss: (didTimeoutExpire) => {
          if (!didTimeoutExpire) {
              // user dismissed toast with click
              uploadJob.cancel = true;
          }
      },
      timeout: amount < 1 ? 0 : 2000        
    };
  }

  _handleUrl = (url, contentType, dispatcher) => {
    let fileTypeHandler = this.getFileTypeHandler(contentType, url);
    if (fileTypeHandler) {
      fileTypeHandler.createElementArgs(url).then(elementArgs => {
        dispatcher.Dispatch("CREATE_LAYER", elementArgs.elementName, elementArgs.elementConfig);
      });
    }
  }

  _handleLayers = (layers, dispatcher) => {
    for(let layer of layers) {
      let { elementName, ...elementConfig } = layer;
      dispatcher.Dispatch("CREATE_LAYER", elementName, elementConfig);
    }
  }
}