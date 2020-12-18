import React, { useEffect, useRef, useState, useCallback } from "react";

// all elements get these props
// {...config}
// layer
// overlayContext - { getAsset, emit, registerScript, unregisterScript }
// - getAsset(assetUrl) - changes potential assetUrl strings into dataURIs.  if the argument is not an assetUrl, returns the original argument
// - emit(eventName, eventArgs) - emits events to other layers/scripts
// - registerScript(key, data) - registers an external script with the scripting context
// - unregisterScript(key) - unregisters an external script with the scripting context

const DEFAULT_DIMENSION_TIMEOUT_MS = 500;
const YOUTUBE_URL_REGEX = /.*(?:www\.youtube\.com\/(?:(?:watch\?v=)|(?:embed\/))|(?:youtu\.be\/))([a-z0-9]+)(?:\?(?:(?:t)|(?:start))=(\d+))?/i;

function getSrcFromAssetUrl(assetUrl, assets) {
    if (!isAssetUrl(assetUrl))
        return assetUrl;

    if (!assets) { return null; }
    
    const asset = assets[assetUrl];
    if (!asset) {  return null; }

    return asset.src;
}

function isAssetUrl(url) {
    if (!url) { return false; }
    return url.startsWith("asset:");
}

function getYoutubeVideoId(url) {
    if (!url || isAssetUrl(url))
        return null;

    const match = url.match(YOUTUBE_URL_REGEX);
    if (!match)
        return null;
    
    return match[1];
}

function loadScriptSourceAsync(url, assets) {
    if (isAssetUrl(url)) {
        const assetSource = assets[url];
        // decode the asset data
        if (assetSource.length <= 28) { console.log("Asset data was malformed."); return; }
        const source = atob(assetSource.substr(28));
        return Promise.resolve(source);
    }
    else {
        return fetch(url).then(response => response.text()).catch(err => {
            console.log(`Could not fetch ${url}: ${err}`);
        });
    }
}

const STYLES = {
    POSITIONABLE: [
        "rect"
    ],
    STANDARD: [
        "border",
        "backgroundColor",
        "opacity",
        "padding",
        "shadow",
        "filters",
        "cornerClip",
        "3dtransform"
    ],
    TEXT: [
        "font",
        "letterSpacing",
        "textStroke",
        "textShadow",
        "lineHeight"
    ],
    FITTABLE: [
        "autoFit"
    ]
};

const RectangleElement = {
    manifest: {
        name: "Rectangle",
        icon: "square",
        preserveAspect: false,
        primative: true,
        parameters: [ ],
        allowedStyles: [
            ...STYLES.POSITIONABLE,
            ...STYLES.STANDARD
        ],
        defaultStyle: { top: 0, left: 0, width: 640, height: 360, backgroundColor: "#FF0000" }
    },
    component: (props) => {
        return null;
    }
}

const TextElement = {
    manifest: {
        name: "Text",
        icon: "new-text-box",
        preserveAspect: false,
        primative: true,
        parameters: [
            { "name": "text", "displayName": null, "type": "textarea", "defaultValue": "text" }
        ],
        allowedStyles: [
            ...STYLES.POSITIONABLE,
            ...STYLES.TEXT,
            ...STYLES.STANDARD
        ],
        defaultStyle: { top: 0, left: 0, width: 400, height: 400, fontFamily: "Arial", fontSize: "60px", color: "rgba(255,255,255,1)", whiteSpace: "pre" }
    },
    component: ({ text }) => {
        return <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "inherit", justifyContent: "inherit", whiteSpace: "inherit" }}>{text}</div>;
    }
}

const ImageElement = {
    manifest: { 
        name: "Image",
        width: 400,
        height: 400,
        icon: "media",
        primative: true,
        preserveAspect: true,
        parameters: [
            { "name": "url", "displayName": "Url/Asset", "type": "assetUrl", "accept": "image/*", inline: true }
        ],
        allowedStyles: [
            ...STYLES.POSITIONABLE,
            ...STYLES.FITTABLE,
            ...STYLES.STANDARD
        ],
        defaultStyle: { top: 0, left: 0, width: 400, height: 400 },
        getNaturalDimensions: (config, assets) => {
            return new Promise((resolve, reject) => {
                if (!config.url) {
                    reject("No url specified.");
                    return;
                }

                const src = getSrcFromAssetUrl(config.url, assets);
                if (!src) {
                    reject("Could not get asset source.");
                    return;
                }

                let img = new Image();
                img.addEventListener("load", () => {
                    resolve({
                        width: img.naturalWidth,
                        height: img.naturalHeight
                    });
                });
                img.src = src;
                setTimeout(() => reject("Timeout getting image size."), DEFAULT_DIMENSION_TIMEOUT_MS);
            });
        },
        preload: ({ url }) => {
            const src = getSrcFromAssetUrl(url);
            if (!src)
                return;
            return new Promise((resolve, reject) => {
                let img = new Image();
                img.addEventListener("load", resolve);
                img.addEventListener("error", resolve);
                img.addEventListener("abort", resolve);
                img.src = src;
            });
        },
        referencedAssets: (config) => (isAssetUrl(config.url) ? [ config.url ] : null)
    },
    component: ({ url, assets }) => {
        const src = getSrcFromAssetUrl(url, assets);
        return (
            <img src={src} style={{ "height": "100%", "width": "100%", "objectFit": "inherit", "objectPosition": "inherit" }} />
        );
    }
}

const VideoElement = {
    manifest: {
        name: "Video",
        icon: "video",
        primative: true,
        preserveAspect: true,
        parameters: [
            { "name": "url", "displayName": "Url/Asset", "type": "assetUrl", "accept": "video/*", inline: true },
            { "name": "volume", "type": "slider", "displayName": "Volume", "defaultValue": 100, inline: true },
            { "name": "playing", "type": "checkbox", "displayName": "Playing", "defaultValue": true, inline: true, width: 50 },
            { "name": "loop", "type": "checkbox", "displayName": "Loop", "defaultValue": false, inline: true, width: 50 },
        ],
        allowedStyles: [
            ...STYLES.POSITIONABLE,
            ...STYLES.FITTABLE,
            ...STYLES.STANDARD
        ],
        defaultStyle: { top: 0, left: 0, width: 1280, height: 720 },
        getNaturalDimensions: (config, assets) => {
            return new Promise((resolve, reject) => {
                if (!config.url) {
                    reject("No url specified.");
                    return;
                }

                const src = getSrcFromAssetUrl(config.url, assets);
                if (!src) {
                    reject("Could not get asset source.");
                    return;
                }

                let vid = document.createElement("video");
                vid.addEventListener("loadeddata", () => {
                    resolve({ width: vid.videoWidth, height: vid.videoHeight });
                });
                let source = document.createElement("source");
                source.src = src;
                vid.appendChild(source);
                setTimeout(() => reject("Timeout getting video size."), DEFAULT_DIMENSION_TIMEOUT_MS);
            });
        },
        referencedAssets: (config) => (isAssetUrl(config.url) ? [ config.url ] : null),
        preload: ({ url }) => {
            // preload if we have a youtube URL
            if (getYoutubeVideoId(url)) {
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
                return window.onYouTubeIframeAPIReadyPromise;
            } else {
                // otherwise, no need to preload
                return null;
            }
        }
    },
    YoutubeVideoComponent: ({ videoId, url, playing = true, loop = false, volume = 100, assets }) => {
        const targetRef = useRef();
        const [player, setPlayer] = useState();
        const [playerState, setPlayerState] = useState();
    
        useEffect(() => {
            if (!window.YT) { return; }
            const player = new YT.Player(targetRef.current, {
                width: "100%",
                height: "100%",
                playerVars: { 'controls': 0, 'modestbranding': 1 },
                events: {
                    onReady: (evt) => { setPlayer(player); },
                    onStateChange: ({ data }) => { setPlayerState(data); }
                }
            });
        }, [ window.YT ]);
    
        useEffect(() => {
            if (!player) { return; }
            player.loadVideoByUrl(`http://www.youtube.com/v/${videoId}?version=3`);
        }, [ player, videoId ]);
    
        useEffect(() => {
            if (!player) { return; }
            player.setLoop(loop);
        }, [ player, loop ]);
    
        useEffect(() => {
            if (!player) { return; }
            if (!playerState) { return; }
            if (playerState == -1) // pause
                player.seekTo(0);
        }, [player, playerState]);
    
        /*
        useEffect(() => {
            if (!player) { return; }
            if (!playerState) { return; }
            player.seekTo(start);
        }, [player, start]);
        */
    
        useEffect(() => {
            if (!player) { return; }
            if (playing)
                player.playVideo();
            else
                player.pauseVideo();
        }, [player, playing]);
    
        useEffect(() => {
            if (!player) { return; }
            player.setVolume(volume);
        }, [player, volume]);
    
        return (
            <div style={{ overflow: "hidden", height: "100%", width: "100%", display: (url != null && url.length > 0 ? "block" : "none") }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
                <div ref={targetRef}></div>
            </div>
        );
    },
    HTMLVideoComponent: ({ src, url, playing = true, loop = false, volume = 100, assets }) => {
        const vidRef = useRef();
    
        useEffect(() => {
            vidRef.current.load();
        }, [url]);
    
        useEffect(() => {
            vidRef.current.currentTime = 0;
            if (playing)
                vidRef.current.play();
            else
                vidRef.current.pause();
        }, [playing]);
    
        useEffect(() => {
            vidRef.current.volume = volume / 100;
        }, [volume]);
    
        const onLoadedData = useCallback((evt) => {
            if (playing) {
                vidRef.current.play().catch((err) => {
                    // videos can fail to play if the user doesn't interact with the document.
                    // not a big deal for the renderer, but we'll log to the console
                    console.log(err.message);
                });
            }
        }, []);
        
        return (
            <video ref={vidRef} onLoadedData={onLoadedData} loop={loop} style={{ height: "100%", width: "100%", objectFit: "inherit", objectPosition: "inherit" }}>
                <source src={src} />
            </video>
        );
    },
    component: (props) => {
        const videoId = getYoutubeVideoId(props.url);
        if (videoId)
            return <VideoElement.YoutubeVideoComponent videoId={videoId} {...props} />
        else
            return <VideoElement.HTMLVideoComponent src={getSrcFromAssetUrl(props.url, props.assets)} {...props} />
    }
}

const AudioElement = {
    manifest: {
        name: "Audio",
        nonVisual: true,
        effectsAllowed: false,
        primative: true,
        icon: "volume-up",
        parameters: [
            { "name": "url", "displayName": "Url/Asset", "type": "assetUrl", "accept": "audio/*", inline: true },
            { "name": "volume", "type": "slider", "displayName": "Volume", "defaultValue": 100, inline: true },
            { "name": "playing", "type": "checkbox", "displayName": "Playing", "defaultValue": true, inline: true, width: 50 },
            { "name": "loop", "type": "checkbox", "displayName": "Looping", "defaultValue": false, inline: true, width: 50 },            
        ],
        allowedStyles: [],
        referencedAssets: (config) => (isAssetUrl(config.url) ? [ config.url ] : null)
    },
    component: ({ url, playing = true, loop = false, volume = 100, assets }) => {
        const audioRef = useRef();

        useEffect(() => {
            audioRef.current.load();
        }, [url]);

        useEffect(() => {
            if (playing)
                audioRef.current.play();
            else
                audioRef.current.pause();
        }, [playing]);

        useEffect(() => {
            audioRef.current.volume = (volume / 100);
        }, [volume]);

        const onLoadedData = useCallback((evt) => {
            if (playing) {
                audioRef.current.play().catch((err) => {
                    // videos can fail to play if the user doesn't interact with the document.
                    // not a big deal for the renderer, but we'll log to the console
                    console.log(err.message);
                });
            }
        }, []);

        const src = getSrcFromAssetUrl(url, assets);
        return (
            <audio ref={audioRef} onLoadedData={onLoadedData} loop={loop}>
                <source src={src} />
            </audio>
        );
    }
}

const IFrameElement = {
    manifest: {
        name: "Iframe",
        icon: "globe-network",
        primative: true,
        preserveAspect: false,
        parameters: [
            { "name": "url", "type": "assetUrl", "displayName": "Url/Asset", "accept": "text/html" }
        ],
        allowedStyles: [
            ...STYLES.POSITIONABLE,
            ...STYLES.FITTABLE,
            ...STYLES.STANDARD
        ],
        defaultStyle: { top: 0, left: 0, width: 1280, height: 720 },
        referencedAssets: (config) => (isAssetUrl(config.url) ? [ config.url ] : null)
    },
    component: ({ url, assets }) => {
        const src = getSrcFromAssetUrl(url, assets);
        return (
            <iframe src={src} style={{ border: "0", height: "100%", width: "100%", objectFit: "inherit", objectPosition: "inherit" }}></iframe>
        );
    }
}

export default {
    "text": TextElement,
    "rectangle": RectangleElement,
    "image": ImageElement,
    "video": VideoElement,
    "audio": AudioElement,
    "iframe": IFrameElement
    //"script": ScriptElement
};