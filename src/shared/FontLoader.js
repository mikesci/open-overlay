import builtinFonts from "./fonts-builtin.js";

export default new class {

    _loadedFonts = [];

    EnsureFont = name => {

        if (builtinFonts.includes(name)) { return null; }
        if (this._loadedFonts.includes(name)) { return null; }

        return new Promise((resolve, reject) => {
            this._loadedFonts.push(name);
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://fonts.googleapis.com/css?family=" + encodeURIComponent(name);
            link.addEventListener("load", resolve);
            link.addEventListener("abort", reject);
            link.addEventListener("error", reject);
            document.head.appendChild(link);
        });
    }
}