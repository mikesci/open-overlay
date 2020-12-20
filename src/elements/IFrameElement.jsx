import styleCategories from "./styleCategories.js";
import { getSrcFromAssetUrl, isAssetUrl } from "./elementUtilities.js";

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
            ...styleCategories.POSITIONABLE,
            ...styleCategories.FITTABLE,
            ...styleCategories.STANDARD
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

export default IFrameElement;