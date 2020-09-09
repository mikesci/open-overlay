const template = require("lodash/template");
const fs = require("fs").promises;
const path = require("path");

(async () => {
    const files = await fs.readdir(path.join(__dirname, "src/templates"));
    for(let file of files) {
        if (!file.endsWith(".template")) { continue; }

        const readPath = path.join(__dirname, "src/templates", file);
        const writePath = readPath.replace(/.template$/, ".js");
        const text = await fs.readFile(readPath);
        const compiledText = "module.exports = " + template(text, { variable: "t" }).source;
        fs.writeFile(writePath, compiledText);
        console.log("Wrote " + compiledText.length + " bytes to " + writePath);
    }
})();
