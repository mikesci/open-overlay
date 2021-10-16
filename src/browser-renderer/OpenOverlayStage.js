class OpenOverlayStage extends HTMLElement {
    _contentWidth;
    _contentHeight;
    _slot;

    static get observedAttributes() {
        return ["width", "height"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const hostStyle = document.createElement("style");
        hostStyle.textContent = ":host { display: block; position: relative; }\n:host([hidden]) { display: none; }";
        const slot = document.createElement("slot");
        slot.style.display = "block";
        slot.style.transformOrigin = "top left";
        this.shadowRoot.append(hostStyle, slot);

        this._slot = slot;
        this._contentWidth = parseFloat(this.getAttribute("width"));
        this._contentHeight = parseFloat(this.getAttribute("height"));
        this.onWindowResized = this.onWindowResized.bind(this);
    }

    onWindowResized() {
        // if not connected, do nothing
        if (!this.isConnected)
            return null;

        const rect = this.shadowRoot.host.getBoundingClientRect();

        // default width/height to 1920x1080
        const targetWidth = (isNaN(this._contentWidth) ? 1920 : this._contentWidth);
        const targetHeight = (isNaN(this._contentHeight) ? 1080 : this._contentHeight);

        let scale;
        if ((rect.height / rect.width) < (targetHeight / targetWidth))
            scale = rect.height / targetHeight;
        else
            scale = rect.width / targetWidth;

        // center in the stage
        const offsetX = (rect.width - (targetWidth * scale)) / 2;
        const offsetY = (rect.height - (targetHeight * scale)) / 2;

        this._slot.style.width = targetWidth + "px";
        this._slot.style.height = targetHeight + "px";
        this._slot.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    }

    connectedCallback() {
        // watch for window resize events
        window.addEventListener("resize", this.onWindowResized);
        // and trigger a resize event for initial sizing
        this.onWindowResized();
    }

    disconnectedCallback() {
        window.removeEventListener("resize", this.onWindowResized);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "width") { this.contentWidth = parseFloat(newValue); this.onWindowResized(); return; }
        if (name == "height") { this.contentHeight = parseFloat(newValue); this.onWindowResized(); return; }
    }
}

if (window.customElements)
    customElements.define("openoverlay-stage", OpenOverlayStage);

export default OpenOverlayStage;