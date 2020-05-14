export default new class AnimationHelper {

    _stylesheet;
    _loadedKeyframes = [];

    ensureKeyframes(name, definition, overwrite) {
        if (this._loadedKeyframes.includes(name) && !overwrite) { return; }

        // ensure we have a stylesheet to put this rule into
        this._ensureStylesheet();

        let index = 0;
        for(let rule of this._stylesheet.cssRules) {
            if (rule.name == name) {
                // if not overwriting, commandeer the existing rule and return
                if (!overwrite) {
                    this._loadedKeyframes.push(name);
                    return;
                }

                // otherwise, we have to remove it
                this._stylesheet.deleteRule(index);
                // and break out, so it can be re-added
                break;
            }
            index++;
        }

        // and add
        this._stylesheet.insertRule(definition);
        this._loadedKeyframes.push(name);
    }

    _ensureStylesheet() {
        if (this._stylesheet) { return; }

        // pick up the existing stylesheet if we can
        for (var i = 0; i < document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
            if (sheet.title == "openoverlay-animations") {
                this._stylesheet = sheet;
                return;
            }
        }
    
        // otherwise, create it
        let element = document.createElement("style");
        element.type = "text/css";
        element.title = "openoverlay-animations";
        document.head.appendChild(element);
        this._stylesheet = document.styleSheets[document.styleSheets.length - 1];
    }
}