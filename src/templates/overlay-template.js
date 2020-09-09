module.exports = function(t) {
var __t, __p = '';
__p += '<!DOCTYPE html>\n<html>\n<head>\n    <title>' +
((__t = ( t.overlay.name )) == null ? '' : __t) +
'</title>\n    <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n    <style>\n    html, body { overflow: hidden; height: 100%; width: 100%; padding: 0; margin: 0; }\n    </style>\n</head>\n<body>\n    <div id="root"></div>\n    <script src="https://unpkg.com/react@16.13.1/umd/react.production.min.js" crossorigin></script>\n    <script src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" crossorigin></script>\n    <script src="' +
((__t = ( t.rendererModuleUrl )) == null ? '' : __t) +
'" crossorigin></script>\n    <script id="overlay-definition">\n        window._overlay = ' +
((__t = ( JSON.stringify(t.overlay) )) == null ? '' : __t) +
';\n    </script>\n    <script>\n        window.addEventListener("load", function() {\n                ReactDOM.render(\n                    React.createElement(OverlayRenderer.default, { overlay: window._overlay }),     \n                document.querySelector("#root")\n            );\n        });\n    </script>\n</body>\n</html>';
return __p
}