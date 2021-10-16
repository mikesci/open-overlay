export default {   // image
    match: type => type.match(/image/i),
    assetType: "image",
    getLayer: (url) => {
        return {
            elementName: "image",
            src: url
        };
    },
    getDimensions: (src) => {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.addEventListener("load", () => resolve({ height: img.naturalHeight, width: img.naturalWidth }));
            img.addEventListener("error", () => { reject(); });
            img.src = src;
        });
    }
};