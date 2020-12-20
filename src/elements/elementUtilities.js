function getSrcFromAssetUrl(assetUrl, assets) {
    if (!isAssetUrl(assetUrl))
        return assetUrl;

    if (!assets) { return null; }
    
    const asset = assets[assetUrl];
    if (!asset) {  return null; }

    return asset.src;
}

function isAssetUrl(url) {
    if (!url) { return false; }
    return url.startsWith("asset:");
}

export {
    getSrcFromAssetUrl,
    isAssetUrl
};