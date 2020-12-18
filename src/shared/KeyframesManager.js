export default new class KeyframesManager {

    _stylesheet;
    _cache = {};
    _loadedKeyframes = {};
    

    constructor() {
        // create the stylesheet
        let element = document.createElement("style");
        element.type = "text/css";
        element.title = "openoverlay-animations";
        document.head.appendChild(element);
        this._stylesheet = document.styleSheets[document.styleSheets.length - 1];
    }

    clear = () => {
        while (this._stylesheet.cssRules.length > 0)
            this._stylesheet.deleteRule(0);
        this._loadedKeyframes = {};
    }

    ensureAnimationFromKeyframes = (overlayId, layerId, sublayer, phaseName, keyframesDefinition) => {
        const animationName = `openoverlay-${overlayId}-${layerId}-${sublayer}-${phaseName}`;

        const cachedKeyframesDefinition = this._cache[animationName];
        if (cachedKeyframesDefinition == keyframesDefinition) {
            return animationName;
        }

        // we need to set or update the cache
        // so if we have a cache val, we need to remove this rule
        if (cachedKeyframesDefinition) {
            for(let i = 0; i < this._stylesheet.rules.length; i++) {
                if (this._stylesheet.rules[i].name == animationName) {
                    this._stylesheet.removeRule(i);
                    break;
                }
            }
        }

        // now add it back in
        const cssRule = `@keyframes ${animationName} { ${keyframesDefinition} }`;
        this._stylesheet.insertRule(cssRule);
        this._cache[animationName] = keyframesDefinition;

        return animationName;
    }
}