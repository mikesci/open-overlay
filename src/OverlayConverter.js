import overlayTemplate from "./templates/overlay-template.js";

export default class OverlayConverter {

    _rendererModuleUrl;

    constructor(options) {
        this._rendererModuleUrl = options.rendererModuleUrl;
    }

    exportOverlay = (overlay) => {
        let filename = this.makeFilename(overlay.name);
        let fileBody = overlayTemplate({ overlay, rendererModuleUrl: this._rendererModuleUrl });
        return this.saveFile(filename, "text/html", fileBody);
    }

    overlayToHtml = (overlay) => {
        return overlayTemplate({ overlay, rendererModuleUrl: this._rendererModuleUrl });
    }

    htmlToOverlay = () => {

    }

    makeFilename = (name) => {
        return name.replace(/[^a-z0-9]/ig, "-") + ".html";
    }

    saveFile = (name, type, data) => {
        // stupid ie support
        if (data !== null && navigator.msSaveBlob)
            return navigator.msSaveBlob(new Blob([data], { type: type }), name);

        const a = document.createElement("a");
        a.style.display = "none";
        const url = window.URL.createObjectURL(new Blob([data], {type: type}));
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}