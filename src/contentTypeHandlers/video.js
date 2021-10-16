const YOUTUBE_URL_REGEX = /.*(?:www\.youtube\.com\/(?:(?:watch\?v=)|(?:embed\/))|(?:youtu\.be\/))([a-z0-9\-]+)(?:\?(?:(?:t)|(?:start))=(\d+))?/i;

export default {
    match: (type, data) => type.match(/video/i) || (type.match(/text\/html/i) && data && data.match(YOUTUBE_URL_REGEX)),
    assetType: "video",
    getLayer: (url) => {
        return {
            elementName: "video",
            src: url
        };
    },
    getDimensions: (src) => {
        return new Promise((resolve, reject) => {
            var video = document.createElement("video");
            video.addEventListener("loadedmetadata", () => resolve({ height: video.videoHeight, width: video.videoWidth }));
            video.addEventListener("error", () => { reject(); });
            video.src = src;
        });
    }
};