import builtinFonts from "./fonts-builtin.js";
import { runInThisContext } from "vm";

export default new class {

    _loadedFonts = [];
    _loadPromises = {};

    EnsureFont = name => {

        if (builtinFonts.includes(name)) { return null; }
        if (this._loadedFonts.includes(name)) { return null; }
        if (this._loadPromises[name]) { return this._loadPromises[name]; }

        let p = new Promise((resolve, reject) => {
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://fonts.googleapis.com/css?family=" + encodeURIComponent(name);
            link.addEventListener("load", () => { this._loadedFonts.push(name); resolve(); });
            link.addEventListener("abort", reject);
            link.addEventListener("error", reject);
            document.head.appendChild(link);
        });

        this._loadPromises[name] = p;

        return p;
    }
}