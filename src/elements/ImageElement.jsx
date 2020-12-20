import styleCategories from "./styleCategories.js";
import { getSrcFromAssetUrl, isAssetUrl } from "./elementUtilities.js";

const DEFAULT_DIMENSION_TIMEOUT_MS = 5000;

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
            ...styleCategories.POSITIONABLE,
            ...styleCategories.FITTABLE,
            ...styleCategories.STANDARD
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

export default ImageElement;