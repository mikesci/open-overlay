import DOMElementBase from "./DOMElementBase.js";

class OpenOverlayRectangle extends DOMElementBase {
    
    constructor() {
        super();
    }

    connectedCallback() {
        if (this._initialized) { return; }
        super.connectedCallback();
    }
}

if (window.customElements)
    customElements.define("openoverlay-rectangle", OpenOverlayRectangle);

export default OpenOverlayRectangle;