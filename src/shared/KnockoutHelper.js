export default new class {

    _knockouts = [];

    EnsurePath(stage) {
        let knockoutPath = document.getElementById("knockout-path");
        if (!knockoutPath)
        {
            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.style["position"] = "absolute";
            svg.style["top"] = "-99999px";
            svg.setAttributeNS(null, "viewbox", "0 0 1920 1080");

            let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            svg.appendChild(defs);

            let clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
            clipPath.id ="knockout-clippath";
            defs.appendChild(clipPath);

            knockoutPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            knockoutPath.id = "knockout-path";
            clipPath.appendChild(knockoutPath);

            document.body.appendChild(svg);

            stage.style["clip-path"] = "url(#knockout-clippath)";
        }

        return knockoutPath;
    }

    AddShape() {
        let shape = { pathString: "" };
        this._knockouts.push(shape);
        return shape;
    }

    RemoveShape(shape) {
        let index = this._knockouts.indexOf(shape);
        if (index > -1) {
            this._knockouts.splice(index, 1);
        }
    }
}