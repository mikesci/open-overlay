
export default {
    match: type => type.match(/html/i),
    assetType: "html",
    getLayer: (url) => {
        return {
            elementName: "iframe",
            src: url
        };
    }
};