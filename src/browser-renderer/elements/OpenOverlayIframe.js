import { makeProperty } from "../utilities.js";
import DOMElementBase from "./DOMElementBase.js";

class OpenOverlayIframe extends DOMElementBase {
    _iframe;

    constructor() {
        super();
        this._iframe = document.createElement("iframe");
        this._iframe.style = "height: 100%; width: 100%; object-fit: inherit; object-position: inherit";
        this.onAssetsChanged = this.onAssetsChanged.bind(this);
    }

    connectedCallback() {
        if (this._initialized) { return; }
        
        super.connectedCallback();

        this.append(this._iframe);

        makeProperty(this, "src", null,
            () => this._src,
            (value) => {
                // unreference prior asset if needed
                if (this._src && this._src.startsWith("#"))
                    this.unreferenceAsset("src");

                // handle asset references (starting with #)
                if (value != null && value.startsWith("#")) {
                    // ensure assets are available before proceeding
                    if (this._overlay.assetsAvailable()) {   
                        const asset = this._overlay.findAsset(value);
                        if (asset != null) {
                            this.referenceAsset("src", value);
                            this._iframe.src = asset.objectUrl;
                        } else {
                            console.error("Could not find asset " + value);
                            this._iframe.src = null;
                        }
                    }
                } else {
                    this._iframe.src = value;
                }

                if (value) {
                    const iframeLoadPromise = new Promise((resolve) => {
                        const onLoad = () => {
                            this._iframe.removeEventListener("load", onLoad);
                            resolve();
                        };
                        this._iframe.addEventListener("load", onLoad);
                    });
                    this.dispatchEvent(new CustomEvent("preloading", { detail: { promise: iframeLoadPromise }, bubbles: true }));
                }

                this._src = value;
            });

        // trigger a set to src whenever assets change
        this._overlay.addEventListener("assets-changed", this.onAssetsChanged);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._overlay.removeEventListener("assets-changed", this.onAssetsChanged);
    }

    onAssetsChanged() {
        this.src = this._src;
    }
}

if (window.customElements)
    customElements.define("openoverlay-iframe", OpenOverlayIframe);

export default OpenOverlayIframe;