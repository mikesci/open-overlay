import BuiltinFontSource from "./BuiltinFontSource.js";
import GoogleFontSource from "./GoogleFontSource.js";

export default new class FontLoader {

    _loadedFonts = [];
    _loadPromises = {};
    _fontSources = [ BuiltinFontSource, GoogleFontSource ];
    _fontNames;

    GetFontNames = () => {
        // lazy load font names
        if (!this._fontNames) {
            // iterate through font sources to pull all available font names and cache for later
            let fontNames = [];
            for(let fontSource of this._fontSources) {
                for(let fontName of fontSource.GetFontNames()) {
                    fontNames.push(fontName);
                }
            }
            this._fontNames = fontNames.sort();
        }
        return this._fontNames;
    }

    /// returns a Promise if a font is being loaded or null if it's already loaded
    LoadFont = name => {
        // ensure this font has not yet been loaded
        if (this._loadedFonts.includes(name)) { return null; }

        // if we have an active promise, return that instead to avoid duplication
        if (this._loadPromises[name]) { return this._loadPromises[name]; }

        for(let fontSource of this._fontSources) {
            let possiblePromise = fontSource.LoadFont(name);
            if (possiblePromise) {
                this._loadPromises[name] = possiblePromise;
                possiblePromise.then(() => this._loadedFonts.push(name));
                return possiblePromise;
            }
        }

        return null;
    }
}