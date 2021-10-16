import { findChildById } from "./utilities";


class OpenOverlayRenderer extends HTMLElement {

    _overlayContainer;

    get rootElement() { return this._overlayContainer; }

    constructor() {

        super();

        // uses a shadow root
        this.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        // 1) host styles
        // 2) default styles for overlays, which will always be the immediate children of the overlay-container
        // 3) default styles for layers, which will always be the direct children of overlays\
        style.innerHTML = "\
        :host { width:100%;height:100%;display: block; }\
        :host([hidden]) { display: none; }\
        slot { width:100%;height:100%; }\
        slot > openoverlay-overlay { display: block; width: 100%; height: 100%; }\
        openoverlay-overlay > * { display: block; position: absolute; box-sizing: border-box; object-fit: cover; object-position: center center; overflow: hidden; }\
        ";
        this.shadowRoot.append(style);

        this._overlayContainer = document.createElement("div");
        this._overlayContainer.className = "overlay-container";
        this.shadowRoot.append(this._overlayContainer);

        // add the overlay container
        //this._overlayContainer = document.createElement("overlay-container");
        //this.shadowRoot.append(this._overlayContainer);
    }

    getOverlay(overlayid) {
        if (overlayid === undefined) 
            return this._overlayContainer.firstChild;
        return findChildById(this._overlayContainer, overlayid);
    }

    sendCommand(command, commandArg = null, overlayid = undefined, layerid = undefined) {
        // commandData = { command, commandArg, overlayid, layerid }
        // when overlayid = null and layerid = null, dispatch to ALL overlays
        // when overlayid = X and layerid = null, dispatch to overlay X
        // when overlayid = X and layerid = Y, dispatch to layer Y
        // when overlayid = null and layerid = Y, do nothing (INVALID)

        if (overlayid === undefined) {
            for(const overlay of this._overlayContainer.children) {
                const target = overlay[command];
                if (!target || typeof(target) !== "function") {
                    console.error(`Could not find method '${command}' on overlay ${overlayid}`);
                    continue;
                }

                target(commandArg);
            }
            return;
        }

        const overlay = this.getOverlay(overlayid);

        if (!overlay) {
            console.error(`Could not send command to overlay ${overlayid} - overlay does not exist.`);
            return;
        }

        overlay.sendCommand(command, commandArg, layerid);
    }
}

if (window.customElements)
    window.customElements.define("openoverlay-renderer", OpenOverlayRenderer);

export default OpenOverlayRenderer;