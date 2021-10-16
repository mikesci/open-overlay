import DOMElementBase from "./DOMElementBase.js";
import { makeProperty, loadFont } from "../utilities.js";

class OpenOverlayText extends DOMElementBase {

    _textDom;
    _textShadow;

    constructor() {
        super();
    }

    connectedCallback() {
        if (this._initialized) { return; }
        // default styles
        if (this.width === undefined) { this.width = 1; }
        if (this.height === undefined) { this.height = 1; }

        this.style.fontFamily = "Arial";
        this.style.fontSize = "60px";
        this.style.color = "rgba(255,255,255,1)";
        this.style.display = "flex";
        this.style.alignItems = "flex-start";
        this.style.justifyContent = "flex-start";
        this.style.whiteSpace = "pre";
        this.style.overflow = "visible";

        // styles will be overridden by the DOMElementBase super class
        super.connectedCallback();

        makeProperty(this, "text", "",
            () => this.innerText,
            (value) => { this.innerText = value; });

        makeProperty(this, "font", "",
            () => this._font,
            (value) => { this._font = value; this.style.fontFamily = value; });

        makeProperty(this, "fontSrc", null,
            () => this._fontSrc,
            (value) => { this._fontSrc = value; this.onFontSrcChanged(); });

        makeProperty(this, "fontSize", null,
            () => this._fontSize,
            (value) => { this._fontSize = value; this.style.fontSize = (value == null ? null : value + "px") });

        makeProperty(this, "fontColor", null,
            () => this._fontColor,
            (value) => { this._fontColor = value; this.style.color = value });

        makeProperty(this, "wrap", null,
            () => this._wrap,
            (value) => { this._wrap = value; this.style.whiteSpace = (value ? "pre-wrap" : "pre") });

        makeProperty(this, "letterSpacing", null,
            () => this._letterSpacing,
            (value) => { this._letterSpacing = value; this.style.letterSpacing = (value == null ? null : value + "px") });

        makeProperty(this, "lineHeight", null,
            () => this._lineHeight,
            (value) => { this._lineHeight = value; this.style.lineHeight = (value == null ? null : value + "px") });

        makeProperty(this, "textShadow", null,
            () => this._textShadow,
            (value) => { this._textShadow = value; this.style.textShadow = value });

        makeProperty(this, "bold", null,
            () => this._bold,
            (value) => { this._bold = value; this.style.fontWeight = (value ? "bold" : "normal"); });

        makeProperty(this, "italic", null,
            () => this._italic,
            (value) => { this._italic = value; this.style.fontStyle = (value ? "italic" : "normal"); });

        makeProperty(this, "underline", null,
            () => this._underline,
            (value) => { this._underline = value; this.style.textDecoration = (value ? "underline" : "none"); });

        // "left", "center", "right"
        makeProperty(this, "hAlign", null,
            () => this._hAlign,
            (value) => {
                this._hAlign = value;
                switch (value) {
                    case "left":
                        this.style.textAlign = "left";
                        this.style.justifyContent = "flex-start";
                        break;
                    case "center":
                        this.style.textAlign = "center";
                        this.style.justifyContent = "center";
                        break;
                    case "right":
                        this.style.textAlign = "right";
                        this.style.justifyContent = "flex-end";
                        break;
                    default:
                        break;
                }
            });
            
        // "top", "center", "bottom"
        makeProperty(this, "vAlign", null,
            () => this._vAlign,
            (value) => {
                this._vAlign = value;
                switch (value) {
                    case "top":
                        this.style.alignItems = "flex-start";
                        break;
                    case "center":
                        this.style.alignItems = "center";
                        break;
                    case "bottom":
                        this.style.alignItems = "flex-end";
                        break;
                    default:
                        break;
                }
            });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    onFontSrcChanged() {
        // if _fontSrc is not specified, do nothing
        if (!this._fontSrc)
            return null;

        if (!window._loadedFonts)
            window._loadedFonts = [];

        // if we've already loaded this font, return immediately
        if (window._loadedFonts.includes(this._fontSrc))
            return;

        // if we've gotten here, we need to load the google font.
        const preloadPromise = loadFont(this._fontSrc).then(r => {
            window._loadedFonts.push(this._fontSrc);
        });

        this.dispatchEvent(new CustomEvent("preloading", { detail: { promise: preloadPromise }, bubbles: true }));
    }
}

if (window.customElements)
    customElements.define("openoverlay-text", OpenOverlayText);

export default OpenOverlayText;