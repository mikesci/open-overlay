// Handlers for adding layers to the overlay based on their mime type.
// Used when dropping & pasting.

const DEFAULT_TIMEOUT_MS = 10000;
const YOUTUBE_URL_REGEX = /.*(?:www\.youtube\.com\/(?:(?:watch\?v=)|(?:embed\/))|(?:youtu\.be\/))([a-z0-9]+)(?:\?(?:(?:t)|(?:start))=(\d+))?/i;

let contentTypeHandlers = [
    {   // image
        match: type => type.match(/image/i),
        getDimensions: async (url) => {
            return new Promise((resolve, reject) => {
                let img = new Image();
                img.addEventListener("load", () => {
                    resolve({
                        width: img.naturalWidth,
                        height: img.naturalHeight
                    });
                });
                img.src = url;
                setTimeout(reject, DEFAULT_TIMEOUT_MS);
            });
        },
        getLayer: (url, name) => {
            return {
                elementName: "image",
                label: name,
                config: {
                    url: url,
                    fit: "cover"
                }
            };
        }
    },
    {   // video  
        match: type => type.match(/video/i),
        getDimensions: async (url) => {
            return new Promise((resolve, reject) => {
                let vid = document.createElement("video");
                vid.addEventListener("loadeddata", () => {
                    resolve({
                        width: vid.videoWidth,
                        height: vid.videoHeight,
                    });
                });
                let source = document.createElement("source");
                source.src = url;
                vid.appendChild(source);
                setTimeout(reject, DEFAULT_TIMEOUT_MS);
            });
        },
        getLayer: (url, name) => {
            return {
                elementName: "video",
                label: name,
                config: {
                    url: url,
                    fit: "cover"
                }
            };
        }
    },
    {   // audio
        match: type => type.match(/audio/i),
        getLayer: (url, name) => {
            return {
                elementName: "audio",
                label: name,
                config: {
                    url: url
                }
            };
        }
    },
    {   // youtube
        match: (type, data) => type.match(/text\/html/i) && data && data.match(YOUTUBE_URL_REGEX),
        getLayer: (url, name) => {
            // parse out the start parameter, if there is one
            let match = url.match(/(?:star)?t=(\d+)/i);
            let start = (match && match.length == 2 ? match[1] : null);
            // possibly use the youtube api to pull the ideal height/width?
            return {
                elementName: "youtube",
                label: name,
                config: {
                    url,
                    start
                }
            };
        }
    },
    {   // iframe (any HTML content type)
        match: type => type.match(/text\/html/i),
        getLayer: (url, name) => {
            return {
                elementName: "iframe",
                label: name,
                config: {
                    url: url
                }
            };
        }
    }
];

export default contentTypeHandlers;