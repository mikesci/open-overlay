export default {
    match: type => type.match(/audio/i),
    assetType: "audio",
    getLayer: (url) => {
        return {
            elementName: "audio",
            src: url
        };
    }
}