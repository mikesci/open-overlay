import React from "react";

class RectangleElement extends React.Component {
    static manifest = {
        name: "Rectangle",
        author: "SCI",
        description: "A customizable rectangle.",
        width: 640,
        height: 360,
        preserveAspect: false,
        parameters: [
        ],
        defaultEffects: {
            "backgroundColor": { "color": "#fff" }
        }
    };
  
    render() {
        let style = Object.assign({}, { height: "100%", width: "100%" });
        return (
            <div style={style}></div>
        );
    }
}

class KnockoutElement extends React.Component {
    static manifest = {
        name: "Knockout",
        author: "SCI",
        description: "A customizable knockout area.",
        width: 400,
        height: 400,
        preserveAspect: false,
        parameters: [
            { "name": "radius", "displayName": "Corner Radius", "type": "text" }
        ]
    };

    _knockoutId;
    _lastRect;

    componentDidMount() {
        /*
        this.props.scriptContext.emit(this.props.layer.id, "set-knockout", null);
        this.props.scriptContext.on("whatever", (data) => {

        });

        on("whatever", () => {
            console.log
        });
        */

        this._knockoutId = this.props.onRegisterKnockout();
        this.props.onUpdateKnockout(this._knockoutId, this.buildPathString(this.props.layer, this.props.radius));
        this._lastRect = {
            top: this.props.layer.top,
            left: this.props.layer.left,
            width: this.props.layer.width,
            height: this.props.layer.height,
            radius: this.props.radius
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        let needsUpdate = false;

        if (nextProps.layer.top != this._lastRect.top) { needsUpdate = true; this._lastRect.top = nextProps.layer.top; }
        if (nextProps.layer.left != this._lastRect.left) { needsUpdate = true; this._lastRect.left = nextProps.layer.left; }
        if (nextProps.layer.width != this._lastRect.width) { needsUpdate = true; this._lastRect.width = nextProps.layer.width; }
        if (nextProps.layer.height != this._lastRect.height) { needsUpdate = true; this._lastRect.height = nextProps.layer.height; }
        if (nextProps.radius != this._lastRect.radius) { needsUpdate = true; this._lastRect.radius = nextProps.radius; }

        if (needsUpdate) {
            this.props.onUpdateKnockout(this._knockoutId, this.buildPathString(nextProps.layer, nextProps.radius));
        }

        // we'll never need to render anything
        return false;
    }

    componentWillUnmount() {
        this.props.onRemoveKnockout(this._knockoutId);
    }

    buildPathString(layer, radius) {
        let intRadius;
        if (radius != null && radius.length > 0) {
            intRadius = parseInt(radius);
        }
        if (intRadius && !isNaN(intRadius)) {
            // clamp to max out at half width/height
            intRadius = Math.min(Math.min(intRadius, layer.height / 2), layer.width / 2);
            return `M${layer.left} ${layer.top + intRadius} L${layer.left} ${layer.top + layer.height - intRadius} A${intRadius} ${intRadius} 90 0 0 ${layer.left + intRadius} ${layer.top + layer.height} L${layer.left + layer.width - intRadius} ${layer.top + layer.height} A${intRadius} ${intRadius} 90 0 0 ${layer.left + layer.width} ${layer.top + layer.height - intRadius} L${layer.left + layer.width} ${layer.top + intRadius} A${intRadius} ${intRadius} 90 0 0 ${layer.left + layer.width - intRadius} ${layer.top} L${layer.left + intRadius} ${layer.top} A${intRadius} ${intRadius} 90 0 0 ${layer.left} ${layer.top + intRadius}`;
        } else {
            return `M${layer.left} ${layer.top} L${layer.left} ${layer.top + layer.height} L${layer.left + layer.width} ${layer.top + layer.height} L${layer.left + layer.width} ${layer.top} L${layer.left} ${layer.top}`;
        }
    }

    render() {
        return null;
    }
}

class TextElement extends React.Component {
    static manifest = {
        name: "Text",
        author: "SCI",
        description: "A customizable text element.",
        width: 400,
        height: 400,
        preserveAspect: false,
        parameters: [
            { "name": "text", "displayName": "Text", "type": "textarea", "defaultValue": "text" },
            { "name": "font", "displayName": "Font", "type": "font", "defaultValue": { "fontFamily": "Arial", "fontSize": "144pt", "color": "rgba(255,255,255,1)" } },
            { "name": "valign", "displayName": "Vertical Align", "type": "valign", "defaultValue": "flex-start" }
        ]
    };

    constructor(props) {
        super(props);
    }

    valignToAlignItems = valign => {
        if (valign == "top") { return "flex-start"; }
        if (valign == "center") { return "center"; }
        if (valign == "bottom") { return "flex-end"; }
        return null;
    }

    textAlignToJustifyContent = textAlign => {
        if (textAlign == "left") { return "flex-start"; }
        if (textAlign == "center") { return "center"; }
        if (textAlign == "right") { return "flex-end"; }
        return null;
    }
  
    render() {
        let style = Object.assign({},
            this.props.font,
            {
                height: "100%",
                width: "100%",
                overflow: "hidden",
                display: "flex",
                whiteSpace: "pre",
                alignItems: this.valignToAlignItems(this.props.valign),
                justifyContent: this.textAlignToJustifyContent(this.props.font.textAlign)
            });
        return (
            <div style={style}>{this.props.text}</div>
        );
    }
}

class EllipseElement extends React.Component {
    static manifest = {
        name: "Ellipse",
        author: "SCI",
        description: "A customizable ellipse or circle.",
        width: 400,
        height: 400,
        preserveAspect: false,
        parameters: [{
            "name": "fill",
            "type": "color",
            "displayName": "Fill Color",
            "defaultValue": "#FF0000"
        }]
    };
  
    render() {
        return (
            <svg style={{ height: "100%", width: "100%" }}><ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill={this.props.fill} /></svg>
        );
    }
}

class ImageElement extends React.Component {
    static manifest = {
        name: "Image",
        author: "SCI",
        description: "A customizable image.",
        width: 400,
        height: 400,
        preserveAspect: true,
        parameters: [
            { "name": "url", "displayName": "Url", "type": "text" },
            { "name": "fit", "displayName": "Fit", "type": "select", "defaultValue": "cover", "options": [
                { label: "Contain", value: "contain" },
                { label: "Cover", value: "cover" },
                { label: "Fill", value: "fill" }
            ]},
            { "name": "offset", "displayName": "Offset", "type": "text" }
        ]
    };

    constructor(props) {
        super(props);
        this.state = {
            preloaded: false
        };
    }

    componentDidMount() {
        new Promise((resolve, reject) => {
            let img = new Image();
            img.addEventListener("load", resolve);
            img.addEventListener("error", resolve);
            img.addEventListener("abort", resolve);
            img.src = this.props.url;
        }).then(() => {
            this.setState({ preloaded: true });
        })
        .catch(err => {
            this.setState({ preloaded: true });
        });
    }
  
    render() {
        if (!this.state.preloaded) { return null; }

        return (
            <img src={this.props.url} style={{ "height": "100%", "width": "100%", "objectFit": this.props.fit, "objectPosition": this.props.offset }} />
        );
    }
}

class VideoElement extends React.Component {
    static manifest = {
        name: "Video",
        author: "SCI",
        description: "A customizable video player.",
        width: 1280,
        height: 720,
        preserveAspect: true,
        parameters: [
            { "name": "url", "displayName": "Url", "type": "text" },
            { "name": "playing", "type": "checkbox", "displayName": "Playing", "defaultValue": true },
            { "name": "loop", "type": "checkbox", "displayName": "Loop", "defaultValue": false },
            { "name": "volume", "type": "slider", "displayName": "Volume", "defaultValue": 100 },
            { "name": "fit", "displayName": "Fit", "type": "select", "defaultValue": "cover", "options": [
                { label: "Contain", value: "contain" },
                { label: "Cover", value: "cover" },
                { label: "Fill", value: "fill" }
            ]},
            { "name": "offset", "displayName": "Offset", "type": "text" }
        ]
    };

    _vidRef;

    constructor(props) {
        super(props);
        this._vidRef = React.createRef();
        this.state = {
            preloaded: false
        };
    }

    componentDidUpdate(prevProps) {
        let newShouldPlay = this.props.playing && !(this.props.container && this.props.container.hidden) && !this.props.hidden;
        let oldShouldPlay = prevProps.playing && !(prevProps.container && prevProps.container.hidden) && !prevProps.hidden;

        if (newShouldPlay != oldShouldPlay) {
            this._vidRef.current.currentTime = 0;
            if (newShouldPlay)
                this._vidRef.current.play();
            else
                this._vidRef.current.pause();
        }

        if (prevProps.url != this.props.url) {
            this._vidRef.current.load();
        }

        this._vidRef.current.volume = ((this.props.volume != null ? this.props.volume : 100) / 100);
    }

    onLoadedData = evt => {
        this.setState({ preloaded: true });
        if (this.props.playing) {
            this._vidRef.current.play().catch((err) => {
                // videos can fail to play if the user doesn't interact with the document.
                // not a big deal for the renderer, but we'll log to the console
                console.log(err.message);
            });
        }
    }
  
    render() {
        let style = {
            "height": "100%",
            "width": "100%",
            "objectFit": this.props.fit,
            "objectPosition": this.props.offset,
            "opacity": (this.state.preloaded ? 1 : 0)
        };
        
        return (
            <video ref={this._vidRef} onLoadedData={this.onLoadedData} loop={this.props.loop} style={style}>
                <source src={this.props.url} />
            </video>
        );
    }
}

class AudioElement extends React.Component {
    static manifest = {
        name: "Audio",
        author: "SCI",
        description: "A customizable audio player.",
        nonVisual: true,
        parameters: [
            { "name": "url", "displayName": "Url", "type": "text" },
            { "name": "playing", "type": "checkbox", "displayName": "Playing", "defaultValue": true },
            { "name": "loop", "type": "checkbox", "displayName": "Loop", "defaultValue": false },
            { "name": "volume", "type": "slider", "displayName": "Volume", "defaultValue": 100 }
        ]
    };

    _audioRef;

    constructor(props) {
        super(props);
        this._audioRef = React.createRef();
        this.state = {
            preloaded: false
        };
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.playing != nextProps.playing) {
            if (nextProps.playing || nextProps.playing == undefined)
                this._audioRef.current.play();
            else
                this._audioRef.current.pause();
        }

        if (this.props.url != nextProps.url) {
            this._audioRef.current.load();
        }

        return true;
    }

    componentDidUpdate() {
        this._audioRef.current.volume = ((this.props.volume != null ? this.props.volume : 100) / 100);
    }

    onLoadedData = evt => {
        this.setState({ preloaded: true });
        if (this.props.playing) {
            this._audioRef.current.play().catch((err) => {
                // videos can fail to play if the user doesn't interact with the document.
                // not a big deal, but we'll log to the console
                console.log(err.message);
            });
        }
    }
  
    render() {
        return (
            <audio ref={this._audioRef} onLoadedData={this.onLoadedData} loop={this.props.loop}>
                <source src={this.props.url} />
            </audio>
        );
    }
}

class IFrameElement extends React.Component {
    static manifest = {
        name: "Iframe",
        author: "SCI",
        description: "A customizable iframe.",
        width: 400,
        height: 400,
        preserveAspect: false,
        parameters: [
            { "name": "url", "type": "text", "displayName": "Url" }
        ]
    };
  
    render() {
        return (
            <iframe src={this.props.url} style={{ "border": "0", height: "100%", width: "100%" }}></iframe>
        );
    }
}

class YoutubeElement extends React.Component {
    static manifest = {
        name: "Youtube",
        author: "SCI",
        description: "A customizable YouTube player.",
        width: 1280,
        height: 720,
        preserveAspect: true,
        parameters: [
            { "name": "url", "type": "text", "displayName": "Url", "inline": 78 },
            { "name": "start", "type": "text", "displayName": "Start (s)", "inline": 20 },
            { "name": "volume", "type": "slider", "displayName": "Volume", "defaultValue": 100, "inline": 70 },
            { "name": "playing", "type": "checkbox", "displayName": "Playing", "defaultValue": true, "inline": 20, "compact": false }
        ]
    };

    static URL_REGEX = /.*(?:www\.youtube\.com\/(?:(?:watch\?v=)|(?:embed\/))|(?:youtu\.be\/))([a-z0-9]+)(?:\?(?:(?:t)|(?:start))=(\d+))?/i;

    _queuedOperations = {
        playing: []
    };

    _targetRef;

    constructor(props) {
        super(props);

        this._targetRef = React.createRef();

        if (!window.onYouTubeIframeAPIReadyPromise) {
            window.onYouTubeIframeAPIReadyPromise = new Promise(resolve => {
                if (window.YT) { resolve(); return; }
                var $script = document.createElement("script");
                $script.type = "text/javascript";
                $script.src = "https://www.youtube.com/iframe_api";
                document.head.append($script);
                window.onYouTubeIframeAPIReady = resolve;
            });
        }
    }

    componentDidMount() {
        let self = this;
        window.onYouTubeIframeAPIReadyPromise.then(() => {
            let player = new YT.Player(this._targetRef.current, {
                width: "100%",
                height: "100%",
                playerVars: { 'controls': 0, 'modestbranding': 1 },
                events: {
                    onReady: function (evt) {
                        self.updatePlayerState({}, self.props);
                    },
                    onStateChange: self.onStateChange
                }
            });

            this._player = player;
        });
    }

    onStateChange = (evt) => {
        let playerState = evt.data;
        if (playerState == 1) { // playing, paused, buffering respectively
            while (this._queuedOperations.playing.length > 0) {
                this._queuedOperations.playing.splice(0, 1)[0]();
            }
        }
    }

    updatePlayerState = (lastProps, nextProps) => {

        if (nextProps.url != lastProps.url) {
            let url = this.getYoutubeUrl(nextProps);
            this._player.loadVideoByUrl(url);
            this._queuedOperations.playing.push(() => {
                this._player.seekTo(0);
            });
        }

        if (nextProps.url != lastProps.url || nextProps.start != lastProps.start) {
            let playerState = this._player.getPlayerState();
            if (playerState == 1 || playerState == -1) { // playing or paused, respectively
                this._player.seekTo(nextProps.start);
            } else {
                this._queuedOperations.playing.push(() => {
                    this._player.seekTo(nextProps.start);
                });
            }
        }

        if (nextProps.playing != lastProps.playing) {
            if (nextProps.playing)
                this._player.playVideo();
            else
                this._player.pauseVideo();
        }

        if (nextProps.volume != lastProps.volume) {
            this._player.setVolume(nextProps.volume);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.updatePlayerState(this.props, nextProps);
        return true;
    }

    getYoutubeUrl = props => {
        if (!props.url) { return ""; }
        let match = props.url.match(YoutubeElement.URL_REGEX);
        if (match == null || match.length < 2 || match[1].length == 0) { return ""; }
        let videoId = match[1];
        return `http://www.youtube.com/v/${videoId}?version=3`;
    }
  
    render() {
        return (
            <>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
                <div style={{ overflow: "hidden", height: "100%", width: "100%", display: (this.props.url != null && this.props.url.length > 0 ? "block" : "none") }}><div ref={this._targetRef}></div></div>
            </>
        );
    }
}

export default {
    Builtin: {
        "rectangle": RectangleElement,
        "text": TextElement,
        "ellipse": EllipseElement,
        "image": ImageElement,
        "video": VideoElement,
        "audio": AudioElement,
        "knockout": KnockoutElement,
        "iframe": IFrameElement,
        "youtube": YoutubeElement
    }
};