import DOMElementBase from "./DOMElementBase.js";
import { makeProperty } from "../utilities.js";

const YOUTUBE_URL_REGEX = /.*(?:www\.youtube\.com\/(?:(?:watch\?v=)|(?:embed\/))|(?:youtu\.be\/))([a-z0-9]+)(?:\?(?:(?:t)|(?:start))=(\d+))?/i;

function getYoutubeVideoId(url) {
    const match = url.match(YOUTUBE_URL_REGEX);
    return (match ? match[1] : null);
}

class OpenOverlayVideo extends DOMElementBase {

    _subelement;
    _isPlaying;

    constructor() {
        super();
        this.ensureSubelement = this.ensureSubelement.bind(this);
        this.getNaturalDimensions = this.getNaturalDimensions.bind(this);
        this.onAssetsChanged = this.onAssetsChanged.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.stop = this.stop.bind(this);
    }

    connectedCallback() {
        if (this._initialized) { return; }

        super.connectedCallback();

        makeProperty(this, "autoplay", false,
            () => this._autoplay,
            (value) => {
                this._autoplay = value;
                if (this._subelement)
                    this._subelement.autoplay = value;
            });

        makeProperty(this, "src", null,
            () => this._src,
            (value) => {
                // unreference prior asset if needed
                if (this._src && this._src.startsWith("#"))
                    this.unreferenceAsset("src");

                // check if this is a youtube video URL
                const youtubeVideoId = getYoutubeVideoId(value);

                this.ensureSubelement(youtubeVideoId != null);

                this._subelement.style.objectFit = this._objectFit || "cover";
                this._subelement.style.objectPosition = this._objectPosition || "center center";
                this._subelement.autoplay = this._autoplay;
                this._subelement.videoId = youtubeVideoId;

                if (!youtubeVideoId) {
                    if (value.startsWith("#")) {
                        if (this._overlay.assetsAvailable()) {
                            const asset = this._overlay.findAsset(value);
                            if (asset) {
                                this.referenceAsset("src", value);
                                this._subelement.src = (asset ? asset.objectUrl : null);
                            } else {
                                console.error("Could not find asset " + value);
                                this._subelement.src = null;
                            }
                        }
                    }
                    else {
                        this._subelement.src = value;
                    }
                } 

                this._src = value;
            });

        makeProperty(this, "volume", null,
            () => this._volume,
            (value) => { this._volume = value; this._subelement.volume = value; });

        makeProperty(this, "objectFit", null,
            () => this._objectFit,
            (value) => { this._objectFit = value; this._subelement.style.objectFit = value; });

        makeProperty(this, "objectPosition", null,
            () => this._objectPosition,
            (value) => { this._objectPosition = value; this._subelement.style.bjectPosition = value; });

        makeProperty(this, "currentTime", 0,
            () => this._subelement.currentTime,
            (value) => { this._subelement.currentTime = value; });

        makeProperty(this, "duration", 0,
            () => this._subelement.duration,
            (value) => { });

        // trigger a set to src whenever assets change and we have an active asset reference
        this._overlay.addEventListener("assets-changed", this.onAssetsChanged);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._overlay.removeEventListener("assets-changed", this.onAssetsChanged);
    }

    onAssetsChanged() {
        this.src = this._src;
    }

    onCommand({ detail: { command, commandArg, settings, layerid } }) {
        if (layerid == this.id) {
            switch (command) {
                case "setCurrentTime":
                    this._subelement.currentTime = commandArg;
                    break;
                case "registerForStatusEvents":
                    console.log("got status events yo", commandArg);
                    this.
                    break;
                case "unregisterForStatusEvents":
                    console.log("got UNREG status events yo", commandArg);
                    break;
                default:
                    break;
            }
        }
    }

    ensureSubelement(isYoutube) {
        if (isYoutube && !(this._subelement instanceof OpenOverlayVideoYouTube)) {
            if (this._subelement)
                this.removeChild(this._subelement);
            
            this._subelement = document.createElement("openoverlay-video-youtube");
            this.appendChild(this._subelement);
        } else if (!isYoutube && !(this._subelement instanceof HTMLVideoElement)) {
            if (this._subelement)
                this.removeChild(this._subelement);
            
            this._subelement = document.createElement("video");
            this._subelement.style = "width:100%;height:100%;";
            this.appendChild(this._subelement);
        }
    }

    getNaturalDimensions() {
        // youtube doesn't provide an API to get video sizes (or even aspect ratios), so we'll fix this to a good default
        // 1280x720 should look good in most cases
        if (this._subelement instanceof OpenOverlayVideoYouTube)
            return { width: 1280, height: 720 };

        if (this._subelement instanceof HTMLVideoElement)
            return { width: this._subelement.videoWidth, height: this._subelement.videoHeight };

        return null;
    }

    onHiddenChanged(hidden) {
        if (this._isPlaying) {
            if (hidden)
                this._subelement.pause();
            else
                this._subelement.play();
        }
    }

    play() {
        if (!this._subelement) {
            console.error("Subelement not ready.");
            return;
        }
        this._subelement.play();
    }

    pause() {
        if (!this._subelement) {
            console.error("Subelement not ready.");
            return;
        }
        this._subelement.pause();
    }

    stop() {
        if (!this._subelement) {
            console.error("Subelement not ready.");
            return;
        }
        this._subelement.pause();
        this._subelement.currentTime = 0;
    }
}

class OpenOverlayVideoYouTube extends HTMLElement {

    _target;
    _apiReadyPromise;
    _playerReadyPromise;
    _lastPlayer;

    get autoplay() { return this._autoplay; }
    set autoplay(value) { this._autoplay = value; }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._getVideoUrl = this._getVideoUrl.bind(this);
        this._ensureYoutubeAPILoaded = this._ensureYoutubeAPILoaded.bind(this);
        
        const wrapper = document.createElement("div");
        wrapper.style = "overflow:hidden;height:100%;width:100%;";
        this.shadowRoot.append(wrapper);

        const interactionBlocker = document.createElement("div")
        interactionBlocker.style = "position:absolute;top:0;left:0;width:100%;height:100%;";
        wrapper.append(interactionBlocker);

        const target = document.createElement("div");
        wrapper.append(target);
        this._target = target;

        this._ensureYoutubeAPILoaded();
    }

    _getVideoUrl() {
        return `http://www.youtube.com/v/${this._videoId}?version=3`;
    }

    _ensureYoutubeAPILoaded() {
        this._apiReadyPromise = new Promise((resolve) => {
            // if window.YT is defined, we're already loaded
            if (window.YT) {
                resolve();
                return;
            }

            // look through the header for the API script to determine if some other code is currently loading the youtube API script
            // otherwise, we need to load the iframe API
            let youtubeApiScriptElement = document.querySelector("script[src='https://www.youtube.com/iframe_api']");

            if (!youtubeApiScriptElement) {
                youtubeApiScriptElement = document.createElement("script");
                youtubeApiScriptElement.src = "https://www.youtube.com/iframe_api";
                document.head.append(youtubeApiScriptElement);
            }

            if (window.onYouTubeIframeAPIReady) {
                const existingApiReadyFunction = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = () => {
                    existingApiReadyFunction();
                    resolve();
                };
            } else {
                window.onYouTubeIframeAPIReady = resolve;
            }
        });

        // dispatch a preloading event so the overlay won't show until we've got something to render
        this.dispatchEvent(new CustomEvent("preloading", { detail: { promise: this._apiReadyPromise }, bubbles: true }));
    }

    connectedCallback() {
        if (this._initialized) { return; }
        this._initialized = true;

        makeProperty(this, "videoId", null,
            () => this._videoId,
            (value) => {
                this._videoId = value;
                // update the youtube player when video changes
                if (this._playerReadyPromise) {
                    this._playerReadyPromise.then(player => {
                        player.stopVideo();
                        if (this._videoId) {
                            if (this._autoplay)
                                player.loadVideoById(this._videoId);
                            else
                                player.cueVideoById(this._videoId);
                        }
                    });
                }
            });

        makeProperty(this, "autoplay", null,
            () => this._autoplay,
            (value) => { this._autoplay = value; });

        makeProperty(this, "currentTime", null,
            () => (this._lastPlayer ? this._lastPlayer.getCurrentTime() : 0),
            (value) => {
                if (!this._lastPlayer) { return; }
                this._lastPlayer.seekTo(value);
            });

        makeProperty(this, "duration", null,
            () => (this._lastPlayer ? this._lastPlayer.getDuration() : 0),
            (value) => {  });

        makeProperty(this, "volume", null,
            () => this._volume,
            (value) => {
                this._volume = value;
                if (this._lastPlayer)
                    this._lastPlayer.setVolume(value * 100);
            });

        this._playerReadyPromise = new Promise((resolve) => {
            this._apiReadyPromise.then(() => {
                const player = new YT.Player(this._target, {
                    width: "100%",
                    height: "100%",
                    playerVars: { 'controls': 0, 'modestbranding': 1 },
                    events: {
                        onReady: () => {
                            this._lastPlayer = player;
                            if (this._volume) { player.setVolume(this._volume * 100); }
                            resolve(player);
                        }
                    }
                });
            });
        });

        this.dispatchEvent(new CustomEvent("preloading", { detail: { promise: this._playerReadyPromise }, bubbles: true }));
    }

    disconnectedCallback() {
    }

    pause() {
        if (!this._lastPlayer) {
            console.error("Got pause() before player was loaded.");
            return;
        }
        this._lastPlayer.pauseVideo();
    }

    play() {
        if (!this._lastPlayer) {
            console.error("Got play() before player was loaded.");
            return;
        }
        this._lastPlayer.playVideo();
    }
}

if (window.customElements) {
    customElements.define("openoverlay-video", OpenOverlayVideo);
    customElements.define("openoverlay-video-youtube", OpenOverlayVideoYouTube);
}

export { OpenOverlayVideo, OpenOverlayVideoYouTube };