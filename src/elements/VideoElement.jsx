import styleCategories from "./styleCategories.js";
import { getSrcFromAssetUrl, isAssetUrl } from "./elementUtilities.js";
import { useCallback, useEffect, useRef } from "react";

const YOUTUBE_URL_REGEX = /.*(?:www\.youtube\.com\/(?:(?:watch\?v=)|(?:embed\/))|(?:youtu\.be\/))([a-z0-9]+)(?:\?(?:(?:t)|(?:start))=(\d+))?/i;
const DEFAULT_DIMENSION_TIMEOUT_MS = 5000;

function getYoutubeVideoId(url) {
    if (!url || isAssetUrl(url))
        return null;

    const match = url.match(YOUTUBE_URL_REGEX);
    if (!match)
        return null;
    
    return match[1];
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
            ...styleCategories.POSITIONABLE,
            ...styleCategories.FITTABLE,
            ...styleCategories.STANDARD
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
    YoutubeVideoComponent: ({ videoId, url, playing = true, loop = false, volume = 100 }) => {
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
    HTMLVideoComponent: ({ src, url, playing = true, loop = false, volume = 100 }) => {
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

        console.log({ src, url, playing, loop, volume });
        
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

export default VideoElement;