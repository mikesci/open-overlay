import { makeProperty } from "../utilities.js";
import DOMElementBase from "./DOMElementBase.js";

class OpenOverlayImage extends DOMElementBase {

    _img;

    constructor() {
        super();
        this._img = document.createElement("img");
        this._img.style = "height: 100%; width: 100%; object-fit: inherit; object-position: inherit";
        this.getNaturalDimensions = this.getNaturalDimensions.bind(this);
        this.onAssetsChanged = this.onAssetsChanged.bind(this);
    }

    connectedCallback() {
        if (this._initialized) { return; }
        
        super.connectedCallback();

        // append the image
        this.append(this._img);

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
                            this._img.src = asset.objectUrl;
                        } else {
                            console.error("Could not find asset " + value);
                            this._img.src = null;
                        }
                    }
                } else {
                    this._img.src = value;
                }

                this._src = value;
            });

        makeProperty(this, "objectFit", null,
            () => this._objectFit,
            (value) => { this._objectFit = value; this._img.style.objectFit = value; });

        makeProperty(this, "objectPosition", null,
            () => this._objectPosition,
            (value) => { this._objectPosition = value; this._img.style.objectPosition = value; });

        // trigger a set to src whenever assets change and we have an active asset reference
        this._overlay.addEventListener("assets-changed", this.onAssetsChanged);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._overlay.removeEventListener("assets-changed", this.onAssetsChanged);
    }

    onAssetsChanged() {
        // whenever assets change, re-call the src setter with the existing value to update asset references and stuff
        this.src = this._src;
    }

    getNaturalDimensions() {
        if (!this._img)
            return null;

        return {
            width: this._img.naturalWidth,
            height: this._img.naturalHeight
        };
    }
}

if (window.customElements)
    customElements.define("openoverlay-image", OpenOverlayImage);

export default OpenOverlayImage;