// Handlers for adding layers to the overlay based on their mime type.
// Used when dropping & pasting.

const DEFAULT_DIMENSION_TIMEOUT_MS = 500;
const YOUTUBE_URL_REGEX = /.*(?:www\.youtube\.com\/(?:(?:watch\?v=)|(?:embed\/))|(?:youtu\.be\/))([a-z0-9\-]+)(?:\?(?:(?:t)|(?:start))=(\d+))?/i;

let contentTypeHandlers = [
    {   // image
        match: type => type.match(/image/i),
        assetType: "image",
        getLayer: (url) => {
            return {
                elementName: "image",
                config: {
                    url: url
                }
            };
        },
        getNaturalDimensions: async (src) => {
            return await new Promise((resolve, reject) => {
                let img = new Image();
                img.addEventListener("load", () => {
                    resolve({
                        width: img.naturalWidth,
                        height: img.naturalHeight
                    });
                });
                img.src = src;
                setTimeout(reject, DEFAULT_DIMENSION_TIMEOUT_MS);
            });
        }
    },
    {   // video  
        match: (type, data) => type.match(/video/i) || (type.match(/text\/html/i) && data && data.match(YOUTUBE_URL_REGEX)),
        assetType: "video",
        getLayer: (url) => {
            return {
                elementName: "video",
                config: {
                    url: url
                }
            };
        },
        getNaturalDimensions: async (src) => {
            // if this is a youtube url, always resolve as 720p.  we can make this smarter later... maybe?
            const match = src.match(YOUTUBE_URL_REGEX);
            if (match)
                return { width: 1280, height: 720 };
                
            return await new Promise((resolve, reject) => {
                let vid = document.createElement("video");
                vid.addEventListener("loadeddata", () => {
                    resolve({ width: vid.videoWidth, height: vid.videoHeight });
                });
                let source = document.createElement("source");
                source.src = src;
                vid.appendChild(source);
                setTimeout(reject, DEFAULT_DIMENSION_TIMEOUT_MS);
            }); 
        }
    },
    {   // audio
        match: type => type.match(/audio/i),
        assetType: "audio",
        getLayer: (url) => {
            return {
                elementName: "audio",
                config: {
                    url: url
                }
            };
        }
    },
    {   // javascript (external scripts)
        match: type => type.match(/script/i),
        assetType: "script"
    },
    {   // iframe (any HTML content type)
        match: type => type.match(/html/i),
        assetType: "html",
        getLayer: (url) => {
            return {
                elementName: "iframe",
                config: { url }
            };
        }
    }
];

export default contentTypeHandlers;