import { getSrcFromAssetUrl, isAssetUrl } from "./elementUtilities.js";

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

export default AudioElement;