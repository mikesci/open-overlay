import { makeProperty } from "../utilities.js";

class DOMElementBase extends HTMLElement {
    _name;
    _overlay;
    _assetReferences;
    _initialized;
    _hostStyle;

    get renderer() { return this._overlay.renderer; }

    constructor() {
        super();
        this._assetReferences = {};

        // export makeProperty for custom elements
        this.makeProperty = makeProperty;
    }

    connectedCallback() {
        this._initialized = true;

        this._overlay = this.closest("openoverlay-overlay");
        if (!this._overlay)
            throw "Layer elements must be a descendant of an openoverlay-overlay element.";

        // set up common properties
        makeProperty(this, "hidden", false,
            () => this._hidden,
            (value) => { this._hidden = value; this.style.visibility = (value ? "hidden" : "visible"); if (this.onHiddenChanged) { this.onHiddenChanged(value); } });
        makeProperty(this, "top", 0,
            () => this._top,
            (value) => { this._top = value; this.style.top = value + "px"; });
        makeProperty(this, "left", 0,
            () => this._left,
            (value) => { this._left = value; this.style.left = value + "px"; });
        makeProperty(this, "width", 0,
            () => this._width,
            (value) => { this._width = value; this.style.width = value + "px"; });
        makeProperty(this, "height", 0,
            () => this._height,
            (value) => { this._height = value; this.style.height = value + "px"; });
        makeProperty(this, "backgroundColor", null,
            () => this._backgroundColor,
            (value) => { this._backgroundColor = value; this.style.backgroundColor = value || null; });
        makeProperty(this, "border", null,
            () => this._border,
            (value) => { this._border = value; this.style.border = value || null; });
        makeProperty(this, "borderRadius", null,
            () => this._borderRadius,
            (value) => { this._borderRadius = value; this.style.borderRadius = value || null; });
        makeProperty(this, "opacity", null,
            () => this._opacity,
            (value) => { this._opacity = value; this.style.opacity = value || null; });
        makeProperty(this, "boxShadow", null,
            () => this._boxShadow,
            (value) => { this._boxShadow = value; this.style.boxShadow = value || null; });
        makeProperty(this, "filter", null,
            () => this._filter,
            (value) => { if (this._filter != value) { this._filter = value; this.style.filter = value || null; } });
        makeProperty(this, "transform", null,
            () => this._transform,
            (value) => { if (this._transform != value) { this._transform = value; this.style.transform = value || null; } });
    }

    referenceAsset(key, id) {
        this._assetReferences[key] = id;
    }

    unreferenceAsset(key) {
        delete this._assetReferences[key];
    }

    hasAssetReference(key) {
        return (this._assetReferences[key] != null);
    }

    getAssetReferences() {
        return Object.values(this._assetReferences);
    }

    disconnectedCallback() { }
}

// this is a base class, no need to register with customElements

export default DOMElementBase;